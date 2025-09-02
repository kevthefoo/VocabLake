import { supabase } from "@/lib/supabaseClient";

const queryVocab = async () => {
    const { data, error } = await supabase
        .from("words")
        .select("id, term, meaning, created_at")
        .order("created_at", { ascending: false });

    return data;
};

export default queryVocab;
