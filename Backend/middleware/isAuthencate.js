import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    console.log("Cookies received:", req.cookies);
    console.log("Authorization header:", req.headers.authorization);

    // Token cookies ya header me ho sakta hai
    const token =
      req.cookies?.token ||
      req.cookies?.__session ||
      (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res
        .status(401)
        .json({ message: "User not authenticated", success: false });
    }

    
    const secret = process.env.SECRET_KEY;
    if (!secret) {
      return res
        .status(500)
        .json({ message: "JWT secret not configured", success: false });
    }

    const decode = jwt.verify(token, secret, {
      algorithms: ["HS256"],
    });
    if (!decode) {
      return res.status(401).json({ message: "Invalid Token", success: false });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};

export default isAuthenticated;
