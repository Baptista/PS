window.onload = function() {

    
    var a = document.getElementById("svgobject");
    var svg = a.contentDocument;
    
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var resp = JSON.parse(xmlhttp.response);
            var rect = svg.getElementById("all");
            var pos = rect.getBoundingClientRect();
            console.log(pos.top, pos.right, pos.left, pos.bottom);
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
    xmlhttp.open("GET", "/SetUp/GetHomePlayers", true);
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
    xmlhttp2.open("GET", "/SetUp/GetAwayPlayers", true);
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
    
    SVGDocument = svg;
    SVGRoot = SVGDocument.documentElement;
    TrueCoords = SVGRoot.createSVGPoint();
    GrabPoint = SVGRoot.createSVGPoint();

    BackDrop = svg.getElementById('all');
    
    SVGDocument.onmousedown = function (evt) {
        var targetElement = evt.target;
        if (BackDrop != targetElement) {
       
            DragTarget = targetElement;
            DragTarget.parentNode.appendChild(DragTarget);
            console.log(DragTarget);
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

