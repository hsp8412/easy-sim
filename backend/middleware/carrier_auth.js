import jwt from "jsonwebtoken";

export const carrier_auth = (req, res, next) => {
  const token = req.cookies.carrier_token;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    if (decoded.role !== "carrier") {
      return res.status(401).send("Access denied");
    }
    req.isAdmin = decoded.role === "admin";
    req.isCarrier = decoded.role === "carrier";
    req.isUser = decoded.role === "user";

    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
