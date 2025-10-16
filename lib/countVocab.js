import supabase from "@/lib/supabaseClient";

const countVocab = async (user_id) => {
  const { count, error } = await supabase
    .from("vocabs")
    .select("*", { count: "exact", head: true })
    .eq("created_by", user_id);

  return count;
};

export default countVocab;
