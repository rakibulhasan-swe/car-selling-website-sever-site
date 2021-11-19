const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const makeAdminSchema = require("./makeAdminSchema");
const MakeAdmin = new mongoose.model("MakeAdmin", makeAdminSchema);

router.get("/", (req, res) => {
  MakeAdmin.find({})
    .select({
      // _id: 0,
      // date: 0,
      __v: 0,
    })
    // .limit(2)
    .exec((err, data) => {
      err ? res.status(500).json({ error: err }) : res.status(200).send(data);
    });
});

// add service
router.post("/", (req, res) => {
  const newData = new MakeAdmin(req.body);
  newData.save((err) => {
    err
      ? res.status(500).json({ error: err })
      : res.status(200).json({ message: "Admin created successful." });
  });
});

router.delete("/:id", (req, res) => {
  MakeAdmin.deleteOne({ _id: req.params.id }, (err) => {
    err
      ? res.status(500).json({ error: "server side error" })
      : res.status(200).json({ message: "Data deleted successfully." });
  });
});

router.put("/:id", (req, res) => {
  const { id, title, description } = req.body;
  MakeAdmin.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        title: title,
        description: description,
      },
    },
    {
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        res.status(500).json({ error: "server side error" });
      } else {
        res.status(200).json({ message: "Data updated successfully." });
      }
    }
  );
});

router.put("/:statusValue/:id", (req, res) => {
  const { statusValue, id } = req.params;
  MakeAdmin.findByIdAndUpdate(
    { _id: id },
    {
      $set: { status: statusValue },
    },
    {
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        res.status(500).json({ error: "server side error" });
      } else {
        res.status(200).json({ message: "Data updated successfully." });
      }
    }
  );
});

module.exports = router;
