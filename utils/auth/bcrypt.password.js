import bcrypt from "bcryptjs";

const { genSalt, hash, compare } = bcrypt;

export async function encryptPassword(password) {
    const salt = await genSalt(10);
    const secPassword = await hash(password, salt);
    return secPassword;
}

export async function isPasswordCorrect(userPassword, orgPassword) {
    const passwordMatches = await compare(userPassword, orgPassword);
    return passwordMatches;
}