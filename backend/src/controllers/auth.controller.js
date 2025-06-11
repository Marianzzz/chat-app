import { users } from "../lib/schema.js";
import { db } from "../lib/db.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/util.js";

export async function signup(req, res) {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Всі поля обов'язкові" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Пароль має бути більше 6 символів" });
    }

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Пошта вже існує" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const insertedUsers = await db
      .insert(users)
      .values({
        fullName,
        email,
        password: hashedPassword,
      })
      .returning();

    const newUser = insertedUsers[0];

    generateToken(newUser.id, res);

    res.status(201).json({
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("Помилка в контролері реєстрації:", error.message);
    res.status(500).json({ message: "Внутрішня помилка сервера" });
  }
}

export function login(req, res) {
  res.send("login route");
}

export function logout(req, res) {
  res.send("logout route");
}
