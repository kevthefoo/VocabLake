import supabase from "@/lib/supabaseClient";

const countVocab = async () => {
  const { count, error } = await supabase
    .from("vocabs")
    .select("*", { count: "exact", head: true });

  return count;
};

export default countVocab;
