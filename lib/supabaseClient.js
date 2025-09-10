import { createClient } from "@supabase/supabase-js";

// This creates a Supabase client instance using your project's URL and API key,
// and exports it for use in other files.
const supabase = createClient(
  "https://zkrajgjxxxigbwtabjnl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprcmFqZ2p4eHhpZ2J3dGFiam5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNTY0MDAsImV4cCI6MjA3MTkzMjQwMH0.VDUHV2GlzyXOyahHoMLN3dsFrSJmyK4K0NnkTxvam8I",
);

export default supabase;
