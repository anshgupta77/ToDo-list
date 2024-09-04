const express =require("express");
const app =express();
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const PORT = 3045;
require("./conn/conn.js");
const authRoutes = require("./routes/auth");
const listRoutes = require("./routes/list");
app.use(express.json());
app.use(cors());

app.use(morgan("dev"));
app.use("/auth", authRoutes);
app.use("/list", listRoutes);

app.get("/", (req,res) =>{
    app.use(express.static(path.resolve(__dirname, "frontend copy", "build")));
    res.sendFile(path.resolve(__dirname, "frontend copy", "build", "index.html"));

})
app.listen(PORT, () =>{
    console.log("Server is listen", PORT);
})
