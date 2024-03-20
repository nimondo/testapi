const roleData = {
  admin: ["admin", "customer", "driver"],
  driver: ["driver"],
  customer: ["customer"],
};
const authRole = (role) => {
  return (req, res, next) => {
    if (roleData[role].includes(req.user.role)) {
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
