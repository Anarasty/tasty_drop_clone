// balance.js

// Initialize balance if not already set in local storage
if (localStorage.getItem('balance') === null) {
    localStorage.setItem('balance', 1000);
}

function loadBalance() {
    const balanceElement = document.getElementById('balance');
    if (balanceElement) {
        balanceElement.textContent = localStorage.getItem('balance');
    }
}

document.addEventListener('DOMContentLoaded', loadBalance);
