const result = document.getElementById('result');
const error = document.getElementById('error');
const amount = document.getElementById('amount');
const button = document.getElementById('button');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');

async function countries() {
try{
	const response = fetch('https://api.restcountries.com/countries/v5?response_fields=names.common,flag.emoji,currencies',{ headers: { 'Authorization': 'Bearer rc_live_c44d93ca98cb40cf9745dba6499e2677' } });
	 const responseResult = await response.json();
         responseResult.forEach(function(country) {
            if (country.currencies) {
                for (let code in country.currencies) {
                    let option1 = document.createElement("option");
                    option1.value = code;
                    option1.textContent = country.flag+" "+code+" - "+ country.name.common;
                    fromCurrency.appendChild(option1);

                    let option2 = document.createElement("option");
                    option2.value = code;
                    option2.textContent =country.flag +" "+ code + " - "+country.name.common;
                    toCurrency.appendChild(option2);
                }
            }
	    });
    }
catch(err){
	error.textContent = "Cannot load currencies"
}
}
countries();


