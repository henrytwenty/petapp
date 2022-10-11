"use strict";
/* ================================
     SELECT DOM ELEMENT 
   ================================ */
// Select Button
const submitBtn = document.getElementById("submit-btn");
const heathBtn = document.getElementById("healthy-btn");
const bmiBtn = document.getElementById("bmi-btn");

// Select Input Element
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

// Select Table body Element
const tableBodyEl = document.getElementById("tbody");

// Create Pet Array
const petArr = [];

/* ================================
     SUBMIT BUTTON LISTENER
   ================================ */
submitBtn.addEventListener("click", function () {
  // Collect input data
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    color: colorInput.value,
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: "?",
    // date: new Date().toLocaleDateString(), // Date: mm/dd/yyyy
    date: new Date().toLocaleDateString("en-GB"), // Date: dd/mm/yyyy
  };

  // Call Validate function
  const validate = validateData();
  if (validate) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
  }
  console.log(petArr);
});

/* ================================
     VALIDATE INPUT DATA
   ================================ */

// Validate Data function
const validateData = function () {
  let valid = false;
  const idValid = checkID();
  const nameValid = checkName();
  const ageValid = checkNumInput(ageInput, "Age", 1, 5);
  const typeValid = checkSelect(typeInput, "Select Type");
  const weightValid = checkNumInput(weightInput, "Weight", 1, 5);
  const lengthValid = checkNumInput(lengthInput, "Length", 1, 100);
  const breedValid = checkSelect(breedInput, "Select Breed");
  const validInput =
    idValid &&
    nameValid &&
    ageValid &&
    typeValid &&
    weightValid &&
    lengthValid &&
    breedInput;

  if (validInput) {
    valid = true;
  }
  return valid;
};

// isRequired Function
const isRequired = (value, data) => (value === data ? false : true);

// isBetween Function
const isBetween = (value, min, max) =>
  value >= min && value <= max ? true : false;

// isIdValid Function
const isIdValid = (id) => {
  let valid = true;
  if (petArr.length > 0) {
    for (let i = 0; i < petArr.length; i++) {
      if (id === petArr[i].id) {
        valid = false;
        break;
      }
    }
  }
  return valid;
};

// Check ID function
const checkID = () => {
  let valid = false;
  const id = idInput.value.trim();
  if (!isRequired(id, "")) {
    alert("Please input for id");
  } else if (!isIdValid(id)) {
    alert("ID must unique");
  } else {
    valid = true;
  }
  return valid;
};

// Check Pet name function
const checkName = () => {
  let valid = false;
  const name = nameInput.value.trim();
  if (!isRequired(name, "")) {
    alert(" Please input for Pet Name");
  } else {
    valid = true;
  }
  return valid;
};

// Check Num Input funtion ( Age,Weight, Length)
const checkNumInput = (num, str, min, max) => {
  let valid = false;
  const value = num.value.trim();
  if (!isRequired(value, "")) {
    alert(`Please input for ${str}`);
  } else if (!isBetween(value, min, max)) {
    alert(`${str} must be between ${min} and ${max}!`);
  } else valid = true;
  return valid;
};

// Check Select Input Function ( Type , Breed)
const checkSelect = (type, str) => {
  let valid = false;
  if (!isRequired(type.value, str)) {
    alert(`Please ${str}`);
  } else valid = true;
  return valid;
};

/* ================================
     CLEAR INPUT
   ================================ */
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = typeInput.querySelectorAll("option")[0].value;
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = breedInput.querySelectorAll("option")[0].value;
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

/* ================================
     RENDER TABLE DATA
   ================================ */
const renderTableData = function (petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].length} cm</td>
    <td>${petArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${
      petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    } "></i></td>
    <td><i class="bi ${
      petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>${petArr[i].bmi}</td>
    <td>${petArr[i].date}</td>
    <td><button type="button" class="btn btn-danger" onclick="deletePet(${i})" ">Delete</button>
    </td> `;
    tableBodyEl.appendChild(row);
  }
};

/* ================================
     DELETE PET DATA
   ================================ */
const deletePet = (petId) => {
  console.log(petId);
  if (confirm("Are you sure")) {
    petArr.splice(petId, 1);
    renderTableData(petArr);
  }
};

/* ================================
     HEALTH CHECK 
   ================================ */

let heathCheck = false;

heathBtn.addEventListener("click", function () {
  if (!heathCheck) {
    const healthArr = petArr.filter(
      (pet) => pet.vaccinated && pet.dewormed && pet.sterilized === true
    );
    renderTableData(healthArr);
    heathBtn.textContent = "Show All Pet";
    heathCheck = true;
  } else if (heathCheck) {
    heathBtn.textContent = "Show Healthy Pet ";
    renderTableData(petArr);
    heathCheck = false;
  }
});

/* ================================
     CACULATE BMI
   ================================ */
const calcBMI = function (weight, length, type) {
  if (type === "Dog") return (weight * 703) / length ** 2;
  if (type === "Cat") return (weight * 886) / length ** 2;
};
bmiBtn.addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    petArr[i].bmi = calcBMI(
      petArr[i].weight,
      petArr[i].length,
      petArr[i].type
    ).toFixed(2);
  }
  renderTableData(petArr);
});
