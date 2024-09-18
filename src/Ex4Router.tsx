import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserCard } from "./pages/UserCard";
import { RegistUser } from "./pages/RegistUser";

export const Ex4Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"/>
        <Route path="/cards">
          <Route path="register" element={<RegistUser />}/>
          <Route path=":id" element={<UserCard />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};