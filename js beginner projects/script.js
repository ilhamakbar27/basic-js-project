const lengthSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".option input"),
copyIcon = document.querySelector(".input-box span")
passwordInput = document.querySelector(".input-box input"),
passIndicator = document.querySelector(".pass-indicator")
generatebtn = document.querySelector(" .generate-btn");

const characters = {
  lowercase: "abcdefghujkflmnopqrstuvwxyz",
  Uppercase: "ABCDEFGHIJKLMNOPQRSTU",
  Numbers: "1234567890",
  Symbols: "<>!@#$%^&*()_+'/,.`",
};
const generatePassword = () => {
  let staticPassword = "",
  randomPassword = "",
  excludeDuplicate = false;
  passLength = lengthSlider.value;

  options.forEach((option) => {
    // looping through each option'S checkbox
    if (option.checked) {//if chekcbox is checked
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        ///adding particular value from characters
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        //if checkbox is spaces
        staticPassword += `   ${staticPassword}   `; /// adding spaces at the beginning and theend of static password
      } else {
        excludeDuplicate = true;
      }
    }
  });
  for (let i = 0; i < passLength; i++) {
    //getting random character from static password
    let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      //if exlcude duplicate is true
      !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
      // if randompasword doesnt contains the current random character or randomChar is equal
    } else {
      // else add random character to random password
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword; // 
};

// function updatePassIndicator() {
//  passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
// }

const updatePassIndicator = () => {
  passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}


const updatesSlider = () => {
  // passing slider value
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};
updatesSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.innerText ="check";
  setTimeout(() => {
    copyIcon.innerText ="copy_all";
  },1500)
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updatesSlider);
generatebtn.addEventListener("click", generatePassword);
