const { model } = require("mongoose");

const router=require("express").Router();
const album = require("../models/album");


router.post("/save", async (req, res) => {
  const newAlbum = album({
    name: req.body.name,
    imageURL: req.body.imageURL,
  });
  try {
    const savedAlbum = await newAlbum.save();
    return res.status(200).send({ success: true, album: savedAlbum });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

router.get("/getOne/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const data = await album.findOne(filter);
  if (data) {
    return res.status(200).send({ success: true, album: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found " });
  }
});


//the upper funtion fetch online the single album data
//now create a function which will fetch all the information which match with album
router.get("/getAll", async (req, res) => {
  const options = {
    sort: {
      createdAt: 1,
    },
  };

  const data = await album.find({}, null, options);
  if (data) {
    return res.status(200).send({ success: true, album: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found " });
  }
});

//update and delte request for album
//update request for album
router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const options = {
    upsert: true, //if there is no data so upsert create a new one
    new: true,
  };
  try {
    const result = await album.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
      },
      options
    );

    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

//delete request
router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const result = await album.deleteOne(filter);
  if (result) {
    return res
      .status(200)
      .send({ success: true, msg: "Data Deleted Successfully", data: result });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found " });
  }
});


module.exports =router;