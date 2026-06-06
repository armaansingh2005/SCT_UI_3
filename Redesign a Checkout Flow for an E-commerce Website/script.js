/* =====================================
   CHECKOUTFLOWX
   INTERNSHIP LEVEL PROJECT
===================================== */

// ------------------------------
// DARK MODE
// ------------------------------

const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
});

// ------------------------------
// CARD PREVIEW
// ------------------------------

const cardInput = document.getElementById("cardInput");
const nameInput = document.getElementById("nameInput");
const expiryInput = document.getElementById("expiryInput");

const cardNumber = document.getElementById("cardNumber");
const cardName = document.getElementById("cardName");
const cardExpiry = document.getElementById("cardExpiry");

if (cardInput) {
  cardInput.addEventListener("input", () => {
    let value = cardInput.value
      .replace(/\D/g, "")
      .substring(0, 16);

    value = value.replace(/(.{4})/g, "$1 ").trim();

    cardNumber.textContent =
      value || "#### #### #### ####";
  });
}

if (nameInput) {
  nameInput.addEventListener("input", () => {
    cardName.textContent =
      nameInput.value.toUpperCase() || "YOUR NAME";
  });
}

if (expiryInput) {
  expiryInput.addEventListener("input", () => {
    cardExpiry.textContent =
      expiryInput.value || "MM/YY";
  });
}

// ------------------------------
// SHIPPING
// ------------------------------

let shippingCost = 0;

const shippingCards =
  document.querySelectorAll(".shipping");

const shippingCostEl =
  document.getElementById("shippingCost");

shippingCards.forEach(card => {

  card.addEventListener("click", () => {

    shippingCards.forEach(c =>
      c.classList.remove("active")
    );

    card.classList.add("active");

    const method =
      card.querySelector("h3").innerText;

    if (method === "Express") {
      shippingCost = 99;
    } else {
      shippingCost = 0;
    }

    shippingCostEl.textContent =
      `₹${shippingCost}`;

    updateTotal();
  });

});

// ------------------------------
// COUPON SYSTEM
// ------------------------------

const couponInput =
  document.getElementById("couponCode");

const couponBtn =
  document.getElementById("applyCoupon");

const couponMessage =
  document.getElementById("couponMessage");

let discount = 0;

couponBtn.addEventListener("click", () => {

  const code =
    couponInput.value.trim().toUpperCase();

  if (code === "WELCOME20") {

    discount = 500;

    couponMessage.textContent =
      "✓ WELCOME20 Applied";

    couponMessage.style.color = "green";

  } else if (code === "SAVE100") {

    discount = 100;

    couponMessage.textContent =
      "✓ SAVE100 Applied";

    couponMessage.style.color = "green";

  } else if (code === "STUDENT15") {

    discount = 350;

    couponMessage.textContent =
      "✓ STUDENT15 Applied";

    couponMessage.style.color = "green";

  } else {

    discount = 0;

    couponMessage.textContent =
      "Invalid Coupon";

    couponMessage.style.color = "red";
  }

  updateTotal();
});

// ------------------------------
// TOTAL CALCULATOR
// ------------------------------

const totalEl =
  document.getElementById("grandTotal");

const discountEl =
  document.getElementById("discount");

function updateTotal() {

  const subtotal = 2499;

  const total =
    subtotal +
    shippingCost -
    discount;

  discountEl.textContent =
    `-₹${discount}`;

  totalEl.textContent =
    `₹${total}`;
}

updateTotal();

// ------------------------------
// ADDRESS AUTO FILL
// ------------------------------

const pincode =
  document.getElementById("pincode");

const city =
  document.getElementById("city");

const state =
  document.getElementById("state");

const pincodeMap = {

  "110001": {
    city: "New Delhi",
    state: "Delhi"
  },

  "201306": {
    city: "Greater Noida",
    state: "Uttar Pradesh"
  },

  "122001": {
    city: "Gurugram",
    state: "Haryana"
  },

  "560001": {
    city: "Bengaluru",
    state: "Karnataka"
  },

  "400001": {
    city: "Mumbai",
    state: "Maharashtra"
  }
};

if (pincode) {

  pincode.addEventListener("input", () => {

    const pin = pincode.value;

    if (pincodeMap[pin]) {

      city.value =
        pincodeMap[pin].city;

      state.value =
        pincodeMap[pin].state;
    }

  });

}

