import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://pvhcoxqjugbzfpjjlwgw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2aGNveHFqdWdiemZwampsd2d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1NjEwMTIsImV4cCI6MjAzMDEzNzAxMn0.oItF1EE4-OzU3C_ZueU7qFTAjJ4urELRtBZEYWUs0mg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
