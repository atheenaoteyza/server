import fs from "fs";
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body) {
      return res.status(405).json({ message: "no request" });
    }
    const { email, password } = req.body;
    const users = JSON.parse(fs.readFileSync("data/db.json")).users;

    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      const token = jwt.sign(
        { id: user.id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({ token });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.status(405).json({ message: "Method Not Allowed" });
}
