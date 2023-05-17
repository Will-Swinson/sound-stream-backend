import { error } from "console";
import { sql } from "../server.js";

export const getAllUsers = async (req, res) => {
  try {
    const data = await sql`SELECT * FROM users;`;
    console.log(data);
    res.status(200).json({
      status: "Success",
      data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const addUser = async (req, res) => {
  try {
    const { username, password, email } = await req.body;
    console.log(username, password, email);
    const existingUser =
      await sql`SELECT * FROM users WHERE username = ${username} AND password=${password} AND email=${email};`;

    if (existingUser.length > 0) {
      return res.status(200).json({
        status: "success",
        selectedUser: existingUser[0],
      });
    } else {
      const newUser = await sql`
  WITH inserted_user AS (
    INSERT INTO users (username, password, email)
    VALUES (${username}, ${password}, ${email})
    RETURNING id
  )
  INSERT INTO playlists (user_id)
  SELECT id FROM inserted_user
  RETURNING *;
`;
      console.log(newUser);
      res.status(200).json({
        status: "success",
        selectedUser: newUser[0],
      });
    }
  } catch (err) {
    console.error(err);
  }
};
