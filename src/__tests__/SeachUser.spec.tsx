import { render, screen } from "@testing-library/react";
import { SearchUser } from "../pages/SearchUser";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('トップページの描画テスト', () => { 

  it('タイトルが表示されている', async() => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SearchUser />} />
        </Routes>
      </MemoryRouter>
    );

    const target = await screen.findByTestId('title');
    expect(target).toHaveTextContent('デジタル名刺アプリ');
  });
});

describe('トップページの機能テスト', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('IDを入力してボタンを押すと/cards/:idに遷移する', async() => {
    const mockNav = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNav);

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SearchUser />} />
        </Routes>
      </MemoryRouter>
    );

    const id = await screen.findByTestId('id');
    await userEvent.type(id, 'testID');

    const submit = await screen.findByTestId('submit');
    await userEvent.click(submit);

    expect(mockNav).toHaveBeenCalledWith('cards/testID');
  });

  it('新規登録はこちらを押すと/cards/registerに遷移する', async() => {
    const mockNav = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNav);

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SearchUser />} />
        </Routes>
      </MemoryRouter>
    );

    const register = await screen.findByTestId('register');
    await userEvent.click(register);

    expect(mockNav).toHaveBeenCalledWith('/cards/register');
  });

  describe('エラーメッセージの確認', () => {
    it('IDを入力しないでボタンを押すとエラーメッセージが表示される', async() => {
      const mockNav = jest.fn();
      (useNavigate as jest.Mock).mockReturnValue(mockNav);
  
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<SearchUser />} />
          </Routes>
        </MemoryRouter>
      );
  
      const submit = await screen.findByTestId('submit');
      await userEvent.click(submit);

      const err = await screen.findByTestId('id-err');
      expect(err).toHaveTextContent('IDを入力してください');
    });
  });
});