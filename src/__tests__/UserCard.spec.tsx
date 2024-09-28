import { findUserByUserId } from "../hooks/api/findUserByUserId";
import { fireEvent, render, screen } from "@testing-library/react";
import { UserCard } from "../pages/UserCard";
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";


jest.mock('../hooks/api/findUserByUserId');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

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

  it('戻るボタンをクリックすると/に遷移する', async() => {
    const mockNav = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNav);
    
    
    render(
      <MemoryRouter initialEntries={['/cards/testID']}>
        <Routes>
          <Route path="/cards/:id" element={<UserCard />} />
        </Routes>
      </MemoryRouter>
    );

    const target = await screen.findByTestId('return-button');

    await userEvent.click(target);

    expect(mockNav).toHaveBeenCalledWith('/');

  });
});