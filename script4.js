var engineSizeLabels = [];
var engineSizeData = [];
var engineSizeColors = [];

var xmlhttp = new XMLHttpRequest();
var url = "https://my.api.mockaroo.com/car_data.json?key=3cb2df80";
xmlhttp.open("GET", url, true);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        
        // Przetwarzanie danych z API tylko dla wielkości silnika
        var engineSizeCount = {};

        data.forEach(function(car) {
            var engineSize = car.engine_size;
            if (engineSizeCount[engineSize]) {
                engineSizeCount[engineSize]++;
            } else {
                engineSizeCount[engineSize] = 1;
            }
        });

        var colors = ["rgb(42, 53, 70)", "rgb(75, 92, 119)", "rgb(116, 134, 165)", "rgb(138, 154, 177)", "rgb(203, 213, 222)", "white"];
        var colorIdx = 0;

        // Konwertowanie obiektu liczników na tablice engineSizeLabels i engineSizeData
        for (var engSize in engineSizeCount) {
            engineSizeLabels.push(engSize);
            engineSizeData.push(engineSizeCount[engSize]);
            engineSizeColors.push(colors[colorIdx % colors.length])
            colorIdx++;
        }

        // Aktualizacja danych na wykresie polarArea tylko dla wielkości silnika
        updatePolarAreaChart();
    }
}

function updatePolarAreaChart() {
    // Tworzenie nowego obiektu wykresu Chart.js
    new Chart("mySecondChart", {
        // Ustawienie typu wykresu na 'polarArea'
        type: 'polarArea',

        // Dane wykresu
        data: {
            // Etykiety (wielkości silnika)
            labels: engineSizeLabels,
            
            // Zbiór danych
            datasets: [
                {
                    // Etykieta zbioru danych wyświetlana w legendzie
                    label: 'Number of cars with specific engine size.',
                    
                    // Dane liczbowe odpowiadające wielkościom silników
                    data: engineSizeData,
                    
                    // Kolory obszarów wykresu odpowiadające różnym etykietom
                    backgroundColor: engineSizeColors,
                }
            ]
        },

        // Opcje konfiguracyjne wykresu
        options: {
            // Właściwość responsive sprawia, że wykres dostosowuje się do rozmiaru kontenera
            responsive: true,

            // Pluginy dodatkowe, takie jak legenda i tytuł
            plugins: {
                // Konfiguracja legendy
                legend: {
                    // Ustawienie pozycji legendy na górze
                    position: 'top',
                },
                // Konfiguracja tytułu
                title: {
                    // Wyświetlanie tytułu
                    display: true,
                    
                    // Tekst tytułu
                    text: 'Number of cars with specific engine size.',

                }
            }
        },
    });
}
