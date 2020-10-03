const fs = require("fs");
const path = require("path");
const express = require("express");

const loggingMiddleware = require("../../utils/LoginCheckMiddleware");

const router = express.Router();

// 인가 된 사용자만 접근 가능한 미들 웨어
router.use("/get/users", loggingMiddleware);

router.get("/get/users", (req, res) => {
	/* 데이터 불러오기 */
	const jsonFile = fs.readFileSync(path.resolve(__dirname, "../../data/Users.json"), "utf8");
	const jsonData = JSON.parse(jsonFile);
	const users = jsonData.users;
	
	res.status(200).json({ code: 200, users: users.map(user => { return { id: user.id }}) });
});

// 인가 된 사용자만 접근 가능한 미들 웨어
router.use("/get/user/:id", loggingMiddleware);

router.get("/get/user/:id", (req, res) => {
	/* 데이터 불러오기 */
	const jsonFile = fs.readFileSync(path.resolve(__dirname, "../../data/Users.json"), "utf8");
	const jsonData = JSON.parse(jsonFile);
	const users = jsonData.users;
	
	/* params parse */
	const { id } = req.params;
	for(let user of users) {
		if (user.id == id) {
			return res.status(200).json({ code: 200, user: { username: user.username } });
		}
	}
	res.status(204).json({ code: 204 });
});

// 인가 된 사용자만 접근 가능한 미들 웨어
router.use("/apply/user", loggingMiddleware);

router.post("/apply/user", (req, res) => {
	/* body parse */
	const { username, password } = req.body;
	
	/* 데이터 읽기 */
	fs.readFile(path.resolve(__dirname, "../../data/Users.json"), async (err, data) => {
		if (err) {
			res.status(402).json({ code: 402 });
		} else {
			let checkSum = false;
			const obj = JSON.parse(data);
			
			for (let item of await obj.users) {
				if (item.username == username) {
					checkSum = true;
					break;
				}
			}
			
			if (!checkSum) {
				obj.users.push({
					id: obj.users.length + 1,
					username,
					password
				});
				const json = JSON.stringify(obj);
				fs.writeFile(path.resolve(__dirname, "../../data/Users.json"), json, (err) => {
					if (err) {
						console.log(err);
						return res.status(402).json({ code: 402 });
					} else {
						return res.status(201).json({ code: 201 });
					}
				});
			} else {
				return res.status(209).json({ code: 209 });
			}
		}
	});
});

module.exports = router;