
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Frontend folder path
const frontendPath = path.join(__dirname, "frontend");

// Serve frontend files (HTML, CSS, JavaScript)
app.use(express.static(frontendPath));

// Internship details
const internships = [
    {
        id: 1,
        title: "Web Development Intern",
        company: "Tech Solutions",
        location: "Mysuru",
        duration: "3 Months",
        stipend: "₹5,000/month",
        description: "Learn HTML, CSS, JavaScript and web development."
    },
    {
        id: 2,
        title: "Python Developer Intern",
        company: "Code Academy",
        location: "Bengaluru",
        duration: "2 Months",
        stipend: "₹4,000/month",
        description: "Work on Python programming and real-world projects."
    },
    {
        id: 3,
        title: "Data Science Intern",
        company: "Data Experts",
        location: "Remote",
        duration: "4 Months",
        stipend: "₹8,000/month",
        description: "Learn data analysis and machine learning."
    },
    {
        id: 4,
        title: "Java Developer Intern",
        company: "Software Hub",
        location: "Bengaluru",
        duration: "3 Months",
        stipend: "₹6,000/month",
        description: "Develop applications using Java."
    }
];

// Temporary application storage
let applications = [];

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// Get all internships
app.get("/api/internships", (req, res) => {
    res.json(internships);
});

// Submit internship application
app.post("/api/applications", (req, res) => {
    const { name, email, phone, internshipId } = req.body;

    // Validate application details
    if (
        !name?.trim() ||
        !email?.trim() ||
        !phone?.trim() ||
        !internshipId
    ) {
        return res.status(400).json({
            message: "Please fill in all required fields."
        });
    }

    // Find selected internship
    const internship = internships.find(
        item => item.id === Number(internshipId)
    );

    if (!internship) {
        return res.status(404).json({
            message: "Internship not found."
        });
    }

    // Create application
    const application = {
        id: applications.length + 1,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        internshipId: Number(internshipId),
        internshipTitle: internship.title,
        status: "Pending",
        submittedAt: new Date().toISOString()
    };

    // Store application
    applications.push(application);

    res.status(201).json({
        message: "Application submitted successfully!",
        application: application
    });
});

// View all submitted applications
app.get("/api/applications", (req, res) => {
    res.json(applications);
});

// Get application by ID
app.get("/api/applications/:id", (req, res) => {
    const application = applications.find(
        item => item.id === Number(req.params.id)
    );

    if (!application) {
        return res.status(404).json({
            message: "Application not found."
        });
    }

    res.json(application);
});

// Handle unknown API routes
app.use("/api", (req, res) => {
    res.status(404).json({
        message: "API endpoint not found."
    });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("----------------------------------");
    console.log("College Internship Management System");
    console.log(`Server running on port ${PORT}`);
    console.log("Frontend connected successfully!");
    console.log("----------------------------------");
});
