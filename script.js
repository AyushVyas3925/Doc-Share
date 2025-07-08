document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript Loaded");

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function() {
            document.body.classList.toggle("dark-mode");
            // Save the dark mode state in localStorage
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("dark-mode", "enabled");
            } else {
                localStorage.setItem("dark-mode", "disabled");
            }
        });
    }

    // Check the dark mode status from localStorage when the page loads
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    // Open & Close Modal Functions
    function openModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.display = "flex";
        }
    }

    function closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.display = "none";
        }
    }

    window.openModal = openModal;
    window.closeModal = closeModal;

    // Event listeners for login and signup buttons
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", function() {
            console.log("Login Button Clicked!");
            openModal("loginModal");
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener("click", function() {
            console.log("Signup Button Clicked!");
            openModal("signupModal");
        });
    }

    // Close modal on clicking close button
    document.querySelectorAll(".close-modal").forEach(button => {
        button.addEventListener("click", function() {
            const modal = this.closest(".modal");
            if (modal) {
                modal.style.display = "none";
            }
        });
    });

    // Language Translation Logic
    const translations = {
        "en": {
            "Home": "Home",
            "Upload": "Upload",
            "Download": "Download",
            "Dashboard": "Dashboard",
            "Login": "Login",
            "Sign Up": "Sign Up",
            "Discover & Share Research Effortlessly": "Discover & Share Research Effortlessly",
            "Upload your research papers and access thousands of others for free.": "Upload your research papers and access thousands of others for free.",
            "Search research papers...": "Search research papers...",
            "Upload Research": "Upload Research",
            "Explore Papers": "Explore Papers"
        },
        "es": {
            "Home": "Inicio",
            "Upload": "Subir",
            "Download": "Descargar",
            "Dashboard": "Tablero",
            "Login": "Iniciar sesión",
            "Sign Up": "Regístrate",
            "Discover & Share Research Effortlessly": "Descubre y Comparte Investigación Fácilmente",
            "Upload your research papers and access thousands of others for free.": "Sube tus documentos de investigación y accede a miles de otros de forma gratuita.",
            "Search research papers...": "Buscar documentos de investigación...",
            "Upload Research": "Subir Investigación",
            "Explore Papers": "Explorar Documentos"
        }
    };

    window.changeLanguage = function() {
        const selectedLang = document.getElementById("languageSelect").value;
        document.querySelectorAll("nav a, .hero-content h1, .hero-content p, .search-section input, .btn").forEach(element => {
            const key = element.textContent.trim();
            if (translations[selectedLang][key]) {
                element.textContent = translations[selectedLang][key];
            }
        });
        document.getElementById("searchInput").placeholder = translations[selectedLang]["Search research papers..."];
    };

});
