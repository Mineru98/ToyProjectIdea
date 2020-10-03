require("dotenv").config({ path: `./setting/.env` });
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const server = http.Server(app);

const UserRoute = require("./routes/user");
const VerifyRoute = require("./routes/verify");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/api/user", UserRoute);
app.use("/api/verify", VerifyRoute);

server.listen(process.env.PORT, () => {
	console.log("server on");
});