import { deleteAllUsers, deleteAllUserSkill } from "../src/hooks/api/deleteAll.js";

const main = () => {
  deleteAllUserSkill().catch(err => console.error(err));
  deleteAllUsers().catch(err => console.error(err));
};

main();

export { main };