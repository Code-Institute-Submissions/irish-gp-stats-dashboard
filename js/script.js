queue()
        .defer(d3.json, "data/gpdata.json")
        .await(makeGraphs);
        
    function makeGraphs(error, gpdata) {
        var ndx = crossfilter(gpdata);
    
        
        
        
        gender_data_pie(ndx);   
        by_province(ndx);
        by_county(ndx);
        
        
        dc.renderAll();
         }
        
        
        function gender_data_pie(ndx){
            var name_dim = ndx.dimension(dc.pluck('gender'));
            var home_goals = name_dim.group().reduceSum(dc.pluck('gpvisit'));
            
             dc.pieChart('#gender_data_pie')
                .height(330)
                .radius(90)
                .transitionDuration(1500)
                .dimension(name_dim)
                .group(home_goals)
                .legend(dc.legend());
                
            }
            
            
        
        function by_province(ndx){
            var name_dim = ndx.dimension(dc.pluck('province'));
            var home_goals = name_dim.group().reduceSum(dc.pluck('gpvisit'));
        
             dc.pieChart('#province_data_pie')
                .height(330)
                .radius(90)
                .transitionDuration(1500)
                .dimension(name_dim)
                .group(home_goals);
            }
        
        function by_county(ndx){
        var name_dim = ndx.dimension(dc.pluck('county'));
        var home_goals = name_dim.group().reduceSum(dc.pluck('gpvisit'));
        
        dc.barChart("#county_data_barchart")
            .width(500)
            .height(200)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(name_dim)
            .group(home_goals)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("County")
            .yAxis().ticks(6);
        }