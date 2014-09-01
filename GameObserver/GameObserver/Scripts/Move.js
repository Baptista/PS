﻿
//// Load the Visualization API and the piechart package.
//google.load('visualization', '1.0', { 'packages': ['corechart'] });

//// Set a callback to run when the Google Visualization API is loaded.
//google.setOnLoadCallback(drawChart);
//// Callback that creates and populates a data table,
//// instantiates the pie chart, passes in the data and
//// draws it.
//function drawChart() {
//    //var mainarr = [];
//    //var xmlhttp = new XMLHttpRequest();

//    //xmlhttp.onreadystatechange = function() {

//    //    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//    //        var resp2 = JSON.parse(xmlhttp.response);
//    //        resp2.forEach(function(entry) {
//    //            var objarr = [];
//    //            var xmlhttp1 = new XMLHttpRequest();
//    //            xmlhttp1.onreadystatechange = function() {

//    //                if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
//    //                    var resp3 = JSON.parse(xmlhttp1.response);

//    //                }
//    //            };
//    //            xmlhttp1.open("GET", "/SetUp/GetOpinionByEvent?idstadium=" + idstadium + "&datahora=" + datahora + "&datavisitor=" + dataequipav + "&idvisitor=" + idequipav +
//    //                    "&dataagainst=" + dataequipag + "&idagainst=" + idequipag + "&iduser=" + document.getElementById("curruserid").innerHTML.trim() + "&idevent=" + entry.Id + "&negative=yes");
//    //            xmlhttp1.send();
//    //        });
//    //    }
//    //};

//    //xmlhttp.open("GET", "/SetUp/GetEvents", true);
//    //xmlhttp.send();
//    console.log("")
//    // Create the data table.
//    var data = new google.visualization.DataTable();
//    data.addColumn('string', 'Topping');
//    data.addColumn('number', 'Slices');
//    data.addRows([
//      ['Mushrooms', 3],
//      ['Onions', 1]
//      //['Olives', 1],
//      //['Zucchini', 1],
//      //['Pepperoni', 2]
//    ]);

//    // Set chart options
//    var options = {
//        //'title': 'How Much Pizza I Ate Last Night',
//        'width': window.screen.availWidth / 4,
//        'height': window.screen.availHeight / 4
//    };

//    // Instantiate and draw our chart, passing in some options.
//    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
//    chart.draw(data, options);
//}

