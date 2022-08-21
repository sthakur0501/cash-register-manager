const billAmount = document.querySelector("#bill-amount");
const cashGiven = document.querySelector("#cash-given");
const message = document.querySelector("#message");
const checkBtn = document.querySelector("#check");
const table = document.querySelector(".change-table");
const numOFRows = document.querySelectorAll(".number-of-notes");
const nextBtn = document.querySelector("#next");
const labelCashSection = document.getElementById("cash-label");

const notes = [2000, 500, 100, 20, 10, 5, 1];

function toggleNotesTable(value) {
  table.style.display = value;
}

function toggleCashSection(value) {
  labelCashSection.style.display = value;
  cashGiven.style.display = value;
  checkBtn.style.display = value;
}

function hideMessage() {
  // message.innerText="";
  message.style.display = "none";
}

function updateMessage(msg) {
  message.style.display = "block";
  message.innerText = msg;
}

function updateTable(numOFNotes) {
  numOFRows.forEach((row, index) => {
    row.innerText = "";
    if (numOFNotes[index] > 0) {
      row.innerText = numOFNotes[index];
    }
  });

  toggleNotesTable("block");
}

function calculateChange(amount) {
  console.log("inside calculate change", { amount });
  let difference = amount;
  let numOFNotes = [0, 0, 0, 0, 0, 0, 0];

  notes.forEach((note, index) => {
    if (difference >= note) {
      let c_amt = 0;
      let numberOFNotes = Math.trunc(difference / note);
      // console.log(numberOFNotes,note,index);
      c_amt = note * numberOFNotes;
      difference -= c_amt;
      numOFNotes[index] = numberOFNotes;
    }
  });

  updateTable(numOFNotes);
}

function checkBtnListener() {
  let bill = Number(billAmount.value);

  if (cashGiven.style.display === "block") {
    let cash = Number(cashGiven.value);
    console.log({ bill }, { cash });

    if (checkAmount(cashGiven)) {
      if (cash >= bill) {
        let amtToBeReturned = cash - bill;
        hideMessage();
        if (checkAmount(billAmount)) {
          calculateChange(amtToBeReturned);
        } else {
          toggleNotesTable("none");
        }
      } else {
        updateMessage("Cash provided must be atleast equal to bill amount.");
        toggleNotesTable("none");
      }
    } else {
      toggleNotesTable("none");
    }
  }
}

function isFloat(value) {
  let n = value;
  let res = n % 1 !== 0; //Number(n) === n &&
  if (!res) {
    return false;
  }
  return true;
}

function checkAmount(amount) {
  console.log("1");
  let value = Number(amount.value);
  console.log({ value });
  if (value === 0) {
    updateMessage(amount.name + " amount cannot be zero or any other value.");
    return false;
  } else if (value < 0) {
    updateMessage(amount.name + " amount cannot be negative number.");
    return false;
  } else if (isFloat(value)) {
    updateMessage(amount.name + " amount cannot be floating-point number.");
    return false;
  } else if (value === "") {
    updateMessage(amount.name + " amount cannot be empty, must be a number.");
    return false;
  } else if (!Number.isInteger(value) && value !== "0") {
    updateMessage(amount.name + " amount cannot be words, must be a number.");
    return false;
  }

  return true;
}

function nextBtnListener() {
  hideMessage();
  if (checkAmount(billAmount)) {
    toggleCashSection("block");
    // nextBtn.innerText = "Check Bill";
    toogleNextBtn("none");
  } else {
    toggleNotesTable("none");
  }
}

function toogleNextBtn(value) {
  nextBtn.style.display = value;
}

toggleCashSection("none");
toggleNotesTable("none");
checkBtn.addEventListener("click", checkBtnListener);
nextBtn.addEventListener("click", nextBtnListener);
