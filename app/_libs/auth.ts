import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

export function getJwtSecretKey() {
  const secret = process.env.TOKEN_SECRET;
  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }
  return new TextEncoder().encode(secret);
}


export async function verifyJwtToken(req: NextRequest, token: string) {
  try {
    const { payload } = await jwtVerify(token as string, getJwtSecretKey());
    return payload;

  } catch (error) {
    return null;
  }
}