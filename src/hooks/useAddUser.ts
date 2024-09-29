import { useState } from "react";
import { insertNewUser } from "./api/insertNewUser";
import { insertUserSkill } from "./api/insertUserSkill";

export type UserInput = {
  user_id: string;
  name: string;
  description: string;
  skills_id: number;
  github_id?: string;
  qiita_id?: string
  x_id?: string;
}

export const useAddUser = () => {
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const addUser = async (data: UserInput) => {
    setIsRequestLoading(true);

    await insertNewUser({
      user_id: data.user_id,
      name: data.name,
      description: data.description,
      github_id: data.github_id,
      qiita_id: data.qiita_id,
      x_id: data.x_id
    })
    .catch((err) => console.error(err));

    await insertUserSkill({
      user_id: data.user_id!,
      skill_id: data.skills_id!
    })
    .catch((err) => console.error(err));
    
    setIsRequestLoading(false);

    return;
  }

  return { addUser,isRequestLoading };
}
