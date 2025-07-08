document.addEventListener("DOMContentLoaded", async function() {
    const fileListContainer = document.querySelector(".file-list");

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function() {
            document.body.classList.toggle("dark-mode");
        });
    }

    async function fetchFiles() {
        try {
            const response = await fetch("http://localhost:5000/files");
            const files = await response.json();

            fileListContainer.innerHTML = "";

            if (!files.length) {
                fileListContainer.innerHTML = "<p>No files available for download.</p>";
                return;
            }

            files.forEach(file => {
                const fileElement = document.createElement("div");
                fileElement.classList.add("file");

                // File name without extension for image mapping
                const fileName = file.split(".")[0].toLowerCase();

                // Placeholder images for known research topics
                const imageMap = {
                    "covid19": "images/covid19.jpg",
                    "cancer_research": "images/cancer.jpg",
                    "diabetes_treatment": "images/diabetes.jpg",
                    "heart_disease": "images/heart.jpg",
                    "alzheimers": "images/alzheimers.jpg",
                    "malaria": "images/malaria.jpg",
                    "tuberculosis": "images/tuberculosis.jpg",
                    "hypertension": "images/hypertension.jpg",
                    "asthma": "images/asthma.jpg",
                    "obesity": "images/obesity.jpg"
                };

                // Assign image if available, else default
                const fileImage = imageMap[fileName] || "images/default.png";

                fileElement.innerHTML = `
                    <img src="${fileImage}" alt="Research Image" class="file-icon">
                    <p>${file}</p>
                    <button class="btn" onclick="downloadFile('${file}')">Download</button>
                `;

                fileListContainer.appendChild(fileElement);
            });
        } catch (error) {
            console.error("Error fetching files:", error);
            fileListContainer.innerHTML = "<p>Error loading files. Please try again later.</p>";
        }
    }

    window.downloadFile = function(filename) {
        window.location.href = `http://localhost:5000/download/${filename}`;
    };

    // Implement optimized search functionality
    document.getElementById("searchInput").addEventListener("input", function() {
        const searchQuery = this.value.toLowerCase();
        document.querySelectorAll(".file").forEach(fileElement => {
            const fileName = fileElement.querySelector("p").textContent.toLowerCase();
            fileElement.style.display = fileName.includes(searchQuery) ? "block" : "none";
        });
    });

    fetchFiles();
});
