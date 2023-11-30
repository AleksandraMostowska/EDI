// fetch("https://my.api.mockaroo.com/car_data.json?key=3cb2df80").then((data)=>{
//     return data.json();
// }).then((objectData)=>{
//     console.log(objectData)
// })


var xmlhttp = new XMLHttpRequest();
var url = "https://my.api.mockaroo.com/car_data.json?key=3cb2df80";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        
        $('#example').DataTable({
            "data": data, 
            "columns": [
                {"data": "car_make"},
                {"data": "car_model"},
                {"data": "year"},
                {"data": "VIN"},
                {"data": "mileage_in_miles"},
                {"data": "body_color"},
                {"data": "body_type"},
                {"data": "fuel_type"},
                {"data": "engine_size"},
                {"data": "engine_power"},
                {"data": "transmission"},
                {"data": "condition"},
                {
                    "data": "features",
                    "render": function(data, type, row) {
                        // Wyświetl features[3-6]
                        return data.slice(1, 4).join(", ");
                    }
                }
            ]
        });
    }
};


// var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       document.getElementById("demo").innerHTML =
//       this.responseText;
//     }
//   };
//   xhttp.open("GET", "xmlhttp_info.txt", true);
//   xhttp.send();