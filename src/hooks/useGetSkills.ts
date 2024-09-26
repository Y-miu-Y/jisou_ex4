import { useState } from "react";
import { selectAllSkills } from "./api/selectAllSkills";

export type Skill = {
  id: number;
  name: string;
}

export const useGetSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  const getSkills = () => {
    selectAllSkills()
    .then(res =>{ 
      setSkills(res.data?.map(col => col as Skill) ?? []);
    })
    .catch((err) => console.error(err))
  }

  return { skills, getSkills };
}
