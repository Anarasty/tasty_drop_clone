const cells = 61;

// From 0.001 to 100
// const items = [
//     {name: "Crimson Gates of Nothl", img: 'imgs/tresure1_item1.png', chance: 5, price: 310},
//     {name: "Crimson Progenitor's Bane", img: 'imgs/tresure1_item2.png', chance: 10, price: 421},
//     {name: "Crimson First of the Flood", img: 'imgs/tresure1_item3.png', chance: 15, price: 593},
//     {name: "Crimson Latticean Hierarchy", img: 'imgs/tresure1_item4.png', chance: 20, price: 288},
//     {name: "Crimson Flight of Epiphany", img: 'imgs/tresure1_item5.png', chance: 25, price: 245},
//     {name: "Scavenging Guttleslug", img: 'imgs/tresure1_item6.png', chance: 30, price: 65},
//     {name: "Pale Mausoleum", img: 'imgs/tresure1_item7.png', chance: 35, price: 19},
//     {name: "Golden Ripper's Reel", img: 'imgs/tresure1_item8.png', chance: 40, price: 49},
//     {name: "Golden Edict of Shadows", img: 'imgs/tresure1_item9.png', chance: 45, price: 33},
//     {name: "Shadow in the Deep Dagger", img: 'imgs/tresure1_item10.png', chance: 50, price: 27},
//     {name: "Swift Claw", img: 'imgs/tresure1_item11.png', chance: 60, price: 84},
// ];

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
    rewardsList.innerHTML = ''; // Очистка списка

    // Сортировка наград по вероятности (от самых редких до обычных)
    const sortedItems = items.sort((a, b) => a.chance - b.chance);

    // Генерация HTML элементов для списка наград
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
    }, 10);  // Немного задержим изменение opacity для плавности

    closeBtn.onclick = function() {
        popup.style.opacity = 0;
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);  // Задержка перед скрытием попапа для плавного исчезновения
    };

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.opacity = 0;
            setTimeout(() => {
                popup.style.display = 'none';
            }, 500);  // Задержка перед скрытием попапа для плавного исчезновения
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
    else isStarted = true;

    generateItems();
    const list = document.querySelector('.roll__list');

    setTimeout(() => {
        list.style.left = "50%";
        list.style.transform = 'translate3d(-50%, 0, 0)';
    }, 0);

    const item = list.querySelectorAll('li')[30]; // Adjust as needed

    function handleTransitionEnd() {
        isStarted = false;
        item.classList.add("active");
        const rolledItem = JSON.parse(item.getAttribute('data-item'));
        console.log(rolledItem);

        // / Add to local storage
        addItemToLocalStorage(rolledItem);
        
        // Показываем попап через 3 секунды
        setTimeout(() => {
            showPopup(rolledItem);
        }, 1000);

        list.removeEventListener('transitionend', handleTransitionEnd);
    }

    list.addEventListener('transitionend', handleTransitionEnd);
}