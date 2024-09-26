import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserCard } from "./pages/UserCard";
import { RegistUser } from "./pages/RegistUser";
import { SearchUser } from "./pages/SearchUser";

export const Ex4Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchUser />}/>
        <Route path="/cards">
          <Route path="register" element={<RegistUser />}/>
          <Route path=":id" element={<UserCard />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};