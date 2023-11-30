// const apiUrl = 'https://my.api.mockaroo.com/car_data.json';
// const apiKey = '3cb2df80';

// const xhr = new XMLHttpRequest();
// xhr.open('GET', apiUrl, true);
// xhr.setRequestHeader('X-API-Key', apiKey);

// xhr.onload = function () {
//     if (xhr.status >= 200 && xhr.status < 300) {
//         const responseData = JSON.parse(xhr.responseText);
//         console.log(responseData);
//     } else {
//         console.error('Błąd żądania:', xhr.statusText);
//     }
// };

// xhr.onerror = function () {
//     console.error('Wystąpił błąd sieci.');
// };

// xhr.send();

// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//        // Typical action to be performed when the document is ready:
//        document.getElementById("demo").innerHTML = xhttp.responseText;
//     }
// };
// xhttp.open("GET", "filename", true);
// xhttp.send();

async function getData() {
    const records = await fetch('https://my.api.mockaroo.com/car_data.json?key=3cb2df80');
    const data = records.json();

    let tab='';
    data.car_data.forEach(function(car) {
        tab += `<tr>
            
        </tr>`
    })
}