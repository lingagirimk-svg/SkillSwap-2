// ================= MODALS =================

function openLogin() {
    document.getElementById("loginModal").style.display = "flex";
}

function openSignup() {
    document.getElementById("signupModal").style.display = "flex";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}


// ================= SWITCH MODALS =================

function switchModal() {
    closeModal("loginModal");
    openSignup();
}

function switchToLogin() {
    closeModal("signupModal");
    openLogin();
}


// ================= LOGIN =================

// ================= LOGIN =================

// ================= LOGIN =================

async function login() {

    const email = document.querySelector(
        '#loginModal input[type="email"]'
    ).value.trim();

    const password = document.querySelector(
        '#loginModal input[type="password"]'
    ).value;


    // Check empty fields
    if (email === "" || password === "") {

        showToast(
            "Please enter email and password ⚠️"
        );

        return;
    }


    try {

        const response = await fetch(
            "http://localhost:8080/api/students/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );


        const data = await response.text();


        // Backend returned an error
        if (!response.ok) {

            showToast(
                data || "Login failed ❌"
            );

            return;
        }


        // Convert backend response into JavaScript object
        const student = JSON.parse(data);


        // Store only safe student information
        const safeStudent = {

            id: student.id,
            name: student.name,
            email: student.email

        };


        localStorage.setItem(
            "skillswapStudent",
            JSON.stringify(safeStudent)
        );


        localStorage.setItem(
            "skillswapLoggedIn",
            "true"
        );


        showToast(
            "Login successful! Welcome back 👋"
        );


        setTimeout(() => {

            window.location.href =
                "dashboard.html";

        }, 1000);


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        showToast(
            "Cannot connect to SkillSwap server ❌"
        );

    }

}
// ================= SIGNUP =================

// ================= SIGNUP =================

// ================= SIGNUP =================

async function signup() {

    const name = document.querySelector(
        '#signupModal input[type="text"]'
    ).value.trim();

    const email = document.querySelector(
        '#signupModal input[type="email"]'
    ).value.trim();

    const password = document.querySelector(
        '#signupModal input[type="password"]'
    ).value;


    // Check empty fields
    if (
        name === "" ||
        email === "" ||
        password === ""
    ) {

        showToast(
            "Please fill all the fields ⚠️"
        );

        return;
    }


    try {

        const response = await fetch(
            "http://localhost:8080/api/students/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    name: name,
                    email: email,
                    password: password

                })
            }
        );


        const data = await response.text();


        // Backend returned an error
        if (!response.ok) {

            showToast(
                data || "Registration failed ❌"
            );

            return;
        }


        // Convert backend response
        const student = JSON.parse(data);


        // Store only safe student information
        const safeStudent = {

            id: student.id,
            name: student.name,
            email: student.email

        };


        localStorage.setItem(
            "skillswapStudent",
            JSON.stringify(safeStudent)
        );


        showToast(
            "Account created successfully! 🎉"
        );


        setTimeout(() => {

            closeModal("signupModal");

            openLogin();

        }, 1000);


    } catch (error) {

        console.error(
            "Signup error:",
            error
        );

        showToast(
            "Cannot connect to SkillSwap server ❌"
        );

    }

}
// ================= CONNECT =================

function sendRequest(name) {

    showToast("Connection request sent to " + name + " 🤝");

}


// ================= SEARCH =================

function searchSkills() {

    const search =
        document.getElementById("skillSearch")
        .value
        .toLowerCase();

    const cards =
        document.querySelectorAll(".student-card");

    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();

        if (text.includes(search)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}


// ================= FILTER =================

function filterSkill(category) {

    const cards =
        document.querySelectorAll(".student-card");

    const buttons =
        document.querySelectorAll(".category");

    buttons.forEach(button => {
        button.classList.remove("active");
    });

    event.target.classList.add("active");


    cards.forEach(card => {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


// ================= SCROLL =================

function scrollToSection(id) {

    document
        .getElementById(id)
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================= TOAST =================

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    toastMessage.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


// ================= CLOSE MODAL OUTSIDE =================

window.addEventListener("click", function(event) {

    const loginModal =
        document.getElementById("loginModal");

    const signupModal =
        document.getElementById("signupModal");

    if (event.target === loginModal) {
        closeModal("loginModal");
    }

    if (event.target === signupModal) {
        closeModal("signupModal");
    }

});
// ================= LOAD LOGGED-IN STUDENT =================

function loadLoggedInStudent() {

    const savedStudent =
        localStorage.getItem("skillswapStudent");

    if (!savedStudent) {
        return;
    }

    const student =
        JSON.parse(savedStudent);


    // Update dashboard name
    const nameElement =
        document.getElementById("dashboardUserName");

    if (nameElement && student.name) {

        nameElement.innerText =
            student.name;

    }


    // Update profile avatar
    const avatar =
        document.getElementById("profileAvatar");

    if (avatar && student.name) {

        avatar.innerText =
            student.name.charAt(0).toUpperCase();

    }

}


// Load student information
loadLoggedInStudent();