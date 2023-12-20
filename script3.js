var xValues = [];
var yValues = [];
var barColors = [];
var delayed;

var xmlhttp = new XMLHttpRequest();
var url = "https://my.api.mockaroo.com/car_data.json?key=3cb2df80";
xmlhttp.open("GET", url, true);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        
        // Przetwarzanie danych z API
        var brandCounts = {}; // Obiekt do przechowywania liczników marek

        data.forEach(function(car) {
            var brand = car.car_make; // Używamy atrybutu 'car_make' jako marki samochodu
            if (brandCounts[brand]) {
                brandCounts[brand]++;
            } else {
                brandCounts[brand] = 1;
            }
        });

        var colors = ["rgb(42, 53, 70)", "rgb(75, 92, 119)", "rgb(116, 134, 165)", "rgb(138, 154, 177)", "rgb(203, 213, 222)", "white"];
        var colorIdx = 0;

        // Konwertowanie obiektu liczników na tablice xValues i yValues
        for (var brand in brandCounts) {
            xValues.push(brand);
            yValues.push(brandCounts[brand]);
            barColors.push(colors[colorIdx % colors.length])
            colorIdx++;
        }

        // Aktualizacja danych na wykresie
        updateChartDelayed();
    }
}

function updateChartDelayed() {
    new Chart("myChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                label: 'Number of cars of specific mark.',
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: "Liczba samochodów według marek"
            },
            animation: {
                onComplete: () => {
                    delayed = true;
                },
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                        delay = context.dataIndex * 300 + context.datasetIndex * 100;
                    }
                    return delay;
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "rgb(41, 44, 47)",
                    },
                    // stacked: true,
                },
                y: {
                    ticks: {
                        color: "rgb(41, 44, 47)",
                    },
                    // stacked: true
                }
            }
        }
    });
}