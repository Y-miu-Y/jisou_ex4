import { findUserByUserId } from "../hooks/api/findUserByUserId";
import { findByTestId, render, screen } from "@testing-library/react";
import { UserCard } from "../pages/UserCard";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";


jest.mock('../hooks/api/findUserByUserId');
jest.mock('../hooks/api/insertNewUser');
jest.mock('../hooks/api/insertUserSkill');
jest.mock('../hooks/api/selectAllSkills');

describe('名刺カードのテスト(描画)', () => {
  beforeAll(() => {
    (findUserByUserId as jest.Mock).mockResolvedValue({
      data: [
        {
          user_id: "testID",
          name: "テスト名前",
          description: "テスト詳細",
          github_id: "testGithub",
          qiita_id: "testQiita",
          x_id: "testX",
          user_skill: [
            {
              id: "1",
              skills: 
              {
                id: "1",
                name: "React"
              }
            }
          ]
        }
      ]
    });
  });
  
  afterAll(() => {
    jest.resetAllMocks();
  });
  
  it("名前が表示されている", async () => {
    render(
      <MemoryRouter initialEntries={['/cards/testID']}>
        <Routes>
          <Route path="/cards/:id" element={<UserCard />} />
        </Routes>
      </MemoryRouter>
    );

    const target = await screen.findByTestId('name');

    expect(target).toHaveTextContent('テスト名前');
  });

  it("自己紹介が表示されている", async () => {
    render(
      <MemoryRouter initialEntries={['/cards/testID']}>
        <Routes>
          <Route path="/cards/:id" element={<UserCard />} />
        </Routes>
      </MemoryRouter>
    );

    const target = await screen.findByTestId('desc');

    expect(target).toHaveTextContent('テスト詳細');
  });

  it("技術が表示されている", async () => {
    render(
      <MemoryRouter initialEntries={['/cards/testID']}>
        <Routes>
          <Route path="/cards/:id" element={<UserCard />} />
        </Routes>
      </MemoryRouter>
    );

    const target = await screen.findByTestId('skill');
    screen.debug();
    expect(target).toHaveTextContent('React');
  });

  it("Githubアイコンが表示されている", async () => {
    render(
      <MemoryRouter initialEntries={['/cards/testID']}>
        <Routes>
          <Route path="/cards/:id" element={<UserCard />} />
        </Routes>
      </MemoryRouter>
    );

    const target = await screen.findByTestId('github');

    expect(target).toBeInTheDocument();
  });

  it("Qiitaアイコンが表示されている", async () => {
    render(
      <MemoryRouter initialEntries={['/cards/testID']}>
        <Routes>
          <Route path="/cards/:id" element={<UserCard />} />
        </Routes>
      </MemoryRouter>
    );

    const target = await screen.findByTestId('qiita');

    expect(target).toBeInTheDocument();
  });

  it("Xアイコンが表示されている", async () => {
    render(
      <MemoryRouter initialEntries={['/cards/testID']}>
        <Routes>
          <Route path="/cards/:id" element={<UserCard />} />
        </Routes>
      </MemoryRouter>
    );

    const target = await screen.findByTestId('X');

    expect(target).toBeInTheDocument();
  });
});