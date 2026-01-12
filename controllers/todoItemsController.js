const TodoItem = require("../models/TodoItem");

exports.addTodoItem = async (req, res, next) => {
  const { task, date } = req.body;
  const todoItem = new TodoItem({ task, date });
  await todoItem.save();
  res.status(201).json(todoItem);
};
exports.getAllTodoItems = async (req, res, next) => {
  const todoItems = await TodoItem.find();
  res.status(200).json(todoItems);
};
exports.deleteTodoItem = async (req, res, next) => {
  const { id } = req.params;
  await TodoItem.findByIdAndDelete(id);
  res.status(200).json({ message: "Todo item deleted successfully" });
};
exports.markCompleted = async (req, res, next) => {
  const { id } = req.params;
  const todoItem = await TodoItem.findById(id);
  todoItem.completed = true;
  await todoItem.save();
  res.status(200).json(todoItem);
};
