import express from "express";
const router = express.Router();

import { addUser, getAllUsers } from "../Controllers/usersController.js";

router.get("/", getAllUsers);
router.post("/", addUser);

export default router;
