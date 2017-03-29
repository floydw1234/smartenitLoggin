function makeChart(data, options, renderAt){
        FusionCharts.ready(function() {


            var Chart = new FusionCharts({
                "type": "column2d",
                "renderAt": renderAt,
                "width": "1000",
                "height": "500",
                "dataFormat": "json",
                "dataSource": {
                    "chart": options,
                    "data": data
                }
            });
            Chart.render();
        });
}

