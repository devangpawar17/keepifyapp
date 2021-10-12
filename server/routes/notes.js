const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchUser");

//ROUTE 1 : get all the notes :GET "api/notes/fetchallnotes" . login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (e) {
    console.log(e);
    res.status(500).send("internal error occured");
  }
});


//ROUTE 2 : add a new note  :POST "api/notes/fetchallnotes" .login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "title must be 3 chars").isLength({ min: 3 }),
    body("description", "description must be 5 chars").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedData = await note.save();

      res.json(savedData);
    } catch (e) {
      console.log(e);
      res.status(500).send("internal error occured");
    }
  }
);

//ROUTE 3 : update a existing note  :PUT "api/notes/updatenote" .login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //create new note obj
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (e) {
    console.log(e);
    res.status(500).send("internal error occured");
  }
});


//ROUTE 4 : delete a existing note  :DELETE "api/notes/deletenote" .login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      
  
      //find note to be deleted and delete it
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("not found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("not allowed");
      }
      note = await Note.findByIdAndDelete(req.params.id,);
      res.json({ "success":"note deleted" });
    } catch (e) {
      console.log(e);
      res.status(500).send("internal error occured");
    }
  });
  



module.exports = router;
