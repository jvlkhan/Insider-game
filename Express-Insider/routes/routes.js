import express from "express";
import { v4 as uuidv4 } from "uuid";

const route = express.Router();

let userList = [
  {
    title: "",
    username: "boba",
    score: 0,
    secretWord: "Unknown",
    id: "10c5848c-6dc2-4683-bd14-af2aaedb60a1",
  },
  {
    title: "",
    username: "global elite",
    score: 0,
    secretWord: "Unknown",
    id: "94a09932-790e-431a-a34c-2f8af03687d5",
  },
  {
    title: "",
    username: "storebruh",
    score: 0,
    secretWord: "Unknown",
    id: "793e98bb-aa87-425b-809f-09a1b4001145",
  },
  {
    title: "",
    username: "morsan",
    score: 0,
    secretWord: "Unknown",
    id: "305898e8-c484-437d-a2c3-b2044241f4b7",
  },
  {
    title: "",
    username: "flygkaptenen",
    score: 0,
    secretWord: "Unknown",
    id: "323897e8-c484-437d-a2c3-b2044241f3t1",
  }
];
/*  {
      title: "",
    username: "boba",
    score: 0,
    secretWord: "Unknown",
    id: "10c5848c-6dc2-4683-bd14-af2aaedb60a1",
    } 
*/

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
  res.send(userList);
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
  const user = userList.find(
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
  userList.push(user);
  res.send(user);
});

/**
 * @swagger
 *   /insider/start/{userAndWord}:
 *     put:
 *       description: Start game by entering secret word and username
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: userAndWord
 *           description: The username of the requested post
 *           schema:
 *             type: array
 *             required:
 *               - userAndWord
 *             properties:
 *               userAndWord:
 *                 type: string
 *       responses:
 *          200:
 *            description: Succes
 */
route.put("/start/:userAndWord", (req, res) => {
  resetTitles();

  const userAndWord = req.params.userAndWord;

  let UserNameIn = userAndWord.split(",")[0];
  let secret = userAndWord.split(",")[1];
 
    let objUser = userList.filter(x=>x.username === UserNameIn)
                          .reduce((prev)=>{return prev})

console.log(objUser)

objUser.secretWord = secret
objUser.title = "Game host"

  res.status(200).send();
  


  randomizeInsider(objUser.username, secret);
})

function resetTitles(){
    for(let x of userList){
      x.title = "";
      x.secretWord = "";
    }
}


function randomizeInsider(host, secret){

  let randomizedInt = 0;
  randomizedInt = Math.random() * (userList.length-1)
  const rounded = Math.round(randomizedInt)
  console.log(rounded)

  for(let i = 0; i < userList.length-1; i++){
    if(userList[rounded].username !== host){
      userList[rounded].title = "Insider";
      userList[rounded].secretWord = secret;
    } else {
      console.log(rounded, "hit host")
      randomizeInsider(host, secret);
    }
  }


    for(let player of userList){
        if(player.title != "Game host"){
          if(player.title != "Insider"){
            player.title = "Player"
          }
        }
    }
}


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
  userList = userList.filter(
    (user) => user.username !== req.params.username
  );
  res.status(200).send();
});

/**
 * //@swagger
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
// route.put("/username/:username/score", (req, res) => {
//   const oldpost = posts.find((post) => post.id === req.params.id);

//   const updatedPost = {
//     ...oldpost,
//     ...req.body,
//     edited: new Date().toLocaleString(),
//   };

//   posts = posts.map((post) =>
//     post.id === updatedPost.id ? updatedPost : post
//   );

//   res.send(updatedPost);
// });

export default route;
