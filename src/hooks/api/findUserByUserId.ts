import { supabase } from "../../services/supabase";

export const findUserByUserId = async (user_id: string) => {
  const { data, error } = await supabase
    .from('users')
    .select(`
      user_id,
      name,
      description,
      github_id,
      qiita_id,
      x_id,
      user_skill (
        id,
        skills (
          id,
          name
        )
      )
    `)
    .eq('user_id', user_id);

    return { data, error };
};