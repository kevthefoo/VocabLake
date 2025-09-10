const logIn = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: "kevin@example.com",
    password: "mypassword123",
  });
};

export default logIn;
