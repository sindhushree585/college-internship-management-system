const API_URL = "http://localhost:3000/api";

// Load internships
async function loadInternships() {
    const internshipList = document.getElementById("internship-list");
    const internshipDropdown = document.getElementById("internshipId");

    try {
        const response = await fetch(`${API_URL}/internships`);

        if (!response.ok) {
            throw new Error("Unable to load internships");
        }

        const internships = await response.json();

        internshipList.innerHTML = "";
        internshipDropdown.innerHTML =
            '<option value="">Select an internship</option>';

        internships.forEach(internship => {
            const card = document.createElement("div");
            card.className = "internship-card";

            card.innerHTML = `
                <h3>${internship.title}</h3>
                <p><strong>Company:</strong> ${internship.company}</p>
                <p><strong>Location:</strong> ${internship.location}</p>
                <p><strong>Duration:</strong> ${internship.duration}</p>
                <p><strong>Stipend:</strong> ${internship.stipend}</p>
                <p>${internship.description}</p>
            `;

            internshipList.appendChild(card);

            const option = document.createElement("option");
            option.value = internship.id;
            option.textContent = internship.title;

            internshipDropdown.appendChild(option);
        });

    } catch (error) {
        internshipList.innerHTML =
            "<p>Unable to load internships. Please check the server.</p>";

        console.error(error);
    }
}

// Submit application
document.getElementById("application-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const message = document.getElementById("message");

    const application = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        internshipId: document.getElementById("internshipId").value
    };

    try {
        const response = await fetch(`${API_URL}/applications`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(application)
        });

        const result = await response.json();

        message.textContent = result.message;

        if (response.ok) {
            message.style.color = "green";
            document.getElementById("application-form").reset();
        } else {
            message.style.color = "red";
        }

    } catch (error) {
        message.textContent = "Unable to submit application. Check server.";
        message.style.color = "red";
        console.error(error);
    }
});

// Start loading internships
loadInternships();