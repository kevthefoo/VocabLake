import supabase from "@/lib/supabaseClient";

const addUser = async (user_id, email) => {
  const { error } = await supabase
    .from("profiles")
    .insert({ clerk_user_id: user_id, email: email });

  console.log(error);
};

export default addUser;