// ------------------------------
// PAYMENT TABS
// ------------------------------

const tabs =
  document.querySelectorAll(".tab");

tabs.forEach(tab => {

  tab.addEventListener("click", () => {

    tabs.forEach(t =>
      t.classList.remove("active")
    );

    tab.classList.add("active");
  });

});

// ------------------------------
// SUCCESS MODAL
// ------------------------------

const placeOrder =
  document.getElementById("placeOrder");

const successModal =
  document.getElementById("successModal");

placeOrder.addEventListener("click", () => {

  const fname =
    document.getElementById("fname");

  const lname =
    document.getElementById("lname");

  if (
    fname.value.trim() === "" ||
    lname.value.trim() === ""
  ) {

    alert(
      "Please fill customer details."
    );

    return;
  }

  successModal.style.display = "flex";

  localStorage.removeItem(
    "checkoutData"
  );

});

function closeModal() {

  successModal.style.display = "none";

}

// ------------------------------
// STEP PROGRESS
// ------------------------------

const inputs =
  document.querySelectorAll("input");

const steps =
  document.querySelectorAll(".step");

inputs.forEach(input => {

  input.addEventListener("input", () => {

    let filled = 0;

    inputs.forEach(i => {

      if (
        i.value.trim() !== ""
      ) {
        filled++;
      }

    });

    if (filled > 2) {
      steps[1].classList.add("active");
    }

    if (filled > 6) {
      steps[2].classList.add("active");
    }

    if (filled > 10) {
      steps[3].classList.add("active");
    }

  });

});

// ------------------------------
// LOCAL STORAGE SAVE
// ------------------------------

const formFields =
  document.querySelectorAll("input");

function saveForm() {

  const data = {};

  formFields.forEach(field => {

    data[field.id] =
      field.value;

  });

  localStorage.setItem(
    "checkoutData",
    JSON.stringify(data)
  );
}

function loadForm() {

  const data =
    JSON.parse(
      localStorage.getItem(
        "checkoutData"
      )
    );

  if (!data) return;

  formFields.forEach(field => {

    if (
      data[field.id] !== undefined
    ) {

      field.value =
        data[field.id];

    }

  });

  if (cardInput)
    cardInput.dispatchEvent(
      new Event("input")
    );

  if (nameInput)
    nameInput.dispatchEvent(
      new Event("input")
    );

  if (expiryInput)
    expiryInput.dispatchEvent(
      new Event("input")
    );
}

formFields.forEach(field => {

  field.addEventListener(
    "input",
    saveForm
  );

});

loadForm();

// ------------------------------
// CART ABANDONMENT WARNING
// ------------------------------

window.addEventListener(
  "beforeunload",
  function (e) {

    e.preventDefault();

    e.returnValue =
      "Your cart items are waiting. Are you sure you want to leave?";

  }
);

// ------------------------------
// ANIMATED COUNTERS
// ------------------------------

const metrics =
  document.querySelectorAll(".metric h2");

metrics.forEach(metric => {

  const text =
    metric.innerText;

  const number =
    parseInt(
      text.replace(/\D/g, "")
    );

  if (!number) return;

  let current = 0;

  const timer =
    setInterval(() => {

      current +=
        Math.ceil(number / 40);

      if (current >= number) {

        current = number;

        clearInterval(timer);
      }

      if (text.includes("%")) {
        metric.innerText =
          current + "%";
      } else {
        metric.innerText =
          current;
      }

    }, 20);

});

// ------------------------------
// ORDER ID GENERATOR
// ------------------------------

function generateOrderId() {

  return (
    "CFX" +
    Math.floor(
      100000 +
      Math.random() * 900000
    )
  );

}

const orderText =
  document.querySelector(
    ".success-box strong"
  );

if (orderText) {

  orderText.textContent =
    "#" + generateOrderId();

}

// ------------------------------
// ACCESSIBILITY
// ------------------------------

document.addEventListener(
  "keydown",
  e => {

    if (
      e.key === "Escape" &&
      successModal.style.display ===
      "flex"
    ) {

      closeModal();

    }

  }
);

// ------------------------------
// INIT
// ------------------------------

console.log(
  "CheckoutFlowX Loaded Successfully"
);