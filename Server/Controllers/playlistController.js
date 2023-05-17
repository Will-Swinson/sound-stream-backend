import { error } from "console";
import { sql } from "../server.js";

export const addSong = async (req, res) => {
  const song = req.body.uri;
  const [{ id: playlistId }] =
    await sql`SELECT id FROM playlists WHERE user_id = ${req.headers.authorization}`;

  const addedSong =
    await sql`INSERT INTO playlist_songs(playlist_id, song_id) VALUES(${playlistId}, ${song}) ON CONFLICT (playlist_id, song_id) DO UPDATE SET playlist_id = ${playlistId}, song_id = ${song} RETURNING *`;

  res.json({
    status: "Success",
    addedSong,
  });
};

export const getPlaylist = async (req, res) => {
  const userId = Number(req.query.userId);

  const playlist = await sql`SELECT ps.playlist_id, ps.song_id
  FROM playlist_songs ps
  JOIN playlists p ON ps.playlist_id = p.id
  JOIN users u ON p.user_id = u.id
  WHERE u.id = ${userId};`;
  res.json({
    status: "Success",
    playlist,
  });
};
