import jwt from "jsonwebtoken";

export default function handler(req, res) {
  if (req.method === "GET") {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      return res.json({ message: "Protected data", user: decoded });
    });
  } else {
    // Handle other HTTP methods
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
