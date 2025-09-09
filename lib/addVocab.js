import supabase from "@/lib/supabaseClient";

const addVocab = async (user_id, term, meaning, examples) => {
    const response = await supabase
        .from("words")
        .insert([{ created_by: user_id, term: term, meanings: meaning }])
        .select("word_id")
        .single();

    console.log(response);
    const word_id = response.data.word_id;

    const responsee = await supabase
        .from("examples")
        .insert([{ word_id: word_id, sentence: examples }]);
};

export default addVocab;
