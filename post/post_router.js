const express = require("express");
const db = require("./post_models");

/* restrict middleware  */
const restrict = require("../middleware/restrict");


const router = express.Router();

//-----------------------------------------------------------------------------
// Returns all posts 
//-----------------------------------------------------------------------------
router.get("/getall", async (req, res, next) => {
  try {
    const howtos = await db.getAllHowtos();
    res.status(200).json(howtos);
  } catch (err) {
    next(err);
  }
});

//-----------------------------------------------------------------------------
// Returns post by Id
//-----------------------------------------------------------------------------
router.get("/gethowto/:id", (req, res) => {
  const { id } = req.params;
  db.getHowtoById(id)
    .then((howto) => {
      if (howto) {
        return res.status(200).json(howto);
      } else {
        res.status(404).json({
          Error: "Could not find howto with given id. Please check line 23",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        Message: "Failed to get howto. Please check line 23",
      });
    });
});

//-----------------------------------------------------------------------------
// Posts a new; user = basic
//-----------------------------------------------------------------------------
router.post("/new", restrict("basic"), (req, res) => {
  const howtoData = req.body;

  const author = req.token.username;
  console.log(req.token);

  // db.addHowto(howtoData)
  db.addHowto({ ...howtoData, author })
    .then((howto) => {
      res.status(201).json({
        Success: "Your howto was added successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        Error: "Failed to add your lifehack",
      });
    });
});

//-----------------------------------------------------------------------------
// Updates post;  user = basic 
//-----------------------------------------------------------------------------
router.put("/update/:id", restrict("basic"), (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.getHowtoById(id)
    .then((howto) => {
      if (howto) {
        db.updateHowto(changes, id).then((updatedHowto) => {
          res.json({
            Success: updatedHowto + " howto has been updated successfully.",
          });
        });
      } else {
        res.status(404).json({
          Error:
            "Could not find howto with given id. please try another scheme id",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        Error: "Failed to update howto. please check your code",
      });
    });
});

//-----------------------------------------------------------------------------
// Updates post;  user = admin
//-----------------------------------------------------------------------------

router.delete("/delete/:id", restrict("basic"), (req, res) => {
  const { id } = req.params;

  db.removeHowto(id)
    .then((deleted) => {
      if (deleted) {
        res.json({
          Deleted: deleted + " howto has been successfully deleted.",
        });
      } else {
        res.status(404).json({
          Error:
            "Could not find howto with given id. Please try another howto id.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        Error: "Failed to delete howto. Please check your code",
      });
    });
});

//-----------------------------------------------------------------------------
module.exports = router;
