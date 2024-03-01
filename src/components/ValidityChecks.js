import { toast } from "react-toastify";

function validPassword(password) {
  // use regex to check for a password that is at least 8 characters long and contains a number and no special characters
  const pswd = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,20})$/;

  const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  if (password.match(specialChar)) {
    toast.error("Password must only contain letters and numbers!");
    return false;
  }

  if (password.match(pswd)) {
    return true;
  } else {
    toast.error(
      "Password must be atleast 8 characters long containing atleast one digit and no special characters."
    );
    return false;
  }
}

function validEmail(email) {
  // use regex to check for a valid email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (email.match(emailRegex)) {
    return true;
  } else {
    toast.error("Invalid email address!");
    return false;
  }
}

function validDate(date) {
  // use regex to check if a date is in the future
  let today = new Date();
  let inputDate = new Date(date);

  if (inputDate > today) {
    toast.error("Date cannot be in the future!");
    return false;
  } else {
    return true;
  }
}

function validAmount(amount) {
  let num = Number(amount);

  if (num > 0) {
    return true;
  } else {
    toast.error("Amount must be greater than 0!");
    return false;
  }
}

function validText(text, type) {
  const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  if (text.match(specialChar)) {
    toast.error(`${type} must only contain letters and numbers!`);
    return false;
  } else {
    return true;
  }
}

export { validPassword, validEmail, validDate, validAmount, validText };
