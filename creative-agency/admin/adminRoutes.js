const express = require("express");
const mongoose = require("mongoose");
const adminRouter = express.Router();
const adminSchema = require("./adminSchema");
const AdminServices = new mongoose.model("AdminService", adminSchema);

adminRouter.get("/", (req, res) => {
  AdminServices.find({})
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
adminRouter.post("/", (req, res) => {
  const newData = new AdminServices(req.body);
  newData.save((err) => {
    err
      ? res.status(500).json({ error: "server side error" })
      : res.status(200).json({ message: "Data inserted successfully." });
  });
});

adminRouter.delete("/:id", (req, res) => {
  AdminServices.deleteOne({ _id: req.body.id }, (err) => {
    err
      ? res.status(500).json({ error: "server side error" })
      : res.status(200).json({ message: "Data deleted successfully." });
  });
});

adminRouter.put("/:id", (req, res) => {
  const { id, title, description } = req.body;
  AdminServices.findByIdAndUpdate(
    { _id: req.params.id },
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


module.exports = adminRouter;
