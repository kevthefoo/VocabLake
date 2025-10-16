import supabase from "@/lib/supabaseClient";

/**
 * Get monthly vocabulary statistics for chart display
 * @param {number} months - Number of months to fetch (default: 6)
 * @returns {Array} Array of monthly stats for chart
 */
const getMonthlyStats = async (months = 6) => {
  try {
    // Calculate the date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - months + 1);
    startDate.setDate(1); // Start from first day of the month

    const { data, error } = await supabase
      .from("vocabs")
      .select("created_at")
      .gte("created_at", startDate.toISOString())
      .lte("created_at", endDate.toISOString());

    if (error) {
      console.error("Error fetching monthly stats:", error);
      return [];
    }

    // Group by month and count
    const monthlyData = {};
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Initialize months with 0 counts
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      const shortMonth = monthNames[date.getMonth()];
      monthlyData[monthKey] = { month: shortMonth, vocabs: 0 };
    }

    // Count vocabs by month
    data.forEach((vocab) => {
      const date = new Date(vocab.created_at);
      const monthKey = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      if (monthlyData[monthKey]) {
        monthlyData[monthKey].vocabs++;
      }
    });

    return Object.values(monthlyData);
  } catch (error) {
    console.error("Error in getMonthlyStats:", error);
    // Return empty array with month names as fallback
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return monthNames.map((month) => ({ month, vocabs: 0 }));
  }
};

export default getMonthlyStats;
