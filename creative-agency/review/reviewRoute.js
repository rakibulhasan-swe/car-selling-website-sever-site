const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const CustomerSchema = require("./reviewSchema");
const CustomerReview = new mongoose.model("CustomerReview", CustomerSchema);

router.get("/", (req, res) => {
  CustomerReview.find({})
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

// router.get("/:id", (req, res) => {
//   CustomerReview.find({ _id: req.params.id }, (err, data) => {
//     err
//       ? res.status(500).json({ error: "server side error" })
//       : res.status(200).send(data);
//   });
// });

// add service
router.post("/", (req, res) => {
  const newData = new CustomerReview(req.body);
  newData.save((err) => {
    err
      ? res.status(500).json({ error: err })
      : res.status(200).json({ message: "Review successfully." });
  });
});

router.delete("/:id", (req, res) => {
  CustomerReview.deleteOne({ _id: req.body.id }, (err) => {
    err
      ? res.status(500).json({ error: "server side error" })
      : res.status(200).json({ message: "Data deleted successfully." });
  });
});


module.exports = router;
