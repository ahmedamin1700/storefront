import UsersRepository, { User } from '../../models/users';

const repo = new UsersRepository();

describe('User model', () => {
  it('should have index method', () => {
    expect(repo.index).toBeDefined();
  });

  it('should have show method', () => {
    expect(repo.show).toBeDefined();
  });

  it('should have create method', () => {
    expect(repo.create).toBeDefined();
  });

  it('should have authenticate method', () => {
    expect(repo.authenticate).toBeDefined();
  });

  it('should create a user using create method', async () => {
    const result: User = await repo.create({
      username: 'admin',
      firstname: 'Ahmed',
      lastname: 'Amin',
      password: '123456',
    });

    expect(result.username).toEqual('admin');
  });

  it('should authenticate a user using authenticate method', async () => {
    const result: User = await repo.authenticate('admin', '123456');

    expect(result.username).toEqual('admin');
  });

  it('should show a specific user using show method', async () => {
    const result: User = await repo.show(2);
    expect(result.username).toEqual('admin');
  });

  it('should list all users using index method', async () => {
    const result: User[] = await repo.index();
    expect(result.length).toEqual(2);
  });
});
