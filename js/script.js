const cells = 61;

// From 0.001 to 100
const items = [
    {name: "Crimson Gates of Nothl", img: 'imgs/tresure1_item1.png', chance: 5},
    {name: "Crimson Progenitor's Bane", img: 'imgs/tresure1_item2.png', chance: 10},
    {name: "Crimson First of the Flood", img: 'imgs/tresure1_item3.png', chance: 15},
    {name: "Crimson Latticean Hierarchy", img: 'imgs/tresure1_item4.png', chance: 20},
    {name: "Crimson Flight of Epiphany", img: 'imgs/tresure1_item5.png', chance: 25},
    {name: "Scavenging Guttleslug", img: 'imgs/tresure1_item6.png', chance: 30},
    {name: "Pale Mausoleum", img: 'imgs/tresure1_item7.png', chance: 35},
    {name: "Golden Ripper's Reel", img: 'imgs/tresure1_item8.png', chance: 40},
    {name: "Golden Edict of Shadows", img: 'imgs/tresure1_item9.png', chance: 45},
    {name: "Shadow in the Deep Dagger", img: 'imgs/tresure1_item10.png', chance: 50},
    {name: "Swift Claw", img: 'imgs/tresure1_item11.png', chance: 60},
];

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

generateItems();

let isStarted = false;

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
        console.log(JSON.parse(item.getAttribute('data-item')));
        list.removeEventListener('transitionend', handleTransitionEnd);
    }

    list.addEventListener('transitionend', handleTransitionEnd);
}
