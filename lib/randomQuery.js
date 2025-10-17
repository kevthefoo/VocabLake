import supabase from "@/lib/supabaseClient";

const randomQuery = async (user_id, count = 5) => {
  const { data, error, status } = await supabase.rpc("get_random_words", {
    user_id: user_id,
    limit_count: count,
  });
  console.log(status);
  console.log(data, error);
  return data;
};

export default randomQuery;
