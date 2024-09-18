export class User{
  readonly user_id!: string;
  readonly name!: string;
  readonly description!: string;
  readonly github_id!: string;
  readonly qiita_id!: string;
  readonly x_id!: string;
  readonly skills_name!: Array<string>;

  constructor(init: {
    user_id: string;
    name: string;
    description: string;
    github_id?: string | null;
    qiita_id?: string | null;
    x_id?: string | null;
    skills_name: Array<string>;
  }) {
    this.user_id = init.user_id;
    this.name = init.name;
    this.description = init.description;
    this.github_id = init.github_id ?? '';
    this.qiita_id = init.qiita_id ?? '';
    this.x_id = init.x_id ?? '';
    this.skills_name = init.skills_name;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDatabaseResult(dbResult: any): User {
    return new User({
      user_id: dbResult.user_id,
      name: dbResult.name,
      description: dbResult.description,
      github_id: dbResult.github_id,
      qiita_id: dbResult.qiita_id,
      x_id: dbResult.x_id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      skills_name: dbResult.user_skill.map((skill: any) => skill.skills.name)
    });
  }
};