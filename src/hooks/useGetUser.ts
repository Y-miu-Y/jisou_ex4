import { useState, useCallback } from "react";
import { User } from "../types/api/User";
import { findUserByUserId } from "./api/findUserByUserId";

export const useGetUser = () => {
  const [ isUserLoading, setIsUserLoading ] = useState(false);
  const [ user, setUser ] = useState<User | undefined>(undefined);

  const getUser = useCallback((id: string) => {
    // 読み込み有効化
    setIsUserLoading(true);

    findUserByUserId(id)
      .then((res) => {
        setUser(res?.data?.map((row) => User.fromDatabaseResult(row))[0] ?? undefined);
      })
      .catch(() => {
        // window.alert("取得時エラー発生");
      })
      .finally(()=> {
        setIsUserLoading(false);
      })
  },[]);

  return { isUserLoading, user, getUser };
}