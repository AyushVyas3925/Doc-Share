document.addEventListener("DOMContentLoaded", function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function() {
            document.body.classList.toggle("dark-mode");
        });
    }

    // File Upload Function
    function uploadFile() {
        const fileInput = document.getElementById("fileUpload");
        const file = fileInput.files[0];
        const progressBar = document.getElementById("progressBar");
        const uploadStatus = document.getElementById("uploadStatus");

        if (file) {
            uploadStatus.textContent = "Uploading...";

            const formData = new FormData();
            formData.append("file", file);

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost:5000/upload", true); // ✅ Corrected API Endpoint

            xhr.upload.addEventListener("progress", function(event) {
                if (event.lengthComputable) {
                    const percent = (event.loaded / event.total) * 100;
                    progressBar.style.width = percent + "%";
                }
            });

            xhr.onload = function() {
                if (xhr.status === 200) {
                    uploadStatus.textContent = "Upload Successful!";
                } else {
                    uploadStatus.textContent = "Upload Failed!";
                }
            };

            xhr.send(formData);
        }
    }

    // Attach event listener to the upload button
    const uploadButton = document.querySelector(".btn");
    if (uploadButton) {
        uploadButton.addEventListener("click", uploadFile); // ✅ Fixed event listener
    }
});
