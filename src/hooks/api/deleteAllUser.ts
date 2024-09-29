import { supabase } from "../../services/supabase.js";


const deleteAllUserSkill = async() => {
  const { data, error } = await supabase
  .from('user_skill')
  .delete()
  .not('id', 'is', null);

  return { data, error };
}

const deleteAllUsers = async() => {
  const { data, error } = await supabase
  .from('users')
  .delete()
  .not('user_id', 'is', null);

  return { data, error };
}

export const deleteAllUser = async () => {
  await deleteAllUserSkill().catch(err => console.error(err));
  await deleteAllUsers().catch(err => console.error(err));
}

