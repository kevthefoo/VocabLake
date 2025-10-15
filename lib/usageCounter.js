// lib/usage-db.js
import supabase from "./supabaseClient.js";

function utcDateToday() {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export async function incrementDailyUsageDB(userId, feature, maxPerDay) {
  const day = utcDateToday();

  // Ensure row exists (ignore if it already does)
  const { error: upsertErr } = await supabase
    .from("daily_usage")
    .upsert([{ user_id: userId, feature, day, count: 0 }], {
      onConflict: "user_id,feature,day",
      ignoreDuplicates: true,
    });

  if (upsertErr) throw upsertErr;

  // Atomic increment via RPC
  const { data, error } = await supabase.rpc("increment_usage_and_return", {
    p_user_id: userId,
    p_feature: feature,
    p_day: day,
  });
  if (error) throw error;

  const current = data.count;
  return {
    current,
    remaining: Math.max(0, maxPerDay - current),
    allowed: current <= maxPerDay,
  };
}
