const fs = require("fs");
const path = require("path");
const express = require("express");
const jwt = require("jsonwebtoken");

const loggingMiddleware = require("../../utils/LoginCheckMiddleware");

const privateKey = fs.readFileSync(path.resolve(__dirname, "../../keystore/private.pem"));

const router = express.Router();

router.post("/signin", async (req, res) => {
	/* 데이터 불러오기 */
	const jsonFile = fs.readFileSync(path.resolve(__dirname, "../../data/Users.json"), "utf8");
	const jsonData = JSON.parse(jsonFile);
	const users = jsonData.users;
	
	const { username, password } = req.body;

	for(let user of users) {
		if (user.username == username) {
			if (user.password == password) {
				const token = await jwt.sign(
					{
						username,
					},
					privateKey,
					{
						algorithm: "RS256",
						expiresIn: "7d",
					},
				);
				return res.status(200).json({ code: 200, token });
			} else {
				return res.status(402).json({ code: 402, msg: "no correct pw" });
			}
		}
	}
	return res.status(404).json({ code: 404, msg: "no user" });
});


module.exports = router;