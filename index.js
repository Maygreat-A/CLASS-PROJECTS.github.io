const express = require("express");
const cors = require("cors"); // Import cors
const { MongoClient } = require("mongodb"); // Correctly destructuring MongoClient
const path = require("path");

const app = express();
const port = 3000; // Define port

// MongoDB connection details
const url = "mongodb://localhost:27017";
const dbName = "USIU_STUDENTS";

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing //CORS - Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON data
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory

// Route: Serve the HTML file
app.get("/project", (req, res) => {
  res.sendFile(path.join(__dirname, "tribute-fullwidthimage.html")); // Corrected __dirname typo
});

// Signup Route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("myRegistrationSite");

    // Check if the user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Insert new user
    await collection.insertOne({ email, password });
    res.status(201).json({ message: "Signup successful. User created." });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error." });
  } finally {
    await client.close();
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("myRegistrationSite");

    // Find the user by email
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify password
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error." });
  } finally {
    await client.close();
  }
});

// MongoDB: Main function to list databases (optional, for testing connection)
async function main() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server");

    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach((db) => console.log(db.name));
  } catch (err) {
    console.error("An error occurred:", err);
  } finally {
    await client.close();
  }
}

// Uncomment to test MongoDB connection
// main();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
