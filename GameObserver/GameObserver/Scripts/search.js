
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

                    
                    var txt = document.createTextNode(entry.Name+"");
                    var xp = document.createElement("p");
                    xp.appendChild(txt);
                    var xinput = document.createElement("INPUT");
                    xinput.setAttribute("type", "submit");
                    xinput.setAttribute("id", entry.id);
                    xinput.setAttribute("value", "Add Player");
                    xp.appendChild(xinput);
                    xdiv.appendChild(xp);

                    xinput.onclick = function(e) {
                        console.log(entry.Name);

                        var xmlhttpreq = new XMLHttpRequest();
                        xmlhttpreq.onreadystatechange = function() {

                            if (xmlhttpreq.readyState == 4 && xmlhttpreq.status == 200) {

                                var zdiv = document.createElement("div");
                                zdiv.appendChild(document.createTextNode(entry.Name));
                                var imag = document.createElement("img");
                                imag.setAttribute('src', "../Photos/"+entry.Photo);
                                zdiv.appendChild(imag);
                                var xbutton = document.createElement("button");
                                xbutton.setAttribute('type', "button");
                                xbutton.setAttribute('id', entry.Id);
                                xbutton.appendChild(document.createTextNode("Remove"));
                                xbutton.onclick = function() {
                                    var xmlhttpr = new XMLHttpRequest();
                                    xmlhttpr.onreadystatechange = function() {

                                        if (xmlhttpr.readyState == 4 && xmlhttpr.status == 200) {
                                            document.getElementById("idplayersonteam").removeChild(zdiv);
                                        }
                                    };
                                    xmlhttpr.open("POST", "/Team/RemovePlayerOnTeam", true);
                                    xmlhttpr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                    xmlhttpr.send("idclub=" + idclub + "&idplayer=" + idplayer + "&date=" + date);

                                };
                                zdiv.appendChild(xbutton);

                                if (document.getElementById("idplayersonteam").firstChild) {
                                    var aux = document.getElementById("idplayersonteam").firstChild;
                                    document.getElementById("idplayersonteam").insertBefore(zdiv, aux);
                                }

                            } else {
                                console.log(xmlhttpreq.status);
                            }
                        };
                        var idclub = document.getElementById("ididclub").innerHTML;
                        var idplayer = entry.Id;
                        console.log(idplayer);
                        var date = document.getElementById("iddata").innerHTML;
                        var onfield = 0;
                        xmlhttpreq.open("POST", "/Team/InserirPlayerOnTeam", true);
                        xmlhttpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xmlhttpreq.send("idclub=" + idclub + "&idplayer=" + idplayer + "&date=" + date + "&onstarteam=" +onfield);

                    

                    //String idclub, String idplayer, String date, String onstarteam
                    };
                   
                });
                document.getElementById("searchresult").appendChild(xdiv);
            }
        }

        xmlhttp.open("GET", "/Team/Search?q=" + valuesearch, true);
        xmlhttp.send();
    };
    var formcol = document.getElementsByTagName("form");
    for (var i = 0; i < formcol.length; ++i) {
        formcol[i].onclick = function(eve) {
            eve.preventDefault();
            var parentt = eve.currentTarget.parentNode;
            var idplayer = eve.currentTarget[1].value;
            var idclub = eve.currentTarget[0].value;
            var dataeq = eve.currentTarget[2].value;
            

            var xmlhttpreq = new XMLHttpRequest();
            xmlhttpreq.onreadystatechange = function(evv) {

                if (xmlhttpreq.readyState == 4 && xmlhttpreq.status == 200) {
                    console.log(parentt);
                    document.getElementById("idplayersonteam").removeChild(parentt);

                }
            };
            
            xmlhttpreq.open("POST", "/Team/RemovePlayerOnTeam", true);
            xmlhttpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttpreq.send("idclub=" + idclub + "&idplayer=" + idplayer + "&date=" + dataeq);

        };
    }
    //var formCol = document.getElementsByTagName("input");
    //console.log(formCol);
    
    //for(var i=0 ; i<formCol.length;++i) {
    //    formCol[i].onclick = function (ev) {
    //        console.log(ev);
    //        document.getElementById("idplayersonteam").removeChild(document.getElementById("idplayersonteam").firstChild);
    //    };
    //};
};