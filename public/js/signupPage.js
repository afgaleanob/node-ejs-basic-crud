document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('pwdInput');
    const password2Input = document.getElementById('pwd2Input');
    const password2div = document.getElementById('pwd2Div');
    const togglePassword = document.getElementById('togglePassword');
    const passwordConfirmation = document.getElementById('pwd2Checkbox');
    const form = document.querySelector('form');
    const errorContainer = document.getElementById('messageDiv');
    
    togglePassword.addEventListener('click', function (e) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.classList.remove('bi-eye');
            togglePassword.classList.add('bi-eye-slash');
            password2Input.disabled = true;
            password2div.hidden = true;
            passwordConfirmation.checked = false;
        } else {
            passwordInput.type = 'password';
            togglePassword.classList.remove('bi-eye-slash');
            togglePassword.classList.add('bi-eye');
            password2Input.disabled = false;
            password2div.hidden = false;
            passwordConfirmation.checked = true;
        }
    });
    
    form.addEventListener('submit', function (e) {
        const nameInput = document.querySelector('input[name="name"]');
        const userInput = document.querySelector('input[name="user"]');
        const mailInput = document.querySelector('input[name="mail"]');
        const pwdInput = document.querySelector('input[name="pwd"]');
        const pwd2Input = document.querySelector('input[name="pwd2"]');
    
        let fieldToFocus = null;
    
        if (nameInput.value.trim() === '') {
            displayError('Por favor, complete el campo Nombre.');
            fieldToFocus = nameInput;
        } else if (userInput.value.trim() === '') {
            displayError('Por favor, complete el campo Usuario.');
            fieldToFocus = userInput;
        } else if (mailInput.value.trim() === '') {
            displayError('Por favor, complete el campo Correo.');
            fieldToFocus = mailInput;
        } else if (pwdInput.value.trim() === '') {
            displayError('Por favor, complete el campo Contraseña.');
            fieldToFocus = pwdInput;
        } else if (passwordInput.type === 'password' && pwdInput.value !== pwd2Input.value) {
            displayError('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
            fieldToFocus = pwd2Input;
        }
    
        if (fieldToFocus) {
            fieldToFocus.focus();
            e.preventDefault();
        }
    });

    function displayError(message) {
        errorContainer.innerHTML = '<div class="alert alert-danger" role="alert">' + message + '</div>';
    }
});
