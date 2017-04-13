google.charts.load('current', {'packages':['corechart']});
   //   google.charts.setOnLoadCallback(drawChart);
	function drawChart(options, dataPoints,location) {
		var chart = new google.visualization.LineChart(document.getElementById(String(location)));
        	var data = google.visualization.arrayToDataTable(dataPoints);

        	var chart = new google.visualization.LineChart(document.getElementById(String(location)));

       		chart.draw(data, options);
      }
/*
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Date', 'Sales'],
          [new Date(1489698000000),  1000],
          [new Date(1489699000000),  1170],
          [new Date(1489700000000),  660],
          [new Date(1409701000000),  1030]
        ]);

        var options = {
          title: 'kW Power',
          curveType: 'function',
          legend: { position: 'bottom' }
        };
*/
