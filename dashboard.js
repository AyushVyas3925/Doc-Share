document.addEventListener("DOMContentLoaded", function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function() {
            document.body.classList.toggle("dark-mode");
        });
    }

    // Function to open the modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "block";
        }
    }

    // Function to close the modal
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "none";
        }
    }

    // Open modal on "Update Account" button click
    const updateAccountBtn = document.querySelector(".btn");
    if (updateAccountBtn) {
        updateAccountBtn.addEventListener("click", function() {
            openModal("updateModal");
        });
    }

    // Add event listeners for modal close button
    const closeButtons = document.querySelectorAll(".close");
    closeButtons.forEach(button => {
        button.addEventListener("click", function() {
            closeModal("updateModal");
        });
    });

    // Update account form submission
    const updateForm = document.getElementById("updateForm");
    if (updateForm) {
        updateForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const username = document.getElementById("updateUsername").value;
            const email = document.getElementById("updateEmail").value;

            if (username && email) {
                localStorage.setItem("username", username);
                localStorage.setItem("email", email);
                document.getElementById("username").textContent = username;

                alert("Account updated successfully!");
                closeModal("updateModal");
            } else {
                alert("Please fill out both fields.");
            }
        });
    }

    // Load saved user data on page load
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
        document.getElementById("username").textContent = savedUsername;
    }

    // Fetch and display uploaded files from server
    function loadFiles() {
        fetch("http://localhost:5000/files")
            .then(response => response.json())
            .then(files => {
                const fileGrid = document.getElementById("fileGrid");
                fileGrid.innerHTML = ""; // Clear previous content
                
                if (files.length === 0) {
                    fileGrid.innerHTML = "<p>No files uploaded yet.</p>";
                } else {
                    files.forEach(file => {
                        const fileCard = document.createElement("div");
                        fileCard.classList.add("file-card");
                        
                        fileCard.innerHTML = `
                            <img src="http://localhost:5000/preview/${file}" alt="File Preview" class="file-preview">
                            <p>${file}</p>
                            <a href="http://localhost:5000/download/${file}" class="download-btn">Download</a>
                        `;
                        fileGrid.appendChild(fileCard);
                    });
                }
            })
            .catch(error => {
                console.error("Error fetching files:", error);
            });
    }

    // Call the function to load files on page load
    loadFiles();
});
