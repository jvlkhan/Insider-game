import express from "express";
import { v4 as uuidv4 } from "uuid";

const route = express.Router();

let postusername = [
  {
    title: "",
    username: "boba",
    score: 0,
    id: "10c5848c-6dc2-4683-bd14-af2aaedb60a1",
  },
  {
    title: "",
    username: "global elite",
    score: 0,
    id: "94a09932-790e-431a-a34c-2f8af03687d5",
  },
  {
    title: "",
    username: "storebruh",
    score: 0,
    id: "793e98bb-aa87-425b-809f-09a1b4001145",
  },
  {
    title: "",
    username: "morsan",
    score: 0,
    id: "305898e8-c484-437d-a2c3-b2044241f4b7",
  },
];

/**
 * @swagger
 *   /insider/allusers:
 *     get:
 *       description: Get all user by username
 *       produces:
 *         - application/json
 *       parameters:
 *           schema:
 *             properties:
 *               username:
 *                 type: string
 *       responses:
 *          200:
 *            description: Succes
 */
route.get("/allusers", (req, res) => {
  res.send(postusername);
});

/**
 * @swagger
 *   /insider/username/{username}:
 *     get:
 *       description: Get a single post by username
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: username
 *           description: The username of the requested post
 *           schema:
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *       responses:
 *          200:
 *            description: Succes
 */
route.get("/username/:username", (req, res) => {
  const user = postusername.find(
    (user) => user.username === req.params.username
  );
  res.send(user || "no such username found");
});

/**
 * @swagger
 *   /insider/add/user/{username}:
 *     post:
 *       description: Add user by username
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: username
 *           description: The username of the requested post
 *           schema:
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *       responses:
 *          200:
 *            description: Succes
 */
route.post("/add/user/:username", (req, res) => {
  const user = {
    username: req.params.username,
    id: uuidv4(),
  };
  postusername.push(user);
  res.send(user);
});

/**
 * @swagger
 *   /insider/delete/username/{username}:
 *     delete:
 *       description: Delete user by username
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: username
 *           description: The username of the requested post
 *           schema:
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *       responses:
 *          200:
 *            description: Succes
 */
route.delete("/delete/username/:username", (req, res) => {
  postusername = postusername.filter(
    (user) => user.username !== req.params.username
  );
  res.status(200).send();
});

/**
 * @swagger
 *   /insider/username/{username}/score:
 *     put:
 *       description: Update score
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: username
 *         - in: path
 *           score: score
 *           description: Update score for user
 *           schema:
 *             required:
 *               - username
 *               - score
 *             properties:
 *               username:
 *                 type: string
 *               score:
 *                 type: int
 *       responses:
 *          200:
 *            description: Succes
 */
route.put("/username/:username/score", (req, res) => {
  const oldpost = posts.find((post) => post.id === req.params.id);

  const updatedPost = {
    ...oldpost,
    ...req.body,
    edited: new Date().toLocaleString(),
  };

  posts = posts.map((post) =>
    post.id === updatedPost.id ? updatedPost : post
  );

  res.send(updatedPost);
});

export default route;
