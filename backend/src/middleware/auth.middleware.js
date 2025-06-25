import jwt from "jsonwebtoken";
import { users } from "../lib/schema.js";
import { db } from "../lib/db.js";
import { eq } from "drizzle-orm";

export async function protectRoute(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Не авторизований, немає токена" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Не авторизований, токен не вірний" });
    }
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, decoded.userId));

    const existingUser = result[0];
    if (!existingUser) {
      return res.status(401).json({ message: "Користувача не знайдено" });
    }
    const { password, ...userWithoutPassword } = existingUser;

    req.user = userWithoutPassword;
    next();
  } catch (error) {
    console.error("Помилка у protectRoute:", error.message);
    res.status(500).json({ message: "Помилка авторизації" });
  }
}
