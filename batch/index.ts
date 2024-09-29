import { deleteAllUser } from "../src/hooks/api/deleteAllUser.js";

const main = () => {
  deleteAllUser();
};

console.log('バッチ処理を実行開始');
main();
console.log('バッチ処理を終了');

export { main };