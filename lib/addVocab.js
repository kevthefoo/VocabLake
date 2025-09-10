import { toast } from "sonner";
import supabase from "@/lib/supabaseClient";

const addVocab = async (user_id, term, descriptions) => {
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
    toast.error("Something went wrong...");
  }
};

export default addVocab;
