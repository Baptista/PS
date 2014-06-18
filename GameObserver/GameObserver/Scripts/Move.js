window.onload = function() {

    var savepositions;

    var a = document.getElementById("svgobject");
    var svg = a.contentDocument;
    var svgheight = a.getBoundingClientRect().height;
    var svgwidth = a.getBoundingClientRect().width;
    console.log("with", svgwidth);
    console.log("height", svgheight);
    var allplayereshome = [];
    var allplayeresaway = [];

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

    var movedowndefense=0;
    var movedownmiddle=0;
    var movedownstriker=0;

    var ndefensehome=0;
    var nmiddlehome=0;
    var nstrikerhome=0;

    var ndefesefull;
    var nmiddlefull;
    var nstrikerfull;
    var ngkfull;
    var andefesefull;
    var anmiddlefull;
    var anstrikerfull;
    var angkfull;

    var whereplayeres = [];

    function IsOccupied(save, wherepla) {
        for (var i = 0; i < wherepla.length; ++i) {
            if (wherepla[i].getAttributeNS(null, 'x') == save.x && wherepla[i].getAttributeNS(null, 'y') == save.y) {
                return true;
            }
        }
        return false;
    }


    function nextposition(mx,my,formati) {
        savepositions = new Object();
        
        savepositions.x = mx;
        savepositions.y = (my + movedowndefense);
        movedowndefense += (svgheight / formati)/2;
        
        if (IsOccupied(savepositions, whereplayeres)) {
            return nextposition(mx,my,formati);
        }
        return savepositions;
    }

    var allcircles = [];

    function createcircle(xx, yy) {
        console.log("create circles" , xx , yy);
        var circles = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circles.setAttribute("cx", xx);
        circles.setAttribute("cy", yy);
        circles.setAttribute("fill", "#ffffff");
        circles.setAttribute("stroke", "#000000");
        circles.setAttribute("r", 15);
        circles.setAttribute("id", "circ");
        svg.getElementById("all").appendChild(circles);
        allcircles[allcircles.length] = circles;
    }

    function removecircles(circles) {
        console.log("remove circles");
        for (var i = 0; i < circles.length; ++i) {
            svg.getElementById("all").removeChild(circles[i]);
        }
    }

    var xmlhttp3 = new XMLHttpRequest();

    xmlhttp3.onreadystatechange = function() {

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
            
            middledefensey = (svgheight / defense) + ((svgheight /defense)/2);
            middledefensex = (((svgwidth / 2)/ defense)/2);
            //////////////////////alterar
            middlex = ((svgwidth / 4) - (middledefensex));
            middley = (svgheight / middle) + ((svgheight / middle) / 2);
            middlestrikery = svgheight / (striker);
            middlestrikerx = ((svgwidth / 2)-(middlex));
            middlegkx = 20;
            middlegky = (svgheight / 2)+50;
            
            
        }
    };
    var idq = document.getElementById("iddetailssetup_idvisitor").innerHTML;
    var dataq = document.getElementById("iddetailssetup_datevisitor").innerHTML;
    xmlhttp3.open("GET", "/SetUp/GetFormation?id=" + idq + "&dateq=" + dataq, true);
    xmlhttp3.send();



    var xmlhttp7 = new XMLHttpRequest();

    xmlhttp7.onreadystatechange = function() {

        if (xmlhttp7.readyState == 4 && xmlhttp7.status == 200) {
            var resp = JSON.parse(xmlhttp7.response);

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

            
            amiddledefensey = (svgheight / adefense) + ((svgheight / adefense) / 2);
            console.log("amiddledefensey", amiddledefensey);
            amiddledefensex = svgwidth - (((svgwidth / 2) / adefense) / 2);
            console.log("amiddledefensex", amiddledefensex);
            console.log("cenas", ((svgwidth / 4)));
            amiddlex = (svgwidth - ((svgwidth / 4) - (svgwidth - amiddledefensex)));
            console.log("amiddlex", amiddlex);
            amiddley = (svgheight / amiddle) + ((svgheight / amiddle) / 2);
            console.log("amiddley", amiddley);
            amiddlestrikery = svgheight / (astriker);
            amiddlestrikerx = (svgwidth - ((svgwidth / 2) - (svgwidth - amiddlex)));
            console.log("amiddlestrikerx", amiddlestrikerx);
            amiddlegkx = svgwidth - 20;
            amiddlegky = (svgheight / 2) + 50;
        }
    };
    var aidq = document.getElementById("iddetailssetup_idagainst").innerHTML;
    var adataq = document.getElementById("iddetailssetup_dateagainst").innerHTML;
    xmlhttp7.open("GET", "/SetUp/GetFormation?id=" + aidq + "&dateq=" + adataq, true);
    xmlhttp7.send();


    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var resp = JSON.parse(xmlhttp.response);
            var rect = svg.getElementById("all");
            var pos = rect.getBoundingClientRect();
            var x = pos.left;
            var y = pos.top;
            resp.forEach(function (entry) {
                var imgadd = PhotoonSvg(entry, x, y);
                x = x + 50;
                if (x >= ((pos.right - pos.left) / 2)-50) {
                    y = y + 50;
                    x = pos.left;
                }
                allplayereshome[allplayereshome.length] = imgadd;
            });
        }

    };
    var idequipa = document.getElementById("iddetailssetup_idvisitor").innerHTML;
    var dataequipa = document.getElementById("iddetailssetup_datevisitor").innerHTML;
    xmlhttp.open("GET", "/SetUp/GetPlayers?id="+idequipa+"&dateq="+dataequipa, true);
    xmlhttp.send();


    var xmlhttp2= new XMLHttpRequest();

    xmlhttp2.onreadystatechange = function () {

        if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
            var resp2 = JSON.parse(xmlhttp2.response);
            var rect = svg.getElementById("all");
            var pos = rect.getBoundingClientRect();
            var x = ((pos.right - pos.left) / 2);
            var y = pos.top;
            resp2.forEach(function (entry) {
                var img = PhotoonSvg(entry, x, y);
                x = x + 50;
                if (x >= pos.right-50) {
                    y = y + 50;
                    x = ((pos.right - pos.left) / 2);
                }
                allplayeresaway[allplayeresaway.length] = img;
            });
        }
    };
    idequipa = document.getElementById("iddetailssetup_idagainst").innerHTML;
    dataequipa = document.getElementById("iddetailssetup_dateagainst").innerHTML;
    xmlhttp2.open("GET", "/SetUp/GetPlayers?id=" + idequipa + "&dateq=" + dataequipa, true);
    xmlhttp2.send();


    function PhotoonSvg(entry, posx, posy) {
        var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        svgimg.setAttributeNS(null, 'height', '50');
        svgimg.setAttributeNS(null, 'width', '50');
        svgimg.setAttributeNS(null, 'id', entry.Id);
        svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', entry.Photo);
        svgimg.setAttributeNS(null, 'x', posx);
        svgimg.setAttributeNS(null, 'y', posy);
        svgimg.setAttributeNS(null, 'visibility', 'visible');
        svg.getElementById("all").appendChild(svgimg);
        return svgimg;
    }
    

    var SVGDocument = null;
    var SVGRoot = null;
    var TrueCoords = null;
    var GrabPoint = null;
    var BackDrop = null;
    var DragTarget = null;


    var OldCoor={};
    var PosToMove = [];
    var aPosToMove = [];
    

    function IsInPositonRange(x, y) {
        
        for (var i = 0; i < PosToMove.length; ++i) {
            if (x <= PosToMove[i].x + 30 && x >= PosToMove[i].x - 30 && y <= PosToMove[i].y + 30 && y >= PosToMove[i].y - 30) {
                return true;
            }
        }
        return false;
    }

    function aIsInPositonRange(x, y) {

        for (var i = 0; i < aPosToMove.length; ++i) {
            if (x <= aPosToMove[i].x + 30 && x >= aPosToMove[i].x - 30 && y <= aPosToMove[i].y + 30 && y >= aPosToMove[i].y - 30) {
                return true;
            }
        }
        return false;
    }





    
    SVGDocument = svg;
    SVGRoot = SVGDocument.documentElement;
    TrueCoords = SVGRoot.createSVGPoint();
    GrabPoint = SVGRoot.createSVGPoint();

    var currpos;

    BackDrop = svg.getElementById('all');
    
    SVGDocument.onmousedown = function (evt) {
        allcircles = [];
        var targetElement = evt.target;
        if (targetElement.nodeName != 'image') {
            return;
        }
        
        OldCoor.x = targetElement.getAttributeNS(null, 'x');
        OldCoor.y = targetElement.getAttributeNS(null, 'y');
        OldCoor.id = targetElement.getAttributeNS(null, 'id');
        var xmlhttp4= new XMLHttpRequest();

        xmlhttp4.onreadystatechange = function() {

            if (xmlhttp4.readyState == 4 && xmlhttp4.status == 200) {
                var resp = JSON.parse(xmlhttp4.response);
                var pos = resp.Designation;
                var next;
                currpos = pos;
                if (pos == "Defesa") {
                    console.log("defesa");
                    allcircles = [];
                    for (var i = 0; i < ndefesefull; ++i) {
                        if (evt.clientX >= middlex) {
                            console.log("em casa");
                            next = nextposition(amiddledefensex, amiddledefensey, adefense);
                            PosToMove[PosToMove.length] = next;
                        } else {
                            next = nextposition(middledefensex, middledefensey, defense);
                            PosToMove[PosToMove.length] = next;
                        }
                        
                        createcircle(next.x, next.y);
                    }
                    ndefensehome=0;
                }else if (pos == "Medio") {
                    allcircles = [];
                    for (var i = 0; i < nmiddlefull; ++i) {

                        next = nextposition(middlex, middley, middle);
                        PosToMove[PosToMove.length] = next;
                        createcircle(next.x, next.y);
                    }
                    ndefensehome = 0;
                } else if(pos == "Ataque"){
                    allcircles = [];
                    for (var i = 0; i < nstrikerfull; ++i) {

                        next = nextposition(middlestrikerx, middledefensey, striker);
                        PosToMove[PosToMove.length] = next;
                        createcircle(next.x, next.y);
                    }
                    ndefensehome = 0;
                } else if (pos == "Guarda-redes") {
                    allcircles = [];
                    next = nextposition(middlegkx, middlegky, 1);
                    PosToMove[PosToMove.length] = next;
                    createcircle(next.x, next.y);
                }
                movedowndefense = 0;
            }
        }
        
        xmlhttp4.open("GET", "/SetUp/GetPlayerPosition?id=" + targetElement.id, true);
        xmlhttp4.send();

        if (BackDrop != targetElement) {
       
            DragTarget = targetElement;
            
            DragTarget.parentNode.appendChild(DragTarget);
            DragTarget.setAttributeNS(null, 'pointer-events', 'none');
            var transMatrix = DragTarget.getCTM();
            GrabPoint.x = TrueCoords.x - Number(transMatrix.e);
            GrabPoint.y = TrueCoords.y - Number(transMatrix.f);
        }
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
        for (var i = 0; i < allcircles.length; ++i) {
            var circx = allcircles[i].getAttributeNS(null, 'cx');
            var circy = allcircles[i].getAttributeNS(null, 'cy');
            if ((ev.clientX < parseInt(circx) + 50) && (ev.clientX > parseInt(circx) - 50) && (ev.clientY < parseInt(circy) + 50) && (ev.clientY > parseInt(circy) - 50)) {
                return allcircles[i];
            }
        }
        return null;
    }

    function IsImageInPosition(x, y) {
        for (var i = 0; i < whereplayeres.length; ++i) {
            var coorx = whereplayeres[i].getAttributeNS(null, "x");
            var coory = whereplayeres[i].getAttributeNS(null, "y");
            
            if (x <= parseInt(coorx) + 50 && x >= parseInt(coorx) - 50 && y <= parseInt(coory) + 50 && y >= parseInt(coory) - 50) {
                return whereplayeres[i];
            }
        }
        return null;
    }

    

    SVGDocument.onmouseup = function (evt) {
       
        if (GrabPoint.x > middlex && DragTarget.getAttributeNS(null, 'x') < middlex
                || GrabPoint.x < middlex && DragTarget.getAttributeNS(null, 'x') > middlex) {
            DragTarget.setAttributeNS(null, 'x', OldCoor.x);
            DragTarget.setAttributeNS(null, 'y', OldCoor.y);
            DragTarget.setAttributeNS(null, 'transform', "");
            DragTarget.setAttributeNS(null, 'pointer-events', 'all');

            DragTarget = null;
            removecircles(allcircles);
            return;
        }
        
        var oldimg = IsImageInPosition(evt.clientX, evt.clientY);
        
        if (oldimg != null) {

            DragTarget.setAttributeNS(null, 'x', oldimg.getAttributeNS(null, "x"));
            DragTarget.setAttributeNS(null, 'y', oldimg.getAttributeNS(null, "y"));
            DragTarget.setAttributeNS(null, 'transform', "");
            DragTarget.setAttributeNS(null, 'pointer-events', 'all');
            
            oldimg.setAttributeNS(null, 'x', OldCoor.x);
            oldimg.setAttributeNS(null, 'y', OldCoor.y);
            oldimg.setAttributeNS(null, 'transform', "");
            oldimg.setAttributeNS(null, 'pointer-events', 'all');

            whereplayeres[whereplayeres.length] = DragTarget;
            DragTarget = null;
            return;
        }


        if (!IsInPositonRange(evt.clientX, evt.clientY)) {
            //var cenas = svg.getElementById(OldCoor.id);
            //cenas.setAttributeNS(null, 'x', OldCoor.x);
            //cenas.setAttributeNS(null, 'y', OldCoor.y);
            DragTarget.setAttributeNS(null, 'x', OldCoor.x);
            DragTarget.setAttributeNS(null, 'y', OldCoor.y);
            DragTarget.setAttributeNS(null, 'transform', "");
            DragTarget.setAttributeNS(null, 'pointer-events', 'all');
            
            DragTarget = null;
            removecircles(allcircles);
            return;
        }
     
        if (DragTarget) {
            console.log("cenas");
            DragTarget.setAttributeNS(null, 'pointer-events', 'all');
            var upcircle = whitchcircle(evt);

            DragTarget.setAttributeNS(null, 'x', upcircle.getAttributeNS(null, "cx"));
            DragTarget.setAttributeNS(null, 'y', upcircle.getAttributeNS(null, "cy"));
            DragTarget.setAttributeNS(null, 'transform', "");

            whereplayeres[whereplayeres.length] = DragTarget;
            
            DragTarget = null;
            if(currpos == "Defesa")
                ndefesefull--;
            else if (currpos == "Medio")
                nmiddlefull--;
            else if (currpos == "Ataque")
                nstrikerfull--;
            else if (currpos == "Guarda-redes")
                ngkfull--;
            movedowndefense = 0;
        }
        removecircles(allcircles);
    };


    function GetTrueCoords(evt) {
        var newScale = SVGRoot.currentScale;
        var translation = SVGRoot.currentTranslate;
        TrueCoords.x = (evt.clientX - translation.x) / newScale;
        TrueCoords.y = (evt.clientY - translation.y) / newScale;
    };





    document.getElementById("idbuttonauto").onclick = function(ev) {
        for (var i = 0; i < allplayereshome.length; ++i) {
            callplayer(allplayereshome[i]);
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
                    --ndefesefull;
                    idpla.setAttributeNS(null, 'x', middledefensex);
                    idpla.setAttributeNS(null, 'y', middledefensey + movedowndefense);
                    movedowndefense += (svgheight / defense) / 2;
                    whereplayeres[whereplayeres.length] = idpla;
                }
            if (pos == "Medio") {
                    if (nmiddlefull == 0) return;
                    --nmiddlefull;
                
                    idpla.setAttributeNS(null, 'x', middlex);
                    idpla.setAttributeNS(null, 'y', middley + movedownmiddle);
                    movedownmiddle += (svgheight / middle) / 2;
                    whereplayeres[whereplayeres.length] = idpla;
            } 
            if (pos == "Ataque") {
                    if (nstrikerfull == 0) return;
                    --nstrikerfull;
                
                    idpla.setAttributeNS(null, 'x', middlestrikerx);
                    idpla.setAttributeNS(null, 'y', middlestrikery + movedownstriker);
                    movedownstriker += (svgheight / striker) / 2;
                    whereplayeres[whereplayeres.length] = idpla;
             } 
             if (pos == "Guarda-redes") {
                    if (ngkfull == 0) return;
                    --ngkfull;
                 idpla.setAttributeNS(null, 'x', middlegkx);
                 idpla.setAttributeNS(null, 'y', middlegky);
                 whereplayeres[whereplayeres.length] = idpla;
                }
            }
        }

        
        xmlhttp5.open("GET", "/SetUp/GetPlayerPosition?id=" + idpla.getAttributeNS(null,'id'), true);
        xmlhttp5.send();
    }

};

