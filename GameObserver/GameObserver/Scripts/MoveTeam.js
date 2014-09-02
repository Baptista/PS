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
    var allpostions;
    var gk;
    var middledefensey;
    var middledefensex;
    var middlex;
    var middley;
    var middlestrikery;
    var middlestrikerx;
    var middlegkx;
    var middlegky;

    var movedowndefense = 0;
    var movedownmiddle = 0;
    var movedownstriker = 0;

    var amovedowndefense = 0;

    var ndefensehome = 1;
    var nmiddlehome = 1;
    var nstrikerhome = 1;


    var indefense = 1;
    var inmiddle = 1;
    var instriker = 1;


    var ndefesefull;
    var nmiddlefull;
    var nstrikerfull;
    var ngkfull;

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
    movey = svg.getElementById("uprect").getBoundingClientRect().height / 1.3;

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

            middlex = (svgwidth / 2);
            middley = (yfield / (parseInt(middle) + 1));
            middlestrikery = (yfield / (parseInt(striker) + 1));
            middlestrikerx = ((svgwidth / 2) + (middledefensex));

            middlegkx = 0;
            middlegky = (yfield / (parseInt(gk) + 1));


        }
    };

    var idq = document.getElementById("idteamclub").innerHTML;
    var dataq = document.getElementById("idteamdata").innerHTML;
    xmlhttp3.open("GET", "/SetUp/GetFormation?id=" + idq + "&dateq=" + dataq, true);
    xmlhttp3.send();




    loadpostions();


    function loadpostions() {

        var x = 0;
        var y = 0;

        var xmlhttp5 = new XMLHttpRequest();

        xmlhttp5.onreadystatechange = function () {

            if (xmlhttp5.readyState == 4 && xmlhttp5.status == 200) {
                var resp = JSON.parse(xmlhttp5.response);

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
                                            x = x + (svgwidth / 30);

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
                                            x = x + (svgwidth / 30);

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
                                            x = x + (svgwidth / 30);

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
                                            x = x + (svgwidth / 30);

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

                                x = x + (svgwidth / 20);

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

        if (IsOccupied(savepositions, allplayershome)) {
            return nextposition(mx, my, formati);
        }
        return savepositions;
    }

    var tempimages = [];

    function removeTempImages() {
        for (var i = 0; i < tempimages.length; i++) {
            svg.getElementById("all").removeChild(tempimages[i]);
        }
        movedowndefense = 0;
    }


    var showdetails = [];

    function removedetails() {
        for (var i = 0; i < showdetails.length; ++i) {
            svg.getElementById("all").removeChild(showdetails[i]);
        }
        showdetails = [];
    }



    function PhotoonSvg(id, photo, posx, posy) {
        var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');

        svgimg.setAttributeNS(null, 'height', "10%");
        svgimg.setAttributeNS(null, 'width', "10%");
        svgimg.setAttributeNS(null, 'id', id);
        svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', "../fonts/" + photo);
        svgimg.setAttributeNS(null, 'x', posx);
        svgimg.setAttributeNS(null, 'y', posy);
        svgimg.setAttributeNS(null, 'visibility', 'visible');
        svg.getElementById("all").appendChild(svgimg);

        svgimg.onclick = function () {


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


                    var substringedDate = resp.Born.substring(6);
                    var parsedIntDate = parseInt(substringedDate);
                    var date = new Date(parsedIntDate);

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

        var helloTxt = document.createTextNode(name);

        txtElem.appendChild(helloTxt);
        showdetails[showdetails.length] = txtElem;
        svg.getElementById("all").appendChild(txtElem);
        return txtElem;

    }






    var OldCoor = {};
    var PosToMove = [];


    function IsInPositonRange(x, y) {

        for (var i = 0; i < PosToMove.length; ++i) {
            if (x <= PosToMove[i].x + 50 && y <= PosToMove[i].y + 50) {
                return true;
            }
        }
        return false;
    }



    TrueCoords = SVGRoot.createSVGPoint();
    GrabPoint = SVGRoot.createSVGPoint();

    var currpos;

    BackDrop = svg.getElementById('all');



    var timer = 200;
    var isclick = true;
    var functimer = null;
    var oldtarget = null;


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
            return false;
        }

        OldCoor.x = targetElement.getAttributeNS(null, 'x');
        OldCoor.y = targetElement.getAttributeNS(null, 'y');
        OldCoor.id = targetElement.getAttributeNS(null, 'id');

        functimer = setTimeout(
            function CreateTempImages() {

                functimer = null;
                isclick = true;

                tempimages = [];


                OldCoor.x = targetElement.getAttributeNS(null, 'x');
                OldCoor.y = targetElement.getAttributeNS(null, 'y');
                OldCoor.id = targetElement.getAttributeNS(null, 'id');
                var xmlhttp4 = new XMLHttpRequest();

                xmlhttp4.onreadystatechange = function () {

                    if (xmlhttp4.readyState == 4 && xmlhttp4.status == 200) {
                        var resp = JSON.parse(xmlhttp4.response);
                        var pos = resp.Designation;

                        currpos = pos;
                        if (pos == "Defesa") {

                            for (var i = 0; i < ndefesefull; ++i) {

                                if (!IsImageInPosition(allplayershome, middledefensex, middledefensey * ndefensehome + movey)) {

                                    var o = {};
                                    o.x = middledefensex;
                                    o.y = middledefensey * ndefensehome + movey;

                                    PosToMove[PosToMove.length] = o;

                                    tempimages[tempimages.length] = PhotoonSvg(null, "empty.jpg", o.x, o.y);
                                } else {
                                    --i;
                                }
                                ++ndefensehome;
                            }


                        } else if (pos == "Medio") {


                            nmiddlehome = inmiddle;
                            for (var i = 0; i < nmiddlefull; ++i) {

                                if (!IsImageInPosition(allplayershome, middlex, middley * nmiddlehome + movey)) {
                                    var o = {};
                                    o.x = middlex;
                                    o.y = middley * nmiddlehome + movey;

                                    PosToMove[PosToMove.length] = o;
                                    tempimages[tempimages.length] = PhotoonSvg(null, "empty.jpg", o.x, o.y);
                                } else {
                                    --i;
                                }
                                ++nmiddlehome;
                            }

                        } else if (pos == "Ataque") {
                            nstrikerhome = instriker;
                            for (var i = 0; i < nstrikerfull; ++i) {
                                if (!IsImageInPosition(allplayershome, middlestrikerx, middlestrikery * nstrikerhome + movey)) {
                                    var o = {};
                                    o.x = middlestrikerx;
                                    o.y = middlestrikery * nstrikerhome + movey;

                                    PosToMove[PosToMove.length] = o;
                                    tempimages[tempimages.length] = PhotoonSvg(null, "empty.jpg", o.x, o.y);
                                } else {
                                    --i;
                                }
                                ++nstrikerhome;
                            }

                        } else if (pos == "Guarda-redes") {
                            if (ngkfull == 0) return;

                            var o = {};
                            o.x = middlegkx;
                            o.y = middlegky + movey;

                            PosToMove[PosToMove.length] = o;
                            tempimages[tempimages.length] = PhotoonSvg(null, "empty.jpg", o.x, o.y);
                        }

                    }
                }

                xmlhttp4.open("GET", "/SetUp/GetPlayerPosition?id=" + targetElement.id, true);
                xmlhttp4.send();

                if (BackDrop != targetElement) {

                    DragTarget = targetElement;

                    DragTarget.parentNode.appendChild(DragTarget);
                    DragTarget.setAttributeNS(null, 'pointer-events', 'none');

                    GrabPoint.x = TrueCoords.x;
                    GrabPoint.y = TrueCoords.y;

                }
            }
            , timer);

    };
    SVGDocument.onmousemove = function (evt) {
        GetTrueCoords(evt);
        if (DragTarget) {
            var newX = TrueCoords.x - GrabPoint.x;
            var newY = TrueCoords.y - GrabPoint.y;

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

    function IsImageInPosition(arr, x, y) {

        for (var i = 0; i < arr.length; ++i) {
            var coorx = arr[i].getAttributeNS(null, "x");
            var coory = arr[i].getAttributeNS(null, "y");

            if (x <= parseInt(coorx) + (svgwidth / 20) && x >= parseInt(coorx) - (svgwidth / 20) && y <= parseInt(coory) + (svgwidth / 20) && y >= parseInt(coory) - (svgwidth / 20)) {
                return arr[i];
            }
        }
        return null;
    }



    SVGDocument.onmouseup = function (evt) {

        if (evt.which == 3) {

            return false;
        }

        if (functimer) {

            clearTimeout(functimer);
            return true;

        }
        if (DragTarget == null) {
            return false;
        }

        isclick = false;

        if (evt.target.nodeName != 'image') {

            DragTarget.setAttributeNS(null, 'x', OldCoor.x);
            DragTarget.setAttributeNS(null, 'y', OldCoor.y);
            DragTarget.setAttributeNS(null, 'transform', "");
            DragTarget.setAttributeNS(null, 'pointer-events', 'all');
            nmiddlehome = 1;
            ndefensehome = 1;
            nstrikerhome = 1;
            DragTarget = null;
            removeTempImages();
            return false;
        }
        if (evt.target.nodeName == 'circle') {
            return false;
        }


        var oldimg = IsImageInPosition(allplayershome, evt.clientX, evt.clientY);

        if (oldimg != null) {

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

            removeTempImages();
            nmiddlehome = 1;
            ndefensehome = 1;
            nstrikerhome = 1;
            DragTarget = null;
            return false;
        }


        if (!IsInPositonRange(evt.clientX, evt.clientY)) {

            DragTarget.setAttributeNS(null, 'x', OldCoor.x);
            DragTarget.setAttributeNS(null, 'y', OldCoor.y);
            DragTarget.setAttributeNS(null, 'transform', "");
            DragTarget.setAttributeNS(null, 'pointer-events', 'all');

            DragTarget = null;
            removeTempImages();

            return false;
        }

        if (DragTarget) {

            DragTarget.setAttributeNS(null, 'pointer-events', 'all');
            var upcircle = whitchcircle(evt);

            DragTarget.setAttributeNS(null, 'x', upcircle.getAttributeNS(null, "x"));
            DragTarget.setAttributeNS(null, 'y', upcircle.getAttributeNS(null, "y"));
            DragTarget.setAttributeNS(null, 'transform', "");

            allplayershome[allplayershome.length] = DragTarget;
            removeElemFromArray(playersnotplaying, DragTarget);


            if (currpos == "Defesa") {

                ndefesefull--;

                indefense++;

            } else if (currpos == "Medio") {

                nmiddlefull--;
                inmiddle++;

            } else if (currpos == "Ataque") {

                nstrikerfull--;
                instriker++;

            } else if (currpos == "Guarda-redes") {

                ngkfull--;

            }
            DragTarget = null;
            movedowndefense = 0;
            amovedowndefense = 0;
            nmiddlehome = 1;
            ndefensehome = 1;
            nstrikerhome = 1;
            removeTempImages();

        }
        return true;
    };

    function removeElemFromArray(arr, elem) {
        for (var i = 0; i < arr.length ; i++) {
            if (arr[i] == elem) {
                arr.splice(i, 1);
            }
        }
    }


    function GetTrueCoords(evt) {

        TrueCoords.x = evt.clientX;
        TrueCoords.y = evt.clientY;

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
                    if (IsImageInPosition(allplayershome, middledefensex, middledefensey * ndefensehome + movey)) {
                        movedowndefense += (svgheight / defense) / 6;
                        ++ndefensehome;
                        return callplayer(idpla);
                    }


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
                    if (IsImageInPosition(allplayershome, middlex, middley * nmiddlehome + movey)) {
                        movedownmiddle += (svgheight / middle) / 6;
                        ++nmiddlehome;
                        return callplayer(idpla);
                    }
                    idpla.setAttributeNS(null, 'x', middlex);
                    idpla.setAttributeNS(null, 'y', middley * nmiddlehome + movey);
                    ++nmiddlehome;
                    allplayershome[allplayershome.length] = idpla;
                    removeElemFromArray(playersnotplaying, idpla);

                    --nmiddlefull;

                    movedownmiddle += (svgheight / middle) / 6;

                }
                if (pos == "Ataque") {


                    if (nstrikerfull == 0) return;
                    if (IsImageInPosition(allplayershome, middlestrikerx, middlestrikery * nstrikerhome + movey)) {
                        movedownstriker += (svgheight / striker) / 6;
                        ++nstrikerhome;
                        return callplayer(idpla);
                    }
                    idpla.setAttributeNS(null, 'x', middlestrikerx);
                    idpla.setAttributeNS(null, 'y', middlestrikery * nstrikerhome + movey);
                    ++nstrikerhome;
                    allplayershome[allplayershome.length] = idpla;
                    removeElemFromArray(playersnotplaying, idpla);
                    --nstrikerfull;
                    movedownstriker += (svgheight / striker) / 6;

                }
                if (pos == "Guarda-redes") {

                    if (ngkfull == 0) return;
                    if (IsImageInPosition(allplayershome, middlegkx, middlegky + movey)) {
                        return callplayer(idpla);
                    }
                    idpla.setAttributeNS(null, 'x', middlegkx);
                    idpla.setAttributeNS(null, 'y', middlegky + movey);
                    allplayershome[allplayershome.length] = idpla;
                    removeElemFromArray(playersnotplaying, idpla);
                    --ngkfull;
                }
            }
        };


        xmlhttp5.open("GET", "/SetUp/GetPlayerPosition?id=" + idpla.getAttributeNS(null, 'id'), true);
        xmlhttp5.send();
    }


    document.getElementById("idbuttonreset").onclick = function (ev) {

        var x = 0;
        var y = 0;

        allplayershome.forEach(function again(entry) {

            var o = {};
            o.x = x;
            o.y = y;
            if (IsOccupied(o, playersnotplaying)) {

                x = x + (svgwidth / 20);

                return again(entry);
            } else {

                entry.setAttributeNS(null, 'x', x);
                entry.setAttributeNS(null, 'y', y);

                playersnotplaying[playersnotplaying.length] = entry;
                x = x + (svgwidth / 20);

            }
            return true;
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

        if (allplayershome.length < 7) return;
        allplayershome.forEach(function (entry) {

            var imgx = entry.getAttributeNS(null, 'x');

            var pos;
            if (entry.getAttributeNS(null, 'y') > movey) {
                if (imgx == middlegkx) {
                    pos = 1;

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

