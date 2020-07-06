var controller = require("./controllers");
var router = require("express").Router();

router.post("/signup", controller.signup.post)

router.get("/mypage", controller.mypage.get)

router.post("/mypage", controller.mypage.post)

router.get("/selectstage", controller.selectstage.get)

router.get("/playstage", controller.playstage.get)

router.get("/rank", controller.rank.get)

router.post("/login", controller.login.post)

router.post("/guest", controller.guest.post)

router.post("/gameover", controller.gameover.post)

module.exports = router;