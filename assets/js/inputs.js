let inputContainers = document.querySelectorAll('.input-container');
let inputsPassword = document.querySelectorAll('input[type="password"]');

inputContainers.forEach(inputContainer => {
    if (inputContainer.querySelectorAll('input').length === 1) {
        let input = inputContainer.querySelector('input');

        input.addEventListener('focus', () => {
            inputContainer.classList.add('active');
        });

        input.addEventListener('blur', () => {
            if (inputContainer.querySelector('div:hover')) {
                return;
            }
            inputContainer.classList.remove('active');
        });

        inputContainer.addEventListener('click', () => {
            inputContainer.classList.add('active');
            inputContainer.querySelector('input').focus();
        });
    }
    else {
        let input = inputContainer.querySelectorAll('input');

        input.forEach(input => {
            input.addEventListener('focus', () => {
                inputContainer.classList.add('active');
            });

            input.addEventListener('blur', () => {
                if (inputContainer.querySelector('div:hover')) {
                    return;
                }
                inputContainer.classList.remove('active');
            });

            inputContainer.addEventListener('click', (event) => {
                inputContainer.classList.add('active');
                if (event.offsetX < inputContainer.offsetWidth / 2) {
                    inputContainer.querySelector('input').focus();
                }
                else {
                    inputContainer.querySelector('input:last-child').focus();
                }

            });
        });
    }
});

inputsPassword.forEach(inputPassword => {
    let inputContainer = inputPassword.closest('.input-container');
    let icon = inputContainer.querySelector('.icon-eye-off');

    console.log(inputPassword)
    console.log(inputContainer);

    icon.addEventListener('click', () => {
        if (inputPassword.type === 'password') {
            inputPassword.type = 'text';
            icon.classList.add('active');
        } else {
            inputPassword.type = 'password';
            icon.classList.remove('active');
        }
    });
});