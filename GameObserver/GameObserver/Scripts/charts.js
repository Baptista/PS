(function(window, document, undefined) {


    window.onload = function() {
        // Load the Visualization API and the piechart package.
        google.load('visualization', '1.0', { 'packages': ['corechart'], callback: drawChart});

        // Set a callback to run when the Google Visualization API is loaded.
        google.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChart() {
            //var mainarr = [];
            //var xmlhttp = new XMLHttpRequest();

            //xmlhttp.onreadystatechange = function() {

            //    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //        var resp2 = JSON.parse(xmlhttp.response);
            //        resp2.forEach(function(entry) {
            //            var objarr = [];
            //            var xmlhttp1 = new XMLHttpRequest();
            //            xmlhttp1.onreadystatechange = function() {

            //                if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
            //                    var resp3 = JSON.parse(xmlhttp1.response);

            //                }
            //            };
            //            xmlhttp1.open("GET", "/SetUp/GetOpinionByEvent?idstadium=" + idstadium + "&datahora=" + datahora + "&datavisitor=" + dataequipav + "&idvisitor=" + idequipav +
            //                    "&dataagainst=" + dataequipag + "&idagainst=" + idequipag + "&iduser=" + document.getElementById("curruserid").innerHTML.trim() + "&idevent=" + entry.Id + "&negative=yes");
            //            xmlhttp1.send();
            //        });
            //    }
            //};

            //xmlhttp.open("GET", "/SetUp/GetEvents", true);
            //xmlhttp.send();
           // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Topping');
            data.addColumn('number', 'Slices');
            data.addRows([
                ['Mushrooms', 3],
                ['Onions', 1]
                //['Olives', 1],
                //['Zucchini', 1],
                //['Pepperoni', 2]
            ]);

            // Set chart options
            var options = {
                //'title': 'How Much Pizza I Ate Last Night',
                'width': window.screen.availWidth / 4,
                'height': window.screen.availHeight / 4
            };

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        }
    };
})(window, window.document);

