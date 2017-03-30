        $(document).ready(function() {
            $("#reset").click(function() {
                $("#energy").html(0);
                $("#carbohydrate").html(0);
                $("#protein").html(0);
                $("#fat").html(0);
                $("#fiber").html(0);
                $("#fiber").html(0);
                $("#email_address").val("input email here...");
            });
        });

        $(document).ready(function() {
            $("#send_email").click(function() {
                if ($("#email_address").val() != "input email here..." && $("#email_address").val() != "") {
                    alert("The Report has sent to email: " + $("#email_address").val());
                }
            });
        });

        $(document).ready(function() {
            $("#calculate").click(function() {
                // lookup data via: https://api.nal.usda.gov/ndb/V2/reports?api_key=DEMO_KEY&type=b&ndbno=43135
                //alert("start to get data..."); // use for debug
                var params = {
                    "api_key": "JHfD4jyxASK9Us4vyNc7sCXTODP4NbsBMe9nU2W9", //"DEMO_KEY",
                    "type": "b",
                    "ndbno": $("#food_name").val() //"43135"
                };
                $.ajax({
                    type: 'GET',
                    url: 'https://api.nal.usda.gov/ndb/V2/reports',
                    data: params,
                    dataType: 'json',
                    //async: true,
                    success: function(data) {
                        //alert("POSTED SUCCESSFULLY TO THE SERVER"); // use for debug
                        //alert("Data: " + JSON.stringify(data));
                        $.each(data.foods[0].food.nutrients, parse_nutrient_data);
                    }, // Success Function
                    error: function(error) {
                        //alert(JSON.stringify(error)); // use for debug
                    } // error handler
                }); // Ajax Call
            });
        });

        function parse_nutrient_data(index, nutrient_data) {
            // alert(JSON.stringify(nutrient_data)); // used for debug
            weight = Number($("#food_value").val()) * 0.01; // value per 100g
            if (nutrient_data["name"] == "Energy") {
                origin = Number($("#energy").html());
                add = Number(nutrient_data["value"]);
                result = origin + add * weight;
                $("#energy").html(result.toFixed(2));
            }
            if (nutrient_data["name"] == "Carbohydrate, by difference") {
                origin = Number($("#carbohydrate").html());
                add = Number(nutrient_data["value"]);
                result = origin + add * weight;
                $("#carbohydrate").html(result.toFixed(2));
            }
            if (nutrient_data["name"] == "Protein") {
                origin = Number($("#protein").html());
                add = Number(nutrient_data["value"]);
                result = origin + add * weight;
                $("#protein").html(result.toFixed(2));
            }
            if (nutrient_data["name"] == "Total lipid (fat)") {
                origin = Number($("#fat").html());
                add = Number(nutrient_data["value"]);
                result = origin + add * weight;
                $("#fat").html(result.toFixed(2));
            }
            if (nutrient_data["name"] == "Fiber, total dietary") {
                origin = Number($("#fiber").html());
                add = Number(nutrient_data["value"]);
                result = origin + add * weight;
                $("#fiber").html(result.toFixed(2));
            }
        }
