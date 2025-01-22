const form = document.getElementById('form')
const firstName = document.getElementById('name');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const country = document.getElementById('country');
const otherCountries = document.getElementById('other-countries');
const zipcode = document.getElementById('zipcode');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('pw-confirm')
const submitBtn = document.querySelector('button[type="submit"]')
const errorMsg = document.getElementById('error-msg')

const errors = {
    firstName: "Name cannot be empty.",
    lastName: "Lastname cannot be empty.",
    email: "Please insert a valid mail.",
    country: "Please select a country.",
    otherCountries: "Please enter your country name.",
    zipcode: "Zipcode invalid, please insert a valid one for your country.",
    password: "Please insert a valid password. Remember that a password should be at least 8 and maximum 30 characters long and should be containing at least one uppercase letter and one number.",
    confirmPassword: "The password doesn't match the previous one."
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();
})

const validateName = (nameInput) => {
    const value = nameInput.value.trim()
    if(value === ""){
        showError(nameInput, errors.firstName)
        return false
    }
    removeError(nameInput);
    return true
}

const validateLastName = (lastNameInput) => {
    const value = lastNameInput.value.trim()
    if(value === ""){
        showError(lastNameInput, errors.lastName)
        return false
    }
    removeError(lastNameInput);
    return true
}

const validateEmail = (emailInput) => {
    const validDomains = [
        'gmail.com', 
        'icloud.com', 
        'yahoo.com'
    ];
    const value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(value)){
        showError(emailInput, errors.email);
        return false
    }
    const domain = value.split('@')[1];
    if(!validDomains.includes(domain)){
        showError(emailInput, "Please enter a valid email domain (e.g.: @gmail.com, @icloud.com, @yahoo.com)")
        return false
    }
    removeError(emailInput);
    return true
}

country.addEventListener('change', (e) => {
    if(e.target.value === 'other'){
        otherCountries.style.display = "block";
    } else {
        otherCountries.style.display = "none";
    }
})

const validateCountry = () => {
    if(country.value === ""){
        showError(country, errors.country)
        return false
    } else if (country.value === "other" && otherCountries.value.trim() === ""){
        showError(otherCountries, errors.otherCountries)
        return false
    } else {
        removeError(country);
        removeError(otherCountries);
        return true
    }
}

const validateZipCode = () => {
    const zipPatterns = {
        it: /^\d{5}$/,
        ch: /^\d{4}$/,
        de: /^\d{5}$/,
        fr: /^\d{5}$/,
        nl: /^\d{4}$/,
    };
    const pattern = zipPatterns[country.value];
    if(pattern && !pattern.test(zipcode.value)){
        showError(zipcode, errors.zipcode)
        return false
    }
    removeError(zipcode);
    return true
}

const validatePassword = () => {
    const value = password.value;
    const pwRegex = /^(?=.*[A-Z])(?=.*\d).{8,30}$/;

    if(!pwRegex.test(value)){
        showError(password, errors.password);
        return false
    }
    removeError(password);
    return true
}

const checkPwMatch = () => {
    if(password.value !== confirmPassword.value){
        showError(confirmPassword, errors.confirmPassword);
        return false;
    }
    removeError(confirmPassword);
    return true
}

const showError = (input, message) => {
    const parent = input.closest('.input-control');
    const errorMsg = parent.querySelector('.error-msg');
    const hint = parent.querySelector('p');

    if (hint) hint.style.display = 'none';
    errorMsg.innerText = message;

    if (message) {
        errorMsg.style.display = 'block';
    }
    input.classList.add('error');
};
const removeError = (input) => {
    const parent = input.closest('.input-control');
    const errorMsg = parent.querySelector('.error-msg');
    const hint = parent.querySelector('p');

    if (hint) hint.style.display = '';
    errorMsg.innerText = '';
    errorMsg.style.display = 'none';
    input.classList.remove('error');
};

const validateForm = () => {
    const isNameValid = validateName(firstName);
    const isLastNameValid = validateName(lastName);
    const isEmailValid = validateEmail(email);
    const isCountryValid = validateCountry();
    const isZipCodeValid = validateZipCode();
    const isPasswordValid = validatePassword();
    const isPasswordMatchValid = checkPwMatch();

    if (isNameValid && isLastNameValid && isEmailValid && isCountryValid && isZipCodeValid && isPasswordValid && isPasswordMatchValid) {
        form.submit();
        form.reset()
    }
}
