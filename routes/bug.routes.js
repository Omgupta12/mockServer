const express = require("express");
const Bug  = require("../model/bug.model");
const app = express.Router()

app.post("/create", async (req, res) => {
    const {content,type} =req.body
  try {
    const bug = new Bug({content,type})
    await bug.save()
    res.status(201).send(bug);
  } 
  catch (err) {
    res.status(500).send({ message: err.message });
  }
})

app.get("/get",  async (req, res) => {
    const { type } = req.body;
  try {
    // const { type } = req.query;
    const bug = await Bug.find({ type });
    res.status(200).send(bug);
  } 
  catch (err) {
    res.status(500).send({ message: err.message });
  }
})

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bug = await Bug.findByIdAndDelete(id);
    res.status(200).send('bug deleted successfully');
  } 
  catch (err) {
    res.status(500).send({ message: err.message });
  }
})

module.exports = app