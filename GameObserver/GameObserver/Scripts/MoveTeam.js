window.onload = function () {

    console.log(window.screen.availWidth);
    console.log(window.screen.availHeight);

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
    var movedownmiddle = 0;
    var movedownstriker = 0;

    var amovedowndefense = 0;
    var amovedownmiddle = 0;
    var amovedownstriker = 0;



    var ndefensehome = 1;
    var nmiddlehome = 1;
    var nstrikerhome = 1;
    var nadefensehome = 1;
    var namiddlehome = 1;
    var nastrikerhome = 1;
    var ngkhome = 1;


    var indefense = 1;
    var inmiddle = 1;
    var instriker = 1;


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
    var saveplayer = {};
    var playersnotplaying = [];

    var a = document.getElementById("svgobject");
    var svg = null;
    var svgheight = null;
    var svgwidth = null;

    var avheight = window.screen.availHeight / 1.5;
    var avwidth = window.screen.availWidth / 1.5;
    console.log("avheight", avheight);
    console.log("avwidth", avwidth);
    a.setAttributeNS(null, 'height', avheight);
    a.setAttributeNS(null, 'width', avwidth);

    svg = a.contentDocument;
    a.setAttributeNS(null, 'height', avheight);
    a.setAttributeNS(null, 'width', avwidth);

    svgheight = a.getBoundingClientRect().height;

    svgwidth = a.getBoundingClientRect().width;
    console.log("svgheight", svgheight);
    console.log("svgwidth", svgwidth);
    var halfposition = (svgwidth / 2);
    SVGDocument = svg;
    SVGRoot = SVGDocument.documentElement;
    console.log("svgroot", SVGRoot);


    var yfield = svg.getElementById("field").getBoundingClientRect().height;
    movey = svg.getElementById("uprect").getBoundingClientRect().height/1.3;
   // var ydown = svg.getElementById("downrect").getBoundingClientRect().height;
    //var yhomescore = svg.getElementById("homescore").getBoundingClientRect().height;
    //var xhomescore = svg.getElementById("homescore").getBoundingClientRect().width;


    ///inserirnameclubs(null, "TIME", "48%", "6%");

    

    var xmlhttp3 = new XMLHttpRequest();

    xmlhttp3.onreadystatechange = function () {

        if (xmlhttp3.readyState == 4 && xmlhttp3.status == 200) {
            var resp = JSON.parse(xmlhttp3.response);

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
            middledefensex = (((svgwidth) / 4));
            console.log("middledefensey", middledefensey);
            console.log("middledefensey", defense);
            middlex = (svgwidth / 2);
            middley = (yfield / (parseInt(middle) + 1));
            middlestrikery = (yfield / (parseInt(striker) + 1));
            middlestrikerx = ((svgwidth / 2) + (middledefensex));
            console.log("middlestrikerx", middlestrikerx);
            middlegkx = 0;
            middlegky = (yfield / (parseInt(gk) + 1));


        }
    };
    //console.log("forma", document.getElementById("id").innerHTML);
    var idq = document.getElementById("idteamclub").innerHTML;
    var dataq = document.getElementById("idteamdata").innerHTML;
    xmlhttp3.open("GET", "/SetUp/GetFormation?id=" + idq + "&dateq=" + dataq, true);
    xmlhttp3.send();



   

    function inserirsymbolclubs(photo, posx, posy) {
        var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        svgimg.setAttributeNS(null, 'height', avheight / 9);
        svgimg.setAttributeNS(null, 'width', avwidth / 18);
        //svgimg.setAttributeNS(null, 'id', id);
        svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', "../fonts/" + photo);
        svgimg.setAttributeNS(null, 'x', posx);
        svgimg.setAttributeNS(null, 'y', posy);
        svgimg.setAttributeNS(null, 'visibility', 'visible');
        svg.getElementById("all").appendChild(svgimg);

    }

    //inserirsymbolclubs(document.getElementById("idclubvisitorphoto").innerHTML.trim(), "0", "1%");
    //inserirsymbolclubs(document.getElementById("idclubagainstphoto").innerHTML.trim(), "93%", "1%");

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

    //inserirnameclubs(null, document.getElementById("idnameclubvisitor").innerHTML.trim(), "18%", "8%");
    //inserirnameclubs(null, document.getElementById("idnameclubagainst").innerHTML.trim(), "75%", "8%");

    //var ref1 = document.getElementById("idref1").innerHTML.trim();
    //var ref2 = document.getElementById("idref2").innerHTML.trim();
    //var ref3 = document.getElementById("idref3").innerHTML.trim();
    //var ref4 = document.getElementById("idref4").innerHTML.trim();

    //referees(ref1, "45%", "41%");
    //referees(ref2, "45%", "15%");
    //referees(ref3, "45%", "72%");
    //referees(ref4, "45%", "87%");


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


    //var allplayereshome = [];
    loadpostions();
    //loadpostions2();

    function loadpostions() {
        var rect = svg.getElementById("all");
        var pos = rect.getBoundingClientRect();
        var x = 0;
        //console.log("rrrr", pos.left);
        var y = 0;
        //console.log("xxxxxx", parseInt(x.substring(0, x.length - 1)) + avwidth / 100 + "%");
        //console.log("xyyyyy", y);

        var xmlhttp5 = new XMLHttpRequest();

        xmlhttp5.onreadystatechange = function () {

            if (xmlhttp5.readyState == 4 && xmlhttp5.status == 200) {
                var resp = JSON.parse(xmlhttp5.response);

                resp.forEach(function (entry) {
                    var xmlhttp8 = new XMLHttpRequest();
                    var img = null;
                    //console.log("x", x);
                    xmlhttp8.onreadystatechange = function () {

                        if (xmlhttp8.readyState == 4 && xmlhttp8.status == 200) {

                            var resp2 = JSON.parse(xmlhttp8.response);

                            var xmlhttp1 = new XMLHttpRequest();

                            xmlhttp1.onreadystatechange = function () {

                                if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                                    var resp3 = JSON.parse(xmlhttp1.response);
                                    //console.log("pos", resp3);

                                    if (resp3.Designation == 'Defesa') {
                                        if (ndefesefull == 0) {
                                            img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                            x = x + (svgwidth / 30);
                                            //x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";
                                            //console.log("xxxxxx", x);
                                            //if (x >= svgwidth - 50) {
                                            //    y = y + 50;
                                            //    x = pos.left + 10;
                                            //}
                                            playersnotplaying[playersnotplaying.length] = img;
                                        } else {
                                            img = PhotoonSvg(resp2.Id, resp2.Photo, middledefensex, middledefensey * ndefensehome + movey);

                                            --ndefesefull;
                                            ++ndefensehome;
                                            allplayershome[allplayershome.length] = img;
                                            // movedowndefense += (svgheight / defense) / 2;
                                        }

                                    } else if (resp3.Designation == 'Medio') {

                                        if (nmiddlefull == 0) {
                                            img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                            x = x + (svgwidth / 30);
                                            //x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";
                                            //x = x + 50;
                                            //if (x >= svgwidth - 50) {
                                            //    y = y + 50;
                                            //    x = pos.left + 10;
                                            //}
                                            playersnotplaying[playersnotplaying.length] = img;
                                        } else {

                                            img = PhotoonSvg(resp2.Id, resp2.Photo, middlex, middley * nmiddlehome + movey);
                                            ++nmiddlehome;
                                            --nmiddlefull;
                                            allplayershome[allplayershome.length] = img;
                                            //movedownmiddle += (svgheight / middle) / 2;
                                        }
                                    } else if (resp3.Designation == 'Ataque') {
                                        if (nstrikerfull == 0) {
                                            img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                            x = x + (svgwidth / 30);
                                            //x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";
                                            //x = x + 50;
                                            //if (x >= svgwidth - 50) {
                                            //    y = y + 50;
                                            //    x = pos.left + 10;
                                            //}
                                            playersnotplaying[playersnotplaying.length] = img;
                                        } else {
                                            img = PhotoonSvg(resp2.Id, resp2.Photo, middlestrikerx, middlestrikery * nstrikerhome + movey);
                                            ++nstrikerhome;
                                            --nstrikerfull;
                                            allplayershome[allplayershome.length] = img;
                                            //movedownstriker += (svgheight / striker) / 2;
                                        }
                                    } else {
                                        if (ngkfull == 0) {
                                            img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                            x = x + (svgwidth / 30);
                                            //x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";
                                            //x = x + 50;
                                            //if (x >= svgwidth - 50) {
                                            //    y = y + 50;
                                            //    x = pos.left + 10;
                                            //}
                                            playersnotplaying[playersnotplaying.length] = img;
                                        } else {
                                            img = PhotoonSvg(resp2.Id, resp2.Photo, middlegkx, middlegky + movey);
                                            --ngkfull;
                                            allplayershome[allplayershome.length] = img;
                                        }
                                    }
                                    
                                }
                            }
                            if (entry.IdPosition == 0) {
                                img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                console.log("x1", x);
                                x = x + (svgwidth / 20);
                                //x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";
                                //x = x + 50;
                                //if (x >= svgwidth - 50) {
                                //    y = y + 50;
                                //    x = pos.left + 10;
                                //}
                                //allplayershome[allplayershome.length] = img;
                                playersnotplaying[playersnotplaying.length] = img;
                            } else {
                                xmlhttp1.open("GET", "/SetUp/GetPosition?id=" + entry.IdPosition, true);
                                xmlhttp1.send();
                            }
                        }

                    };
                    xmlhttp8.open("GET", "/Team/GetPlayer?id=" + entry.IdPlayer, true);
                    xmlhttp8.send();
                });
            }
        };
        var idq = document.getElementById("idteamclub").innerHTML;
        var dataq = document.getElementById("idteamdata").innerHTML;
        xmlhttp5.open("GET", "/Team/GetPlayersByTeam?date=" + dataq + "&idclub=" + idq, true);
        xmlhttp5.send();
    }
















    //console.log(document.getElementById("svgmain").appendChild(circles));
    //var xmlhttp = new XMLHttpRequest();

    //xmlhttp.onreadystatechange = function () {

    //    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //        var resp = JSON.parse(xmlhttp.response);
    //        var rect = svg.getElementById("all");
    //        var pos = rect.getBoundingClientRect();
    //        var x = pos.left;
    //        var y = pos.top;
    //        resp.forEach(function (entry) {
    //            var imgadd = PhotoonSvg(entry.Id, entry.Photo, x, y);
    //            x = x + 50;
    //            if (x >= ((pos.right - pos.left) / 2) - 50) {
    //                y = y + 50;
    //                x = pos.left;
    //            }
    //            allplayereshome[allplayereshome.length] = imgadd;
    //        });
    //    }

    //};
    //var idequipa = document.getElementById("iddetailssetup_idvisitor").innerHTML;
    //var dataequipa = document.getElementById("iddetailssetup_datevisitor").innerHTML;
    //xmlhttp.open("GET", "/SetUp/GetPlayers?id=" + idequipa + "&dateq=" + dataequipa, true);
    //xmlhttp.send();


    //var xmlhttp2 = new XMLHttpRequest();

    //xmlhttp2.onreadystatechange = function () {

    //    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
    //        var resp2 = JSON.parse(xmlhttp2.response);
    //        var rect = svg.getElementById("all");
    //        var pos = rect.getBoundingClientRect();
    //        var x = ((pos.right - pos.left) / 2);
    //        var y = pos.top;
    //        resp2.forEach(function (entry) {
    //            var img = PhotoonSvg(entry.Id, entry.Photo, x, y);
    //            x = x + 50;
    //            if (x >= svgwidth - 50) {
    //                y = y + 50;
    //                x = ((pos.right - pos.left) / 2);
    //            }
    //            allplayereshome[allplayereshome.length] = img;
    //        });
    //    }
    //};
    //idequipa = document.getElementById("iddetailssetup_idagainst").innerHTML;
    //dataequipa = document.getElementById("iddetailssetup_dateagainst").innerHTML;
    //xmlhttp2.open("GET", "/SetUp/GetPlayers?id=" + idequipa + "&dateq=" + dataequipa, true);
    //xmlhttp2.send();


    //var svg = a.contentDocument;
    //svg = document;
    svg.oncontextmenu = function (ev) {
        ev.preventDefault();
        return false;
    }
    //var sss = svg.documentElement + svg.documentElement.innerHTML;
    //console.log("svg", sss);

    //var svgheight = 682;// = a.getBoundingClientRect().height;

    //var svgwidth = 1018;///a.getBoundingClientRect().width;
    //console.log("with", svgwidth);
    //console.log("height", svgheight);


    var xposdetails = "40%";//(svgwidth / 2) - 50;
    var yposdetails = "10%";//(svgheight / 2) - 200;




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

        if (IsOccupied(savepositions, allplayershome)) {
            return nextposition(mx, my, formati);
        }
        return savepositions;
    }

    //var allcircles = [];
    var tempimages = [];

    //function createcircle(xx, yy) {
    //    console.log("create circles" , xx , yy);
    //    var circles = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    //    circles.setAttribute("cx", xx);
    //    circles.setAttribute("cy", yy);
    //    circles.setAttribute("fill", "#ffffff");
    //    circles.setAttribute("stroke", "#000000");
    //    circles.setAttribute("r", 15);
    //    circles.setAttribute("id", "circ");
    //    svg.getElementById("all").appendChild(circles);
    //    allcircles[allcircles.length] = circles;
    //}

    function removeTempImages() {
        for (var i = 0; i < tempimages.length; i++) {
            svg.getElementById("all").removeChild(tempimages[i]);
        }
        movedowndefense = 0;
    }

    //function removecircles(circles) {
    //    console.log("remove circles");
    //    for (var i = 0; i < circles.length; ++i) {
    //        svg.getElementById("all").removeChild(circles[i]);
    //    }
    //}







    //FillTimeLine();


    var showdetails = [];

    function removedetails() {
        for (var i = 0; i < showdetails.length; ++i) {
            svg.getElementById("all").removeChild(showdetails[i]);
        }
        showdetails = [];
    }




    function createcircles(idp, ide, x, y) {

        var circles = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circles.setAttribute("cx", x);
        circles.setAttribute("cy", y);
        circles.setAttribute("fill", "#ffffff");
        circles.setAttribute("stroke", "#000000");
        circles.setAttribute("r", "1%");
        circles.setAttribute("id", "circ" + y);
        showdetails[showdetails.length] = circles;
        circles.onclick = function () {
            console.log("circles");
            var circlesinside = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circlesinside.setAttribute("cx", (circles.getAttributeNS(null, 'cx')));
            circlesinside.setAttribute("cy", (circles.getAttributeNS(null, 'cy')));
            circlesinside.setAttribute("fill", "#000000");
            circlesinside.setAttribute("stroke", "#000000");
            circlesinside.setAttribute("r", "0.8%");
            circlesinside.setAttribute("id", "circcc");
            svg.getElementById("all").appendChild(circlesinside);
            showdetails[showdetails.length] = circlesinside;
            if (ide != null) {
                //saveplayer.idexe = null;
                saveplayer.event = ide;
                saveplayer.idplayer = idp;
            } else {
                saveplayer.idexe = idp;
                console.log("clickotherteam");
            }
            console.log("saveplayers", saveplayer);
        };
        svg.getElementById("all").appendChild(circles);
    }





    function PhotoonSvg(id, photo, posx, posy) {
        var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        console.log("dfa", svgheight / 9);
        console.log("dfa", svgwidth / 16);
        svgimg.setAttributeNS(null, 'height', "10%");
        svgimg.setAttributeNS(null, 'width', "10%");
        svgimg.setAttributeNS(null, 'id', id);
        svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', "../fonts/" + photo);
        svgimg.setAttributeNS(null, 'x', posx);
        svgimg.setAttributeNS(null, 'y', posy);
        svgimg.setAttributeNS(null, 'visibility', 'visible');
        svg.getElementById("all").appendChild(svgimg);
        console.log("add photo");
        svgimg.onclick = function (ev) {



            console.log("click");
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
                    //svgimgsub.setAttributeNS(null, 'id', 'capel4');
                    svgimgsub.setAttributeNS('http://www.w3.org/1999/xlink', 'href', "../fonts/" + resp.Photo);
                    svgimgsub.setAttributeNS(null, 'x', xposdetails);
                    svgimgsub.setAttributeNS(null, 'y', yposdetails);
                    svgimgsub.setAttributeNS(null, 'visibility', 'visible');
                    showdetails[showdetails.length] = svgimgsub;
                    svg.getElementById("all").appendChild(svgimgsub);


                    var substringedDate = resp.Born.substring(6); //substringedDate= 1291548407008)/
                    var parsedIntDate = parseInt(substringedDate); //parsedIntDate= 1291548407008
                    var date = new Date(parsedIntDate);
                    console.log("resp", date.toDateString());
                    //var jsonText = JsonConvert.SerializeObject(resp.Born, new IsoDateTimeConverter());
                    createLabels("Nome: " + resp.Name, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 0.5 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 22 + "%");
                    createLabels("Nasceu: " + date.toDateString(), parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 0.3 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 26 + "%");
                    createLabels("Altura: " + resp.Height, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 0.3 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 30 + "%");
                    createLabels("Peso: " + resp.Weight, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 0.3 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 34 + "%");

                    


                }
            };

            xmlhttp8.open("GET", "/SetUp/GetPlayer?id=" + id, true);
            xmlhttp8.send();


        };
        return svgimg;
    }

    function createLabels(name, xpos, ypos) {
        var txtElem = document.createElementNS('http://www.w3.org/2000/svg', "text");

        txtElem.setAttributeNS(null, "x", xpos);
        txtElem.setAttributeNS(null, "y", ypos);
        txtElem.setAttributeNS(null, "font-size", avwidth / 8 + "%");
        //txtElem.setAttributeNS(null, 'cursor', 'pointer');
        var helloTxt = document.createTextNode(name);

        txtElem.appendChild(helloTxt);
        showdetails[showdetails.length] = txtElem;
        svg.getElementById("all").appendChild(txtElem);
        return txtElem;

    }






    var OldCoor = {};
    var PosToMove = [];
    var aPosToMove = [];


    function IsInPositonRange(x, y) {
        console.log("postomove", PosToMove);
        console.log("postomovexx", x);
        console.log("postomoveyy", y);
        for (var i = 0; i < PosToMove.length; ++i) {
            if (x <= PosToMove[i].x + 50 && y <= PosToMove[i].y + 50) {
                return true;
            }
        }
        return false;
    }



    //SVGDocument = svg;
    //SVGRoot = SVGDocument.documentElement;
    TrueCoords = SVGRoot.createSVGPoint();
    GrabPoint = SVGRoot.createSVGPoint();

    var currpos;

    BackDrop = svg.getElementById('all');




    function PutTempImages(full, f, s, t) {
        var next;

        for (var i = 0; i < full; ++i) {

            next = nextposition(f, s, t);
            PosToMove[PosToMove.length] = next;
            //createcircle(next.x, next.y);
            console.log("next", next);
            tempimages[tempimages.length] = PhotoonSvg(null, "empty.jpg", next.x, next.y);
        }
    }


    var timer = 200;//miliseconds
    var isclick = true;
    var functimer = null;
    var oldtarget = null;


    function removePhoto(id) {
        whereplayeres.forEach(function (entry) {
            if (id == entry.getAttributeNS(null, id)) {
                svg.getElementById("all").remove(entry);
            }
        });
    }



    SVGDocument.onmousedown = function (evt) {
        
        
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
            return;
        }
        console.log("call tempimages");

        OldCoor.x = targetElement.getAttributeNS(null, 'x');
        OldCoor.y = targetElement.getAttributeNS(null, 'y');
        OldCoor.id = targetElement.getAttributeNS(null, 'id');
        console.log("oldcoor", OldCoor);
        functimer = setTimeout(
            function CreateTempImages() {
                console.log("evttt", evt);
                functimer = null;
                isclick = true;
                console.log("createtempimges");
                tempimages = [];


                OldCoor.x = targetElement.getAttributeNS(null, 'x');
                OldCoor.y = targetElement.getAttributeNS(null, 'y');
                OldCoor.id = targetElement.getAttributeNS(null, 'id');
                var xmlhttp4 = new XMLHttpRequest();

                xmlhttp4.onreadystatechange = function () {

                    if (xmlhttp4.readyState == 4 && xmlhttp4.status == 200) {
                        var resp = JSON.parse(xmlhttp4.response);
                        var pos = resp.Designation;
                        var next;
                        currpos = pos;
                        if (pos == "Defesa") {
                            console.log("defesa");

                            //if (evt.clientX >= halfposition) {
                            //    PutTempImages(andefesefull, amiddledefensex, amiddledefensey, adefense);
                            //} else {
                            //PutTempImages(ndefesefull, middledefensex, middledefensey, defense);

                            //}
                            //ndefensehome = indefense;
                            for (var i = 0; i < ndefesefull; ++i) {
                                //if (evt.clientX >= halfposition) {
                                //    next = nextposition(amiddledefensex, amiddledefensey, adefense);
                                //} else {
                                    //next = nextposition(middledefensex, middledefensey, defense);
                                //}
                                if (!IsImageInPosition(allplayershome,middledefensex, middledefensey * ndefensehome + movey)) {


                                    var o = {};
                                    o.x = middledefensex;
                                    o.y = middledefensey * ndefensehome + movey;
                                    //++ndefensehome;
                                    PosToMove[PosToMove.length] = o;
                                    //createcircle(next.x, next.y);
                                    tempimages[tempimages.length] = PhotoonSvg(null, "empty.jpg", o.x, o.y);
                                } else {
                                    --i;
                                }
                                ++ndefensehome;
                            }
                            //ndefensehome = 0;
                            
                        } else if (pos == "Medio") {

                            //if (evt.clientX >= halfposition) {
                            //    PutTempImages(anmiddlefull, amiddlex, amiddley, amiddle);
                            //} else {
                                //PutTempImages(nmiddlefull, middlex, middley, middle);
                            //}
                            nmiddlehome = inmiddle;
                            for (var i = 0; i < nmiddlefull; ++i) {
                                //if (evt.clientX >= halfposition) {
                                //    next = nextposition(amiddlex, amiddley, amiddle);
                                //} else {
                                    //next = nextposition(middlex, middley, middle);
                                //}
                                //next = nextposition(middlex, middley, middle);
                                if (!IsImageInPosition(allplayershome,middlex, middley * nmiddlehome + movey)) {
                                    var o = {};
                                    o.x = middlex;
                                    o.y = middley * nmiddlehome + movey;
                                    //++nmiddlehome;
                                    PosToMove[PosToMove.length] = o;
                                    tempimages[tempimages.length] = PhotoonSvg(null, "empty.jpg", o.x, o.y);
                                } else {
                                    --i;
                                }
                                ++nmiddlehome;
                            }
                            //ndefensehome = 0;
                        } else if (pos == "Ataque") {
                            nstrikerhome = instriker;
                            for (var i = 0; i < nstrikerfull; ++i) {
                                if (!IsImageInPosition(allplayershome,middlestrikerx, middlestrikery * nstrikerhome + movey)) {
                                    var o = {};
                                    o.x = middlestrikerx;
                                    o.y = middlestrikery * nstrikerhome + movey;
                                    //++nstrikerhome;
                                    PosToMove[PosToMove.length] = o;
                                    tempimages[tempimages.length] = PhotoonSvg(null, "empty.jpg", o.x, o.y);
                                } else {
                                    --i;
                                }
                                ++nstrikerhome;
                            }
                            //if (evt.clientX >= halfposition) {
                            //    PutTempImages(anstrikerfull, amiddlestrikerx, amiddlestrikery, astriker);
                            //} else {
                                //PutTempImages(nstrikerfull, middlestrikerx, middlestrikery, striker);
                            //}

                            //for (var i = 0; i < nstrikerfull; ++i) {

                            //    if (evt.clientX >= halfposition) {
                            //        next = nextposition(amiddlestrikerx, amiddlestrikery, astriker);
                            //    } else {
                            //        console.log("middlestrikerx", middlestrikerx);
                            //        next = nextposition(middlestrikerx, middlestrikery, striker);
                            //    }

                            //    //next = nextposition(middlestrikerx, middledefensey, striker);
                            //    PosToMove[PosToMove.length] = next;
                            //    //createcircle(next.x, next.y);
                            //    tempimages[tempimages.length] = PhotoonSvg(null, "empty.jpg", next.x, next.y);
                            //}
                            //ndefensehome = 0;
                        } else if (pos == "Guarda-redes") {
                            if (ngkfull == 0)return;
                            //allcircles = [];
                            //if (evt.clientX >= middlex) {
                            //    next = nextposition(amiddlegkx, amiddlegky, agk);
                            //} else {
                                //next = nextposition(middlegkx, middlegky, gk);
                            //}
                            //next = nextposition(middlegkx, middlegky, 1);
                            //PosToMove[PosToMove.length] = next;
                            //createcircle(next.x, next.y);
                            var o = {};
                            o.x = middlegkx;
                            o.y = middlegky + movey;
                            //++ngkhome;
                            PosToMove[PosToMove.length] = o;
                            tempimages[tempimages.length] = PhotoonSvg(null, "empty.jpg", o.x, o.y);
                        }
                        //movedowndefense = 0;
                    }
                }

                xmlhttp4.open("GET", "/SetUp/GetPlayerPosition?id=" + targetElement.id, true);
                xmlhttp4.send();

        if (BackDrop != targetElement) {

            DragTarget = targetElement;

            DragTarget.parentNode.appendChild(DragTarget);
            DragTarget.setAttributeNS(null, 'pointer-events', 'none');
            var transMatrix = DragTarget.getCTM();
            
            //console.log("transMatrix", transMatrix);
            //console.log("BackDrop != targetElement", TrueCoords.x);
            //console.log("BackDrop != targetElement", TrueCoords.y);
            GrabPoint.x = TrueCoords.x;//- Number(transMatrix.e);
            GrabPoint.y = TrueCoords.y; //- Number(transMatrix.f);
            //console.log("BackDrop != targetElement", GrabPoint.x);
            //console.log("BackDrop != targetElement", GrabPoint.y);
        }
            }
            , timer);

    };
    SVGDocument.onmousemove = function (evt) {
        GetTrueCoords(evt);
        if (DragTarget) {
            var newX = TrueCoords.x - GrabPoint.x;
            var newY = TrueCoords.y - GrabPoint.y;
            //console.log("SVGDocument.onmousemove", newX);
            //console.log("SVGDocument.onmousemove", newY);
            //DragTarget.setAttributeNS(null, 'x', newX);
            //DragTarget.setAttributeNS(null, 'y', newY);
            DragTarget.setAttributeNS(null, 'transform', 'translate(' + newX + ',' + newY + ')');
        }
    };

    function whitchcircle(ev) {
        for (var i = 0; i < tempimages.length; ++i) {
            var circx = tempimages[i].getAttributeNS(null, 'x');
            var circy = tempimages[i].getAttributeNS(null, 'y');
            if ((ev.clientX < parseInt(circx) + 50) && (ev.clientX > parseInt(circx) - 50) && (ev.clientY < parseInt(circy) + 50) && (ev.clientY > parseInt(circy) - 50)) {
                return tempimages[i];
            }
        }
        return null;
    }

    function IsImageInPosition(arr , x, y) {
        //console.log("isimage", allplayershome);
        //console.log("isimagex", x);
        //console.log("isimagey", y);
        for (var i = 0; i < arr.length; ++i) {
            var coorx = arr[i].getAttributeNS(null, "x");
            var coory = arr[i].getAttributeNS(null, "y");
            //console.log("cox", coorx);
            //console.log("coy", coory);
            //console.log("x", x);
            //console.log("y", y);
            //x + (svgwidth / 20)
            if (x <= parseInt(coorx) + (svgwidth / 20) && x >= parseInt(coorx) - (svgwidth / 20) && y <= parseInt(coory) + (svgwidth / 20) && y >= parseInt(coory) - (svgwidth / 20)) {
                return arr[i];
            }
        }
        return null;
    }


    function replace(oldimg, newimg) {
        for (var i = 0; i < allplayershome.length; ++i) {
            if (allplayershome[i] == oldimg) {
                allplayershome[i] = newimg;
            }
        }
    }



    SVGDocument.onmouseup = function (evt) {

        if (evt.which == 3) {

            return false;
        }
        //if (oldtarget == evt.target) {
        //    removedetails();
        //}
        if (functimer) {
            console.log("clickkffk");
            clearTimeout(functimer);
            console.log("qqqq", evt.target);

            return true;
            // run click-only operation here
        }
        if (DragTarget == null) {
            console.log("mouseuuuup");
            return;
        }
        // Otherwise, if the mouse was being held, end the hold
        //else if (isclick) {
        isclick = false;
        // end hold-only operation here, if desired
        //}
        console.log("up", evt.target.nodeName);
        if (evt.target.nodeName != 'image') {
            console.log("up");
            DragTarget.setAttributeNS(null, 'x', OldCoor.x);
            DragTarget.setAttributeNS(null, 'y', OldCoor.y);
            DragTarget.setAttributeNS(null, 'transform', "");
            DragTarget.setAttributeNS(null, 'pointer-events', 'all');
            nmiddlehome = 1;
            ndefensehome = 1;
            nstrikerhome = 1;
            DragTarget = null;
            removeTempImages();
            return;
        }
        if (evt.target.nodeName == 'circle') {
            console.log("aaaaa");
            return;
        }

        //|| GrabPoint.x > halfposition && DragTarget.getAttributeNS(null, 'x') < halfposition
        //        || GrabPoint.x < halfposition && DragTarget.getAttributeNS(null, 'x') > halfposition
        //    ||evt.clientY<150

        //if (evt.target.nodeName != 'image') {

        //    console.log("first");
        //    console.log("GrabPoint.x", GrabPoint.x);
        //    console.log("middlex", middlex);
        //    console.log("DragTarget.getAttributeNS(null, 'x')", DragTarget.getAttributeNS(null, 'x'));
        //    DragTarget.setAttributeNS(null, 'x', OldCoor.x);
        //    DragTarget.setAttributeNS(null, 'y', OldCoor.y);
        //    DragTarget.setAttributeNS(null, 'transform', "");
        //    DragTarget.setAttributeNS(null, 'pointer-events', 'all');

        //    DragTarget = null;
        //    removeTempImages();
        //    return;
        //}

        var oldimg = IsImageInPosition(allplayershome,evt.clientX, evt.clientY);

        if (oldimg != null) {
            console.log("second");

            console.log("oldcoor", OldCoor);
            console.log("oldimg", oldimg);
            DragTarget.setAttributeNS(null, 'x', oldimg.getAttributeNS(null, "x"));
            DragTarget.setAttributeNS(null, 'y', oldimg.getAttributeNS(null, "y"));
            DragTarget.setAttributeNS(null, 'transform', "");
            DragTarget.setAttributeNS(null, 'pointer-events', 'all');

            oldimg.setAttributeNS(null, 'x', OldCoor.x);
            oldimg.setAttributeNS(null, 'y', OldCoor.y);
            oldimg.setAttributeNS(null, 'transform', "");
            oldimg.setAttributeNS(null, 'pointer-events', 'all');

            
            removeElemFromArray(allplayershome, oldimg);
            removeElemFromArray(playersnotplaying, oldimg);
            allplayershome[allplayershome.length] = DragTarget;
            playersnotplaying[playersnotplaying.length] = DragTarget;
            //replace(oldimg, DragTarget);
            //whereplayeres[whereplayeres.length] = DragTarget;
            removeTempImages();
            nmiddlehome = 1;
            ndefensehome = 1;
            nstrikerhome = 1;
            DragTarget = null;
            return;
        }


        if (!IsInPositonRange(evt.clientX, evt.clientY)) {
            //var cenas = svg.getElementById(OldCoor.id);
            //cenas.setAttributeNS(null, 'x', OldCoor.x);
            //cenas.setAttributeNS(null, 'y', OldCoor.y);
            console.log("third");
            DragTarget.setAttributeNS(null, 'x', OldCoor.x);
            DragTarget.setAttributeNS(null, 'y', OldCoor.y);
            DragTarget.setAttributeNS(null, 'transform', "");
            DragTarget.setAttributeNS(null, 'pointer-events', 'all');

            DragTarget = null;
            removeTempImages();
            
            return;
        }

        if (DragTarget) {
            console.log("four");
            DragTarget.setAttributeNS(null, 'pointer-events', 'all');
            var upcircle = whitchcircle(evt);

            DragTarget.setAttributeNS(null, 'x', upcircle.getAttributeNS(null, "x"));
            DragTarget.setAttributeNS(null, 'y', upcircle.getAttributeNS(null, "y"));
            DragTarget.setAttributeNS(null, 'transform', "");

            allplayershome[allplayershome.length] = DragTarget;
            removeElemFromArray(playersnotplaying, DragTarget);

            console.log("atribute", DragTarget.getAttributeNS(null, 'x'));
            if (currpos == "Defesa") {
                //if (DragTarget.getAttributeNS(null, 'x') < halfposition) {
                //    console.log("ndefesefull", ndefesefull);
                ndefesefull--;
                //ndefensehome ++;
                indefense++;
                //} else {
                //    console.log("andefesefull", ndefesefull);
                //    andefesefull--;
                //}
            } else if (currpos == "Medio") {
                //if (DragTarget.getAttributeNS(null, 'x') < halfposition) {
                nmiddlefull--;
                inmiddle++;
                //nmiddlehome++;
                //} else {
                //    anmiddlefull--;
                //}
            } else if (currpos == "Ataque") {
                //if (DragTarget.getAttributeNS(null, 'x') < halfposition) {
                nstrikerfull--;
                instriker++;
                //nstrikerhome++;
                //} else {
                //    anstrikerfull--;
                //}
            } else if (currpos == "Guarda-redes") {
                //if (DragTarget.getAttributeNS(null, 'x') < halfposition) {
                ngkfull--;
                
                //} else {
                //    angkfull--;
                //}
            }
            DragTarget = null;
            movedowndefense = 0;
            amovedowndefense = 0;
            nmiddlehome = 1;
            ndefensehome = 1;
            nstrikerhome = 1;
            removeTempImages();
        }

    };

    function removeElemFromArray(arr , elem) {
        for (var i = 0; i < arr.length ; i++) {
            if (arr[i] == elem) {
                arr.splice(i, 1);
            }
        }
    }


    function GetTrueCoords(evt) {
        
        TrueCoords.x = evt.clientX;
        TrueCoords.y = evt.clientY;
        //console.log("GetTrueCoords", TrueCoords.x);
        //console.log("GetTrueCoords", TrueCoords.y);
        //console.log("GetTrueCoords", evt.clientX);
        //console.log("GetTrueCoords", evt.clientY);
    };





    document.getElementById("idbuttonauto").onclick = function (ev) {
        for (var i = 0; i < playersnotplaying.length; ++i) {
            callplayer(playersnotplaying[i]);
        }
    }
    function callplayer(idpla) {
        var xmlhttp5 = new XMLHttpRequest();

        xmlhttp5.onreadystatechange = function () {

            if (xmlhttp5.readyState == 4 && xmlhttp5.status == 200) {
                var resp = JSON.parse(xmlhttp5.response);
                var pos = resp.Designation;


                if (pos == "Defesa") {
                    if (ndefesefull == 0) return;
                    if (IsImageInPosition(allplayershome,middledefensex, middledefensey * ndefensehome + movey)) {
                        movedowndefense += (svgheight / defense) / 6;
                        ++ndefensehome;
                        return callplayer(idpla);
                    }
                    //img = PhotoonSvg(resp2.Id, resp2.Photo, middledefensex, middledefensey * ndefensehome + movey);

                    //--ndefesefull;
                    //PutInPosition(middledefensex, middledefensey, movedowndefense, idpla);
                    console.log("vvvvv", middledefensey);
                    console.log("vvvvvvvv", movey);
                    console.log("vvvvvvvvvvv", ndefensehome);
                    idpla.setAttributeNS(null, 'x', middledefensex);
                    idpla.setAttributeNS(null, 'y', middledefensey * ndefensehome + movey);
                    allplayershome[allplayershome.length] = idpla;
                    removeElemFromArray(playersnotplaying, idpla);
                    ++ndefensehome;
                    --ndefesefull;
                    movedowndefense += (svgheight / defense) / 6;

                }
                if (pos == "Medio") {

                    if (nmiddlefull == 0) return;
                    if (IsImageInPosition(allplayershome,middlex, middley * nmiddlehome + movey)) {
                        movedownmiddle += (svgheight / middle) / 6;
                        ++nmiddlehome;
                        return callplayer(idpla);
                    }
                    idpla.setAttributeNS(null, 'x', middlex);
                    idpla.setAttributeNS(null, 'y', middley * nmiddlehome + movey);
                    ++nmiddlehome;
                    allplayershome[allplayershome.length] = idpla;
                    removeElemFromArray(playersnotplaying, idpla);
                    //PutInPosition(middlex, middley, movedownmiddle, idpla);

                    --nmiddlefull;

                    movedownmiddle += (svgheight / middle) / 6;

                }
                if (pos == "Ataque") {


                    if (nstrikerfull == 0) return;
                    if (IsImageInPosition(allplayershome,middlestrikerx, middlestrikery * nstrikerhome + movey)) {
                        movedownstriker += (svgheight / striker) / 6;
                        ++nstrikerhome;
                        return callplayer(idpla);
                    }
                    idpla.setAttributeNS(null, 'x', middlestrikerx);
                    idpla.setAttributeNS(null, 'y', middlestrikery * nstrikerhome + movey);
                    ++nstrikerhome;
                    //PutInPosition(middlestrikerx, middlestrikery, movedownstriker, idpla);
                    allplayershome[allplayershome.length] = idpla;
                    removeElemFromArray(playersnotplaying, idpla);
                    --nstrikerfull;
                    movedownstriker += (svgheight / striker) / 6;

                }
                if (pos == "Guarda-redes") {

                    if (ngkfull == 0) return;
                    if (IsImageInPosition(allplayershome,middlegkx, middlegky + movey)) {
                        return callplayer(idpla);
                    }
                    idpla.setAttributeNS(null, 'x', middlegkx);
                    idpla.setAttributeNS(null, 'y', middlegky + movey);
                    //PutInPosition(middlegkx, middlegky, 0, idpla);
                    allplayershome[allplayershome.length] = idpla;
                    removeElemFromArray(playersnotplaying, idpla);
                    --ngkfull;
                }
            }
        };


        xmlhttp5.open("GET", "/SetUp/GetPlayerPosition?id=" + idpla.getAttributeNS(null, 'id'), true);
        xmlhttp5.send();
    }

    function PutInPosition(x, y, move, idpla) {
        //console.log("x", x);
        //console.log("y", y);
        //console.log("move", move);
        //console.log("idpla", idpla);
        //if (full == 0) return;
        //--full;
        idpla.setAttributeNS(null, 'x', x);
        idpla.setAttributeNS(null, 'y', y + move);
        //move += (svgheight / npos) / 2;
        whereplayeres[whereplayeres.length] = idpla;
    }

    



    document.getElementById("idbuttonreset").onclick = function (ev) {

        var rect = svg.getElementById("all");
        var pos = rect.getBoundingClientRect();
        var x = 0;
        var y = 0;
        console.log("allplayershome", allplayershome);
        allplayershome.forEach(function again(entry) {
            console.log("x", x);

            var o = {};
            o.x = x;
            o.y = y;
            if(IsOccupied(o , playersnotplaying)){
            //if (IsImageInPosition(playersnotplaying, x, y)) {
                //x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";

                x = x + (svgwidth / 20);
                //console.log("entry2", entry);
                return again(entry);
            } else {

                entry.setAttributeNS(null, 'x', x);
                entry.setAttributeNS(null, 'y', y);
                console.log("entry", entry);
                
                //x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";
                //if (x >= svgwidth - 50) {
                //    y = y + 50;
                //    x = pos.left + 10;
                //}
                //removeElemFromArray(allplayershome, entry);
                playersnotplaying[playersnotplaying.length] = entry;
                x = x + (svgwidth / 20);
                //console.log("entry", entry);
            }
        });
        movedowndefense = 0;
        movedownmiddle = 0;
        movedownstriker = 0;

        ndefesefull = defense;
        nmiddlefull = middle;
        nstrikerfull = striker;
        ngkfull = gk;
        ndefensehome = 1;
        nmiddlehome = 1;
        nstrikerhome = 1;
        allplayershome = [];
    };

  
    document.getElementById("idbuttonsave").onclick = function (ev) {

        var idclub = document.getElementById("idteamclub").innerHTML;
        var date = document.getElementById("idteamdata").innerHTML;

        if (allplayershome.length < 7)return;
        allplayershome.forEach(function (entry) {
            
            var imgx = entry.getAttributeNS(null, 'x');
            console.log("imgx", imgx);
            var pos;
            if (entry.getAttributeNS(null, 'y') > movey) {
                if (imgx == middlegkx) {
                    pos = 1;
                    console.log("imgxeerrre", imgx);
                } else {
                    if (imgx == middledefensex) {
                        pos = 2;
                    } else if (imgx == middlex) {
                        pos = 3;
                    } else if (imgx == middlestrikerx) {
                        pos = 4;
                    }
                }

            } else {
                pos = null;
            }
            console.log("entryyy", entry, pos);
            savePlayers(idclub, date, entry.getAttributeNS(null, 'id'), pos);

        });
    }
    function savePlayers(idclub, date, idplayer, idposition) {
        var xmlhttp6 = new XMLHttpRequest();
        xmlhttp6.onreadystatechange = function () {

            if (xmlhttp6.readyState == 4 && xmlhttp6.status == 200) {

            }
        };
        xmlhttp6.open("POST", "/Team/UpdateIntegrate", true);
        xmlhttp6.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");

        xmlhttp6.send("idclub=" + idclub + "&date=" + date + "&idplayer=" + idplayer + "&idposition=" + idposition);
    }

    


};

