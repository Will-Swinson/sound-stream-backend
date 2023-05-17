import express from "express";
const router = express.Router();

import { addSong, getPlaylist } from "../Controllers/playlistController.js";

router.post("/", addSong);
router.get("/all", getPlaylist);

export default router;
