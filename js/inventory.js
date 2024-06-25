// inventory.js

function loadInventory() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || {};
    const inventorySection = document.querySelector('.inventory');
    inventorySection.innerHTML = ''; // Clear the inventory section

    if (Object.keys(inventory).length === 0) {
        inventorySection.innerHTML = '<div>Looks like your inventory is empty</div>';
    } else {
        const ul = document.createElement('ul');
        for (const itemName in inventory) {
            const item = inventory[itemName];
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.img}" alt="${item.name}" width="50" height="50">
                <span>${item.name} x${item.quantity}</span>
            `;
            ul.appendChild(li);
        }
        inventorySection.appendChild(ul);
    }
}

document.addEventListener('DOMContentLoaded', loadInventory);
