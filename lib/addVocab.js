import { toast } from "sonner";
import supabase from "@/lib/supabaseClient";

const addVocab = async (user_id, term, descriptions) => {
  // Check if vocab already exists for this user
  const { data } = await supabase
    .from("vocabs")
    .select("word_id")
    .eq("created_by", user_id)
    .eq("term", term)
    .limit(1);

  if (data.length === 1) {
    toast.error("You have already added this vocab.");
    return;
  }

  const response = await supabase.from("vocabs").insert([
    {
      created_by: user_id,
      term: term,
      descriptions: descriptions,
    },
  ]);

  if (response.status === 201) {
    toast.success("Vocabs has been Added");
  } else {
    console.log(response.error)
    toast.error("Something went wrong...");
  }
};

export default addVocab;
