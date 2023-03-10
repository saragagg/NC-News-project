const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topicsControllers");
const { getEndpoints } = require("./controllers/apisControllers");

const cors = require('cors');

const {
  getArticles,
  getArticleById,
  patchArticleVote,
} = require("./controllers/articleController");

const {
  postComment,
  getArticleComments,
  deleteComment,
} = require("./controllers/commentsControllers");

const {
  handleError500,
  handleCustomError,
  handlePSQL400err,
  handle404NonExistentPaths,
} = require("./controllers/errorHandlingcontrollers");

const { getUsers } = require("./controllers/userControllers");


app.use(cors());

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getArticleComments);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticleVote);

app.get("/api/users", getUsers);

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api", getEndpoints);

app.use(handle404NonExistentPaths);

app.use(handlePSQL400err);
app.use(handleCustomError);
app.use(handleError500);

module.exports = app;
