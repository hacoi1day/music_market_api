import * as bcrypt from 'bcrypt';

export const hashPassword = async (str: string): Promise<string> => {
  const saltOrRounds = 10;
  return await bcrypt.hash(str, saltOrRounds);
};

export const comparePassword = async (
  password,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
