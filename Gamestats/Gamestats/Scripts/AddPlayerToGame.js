



window.onload = function() {

    var a = document.getElementById("svgobject");
    var svg = a.contentDocument;

    var hometeam = document.getElementById("idhometeam").innerHTML;
    var awayteam = document.getElementById("idawayteam").innerHTML;
    var xmlns = "http://www.w3.org/2000/svg";

    function inserirnameteams(name ,xpos ,ypos) {
        
        var txtElem = document.createElementNS(xmlns, "text");

        txtElem.setAttributeNS(null, "x", xpos);
        txtElem.setAttributeNS(null, "y", ypos);
        txtElem.setAttributeNS(null, "font-size", 15);

        var helloTxt = document.createTextNode(name);
        txtElem.appendChild(helloTxt);

        svg.getElementById("all").appendChild(txtElem);
    }

    inserirnameteams(hometeam, 50, 50);
    inserirnameteams(awayteam, 800, 50);
    

    svg.getElementById("HF").onclick = function() {
        
        console.log("Enter mouse");
        
        var submenu = new Array();

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                console.log(xmlhttp.responseText);

                var obj = eval("(" + xmlhttp.responseText + ")");


                for (var i = 0; i < obj.length; ++i) {
                    submenu[i] = obj[i].Name;
                }

                

            }
        };
        var aux = "HF";
        
        xmlhttp.open("POST", "/GameSetUp/GetPlayers", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("club=" + hometeam.trim() + "&position=" + aux.substring(1, aux.length).toLowerCase());

    }

}
