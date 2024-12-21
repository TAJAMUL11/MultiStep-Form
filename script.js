let form1 = document.getElementById("form1");
let form2 = document.getElementById("form2");
let summary = document.getElementById("summary");
let summaryInfo = document.getElementById("summaryInfo");
let next1 = document.getElementById("next1");
let next2 = document.getElementById("next2");
let previous1 = document.getElementById("previous1");
let previous2 = document.getElementById("previous2");
const formContainer = document.querySelector(".form-container");
const formSlides = document.querySelector(".form-slides");
const stepImg1 = document.getElementById("imgOne");
const stepImg2 = document.getElementById("imgTwo");
const stepImg3 = document.getElementById("imgThree");
let finalSubmit = document.getElementById("finalSubmit");
let modalError = document.getElementById("modalError");
let closeError = document.getElementById("closeError");
let progressRange = document.getElementById("progress-range");
let initialProgressRange = 0;
let maxProgressRange = 100;

// Elements for conditional rendering
let categorySelect = document.getElementById("category");
let techOptions = document.getElementById("tech-options");
let healthOptions = document.getElementById("health-options");
let sportsOptions = document.getElementById("sports-options");

categorySelect.addEventListener("change", function () {
  // Conditional sections
  techOptions.style.display = "none";
  healthOptions.style.display = "none";
  sportsOptions.style.display = "none";

  // Selected category's options
  let selectedCategory = categorySelect.value;
  if (selectedCategory === "Tech") {
    techOptions.style.display = "block";
  } else if (selectedCategory === "Health") {
    healthOptions.style.display = "block";
  } else if (selectedCategory === "Sports") {
    sportsOptions.style.display = "block";
  }
});

closeError.addEventListener("click", () => {
  modalError.style.display = "none";
});

// Validation function for form1
function validateForm1() {
  let fullname = document.getElementById("fullname").value.trim();
  let lastname = document.getElementById("lastname").value.trim();
  let email = document.getElementById("email").value.trim();
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (fullname === "" || lastname === "" || email === "") {
    modalError.style.display = "flex";
    return false;
  } else if (!emailPattern.test(email)) {
    modalError.style.display = "flex";
    return false;
  } else {
    return true;
  }
}

// Validation function for form2
function validateForm2() {
  let category = categorySelect.value;
  let preference = "";

  if (category === "") {
    modalError.style.display = "flex";

    return false;
  } else if (category === "Tech") {
    preference = document.getElementById("languages").value;
    if (preference === "") {
      modalError.style.display = "flex";
      return false;
    }
  } else if (category === "Health") {
    preference = document.getElementById("Diet").value;
    if (preference === "") {
      modalError.style.display = "flex";
      return false;
    }
  } else if (category === "Sports") {
    preference = document.getElementById("Sports").value;
    if (preference === "") {
      modalError.style.display = "flex";
      return false;
    }
  }
  return true;
}

next1.onclick = function () {
  if (validateForm1()) {
    formSlides.style.transform = "translateX(-100%)";
    progressRange.value = maxProgressRange / 2;
    stepImg1.src = "assets/check.png";
  }
};

previous1.addEventListener("click", () => {
  formSlides.style.transform = "translateX(0)";
  progressRange.value = initialProgressRange;
  stepImg1.src = "assets/one.png";
});

next2.onclick = function () {
  if (validateForm2()) {
    formSlides.style.transform = "translateX(-200%)";
    progressRange.value += maxProgressRange;
    stepImg2.src = "assets/check.png";
    generateSummary();
    summary.style.display = "block";
  }
};

previous2.addEventListener("click", function () {
  formSlides.style.transform = "translateX(-100%)";
  progressRange.value = maxProgressRange / 2;
  stepImg2.src = "assets/two.png";
  summary.style.display = "none";
});

function generateSummary() {
  let fullname = document.getElementById("fullname").value.trim();
  let lastname = document.getElementById("lastname").value.trim();
  let email = document.getElementById("email").value.trim();
  let category = categorySelect.value;
  let preference = "";

  if (category === "Tech") {
    preference = document.getElementById("languages").value;
  } else if (category === "Health") {
    preference = document.getElementById("Diet").value;
  } else if (category === "Sports") {
    preference = document.getElementById("Sports").value;
  }

  summaryInfo.innerHTML = `
        <span><img src="assets/smiley.svg" alt="Summary" id="summaryImg"></span>
        <h1>Summary</h1>
        <p class = "summaryP">Double check before submit</p>
        <p>Full Name: ${fullname} ${lastname}</p>
        <p>Email: ${email}</p>
        <p>Category: ${category}</p>
        <p>Preference: ${preference}</p>`;
}

function handleFinalSubmit() {
  form1.reset();
  form2.reset();
  summaryInfo.innerHTML = "";
  progressRange.value = initialProgressRange;

  formSlides.style.transform = "translateX(0)";
  stepImg1.src = "assets/one.png";
  stepImg2.src = "assets/two.png";
  summary.style.display = "none";

  let modal = document.createElement("div");
  modal.setAttribute("id", "modal");
  modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <p>Form submitted successfully!</p>
        </div>`;
  document.body.appendChild(modal);

  modal.style.position = "fixed";
  modal.style.top = "30%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.zIndex = "10000";
  modal.style.backgroundColor = "#fff";
  modal.style.padding = "1rem";
  modal.style.borderRadius = "10px";
  modal.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
  formContainer.style.filter = "blur(2px)";

  const closeModal = document.querySelector(".close-modal");
  closeModal.onclick = function () {
    document.body.removeChild(modal);
    stepImg3.src = "assets/three.png";
    formContainer.style.filter = "blur(0)";
  };
}

finalSubmit.addEventListener("click", function () {
  stepImg3.src = "assets/check.png";
  handleFinalSubmit();
});
