const express = require("express");
const todoItemsRouter = express.Router();
const todoItemsController = require("../controllers/todoItemsController");

todoItemsRouter.get("/", todoItemsController.getAllTodoItems);
todoItemsRouter.post("/", todoItemsController.addTodoItem);
todoItemsRouter.delete("/:id", todoItemsController.deleteTodoItem);
todoItemsRouter.put("/:id/completed", todoItemsController.markCompleted);

module.exports = todoItemsRouter;
