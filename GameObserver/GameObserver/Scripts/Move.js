window.onload = function() {

    var savepositions;

    var a = document.getElementById("svgobject");
    var svg = a.contentDocument;
    var svgheight = a.getBoundingClientRect().height;
    var svgwidth = a.getBoundingClientRect().width;

    var formation;
    var defense;
    var middle;
    var striker;
    var allpostions;


    var middledefensey;
    var middledefensex;
    var middlex;
    var middley;
    var middlestrikery;
    var middlestrikerx;

    var moveupdefense;
    var movedowndefense;
    var moveupmiddle;
    var movedownmiddle;
    var moveupstriker;
    var movedownstriker;

    var ndefensehome;
    var nmiddlehome;
    var nstrikerhome;

    var ndefesefull = defense;

    function nextpositiondefesahome() {
        
        if (defense % 2 == 0 && ndefensehome==defense-1) {
            savepositions.x = middledefensex;
            savepositions.y = middledefensey;
            ++ndefensehome;
            return savepositions;
        }
        if (ndefensehome % 2 == 0) {
            savepositions.x = middledefensex;
            savepositions.y = middledefensey + moveupdefense;
            moveupdefense += svgheight / defense;
            ++ndefensehome;
            return savepositions;
        } else {
            savepositions.x = middledefensex;
            savepositions.y = middledefensey + movedowndefense;
            movedowndefense += svgheight / defense;
            ++ndefensehome;
            return savepositions;
        }
    }

    function createcircle(xx , yy) {
        var circles = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circles.setAttribute("cx", xx);
        circles.setAttribute("cy", yy);
        circles.setAttribute("fill", "#ffffff");
        circles.setAttribute("stroke", "#000000");
        circles.setAttribute("r", 10);
        circles.setAttribute("id", "circ");
        svg.getElementById("all").appendChild(circles);
    }



    
    var gkhx = svgwidth / 100;
    var gkhy = svgheight / 2;

    var gkax = svgwidth - (gkhx);
    var gkay = svgheight / 2;

    var xmlhttp3 = new XMLHttpRequest();

    xmlhttp3.onreadystatechange = function() {

        if (xmlhttp3.readyState == 4 && xmlhttp3.status == 200) {
            var resp = JSON.parse(xmlhttp3.response);
            console.log(resp.Designation);
            formation = resp.Designation.split('x');
            defense = formation[0];
            middle = formation[1];
            striker = formation[2];
            allpostions = defense + middle + striker;


            middledefensey = svgheight / 2;
            middledefensex = ((svgwidth / 2) / 4);
            middlex = (((svgwidth / 2) / 4) * 2);
            middley = svgheight / 2;
            middlestrikery = svgheight / 2;
            middlestrikerx = (((svgwidth / 2) / 4) * 3);


            moveupdefense = svgheight / defense;
            movedowndefense = svgheight / defense;
            moveupmiddle = svgheight / middle;
            movedownmiddle = svgheight / middle;
            moveupstriker = svgheight / striker;
            movedownstriker = svgheight / striker;
        }
    };
    var idq = document.getElementById("iddetailssetup_idvisitor").innerHTML;
    var dataq = document.getElementById("iddetailssetup_datevisitor").innerHTML;
    xmlhttp3.open("GET", "/SetUp/GetFormation?id=" + idq + "&dateq=" + dataq, true);
    xmlhttp3.send();


    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var resp = JSON.parse(xmlhttp.response);
            var rect = svg.getElementById("all");
            var pos = rect.getBoundingClientRect();
            var st = pos.left;
            var x = pos.left;
            var y = pos.top;
            resp.forEach(function (entry) {
                PhotoonSvg(entry, x, y);
                x = x + 50;
                if (x >= ((pos.right - pos.left) / 2)-50) {
                    y = y + 50;
                    x = pos.left;
                }
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
            var st = pos.left;
            var x = ((pos.right - pos.left) / 2);
            var y = pos.top;
            resp2.forEach(function (entry) {
                PhotoonSvg(entry, x, y);
                x = x + 50;
                if (x >= pos.right-50) {
                    y = y + 50;
                    x = ((pos.right - pos.left) / 2);
                }
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

    }




    var SVGDocument = null;
    var SVGRoot = null;
    var TrueCoords = null;
    var GrabPoint = null;
    var BackDrop = null;
    var DragTarget = null;


    var OldCoor;
    var PosToMove = [];
    var indexPosToMove = 0;

    function IsInPositonRange() {
        
    }



    
    SVGDocument = svg;
    SVGRoot = SVGDocument.documentElement;
    TrueCoords = SVGRoot.createSVGPoint();
    GrabPoint = SVGRoot.createSVGPoint();

    BackDrop = svg.getElementById('all');
    
    SVGDocument.onmousedown = function (evt) {
        
        var targetElement = evt.target;
        if (targetElement.nodeName != 'image') {
            return;
        }

        OldCoor.x = targetElement.x;
        OldCoor.y = targetElement.y;
        var xmlhttp4= new XMLHttpRequest();

        xmlhttp4.onreadystatechange = function() {

            if (xmlhttp4.readyState == 4 && xmlhttp4.status == 200) {
                var resp = JSON.parse(xmlhttp3.response);
                var pos = resp.Designation;
                if (pos == "Defesa") {

                    for (var i = 0; i < ndefesefull; ++i) {
                        var next = nextpositiondefesahome();
                        PosToMove[indexPosToMove++] = next;
                        createcircle(next.x, next.y);
                    }
                }
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
    SVGDocument.onmouseup = function (evt) {
        if (IsInPositonRange(DragTarget.x , DragTarget.y)) {
            DragTarget.setAttributeNS(null, 'x', OldCoor.x);
            DragTarget.setAttributeNS(null, 'y', OldCoor.y);
        }

        if (DragTarget) {
            DragTarget.setAttributeNS(null, 'pointer-events', 'all');
            DragTarget = null;
        }
    };


    function GetTrueCoords(evt) {
        var newScale = SVGRoot.currentScale;
        var translation = SVGRoot.currentTranslate;
        TrueCoords.x = (evt.clientX - translation.x) / newScale;
        TrueCoords.y = (evt.clientY - translation.y) / newScale;
    };


   
    
};

