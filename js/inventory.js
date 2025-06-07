function loadInventory() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || {};
    const inventorySection = document.querySelector('.inventory');
    const balanceElement = document.getElementById('balance');

    // Set initial balance
    balanceElement.textContent = localStorage.getItem('balance');
    inventorySection.innerHTML = ''; // Clear the inventory section

    if (Object.keys(inventory).length === 0) {
        inventorySection.innerHTML = '<div class="empty-inv">Looks like your inventory is empty . . .</div>';
    } else {
        const ul = document.createElement('ul');
        for (const itemName in inventory) {
            const item = inventory[itemName];
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.img}" alt="${item.name}" >
                <p>${item.name} <strong>x${item.quantity}</strong></p>
                <div class="inv_divider">
                    <p>${item.price}$</p>
                    <button class="sell-btn" data-item="${item.name}">SELL</button>
                </div>
            `;
            ul.appendChild(li);
        }
        inventorySection.appendChild(ul);

        // Add event listeners for sell buttons
        document.querySelectorAll('.sell-btn').forEach(button => {
            button.addEventListener('click', function() {
                sellItem(this.dataset.item);
            });
        });
    }
}

function sellItem(itemName) {
    const inventory = JSON.parse(localStorage.getItem('inventory'));
    const balance = parseFloat(localStorage.getItem('balance'));
    const item = inventory[itemName];

    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        delete inventory[itemName];
    }

    localStorage.setItem('inventory', JSON.stringify(inventory));
    localStorage.setItem('balance', (balance + item.price).toFixed(2));

    // Update balance display
    document.getElementById('balance').textContent = localStorage.getItem('balance');

    // Reload inventory
    loadInventory();
}

document.addEventListener('DOMContentLoaded', loadInventory);
