import supabase from "@/lib/supabaseClient";

/**
 * Calculate the current learning streak (consecutive days with vocabulary added)
 * @returns {Object} Object with streak days and streak data for visualization
 */
const getLearningStreak = async (user_id) => {
  try {
    // Get all vocab creation dates, ordered by date
    const { data, error } = await supabase
      .from("vocabs")
      .select("created_at")
      .eq("created_by", user_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching streak data:", error);
      return { streak: 0, streakDays: [] };
    }

    if (!data || data.length === 0) {
      return { streak: 0, streakDays: [] };
    }

    // Convert to dates and get unique days
    const uniqueDays = new Set();
    data.forEach((vocab) => {
      const date = new Date(vocab.created_at);
      const dayString = date.toDateString();
      uniqueDays.add(dayString);
    });

    const sortedDays = Array.from(uniqueDays).sort(
      (a, b) => new Date(b) - new Date(a),
    );

    // Calculate streak from most recent day
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let checkDate = new Date(today);

    // Check if there's activity today or yesterday (allow for timezone differences)
    const mostRecentDate = new Date(sortedDays[0]);
    mostRecentDate.setHours(0, 0, 0, 0);

    const dayDiff = Math.floor(
      (today - mostRecentDate) / (1000 * 60 * 60 * 24),
    );

    if (dayDiff > 1) {
      // No recent activity, streak is 0
      return { streak: 0, streakDays: [] };
    }

    // Start checking from the most recent activity date
    checkDate = new Date(mostRecentDate);

    // Count consecutive days backwards
    for (let i = 0; i < sortedDays.length; i++) {
      const dayDate = new Date(sortedDays[i]);
      dayDate.setHours(0, 0, 0, 0);

      if (dayDate.getTime() === checkDate.getTime()) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1); // Move to previous day
      } else if (dayDate.getTime() < checkDate.getTime()) {
        // Gap found, stop counting
        break;
      }
    }

    // Generate streak visualization data (last 7 days)
    const streakDays = [];
    const streakSet = new Set(sortedDays.slice(0, streak));

    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(day.getDate() - i);
      const hasActivity = streakSet.has(day.toDateString());
      streakDays.push({
        date: day.toDateString(),
        hasActivity,
        dayNumber: day.getDate(),
      });
    }

    return {
      streak: Math.min(streak, 365), // Cap at 365 days
      streakDays: streakDays.slice(-7), // Show last 7 days
    };
  } catch (error) {
    console.error("Error in getLearningStreak:", error);
    return { streak: 0, streakDays: [] };
  }
};

export default getLearningStreak;
