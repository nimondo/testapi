const jwt = require('jsonwebtoken');
const roleData = {
  "admin": ["admin", "customer", "agent", "broker"],
  "broker": ["broker", "agent"],
  "agent": ["broker", "agent"],
  "customer": ["customer"],
};
const authRole = (role) => {

  return (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const decodedRole = decodedToken.role;
    if (!roleData[decodedRole].includes(role)) {
      res.status(401);
      console.log("not allowed");
      return res.send("not allowed");
    }
    next();
  };
};

module.exports = {
  authRole,
};