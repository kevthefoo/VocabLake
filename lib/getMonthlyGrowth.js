import supabase from "@/lib/supabaseClient";

/**
 * Get vocabulary count for the current month
 * @returns {number} Number of vocabs added this month
 */
const getThisMonthCount = async (user_id) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
    );

    const { data, error } = await supabase
      .from("vocabs")
      .select("word_id", { count: "exact" })
      .eq("created_by", user_id)
      .gte("created_at", startOfMonth.toISOString())
      .lte("created_at", endOfMonth.toISOString());

    if (error) {
      console.error("Error fetching this month count:", error);
      return 0;
    }

    return data?.length || 0;
  } catch (error) {
    console.error("Error in getThisMonthCount:", error);
    return 0;
  }
};

/**
 * Get vocabulary count for the previous month
 * @returns {number} Number of vocabs added last month
 */
const getLastMonthCount = async (user_id) => {
  try {
    const now = new Date();
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59,
    );

    const { data, error } = await supabase
      .from("vocabs")
      .select("word_id", { count: "exact" })
      .eq("created_by", user_id)
      .gte("created_at", startOfLastMonth.toISOString())
      .lte("created_at", endOfLastMonth.toISOString());

    if (error) {
      console.error("Error fetching last month count:", error);
      return 0;
    }

    return data?.length || 0;
  } catch (error) {
    console.error("Error in getLastMonthCount:", error);
    return 0;
  }
};

/**
 * Calculate the percentage change from last month to this month
 * @returns {Object} Object with thisMonth count, growth percentage, and trend
 */
const getMonthlyGrowth = async (user_id) => {
  try {
    const [thisMonth, lastMonth] = await Promise.all([
      getThisMonthCount(user_id),
      getLastMonthCount(user_id),
    ]);

    let growthPercentage = 0;
    let trend = "stable";

    if (lastMonth > 0) {
      growthPercentage = Math.round(
        ((thisMonth - lastMonth) / lastMonth) * 100,
      );
    } else if (thisMonth > 0) {
      growthPercentage = 100; // 100% growth if started from 0
    }

    if (growthPercentage > 0) {
      trend = "up";
    } else if (growthPercentage < 0) {
      trend = "down";
    }

    return {
      thisMonth,
      lastMonth,
      growthPercentage,
      trend,
    };
  } catch (error) {
    console.error("Error in getMonthlyGrowth:", error);
    return {
      thisMonth: 0,
      lastMonth: 0,
      growthPercentage: 0,
      trend: "stable",
    };
  }
};

export { getThisMonthCount, getLastMonthCount, getMonthlyGrowth };
