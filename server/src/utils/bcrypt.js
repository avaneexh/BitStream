import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
