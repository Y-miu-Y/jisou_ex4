import { supabase } from "../../services/supabase"

type Prop = {
  user_id: string;
  skill_id:  number;
}

export const insertUserSkill = async (prop:Prop) => {
  await supabase
  .from('user_skill')
  .insert(prop)
}