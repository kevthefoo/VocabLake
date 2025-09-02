import { supabase } from "@/lib/supabaseClient";

const addVocab = async () => {
    const { error } = await supabase
        .from("Vocab")
        .insert({ id: 1, vocabulary: "Mordor", meaning: "Hoodie" });

    console.log(error);
};

export default addVocab;
