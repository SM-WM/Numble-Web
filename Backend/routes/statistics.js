const express = require("express");
const router = express.Router();
const Statistic = require("../models/statistic");
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security");
//const permissions = require("../middleware/permissions");

router.post("/post", async (req, res, next) => {
  try {
    const stat = await Statistic.postStats(req.body);

    return res.status(200).json({ stat });
  } catch (err) {
    next(err);
  }
});

router.get("/get/:id", async (req, res, next) => {
  try {
    var { id } = req.params;
    var stats = await Statistic.getStats(id);

    return res.status(200).json({ stats });
  } catch (err) {
    next(err);
  }
});

router.put(
  "/update/:id",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const {id} = req.params
      const statistics = await Statistic.updateStats(req.body, id)
      return res.status(200).json({statistics})
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
