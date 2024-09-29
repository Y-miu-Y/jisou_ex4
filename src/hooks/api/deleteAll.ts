import { supabase } from "../../services/supabase";

export const deleteAllUsers = async() => {
  const { data, error } = await supabase
  .from('users')
  .delete();

  return { data, error };
}

export const deleteAllUserSkill = async() => {
  const { data, error } = await supabase
  .from('user_skill')
  .delete();

  return { data, error };
}