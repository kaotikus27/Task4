"use strict";
var NewsLetterStatus;
(function (NewsLetterStatus) {
    NewsLetterStatus["isSubscribed"] = "active";
    NewsLetterStatus["noSubscribed"] = "inactive";
})(NewsLetterStatus || (NewsLetterStatus = {}));
const CurrentUsers = [
    {
        id: 1,
        firstName: "Eleomar",
        lastName: "Halaman",
        emailAddress: "kaotikus27@gmail.com",
        age: 26,
        newsLetter: NewsLetterStatus.isSubscribed
    }
];
// Get form values using form elements' IDs or names
const form = document.getElementById('regForm');
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const newsLetter = document.getElementById('newsLetter');
    const isSubscribed = newsLetter.checked ? NewsLetterStatus.isSubscribed : NewsLetterStatus.noSubscribed;
    const newUser = {
        id: getNextId(CurrentUsers), // Get the next ID
        firstName, // From the form
        lastName, // From the form
        age: +age, // Convert the age to a number
        emailAddress: email, // Convert the age to a number
        newsLetter: isSubscribed, // From the form checkbox
    };
    let isValid = true;
    let firstNameError = ``;
    let lastNameError = ``;
    let ageError = ``;
    let emailError = ``;
    // Check if first name is empty
    if (firstName.trim() === '') {
        isValid = false;
        firstNameError += 'First name is required.\n';
    }
    // Check if last name is empty
    if (lastName.trim() === '') {
        isValid = false;
        lastNameError += 'Last name is required.\n';
    }
    // Check if age is a valid number and not empty
    if (age.trim() === '') {
        isValid = false;
        ageError += 'Age is required.\n';
    }
    else if (isNaN(Number(age))) {
        isValid = false;
        ageError += 'Age must be a valid number.\n';
    }
    // Check if email is not empty and is a valid email format
    if (email.trim() === '') {
        isValid = false;
        emailError += 'Email is required.\n';
    }
    else if (!validateEmail(email)) {
        isValid = false;
        emailError += 'Please enter a valid email address.\n';
    }
    // If validation fails, show the error messages and stop form submission
    if (!isValid) {
        document.getElementById('firstNameError').textContent = firstNameError;
        document.getElementById('lastNameError').textContent = lastNameError;
        document.getElementById('ageError').textContent = ageError;
        document.getElementById('emailError').textContent = emailError;
        console.log("uncesscefuly");
        return; // Prevent form submission
    }
    else {
        const message = `
        <h3>Form submitted successfully!</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        <p><strong>Newsletter Subscription:</strong> ${isSubscribed === NewsLetterStatus.isSubscribed ? 'Subscribed' : 'Not Subscribed'}</p>
        `;
        document.getElementById('firstNameError').textContent = ``;
        document.getElementById('lastNameError').textContent = ``;
        document.getElementById('ageError').textContent = ``;
        document.getElementById('emailError').textContent = ``;
        const messageContainer = document.getElementById('message');
        messageContainer.innerHTML = message;
        registerUser(newUser);
        console.log(newUser);
        console.log("Succesfully registered");
    }
});
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}
function registerUser(user) {
    const id = getNextId(CurrentUsers);
    const newUserInfo = {
        id,
        firstName: user.firstName,
        lastName: user.lastName,
        age: +user.age,
        emailAddress: user.emailAddress,
        newsLetter: NewsLetterStatus.isSubscribed,
    };
    CurrentUsers.push(newUserInfo);
    console.log("success registered");
    return newUserInfo;
}
/* finds the next available ID by determining the highest id in an array of objects
 and then returning the next integer. */
function getNextId(items) {
    return items.reduce((max, x) => (x.id > max ? x.id : max), 0) + 1;
}
