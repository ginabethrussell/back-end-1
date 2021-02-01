const router = require("express").Router();

/*  Howto Router  */
const router = require("../howtos/howto_r");

/*  Users Router  */
const ur = require("../users/users_r");

router.use("/howto", router);
router.use("/users", ur);


module.exports = router;
