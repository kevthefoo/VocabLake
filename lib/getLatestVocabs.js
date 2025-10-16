import supabase from "@/lib/supabaseClient";

/**
 * Get the latest vocabulary words for the current user
 * @param {number} limit - Number of latest vocabs to fetch (default: 5)
 * @returns {Array} Array of latest vocabulary objects
 */
const getLatestVocabs = async (user_id, limit = 5) => {
  try {
    const { data, error } = await supabase
      .from("vocabs")
      .select("word_id, term, descriptions, created_at")
      .eq("created_by", user_id)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.log("Error fetching latest vocabs:", error);
      return [];
    }

    // Format the created_at date to be more readable
    return data.map((vocab) => ({
      ...vocab,
      created_at: new Date(vocab.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }));
  } catch (error) {
    console.error("Error in getLatestVocabs:", error);
    return [];
  }
};

export default getLatestVocabs;
