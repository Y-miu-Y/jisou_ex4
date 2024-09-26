import { supabase } from "../../services/supabase"

type Prop = {
  user_id: string;
  name: string;
  description: string;
  github_id?: string;
  qiita_id?: string;
  x_id?: string;
}

export const insertNewUser = async (prop:Prop) => {
  await supabase
  .from('users')
  .insert(prop)
}