const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");

// Get all the ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ succes: false, error: "Something went wrong" });
  }
});

// Get single idea by id
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    res.status(500);
    res.json({ succes: false, error: "Something went wrong" });
  }
});

// Update the value
router.put("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        { new: true },
      );
      return res.json({ success: true, data: updatedIdea });
    }
    res.status(403).json({
      success: false,
      error: "You are not authorized to  update  this resource",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
});

// Delete a idea by id
router.delete("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({ success: true, data: {} });
    }

    res.status(403).json({
      success: false,
      error: "You are not authorized to delete this resource",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

//Adding  the value
router.post("/", async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

module.exports = router;
