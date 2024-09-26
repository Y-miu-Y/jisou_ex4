

jest.mock('../hooks/api/findUserByUserId');
jest.mock('../hooks/api/insertNewUser');
jest.mock('../hooks/api/insertUserSkill');
jest.mock('../hooks/api/selectAllSkills');

describe('test', () => {
  it("テストが実行されることの確認", async () => {
    expect(true).toBeTruthy();
  });
});