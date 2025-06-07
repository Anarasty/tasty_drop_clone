if (localStorage.getItem('name') === null) {
    localStorage.setItem('name', 'User');
}
if (localStorage.getItem('password') === null) {
    localStorage.setItem('password', '12345');
}
if (localStorage.getItem('balance') === null) {
    localStorage.setItem('balance', '1000');
}

function loadAccountData() {
    const nameElement = document.getElementById('acc_name');
    const passElement = document.getElementById('acc_pass');
    const balanceElement = document.getElementById('balance');

    if (nameElement && passElement && balanceElement) {
        nameElement.textContent = localStorage.getItem('name');
        passElement.textContent = localStorage.getItem('password');
        balanceElement.textContent = localStorage.getItem('balance');
    }
}

document.addEventListener('DOMContentLoaded', loadAccountData);

function updateName() {
    const nameInput = document.getElementById("name_input");
    const nameSpan = document.getElementById("acc_name");

    if (nameInput.style.display === "none") {
        nameInput.style.display = "block";
    } else {
        const newName = nameInput.value;
        if (newName) {
            nameSpan.textContent = newName;
            localStorage.setItem('name', newName); // Save new name to localStorage
        }
        nameInput.style.display = "none";
    }
}

function updatePassword() {
    const passInput = document.getElementById("pass_input");
    const passSpan = document.getElementById("acc_pass");

    if (passInput.style.display === "none") {
        passInput.style.display = "block";
    } else {
        const newPass = passInput.value;
        if (newPass) {
            passSpan.textContent = newPass;
            localStorage.setItem('password', newPass); // Save new password to localStorage
        }
        passInput.style.display = "none";
    }
}

function updateBalance() {
    const balInput = document.getElementById("bal_input");
    const balanceSpan = document.getElementById("balance");

    if (balInput.style.display === "none") {
        balInput.style.display = "block";
    } else {
        const donation = parseFloat(balInput.value);
        if (!isNaN(donation) && donation > 0) {
            const currentBalance = parseFloat(balanceSpan.textContent);
            const newBalance = (currentBalance + donation).toFixed(2);
            balanceSpan.textContent = newBalance;
            localStorage.setItem('balance', newBalance); // Save new balance to localStorage
        }
        balInput.style.display = "none";
    }
}
