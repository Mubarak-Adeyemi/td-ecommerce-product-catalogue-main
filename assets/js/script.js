// ==================================
// 1. Toggle humbugger menu;
// By default, the .link tag should 
// display none.
// ==================================
const hamburgerIcon = document.querySelector('.hamburger');
const menu = document.querySelector('.link');
const mq = window.matchMedia('(max-width: 768px)')
let active = false;

/* =========================================
    FUNCTION TO SET DISPLAY TYPE OF .link TAG
=============================================*/
const displayMenu = (x, y = 'pointer') => {
    menu.style.display = x;
    hamburgerIcon.style.cursor = y;
}

/* =========================================
    Setting .link tag by default to display 
    none, when the browser's width is <= 768px
=============================================*/
if (mq.matches) {
    displayMenu('none')
}
/* =========================================
    event listener 'resize' calculate the 
    window's width automatically on resizing 
    the browser's width.
=============================================*/
window.addEventListener('resize', () => {
    if (mq.matches) {
        displayMenu('none')
    } else {
        displayMenu('flex')
    }
});

/* =========================================
    Setting .link tag by default to display 
    none, when the screen width is <= 768px
=============================================*/
hamburgerIcon.addEventListener('click', () => {

    if (active === false) {
        displayMenu('block');
        active = true;
    } else if (active === true) {
        displayMenu('none');
        active = false;
    }
});





// ==================================
// 2. Display products based on 
// All, Men or Female categories.
// ==================================

const productTabs = document.querySelectorAll('input[name="tabset"]');
const catalogues = document.querySelectorAll('.catalogue');
const tags = document.querySelectorAll('.card_row .percard h4 .tag')


productTabs.forEach(productTab => {
    productTab.addEventListener('change', (e) => {


        if (e.target.value === 'All') {
            tags.forEach(tag => {
                tag.parentElement.parentElement.parentElement.style.display = "initial";
            })
        } else if (e.target.value === 'Male') {
            tags.forEach(tag => {
                if (tag.textContent === 'Male') {

                    tag.parentElement.parentElement.parentElement.style.display = "initial";

                } else {
                    tag.parentElement.parentElement.parentElement.style.display = "none";
                }
            })


        } else if (e.target.value === 'Female') {
            tags.forEach(tag => {
                if (tag.textContent === 'Female') {

                    tag.parentElement.parentElement.parentElement.style.display = "initial";

                } else {
                    tag.parentElement.parentElement.parentElement.style.display = "none";

                }
            })


        } else if (e.target.value === 'Babies') {
            tags.forEach(tag => {
                if (tag.textContent === 'Babies') {

                    tag.parentElement.parentElement.parentElement.style.display = "initial";

                } else {
                    tag.parentElement.parentElement.parentElement.style.display = "none";

                }
            })


        }
        matchOrNot()
    });
})



// ==================================
// 3. Display products based on 
// search keywords in the input fields.
// ==================================

const cardRow = document.querySelector('.card_row')
const errorMessage = document.createElement('h1')
errorMessage.setAttribute('class', 'errorM')
const text = document.createTextNode('Item not found')
const cataloguesArr = Array.prototype.slice.call(catalogues)
const search = document.querySelector('.search_product')

let noMatch = false;
let match = false;


search.addEventListener('input', (e) => {   


    cataloguesArr.forEach(catalogue =>{
        catalogue.style.display = "none;"
        const dressName = catalogue.children[0].children[2].textContent.toUpperCase();
        const target = e.target;

        if (dressName.includes(target.value.toUpperCase())) {
            catalogue.style.display = "initial";
        }else {
            catalogue.style.display = "none";            
        }
    })

    matchOrNot()


})

const matchOrNot = ()=>{

    //If every card has "display=none", run "noResult"
    // If at least one card has "display=initial", remove "noResult"

    noMatch = cataloguesArr.every(catalogue => catalogue.style.display === "none");
    match = cataloguesArr.some(catalogue => catalogue.style.display === "initial");
    if (noMatch) {
        noResult();
    }else if(match){
        errorMessage.remove()
    }
    
}
const noResult = () => {
    
    // Append error message, if it is not there.
    if (!cardRow.querySelector('h1')) {
        errorMessage.appendChild(text)
        cardRow.appendChild(errorMessage);
    }
}