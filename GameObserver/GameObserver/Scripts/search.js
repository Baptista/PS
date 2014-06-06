
window.onload = function() {

    document.getElementById("idsearch").onkeyup = function() {

        var valuesearch = document.getElementById("idsearch").value;
        console.log(valuesearch);

        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("searchresult").innerHTML="";
                var a = JSON.parse(xmlhttp.response);
                var results = "";
                var xdiv = document.createElement("div");
                a.forEach(function (entry) {

                    var xp = document.createElement("p");
                    var xinput = document.createElement("INPUT");
                    xinput.setAttribute("type", "submit");
                    xinput.setAttribute("id", entry.id);
                    xp.appendChild(xinput);
                    xdiv.appendChild(xp);

                    xinput.onclick = function(e) {
                        console.log(entry.Name);
                    };
                    //document.body.appendChild(x);

                    //results += entry.Name +
                    //    "<input type=submit id=idbuttonadd" + entry.id + ">Add</button>" + "<br>";


                });
                document.getElementById("searchresult").appendChild(xdiv);
                //document.getElementById("searchresult").innerHTML = results;


//var response = xmlhttp.responseXML;
                //var results = "";
                //if (nresults == "") nresults = 5;
                //for (var i = 0; i < nresults; ++i) {
                //    console.log(response.getElementsByTagName("name"));
                //    if (response.getElementsByTagName("name")[i] == null) break;
                //    results += response.getElementsByTagName("name")[i] + "<br>";
                //}
                //document.getElementById("searchresult").innerHTML = results;
            }
        }

        xmlhttp.open("GET", "/Team/Search?q=" + valuesearch, true);
        xmlhttp.send();
    };
    
};