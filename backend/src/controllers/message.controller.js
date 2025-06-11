import { ne, and, or, eq } from "drizzle-orm";
import { db } from "../lib/db.js";
import { users, messages } from "../lib/schema.js";

export async function getUsersForSidebar(req, res) {
  try {
    const loggedInUserId = req.user.id;

    const filteredUsers = await db
      .select({
        id: users.id,
        email: users.email,
        fullName: users.fullName,
        profilePic: users.profilePic,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(ne(users.id, loggedInUserId));

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Помилка в getUsersForSidebar:", error.message);
    res.status(500).json({ error: "Внутрішня помилка сервера" });
  }
}
export async function getMessages(req, res) {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user.id;

    const result = await db
      .select()
      .from(messages)
      .where(
        or(
          and(
            eq(messages.senderId, senderId),
            eq(messages.receiverId, userToChatId)
          ),
          and(
            eq(messages.senderId, userToChatId),
            eq(messages.receiverId, senderId)
          )
        )
      )
      .orderBy(messages.createdAt);

    res.status(200).json(result);
  } catch (error) {
    console.error("Помилка в getMessages controller:", error.message);
    res.status(500).json({ error: "Внутрішня помилка сервера" });
  }
}