(function(window, document, undefined) {


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

    //////////////////////////////////////////////
    var idequipav = document.getElementById("iddetailssetup_idvisitor").innerHTML.trim();
    var dataequipav = document.getElementById("iddetailssetup_datevisitor").innerHTML.trim();
    var idequipag = document.getElementById("iddetailssetup_idagainst").innerHTML.trim();
    var dataequipag = document.getElementById("iddetailssetup_dateagainst").innerHTML.trim();
    var idstadium = document.getElementById("iddetailssetup_idstadium").innerHTML.trim();
    var datahora = document.getElementById("iddetailssetup_date").innerHTML.trim();
    var isAdmin = document.getElementById("isadmin").innerHTML.trim();
    var iduser = document.getElementById("curruserid").innerHTML.trim();
    var isAuth = document.getElementById("havecurruser").innerHTML.trim();
    var idformationhome = null;
    var idformationaway = null;

    
  
    var a = document.getElementById("svgobject");
    var svg = null;
    var svgheight = null;
    var svgwidth = null;

    var avheight = window.innerHeight/1.5;
    var avwidth = window.innerWidth/1.5;
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
    movey = svg.getElementById("uprect").getBoundingClientRect().height / 2;
    var ydown = svg.getElementById("downrect").getBoundingClientRect().height;
    var yhomescore = svg.getElementById("homescore").getBoundingClientRect().height;
    var xhomescore = svg.getElementById("homescore").getBoundingClientRect().width;


    inserirnameclubs(null, "Tempo", "48%", "6%");

    function timernow(dat) {
        //console.log("timecalled");
        var d = new Date();
        ///var hourgame = document.getElementById("iddetailssetup_date").innerHTML.trim().split(" ")[1].split(":");
        return new Date(d - dat).toTimeString().substring(0,8);
        //var newh = Math.abs(d.getHours() - dat.getHours());//* 60;
        //var newm = Math.abs(d.getMinutes() - dat.getMinutes());
        //var news = Math.abs(d.getSeconds() - dat.getSeconds());
        //var timemin = newh +":"+ newm;// + Math.round(news / 60);
        //return timemin + ":" + news;//Math.round(news % 60);
        //inserirnameclubs(timemin + ":" + Math.round(news % 60), halfposition - 20, 20);
    }

    //var t = timernow();
    var txtElem = document.createElementNS("http://www.w3.org/2000/svg", "text");
    txtElem.setAttributeNS(null, "x", "48%");
    txtElem.setAttributeNS(null, "y", "12%");
    txtElem.setAttributeNS(null, "font-size", avwidth/50+"px");
    txtElem.setAttributeNS(null, 'id', "timer");
    var helloTxt = document.createTextNode("00:00:00");
    txtElem.appendChild(helloTxt);
    svg.getElementById("all").appendChild(txtElem);

    var mytimer = null;

    function starttime(dat) {
        mytimer = setInterval(function () {
            var oldtimer = svg.getElementById("timer");
            //console.log("timecalled");
            oldtimer.innerHTML = timernow(dat);
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
            console.log("middledefensey", middledefensey);
            console.log("middledefensey", defense);
            middlex = (svgwidth / 4);
            middley = (yfield / (parseInt(middle) + 1));
            middlestrikery = (yfield / (parseInt(striker) + 1));
            middlestrikerx = ((svgwidth / 4) + (middledefensex));
            console.log("middlestrikerx", middlestrikerx);
            middlegkx = 0;
            middlegky = (yfield / (parseInt(gk) + 1));


        }
    };
    console.log("forma", document.getElementById("iddetailssetup_idvisitor").innerHTML);
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
            console.log("allpositions", aallpostions);
            andefesefull = adefense;
            anmiddlefull = amiddle;
            anstrikerfull = astriker;
            angkfull = 1;


            amiddledefensey = (yfield / (parseInt(adefense) + 1));
            console.log("amiddledefensey", amiddledefensey);
            amiddledefensex = svgwidth - (((svgwidth / 4) / 2))-(svgwidth / 10);
            console.log("amiddledefensex", amiddledefensex);
            console.log("cenas", ((svgwidth / 4)));
            amiddlex = (svgwidth - ((svgwidth / 4))) - (svgwidth / 10);
            console.log("amiddlex", amiddlex);
            amiddley = (yfield / (parseInt(amiddle) + 1));
            console.log("amiddley", amiddley);
            amiddlestrikery = (yfield / (parseInt(astriker) + 1));
            amiddlestrikerx = (svgwidth - ((svgwidth / 4) + (svgwidth - amiddledefensex)));
            console.log("amiddlestrikerx", amiddlestrikerx);
            amiddlegkx = svgwidth-(svgwidth/13);
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
        svgimg.setAttributeNS(null, 'width', avwidth / 18);
        //svgimg.setAttributeNS(null, 'id', id);
        svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', "../fonts/" + photo);
        svgimg.setAttributeNS(null, 'x', posx);
        svgimg.setAttributeNS(null, 'y', posy);
        svgimg.setAttributeNS(null, 'visibility', 'visible');
        svg.getElementById("all").appendChild(svgimg);

    }

    inserirsymbolclubs(document.getElementById("idclubvisitorphoto").innerHTML.trim(), "0", "1%");
    inserirsymbolclubs(document.getElementById("idclubagainstphoto").innerHTML.trim(), "93%", "1%");

    function inserirnameclubs(id, name, xpos, ypos) {

        txtElem = document.createElementNS("http://www.w3.org/2000/svg", "text");

        txtElem.setAttributeNS(null, "x", xpos);
        txtElem.setAttributeNS(null, "y", ypos);
        txtElem.setAttributeNS(null, "font-size", avwidth/8+"%");
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
        
        console.log("counth", all, counthome);
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
        console.log("counta", all, countaway);
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
            //setInterval(function () {
                //timeline.innerHTML="";
                FillTimeLine();
            //}, 5000);
            
        }
    }




    //var allplayereshome = [];
    loadpostions();
    loadpostions2();

    //function GetInstant(idpla) {
    //    var xmlhttp6 = new XMLHttpRequest();

    //    xmlhttp6.onreadystatechange = function () {

    //        if (xmlhttp6.readyState == 4 && xmlhttp6.status == 200) {
    //            var resp = JSON.parse(xmlhttp6.response);
    //            if (resp) {
    //                console.log("ppppppppp");
    //                return true;
    //            }
    //            else { return false; }
    //        }
    //    };


    //    xmlhttp6.open("GET", "/SetUp/HaveRedCard?idstadium=" + idstadium + "&datahora=" + datahora + "&idequipav=" + idequipav + "&dataequipav=" + dataequipav +
    //        "&idequipag=" + idequipag + "&dataequipag=" + dataequipag + "&idp=" + idpla, true);
    //    xmlhttp6.send();
    //}

    var nplayershomeplaying = 0;

    function loadpostions() {
        
        var rect = svg.getElementById("all");
        var pos = rect.getBoundingClientRect();
        var x = "0%";
        //console.log("rrrr", pos.left);
        var y = "88%";
        console.log("xxxxxx", parseInt(x.substring(0, x.length - 1)) + avwidth / 100 + "%");
        console.log("xyyyyy", y);

        var xmlhttp5 = new XMLHttpRequest();

        xmlhttp5.onreadystatechange = function () {

            if (xmlhttp5.readyState == 4 && xmlhttp5.status == 200) {
                var resp = JSON.parse(xmlhttp5.response);

                console.log("ryoyoyoy", resp);
                var totalplayers = resp.length;
                resp.forEach(function (entry) {
                    console.log("yoyoyoy", entry);
                    //var xmlhttp6 = new XMLHttpRequest();

                    //xmlhttp6.onreadystatechange = function() {

                    //    if (xmlhttp6.readyState == 4 && xmlhttp6.status == 200) {

                    //        var resp3 = JSON.parse(xmlhttp6.response);
                    //        if (resp3) {
                    //            console.log("ppppppppp");
                    //            return true;
                    //        } else {
                                var xmlhttp8 = new XMLHttpRequest();
                                var img = null;
                                xmlhttp8.onreadystatechange = function () {

                                    if (xmlhttp8.readyState == 4 && xmlhttp8.status == 200) {

                                        var resp2 = JSON.parse(xmlhttp8.response);

                                        var xmlhttp1 = new XMLHttpRequest();

                                        xmlhttp1.onreadystatechange = function () {

                                            if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                                                var resp3 = JSON.parse(xmlhttp1.response);
                                                console.log("pos", resp3);

                                                if (resp3.Designation == 'Defesa') {
                                                    if (ndefesefull == 0) {
                                                        img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                                        x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";
                                                        console.log("xxxxxx", x);
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
                                                        x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";
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
                                                        x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";
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
                                                        x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";
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
                                                allfinishome(totalplayers);
                                                //allplayershome[allplayershome.length] = img;
                                            }
                                        }
                                        if (entry.IdPosition == 0) {
                                            img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                            x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";
                                            //x = x + 50;
                                            //if (x >= svgwidth - 50) {
                                            //    y = y + 50;
                                            //    x = pos.left + 10;
                                            //}
                                            console.log("yayayay", entry);
                                            playersnotplaying[playersnotplaying.length] = img;
                                            allfinishome(totalplayers);
                                        } else {
                                            console.log("yayayay", entry);
                                            nplayershomeplaying++;
                                            xmlhttp1.open("GET", "/SetUp/GetPosition?id=" + entry.IdPosition, true);
                                            xmlhttp1.send();
                                        }
                                    }

                                };
                                xmlhttp8.open("GET", "/SetUp/GetPlayer?id=" + entry.IdPlayer, true);
                                xmlhttp8.send();

                            //}
            //            }
            //        };
            //        xmlhttp6.open("GET", "/SetUp/HaveRedCard?idstadium=" + idstadium + "&datahora=" + datahora + "&idequipav=" + idequipav + "&dataequipav=" + dataequipav +
            //"&idequipag=" + idequipag + "&dataequipag=" + dataequipag + "&idp=" + entry.IdPlayer, true);
            //        xmlhttp6.send();

                    
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
        
        var rect = svg.getElementById("all");
        var pos = rect.getBoundingClientRect();
        var x = "55%";
        var y = "88%";

        var xmlhttp4 = new XMLHttpRequest();

        xmlhttp4.onreadystatechange = function () {

            if (xmlhttp4.readyState == 4 && xmlhttp4.status == 200) {
                var resp = JSON.parse(xmlhttp4.response);
                var totalplayers = resp.length;
                resp.forEach(function (entry) {
                    
                    //var xmlhttp6 = new XMLHttpRequest();

                    //xmlhttp6.onreadystatechange = function() {

                    //    if (xmlhttp6.readyState == 4 && xmlhttp6.status == 200) {

                    //        var resp4 = JSON.parse(xmlhttp6.response);
                    //        if (resp4) {
                    //            console.log("ppppppppp");
                    //            return true;
                    //        } else {

        
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
                                                        //x = x + 50;
                                                        //if (x >= svgwidth - 50) {
                                                        //    y = y + 50;
                                                        //    x = ((pos.right - pos.left) / 2);
                                                        //}
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
                                                        //x = x + 50;
                                                        //if (x >= svgwidth - 50) {
                                                        //    y = y + 50;
                                                        //    x = ((pos.right - pos.left) / 2);
                                                        //}
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
                                                        //x = x + 50;
                                                        //if (x >= svgwidth - 50) {
                                                        //    y = y + 50;
                                                        //    x = ((pos.right - pos.left) / 2);
                                                        //}
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
                                                        //x = x + 50;
                                                        //if (x >= svgwidth - 50) {
                                                        //    y = y + 50;
                                                        //    x = ((pos.right - pos.left) / 2);
                                                        //}
                                                        playersnotplaying[playersnotplaying.length] = img;
                                                    } else {
                                                        img = PhotoonSvg(resp2.Id, resp2.Photo, amiddlegkx, amiddlegky + movey);
                                                        --angkfull;
                                                        allplayershome[allplayershome.length] = img;
                                                    }
                                                }
                                                allfinisaway(totalplayers);
                                                console.log("allplayereshome", allplayershome);

                                            }
                                        }
                                        if (entry.IdPosition == 0) {
                                            img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                            x = parseInt(x.substring(0, x.length - 1)) + 5 + "%";
                                            //x = x + 50;
                                            //if (x >= svgwidth - 50) {
                                            //    y = y + 50;
                                            //    x = pos.left + 10;
                                            //}
                                            
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
          //                  }
          //              }
          //          };
          //          xmlhttp6.open("GET", "/SetUp/HaveRedCard?idstadium=" + idstadium + "&datahora=" + datahora + "&idequipav=" + idequipav + "&dataequipav=" + dataequipav +
          //"&idequipag=" + idequipag + "&dataequipag=" + dataequipag + "&idp=" + entry.IdPlayer, true);
          //          xmlhttp6.send();


                });
            }
        };
        var aidq = document.getElementById("iddetailssetup_idagainst").innerHTML;
        var adataq = document.getElementById("iddetailssetup_dateagainst").innerHTML;

        xmlhttp4.open("GET", "/SetUp/GetPlayersByTeam?date=" + adataq + "&idclub=" + aidq, true);
        xmlhttp4.send();
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
    console.log("with", svgwidth);
    console.log("height", svgheight);


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

        if (IsOccupied(savepositions, whereplayeres)) {
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
    }

    //function removecircles(circles) {
    //    console.log("remove circles");
    //    for (var i = 0; i < circles.length; ++i) {
    //        svg.getElementById("all").removeChild(circles[i]);
    //    }
    //}







    


    var showdetails = [];

    function removedetails() {
        for (var i = 0; i < showdetails.length; ++i) {
            console.log("removedetails", showdetails[i]);
            svg.getElementById("all").removeChild(showdetails[i]);
        }
        showdetails = [];
    }


    
    var lastcircle = null;
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
            
            if (lastcircle != null) {

                svg.getElementById("all").removeChild(lastcircle);
                removeElemFromArray(showdetails, lastcircle);
                console.log("remove circle", lastcircle);
                lastcircle = null;
            }

            console.log("circles");
            var circlesinside = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circlesinside.setAttribute("cx", (circles.getAttributeNS(null, 'cx')));
            circlesinside.setAttribute("cy", (circles.getAttributeNS(null, 'cy')));
            circlesinside.setAttribute("fill", "#000000");
            circlesinside.setAttribute("stroke", "#000000");
            circlesinside.setAttribute("r", "0.8%");
            circlesinside.setAttribute("id", "circcc");
            svg.getElementById("all").appendChild(circlesinside);
            
            console.log("lastcircle", lastcircle);
            lastcircle = circlesinside;
            

            showdetails[showdetails.length] = circlesinside;
           // if (ide != null) {
                //saveplayer.idexe = null;
                saveplayer.event = ide;
                saveplayer.idplayer = idp;
            //} else {
                //saveplayer.idexe = idp;
                console.log("clickotherteam");
            //}
            //if (ide != null) {
            var xmlhttp8 = new XMLHttpRequest();

            xmlhttp8.onreadystatechange = function() {

                if (xmlhttp8.readyState == 4 && xmlhttp8.status == 200) {
                    var resp = JSON.parse(xmlhttp8.response);
                    console.log("trrr", resp);
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

                        xmlhttp.onreadystatechange = function() {

                            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                var resp1 = JSON.parse(xmlhttp.response);

                                var xmlhttp1 = new XMLHttpRequest();

                                xmlhttp1.onreadystatechange = function() {

                                    if (xmlhttp1.readyState == 4 && xmlhttp.status == 200) {
                                        var resp3 = JSON.parse(xmlhttp1.response);
                                        y = "8%";
                                        var temp = null;
                                        resp3.forEach(function(entry) {

                                            //createcircles(entry.Id, null, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 23 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + parseInt(y.substring(0, y.length - 1)) + "%");
                                            var circles2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                                            circles2.setAttribute("cx", parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 23 + "%");
                                            circles2.setAttribute("cy", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + parseInt(y.substring(0, y.length - 1)) + "%");
                                            circles2.setAttribute("fill", "#ffffff");
                                            circles2.setAttribute("stroke", "#000000");
                                            circles2.setAttribute("r", "1%");
                                            circles2.setAttribute("id", entry.Id);
                                            svg.getElementById("all").appendChild(circles2);
                                            showdetails[showdetails.length] = circles2;
                                            circles2.onclick = function() {

                                                if (temp != null) {

                                                    svg.getElementById("all").removeChild(temp);
                                                    removeElemFromArray(showdetails, temp);
                                                    console.log("remove circle", temp);
                                                    temp = null;
                                                }

                                                console.log("circles");
                                                var circlesinside2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                                                circlesinside2.setAttribute("cx", (circles2.getAttributeNS(null, 'cx')));
                                                circlesinside2.setAttribute("cy", (circles2.getAttributeNS(null, 'cy')));
                                                circlesinside2.setAttribute("fill", "#000000");
                                                circlesinside2.setAttribute("stroke", "#000000");
                                                circlesinside2.setAttribute("r", "0.8%");
                                                circlesinside2.setAttribute("id", "circcc");
                                                svg.getElementById("all").appendChild(circlesinside2);
                                                showdetails[showdetails.length] = circlesinside2;
                                                console.log("lastcircle", temp);
                                                temp = circlesinside2;
                                                saveplayer.idexe = circles2.getAttributeNS(null, 'id');
                                                console.log("saveplayer.idexe", saveplayer.idexe);
                                            };

                                            createLabels(entry.Name, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 25 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + parseInt(y.substring(0, y.length - 1)) + "%");
                                            y = parseInt(y.substring(0, y.length - 1)) + 4 + "%";

                                        });
                                    }
                                };

                                var xmlhttp9 = new XMLHttpRequest();

                                xmlhttp9.onreadystatechange = function() {

                                    if (xmlhttp9.readyState == 4 && xmlhttp9.status == 200) {
                                        var resp2 = JSON.parse(xmlhttp9.response);

                                        if (resp2.Type != "Inicio da Partida" || resp2.Type != "Fim da Partida") {


                                            var idc;
                                            if (resp2.Type == "Substituição") {
                                                idc = resp1.IdClub;

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


            
            
            console.log("saveplayers", saveplayer);
        };
        svg.getElementById("all").appendChild(circles);
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


    function createAdminInteract(id, photo, posx, posy) {
        console.log("sssss");
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
                createLabels("Name: " + resp.Name, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 0.5 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 22 + "%");
                createLabels("Born: " + date.toDateString(), parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 0.3 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 26 + "%");
                createLabels("Height: " + resp.Height, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 0.3 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 30 + "%");
                createLabels("Weight: " + resp.Weight, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 0.3 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 34 + "%");

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
                                        if (entry.Type == "Inicio da Partida" || entry.Type == "Fim da Partida") {
                                            console.log("filtro de eventos");
                                            return;
                                        } else {
                                            y = parseInt(y.substring(0, y.length - 1)) + 4 + "%";
                                            var temp = null;
                                            createcircles(resp.Id, entry.Id, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 1 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + parseInt(y.substring(0, y.length - 1)) + "%");

                                            createLabels(entry.Type, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 2 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + parseInt(y.substring(0, y.length - 1)) + 1 + "%");
                                        }
                                    } else {
                                        if (entry.Type != "Inicio da Partida" && entry.Type != "Fim da Partida") {
                                            console.log("filtro de eventos");
                                            return;
                                        } else {
                                            y = parseInt(y.substring(0, y.length - 1)) + 4 + "%";
                                            var temp = null;
                                            createcircles(resp.Id, entry.Id, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 1 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + parseInt(y.substring(0, y.length - 1)) + "%");

                                            createLabels(entry.Type, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 2 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + parseInt(y.substring(0, y.length - 1)) + 1 + "%");
                                        }
                                    }
                                }
                            }
                            xmlhttp1.open("GET", "/SetUp/IsPlayer?id=" + id, true);
                            xmlhttp1.send();


                        });

                        var svgbutton = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                        svgbutton.setAttributeNS(null, 'height', '4%');
                        svgbutton.setAttributeNS(null, 'width', '6%');
                        svgbutton.setAttributeNS(null, 'id', '0');
                        //svgbutton.setAttributeNS(null, 'style', 'fill:white;stroke:white');
                        svgbutton.setAttributeNS(null, 'fill', 'white');
                        svgbutton.setAttributeNS(null, 'x', parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 14 + "%");
                        svgbutton.setAttributeNS(null, 'y', parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 75 + "%");
                        svgbutton.setAttributeNS(null, 'visibility', 'visible');
                        svgbutton.setAttributeNS(null, 'cursor', 'pointer');
                        showdetails[showdetails.length] = svgbutton;
                        //svgbutton.onclick = function() {
                        //    console.log("button");
                        //};

                        svg.getElementById("all").appendChild(svgbutton);
                        createLabels("Guardar", parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 14 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 78 + "%");


                        //var svgexecutor = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
                        //svgexecutor.setAttributeNS(null, 'height', '10%');
                        //svgexecutor.setAttributeNS(null, 'width', '5%');
                        //svgexecutor.setAttributeNS(null, 'id', '0');
                        //svgexecutor.setAttributeNS(null, 'style', 'fill:white;stroke:white');
                        //svgexecutor.setAttributeNS(null, 'cx', parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 19 + "%");
                        //svgexecutor.setAttributeNS(null, 'cy', parseInt(yposdetails.substring(0, yposdetails.length - 1)) + parseInt(y.substring(0, y.length - 1)) - 10 + "%");
                        //svgexecutor.setAttributeNS(null, 'rx', "0.5%");
                        //svgexecutor.setAttributeNS(null, 'ry', "5%");
                        //svgexecutor.setAttributeNS(null, 'visibility', 'visible');
                        //showdetails[showdetails.length] = svgexecutor;
                        //svg.getElementById("all").appendChild(svgexecutor);


                        console.log("sdcndsdc", xposdetails);
                        console.log("sdcndsdc", yposdetails);
                        //var executor = createLabels("executor", "5%" , "5%");
                        //executor.setAttributeNS(null, "transform", "rotate(90 " + svgheight + ",+"+svgwidth+")");
                        //executor.onclick = function () {
                        //var rectexecutor = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                        //rectexecutor.setAttributeNS(null, 'height', '80%');
                        //rectexecutor.setAttributeNS(null, 'width', '20%');
                        //rectexecutor.setAttributeNS(null, 'id', '0');
                        //rectexecutor.setAttributeNS(null, 'style', 'fill:green;stroke:white');
                        //rectexecutor.setAttributeNS(null, 'x', parseInt(xposdetails.substring(0, xposdetails.length - 1))+20+"%");
                        //rectexecutor.setAttributeNS(null, 'y', yposdetails);
                        //rectexecutor.setAttributeNS(null, 'visibility', 'visible');
                        //svg.getElementById("all").appendChild(rectexecutor);
                        //showdetails[showdetails.length] = rectexecutor;


                        //var xmlhttp = new XMLHttpRequest();

                        //xmlhttp.onreadystatechange = function () {

                        //    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        //        var resp1 = JSON.parse(xmlhttp.response);

                        //        var xmlhttp1 = new XMLHttpRequest();

                        //        xmlhttp1.onreadystatechange = function () {

                        //            if (xmlhttp1.readyState == 4 && xmlhttp.status == 200) {
                        //                var resp3 = JSON.parse(xmlhttp1.response);
                        //                y = "8%";
                        //                resp3.forEach(function (entry) {

                        //                    createcircles(entry.Id, null, parseInt(xposdetails.substring(0, xposdetails.length - 1)) +23 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + parseInt(y.substring(0, y.length - 1))+"%");
                        //                    createLabels(entry.Name, parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 25 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + parseInt(y.substring(0, y.length - 1))+"%");
                        //                    y = parseInt(y.substring(0, y.length - 1)) + 4 + "%";

                        //                });
                        //            }
                        //        };
                        //        var idc;
                        //            if (resp1.IdClub == document.getElementById("iddetailssetup_idvisitor").innerHTML.trim()) {
                        //                idc = document.getElementById("iddetailssetup_idagainst").innerHTML.trim();
                        //            } else {
                        //                idc = document.getElementById("iddetailssetup_idvisitor").innerHTML.trim();
                        //            }

                        //        xmlhttp1.open("GET", "/SetUp/GetAllPlayerFromClub?idclub=" + idc, true);
                        //        xmlhttp1.send();

                        //    }
                        //};
                        //xmlhttp.open("GET", "/SetUp/GetPlayerWithClub?idplayer=" + resp.Id, true);
                        //xmlhttp.send();

                        //};

                    }
                }
                xmlhttp9.open("GET", "/SetUp/GetEvents", true);
                xmlhttp9.send();


            }
        };

        xmlhttp8.open("GET", "/SetUp/GetPlayer?id=" + id, true);
        xmlhttp8.send();

    } 
    

    function createUserInteract(id, photo, posx, posy) {
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
                
                xmlhttp5.onreadystatechange = function() {

                    if (xmlhttp5.readyState == 4 && xmlhttp5.status == 200) {
                        var resp1 = JSON.parse(xmlhttp5.response);

                        var count1 = 0;
                        resp1.forEach(function (entry) {
                            if (count1 == 8) return;

                            var obj = {};
                            
                            //console.log("dateeeeee", entry.date);
                            console.log("ydetails", yposdetails);
                            var substringedDate = entry.date.substring(6); //substringedDate= 1291548407008)/
                            var parsedIntDate = parseInt(substringedDate); //parsedIntDate= 1291548407008
                            var datet = new Date(parsedIntDate);

                            console.log("datet", datet.toLocaleTimeString());

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
                                console.log("circleS.getAttributeNS(null, 'id')", circleS.getAttributeNS(null, 'id'));
                                arropinions[circleS.getAttributeNS(null, 'id')].opinion = "yes";
                                console.log("arropinions", arropinions);
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
                                console.log("arropinions", arropinions);
                            }
                            



                            var xmlhttp = new XMLHttpRequest();
                            xmlhttp.onreadystatechange = function () {

                                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                    var resp4 = JSON.parse(xmlhttp.response);
                                    var namevent = resp4.Type;


                                    var xmlhttp1 = new XMLHttpRequest();
                                    xmlhttp1.onreadystatechange = function() {

                                        if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                                            var resp2 = JSON.parse(xmlhttp1.response);
                                            var causename = resp2.Name;

                                            if (entry.executeId == null) {
                                                arropinions[arropinions.length] = obj;
                                                createLabels(datet.toLocaleTimeString() + "-" + namevent + "-" + causename, xposdetails, yposdetails1);
                                                console.log("ydetails", yposdetails);
                                                yposdetails1 = parseInt(yposdetails1.substring(0, yposdetails1.length - 1)) + 5 + "%";
                                                console.log("ydetails", yposdetails);
                                            } else {
                                                var xmlhttp2 = new XMLHttpRequest();
                                                xmlhttp2.onreadystatechange = function() {

                                                    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
                                                        var resp3 = JSON.parse(xmlhttp2.response);
                                                        var executename = resp3.Name;

                                                        arropinions[arropinions.length] = obj;
                                                        createLabels(datet.toLocaleTimeString() + "-" + namevent + "-" + causename + "-" + executename, xposdetails, yposdetails1);
                                                        console.log("ydetails", yposdetails);
                                                        yposdetails1 = parseInt(yposdetails1.substring(0, yposdetails1.length - 1)) + 5 + "%";
                                                        console.log("ydetails", yposdetails);
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
                        var xpossave = "70%";
                        var ypossave = "80%";
                        var svgbutton = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                        svgbutton.setAttributeNS(null, 'height', '4%');
                        svgbutton.setAttributeNS(null, 'width', '4%');
                        svgbutton.setAttributeNS(null, 'id', '0');
                        //svgbutton.setAttributeNS(null, 'style', 'fill:white;stroke:white');
                        svgbutton.setAttributeNS(null, 'fill', 'white');
                        svgbutton.setAttributeNS(null, 'x', xpossave);
                        svgbutton.setAttributeNS(null, 'y', ypossave);
                        svgbutton.setAttributeNS(null, 'visibility', 'visible');
                        svgbutton.setAttributeNS(null, 'cursor', 'pointer');
                        showdetails[showdetails.length] = svgbutton;
                        //svgbutton.onclick = function() {
                        //    console.log("button");
                        //};

                        svg.getElementById("all").appendChild(svgbutton);
                        createLabels("Save", xpossave, parseInt(xpossave.substring(0, xpossave.length - 1)) + 14 + "%");

                    }
                }

                xmlhttp5.open("GET", "/SetUp/GetOpinionUserByInstant?idstadium=" + idstadium + "&datahora=" + datahora + "&idequipav=" + idequipav + "&dataequipav=" + dataequipav +
           "&idequipag=" + idequipag + "&dataequipag=" + dataequipag+"&idcause="+id, true);
                xmlhttp5.send();

                //for (var i = 0; i < temp.length; ++i) {

                    //var circleS = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    //circleS.setAttribute("cx", xposcircS);
                    //circleS.setAttribute("cy", yposdetails);
                    //circleS.setAttribute("fill", "#ffffff");
                    //circleS.setAttribute("stroke", "#000000");
                    //circleS.setAttribute("r", "1%");
                    //circleS.setAttribute("id", temp[i]);
                    //showdetails[showdetails.length] = circleS;
                    //svg.getElementById("all").appendChild(circleS);
                    ////circleS.onclick = function() {
                    //    var circlesinside = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    //    circlesinside.setAttribute("cx", (circleS.getAttributeNS(null, 'cx')));
                    //    circlesinside.setAttribute("cy", (circleS.getAttributeNS(null, 'cy')));
                    //    circlesinside.setAttribute("fill", "#000000");
                    //    circlesinside.setAttribute("stroke", "#000000");
                    //    circlesinside.setAttribute("r", "0.7%");
                    //    circlesinside.setAttribute("id", "circcc");
                    //    svg.getElementById("all").appendChild(circlesinside);
                    //    var obj = {};
                    //    obj.timeline = circleS.getAttributeNS(null, 'id');
                    //    obj.opinion = "yes";
                    //};
                    //var circleN = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    //circleN.setAttribute("cx", xposcircN);
                    //circleN.setAttribute("cy", yposdetails);
                    //circleN.setAttribute("fill", "#ffffff");
                    //circleN.setAttribute("stroke", "#000000");
                    //circleN.setAttribute("r", "1%");
                    //circleN.setAttribute("id", temp[i]);
                    //showdetails[showdetails.length] = circleN;
                    //svg.getElementById("all").appendChild(circleN);
                    //circleN.onclick = function () {
                    //    var circlesinside = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    //    circlesinside.setAttribute("cx", (circleN.getAttributeNS(null, 'cx')));
                    //    circlesinside.setAttribute("cy", (circleN.getAttributeNS(null, 'cy')));
                    //    circlesinside.setAttribute("fill", "#000000");
                    //    circlesinside.setAttribute("stroke", "#000000");
                    //    circlesinside.setAttribute("r", "0.7%");
                    //    circlesinside.setAttribute("id", "circcc");
                    //    svg.getElementById("all").appendChild(circlesinside);
                    //};

                //    createLabels(temp[i].innerHTML, xposdetails, yposdetails);

                //    yposdetails = parseInt(yposdetails.substring(0, yposdetails.length - 1)) + 5 + "%";
                //}

//    var xmlhttp5 = new XMLHttpRequest();

                //    xmlhttp5.onreadystatechange = function() {
                //        var y = "35%";
                //        if (xmlhttp5.readyState == 4 && xmlhttp5.status == 200) {
                //            var resp1 = JSON.parse(xmlhttp5.response);
                //            resp1.forEach(function(entry) {
                //                CreateCircle(parseInt(xposdetails.substring(0, xposdetails.length - 1)) + 1 + "%", parseInt(yposdetails.substring(0, yposdetails.length - 1)) + parseInt(y.substring(0, y.length - 1)) + "%");

                //            });
                //        }
                //    }
                //    xmlhttp5.open("GET", "/SetUp/GetTimeLine?idstadium=" + idstadium + "&datahora=" + datahora + "&idequipav=" + idequipav + "&dataequipav=" + dataequipav +
                //"&idequipag=" + idequipag + "&dataequipag=" + dataequipag + "&username=Adminn", true);
                //    xmlhttp5.send();

            }
        };

        xmlhttp8.open("GET", "/SetUp/GetPlayer?id=" + id, true);
        xmlhttp8.send();


    }






    function EventName(id) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var resp1 = JSON.parse(xmlhttp.response);
                return resp1.Type;
            }
        }

        xmlhttp.open("GET", "/SetUp/GetEvent?id=" + saveplayer.event, true);
        xmlhttp.send();
    }



    function CreateCircle(x,y) {
        var circles = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circles.setAttribute("cx", x);
        circles.setAttribute("cy", y);
        circles.setAttribute("fill", "#ffffff");
        circles.setAttribute("stroke", "#000000");
        circles.setAttribute("r", "1%");
        circles.setAttribute("id", "circ" + y);
        showdetails[showdetails.length] = circles;
        svg.getElementById("all").appendChild(circles);
        return circles;
    }



    function PhotoonSvg(id, photo, posx, posy) {
        console.log("PhotoonSvg" , id , posx , posy);
        var svgimg = PutBaseInfoPlayer(id, photo, posx, posy);
        console.log("add photo");
        svgimg.onclick = function (ev) {
            
            console.log("click", document.getElementById("isadmin").innerHTML.trim());

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




    //function PutTempImages(full, f, s, t) {
    //    var next;

    //    for (var i = 0; i < full; ++i) {

    //        next = nextposition(f, s, t);
    //        PosToMove[PosToMove.length] = next;
    //        //createcircle(next.x, next.y);
    //        console.log("next", next);
    //        tempimages[tempimages.length] = PhotoonSvg(null, "empty.jpg", next.x, next.y);
    //    }
    //}


    var timer = 200;//miliseconds
    var isclick = true;
    var functimer = null;
    var oldtarget = null;


    function removeFromArr(arr, id) {
        arr.forEach(function(entry) {
            if (id == entry.getAttributeNS(null, 'id')) {
                console.log("hhhhhhhh", entry);
                svg.getElementById("all").removeChild(entry);
                return true;
            }
        });
    }

    function removePhoto(id) {
        console.log("remove - whereplayeres", allplayershome, id);

        if (!removeFromArr(allplayershome, id)) {
            removeFromArr(playersnotplaying, id);
        }
    }


    function GetEvent(id) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                return JSON.parse(xmlhttp.response);
                
            }
        };

        xmlhttp.open("GET", "/SetUp/GetEvent?id=" + saveplayer.event, true);
        xmlhttp.send();
    }


    SVGDocument.onmousedown = function (evt) {
        
        if (evt.target.innerHTML == 'Save') {

            if (document.getElementById("isadmin").innerHTML.trim() == "False") {
                
                var nopinions = arropinions.length;
                arropinions.forEach(function (entry) {
                    var dt = new Date();
                    var n = dt.getMilliseconds();
                    var f = dt.toString().substring(0, 24);
                    dt = f + '.' + n;
                    //dt.toString().substring(0, 25);
                    if (entry.hasOwnProperty("opinion")) {
                        
                        var xmlhttp1 = new XMLHttpRequest();
                        xmlhttp1.onreadystatechange = function () {

                            if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                                console.log("create opiniaooo");
                                
                                
                                var xmlhttp2 = new XMLHttpRequest();
                                xmlhttp2.onreadystatechange = function() {

                                    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
                                        var resp1 = JSON.parse(xmlhttp2.response);

                                        console.log("c" + resp1.IdEvent + entry.opinion, "c" + resp1.IdEvent + entry.opinion);
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
                        console.log("datecreateopinionuser" , dt);
                        xmlhttp1.open("POST", "/SetUp/CreateOpinionUser", true);
                        xmlhttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xmlhttp1.send("dateinstant=" + entry.dated + "&idstadium=" + idstadium + "&datahora=" + datahora + "&datavisitor=" + dataequipav + "&idvisitor=" + idequipav +
                            "&dataagainst=" + dataequipag + "&idagainst=" + idequipag + "&iduser=" + document.getElementById("curruserid").innerHTML.trim() + "&dateop=" + dt + "&negative=" + entry.opinion);

                        removedetails();

                    }
                });
                

            } else
            {

                console.log("saveplayeres_length", saveplayer);
                if (Object.getOwnPropertyNames(saveplayer).length === 0) {
                    console.log("unsaved");
                    return;
                } else if (!saveplayer.hasOwnProperty('event')) {
                    return;
                } else if (!saveplayer.hasOwnProperty('idexe')) {
                    saveplayer.idexe = null;
                }
                lastcircle = null;
                //var idequipav = document.getElementById("iddetailssetup_idvisitor").innerHTML;
                //var dataequipav = document.getElementById("iddetailssetup_datevisitor").innerHTML;
                //var idequipa = document.getElementById("iddetailssetup_idagainst").innerHTML;
                //var dataequipa = document.getElementById("iddetailssetup_dateagainst").innerHTML;
                //var idstadium = document.getElementById("iddetailssetup_idstadium").innerHTML;
                //var datahora = document.getElementById("iddetailssetup_date").innerHTML;
                //console.log("idest", idstadium);
                //console.log("idest", idequipav);
                //console.log("idest", idequipa);
                //console.log("idest", saveplayer);
                var xmlhttp10 = new XMLHttpRequest();
                var dt = new Date();
                //var substringedDate = dt.substring(6); //substringedDate= 1291548407008)/
                //var parsedIntDate = parseInt(substringedDate); //parsedIntDate= 1291548407008
                //var datet = new Date(parsedIntDate);
                
                //var dt = svg.getElementById("timer").innerHTML.trim().split(":");

                //dt = new Date(0, 0, 0, dt[0], dt[1], dt[2]);
                

                xmlhttp10.onreadystatechange = function() {

                    if (xmlhttp10.readyState == 4 && xmlhttp10.status == 200) {
                        console.log("actualiza timeline");


                        //console.log("resp", date.toDateString());
                        console.log("date", dt);
                        LineInTimeLine(saveplayer.event, saveplayer.idplayer, saveplayer.idexe, dt,0,0);

                        var xmlhttp1 = new XMLHttpRequest();
                        xmlhttp1.onreadystatechange = function() {

                            if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                                var resp1 = JSON.parse(xmlhttp1.response);
                                if (resp1.Type == 'Cartão Vermelho') {

                                    removePhoto(saveplayer.idplayer);

                                    //var xmlhttp1 = new XMLHttpRequest();
                                    //xmlhttp1.onreadystatechange = function () {

                                    //    if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                                    //        var resp = JSON.parse(xmlhttp1.response);
                                    //        var idclub = resp.IdClub;
                                    //        var dateclub;
                                    //        if (idclub == document.getElementById("iddetailssetup_idvisitor").innerHTML.trim()) {
                                    //            dateclub = document.getElementById("iddetailssetup_datevisitor").innerHTML.trim();
                                    //        } else {
                                    //            dateclub = document.getElementById("iddetailssetup_dateagainst").innerHTML.trim();
                                    //        }

                                    //        //var xmlhttp2 = new XMLHttpRequest();
                                    //        //xmlhttp2.onreadystatechange = function () {

                                    //        //    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {

                                    //        //    }
                                    //        //};
                                    //        //xmlhttp2.open("POST", "/Team/UpdateIntegrate", true);
                                    //        //xmlhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");

                                    //        //xmlhttp2.send("idclub=" + idclub + "&date=" + dateclub + "&idplayer=" + saveplayer.idplayer + "&idposition=" + 0);
                                    //        saveplayer = {};


                                    //    }
                                    //};
                                    //xmlhttp1.open("GET", "/SetUp/GetPlayerWithClub?idplayer=" + saveplayer.idplayer, true);
                                    //xmlhttp1.send();


                                } else if (resp1.Type == 'Substituição') {
                                    console.log("replacePlayer(entry.causeId, entry.executeId);", saveplayer.idplayer, saveplayer.idexe);
                                    replacePlayer(saveplayer.idplayer, saveplayer.idexe);
                                    nsubst++;
                                } else if (resp1.Type == 'Inicio da Partida') {
                                    datestartmatch = new Date();
                                    starttime(datestartmatch);
                                }else if (resp1.Type == 'Fim da Partida') {
                                    clearInterval(mytimer);
                                }
                            }
                        };
                        xmlhttp1.open("GET", "/SetUp/GetEvent?id=" + saveplayer.event, true);
                        xmlhttp1.send();

                    }
                }
                //var timematch = document.getElementById("iddetailssetup_date").innerHTML.trim().split(" ")[1].split(":");

                //var newh = timematch[0];
                //var newm = timematch[1];
                //var news = timematch[2];
                //dt = new Date(0, 0, 0, newh, newm, news);
                
                //dt = svg.getElementById("timer").innerHTML.trim().split(":");
                //dt = new Date(0,0,0,dt[0],dt[1],dt[2]);
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {

                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var resp = JSON.parse(xmlhttp.response);
                        if (resp.Type == 'Substituição' && nsubst == 3) {

                        } else {
                            console.log("idexexexe", dt);
                            xmlhttp10.open("POST", "/SetUp/CreateOpinion", true);
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
                return;
            }
            console.log("call tempimages");

            OldCoor.x = targetElement.getAttributeNS(null, 'x');
            OldCoor.y = targetElement.getAttributeNS(null, 'y');
            OldCoor.id = targetElement.getAttributeNS(null, 'id');
            console.log("oldcoor", OldCoor);
            //functimer = setTimeout(
            //    function CreateTempImages() {
            //        console.log("evttt", evt);
            //        functimer = null;
            //        isclick = true;
            //        console.log("createtempimges");
            //        tempimages = [];


            //        OldCoor.x = targetElement.getAttributeNS(null, 'x');
            //        OldCoor.y = targetElement.getAttributeNS(null, 'y');
            //        OldCoor.id = targetElement.getAttributeNS(null, 'id');
            //        var xmlhttp4 = new XMLHttpRequest();

            //        xmlhttp4.onreadystatechange = function () {

            //            if (xmlhttp4.readyState == 4 && xmlhttp4.status == 200) {
            //                var resp = JSON.parse(xmlhttp4.response);
            //                var pos = resp.Designation;
            //                var next;
            //                currpos = pos;
            //                if (pos == "Defesa") {
            //                    console.log("defesa");

            //                    if (evt.clientX >= halfposition) {
            //                        PutTempImages(andefesefull, amiddledefensex, amiddledefensey, adefense);
            //                    } else {
            //                        PutTempImages(ndefesefull, middledefensex, middledefensey, defense);
            //                    }
            //                    //for (var i = 0; i < ndefesefull; ++i) {
            //                    //    if (evt.clientX >= halfposition) {
            //                    //        next = nextposition(amiddledefensex, amiddledefensey, adefense);
            //                    //    } else {
            //                    //        next = nextposition(middledefensex, middledefensey, defense);
            //                    //    }
            //                    //    PosToMove[PosToMove.length] = next;
            //                    //    //createcircle(next.x, next.y);
            //                    //    tempimages[tempimages.length] = PhotoonSvg(null, "empty.jpg", next.x, next.y);
            //                    //}
            //                    //ndefensehome = 0;
            //                } else if (pos == "Medio") {

            //                    if (evt.clientX >= halfposition) {
            //                        PutTempImages(anmiddlefull, amiddlex, amiddley, amiddle);
            //                    } else {
            //                        PutTempImages(nmiddlefull, middlex, middley, middle);
            //                    }

            //                    //for (var i = 0; i < nmiddlefull; ++i) {
            //                    //    if (evt.clientX >= halfposition) {
            //                    //        next = nextposition(amiddlex, amiddley, amiddle);
            //                    //    } else {
            //                    //        next = nextposition(middlex, middley, middle);
            //                    //    }
            //                    //    //next = nextposition(middlex, middley, middle);
            //                    //    PosToMove[PosToMove.length] = next;
            //                    //    //createcircle(next.x, next.y);
            //                    //    tempimages[tempimages.length] = PhotoonSvg(null, "empty.jpg", next.x, next.y);
            //                    //}
            //                    //ndefensehome = 0;
            //                } else if (pos == "Ataque") {

            //                    if (evt.clientX >= halfposition) {
            //                        PutTempImages(anstrikerfull, amiddlestrikerx, amiddlestrikery, astriker);
            //                    } else {
            //                        PutTempImages(nstrikerfull, middlestrikerx, middlestrikery, striker);
            //                    }

            //                    //for (var i = 0; i < nstrikerfull; ++i) {

            //                    //    if (evt.clientX >= halfposition) {
            //                    //        next = nextposition(amiddlestrikerx, amiddlestrikery, astriker);
            //                    //    } else {
            //                    //        console.log("middlestrikerx", middlestrikerx);
            //                    //        next = nextposition(middlestrikerx, middlestrikery, striker);
            //                    //    }

            //                    //    //next = nextposition(middlestrikerx, middledefensey, striker);
            //                    //    PosToMove[PosToMove.length] = next;
            //                    //    //createcircle(next.x, next.y);
            //                    //    tempimages[tempimages.length] = PhotoonSvg(null, "empty.jpg", next.x, next.y);
            //                    //}
            //                    //ndefensehome = 0;
            //                } else if (pos == "Guarda-redes") {
            //                    //allcircles = [];
            //                    if (evt.clientX >= middlex) {
            //                        next = nextposition(amiddlegkx, amiddlegky, agk);
            //                    } else {
            //                        next = nextposition(middlegkx, middlegky, gk);
            //                    }
            //                    //next = nextposition(middlegkx, middlegky, 1);
            //                    PosToMove[PosToMove.length] = next;
            //                    //createcircle(next.x, next.y);
            //                    tempimages[tempimages.length] = PhotoonSvg(null, "empty.jpg", next.x, next.y);
            //                }
            //                //movedowndefense = 0;
            //            }
            //        }

            //        xmlhttp4.open("GET", "/SetUp/GetPlayerPosition?id=" + targetElement.id, true);
            //        xmlhttp4.send();

            if (BackDrop != targetElement) {

                DragTarget = targetElement;

                DragTarget.parentNode.appendChild(DragTarget);
                DragTarget.setAttributeNS(null, 'pointer-events', 'none');
                var transMatrix = DragTarget.getCTM();
                GrabPoint.x = TrueCoords.x - Number(transMatrix.e);
                GrabPoint.y = TrueCoords.y - Number(transMatrix.f);
            }
            //    }
            //    , timer);
        

    };
    //SVGDocument.onmousemove = function (evt) {
    //    GetTrueCoords(evt);
    //    if (DragTarget) {
    //        var newX = TrueCoords.x - GrabPoint.x;
    //        var newY = TrueCoords.y - GrabPoint.y;
    //        DragTarget.setAttributeNS(null, 'transform', 'translate(' + newX + ',' + newY + ')');
    //    }
    //};

    //function whitchcircle(ev) {
    //    for (var i = 0; i < tempimages.length; ++i) {
    //        var circx = tempimages[i].getAttributeNS(null, 'x');
    //        var circy = tempimages[i].getAttributeNS(null, 'y');
    //        if ((ev.clientX < parseInt(circx) + 50) && (ev.clientX > parseInt(circx) - 50) && (ev.clientY < parseInt(circy) + 50) && (ev.clientY > parseInt(circy) - 50)) {
    //            return tempimages[i];
    //        }
    //    }
    //    return null;
    //}

    function IsImageInPosition(x, y) {
        console.log("isimage", allplayershome);
        console.log("isimagex", x);
        console.log("isimagey", y);
        for (var i = 0; i < allplayershome.length; ++i) {
            var coorx = allplayershome[i].getAttributeNS(null, "x");
            var coory = allplayershome[i].getAttributeNS(null, "y");
            console.log("cox", coorx);
            console.log("coy", coory);
            console.log("x", x);
            console.log("y", y);

            if (x <= parseInt(coorx) + 50 && x >= parseInt(coorx) - 50 && y <= parseInt(coory) + 50 && y >= parseInt(coory) - 50) {
                return allplayershome[i];
            }
        }
        return null;
    }


    function replace(arr , oldimg, newimg) {
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
        //if (DragTarget == null) {
        //    console.log("mouseuuuup");
        //    return;
        //}
        // Otherwise, if the mouse was being held, end the hold
        //else if (isclick) {
        isclick = false;
        // end hold-only operation here, if desired
        //}
        console.log("up", evt.target.nodeName);
        //if (evt.target.nodeName != 'image' && evt.target.nodeName != 'circle' && evt.target.nodeName != 'text') {
        //    console.log("up");
        //    DragTarget.setAttributeNS(null, 'x', OldCoor.x);
        //    DragTarget.setAttributeNS(null, 'y', OldCoor.y);
        //    DragTarget.setAttributeNS(null, 'transform', "");
        //    DragTarget.setAttributeNS(null, 'pointer-events', 'all');

        //    DragTarget = null;
        //    removeTempImages();
        //    return;
        //}
        //if (evt.target.nodeName == 'circle') {
        //    console.log("aaaaa");
        //    return;
        //}

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

        //var oldimg = IsImageInPosition(evt.clientX, evt.clientY);

        //if (oldimg != null) {
        //    console.log("second");

        //    console.log("oldcoor", OldCoor);
        //    console.log("oldimg", oldimg);
        //    DragTarget.setAttributeNS(null, 'x', oldimg.getAttributeNS(null, "x"));
        //    DragTarget.setAttributeNS(null, 'y', oldimg.getAttributeNS(null, "y"));
        //    DragTarget.setAttributeNS(null, 'transform', "");
        //    DragTarget.setAttributeNS(null, 'pointer-events', 'all');

        //    oldimg.setAttributeNS(null, 'x', OldCoor.x);
        //    oldimg.setAttributeNS(null, 'y', OldCoor.y);
        //    oldimg.setAttributeNS(null, 'transform', "");
        //    oldimg.setAttributeNS(null, 'pointer-events', 'all');

        //    removeElemFromArray(allplayershome, oldimg);
        //    removeElemFromArray(playersnotplaying, oldimg);
        //    allplayershome[allplayershome.length] = DragTarget;
        //    playersnotplaying[playersnotplaying.length] = DragTarget;
        //    //replace(oldimg, DragTarget);
        //    //whereplayeres[whereplayeres.length] = DragTarget;
        //    removeTempImages();
        //    nmiddlehome = 1;
        //    ndefensehome = 1;
        //    nstrikerhome = 1;
        //    DragTarget = null;
        //    return;
        //}


        //if (!IsInPositonRange(evt.clientX, evt.clientY)) {
        //    //var cenas = svg.getElementById(OldCoor.id);
        //    //cenas.setAttributeNS(null, 'x', OldCoor.x);
        //    //cenas.setAttributeNS(null, 'y', OldCoor.y);
        //    console.log("third");
        //    DragTarget.setAttributeNS(null, 'x', OldCoor.x);
        //    DragTarget.setAttributeNS(null, 'y', OldCoor.y);
        //    DragTarget.setAttributeNS(null, 'transform', "");
        //    DragTarget.setAttributeNS(null, 'pointer-events', 'all');

        //    DragTarget = null;
        //    removeTempImages();
        //    return;
        //}

        //if (DragTarget) {
        //    console.log("four");
        //    DragTarget.setAttributeNS(null, 'pointer-events', 'all');
        //    var upcircle = whitchcircle(evt);

        //    DragTarget.setAttributeNS(null, 'x', upcircle.getAttributeNS(null, "x"));
        //    DragTarget.setAttributeNS(null, 'y', upcircle.getAttributeNS(null, "y"));
        //    DragTarget.setAttributeNS(null, 'transform', "");

        //    whereplayeres[whereplayeres.length] = DragTarget;

        //    console.log("atribute", DragTarget.getAttributeNS(null, 'x'));
        //    if (currpos == "Defesa") {
        //        if (DragTarget.getAttributeNS(null, 'x') < halfposition) {
        //            console.log("ndefesefull", ndefesefull);
        //            ndefesefull--;
        //        } else {
        //            console.log("andefesefull", ndefesefull);
        //            andefesefull--;
        //        }
        //    } else if (currpos == "Medio") {
        //        if (DragTarget.getAttributeNS(null, 'x') < halfposition) {
        //            nmiddlefull--;
        //        } else {
        //            anmiddlefull--;
        //        }
        //    } else if (currpos == "Ataque") {
        //        if (DragTarget.getAttributeNS(null, 'x') < halfposition) {
        //            nstrikerfull--;
        //        } else {
        //            anstrikerfull--;
        //        }
        //    } else if (currpos == "Guarda-redes") {
        //        if (DragTarget.getAttributeNS(null, 'x') < halfposition) {
        //            ngkfull--;
        //        } else {
        //            angkfull--;
        //        }
        //    }
        //    DragTarget = null;
        //    movedowndefense = 0;
        //    amovedowndefense = 0;
        //    removeTempImages();
        //}

    };


    function GetTrueCoords(evt) {
        var newScale = SVGRoot.currentScale;
        var translation = SVGRoot.currentTranslate;
        TrueCoords.x = (evt.clientX - translation.x) / newScale;
        TrueCoords.y = (evt.clientY - translation.y) / newScale;
    };





    //document.getElementById("idbuttonauto").onclick = function (ev) {
    //    for (var i = 0; i < allplayereshome.length; ++i) {
    //        callplayer(allplayereshome[i]);
    //    }
    //}

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


    //function callplayer(idpla) {
    //    var xmlhttp5 = new XMLHttpRequest();

    //    xmlhttp5.onreadystatechange = function () {

    //        if (xmlhttp5.readyState == 4 && xmlhttp5.status == 200) {
    //            var resp = JSON.parse(xmlhttp5.response);
    //            var pos = resp.Designation;

    //            console.log("idpla", idpla.getAttributeNS(null, 'x'));
    //            if (pos == "Defesa") {
    //                if (idpla.getAttributeNS(null, 'x') > halfposition) {
    //                    if (andefesefull == 0) return;
    //                    if (IsImageInPosition(amiddledefensex, amiddledefensey + amovedowndefense)) {
    //                        //--andefesefull;
    //                        amovedowndefense += (svgheight / adefense) / 2;
    //                        return callplayer(idpla);
    //                    }
    //                    PutInPosition(amiddledefensex, amiddledefensey, amovedowndefense, idpla);

    //                    --andefesefull;
    //                    //idpla.setAttributeNS(null, 'x', amiddledefensex);
    //                    //idpla.setAttributeNS(null, 'y', amiddledefensey + amovedowndefense);
    //                    amovedowndefense += (svgheight / adefense) / 2;
    //                    //whereplayeres[whereplayeres.length] = idpla;
    //                } else {
    //                    if (ndefesefull == 0) return;
    //                    if (IsImageInPosition(middledefensex, middledefensey + movedowndefense)) {
    //                        console.log("defesa inc");
    //                        //--ndefesefull;
    //                        movedowndefense += (svgheight / defense) / 2;
    //                        return callplayer(idpla);
    //                    }
    //                    PutInPosition(middledefensex, middledefensey, movedowndefense, idpla);

    //                    --ndefesefull;
    //                    //idpla.setAttributeNS(null, 'x', middledefensex);
    //                    //idpla.setAttributeNS(null, 'y', middledefensey + movedowndefense);
    //                    movedowndefense += (svgheight / defense) / 2;
    //                    //whereplayeres[whereplayeres.length] = idpla;
    //                }
    //            }
    //            if (pos == "Medio") {
    //                if (idpla.getAttributeNS(null, 'x') > halfposition) {
    //                    if (anmiddlefull == 0) return;
    //                    if (IsImageInPosition(amiddlex, amiddley + amovedownmiddle)) {
    //                        ///--anmiddlefull;
    //                        amovedownmiddle += (svgheight / amiddle) / 2;
    //                        return callplayer(idpla);
    //                    }
    //                    PutInPosition(amiddlex, amiddley, amovedownmiddle, idpla);

    //                    --anmiddlefull;

    //                    //idpla.setAttributeNS(null, 'x', amiddlex);
    //                    //idpla.setAttributeNS(null, 'y', middley + amovedownmiddle);
    //                    amovedownmiddle += (svgheight / amiddle) / 2;
    //                    //whereplayeres[whereplayeres.length] = idpla;
    //                } else {
    //                    console.log("middle", nmiddlefull);
    //                    if (nmiddlefull == 0) return;
    //                    if (IsImageInPosition(middlex, middley + movedownmiddle)) {
    //                        //--nmiddlefull;
    //                        movedownmiddle += (svgheight / middle) / 2;
    //                        return callplayer(idpla);
    //                    }
    //                    PutInPosition(middlex, middley, movedownmiddle, idpla);

    //                    --nmiddlefull;

    //                    //idpla.setAttributeNS(null, 'x', middlex);
    //                    //idpla.setAttributeNS(null, 'y', middley + movedownmiddle);
    //                    movedownmiddle += (svgheight / middle) / 2;
    //                    //whereplayeres[whereplayeres.length] = idpla;
    //                }
    //            }
    //            if (pos == "Ataque") {

    //                if (idpla.getAttributeNS(null, 'x') > halfposition) {
    //                    if (anstrikerfull == 0) return;
    //                    if (IsImageInPosition(amiddlestrikerx, amiddlestrikery + amovedownstriker)) {
    //                        //--anstrikerfull;
    //                        amovedownstriker += (svgheight / astriker) / 2;
    //                        return callplayer(idpla);
    //                    }
    //                    PutInPosition(amiddlestrikerx, amiddlestrikery, amovedownstriker, idpla);

    //                    --anstrikerfull;

    //                    //idpla.setAttributeNS(null, 'x', amiddlestrikerx);
    //                    //idpla.setAttributeNS(null, 'y', amiddlestrikery + amovedownstriker);
    //                    amovedownstriker += (svgheight / astriker) / 2;
    //                    //whereplayeres[whereplayeres.length] = idpla;
    //                } else {
    //                    if (nstrikerfull == 0) return;
    //                    if (IsImageInPosition(middlestrikerx, middlestrikery + movedownstriker)) {
    //                        //--nstrikerfull;
    //                        movedownstriker += (svgheight / striker) / 2;
    //                        return callplayer(idpla);
    //                    }
    //                    PutInPosition(middlestrikerx, middlestrikery, movedownstriker, idpla);

    //                    --nstrikerfull;

    //                    //idpla.setAttributeNS(null, 'x', middlestrikerx);
    //                    //idpla.setAttributeNS(null, 'y', middlestrikery + movedownstriker);
    //                    movedownstriker += (svgheight / striker) / 2;
    //                    //whereplayeres[whereplayeres.length] = idpla;
    //                }
    //            }
    //            if (pos == "Guarda-redes") {
    //                if (idpla.getAttributeNS(null, 'x') > halfposition) {

    //                    if (angkfull == 0) return;
    //                    if (IsImageInPosition(amiddlegkx, amiddlegky)) {
    //                        //--angkfull;
    //                        return callplayer(idpla);
    //                    }
    //                    PutInPosition(amiddlegkx, amiddlegky, 0, idpla);
    //                    --angkfull;
    //                    //idpla.setAttributeNS(null, 'x', amiddlegkx);
    //                    //idpla.setAttributeNS(null, 'y', amiddlegky);
    //                    //whereplayeres[whereplayeres.length] = idpla;
    //                } else {
    //                    if (ngkfull == 0) return;
    //                    if (IsImageInPosition(middlegkx, middlegky)) {
    //                        //--ngkfull;
    //                        return callplayer(idpla);
    //                    }
    //                    PutInPosition(middlegkx, middlegky, 0, idpla);
    //                    --ngkfull;
    //                    //idpla.setAttributeNS(null, 'x', middlegkx);
    //                    //idpla.setAttributeNS(null, 'y', middlegky);
    //                    //whereplayeres[whereplayeres.length] = idpla;
    //                }
    //            }
    //        }
    //    }


    //    xmlhttp5.open("GET", "/SetUp/GetPlayerPosition?id=" + idpla.getAttributeNS(null, 'id'), true);
    //    xmlhttp5.send();
    //}


    //document.getElementById("idbuttonreset").onclick = function (ev) {
    //    console.log("reset");
    //    var rect = svg.getElementById("all");
    //    var pos = rect.getBoundingClientRect();
    //    var x = pos.left;
    //    var y = pos.top;

    //    var ax = ((pos.right - pos.left) / 2);;
    //    var ay = pos.top;




    //    allplayereshome.forEach(function (entry) {

    //        var oldx = entry.getAttributeNS(null, 'x');

    //        if (oldx < halfposition) {
    //            entry.setAttributeNS(null, 'x', x);
    //            entry.setAttributeNS(null, 'y', y);
    //            x = x + 50;
    //            if (x >= ((pos.right - pos.left) / 2) - 50) {
    //                y = y + 50;
    //                x = pos.left;
    //            }
    //        } else {
    //            entry.setAttributeNS(null, 'x', ax);
    //            entry.setAttributeNS(null, 'y', ay);
    //            ax = ax + 50;
    //            if (ax >= svgwidth - 50) {
    //                ay = ay + 50;
    //                ax = ((pos.right - pos.left) / 2);
    //            }
    //        }


    //    });
    //    movedowndefense = 0;
    //    amovedowndefense = 0;
    //    movedownmiddle = 0;
    //    amovedownmiddle = 0;
    //    movedownstriker = 0;
    //    amovedownstriker = 0;
    //    whereplayeres = [];
    //    andefesefull = adefense;
    //    anmiddlefull = amiddle;
    //    anstrikerfull = astriker;
    //    angkfull = agk;
    //    ndefesefull = defense;
    //    nmiddlefull = middle;
    //    nstrikerfull = striker;
    //    ngkfull = gk;

    //};

    function replace(arr , elem , newelem) {
       for (var i = 0; i < arr.length; ++i) {
           if (arr[i] == elem)
               arr[i] = newelem;
       }
    }

    
    function replacePlayer(causeId, executeId) {
        
        console.log("allplayershome", allplayershome);
        allplayershome.forEach(function (entry2) {
            console.log("alllllllplayershome", entry2.getAttributeNS(null, 'id') ,causeId);
            if (entry2.getAttributeNS(null, 'id') == causeId) {
                console.log("playersnotplaying", playersnotplaying);
                playersnotplaying.forEach(function idx(entry3) {
                    console.log("playeres not playing");
                    if (entry3.getAttributeNS(null, 'id') == executeId) {
                        console.log("playeres entry3");
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
        console.log("allplayershomeaaa", allplayershome);
        console.log("playersnotplayingaaa", playersnotplaying);
    }

    


    function FillTimeLine() {

        var xmlhttp5 = new XMLHttpRequest();
        //var idequipav = document.getElementById("iddetailssetup_idvisitor").innerHTML.trim();
        //var dataequipav = document.getElementById("iddetailssetup_datevisitor").innerHTML.trim();
        //var idequipag = document.getElementById("iddetailssetup_idagainst").innerHTML.trim();
        //var dataequipag = document.getElementById("iddetailssetup_dateagainst").innerHTML.trim();
        //var idstadium = document.getElementById("iddetailssetup_idstadium").innerHTML.trim();
        //var datahora = document.getElementById("iddetailssetup_date").innerHTML.trim();
        var itsfinish = false;
        var starmatch = null;
        var endmatch = null;

        xmlhttp5.onreadystatechange = function () {

            if (xmlhttp5.readyState == 4 && xmlhttp5.status == 200) {
                var resp = JSON.parse(xmlhttp5.response);
                console.log("resp", resp);
                resp.forEach(function (entry) {
                    //console.log("dateeeeee", entry.date);
                    var substringedDate = entry.date.substring(6); //substringedDate= 1291548407008)/
                    var parsedIntDate = parseInt(substringedDate); //parsedIntDate= 1291548407008
                    var datet = new Date(parsedIntDate);
                    console.log("dateeeeee", datet);
                    var xmlhttp1 = new XMLHttpRequest();
                    xmlhttp1.onreadystatechange = function() {

                        if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                            var resp3 = JSON.parse(xmlhttp1.response);
                            
                            var xmlhttp2 = new XMLHttpRequest();
                            xmlhttp2.onreadystatechange = function() {

                                if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
                                    var resp2 = JSON.parse(xmlhttp2.response);

                                    LineInTimeLine(entry.eventId, entry.causeId, entry.executeId, datet, resp3 , resp2);

                                    var xmlhttp = new XMLHttpRequest();
                                    xmlhttp.onreadystatechange = function () {

                                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                            var resp1 = JSON.parse(xmlhttp.response);
                                            if (resp1.Type == 'Substituição') {
                                                console.log("replacePlayer(entry.causeId, entry.executeId);", entry.causeId, entry.executeId);
                                                replacePlayer(entry.causeId, entry.executeId);
                                                if(datet.getHours()!=0 || datet.getMinutes()!=0 || datet.getSeconds()!=0)
                                                    nsubst++;

                                            }
                                            else if (resp1.Type == 'Cartão Vermelho') {
                                                removePhoto(entry.causeId);
                                            }else if (resp1.Type == 'Inicio da Partida') {
                                                //datestartmatch = new Date();
                                                console.log("INICIO DA PARTIDA");
                                                starmatch = datet;
                                                starttime(datet);
                                                if (endmatch != null) {
                                                    
                                                    clearInterval(mytimer);
                                                    var oldtimer = svg.getElementById("timer");
                                                    //console.log("timecalled");
                                                    oldtimer.innerHTML = new Date(endmatch - datet).toTimeString().substring(0, 8);
                                                }
                                            } else if (resp1.Type == 'Fim da Partida') {
                                                console.log("FIM DA PARTIDA");
                                                //itsfinish = true;
                                                endmatch = datet;
                                                clearInterval(mytimer);
                                                if (starmatch != null) {
                                                    var oldtimer = svg.getElementById("timer");
                                                    //console.log("timecalled");
                                                    oldtimer.innerHTML = new Date(starmatch - datet).toTimeString().substring(0, 8);
                                                }
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
                     "&dataagainst=" + dataequipag + "&idagainst=" + idequipag + "&negative=yes" + "&instant="+datet);
                    xmlhttp1.send();


                    
                   

                    console.log("datet", datet.toLocaleTimeString());

                    

                });

            }
        };
        xmlhttp5.open("GET", "/SetUp/GetTimeLine?idstadium=" + idstadium + "&datahora=" + datahora + "&idequipav=" + idequipav + "&dataequipav=" + dataequipav +
            "&idequipag=" + idequipag + "&dataequipag=" + dataequipag, true);
        xmlhttp5.send();

    }

    inserirnameclubs("hometeam", '0', "40%", "10%");
    inserirnameclubs("awayteam", '0', "59%", "10%");

    //console.log("xhomescore", xhomescore);
    //console.log("xhomescore", yhomescore);
    function LineInTimeLine(eventId, causeId, executeId, date , yes , no) {
        var xmlhttp6 = new XMLHttpRequest();
        xmlhttp6.onreadystatechange = function () {

            if (xmlhttp6.readyState == 4 && xmlhttp6.status == 200) {
                var resp2 = JSON.parse(xmlhttp6.response);
                console.log("resp23131", resp2);

                if (resp2.eventName == 'Golo') {

                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function() {

                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            var resp = JSON.parse(xmlhttp.response);
                            var idclub = resp.IdClub;
                            console.log("ddddddd");
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
                //hr.style.position = 'absolute';
                //hr.style.left = "10%";
                //var substringedDate = date.toString().substring(6); //substringedDate= 1291548407008)/
                //var parsedIntDate = parseInt(substringedDate); //parsedIntDate= 1291548407008
                //var datet = new Date(parsedIntDate);

                //console.log("datet", date.toLocaleTimeString());
                var txt;
                console.log("yyyyyyypres2", resp2);


                var aux = document.createTextNode("sim(" + yes + ")");
                var auxdiv = document.createElement('div');
                auxdiv.style.color = 'green';
                auxdiv.style.position = 'absolute';
                auxdiv.appendChild(aux);

                var aux1 = document.createTextNode("não(" + no + ")");
                var auxdiv1 = document.createElement('div');
                auxdiv1.style.position = 'absolute';
                auxdiv1.style.color = 'red';
                auxdiv1.style.left = aux.length+11+"%";
                auxdiv1.appendChild(aux1);

                var auxdiv2 = document.createElement('div');
                auxdiv2.style.position = 'absolute';
                auxdiv2.style.color = 'red';
                auxdiv2.style.left = aux1.length+20+"%";

                console.log("daaaaaate", date);
                console.log("daaaaaate", date.toTimeString());

                if (resp2.executeName == null) {
                    console.log("sem execute");
                    txt = document.createTextNode(" | " + date.toTimeString().substring(0,8) + ' - ' + resp2.eventName + " - " + resp2.causeName);
                } else {
                    txt = document.createTextNode(" | " + date.toTimeString().substring(0, 8) + ' - ' + resp2.eventName + " - " + resp2.causeName + " - " + resp2.executeName);
                }
                var auxdiv4 = document.createElement('div');
                auxdiv4.style.position = 'absolute';
                auxdiv4.style.color = 'black';
                auxdiv4.style.left = aux.length+aux1.length+20+"%";
                
                console.log("fontsize", txt.length, ((parseInt(timeline.style.width.substring(0, 2)) / 100) * avwidth) / 100);
                auxdiv4.appendChild(txt);
                if (auxdiv4.length > 40)
                    auxdiv4.style.fontSize = ((parseInt(timeline.style.width.substring(0, 2)) / 100) * avwidth) / (txt.length / 2.2) + "px";

                var auxdiv3 = document.createElement('div');
                auxdiv3.appendChild(auxdiv1);
                auxdiv3.appendChild(auxdiv2);
                auxdiv3.appendChild(auxdiv);
                auxdiv3.appendChild(auxdiv4);


                ////var divmain = callserverOnGetOpinionByInstant("yes");
                //////console.log("dididid1", divmain);
                ////var auxdivmain = callserverOnGetOpinionByInstant("no");
                //////console.log("dididid2", divmain);
                ////divmain = (auxdivmain != null) ? auxdivmain : divmain;
                //////console.log("dididid3", divmain);
                //var xmlhttp2 = new XMLHttpRequest();
                //xmlhttp2.onreadystatechange = function () {

                //    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
                //        var resp = JSON.parse(xmlhttp2.response);
                //        var divno = createopinionsOnTimeline("green", "yes", resp);
                //    }
                //};
                //xmlhttp2.open("GET", "/SetUp/GetOpinionByInstant?idstadium=" + idstadium + "&datahora=" + datahora + "&datavisitor=" + dataequipav + "&idvisitor=" + idequipav +
                //             "&dataagainst=" + dataequipag + "&idagainst=" + idequipag + "&negative=no");
                //xmlhttp2.send();


//var divno = createopinionsOnTimeline("red", "no");
                //divno.style.left = "10%";
                //divno.style.position = 'absolute';
                //var divmain = document.createElement('div');
                //divmain.appendChild(divyes);
                //divmain.appendChild(divno);
                //var divtxt = document.createElement('div');
                //divtxt.style.left = "20%";
                //divtxt.style.position = 'absolute';
                //divtxt.appendChild(txt);
                ////console.log("dididid", divmain);
                //divmain.appendChild(divtxt);
                //hr.appendChild(divmain);
                hr.appendChild(auxdiv3);
                hr.style.fontSize = avwidth / 70 + "px";

                if (timeline.firstChild != null) {
                    var allchilds = timeline.childNodes;
                    //console.log("frst", allchilds);
                    console.log("frstllll", allchilds.length);
                    for (var i = 0; i < allchilds.length; ++i) {
                        //console.log("frst", allchilds[i].childNodes[0].childNodes[3].innerHTML.substring(3,11));
                        if (allchilds[i].childNodes[0].childNodes[3].innerHTML.substring(3, 11) < date.toTimeString()) {
                            console.log("entrou");
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

    var ncount = 0;
    var lastresp = null;
    function callserverOnGetOpinionByInstant(opinion) {
        var xmlhttp1 = new XMLHttpRequest();
        xmlhttp1.onreadystatechange = function () {

            if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                ++ncount;
                var resp = JSON.parse(xmlhttp1.response);
                ////if (ncount == 2) {
                ////    if (opinion == 'yes') {
                ////        var divyes = createopinionsOnTimeline("green", "yes", resp);
                ////        var divno = createopinionsOnTimeline("green", "no", lastresp);
                ////        console.log("didididy1", divyes);
                ////        console.log("didididy2", divno);
                ////    } else {
                ////        var divno = createopinionsOnTimeline("green", "no", resp);
                ////        var divyes = createopinionsOnTimeline("green", "yes", lastresp);
                ////        console.log("didididn1", divyes);
                ////        console.log("didididn2", divno);
                ////    }
                ////    divyes.style.left = "5%";
                ////    divyes.style.position = 'absolute';

                ////    divno.style.left = "10%";
                ////    divno.style.position = 'absolute';
                ////    var divmain = document.createElement('div');
                ////    divmain.appendChild(divyes);
                ////    divmain.appendChild(divno);

                ////    return divmain;


                ////} else {
                ////    lastresp = resp;
                ////    return null;
                ////}
                
                
                //var divyes = createopinionsOnTimeline("green", "yes", resp);
            }
        };
        xmlhttp1.open("GET", "/SetUp/GetOpinionByInstant?idstadium=" + idstadium + "&datahora=" + datahora + "&datavisitor=" + dataequipav + "&idvisitor=" + idequipav +
                     "&dataagainst=" + dataequipag + "&idagainst=" + idequipag + "&negative="+opinion);
        xmlhttp1.send();
    }

    function createopinionsOnTimeline(color , opinion , perc) {
        var divmain = document.createElement('div');

        var divs = document.createElement('div');
        //divs.id = 'timeline';
        divs.style.width = '5%';
        divs.style.height = '3%';
        divs.style.position = 'absolute';
        divs.style.color = color;
        //divs.style.left = "10%";
        //divs.style.top = top + "px";

        var txtnode = document.createTextNode(opinion+"-"+perc);
        divs.appendChild(txtnode);
        divmain.appendChild(divs);
        //divmain.appendChild(divtxt);
        return divmain;
    }

    //document.getElementById("idbuttonsave").onclick = function (ev) {

    //    var idequipav = document.getElementById("iddetailssetup_idvisitor").innerHTML.trim();
    //    var dataequipav = document.getElementById("iddetailssetup_datevisitor").innerHTML.trim();
    //    var idequipag = document.getElementById("iddetailssetup_idagainst").innerHTML.trim();
    //    var dataequipag = document.getElementById("iddetailssetup_dateagainst").innerHTML.trim();
    //    var idstadium = document.getElementById("iddetailssetup_idstadium").innerHTML.trim();
    //    var datahora = document.getElementById("iddetailssetup_date").innerHTML.trim();
    //    var dt = new Date();

    //    var aa = document.getElementById("svgobject");
    //    var svgg = a.contentDocument;
    //    //svgg.documentElement.innerHTML;
    //    var xmlhttp6 = new XMLHttpRequest();
    //    xmlhttp6.onreadystatechange = function () {

    //        if (xmlhttp6.readyState == 4 && xmlhttp6.status == 200) {
    //            //var resp2 = JSON.parse(xmlhttp6.response);
    //        }
    //    };
    //    xmlhttp6.open("POST", "/SetUp/InsertLayout", true);
    //    xmlhttp6.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");

    //    xmlhttp6.send("idstadium=" + idstadium + "&datahora=" + datahora + "&idequipav=" + idequipav + "&dataequipav=" + dataequipav +
    //        "&idequipag=" + idequipag + "&dataequipag=" + dataequipag + "&datenow=" + dt + "&svg=" + svgg.documentElement.innerHTML);

    //}



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
    //timeline.style.backgroundColor = 'green';
    document.body.appendChild(timeline);




    function createRect(x,y , h , id) {
        var rectexecutor = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rectexecutor.setAttributeNS(null, 'height', h);
        rectexecutor.setAttributeNS(null, 'width', '5%');
        rectexecutor.setAttributeNS(null, 'id', id+"rect");
        rectexecutor.setAttributeNS(null, 'style', 'fill:blue;stroke:black');
        rectexecutor.setAttributeNS(null, 'x', x);
        rectexecutor.setAttributeNS(null, 'y', y);
        rectexecutor.setAttributeNS(null, 'visibility', 'visible');
        svg.getElementById("all").appendChild(rectexecutor);
    }


    function creatediv(left, top, name) {
        console.log("left", left);
        console.log("top", top);
        console.log("name", name);
        var divs = document.createElement('div');
        //divs.id = 'timeline';
        divs.style.width = '150px';
        divs.style.height = '30px';
        divs.style.position = 'absolute';
        divs.style.left = left + "px";
        divs.style.top = top + "px";
        divs.style.border = 'ridge';
        //timeline.style.backgroundColor = 'green';

        var evname = document.createTextNode(name);
        //evname.style.width = '15px';
        //evname.style.height = '10px';
        //evname.style.position = 'absolute';
        //evname.style.left = left+5;
        //evname.style.top = top;
        divs.appendChild(evname);


        var divcount = document.createElement('div');
        divcount.style.width = '30px';
        divcount.style.height = '30px';
        divcount.style.position = 'absolute';
        divcount.style.left = "115px";
        divcount.style.top = "0px";
        divcount.style.border = 'hidden';

        var evcount = document.createTextNode("0");
        divcount.appendChild(evcount);
        //evcount.style.width = '5px';
        //evcount.style.height = '10px';
        //evcount.style.position = 'absolute';
        //evcount.style.left = left+10;
        //evcount.style.top = top;

        divs.appendChild(divcount);

        document.body.appendChild(divs);
    }


    function createMyCounters(name, number, x, y , opinion) {
        var divmain = document.createElement('div');
        //divmain.id = 'n' + name;
        divmain.style.position = 'absolute';
        divmain.style.width = '100%';
        divmain.style.height = '100%';
        divmain.style.left = (opinion=='yes')?"0%":'50%';
        //divmain.style.top = y+"px";

        var divcount = document.createElement('div');
        divcount.id = 'c'+name+opinion;
        divcount.style.width = '10%';
        divcount.style.height = '20%';
        divcount.style.position = 'absolute';
        //divcount.style.left = (opinion == 'yes') ? "0%" : '50%';
        divcount.style.left = '15%';
        divcount.style.top = "0%";

        var evcount = document.createTextNode(number);
        divcount.style.fontSize = avwidth/100+"px";
        divcount.appendChild(evcount);

        var divbar = document.createElement('div');
        divbar.id = 'b' + name + opinion;
        divbar.style.width = '40%';
        divbar.style.height = (number*100/avheight)+"%";
        divbar.style.backgroundColor = "blue";
        divbar.style.position = 'absolute';
        divbar.style.left = '5%';
        divbar.style.top = '20%';
        //divbar.appendChild(document.createTextNode(number));

        var divname = document.createElement('div');
        divname.id = 'n' + name + opinion;
        divname.style.width = '100%';
        divname.style.height = '0%';
        divname.style.position = 'absolute';
        divname.style.left = "10%";
        divname.style.top = (number*100/avheight) + 20 + "%";
        var evname = document.createTextNode((opinion=='yes')?"sim":"não");
        divname.style.fontSize = avwidth/100+"px";
        //console.log("evname", name);
        divname.appendChild(evname);

        //var divname = document.createElement('div');
        //divname.style.width = '0%';
        //divname.style.height = '0%';
        //divname.style.position = 'absolute';
        //divname.style.left = "20%";
        //divname.style.top = (number*50/100)+15+"%";
        //var evname = document.createTextNode(name);
        //divname.style.fontSize = "8px";
        ////console.log("evname", name);
        //divname.appendChild(evname);




        //divs.style.border = 'ridge';
        divmain.appendChild(divcount);
        divmain.appendChild(divbar);
        divmain.appendChild(divname);
        //document.body.appendChild(divmain);
        //document.body.appendChild(divcount);
        //document.body.appendChild(divbar);
        return divmain;
    }


    function createalldivs() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var resp = JSON.parse(xmlhttp.response);
                var xleft = null;
                var xtop = 550;
                var nevents = resp.length;
                var xpos = (avwidth / 2 /(nevents*2))*100/avwidth;
                var ypos = avheight+50;
                var accxpos = xpos+"%";
                resp.forEach(function (entry) {

                    var xmlhttp1 = new XMLHttpRequest();
                    xmlhttp1.onreadystatechange = function() {

                        if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                            var resp2 = JSON.parse(xmlhttp1.response);

                            var xmlhttp2 = new XMLHttpRequest();
                            xmlhttp2.onreadystatechange = function() {

                                if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
                                    var resp3 = JSON.parse(xmlhttp2.response);

                                    console.log("entry.type", entry.Type);
                                    console.log("resp2", resp2);
                                    console.log("accxpos", accxpos);
                                    xleft = accxpos;
                                    var divyes = createMyCounters(entry.Id, resp2, accxpos, ypos , "yes");
                                    accxpos = parseInt(accxpos.substring(0, accxpos.length - 1)) + xpos + "%";
                                    var divno = createMyCounters(entry.Id, resp3, accxpos, ypos , "no");
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
                                    //divev.style.maxWidth = '1%';
                                    //divev.style.height = '19%';
                                    //divev.style.left = "0%";
                                    //divev.style.right = "100%";
                                    divev.style.top = (resp2 > resp3) ? resp2 + 20 + 15 + "%" : resp3 + 20 + 15 + "%";


                                    var evname = document.createTextNode(entry.Type);
                                    divev.style.fontSize = avwidth/100+"px";
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

                    //creatediv(xleft, xtop, entry.Type);
                    //if (xleft >= 900) {
                    //    xtop += 35;
                    //    xleft = 80;
                    //} else {
                    //    xleft += 155;
                    //}
                });
            }
        };
        xmlhttp.open("GET", "/SetUp/GetEvents", true);
        xmlhttp.send();
    }

     createalldivs();








     google.load('visualization', '1.0', { 'packages': ['corechart'], callback: drawChart });

    // Set a callback to run when the Google Visualization API is loaded.
     google.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
     function drawChart() {
         var mainarryes = [];
         var mainarrayno = [];
         var xmlhttp = new XMLHttpRequest();

         xmlhttp.onreadystatechange = function() {

             if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                 var resp2 = JSON.parse(xmlhttp.response);

                 createstatevent(resp2, mainarryes, 'yes', 'chart_div');
                 createstatevent(resp2, mainarrayno, 'no', 'chart_div2');

                 //var lengthevents = resp2.length;
                 //var nev = 0;
                 //resp2.forEach(function(entry) {
                 //    var objarr = [];

                 //    mainarr[mainarr.length] = objarr;
                 //    var xmlhttp1 = new XMLHttpRequest();
                 //    xmlhttp1.onreadystatechange = function() {

                 //        if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                 //            var resp3 = JSON.parse(xmlhttp1.response);
                 //            objarr[objarr.length] = entry.Type;
                 //            objarr[objarr.length] = resp3;
                 //            ++nev;
                 //            if (nev == lengthevents) {
                 //                console.log("torresmos", mainarr);
                 //                var data = new google.visualization.DataTable();
                 //                data.addColumn('string', 'Topping');
                 //                data.addColumn('number', 'Slices');
                 //                data.addRows(mainarr);
                 //                //console.log("iiiiiii", window.screen.availWidth/4);
                 //                // Set chart options
                 //                var options = {
                 //                    'title': 'Estatistica yes',
                 //                    'width': window.screen.availWidth / 5,
                 //                    'height': window.screen.availHeight / 5
                 //                };

                 //                // Instantiate and draw our chart, passing in some options.
                 //                var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
                 //                chart.draw(data, options);
                 //            }
                 //        }
                 //    };
                 //    xmlhttp1.open("GET", "/SetUp/GetOpinionByEvent?idstadium=" + idstadium + "&datahora=" + datahora + "&datavisitor=" + dataequipav + "&idvisitor=" + idequipav +
                 //            "&dataagainst=" + dataequipag + "&idagainst=" + idequipag + "&iduser=" + document.getElementById("curruserid").innerHTML.trim() + "&idevent=" + entry.Id + "&negative=yes");
                 //    xmlhttp1.send();
                 //});
             }
         };

         xmlhttp.open("GET", "/SetUp/GetEvents", true);
         xmlhttp.send();
         // Create the data table.
         
     }

    function createstatevent(resp2 , mainarr , opinion, iddiv) {
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
                        console.log("torresmos", mainarr);
                        var data = new google.visualization.DataTable();
                        data.addColumn('string', 'Topping');
                        data.addColumn('number', 'Slices');
                        data.addRows(mainarr);
                        //console.log("iiiiiii", window.screen.availWidth/4);
                        // Set chart options
                        //var avheight = window.innerHeight / 1.5;
                        var options = {
                            'title': 'Estatistica ' + ((opinion == "yes") ? "sim" : "não"),
                            'width': avwidth/4,
                            'height': avheight/3
                        };
                        console.log("chartsscrre", window.screen.availWidth / 6);
                        // Instantiate and draw our chart, passing in some options.
                        var chart = new google.visualization.PieChart(document.getElementById(iddiv));
                        chart.draw(data, options);
                    }
                }
            };
            xmlhttp1.open("GET", "/SetUp/GetOpinionByEvent?idstadium=" + idstadium + "&datahora=" + datahora + "&datavisitor=" + dataequipav + "&idvisitor=" + idequipav +
                    "&dataagainst=" + dataequipag + "&idagainst=" + idequipag + "&iduser=" + document.getElementById("curruserid").innerHTML.trim() + "&idevent=" + entry.Id + "&negative="+opinion);
            xmlhttp1.send();
        });

    }

};
})(window, window.document);