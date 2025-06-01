const express = require("express");
const app = express();

require("dotenv/config");

const cors = require("cors");
const {default:mongoose} = require("mongoose");

app.use(cors({origin:true}));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("hi there ...");
});
//user authentication route 
const userRoute = require("./routes/auth");
app.use("/api/users/",userRoute);

//Artists Routes 
const artistsRoutes=require("./routes/artist");
app.use("/api/artist/",artistsRoutes);
//Albums Routes
const albumRoutes=require("./routes/album");
app.use("/api/album",albumRoutes);
//Songs Routes
const songRoutes=require("./routes/songs");
app.use("/api/songs",songRoutes); 


mongoose.connect(process.env.DB_STRING);

mongoose.connection
  .once("open", () => console.log(" MongoDB Connected"))
  .on("error", (err) => {
    console.error(` MongoDB Connection Error: ${err}`);
  });

app.listen(4000, () => {
  console.log(" Server listening on port 4000");
});
