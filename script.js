let result = document.getElementById("result");
let error = document.getElementById("error");
let amount = document.getElementById("amount");
let button = document.getElementById("button");

let fromCurrency = document.getElementById("fromCurrency");
let toCurrency = document.getElementById("toCurrency");
let fromFlag = document.getElementById("fromFlag");
let toFlag = document.getElementById("toFlag");

let countriesKey = "rc_live_c44d93ca98cb40cf9745dba6499e2677";
let flags = {};
 
function addOption(select, code, name) {
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === code) {
            return;
        }
    }
    let option = new Option(code + " - " + name, code);
    select.add(option);
}
 
fromCurrency.addEventListener("change", function () {
    if (flags[fromCurrency.value]) {
        fromFlag.src = flags[fromCurrency.value];
    }
});
 
toCurrency.addEventListener("change", function () {
    if (flags[toCurrency.value]) {
        toFlag.src = flags[toCurrency.value];
    }
});


async function loadCurrencies() {
    try {
        let response = await fetch("https://api.restcountries.com/countries/v5?response_fields=currencies,flag.url_png&limit=100",{ headers: { Authorization: "Bearer " + countriesKey } });
        let responseResult = await response.json();
        for (let country of responseResult.data.objects) {
            for (let c of country.currencies) {
                if (!flags[c.code]) {
                    flags[c.code] = country.flag.url_png;
                }
                addOption(fromCurrency, c.code, c.name);
                addOption(toCurrency, c.code, c.name);
            }
        }

    } catch (err) {
        console.log(err);
        error.textContent = "Cannot load currencies";
    }
}

loadCurrencies();

async function convert() {
    result.textContent = "";
    error.textContent = "";

    if (amount.value === "" || isNaN(amount.value) || amount.value <= 0) {
        error.textContent = "Please enter a valid amount.";
        return;
    }

    try {
        let response = await fetch("https://v6.exchangerate-api.com/v6/038d497c7e08ba0b7ba11e68/pair/" + fromCurrency.value + "/" + toCurrency.value + "/" + amount.value);
        let data = await response.json();

        if (data.result === "success") {
            result.textContent = amount.value + " " + fromCurrency.value + " = " + data.conversion_result + " " + toCurrency.value;
        } else {
            error.textContent = "An error occurred, please try again later.";
        }

    } catch (err) {
        console.log(err);
        error.textContent = "An error occurred, please try again later.";
    }
}
button.addEventListener("click", convert);