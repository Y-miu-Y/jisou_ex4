import userEvent from "@testing-library/user-event";
import { useNavigate, MemoryRouter, Routes, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { insertNewUser } from "../hooks/api/insertNewUser";
import { insertUserSkill } from "../hooks/api/insertUserSkill";
import { selectAllSkills } from "../hooks/api/selectAllSkills";
import { RegistUser } from "../pages/RegistUser";

jest.mock('../hooks/api/insertNewUser');
jest.mock('../hooks/api/insertUserSkill');
jest.mock('../hooks/api/selectAllSkills');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('名刺登録ページの描画テスト', () => { 
  
  beforeAll(() => {
    (selectAllSkills as jest.Mock).mockResolvedValue({
      data:[{
        id: 1,
        name: "React"
      }]
    });
    
  });
  
  afterAll(() => {
    jest.resetAllMocks();
  });
  
  it('タイトルが表示されている', async() => {
    render(
      <MemoryRouter initialEntries={['/cards/register']}>
        <Routes>
          <Route path="/cards/register" element={<RegistUser />} />
        </Routes>
      </MemoryRouter>
    );

    const target = await screen.findByTestId('title');

    expect(target).toHaveTextContent('名刺新規登録');
  });

});

describe('名刺登録ページの機能テスト', () => {  

  beforeAll(() => {
    (insertNewUser as jest.Mock).mockResolvedValue(undefined);
    (insertUserSkill as jest.Mock).mockResolvedValue(undefined);
    (selectAllSkills as jest.Mock).mockResolvedValue({
      data:[{
        id: 1,
        name: "React"
      }]
    });
    
  });
  
  afterAll(() => {
    jest.resetAllMocks();
  });
  
  it('全項目入力して登録ボタンを押すと/に遷移する', async() => {
    const mockNav = jest.fn();
    const mockInsertNewUser = (insertNewUser as jest.Mock);
    (useNavigate as jest.Mock).mockReturnValue(mockNav);

    render(
      <RegistUser />
    );

    const id = await screen.findByTestId('id');
    const name = await screen.findByTestId('name');
    const desc = await screen.findByTestId('desc');
    const skill = await screen.findByTestId('skill');
    const github = await screen.findByTestId('github');
    const qiita = await screen.findByTestId('qiita');
    const x = await screen.findByTestId('x');

    await userEvent.type(id, 'testID');
    await userEvent.type(name, 'テスト太郎');
    await userEvent.type(desc, 'hello World');
    await userEvent.selectOptions(skill, ["1"]);
    await userEvent.type(github, 'testGithub');
    await userEvent.type(qiita, 'testQiita');
    await userEvent.type(x, 'testX');

    const submit = await screen.findByTestId('submit');

    await userEvent.click(submit);

    expect(mockNav).toHaveBeenCalledWith('/');
    expect(mockInsertNewUser).toHaveBeenCalledWith(
      {
        user_id: 'testID',
        name: 'テスト太郎',
        description: 'hello World',
        github_id: 'testGithub',
        qiita_id: 'testQiita',
        x_id: 'testX'
      }
    );
  });

  it('オプションを入力しなくても登録ができる', async() => {
    const mockNav = jest.fn();
    const mockInsertNewUser = (insertNewUser as jest.Mock);
    (useNavigate as jest.Mock).mockReturnValue(mockNav);

    render(
      <RegistUser />
    );

    const id = await screen.findByTestId('id');
    const name = await screen.findByTestId('name');
    const desc = await screen.findByTestId('desc');
    const skill = await screen.findByTestId('skill');

    await userEvent.type(id, 'testID');
    await userEvent.type(name, 'テスト太郎');
    await userEvent.type(desc, 'hello World');
    await userEvent.selectOptions(skill, ["1"]);

    const submit = await screen.findByTestId('submit');

    await userEvent.click(submit);

    expect(mockNav).toHaveBeenCalledWith('/');
    expect(mockInsertNewUser).toHaveBeenCalledWith(
      {
        user_id: 'testID',
        name: 'テスト太郎',
        description: 'hello World',
        github_id: '',
        qiita_id: '',
        x_id: ''
      }
    )
  });

  describe('エラーメッセージの確認', () => {
    it('IDがないときにエラーメッセージがでる', async() => {
      render(
        <RegistUser />
      );

      const submit = await screen.findByTestId('submit');
      await userEvent.click(submit);

      const err = await screen.findByTestId('id-err');
      expect(err).toHaveTextContent('必須項目です');
    });

    it('名前がないときにエラーメッセージがでる', async() => {
      render(
        <RegistUser />
      );

      const submit = await screen.findByTestId('submit');
      await userEvent.click(submit);

      const err = await screen.findByTestId('name-err');
      expect(err).toHaveTextContent('必須項目です');

    });

    it('紹介分がないときにエラーメッセージがでる', async() => {
      render(
        <RegistUser />
      );

      const submit = await screen.findByTestId('submit');
      await userEvent.click(submit);

      const err = await screen.findByTestId('desc-err');
      expect(err).toHaveTextContent('必須項目です');

    });

    it('スキルがないときにエラーメッセージがでる', async() => {
      render(
        <RegistUser />
      );

      const submit = await screen.findByTestId('submit');
      await userEvent.click(submit);

      const err = await screen.findByTestId('skill-err');
      expect(err).toHaveTextContent('必須項目です');
    });
  });
});