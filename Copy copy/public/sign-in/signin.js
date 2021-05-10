const form = document.getElementById('form');
const userName = document.getElementById('userName');
const password = document.getElementById('userPassword');

form.addEventListener('submit', e => {
	e.preventDefault();
	checkInputs();
});

function checkInputs() {
    // Trim to remove the whitespaces
    const userNameValue = userName.value.trim();
    const passwordValue = password.value.trim();

    //User name empty value, illegal character check
    if(userNameValue === '' || userNameValue == null ) {
		setErrorFor(userNameValue, 'User name cannot be blank');
	} else {
		setSuccessFor(userNameValue);
	}

    //Password empty value, illegal character check
    if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	}else {
		setSuccessFor(password);
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