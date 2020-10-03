const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const privateKey = fs.readFileSync(path.resolve(__dirname, "../keystore/private.pem"));
const publicKey = fs.readFileSync(path.resolve(__dirname, "../keystore/public.pem"));

/* Token 확인 미들웨어 */
async function loggingMiddleware(req, res, next) {
	const token = req.headers.authorization;
	const time = new Date();
	if (token === undefined) {
		res.redirect("https://www.naver.com/");
	} else {
		await jwt.verify(token, publicKey, async (err, result) => {
			if (err) {
				return res.status(402).json({ code: 402, msg: "error" });
			} else {
				if (!result) {
					res.status(402).json({ code: 402, msg: "no auth" });
				} else {
					if (result.exp > Math.floor(time.getTime() / 1000)) {
						next();
					} else {
						res.status(402).json({ code: 402, msg: "no auth" });
					}
				}
			}
		});
	}
}

module.exports = loggingMiddleware;