

const jwt = require("jsonwebtoken");


const auth = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token, "roshan");
      req.body.userId = decoded.userId;
      next();
    } catch (err) {
      res.status(404).json({err});
    }
  } else {
    res.send({ msg: "JWT expired , please Login again" });
  }
};

module.exports = {
  auth,
};