import { supabase } from "../../services/supabase"

export const selectAllSkills = async () => {
  const { data, error } = await supabase
  .from('skills')
  .select()

  return {data, error};
}