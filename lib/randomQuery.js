import supabase from "@/lib/supabaseClient";

const randomQuery = async () => {
    const { data, error } = await supabase.rpc("get_random_words", {
        limit_count: 5,
    });

    console.log(data, error);
    return data;
};

export default randomQuery;
