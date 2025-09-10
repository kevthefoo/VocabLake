import supabase from "@/lib/supabaseClient";

const addVocab = async (user_id, term, descriptions) => {
    const response = await supabase.from("vocabs").insert([
        {
            created_by: user_id,
            term: term,
            descriptions: descriptions,
        },
    ]);

    console.log(response);
};

export default addVocab;
