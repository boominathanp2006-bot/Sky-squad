// ================= MOBILE MENU =================

function toggleMenu() {

    const nav = document.getElementById("navMenu");

    nav.classList.toggle("active");

}


// Close mobile menu after clicking a link

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        document.getElementById("navMenu")
            .classList.remove("active");

    });

});


// ================= PRODUCT ORDER =================

function orderProduct(productName) {

    document.getElementById("service").value =
        "Coconut Delivery";

    document.getElementById("message").value =
        "I am interested in ordering: " + productName;

    document.getElementById("apply")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================= DATE VALIDATION =================

const dateInput = document.getElementById("date");

const today = new Date()
    .toISOString()
    .split("T")[0];

dateInput.min = today;


// ================= PHONE VALIDATION =================

const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", function () {

    this.value = this.value.replace(/\D/g, "");

});


const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyvcHUWKYCpIyjLp0vf4_dXxfZva24CSkNUWqYZod_haI9tVAcKfau-ZGp235MAPtlj/exec";

// ================= FORM SUBMISSION =================

const bookingForm =
    document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", async function(event) {

        event.preventDefault();


        // ============================
        // GET FORM VALUES
        // ============================

        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const location =
            document.getElementById("location").value.trim();

        const trees =
            document.getElementById("trees").value;

        const date =
            document.getElementById("date").value;

        const service =
            document.getElementById("service").value;

        const message =
            document.getElementById("message").value.trim();


        // ============================
        // VALIDATION
        // ============================

        if (!name || !phone || !location ||
            !trees || !date || !service) {

            alert("Please fill in all required fields.");

            return;
        }


        if (name.length < 3) {

            alert("Please enter a valid name.");

            return;
        }


        if (!/^\d{10}$/.test(phone)) {

            alert("Please enter a valid 10-digit mobile number.");

            return;
        }


        if (trees < 1) {

            alert("Number of trees must be at least 1.");

            return;
        }


        // ============================
        // BUTTON
        // ============================

        const submitBtn =
            bookingForm.querySelector(".submit-btn");

        const originalText =
            submitBtn.innerHTML;


        submitBtn.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        submitBtn.disabled = true;


        // ============================
        // SEND TO GOOGLE SHEETS
        // ============================

        try {

            const formData = new URLSearchParams();


            formData.append("name", name);

            formData.append("phone", phone);

            formData.append("location", location);

            formData.append("trees", trees);

            formData.append("date", date);

            formData.append("service", service);

            formData.append("message", message);


            await fetch(GOOGLE_SCRIPT_URL, {

                method: "POST",

                body: formData,

                mode: "no-cors"

            });


            // ============================
            // SUCCESS
            // ============================

            submitBtn.innerHTML =
                '<i class="fa-solid fa-check"></i> Request Sent!';


            // Show your existing success popup
            const successModal =
                document.getElementById("successModal");

            if (successModal) {

                successModal.classList.add("show");

            } else {

                alert(
                    "Your application has been submitted successfully!"
                );

            }


            // Reset form

            bookingForm.reset();


            // Restore minimum date

            if (dateInput) {

                dateInput.min = today;

            }


            // Restore button

            setTimeout(() => {

                submitBtn.innerHTML = originalText;

                submitBtn.disabled = false;

            }, 1500);


        } catch (error) {

            console.error(
                "Google Sheets Error:",
                error
            );


            alert(
                "Something went wrong. Please try again."
            );


            submitBtn.innerHTML = originalText;

            submitBtn.disabled = false;

        }

    });

}
// ================= CLOSE MODAL =================

function closeModal() {

    document
        .getElementById("successModal")
        .classList.remove("show");

}


// Close popup by clicking outside

document
    .getElementById("successModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeModal();

        }

    });


// ================= SCROLL ANIMATION =================

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.1
        }
    );


document
    .querySelectorAll(
        ".product-card, .service-card, .team-card, .contact-card"
    )
    .forEach(card => {

        card.style.opacity = "0";

        card.style.transform = "translateY(30px)";

        card.style.transition = "all .6s ease";

        observer.observe(card);

    });