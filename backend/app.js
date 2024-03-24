require('dotenv').config();
const cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { expressjwt: expressJwt } = require("express-jwt");
const { authenticateToken } = require("./middlewares/auth");
const { login } = require("./controllers/authController");
const routes = require("./routes/routes");
const commentRoutes = require("./routes/commentRoutes");
const {jwtSecret} = require("./config");

const app = express();
// MongoDB connection setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.MONGO_CLUSTER_URL}`;
mongoose.connect(uri)
.then(() => {
    console.log("Connected to MongoDB Atlas");
})
.catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
});

app.use(
  expressJwt({ secret: jwtSecret, algorithms: ["HS256"] }).unless({
    path: [
      "/api/login",
      "/api/signup",
      "/api/news",
      "/api/news-by-id",
    ],
  })
);

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/api", routes);
app.use("/api/comments", commentRoutes);

app.post("/login", login);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
