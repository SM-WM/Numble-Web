const express = require("express");
const Statistic = require("../models/statistic");

const { createUserJwt } = require("../utils/tokens");

//const security = require("../middleware/security");
//const permissions = require("../middleware/permissions");

const router = express.Router();

router.post("/post", async (req, res, next) => {
  try {
    const stat = await Statistic.postStats(req.body)

    return res.status(200).json({ stat });
  } catch (err) {
    next(err);
  }
});


router.get("/get/:id", async (req, res, next) => {
    try{
        var {id} = req.params
        var stats = await Statistic.getStats(id)

        return res.status(200).json({stats})

    } catch(err){
        next(err);
    }
})
// router.post("/get", async (req, res, next) => {
//   try {
//     const user = await User.register(req.body);

//     const token = createUserJwt(user);
//     return res.status(200).json({ user, token });
//   } catch (err) {
//     next(err);
//   }
// });


module.exports = router;