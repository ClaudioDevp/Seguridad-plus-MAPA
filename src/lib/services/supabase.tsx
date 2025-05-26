import { createClient } from "@supabase/supabase-js"
import type { Database } from "../../../database.types"

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!,
)

export const getMunicipalities = async () : Promise<string[]> => {
  const { data, error } = await supabase.from("municipalities").select("id")
  if (error) throw error
  const res = data.map(m => m.id)
  return res
}