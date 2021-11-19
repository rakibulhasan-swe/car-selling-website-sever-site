const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const servicesSchema = require("./dataSchema");
const Services = new mongoose.model("Service", servicesSchema);

router.get("/", (req, res) => {
  Services.find({})
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

router.get("/limit/:num", (req, res) => {
  // const limitData = req.params.num;
  // console.log(limitData)
  // Services.find({ status: 'active' })
  //     .select({
  //         _id: 0,
  //         date: 0,
  //         __v: 0
  //     })
  //     .limit(req.params.num)
  //     .exec((err, data) => {
  //         err ? res.status(500).json({ error: "server side error" }) : res.status(200).send(data);
  //     });
});

router.get("/:id", (req, res) => {
  Services.find({ _id: req.params.id }, (err, data) => {
    err
      ? res.status(500).json({ error: "server side error" })
      : res.status(200).send(data);
  });
});

// add service
router.post("/", (req, res) => {
  const newData = new Services(req.body);
  newData.save((err) => {
    err
      ? res.status(500).json({ error: err })
      : res.status(200).json({ message: "Data inserted successfully." });
  });
});

router.delete("/:id", (req, res) => {
  Services.deleteOne({ _id: req.body.id }, (err) => {
    err
      ? res.status(500).json({ error: "server side error" })
      : res.status(200).json({ message: "Data deleted successfully." });
  });
});

router.put("/:id", (req, res) => {
  const { id, title, description } = req.body;
  Services.findByIdAndUpdate(
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
  Services.findByIdAndUpdate(
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
