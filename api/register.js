import fs from "fs";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    //Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const users = JSON.parse(fs.readFileSync("data/db.json")).users;

    //check if user already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
    };

    users.push(newUser);

    //Save updated users array to db.json
    fs.writeFileSync("data/db.json", JSON.stringify({ users }));
    return res.status(201).json({ message: "User registered successfully" });
  }
}
