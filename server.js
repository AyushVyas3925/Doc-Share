const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

// Set up storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // File will be saved with the original name
    }
});

const upload = multer({ storage });

// Upload Endpoint
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ message: "File uploaded successfully!", filename: req.file.filename });
});

// Get List of Uploaded Files
app.get("/files", (req, res) => {
    fs.readdir("uploads", (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Failed to retrieve files" });
        }
        res.json(files);
    });
});

// Download File Endpoint
app.get("/download/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "uploads", filename);
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).json({ error: "File not found" });
    }
});

// User Authentication Logic
const USERS_FILE = "users.json";

// Load Users from File
function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(USERS_FILE));
}

// Save Users to File
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Signup Endpoint
app.post("/signup", (req, res) => {
    const { email, password } = req.body;
    let users = loadUsers();
    
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ error: "User already exists" });
    }
    
    users.push({ email, password });
    saveUsers(users);
    res.json({ message: "Signup successful!" });
});

// Login Endpoint
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    let users = loadUsers();
    
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    
    res.json({ message: "Login successful!" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
