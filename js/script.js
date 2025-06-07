const cells = 61;
function getItem(excludeItem = null) {
    let item;

    while (!item) {
        const chance = Math.floor(Math.random() * 100000);

        items.forEach(elm => {
            if (chance < elm.chance && !item && elm !== excludeItem) {
                item = elm;
            }
        });
    }

    return item;
}

function generateItems() {
    document.querySelector('.roll__list').remove();
    document.querySelector('.roll').innerHTML = `
    <ul class="roll__list"></ul>
    `;

    const list = document.querySelector('.roll__list');
    let lastItem = null;

    for (let i = 0; i < cells; i++) {
        const item = getItem(lastItem);
        lastItem = item; // update last item

        const li = document.createElement('li');
        li.setAttribute('data-item', JSON.stringify(item));
        li.classList.add('roll__list__item');
        li.innerHTML = `
            <img src="${item.img}" alt="item">
        `;

        list.append(li);
    }
}

//reward list
function generateRewardsList() {
    const rewardsList = document.getElementById('rewards-list');
    rewardsList.innerHTML = ''; // Clear list

    // Sorting the awards by drop-chance (from super rare to common)
    const sortedItems = items.sort((a, b) => a.chance - b.chance);

    // Generate HTML list of sorted rewards
    sortedItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.img}" alt="${item.name}" width="50" height="50">
            <span>${item.name}</span>
        `;
        rewardsList.appendChild(li);
    });
}

generateItems();
generateRewardsList();


let isStarted = false;


function showPopup(item) {
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popup-img');
    const popupName = document.getElementById('popup-name');
    const popupPrice = document.getElementById('popup-price');
    const closeBtn = document.querySelector('.popup .close');

    popupImg.src = item.img;
    popupName.textContent = item.name;
    popupPrice.textContent = item.price;

    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.opacity = 1;
    }, 10);  // Adding opacity

    closeBtn.onclick = function() {
        popup.style.opacity = 0;
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);   // smooth disappearance 
    };

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.opacity = 0;
            setTimeout(() => {
                popup.style.display = 'none';
            }, 500);  // smooth disappearance 
        }
    };
}

function showInsufficientFundsPopup() {
    const popup = document.getElementById('insufficient-funds-popup');
    const closeBtn = document.querySelector('#insufficient-funds-popup .close');

    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.opacity = 1;
    }, 10);

    closeBtn.onclick = function() {
        popup.style.opacity = 0;
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);
    };

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.opacity = 0;
            setTimeout(() => {
                popup.style.display = 'none';
            }, 500);
        }
    };
}


//LOCALSTORAGE add items on roll
function addItemToLocalStorage(item) {
    let inventory = JSON.parse(localStorage.getItem('inventory')) || {};
    if (inventory[item.name]) {
        inventory[item.name].quantity += 1;
    } else {
        inventory[item.name] = {...item, quantity: 1};
    }
    localStorage.setItem('inventory', JSON.stringify(inventory));
}

function start() {
    if (isStarted) return;
    
    const balance = parseInt(localStorage.getItem('balance'));
    
    if (balance < casePrice) {
        console.log('Недостаточно средств для прокрутки');
        showInsufficientFundsPopup();
        return;
    }
    
    // Change balance on case roll
    localStorage.setItem('balance', balance - casePrice);
    loadBalance(); // reload balance state

    isStarted = true;
    generateItems();
    const list = document.querySelector('.roll__list');

    setTimeout(() => {
        list.style.left = "50%";
        list.style.transform = 'translate3d(-50%, 0, 0)';
    }, 0);

    const item = list.querySelectorAll('li')[30]; 

    function handleTransitionEnd() {
        isStarted = false;
        item.classList.add("active");
        const rolledItem = JSON.parse(item.getAttribute('data-item'));
        console.log(rolledItem);

        // add item to local storage 
        addItemToLocalStorage(rolledItem);
        setTimeout(() => {
            showPopup(rolledItem);
        }, 1000);

        list.removeEventListener('transitionend', handleTransitionEnd);
    }

    list.addEventListener('transitionend', handleTransitionEnd);
}