import experss from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar, getMessages } from "../controllers/message.controller.js";

const router = experss.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

export default router;
