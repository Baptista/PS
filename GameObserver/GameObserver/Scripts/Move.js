
(function (window, document) {


    window.onload = function () {

        var savepositions;
        var movey = 0;
        var SVGDocument = null;
        var SVGRoot = null;
        var TrueCoords = null;
        var GrabPoint = null;
        var BackDrop = null;
        var DragTarget = null;
        var formation;
        var defense;
        var middle;
        var striker;
        var aformation;
        var adefense;
        var amiddle;
        var astriker;
        var allpostions;
        var gk;
        var aallpostions;
        var agk;
        var middledefensey;
        var middledefensex;
        var middlex;
        var middley;
        var middlestrikery;
        var middlestrikerx;
        var middlegkx;
        var middlegky;
        var amiddledefensey;
        var amiddledefensex;
        var amiddlex;
        var amiddley;
        var amiddlestrikery;
        var amiddlestrikerx;
        var amiddlegkx;
        var amiddlegky;

        var movedowndefense = 0;

        var ndefensehome = 1;
        var nmiddlehome = 1;
        var nstrikerhome = 1;
        var nadefensehome = 1;
        var namiddlehome = 1;
        var nastrikerhome = 1;


        var ndefesefull;
        var nmiddlefull;
        var nstrikerfull;
        var ngkfull;
        var andefesefull;
        var anmiddlefull;
        var anstrikerfull;
        var angkfull;

        var whereplayeres = [];
        var allplayershome = [];
        var playersnotplaying = [];
        var saveplayer = {};

        var arropinions = [];

        var nsubst = 0;
        var datestartmatch = null;


        var idequipav = document.getElementById("iddetailssetup_idvisitor").innerHTML.trim();
        var dataequipav = document.getElementById("iddetailssetup_datevisitor").innerHTML.trim();
        var idequipag = document.getElementById("iddetailssetup_idagainst").innerHTML.trim();
        var dataequipag = document.getElementById("iddetailssetup_dateagainst").innerHTML.trim();
        var idstadium = document.getElementById("iddetailssetup_idstadium").innerHTML.trim();
        var datahora = document.getElementById("iddetailssetup_date").innerHTML.trim();
        var isAuth = document.getElementById("havecurruser").innerHTML.trim();
        var idformationhome = null;
        var idformationaway = null;



        var a = document.getElementById("svgobject");
        var svg = null;
        var svgheight = null;
        var svgwidth = null;

        var avheight = window.innerHeight / 1.5;
        var avwidth = window.innerWidth / 1.5;

        a.setAttributeNS(null, 'height', avheight);
        a.setAttributeNS(null, 'width', avwidth);

        svg = a.contentDocument;
        a.setAttributeNS(null, 'height', avheight);
        a.setAttributeNS(null, 'width', avwidth);

        svgheight = a.getBoundingClientRect().height;

        svgwidth = a.getBoundingClientRect().width;

        SVGDocument = svg;
        SVGRoot = SVGDocument.documentElement;

        var yfield = svg.getElementById("field").getBoundingClientRect().height;
        movey = svg.getElementById("uprect").getBoundingClientRect().height / 2;

        inserirnameclubs(null, "Tempo", "48%", "6%");

        function timernow(dat) {

            var d = new Date();

            return new Date(d - dat).toTimeString().substring(0, 8);

        }

        var txtElem = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txtElem.setAttributeNS(null, "x", "48%");
        txtElem.setAttributeNS(null, "y", "12%");
        txtElem.setAttributeNS(null, "font-size", avwidth / 50 + "px");
        txtElem.setAttributeNS(null, 'id', "timer");
        var helloTxt = document.createTextNode("00:00:00");
        txtElem.appendChild(helloTxt);
        svg.getElementById("all").appendChild(txtElem);

        var mytimer = null;
        var lasttime = null;
        function starttime(dat) {
            mytimer = setInterval(function () {
                var oldtimer = svg.getElementById("timer");

                oldtimer.innerHTML = lasttime = timernow(dat);

            }, 1000);
        }

        var xmlhttp3 = new XMLHttpRequest();

        xmlhttp3.onreadystatechange = function () {

            if (xmlhttp3.readyState == 4 && xmlhttp3.status == 200) {
                var resp = JSON.parse(xmlhttp3.response);
                idformationhome = resp.Id;

                formation = resp.Designation.split('x');
                defense = formation[0];
                middle = formation[1];
                striker = formation[2];
                gk = 1;
                allpostions = defense + middle + striker;
                ndefesefull = defense;
                nmiddlefull = middle;
                nstrikerfull = striker;
                ngkfull = 1;

                middledefensey = (yfield / (parseInt(defense) + 1));// + movey;
                middledefensex = (((svgwidth) / 4) / 2);

                middlex = (svgwidth / 4);
                middley = (yfield / (parseInt(middle) + 1));
                middlestrikery = (yfield / (parseInt(striker) + 1));
                middlestrikerx = ((svgwidth / 4) + (middledefensex));

                middlegkx = 0;
                middlegky = (yfield / (parseInt(gk) + 1));


            }
        };

        var idq = document.getElementById("iddetailssetup_idvisitor").innerHTML;
        var dataq = document.getElementById("iddetailssetup_datevisitor").innerHTML;
        xmlhttp3.open("GET", "/SetUp/GetFormation?id=" + idq + "&dateq=" + dataq, true);
        xmlhttp3.send();



        var xmlhttp7 = new XMLHttpRequest();

        xmlhttp7.onreadystatechange = function () {

            if (xmlhttp7.readyState == 4 && xmlhttp7.status == 200) {
                var resp = JSON.parse(xmlhttp7.response);
                idformationaway = resp.Id;

                aformation = resp.Designation.split('x');
                adefense = parseInt(aformation[0]);
                amiddle = parseInt(aformation[1]);
                astriker = parseInt(aformation[2]);
                agk = 1;
                aallpostions = adefense + amiddle + astriker;

                andefesefull = adefense;
                anmiddlefull = amiddle;
                anstrikerfull = astriker;
                angkfull = 1;


                amiddledefensey = (yfield / (parseInt(adefense) + 1));

                amiddledefensex = svgwidth - (((svgwidth / 4) / 2)) - (svgwidth / 10);

                amiddlex = (svgwidth - ((svgwidth / 4))) - (svgwidth / 10);

                amiddley = (yfield / (parseInt(amiddle) + 1));

                amiddlestrikery = (yfield / (parseInt(astriker) + 1));
                amiddlestrikerx = (svgwidth - ((svgwidth / 4) + (svgwidth - amiddledefensex)));

                amiddlegkx = svgwidth - (svgwidth / 13);
                amiddlegky = (yfield / (parseInt(agk) + 1));
            }
        };
        var aidq = document.getElementById("iddetailssetup_idagainst").innerHTML;
        var adataq = document.getElementById("iddetailssetup_dateagainst").innerHTML;
        xmlhttp7.open("GET", "/SetUp/GetFormation?id=" + aidq + "&dateq=" + adataq, true);
        xmlhttp7.send();


        function inserirsymbolclubs(photo, posx, posy) {
            var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            svgimg.setAttributeNS(null, 'height', avheight / 9);
            svgimg.setAttributeNS(null, 'width', avwidth / 20);

            svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', "../fonts/" + photo);
            svgimg.setAttributeNS(null, 'x', posx);
            svgimg.setAttributeNS(null, 'y', posy);
            svgimg.setAttributeNS(null, 'visibility', 'visible');
            svg.getElementById("all").appendChild(svgimg);

        }

        inserirsymbolclubs(document.getElementById("idclubvisitorphoto").innerHTML.trim(), "1%", "1%");
        inserirsymbolclubs(document.getElementById("idclubagainstphoto").innerHTML.trim(), "93%", "1%");

        function inserirnameclubs(id, name, xpos, ypos) {

            txtElem = document.createElementNS("http://www.w3.org/2000/svg", "text");

            txtElem.setAttributeNS(null, "x", xpos);
            txtElem.setAttributeNS(null, "y", ypos);
            txtElem.setAttributeNS(null, "font-size", avwidth / 8 + "%");
            txtElem.setAttributeNS(null, 'id', id);
            var helloTxt = document.createTextNode(name);
            txtElem.appendChild(helloTxt);

            svg.getElementById("all").appendChild(txtElem);
        }

        inserirnameclubs(null, document.getElementById("idnameclubvisitor").innerHTML.trim(), "18%", "8%");
        inserirnameclubs(null, document.getElementById("idnameclubagainst").innerHTML.trim(), "75%", "8%");

        var ref1 = document.getElementById("idref1").innerHTML.trim();
        var ref2 = document.getElementById("idref2").innerHTML.trim();
        var ref3 = document.getElementById("idref3").innerHTML.trim();
        var ref4 = document.getElementById("idref4").innerHTML.trim();

        referees(ref1, "45%", "41%");
        referees(ref2, "45%", "15%");
        referees(ref3, "45%", "72%");
        referees(ref4, "45%", "87%");


        function referees(referee, x, y) {
            var xmlhttp9 = new XMLHttpRequest();

            xmlhttp9.onreadystatechange = function () {

                if (xmlhttp9.readyState == 4 && xmlhttp9.status == 200) {
                    var resp = JSON.parse(xmlhttp9.response);
                    PhotoonSvg(resp.Id, resp.Photo, x, y);
                }
            };
            xmlhttp9.open("GET", "/SetUp/GetReferee?id=" + referee, true);
            xmlhttp9.send();
        }

        var counthome = 0;
        function allfinishome(all) {
            ++counthome;


            if (counthome == all) {

                if (nplayershomeplaying < 7) {
                    window.location = "/Team/Index";
                }
                allfinish();

            }
        }
        var countaway = 0;
        function allfinisaway(all) {
            ++countaway;
            console.log("coisas", all);
            console.log("coisas2", countaway);
            if (countaway == all) {
                if (nplayersawayplaying < 7) {
                    window.location = "/Team/Index";
                }
                allfinish();
                
            }
        }

        var count = 0;
        function allfinish() {
            count++;
            
            if (count == 2) {
                FillTimeLine();
                
            }
        }





        loadpostions();
        loadpostions2();



        var nplayershomeplaying = 0;

        function loadpostions() {


            var x = "0%";

            var y = "88%";

            var xmlhttp5 = new XMLHttpRequest();

            xmlhttp5.onreadystatechange = function () {

                if (xmlhttp5.readyState == 4 && xmlhttp5.status == 200) {
                    var resp = JSON.parse(xmlhttp5.response);


                    var totalplayers = resp.length;
                    resp.forEach(function (entry) {

                        var xmlhttp8 = new XMLHttpRequest();
                        var img = null;
                        xmlhttp8.onreadystatechange = function () {

                            if (xmlhttp8.readyState == 4 && xmlhttp8.status == 200) {

                                var resp2 = JSON.parse(xmlhttp8.response);

                                var xmlhttp1 = new XMLHttpRequest();

                                xmlhttp1.onreadystatechange = function () {

                                    if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                                        var resp3 = JSON.parse(xmlhttp1.response);

                                        if (resp3.Designation == 'Defesa') {
                                            if (ndefesefull == 0) {
                                                img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                                x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";
                                                playersnotplaying[playersnotplaying.length] = img;
                                            } else {
                                                img = PhotoonSvg(resp2.Id, resp2.Photo, middledefensex, middledefensey * ndefensehome + movey);

                                                --ndefesefull;
                                                ++ndefensehome;
                                                allplayershome[allplayershome.length] = img;
                                            }

                                        } else if (resp3.Designation == 'Medio') {

                                            if (nmiddlefull == 0) {
                                                img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                                x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";
                                                playersnotplaying[playersnotplaying.length] = img;
                                            } else {

                                                img = PhotoonSvg(resp2.Id, resp2.Photo, middlex, middley * nmiddlehome + movey);
                                                ++nmiddlehome;
                                                --nmiddlefull;
                                                allplayershome[allplayershome.length] = img;

                                            }
                                        } else if (resp3.Designation == 'Ataque') {
                                            if (nstrikerfull == 0) {
                                                img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                                x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";

                                                playersnotplaying[playersnotplaying.length] = img;
                                            } else {
                                                img = PhotoonSvg(resp2.Id, resp2.Photo, middlestrikerx, middlestrikery * nstrikerhome + movey);
                                                ++nstrikerhome;
                                                --nstrikerfull;
                                                allplayershome[allplayershome.length] = img;

                                            }
                                        } else {
                                            if (ngkfull == 0) {
                                                img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                                x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";

                                                playersnotplaying[playersnotplaying.length] = img;

                                            } else {
                                                img = PhotoonSvg(resp2.Id, resp2.Photo, middlegkx, middlegky + movey);
                                                --ngkfull;
                                                allplayershome[allplayershome.length] = img;
                                            }
                                        }
                                        allfinishome(totalplayers);

                                    }
                                }
                                if (entry.IdPosition == 0) {
                                    img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                    x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";

                                    playersnotplaying[playersnotplaying.length] = img;
                                    allfinishome(totalplayers);
                                } else {

                                    nplayershomeplaying++;
                                    xmlhttp1.open("GET", "/SetUp/GetPosition?id=" + entry.IdPosition, true);
                                    xmlhttp1.send();
                                }
                            }

                        };
                        xmlhttp8.open("GET", "/SetUp/GetPlayer?id=" + entry.IdPlayer, true);
                        xmlhttp8.send();


                    });
                }
            };
            var idq = document.getElementById("iddetailssetup_idvisitor").innerHTML;
            var dataq = document.getElementById("iddetailssetup_datevisitor").innerHTML;
            xmlhttp5.open("GET", "/SetUp/GetPlayersByTeam?date=" + dataq + "&idclub=" + idq, true);
            xmlhttp5.send();
        }


        var nplayersawayplaying = 0;
        function loadpostions2() {

            var x = "55%";
            var y = "88%";

            var xmlhttp4 = new XMLHttpRequest();

            xmlhttp4.onreadystatechange = function () {

                if (xmlhttp4.readyState == 4 && xmlhttp4.status == 200) {
                    var resp = JSON.parse(xmlhttp4.response);
                    var totalplayers = resp.length;
                    resp.forEach(function (entry) {


                        var xmlhttp8 = new XMLHttpRequest();
                        var img = null;
                        xmlhttp8.onreadystatechange = function () {

                            if (xmlhttp8.readyState == 4 && xmlhttp8.status == 200) {

                                var resp2 = JSON.parse(xmlhttp8.response);

                                var xmlhttp1 = new XMLHttpRequest();

                                xmlhttp1.onreadystatechange = function () {

                                    if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                                        var resp3 = JSON.parse(xmlhttp1.response);


                                        if (resp3.Designation == 'Defesa') {
                                            if (andefesefull == 0) {
                                                img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                                x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";

                                                playersnotplaying[playersnotplaying.length] = img;
                                            } else {
                                                img = PhotoonSvg(resp2.Id, resp2.Photo, amiddledefensex, amiddledefensey * nadefensehome + movey);

                                                --andefesefull;
                                                ++nadefensehome;
                                                allplayershome[allplayershome.length] = img;
                                            }

                                        } else if (resp3.Designation == 'Medio') {

                                            if (anmiddlefull == 0) {
                                                img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                                x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";

                                                playersnotplaying[playersnotplaying.length] = img;
                                            } else {
                                                img = PhotoonSvg(resp2.Id, resp2.Photo, amiddlex, amiddley * namiddlehome + movey);
                                                ++namiddlehome;
                                                --anmiddlefull;
                                                allplayershome[allplayershome.length] = img;
                                            }
                                        } else if (resp3.Designation == 'Ataque') {
                                            if (anstrikerfull == 0) {
                                                img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                                x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";

                                                playersnotplaying[playersnotplaying.length] = img;
                                            } else {
                                                img = PhotoonSvg(resp2.Id, resp2.Photo, amiddlestrikerx, amiddlestrikery * nastrikerhome + movey);
                                                ++nastrikerhome;
                                                --anstrikerfull;
                                                allplayershome[allplayershome.length] = img;
                                            }
                                        } else {
                                            if (angkfull == 0) {
                                                img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                                x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";

                                                playersnotplaying[playersnotplaying.length] = img;
                                            } else {
                                                img = PhotoonSvg(resp2.Id, resp2.Photo, amiddlegkx, amiddlegky + movey);
                                                --angkfull;
                                                allplayershome[allplayershome.length] = img;
                                            }
                                        }
                                        allfinisaway(totalplayers);

                                    }
                                }
                                if (entry.IdPosition == 0) {
                                    img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                    x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";

                                    playersnotplaying[playersnotplaying.length] = img;
                                    allfinisaway(totalplayers);
                                } else {
                                    nplayersawayplaying++;
                                    xmlhttp1.open("GET", "/SetUp/GetPosition?id=" + entry.IdPosition, true);
                                    xmlhttp1.send();
                                }
                            }
                        };
                        xmlhttp8.open("GET", "/SetUp/GetPlayer?id=" + entry.IdPlayer, true);
                        xmlhttp8.send();

                    });
                }
            };
            var aidq = document.getElementById("iddetailssetup_idagainst").innerHTML;
            var adataq = document.getElementById("iddetailssetup_dateagainst").innerHTML;

            xmlhttp4.open("GET", "/SetUp/GetPlayersByTeam?date=" + adataq + "&idclub=" + aidq, true);
            xmlhttp4.send();
        }


        svg.oncontextmenu = function (ev) {
            ev.preventDefault();
            return false;
        }

        var xposdetails = "40%";
        var yposdetails = "10%";

        function IsOccupied(save, wherepla) {
            for (var i = 0; i < wherepla.length; ++i) {
                if (wherepla[i].getAttributeNS(null, 'x') == save.x && wherepla[i].getAttributeNS(null, 'y') == save.y) {
                    return true;
                }
            }
            return false;
        }


        function nextposition(mx, my, formati) {
            savepositions = new Object();

            savepositions.x = mx;
            savepositions.y = (my + movedowndefense);
            movedowndefense += (svgheight / formati) / 2;

            if (IsOccupied(savepositions, whereplayeres)) {
                return nextposition(mx, my, formati);
            }
            return savepositions;
        }


        var showdetails = [];

        function removedetails() {
            for (var i = 0; i < showdetails.length; ++i) {
                
                svg.getElementById("all").removeChild(showdetails[i]);
            }
            showdetails = [];
        }



        
        function createcircles(idp, ide, x, y) {

            var lastcircle = null;
            var circles = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circles.setAttribute("cx", x);
            circles.setAttribute("cy", y);
            circles.setAttribute("fill", "#ffffff");
            circles.setAttribute("stroke", "#000000");
            circles.setAttribute("r", "1%");
            circles.setAttribute("id", "circ" + y);
            showdetails[showdetails.length] = circles;
            circles.onclick = function () {

                if (lastcircle != null) {

                    svg.getElementById("all").removeChild(lastcircle);
                    removeElemFromArray(showdetails, lastcircle);

                    lastcircle = null;
                }


                var circlesinside = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circlesinside.setAttribute("cx", (circles.getAttributeNS(null, 'cx')));
                circlesinside.setAttribute("cy", (circles.getAttributeNS(null, 'cy')));
                circlesinside.setAttribute("fill", "#000000");
                circlesinside.setAttribute("stroke", "#000000");
                circlesinside.setAttribute("r", "0.8%");
                circlesinside.setAttribute("id", "circcc");
                svg.getElementById("all").appendChild(circlesinside);


                lastcircle = circlesinside;


                showdetails[showdetails.length] = circlesinside;

                saveplayer.event = ide;
                saveplayer.idplayer = idp;
                var xmlhttp8 = new XMLHttpRequest();

                xmlhttp8.onreadystatechange = function () {

                    if (xmlhttp8.readyState == 4 && xmlhttp8.status == 200) {
                        var resp = JSON.parse(xmlhttp8.response);

                        if (resp) {
                            var rectexecutor = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                            rectexecutor.setAttributeNS(null, 'height', '80%');
                            rectexecutor.setAttributeNS(null, 'width', '20%');
                            rectexecutor.setAttributeNS(null, 'id', '0');
                            rectexecutor.setAttributeNS(null, 'style', 'fill:green;stroke:white');
                            rectexecutor.setAttributeNS(null, 'x', parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 20 + "%");
                            rectexecutor.setAttributeNS(null, 'y', yposdetails);
                            rectexecutor.setAttributeNS(null, 'visibility', 'visible');
                            svg.getElementById("all").appendChild(rectexecutor);
                            showdetails[showdetails.length] = rectexecutor;

                            var xmlhttp = new XMLHttpRequest();

                            xmlhttp.onreadystatechange = function () {

                                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                    var resp1 = JSON.parse(xmlhttp.response);

                                    var xmlhttp1 = new XMLHttpRequest();

                                    xmlhttp1.onreadystatechange = function () {

                                        if (xmlhttp1.readyState == 4 && xmlhttp.status == 200) {
                                            var resp3 = JSON.parse(xmlhttp1.response);
                                            y = "8%";
                                            var temp = null;
                                            resp3.forEach(function (entry) {
                                                
                                                createSecondActor(entry, temp,y);
                                                y = parseInt(y.substring(0, y.length - 1)) + 4 + "%";
                                            });
                                        }
                                    };

                                    var xmlhttp9 = new XMLHttpRequest();

                                    xmlhttp9.onreadystatechange = function () {

                                        if (xmlhttp9.readyState == 4 && xmlhttp9.status == 200) {
                                            var resp2 = JSON.parse(xmlhttp9.response);

                                            if (resp2.Type != "Inicio da Partida" || resp2.Type != "Fim da Partida") {


                                                var idc;
                                                if (resp2.Type == "Substituição") {
                                                    
                                                    var temp = null;
                                                    y = "8%";
                                                    playersnotplaying.forEach(function(entry) {
                                                        
                                                        var xmlhttp2 = new XMLHttpRequest();
                                                        xmlhttp2.onreadystatechange = function () {

                                                            if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
                                                                var resp4 = JSON.parse(xmlhttp2.response);

                                                                createSecondActor(resp4, temp,y);
                                                                y = parseInt(y.substring(0, y.length - 1)) + 4 + "%";
                                                            }
                                                        };
                                                        xmlhttp2.open("GET", "/SetUp/GetPlayer?id=" + entry.getAttributeNS(null,'id'), true);
                                                        xmlhttp2.send();

                                                    });
                                                    
                                                    return;
                                                } else {
                                                    if (resp1.IdClub == document.getElementById("iddetailssetup_idvisitor").innerHTML.trim()) {
                                                        idc = document.getElementById("iddetailssetup_idagainst").innerHTML.trim();
                                                    } else {
                                                        idc = document.getElementById("iddetailssetup_idvisitor").innerHTML.trim();
                                                    }
                                                }
                                                xmlhttp1.open("GET", "/SetUp/GetAllPlayerFromClub?idclub=" + idc, true);
                                                xmlhttp1.send();
                                            }

                                        }
                                    };
                                    xmlhttp9.open("GET", "/SetUp/GetEvent?id=" + ide, true);
                                    xmlhttp9.send();

                                }
                            };
                            xmlhttp.open("GET", "/SetUp/GetPlayerWithClub?idplayer=" + idp, true);
                            xmlhttp.send();

                        }
                    }
                };
                xmlhttp8.open("GET", "/SetUp/IsPlayer?id=" + idp, true);
                xmlhttp8.send();


            };
            svg.getElementById("all").appendChild(circles);
        }


        
        function createSecondActor(entry , temp,y) {
            
                
                var circles2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circles2.setAttribute("cx", parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 23 + "%");
                circles2.setAttribute("cy", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + parseInt(y.substring(0, y.length - 1)) + "%");
                circles2.setAttribute("fill", "#ffffff");
                circles2.setAttribute("stroke", "#000000");
                circles2.setAttribute("r", "1%");
                circles2.setAttribute("id", entry.Id);
                svg.getElementById("all").appendChild(circles2);
                showdetails[showdetails.length] = circles2;
                saveplayer.idexe = null;
                circles2.onclick = function () {

                    if (temp != null) {

                        svg.getElementById("all").removeChild(temp);
                        removeElemFromArray(showdetails, temp);

                        temp = null;
                    }

                    var circlesinside2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    circlesinside2.setAttribute("cx", (circles2.getAttributeNS(null, 'cx')));
                    circlesinside2.setAttribute("cy", (circles2.getAttributeNS(null, 'cy')));
                    circlesinside2.setAttribute("fill", "#000000");
                    circlesinside2.setAttribute("stroke", "#000000");
                    circlesinside2.setAttribute("r", "0.8%");
                    circlesinside2.setAttribute("id", "circcc");
                    svg.getElementById("all").appendChild(circlesinside2);
                    showdetails[showdetails.length] = circlesinside2;

                    temp = circlesinside2;
                    saveplayer.idexe = circles2.getAttributeNS(null, 'id');

                };

                createLabels(entry.Name, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 25 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + parseInt(y.substring(0, y.length - 1)) + "%");
                
            
        }




        function PutBaseInfoPlayer(id, photo, posx, posy) {
            var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            svgimg.setAttributeNS(null, 'height', svgheight / 9);
            svgimg.setAttributeNS(null, 'width', svgwidth / 16);
            svgimg.setAttributeNS(null, 'id', id);
            svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', "../fonts/" + photo);
            svgimg.setAttributeNS(null, 'x', posx);
            svgimg.setAttributeNS(null, 'y', posy);
            svgimg.setAttributeNS(null, 'visibility', 'visible');
            svg.getElementById("all").appendChild(svgimg);
            return svgimg;
        }

        function findById(arr, id) {

            for (var i = 0; i < arr.length; ++i) {

                if (parseInt(arr[i].getAttributeNS(null, 'id')) == id) {
                    
                    return true;
                }
                
            }
            return false;
        }


        function createAdminInteract(id) {

            var xmlhttp8 = new XMLHttpRequest();

            xmlhttp8.onreadystatechange = function () {

                if (xmlhttp8.readyState == 4 && xmlhttp8.status == 200) {
                    var resp = JSON.parse(xmlhttp8.response);


                    var svgrec = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    svgrec.setAttributeNS(null, 'height', '80%');
                    svgrec.setAttributeNS(null, 'width', '20%');
                    svgrec.setAttributeNS(null, 'id', resp.Id);
                    svgrec.setAttributeNS(null, 'style', 'fill:green;stroke:white');
                    svgrec.setAttributeNS(null, 'x', xposdetails);
                    svgrec.setAttributeNS(null, 'y', yposdetails);
                    svgrec.setAttributeNS(null, 'visibility', 'visible');
                    showdetails[showdetails.length] = svgrec;
                    svg.getElementById("all").appendChild(svgrec);

                    var svgimgsub = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                    svgimgsub.setAttributeNS(null, 'height', "19%");
                    svgimgsub.setAttributeNS(null, 'width', "19%");

                    svgimgsub.setAttributeNS('http://www.w3.org/1999/xlink', 'href', "../fonts/" + resp.Photo);
                    svgimgsub.setAttributeNS(null, 'x', xposdetails);
                    svgimgsub.setAttributeNS(null, 'y', yposdetails);
                    svgimgsub.setAttributeNS(null, 'visibility', 'visible');
                    showdetails[showdetails.length] = svgimgsub;
                    svg.getElementById("all").appendChild(svgimgsub);


                    var substringedDate = resp.Born.substring(6); //substringedDate= 1291548407008)/
                    var parsedIntDate = parseInt(substringedDate); //parsedIntDate= 1291548407008
                    var date = new Date(parsedIntDate);
                    
                    createLabels("Nome: " + resp.Name, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 0.5 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 22 + "%");
                    createLabels("Nasceu: " + date.toLocaleDateString().toString("dd-MM-yyyy"), parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 0.3 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 26 + "%");
                    createLabels("Altura: " + resp.Height, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 0.3 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 30 + "%");
                    createLabels("Peso: " + resp.Weight, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 0.3 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 34 + "%");

                    var xmlhttp9 = new XMLHttpRequest();

                    xmlhttp9.onreadystatechange = function () {

                        if (xmlhttp9.readyState == 4 && xmlhttp9.status == 200) {
                            var resp2 = JSON.parse(xmlhttp9.response);

                            var y = "35%";
                            resp2.forEach(function (entry) {

                                var xmlhttp1 = new XMLHttpRequest();

                                xmlhttp1.onreadystatechange = function () {

                                    if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                                        var resp1 = JSON.parse(xmlhttp1.response);
                                        if (resp1 == true) {
                                            
                                            if (findById(playersnotplaying, id) == true) {
                                                console.log("ce", id);
                                                if (entry.Type == 'Canto' || entry.Type == 'Fora - de - Jogo' || entry.Type == 'Penalty'
                                                    || entry.Type == 'Canto' || entry.Type == 'Golo' || entry.Type == "Inicio da Partida"
                                                    || entry.Type == "Fim da Partida" || entry.Type == "Substituição") {

                                                    return;
                                                } 
                                            } else {
                                                if (entry.Type == "Inicio da Partida" || entry.Type == "Fim da Partida") {

                                                    return;
                                                } 
                                            }
                                        } else {
                                            if (entry.Type != "Inicio da Partida" && entry.Type != "Fim da Partida") {

                                                return;
                                            } 
                                        }
                                        y = parseInt(y.substring(0, y.length - 1)) + 4 + "%";

                                        createcircles(resp.Id, entry.Id, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 1 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + parseInt(y.substring(0, y.length - 1)) + "%");

                                        createLabels(entry.Type, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 2 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + parseInt(y.substring(0, y.length - 1)) + 1 + "%");
                                    }
                                }
                                xmlhttp1.open("GET", "/SetUp/IsPlayer?id=" + id, true);
                                xmlhttp1.send();


                            });

                            var svgbutton = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                            svgbutton.setAttributeNS(null, 'height', '4%');
                            svgbutton.setAttributeNS(null, 'width', '6%');
                            svgbutton.setAttributeNS(null, 'id', '0');

                            svgbutton.setAttributeNS(null, 'fill', 'white');
                            svgbutton.setAttributeNS(null, 'x', parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 14 + "%");
                            svgbutton.setAttributeNS(null, 'y', parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 75 + "%");
                            svgbutton.setAttributeNS(null, 'visibility', 'visible');
                            svgbutton.setAttributeNS(null, 'cursor', 'pointer');
                            showdetails[showdetails.length] = svgbutton;

                            svg.getElementById("all").appendChild(svgbutton);
                            createLabels("Guardar", parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 14 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 78 + "%");


                        }
                    }
                    xmlhttp9.open("GET", "/SetUp/GetEvents", true);
                    xmlhttp9.send();


                }
            };

            xmlhttp8.open("GET", "/SetUp/GetPlayer?id=" + id, true);
            xmlhttp8.send();

        }

        
        



        function createUserInteract(id) {
            var xmlhttp8 = new XMLHttpRequest();
            xposdetails = "25%";
            yposdetails = "10%";

            arropinions = [];
            xmlhttp8.onreadystatechange = function () {

                if (xmlhttp8.readyState == 4 && xmlhttp8.status == 200) {
                    var resp = JSON.parse(xmlhttp8.response);


                    var svgrec = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    svgrec.setAttributeNS(null, 'height', '80%');
                    svgrec.setAttributeNS(null, 'width', '50%');
                    svgrec.setAttributeNS(null, 'id', resp.Id);
                    svgrec.setAttributeNS(null, 'style', 'fill:green;stroke:white');
                    svgrec.setAttributeNS(null, 'x', xposdetails);
                    svgrec.setAttributeNS(null, 'y', yposdetails);
                    svgrec.setAttributeNS(null, 'visibility', 'visible');
                    showdetails[showdetails.length] = svgrec;
                    svg.getElementById("all").appendChild(svgrec);

                    xposdetails = "40%";
                    var svgimgsub = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                    svgimgsub.setAttributeNS(null, 'height', "19%");
                    svgimgsub.setAttributeNS(null, 'width', "19%");

                    svgimgsub.setAttributeNS('http://www.w3.org/1999/xlink', 'href', "../fonts/" + resp.Photo);
                    svgimgsub.setAttributeNS(null, 'x', xposdetails);
                    svgimgsub.setAttributeNS(null, 'y', yposdetails);
                    svgimgsub.setAttributeNS(null, 'visibility', 'visible');
                    showdetails[showdetails.length] = svgimgsub;
                    svg.getElementById("all").appendChild(svgimgsub);


                    var substringedDate = resp.Born.substring(6); //substringedDate= 1291548407008)/
                    var parsedIntDate = parseInt(substringedDate); //parsedIntDate= 1291548407008
                    var date = new Date(parsedIntDate);
                    
                    //console.log("datesss", date.toLocaleDateString());
                    //console.log("datesss", date.toLocaleString());
                    //console.log("datesss", date.toUTCString());
                    //console.log("datesss", date.toDateString());
                    //console.log("datesss", date.getDate());
                    createLabels("Nome: " + resp.Name, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 0.5 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 22 + "%");
                    createLabels("Nasceu: " + date.toLocaleDateString().toString("dd-MM-yyyy"), parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 0.3 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 26 + "%");
                    createLabels("Altura: " + resp.Height, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 0.3 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 30 + "%");
                    createLabels("Peso: " + resp.Weight, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 0.3 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 34 + "%");

                    xposdetails = "27%";
                    yposdetails = "45%";
                    if (isAuth == "False") return;
                    createLabels("Sim", xposdetails, yposdetails);
                    xposdetails = "30%";
                    createLabels("Não", xposdetails, yposdetails);

                    var xposcircS = "28%";
                    var xposcircN = "32%";
                    xposdetails = "35%";
                    yposdetails = "50%";

                    var yposdetails1 = "52%";

                    var xmlhttp5 = new XMLHttpRequest();

                    xmlhttp5.onreadystatechange = function () {

                        if (xmlhttp5.readyState == 4 && xmlhttp5.status == 200) {
                            var resp1 = JSON.parse(xmlhttp5.response);

                            var count1 = 0;
                            resp1.forEach(function (entry) {
                                if (count1 == 8) return;

                                var obj = {};

                                var substringedDate = entry.date.substring(6); //substringedDate= 1291548407008)/
                                var parsedIntDate = parseInt(substringedDate); //parsedIntDate= 1291548407008
                                var datet = new Date(parsedIntDate);

                                var circleS = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                                circleS.setAttribute("cx", xposcircS);
                                circleS.setAttribute("cy", yposdetails);
                                circleS.setAttribute("fill", "#ffffff");
                                circleS.setAttribute("stroke", "#000000");
                                circleS.setAttribute("r", "1%");
                                circleS.setAttribute("id", count1++);
                                showdetails[showdetails.length] = circleS;
                                svg.getElementById("all").appendChild(circleS);

                                obj.dated = datet.toLocaleString();
                                obj.lastclick = null;

                                circleS.onclick = function () {
                                    if (obj.lastclick != null) {
                                        svg.getElementById("all").removeChild(obj.lastclick);
                                        removeElemFromArray(showdetails, obj.lastclick);
                                        obj.lastclick = null;
                                    }
                                    var circlesinside = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                                    circlesinside.setAttribute("cx", (circleS.getAttributeNS(null, 'cx')));
                                    circlesinside.setAttribute("cy", (circleS.getAttributeNS(null, 'cy')));
                                    circlesinside.setAttribute("fill", "#000000");
                                    circlesinside.setAttribute("stroke", "#000000");
                                    circlesinside.setAttribute("r", "0.7%");
                                    circlesinside.setAttribute("id", "circcc");
                                    svg.getElementById("all").appendChild(circlesinside);
                                    showdetails[showdetails.length] = circlesinside;
                                    obj.lastclick = circlesinside;

                                    arropinions[circleS.getAttributeNS(null, 'id')].opinion = "yes";

                                }

                                var circleN = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                                circleN.setAttribute("cx", xposcircN);
                                circleN.setAttribute("cy", yposdetails);
                                circleN.setAttribute("fill", "#ffffff");
                                circleN.setAttribute("stroke", "#000000");
                                circleN.setAttribute("r", "1%");
                                circleN.setAttribute("id", "");
                                showdetails[showdetails.length] = circleN;
                                svg.getElementById("all").appendChild(circleN);
                                circleN.onclick = function () {
                                    if (obj.lastclick != null) {
                                        svg.getElementById("all").removeChild(obj.lastclick);
                                        removeElemFromArray(showdetails, obj.lastclick);
                                        obj.lastclick = null;
                                    }

                                    var circlesinside = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                                    circlesinside.setAttribute("cx", (circleN.getAttributeNS(null, 'cx')));
                                    circlesinside.setAttribute("cy", (circleN.getAttributeNS(null, 'cy')));
                                    circlesinside.setAttribute("fill", "#000000");
                                    circlesinside.setAttribute("stroke", "#000000");
                                    circlesinside.setAttribute("r", "0.7%");
                                    circlesinside.setAttribute("id", "circcc");
                                    svg.getElementById("all").appendChild(circlesinside);
                                    showdetails[showdetails.length] = circlesinside;
                                    obj.lastclick = circlesinside;
                                    arropinions[circleS.getAttributeNS(null, 'id')].opinion = "no";

                                }




                                var xmlhttp = new XMLHttpRequest();
                                xmlhttp.onreadystatechange = function () {

                                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                        var resp4 = JSON.parse(xmlhttp.response);
                                        var namevent = resp4.Type;


                                        var xmlhttp1 = new XMLHttpRequest();
                                        xmlhttp1.onreadystatechange = function () {

                                            if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                                                var resp2 = JSON.parse(xmlhttp1.response);
                                                var causename = resp2.Name;

                                                if (entry.executeId == null) {
                                                    arropinions[arropinions.length] = obj;
                                                    createLabels(datet.toLocaleTimeString() + "-" + namevent + "-" + causename, xposdetails, yposdetails1);

                                                    yposdetails1 = parseInt(yposdetails1.substring(0, yposdetails1.length - 1)) + 5 + "%";

                                                } else {
                                                    var xmlhttp2 = new XMLHttpRequest();
                                                    xmlhttp2.onreadystatechange = function () {

                                                        if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
                                                            var resp3 = JSON.parse(xmlhttp2.response);
                                                            var executename = resp3.Name;

                                                            arropinions[arropinions.length] = obj;
                                                            createLabels(datet.toLocaleTimeString() + "-" + namevent + "-" + causename + "-" + executename, xposdetails, yposdetails1);

                                                            yposdetails1 = parseInt(yposdetails1.substring(0, yposdetails1.length - 1)) + 5 + "%";

                                                        }
                                                    };

                                                    xmlhttp2.open("GET", "/SetUp/GetPlayer?id=" + entry.executeId, true);
                                                    xmlhttp2.send();
                                                }
                                            }
                                        };

                                        xmlhttp1.open("GET", "/SetUp/GetPlayer?id=" + entry.causeId, true);
                                        xmlhttp1.send();

                                    }
                                }

                                xmlhttp.open("GET", "/SetUp/GetEvent?id=" + entry.eventId, true);
                                xmlhttp.send();


                                //LineInTimeLine(entry.eventId, entry.causeId, entry.executeId, datet);
                                yposdetails = parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 5 + "%";
                            });
                            var xpossave = "68%";
                            var ypossave = "80%";
                            var svgbutton = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                            svgbutton.setAttributeNS(null, 'height', '4%');
                            svgbutton.setAttributeNS(null, 'width', '6%');
                            svgbutton.setAttributeNS(null, 'id', '0');

                            svgbutton.setAttributeNS(null, 'fill', 'white');
                            svgbutton.setAttributeNS(null, 'x', xpossave);
                            svgbutton.setAttributeNS(null, 'y', ypossave);
                            svgbutton.setAttributeNS(null, 'visibility', 'visible');
                            svgbutton.setAttributeNS(null, 'cursor', 'pointer');
                            showdetails[showdetails.length] = svgbutton;

                            svg.getElementById("all").appendChild(svgbutton);
                            createLabels("Guardar", xpossave, parseInt(ypossave.substring(0, ypossave.length - 1)) + 3 + "%");

                        }
                    }

                    xmlhttp5.open("GET", "/SetUp/GetOpinionUserByInstant?idstadium=" + idstadium + "&datahora=" + datahora + "&idequipav=" + idequipav + "&dataequipav=" + dataequipav +
               "&idequipag=" + idequipag + "&dataequipag=" + dataequipag + "&idcause=" + id, true);
                    xmlhttp5.send();


                }
            };

            xmlhttp8.open("GET", "/SetUp/GetPlayer?id=" + id, true);
            xmlhttp8.send();


        }



        function PhotoonSvg(id, photo, posx, posy) {

            var svgimg = PutBaseInfoPlayer(id, photo, posx, posy);

            svgimg.onclick = function () {

                if (document.getElementById("isadmin").innerHTML.trim() == "True") {
                    createAdminInteract(id, photo, posx, posy);
                } else {
                    createUserInteract(id, photo, posx, posy);
                }

            };
            return svgimg;
        }

        function createLabels(name, xpos, ypos) {
            var txtElem = document.createElementNS('http://www.w3.org/2000/svg', "text");

            txtElem.setAttributeNS(null, "x", xpos);
            txtElem.setAttributeNS(null, "y", ypos);
            txtElem.setAttributeNS(null, "font-size", avwidth / 9 + "%");
            txtElem.setAttributeNS(null, 'cursor', 'pointer');
            var helloTxt = document.createTextNode(name);

            txtElem.appendChild(helloTxt);
            showdetails[showdetails.length] = txtElem;
            svg.getElementById("all").appendChild(txtElem);
            return txtElem;

        }






        var OldCoor = {};


        TrueCoords = SVGRoot.createSVGPoint();
        GrabPoint = SVGRoot.createSVGPoint();

        BackDrop = svg.getElementById('all');





        var timer = 200;//miliseconds
        var isclick = true;
        var functimer = null;
        var oldtarget = null;


        function removeFromArr(arr, id) {
            arr.forEach(function (entry) {
                if (id == entry.getAttributeNS(null, 'id')) {

                    svg.getElementById("all").removeChild(entry);
                    return true;
                }
            });
        }

        function removePhoto(id) {

            if (!removeFromArr(allplayershome, id)) {
                removeFromArr(playersnotplaying, id);
            }
        }



        SVGDocument.onmousedown = function (evt) {

            if (evt.target.innerHTML == 'Guardar') {

                if (document.getElementById("isadmin").innerHTML.trim() == "False") {


                    arropinions.forEach(function (entry) {
                        var dt = new Date();
                        var n = dt.getMilliseconds();
                        var f = dt.toString().substring(0, 24);
                        dt = f + '.' + n;
                        if (entry.hasOwnProperty("opinion")) {

                            var xmlhttp1 = new XMLHttpRequest();
                            xmlhttp1.onreadystatechange = function () {

                                if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {

                                    var xmlhttp2 = new XMLHttpRequest();
                                    xmlhttp2.onreadystatechange = function () {

                                        if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
                                            var resp1 = JSON.parse(xmlhttp2.response);

                                            
                                            var c = document.getElementById("c" + resp1.IdEvent + entry.opinion);
                                            c.innerHTML = parseInt(c.innerHTML.trim()) + 1;
                                            var b = document.getElementById("b" + resp1.IdEvent + entry.opinion);
                                            b.style.height = (parseInt(c.innerHTML.trim()) + 1) + "%";
                                            var nn = document.getElementById("n" + resp1.IdEvent + entry.opinion);
                                            nn.style.top = (parseInt(c.innerHTML.trim()) + 1) + 20 + "%";
                                        }
                                    };

                                    xmlhttp2.open("GET", "/SetUp/GetInstant?idstadium=" + idstadium + "&datahora=" + datahora + "&datavisitor=" + dataequipav + "&idvisitor=" + idequipav +
                         "&dataagainst=" + dataequipag + "&idagainst=" + idequipag + "&negative=no" + "&instant=" + entry.dated);
                                    xmlhttp2.send();

                                }
                            };

                            xmlhttp1.open("POST", "/SetUp/CreateOpinionUser", true);
                            xmlhttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                            xmlhttp1.send("dateinstant=" + entry.dated + "&idstadium=" + idstadium + "&datahora=" + datahora + "&datavisitor=" + dataequipav + "&idvisitor=" + idequipav +
                                "&dataagainst=" + dataequipag + "&idagainst=" + idequipag + "&iduser=" + document.getElementById("curruserid").innerHTML.trim() + "&dateop=" + dt + "&negative=" + entry.opinion);

                            removedetails();

                        }
                    });


                } else {


                    if (Object.getOwnPropertyNames(saveplayer).length === 0) {

                        return false;
                    } else if (!saveplayer.hasOwnProperty('event')) {
                        return false;
                    } else if (!saveplayer.hasOwnProperty('idexe')) {
                        saveplayer.idexe = null;
                    }
                    lastcircle = null;

                    var xmlhttp10 = new XMLHttpRequest();
                    var dt = new Date(); //lasttime;
                    if (lasttime != null) {
                        dt.setHours(lasttime.split(':')[0]);
                        dt.setMinutes(lasttime.split(':')[1]);
                        dt.setSeconds(lasttime.split(':')[2]);
                    }
                    console.log("dt", dt);
                    xmlhttp10.onreadystatechange = function () {

                        if (xmlhttp10.readyState == 4 && xmlhttp10.status == 200) {

                            LineInTimeLine(saveplayer.event, saveplayer.idplayer, saveplayer.idexe, dt, 0, 0);

                            var xmlhttp1 = new XMLHttpRequest();
                            xmlhttp1.onreadystatechange = function () {

                                if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                                    var resp1 = JSON.parse(xmlhttp1.response);
                                    if (resp1.Type == 'Cartão Vermelho') {

                                        removePhoto(saveplayer.idplayer);

                                    } else if (resp1.Type == 'Substituição') {
                                        replacePlayer(saveplayer.idplayer, saveplayer.idexe);
                                        nsubst++;
                                    } else if (resp1.Type == 'Inicio da Partida') {
                                        datestartmatch = new Date();
                                        starttime(datestartmatch);
                                    } else if (resp1.Type == 'Fim da Partida') {
                                        clearInterval(mytimer);
                                    }
                                }
                            };
                            xmlhttp1.open("GET", "/SetUp/GetEvent?id=" + saveplayer.event, true);
                            xmlhttp1.send();

                        }
                    }

                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function () {

                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            var resp = JSON.parse(xmlhttp.response);
                            if (resp.Type == 'Substituição' && nsubst == 3) {

                            } else {
                                console.log("dt", dt);
                                xmlhttp10.open("POST", "/SetUp/CreateInstant", true);
                                xmlhttp10.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                xmlhttp10.send("datenow=" + dt + "&idstadium=" + idstadium + "&datahora=" + datahora + "&datavisitor=" + dataequipav + "&idvisitor=" + idequipav +
                                    "&dataagainst=" + dataequipag + "&idagainst=" + idequipag + "&idcause=" + saveplayer.idplayer + "&idevent=" + saveplayer.event + "&idexecute=" + saveplayer.idexe + "&iduser=" + document.getElementById("curruserid").innerHTML.trim());


                            }
                            removedetails();
                            return;
                        }
                    };

                    xmlhttp.open("GET", "/SetUp/GetEvent?id=" + saveplayer.event, true);
                    xmlhttp.send();




                }

            }
            if (evt.target.nodeName == 'circle' || evt.target.nodeName == 'text') return;
            if (evt.target.nodeName == 'rect') {
                removedetails();
                return true;
            }
            removedetails();
            if (evt.which == 3) {

                evt.target.onclick(evt);

                return false;
            }

            var targetElement = oldtarget = evt.target;
            if (targetElement.nodeName != 'image') {
                return false;
            }

            OldCoor.x = targetElement.getAttributeNS(null, 'x');
            OldCoor.y = targetElement.getAttributeNS(null, 'y');
            OldCoor.id = targetElement.getAttributeNS(null, 'id');


            if (BackDrop != targetElement) {

                DragTarget = targetElement;

                DragTarget.parentNode.appendChild(DragTarget);
                DragTarget.setAttributeNS(null, 'pointer-events', 'none');
                var transMatrix = DragTarget.getCTM();
                GrabPoint.x = TrueCoords.x - Number(transMatrix.e);
                GrabPoint.y = TrueCoords.y - Number(transMatrix.f);
            }

        };


        function replace(arr, oldimg, newimg) {
            for (var i = 0; i < arr.length; ++i) {
                if (arr[i] == oldimg) {
                    arr[i] = newimg;
                }
            }
        }

        function removeElemFromArray(arr, elem) {
            for (var i = 0; i < arr.length ; i++) {
                if (arr[i] == elem) {
                    arr.splice(i, 1);
                }
            }
        }

        SVGDocument.onmouseup = function (evt) {

            if (evt.which == 3) {

                return false;
            }
            if (functimer) {

                clearTimeout(functimer);

                return true;

            }

            isclick = false;

        };


        function replace(arr, elem, newelem) {
            for (var i = 0; i < arr.length; ++i) {
                if (arr[i] == elem)
                    arr[i] = newelem;
            }
        }


        function replacePlayer(causeId, executeId) {


            allplayershome.forEach(function (entry2) {
                if (entry2.getAttributeNS(null, 'id') == causeId) {
                    playersnotplaying.forEach(function idx(entry3) {
                        if (entry3.getAttributeNS(null, 'id') == executeId) {
                            var secposx = entry3.getAttributeNS(null, 'x');
                            var secposy = entry3.getAttributeNS(null, 'y');
                            entry3.setAttributeNS(null, 'x', entry2.getAttributeNS(null, 'x'));
                            entry3.setAttributeNS(null, 'y', entry2.getAttributeNS(null, 'y'));
                            entry2.setAttributeNS(null, 'x', secposx);
                            entry2.setAttributeNS(null, 'y', secposy);
                            replace(allplayershome, entry2, entry3);
                            replace(playersnotplaying, entry3, entry2);
                        }
                    });
                }
            });

        }


        var arrsubs = [];
        var nrequestinstant = 0;

        function FillTimeLine() {

            var xmlhttp5 = new XMLHttpRequest();

            var starmatch = null;
            var endmatch = null;

            xmlhttp5.onreadystatechange = function () {

                if (xmlhttp5.readyState == 4 && xmlhttp5.status == 200) {
                    var resp = JSON.parse(xmlhttp5.response);

                    resp.forEach(function (entry) {
                        var substringedDate = entry.date.substring(6); //substringedDate= 1291548407008)/
                        var parsedIntDate = parseInt(substringedDate); //parsedIntDate= 1291548407008
                        var datet = new Date(parsedIntDate);
                        var xmlhttp1 = new XMLHttpRequest();
                        xmlhttp1.onreadystatechange = function () {

                            if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                                var resp3 = JSON.parse(xmlhttp1.response);

                                var xmlhttp2 = new XMLHttpRequest();
                                xmlhttp2.onreadystatechange = function () {

                                    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
                                        var resp2 = JSON.parse(xmlhttp2.response);

                                        LineInTimeLine(entry.eventId, entry.causeId, entry.executeId, datet, resp3, resp2);

                                        var xmlhttp = new XMLHttpRequest();
                                        xmlhttp.onreadystatechange = function () {

                                            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                                var resp1 = JSON.parse(xmlhttp.response);


                                                if (resp1.Type == 'Substituição') {
                                                    var obj = {};
                                                    obj.date = datet;
                                                    obj.cause = entry.causeId;
                                                    obj.execute = entry.executeId;
                                                    arrsubs[arrsubs.length] = obj;

                                                    nsubst++;

                                                }
                                                else if (resp1.Type == 'Cartão Vermelho') {
                                                    removePhoto(entry.causeId);
                                                } else if (resp1.Type == 'Inicio da Partida') {
                                                    starmatch = datet;
                                                    starttime(datet);
                                                    if (endmatch != null) {

                                                        clearInterval(mytimer);
                                                        var oldtimer = svg.getElementById("timer");

                                                        oldtimer.innerHTML = new Date(endmatch - datet).toTimeString().substring(0, 8);
                                                    }
                                                } else if (resp1.Type == 'Fim da Partida') {
                                                    //endmatch = datet;
                                                    clearInterval(mytimer);
                                                    //if (starmatch != null) {
                                                        var oldtimer = svg.getElementById("timer");
                                                        oldtimer.innerHTML = datet.toTimeString().substring(0, 8);//new Date(starmatch - datet).toTimeString().substring(0, 8);
                                                    //}
                                                }
                                                ++nrequestinstant;
                                                if (nrequestinstant == resp.length) {
                                                    arrsubs.sort(function (a, b) {
                                                        
                                                        return new Date(a.date) - new Date(b.date);
                                                    });
                                                    arrsubs.forEach(function (a) {
                                                        replacePlayer(a.cause, a.execute);
                                                    });
                                                }
                                            }
                                        };
                                        xmlhttp.open("GET", "/SetUp/GetEvent?id=" + entry.eventId, true);
                                        xmlhttp.send();


                                    }
                                };


                                xmlhttp2.open("GET", "/SetUp/GetOpinionByInstant?idstadium=" + idstadium + "&datahora=" + datahora + "&datavisitor=" + dataequipav + "&idvisitor=" + idequipav +
                         "&dataagainst=" + dataequipag + "&idagainst=" + idequipag + "&negative=no" + "&instant=" + datet);
                                xmlhttp2.send();
                            }
                        };

                        xmlhttp1.open("GET", "/SetUp/GetOpinionByInstant?idstadium=" + idstadium + "&datahora=" + datahora + "&datavisitor=" + dataequipav + "&idvisitor=" + idequipav +
                         "&dataagainst=" + dataequipag + "&idagainst=" + idequipag + "&negative=yes" + "&instant=" + datet);
                        xmlhttp1.send();



                    });

                }
            };
            xmlhttp5.open("GET", "/SetUp/GetTimeLine?idstadium=" + idstadium + "&datahora=" + datahora + "&idequipav=" + idequipav + "&dataequipav=" + dataequipav +
                "&idequipag=" + idequipag + "&dataequipag=" + dataequipag, true);
            xmlhttp5.send();

        }

        inserirnameclubs("hometeam", '0', "40%", "10%");
        inserirnameclubs("awayteam", '0', "59%", "10%");

        function LineInTimeLine(eventId, causeId, executeId, date, yes, no) {
            var xmlhttp6 = new XMLHttpRequest();
            xmlhttp6.onreadystatechange = function () {

                if (xmlhttp6.readyState == 4 && xmlhttp6.status == 200) {
                    var resp2 = JSON.parse(xmlhttp6.response);

                    if (resp2.eventName == 'Golo') {

                        var xmlhttp = new XMLHttpRequest();
                        xmlhttp.onreadystatechange = function () {

                            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                var resp = JSON.parse(xmlhttp.response);
                                var idclub = resp.IdClub;

                                if (idclub == document.getElementById("iddetailssetup_idvisitor").innerHTML.trim()) {
                                    svg.getElementById("hometeam").innerHTML = parseInt(svg.getElementById("hometeam").innerHTML.trim()) + 1;
                                } else {
                                    svg.getElementById("awayteam").innerHTML = parseInt(svg.getElementById("awayteam").innerHTML.trim()) + 1;
                                }
                            }
                        };

                        xmlhttp.open("GET", "/SetUp/GetPlayerWithClub?idplayer=" + causeId, true);
                        xmlhttp.send();
                    }


                    var hr = document.createElement('hr');
                    var txt;

                    var aux = document.createTextNode("sim(" + yes + ")");
                    var auxdiv = document.createElement('div');
                    auxdiv.style.color = 'green';
                    auxdiv.style.position = 'absolute';
                    auxdiv.appendChild(aux);

                    var aux1 = document.createTextNode("não(" + no + ")");
                    var auxdiv1 = document.createElement('div');
                    auxdiv1.style.position = 'absolute';
                    auxdiv1.style.color = 'red';
                    auxdiv1.style.left = aux.length + 11 + "%";
                    auxdiv1.appendChild(aux1);

                    var auxdiv2 = document.createElement('div');
                    auxdiv2.style.position = 'absolute';
                    auxdiv2.style.color = 'red';
                    auxdiv2.style.left = aux1.length + 20 + "%";

                    console.log("date.toTimeString().substring(0, 8)", date);
                    if (resp2.executeName == null) {
                        txt = document.createTextNode(" | " + date.toTimeString().substring(0, 8) + ' - ' + resp2.eventName + " - " + resp2.causeName);
                    } else {
                        txt = document.createTextNode(" | " + date.toTimeString().substring(0, 8) + ' - ' + resp2.eventName + " - " + resp2.causeName + " - " + resp2.executeName);
                    }
                    var auxdiv4 = document.createElement('div');
                    auxdiv4.style.position = 'absolute';
                    auxdiv4.style.color = 'black';
                    auxdiv4.style.left = aux.length + aux1.length + 20 + "%";

                    auxdiv4.appendChild(txt);
                    if (auxdiv4.length > 40)
                        auxdiv4.style.fontSize = ((parseInt(timeline.style.width.substring(0, 2)) / 100) * avwidth) / (txt.length / 2.2) + "px";

                    var auxdiv3 = document.createElement('div');
                    auxdiv3.appendChild(auxdiv1);
                    auxdiv3.appendChild(auxdiv2);
                    auxdiv3.appendChild(auxdiv);
                    auxdiv3.appendChild(auxdiv4);


                    hr.appendChild(auxdiv3);
                    hr.style.fontSize = avwidth / 70 + "px";

                    if (timeline.firstChild != null) {
                        var allchilds = timeline.childNodes;

                        for (var i = 0; i < allchilds.length; ++i) {

                            if (allchilds[i].childNodes[0].childNodes[3].innerHTML.substring(3, 11) < date.toTimeString()) {
                                timeline.insertBefore(hr, allchilds[i]);
                                return true;
                            }
                        }
                    }
                    timeline.appendChild(hr);

                }
            };

            xmlhttp6.open("GET", "/SetUp/GetNamesForTimeLine?idevent=" + eventId + "&idcause=" + causeId + "&idexecute=" + executeId, true);
            xmlhttp6.send();
        }



        var timeline = document.createElement('div');
        timeline.id = 'timeline';
        timeline.style.width = '25%';
        timeline.style.height = '60%';
        timeline.style.overflow = 'auto';
        timeline.style.position = 'fixed';
        timeline.style.left = '70%';
        timeline.style.top = '10%';
        timeline.title = "TimeLine";
        timeline.style.border = 'ridge';
        timeline.style.whiteSpace = 'nowrap';

        document.body.appendChild(timeline);



        function createMyCounters(name, number, x, y, opinion) {
            var divmain = document.createElement('div');

            divmain.style.position = 'absolute';
            divmain.style.width = '100%';
            divmain.style.height = '100%';
            divmain.style.left = (opinion == 'yes') ? "0%" : '50%';

            var divcount = document.createElement('div');
            divcount.id = 'c' + name + opinion;
            divcount.style.width = '10%';
            divcount.style.height = '20%';
            divcount.style.position = 'absolute';
            divcount.style.left = '15%';
            divcount.style.top = "0%";

            var evcount = document.createTextNode(number);
            divcount.style.fontSize = avwidth / 100 + "px";
            divcount.appendChild(evcount);

            var divbar = document.createElement('div');
            divbar.id = 'b' + name + opinion;
            divbar.style.width = '40%';
            divbar.style.height = (number * 100 / avheight) + "%";
            divbar.style.backgroundColor = "blue";
            divbar.style.position = 'absolute';
            divbar.style.left = '5%';
            divbar.style.top = '20%';

            var divname = document.createElement('div');
            divname.id = 'n' + name + opinion;
            divname.style.width = '100%';
            divname.style.height = '0%';
            divname.style.position = 'absolute';
            divname.style.left = "10%";
            divname.style.top = (number * 100 / avheight) + 20 + "%";
            var evname = document.createTextNode((opinion == 'yes') ? "sim" : "não");
            divname.style.fontSize = avwidth / 100 + "px";

            divname.appendChild(evname);


            divmain.appendChild(divcount);
            divmain.appendChild(divbar);
            divmain.appendChild(divname);

            return divmain;
        }


        function createalldivs() {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {

                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var resp = JSON.parse(xmlhttp.response);
                    var xleft = null;
                    var nevents = resp.length;
                    var xpos = (avwidth / 2 / (nevents * 2)) * 100 / avwidth;
                    var ypos = avheight + 50;
                    var accxpos = xpos + "%";
                    resp.forEach(function (entry) {

                        var xmlhttp1 = new XMLHttpRequest();
                        xmlhttp1.onreadystatechange = function () {

                            if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                                var resp2 = JSON.parse(xmlhttp1.response);

                                var xmlhttp2 = new XMLHttpRequest();
                                xmlhttp2.onreadystatechange = function () {

                                    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
                                        var resp3 = JSON.parse(xmlhttp2.response);

                                        xleft = accxpos;
                                        var divyes = createMyCounters(entry.Id, resp2, accxpos, ypos, "yes");
                                        accxpos = parseInt(accxpos.substring(0, accxpos.length - 1)) + xpos + "%";
                                        var divno = createMyCounters(entry.Id, resp3, accxpos, ypos, "no");
                                        accxpos = parseInt(accxpos.substring(0, accxpos.length - 1)) + xpos + "%";
                                        var divmain = document.createElement('div');
                                        divmain.id = 'n';
                                        divmain.style.position = 'absolute';
                                        divmain.style.width = '3%';
                                        divmain.style.height = '19%';
                                        divmain.style.left = accxpos;
                                        divmain.style.top = ypos + "px";
                                        divmain.appendChild(divyes);
                                        divmain.appendChild(divno);
                                        var divev = document.createElement('div');
                                        divev.id = 'n';
                                        divev.style.position = 'absolute';
                                        divev.style.top = (resp2 > resp3) ? resp2 + 20 + 15 + "%" : resp3 + 20 + 15 + "%";


                                        var evname = document.createTextNode(entry.Type);
                                        divev.style.fontSize = avwidth / 100 + "px";
                                        divev.marginRight = "4cm";
                                        divev.appendChild(evname);
                                        divmain.appendChild(divev);

                                        document.body.appendChild(divmain);
                                    }
                                };
                                xmlhttp2.open("GET", "/SetUp/GetUserOpinionByEvent?idstadium=" + idstadium + "&datahora=" + datahora + "&datavisitor=" + dataequipav + "&idvisitor=" + idequipav +
                            "&dataagainst=" + dataequipag + "&idagainst=" + idequipag + "&iduser=" + document.getElementById("curruserid").innerHTML.trim() + "&idevent=" + entry.Id + "&negative=no");
                                xmlhttp2.send();

                            }
                        };
                        xmlhttp1.open("GET", "/SetUp/GetUserOpinionByEvent?idstadium=" + idstadium + "&datahora=" + datahora + "&datavisitor=" + dataequipav + "&idvisitor=" + idequipav +
                            "&dataagainst=" + dataequipag + "&idagainst=" + idequipag + "&iduser=" + document.getElementById("curruserid").innerHTML.trim() + "&idevent=" + entry.Id + "&negative=yes");
                        xmlhttp1.send();

                    });
                }
            };
            xmlhttp.open("GET", "/SetUp/GetEvents", true);
            xmlhttp.send();
        }

        createalldivs();








        google.load('visualization', '1.0', { 'packages': ['corechart'], callback: drawChart });


        google.setOnLoadCallback(drawChart);

        function drawChart() {
            var mainarryes = [];
            var mainarrayno = [];
            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {

                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var resp2 = JSON.parse(xmlhttp.response);

                    createstatevent(resp2, mainarryes, 'yes', 'chart_div');
                    createstatevent(resp2, mainarrayno, 'no', 'chart_div2');

                }
            };

            xmlhttp.open("GET", "/SetUp/GetEvents", true);
            xmlhttp.send();

        }

        function createstatevent(resp2, mainarr, opinion, iddiv) {
            var nev = 0;
            var lengthevents = resp2.length;
            resp2.forEach(function (entry) {
                var objarr = [];

                mainarr[mainarr.length] = objarr;
                var xmlhttp1 = new XMLHttpRequest();
                xmlhttp1.onreadystatechange = function () {

                    if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                        var resp3 = JSON.parse(xmlhttp1.response);
                        objarr[objarr.length] = entry.Type;
                        objarr[objarr.length] = resp3;
                        ++nev;
                        if (nev == lengthevents) {
                            
                            var data = new google.visualization.DataTable();
                            data.addColumn('string', 'Topping');
                            data.addColumn('number', 'Slices');
                            data.addRows(mainarr);

                            var options = {
                                'title': 'Estatistica ' + ((opinion == "yes") ? "sim" : "não"),
                                'width': avwidth / 4,
                                'height': avheight / 3
                            };
                            var chart = new google.visualization.PieChart(document.getElementById(iddiv));
                            chart.draw(data, options);
                        }
                    }
                };
                xmlhttp1.open("GET", "/SetUp/GetOpinionByEvent?idstadium=" + idstadium + "&datahora=" + datahora + "&datavisitor=" + dataequipav + "&idvisitor=" + idequipav +
                        "&dataagainst=" + dataequipag + "&idagainst=" + idequipag + "&iduser=" + document.getElementById("curruserid").innerHTML.trim() + "&idevent=" + entry.Id + "&negative=" + opinion);
                xmlhttp1.send();
            });

        }

    };
})(window, window.document);