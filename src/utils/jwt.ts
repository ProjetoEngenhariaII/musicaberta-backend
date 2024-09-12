import jwt from "jsonwebtoken";
import { Payload } from "./jwt.types";

export async function verifyToken(token: string) {
  try {
    console.log("JWTENV => ", process.env.JWT_SECRET);
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function sign(payload: Payload) {
  return jwt.sign(payload, process.env.JWT_SECRET as string);
}
