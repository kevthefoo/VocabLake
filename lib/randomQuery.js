import supabase from "@/lib/supabaseClient";

const randomQuery = async () => {
    const { data, error } = await supabase.rpc("get_random_words", {
        user_id: "user_32SosokHdPnOdZmZj2lhO3zcC3V",
        limit_count: 5,
    });

    console.log(data, error);
    return data;
};

export default randomQuery;
