let getForFullRoof = 'https://solarisecs.herokuapp.com/api/Price/getFullPrice/';
let getForPrice = 'https://solarisecs.herokuapp.com/api/Price/getForPrice/';
let getForBill = 'https://solarisecs.herokuapp.com/api/Price/getForBill/';
let getAddress = 'https://solarisepython.herokuapp.com/roof/';

// console.log(firebas eurL);

let address = document.getElementById('address')


let maxLink = document.getElementById('form1')
let budgetLink = document.getElementById('form2')
let billLink = document.getElementById('form3')


let height = 0;
let width = 0;
let panelId = document.getElementById('company-list1')
let panelId2 = document.getElementById('company-list2')
let panelId3 = document.getElementById('company-list3')

function getDimensions() {
    let getRequest = new XMLHttpRequest();
    console.log(`${getAddress}${address.value}`);
    getRequest.open('GET', `${getAddress}${address.value}`);
    getRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let response = JSON.parse(getRequest.responseText);
                console.log(response)
                width = response.width
                height = response.height
            } else {
                alert("Something went wrong :(:(")
            }
        }
    }
    getRequest.send();
}

function showMaxForm() {
    getDimensions()
    maxLink.classList.remove("hide");
    budgetLink.classList.add("hide");
    billLink.classList.add("hide");
}

function showBudgetForm() {
    maxLink.classList.add("hide");
    budgetLink.classList.remove("hide");
    billLink.classList.add("hide");
}

function showBillForm() {
    maxLink.classList.add("hide");
    budgetLink.classList.add("hide");
    billLink.classList.remove("hide");
}

let sumbitBtn1 = document.getElementById("btn1")
sumbitBtn1.addEventListener('click', () => {
    console.log(1)
    console.log(panelId.value)
    let getRequest = new XMLHttpRequest();
    getRequest.open('GET', getForFullRoof.concat("panel_id=").concat(panelId.value).concat("&rails_id=").concat(panelId.value).concat("&height=").concat(height).concat("&width=").concat(width));
    getRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let response = JSON.parse(getRequest.responseText);
                console.log(response)
                fillPrices(response)
            } else {
                alert("Something went wrong :(")
            }
        }
    }
    getRequest.send();
})

let sumbitBtn2 = document.getElementById("btn2")
sumbitBtn2.addEventListener('click', () => {
    console.log(2)
    console.log(panelId.value)
    let price = document.getElementById("priceInput").value
    console.log(price)
    getDimensions()
    let getRequest = new XMLHttpRequest();
    getRequest.open('GET', getForPrice.concat("panel_id=").concat(panelId2.value).concat("&rails_id=").concat(panelId2.value).concat("&height=").concat(height).concat("&width=").concat(width).concat("&price=").concat(price));
    getRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let response = JSON.parse(getRequest.responseText);
                console.log(response)
                fillPrices2(response)
            } else {
                alert("Something went wrong :(")
            }
        }
    }
    getRequest.send();
})

let sumbitBtn3 = document.getElementById("btn3")
sumbitBtn3.addEventListener('click', () => {
    console.log(3)
    console.log(panelId2.value)
    let bill = document.getElementById("billInput").value
    console.log(bill)
    getDimensions()
    let getRequest = new XMLHttpRequest();
    getRequest.open('GET', getForBill.concat("panel_id=").concat(panelId3.value).concat("&rails_id=").concat(panelId3.value).concat("&bill=").concat(bill));
    getRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let response = JSON.parse(getRequest.responseText);
                console.log(response)
                fillPrices3(response)
            } else {
                alert("Something went wrong :(")
            }
        }
    }
    getRequest.send();
})


function fillPrices(response) {
    let price1panel = document.getElementById("price-1-panel");
    price1panel.innerText = response.panelPrice + " eur";

    let numOfPanels = document.getElementById("number-of-panels");
    numOfPanels.innerText = response.numOfPanels;

    let price1inverter = document.getElementById("price-1-inverter");
    price1inverter.innerText = response.inverterPrice + " eur";

    let numOfInverters = document.getElementById("number-of-inverters");
    numOfInverters.innerText = 1;

    let railsPrice = document.getElementById("rails-price");
    railsPrice.innerText = response.railsPrice + " eur";

    let montagePrice = document.getElementById("montage-price");
    montagePrice.innerText = response.montagePrice + " eur";

    let fee = response.panelPrice * response.numOfPanels + response.railsPrice + response.montagePrice + response.inverterPrice;
    let totalFee = document.getElementById("total-fee");
    totalFee.innerText = fee + " eur";
}

function fillPrices2(response) {
    let price1panel = document.getElementById("price-1-panel2");
    price1panel.innerText = response.panelPrice + " eur";

    let numOfPanels = document.getElementById("number-of-panels2");
    numOfPanels.innerText = response.numOfPanels;

    let price1inverter = document.getElementById("price-1-inverter2");
    price1inverter.innerText = response.inverterPrice + " eur";

    let numOfInverters = document.getElementById("number-of-inverters2");
    numOfInverters.innerText = 1;

    let railsPrice = document.getElementById("rails-price2");
    railsPrice.innerText = response.railsPrice + " eur";

    let montagePrice = document.getElementById("montage-price2");
    montagePrice.innerText = response.montagePrice + " eur";

    let fee = response.panelPrice * response.numOfPanels + response.railsPrice + response.montagePrice + response.inverterPrice;
    let totalFee = document.getElementById("total-fee2");
    totalFee.innerText = fee + " eur";
}

function fillPrices3(response) {
    let price1panel = document.getElementById("price-1-panel3");
    price1panel.innerText = response.panelPrice + " eur";

    let numOfPanels = document.getElementById("number-of-panels3");
    numOfPanels.innerText = response.numOfPanels;

    let price1inverter = document.getElementById("price-1-inverter3");
    price1inverter.innerText = response.inverterPrice + " eur";

    let numOfInverters = document.getElementById("number-of-inverters3");
    numOfInverters.innerText = 1;

    let railsPrice = document.getElementById("rails-price3");
    railsPrice.innerText = response.railsPrice + " eur";

    let montagePrice = document.getElementById("montage-price3");
    montagePrice.innerText = response.montagePrice + " eur";

    let fee = response.panelPrice * response.numOfPanels + response.railsPrice + response.montagePrice + response.inverterPrice;
    let totalFee = document.getElementById("total-fee3");
    totalFee.innerText = fee + " eur";
}



