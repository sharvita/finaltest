//Get all of the necessary element
const form = document.getElementById('form');
const firstName = document.getElementById('inputFirstName');
const lastName = document.getElementById('inputLastName');
const username = document.getElementById('userName');
const email = document.getElementById('inputEmail');
const password = document.getElementById('inputPassword');
const password2 = document.getElementById('password2');
const userLocation = document.getElementById('location');
const date = document.getElementById('date');
const securityQuestion1Answer = document.getElementById('securityQuestion1Answer');
const securityQuestion2Answer = document.getElementById('securityQuestion2Answer');
const securityQuestion3Answer = document.getElementById('securityQuestion3Answer');
const biography = document.getElementById('biography')

form.addEventListener('submit', e => {
	e.preventDefault();
	checkInputs();
});

function checkInputs() {
	// Trim to remove the whitespaces
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	
	//First name empty value, illegal character check
    if(firstNameValue === '' || firstNameValue == null ) {
		setErrorFor(firstName, 'First Name cannot be blank');
	} else if (firstNameValue.match(/[\<\>!@#{}()\$%^&\*,'"`]+/i) ) {
		setErrorFor(firstName, 'Illegal Character');
	} else {
		setSuccessFor(firstName);
	}

	//Last name empty value, illegal character check
    if(lastNameValue === '' || lastNameValue == null) {
		setErrorFor(lastName, 'Last Name cannot be blank');
	} else if (lastNameValue.match(/[\<\>!@#{}()\$%^&\*,'"`]+/i) ) {
		setErrorFor(lastName, 'Illegal Character');
	} else {
		setSuccessFor(lastName);
	}
    
	//Username empty value, illegal character check
	if(usernameValue === '' || usernameValue == null) {
		setErrorFor(username, 'Username cannot be blank');
	} else if (lastNameValue.match(/[\<\>!@#{}()\$%^&\*,'"`]+/i) ) {
		setErrorFor(lastName, 'Illegal Character');
	}else {
		setSuccessFor(username);
	}
	
	//Email empty value, illegal character check
	if(emailValue === '' || emailValue == null) {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}

	//Password empty value, illegal character check
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	}else if (passwordValue.search(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
		setErrorFor(password, 'Password must be lower & upper case letter, number, and 6-20 in length');
	}else {
		setSuccessFor(password);
	}
	
	//Password 2 empty value, illegal character check
	if(password2Value === '') {
		setErrorFor(password2, 'Password cannot be blank');
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Password does not match');
	} else{
		setSuccessFor(password2);
	}

	//User Location empty value, illegal character check
	if(userLocation.value === '' || userLocation.value == null ) {
		setErrorFor(userLocation, 'Location cannot be blank');
	} else if (userLocation.value.match(/[\<\>!@#{}()\$%^&\*,'"`]+/i) ) {
		setErrorFor(userLocation, 'Illegal Character');
	} else {
		setSuccessFor(userLocation);
	}

	//Date empty value, illegal character check
	if(date.value === '' || date.value == null ) {
		setErrorFor(date, 'Date cannot be blank');
	} else {
		setSuccessFor(date);
	}

	//Security Question empty value, illegal character check
	if(securityQuestion1Answer.value === '' || securityQuestion1Answer.value == null ) {
		setErrorFor(securityQuestion1Answer, 'Security Question cannot be blank');
	} else if (securityQuestion1Answer.value.match(/[\<\>!@#{}()\$%^&\*,'"`]+/i) ) {
		setErrorFor(securityQuestion1Answer, 'Illegal Character');
	}else {
		setSuccessFor(securityQuestion1Answer);
	}

	//Security Question empty value, illegal character check
	if(securityQuestion2Answer.value === '' || securityQuestion2Answer.value == null ) {
		setErrorFor(securityQuestion2Answer, 'Security Question cannot be blank');
	} else if (securityQuestion2Answer.value.match(/[\<\>!@#{}()\$%^&\*,'"`]+/i) ) {
		setErrorFor(securityQuestion2Answer, 'Illegal Character');
	}else {
		setSuccessFor(securityQuestion2Answer);
	}

	//Security Question empty value, illegal character check
	if(securityQuestion3Answer.value === '' || securityQuestion3Answer.value == null ) {
		setErrorFor(securityQuestion3Answer, 'Security Question cannot be blank');
	} else if (securityQuestion3Answer.value.match(/[\<\>!@#{}()\$%^&\*,'"`]+/i) ) {
		setErrorFor(securityQuestion3Answer, 'Illegal Character');
	}else {
		setSuccessFor(securityQuestion3Answer);
	}

	//Biography Question empty value, illegal character check
	if (biography.value.match(/[\<\>!@#{}()\$%^&\*,'"`]+/i) ) {
		setErrorFor(biography, 'Illegal Character');
	} else {
		setSuccessFor(biography);
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function updateSecurity1View(){
    var securityquestion1 = document.getElementById("securityquestion1");
    var securityQuestion1Answer = document.getElementById("securityQuestion1Answer");

    if(securityquestion1.value == "securityquestion1_q1"){
        securityQuestion1Answer.classList.remove("invisible");
    }else if (securityquestion1.value == "securityquestion1_q2"){
        securityQuestion1Answer.classList.remove("invisible");
    }else if (securityquestion1.value == "securityquestion1_q3"){
        securityQuestion1Answer.classList.remove("invisible");
    }else {
		securityQuestion1Answer.classList.remove("invisible");
	}
}

function updateSecurity2View() {
	var securityquestion2 = document.getElementById("securityquestion2");
    var securityQuestion2Answer = document.getElementById("securityQuestion2Answer");

	if(securityquestion2.value == "securityquestion2_q1"){
        securityQuestion2Answer.classList.remove("invisible");
    }else if (securityquestion2.value == "securityquestion2_q2"){
        securityQuestion2Answer.classList.remove("invisible");
    }else if (securityquestion2.value == "securityquestion2_q3"){
        securityQuestion2Answer.classList.remove("invisible");
    }else {
		securityQuestion2Answer.classList.remove("invisible");
	}
}

function updateSecurity3View() {
	var securityquestion3 = document.getElementById("securityquestion3");
    var securityQuestion3Answer = document.getElementById("securityQuestion3Answer");

	if(securityquestion3.value == "securityquestion3_q1"){
        securityQuestion3Answer.classList.remove("invisible");
    }else if (securityquestion3.value == "securityquestion3_q2"){
        securityQuestion3Answer.classList.remove("invisible");
    }else if (securityquestion3.value == "securityquestion3_q3"){
        securityQuestion3Answer.classList.remove("invisible");
    }else {
		securityQuestion3Answer.classList.remove("invisible");
	}
}