import { createClient } from "@supabase/supabase-js";

// This creates a Supabase client instance using your project's URL and API key
// Exports it for use in other files.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

export default supabase;
