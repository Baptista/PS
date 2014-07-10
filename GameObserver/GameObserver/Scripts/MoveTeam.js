window.onload = function() {

    var savepositions;
    var movey = 50;
    var SVGDocument = null;
    var SVGRoot = null;
    var TrueCoords = null;
    var GrabPoint = null;
    var BackDrop = null;
    var DragTarget = null;
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
    
    var ndefensehome = 0;
    
    var ndefesefull;
    var nmiddlefull;
    var nstrikerfull;
    var ngkfull;
    var allplayershome = [];

    var saveplayer = {};

    var a = document.getElementById("svgobject");
    var svg = null;
    var svgheight = null;
    var svgwidth = null;
    

    svg = a.contentDocument;
    svgheight = a.getBoundingClientRect().height;

    svgwidth = a.getBoundingClientRect().width;
    SVGDocument = svg;
    SVGRoot = SVGDocument.documentElement;



    
    function loadpostions() {
        var rect = svg.getElementById("all");
        var pos = rect.getBoundingClientRect();
        var x = pos.left + 10;
        var y = pos.top;

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var resp = JSON.parse(xmlhttp.response);
                
                resp.forEach(function(entry) {
                    var xmlhttp8 = new XMLHttpRequest();
                    var img = null;
                    xmlhttp8.onreadystatechange = function() {

                        if (xmlhttp8.readyState == 4 && xmlhttp8.status == 200) {
                            
                            var resp2 = JSON.parse(xmlhttp8.response);
                            
                            if (entry.IdPosition == 0) {
                                img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                x = x + 50;
                                if (x >= svgwidth - 50) {
                                    y = y + 50;
                                    x = pos.left + 10;
                                }
                                
                            } else if (entry.IdPosition == 2) {
                                if (ndefesefull == 0) {
                                    img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                    x = x + 50;
                                    if (x >= svgwidth - 50) {
                                        y = y + 50;
                                        x = pos.left + 10;
                                    }
                                } else {
                                    img = PhotoonSvg(resp2.Id, resp2.Photo, middledefensex, middledefensey + movedowndefense);

                                    --ndefesefull;
                                    movedowndefense += (svgheight / defense) / 2;
                                }

                            }else if (entry.IdPosition == 3) {
                                
                                if (nmiddlefull == 0) {
                                    img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                    x = x + 50;
                                    if (x >= svgwidth - 50) {
                                        y = y + 50;
                                        x = pos.left + 10;
                                    }
                                } else {

                                    img = PhotoonSvg(resp2.Id, resp2.Photo, middlex, middley + movedownmiddle);

                                    --nmiddlefull;
                                    movedownmiddle += (svgheight / middle) / 2;
                                }
                            }else if (entry.IdPosition == 4) {
                                if (nstrikerfull == 0) {
                                    img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                    x = x + 50;
                                    if (x >= svgwidth - 50) {
                                        y = y + 50;
                                        x = pos.left + 10;
                                    }
                                } else {
                                    img = PhotoonSvg(resp2.Id, resp2.Photo, middlestrikerx, middlestrikery + movedownstriker);

                                    --nstrikerfull;
                                    movedownstriker += (svgheight / striker) / 2;
                                }
                            } else {
                                if (ngkfull == 0) {
                                    img = PhotoonSvg(resp2.Id, resp2.Photo, x, y);
                                    x = x + 50;
                                    if (x >= svgwidth - 50) {
                                        y = y + 50;
                                        x = pos.left + 10;
                                    }
                                } else {
                                    img = PhotoonSvg(resp2.Id, resp2.Photo, middlegkx, middlegky);
                                    --ngkfull;
                                }
                            }
                            allplayershome[allplayershome.length] = img;
                        }
                    };
                    xmlhttp8.open("GET", "/Team/GetPlayer?id=" + entry.IdPlayer, true);
                    xmlhttp8.send();
                });
            }
        };
        
        xmlhttp.open("GET", "/Team/GetPlayersByTeam?date="+ document.getElementById("idteamdata").innerHTML+"&idclub=" + document.getElementById("idteamclub").innerHTML.trim(), true);
        xmlhttp.send();
    }


    var xmlhttp3 = new XMLHttpRequest();

    xmlhttp3.onreadystatechange = function() {

        if (xmlhttp3.readyState == 4 && xmlhttp3.status == 200) {
            var resp = JSON.parse(xmlhttp3.response);

            var formations = resp.Designation.split('x');
            
            defense = formations[0];
            middle = formations[1];
            striker = formations[2];
            gk = 1;
            allpostions = defense + middle + striker;
            ndefesefull = defense;
            nmiddlefull = middle;
            nstrikerfull = striker;
            ngkfull = 1;

            middledefensey = (svgheight / defense) + (movey/ 2);
            middledefensex = ((svgwidth) / 4);
            
            middlex = (svgwidth / 2);
            middley = (svgheight / middle) + (movey/ 2);
            middlestrikery = (svgheight / striker) + (movey/ 2);
            middlestrikerx = ((svgwidth / 2) + (middledefensex));
            
            middlegkx = 20;
            middlegky = (svgheight / 2)+(movey/2);
        }
    };
    var formation = document.getElementById("idteamformation").innerHTML;
    xmlhttp3.open("GET", "/Team/GetFormation?id=" + formation.trim(), true);
    xmlhttp3.send();

    loadpostions();
    
    svg.oncontextmenu = function (ev) {
        ev.preventDefault();
        return false;
    }

   
    var halfposition = (svgwidth / 2);
    var xposdetails = (svgwidth / 2)-50;
    var yposdetails = (svgheight / 2) - 200;

   


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
        
        if (IsOccupied(savepositions, allplayershome)) {
            return nextposition(mx,my,formati);
        }
        return savepositions;
    }

    var tempimages = [];

    function removeTempImages() {
        for (var i = 0; i < tempimages.length; i++) {
            svg.getElementById("all").removeChild(tempimages[i]);
        }
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
        svgimg.setAttributeNS(null, 'height', '50');
        svgimg.setAttributeNS(null, 'width', '50');
        svgimg.setAttributeNS(null, 'id', id);
        svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', "../fonts/"+photo);
        svgimg.setAttributeNS(null, 'x', posx);
        svgimg.setAttributeNS(null, 'y', posy);
        svgimg.setAttributeNS(null, 'visibility', 'visible');
        svg.getElementById("all").appendChild(svgimg);
        
        svgimg.onclick = function (ev) {
            
            
            var xmlhttp8 = new XMLHttpRequest();

            xmlhttp8.onreadystatechange = function() {

                if (xmlhttp8.readyState == 4 && xmlhttp8.status == 200) {
                    var resp = JSON.parse(xmlhttp8.response);


                    var svgrec = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    svgrec.setAttributeNS(null, 'height', '200');
                    svgrec.setAttributeNS(null, 'width', '150');
                    svgrec.setAttributeNS(null, 'id', resp.Id);
                    svgrec.setAttributeNS(null, 'style', 'fill:green;stroke:white');
                    svgrec.setAttributeNS(null, 'x', xposdetails);
                    svgrec.setAttributeNS(null, 'y', yposdetails);
                    svgrec.setAttributeNS(null, 'visibility', 'visible');
                    showdetails[showdetails.length] = svgrec;
                    svg.getElementById("all").appendChild(svgrec);

                    var svgimgsub = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                    svgimgsub.setAttributeNS(null, 'height', '100');
                    svgimgsub.setAttributeNS(null, 'width', '150');
                    
                    svgimgsub.setAttributeNS('http://www.w3.org/1999/xlink', 'href', "../fonts/" + resp.Photo);
                    svgimgsub.setAttributeNS(null, 'x', xposdetails);
                    svgimgsub.setAttributeNS(null, 'y', yposdetails);
                    svgimgsub.setAttributeNS(null, 'visibility', 'visible');
                    showdetails[showdetails.length] = svgimgsub;
                    svg.getElementById("all").appendChild(svgimgsub);


                    var substringedDate = resp.Born.substring(6); 
                    var parsedIntDate = parseInt(substringedDate); 
                    var date = new Date(parsedIntDate);
                    createLabels("Name: " + resp.Name, xposdetails + 5, yposdetails + 125);
                    createLabels("Born: " + date.toDateString(), xposdetails + 5, yposdetails + 140);
                    createLabels("Height: " + resp.Height, xposdetails + 5, yposdetails + 155);
                    createLabels("Weight: " + resp.Weight, xposdetails + 5, yposdetails + 170);
                    
                }
            };

            xmlhttp8.open("GET", "/Team/GetPlayer?id=" + id, true);
            xmlhttp8.send();


        };
        return svgimg;
    }

    function createLabels(name , xpos,ypos) {
        var txtElem = document.createElementNS('http://www.w3.org/2000/svg', "text");

        txtElem.setAttributeNS(null, "x", xpos);
        txtElem.setAttributeNS(null, "y", ypos);
        txtElem.setAttributeNS(null, "font-size", 15);
        txtElem.setAttributeNS(null, 'cursor', 'pointer');
        var helloTxt = document.createTextNode(name);
        
        txtElem.appendChild(helloTxt);
        showdetails[showdetails.length] = txtElem;
        svg.getElementById("all").appendChild(txtElem);
        return txtElem;

    }




    

    var OldCoor={};
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
    



    function PutTempImages(full , f,s,t) {
        var next;
        
        for (var i = 0; i < full; ++i) {
           
           next = nextposition(f, s, t);
           PosToMove[PosToMove.length] = next;
           tempimages[tempimages.length] = PhotoonSvg(null, "empty.jpg", next.x, next.y);
        }
    }


    var timer = 100;
    var isclick = true;
    var functimer = null;
    var oldtarget = null;

    SVGDocument.onmousedown = function (evt) {

        if (evt.target.innerHTML == 'Save') {
            var idequipav = document.getElementById("iddetailssetup_idvisitor").innerHTML;
            var dataequipav = document.getElementById("iddetailssetup_datevisitor").innerHTML;
            var idequipa = document.getElementById("iddetailssetup_idagainst").innerHTML;
            var dataequipa = document.getElementById("iddetailssetup_dateagainst").innerHTML;
            var idstadium = document.getElementById("iddetailssetup_idstadium").innerHTML;
            var datahora = document.getElementById("iddetailssetup_date").innerHTML;
            
            var xmlhttp10 = new XMLHttpRequest();
            var dt = new Date();
            xmlhttp10.onreadystatechange = function() {

                if (xmlhttp10.readyState == 4 && xmlhttp10.status == 200) {
                    
                }
            }
            xmlhttp10.open("POST", "/SetUp/CreateOpinion", true);
            xmlhttp10.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            
            xmlhttp10.send("datenow="+dt+"&idstadium=" + idstadium + "&datahora=" + datahora + "&datavisitor="+dataequipav + "&idvisitante="+idequipav+
                "&datadefronta=" + dataequipa+ "&iddefronta=" + idequipa+ "&idcausador=" + saveplayer.idplayer+ "&idevento=" + saveplayer.event);

        }
        
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
                        var next;
                        currpos = pos;
                        if (pos == "Defesa") {
                            
                            PutTempImages(ndefesefull, middledefensex, middledefensey, defense);
                            
                            ndefensehome = 0;
                        } else if (pos == "Medio") {

                            PutTempImages(nmiddlefull, middlex, middley, middle);
                            
                            ndefensehome = 0;
                        } else if (pos == "Ataque") {
                            PutTempImages(nstrikerfull, middlestrikerx, middlestrikery, striker);
                        
                            ndefensehome = 0;
                        } else if (pos == "Guarda-redes") {
                            next = nextposition(middlegkx, middlegky, gk);
                            PosToMove[PosToMove.length] = next;
                            
                            tempimages[tempimages.length] = PhotoonSvg(null, "empty.jpg", next.x, next.y);
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

    function IsImageInPosition(x, y) {
        for (var i = 0; i < allplayershome.length; ++i) {
            var coorx = allplayershome[i].getAttributeNS(null, "x");
            var coory = allplayershome[i].getAttributeNS(null, "y");
            
            if (x <= parseInt(coorx) + 50 && x >= parseInt(coorx) - 50 && y <= parseInt(coory) + 50 && y >= parseInt(coory) - 50) {
                return allplayershome[i];
            }
        }
        return null;
    }


    function replace(oldimg , newimg) {
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
         if (functimer) {
            clearTimeout(functimer);
     
            return true;
        }
        if (DragTarget == null) {
            return;
        }
            isclick = false;
        if (evt.target.nodeName != 'image' && evt.target.nodeName != 'circle') {
            DragTarget.setAttributeNS(null, 'x', OldCoor.x);
            DragTarget.setAttributeNS(null, 'y', OldCoor.y);
            DragTarget.setAttributeNS(null, 'transform', "");
            DragTarget.setAttributeNS(null, 'pointer-events', 'all');

            DragTarget = null;
            removeTempImages();
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

            removeTempImages();
            DragTarget = null;
            return;
        }


        if (!IsInPositonRange(evt.clientX, evt.clientY)) {
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
            
            DragTarget.setAttributeNS(null, 'pointer-events', 'all');
            var upcircle = whitchcircle(evt);

            DragTarget.setAttributeNS(null, 'x', upcircle.getAttributeNS(null, "x"));
            DragTarget.setAttributeNS(null, 'y', upcircle.getAttributeNS(null, "y"));
            DragTarget.setAttributeNS(null, 'transform', "");

           

            
            if (currpos == "Defesa") {
                    ndefesefull--;
                
            } else if (currpos == "Medio") {
                nmiddlefull--;
                
            } else if (currpos == "Ataque") {
                nstrikerfull--;
                
            } else if (currpos == "Guarda-redes") {
                ngkfull--;
            }
            DragTarget = null;
            movedowndefense = 0;
            removeTempImages();
        }
        
    };


    function GetTrueCoords(evt) {
        var newScale = SVGRoot.currentScale;
        var translation = SVGRoot.currentTranslate;
        TrueCoords.x = (evt.clientX - translation.x) / newScale;
        TrueCoords.y = (evt.clientY - translation.y) / newScale;
    };





    document.getElementById("idbuttonauto").onclick = function(ev) {
        for (var i = 0; i < allplayershome.length; ++i) {
            callplayer(allplayershome[i]);
        }
    }

    function PutInPosition(x, y, move, idpla) {
        
        idpla.setAttributeNS(null, 'x', x);
        idpla.setAttributeNS(null, 'y', y + move);
        
    }


    function callplayer(idpla) {
        var xmlhttp5 = new XMLHttpRequest();

        xmlhttp5.onreadystatechange = function() {

            if (xmlhttp5.readyState == 4 && xmlhttp5.status == 200) {
                var resp = JSON.parse(xmlhttp5.response);
                var pos = resp.Designation;

                
                if (pos == "Defesa") {
                    if (ndefesefull == 0) return;
                    if (IsImageInPosition(middledefensex, middledefensey + movedowndefense)) {
                        movedowndefense += (svgheight / defense) / 2;
                        return callplayer(idpla);
                    }

                    PutInPosition(middledefensex, middledefensey, movedowndefense, idpla);

                    --ndefesefull;
                    movedowndefense += (svgheight / defense) / 2;
                    
                }
                if (pos == "Medio") {

                    if (nmiddlefull == 0) return;
                    if (IsImageInPosition(middlex, middley + movedownmiddle)) {
                        movedownmiddle += (svgheight / middle) / 2;
                        return callplayer(idpla);
                    }
                    PutInPosition(middlex, middley, movedownmiddle, idpla);

                    --nmiddlefull;

                    movedownmiddle += (svgheight / middle) / 2;
                    
                }
                if (pos == "Ataque") {


                    if (nstrikerfull == 0) return;
                    if (IsImageInPosition(middlestrikerx, middlestrikery + movedownstriker)) {
                        movedownstriker += (svgheight / striker) / 2;
                        return callplayer(idpla);
                    }
                    PutInPosition(middlestrikerx, middlestrikery, movedownstriker, idpla);

                    --nstrikerfull;
                    movedownstriker += (svgheight / striker) / 2;

                }
                if (pos == "Guarda-redes") {

                    if (ngkfull == 0) return;
                    if (IsImageInPosition(middlegkx, middlegky)) {
                        return callplayer(idpla);
                    }
                    PutInPosition(middlegkx, middlegky, 0, idpla);
                    --ngkfull;
                }
            }
        };


        xmlhttp5.open("GET", "/SetUp/GetPlayerPosition?id=" + idpla.getAttributeNS(null,'id'), true);
        xmlhttp5.send();
    }


    document.getElementById("idbuttonreset").onclick = function(ev) {
        
        var rect = svg.getElementById("all");
        var pos = rect.getBoundingClientRect();
        var x = parseInt(pos.left);
        var y = parseInt(pos.top);
        allplayershome.forEach(function (entry) {
        
            entry.setAttributeNS(null, 'x', x);
            entry.setAttributeNS(null, 'y', y);
            x = x + 50;
            if (x >= svgwidth - 50) {
                y = y + 50;
                x = pos.left + 10;
            }
            
        });
        movedowndefense = 0;
        movedownmiddle = 0;
        movedownstriker = 0;
        
        ndefesefull = defense;
        nmiddlefull = middle;
        nstrikerfull = striker;
        ngkfull = gk;

    };

    document.getElementById("idbuttonsave").onclick = function(ev) {

       var idclub = document.getElementById("idteamclub").innerHTML;
        var date = document.getElementById("idteamdata").innerHTML;

        
        allplayershome.forEach(function(entry) {

            var imgx = entry.getAttributeNS(null, 'x');
            var pos;
            if (entry.getAttributeNS(null, 'y') > 50) {
                if (imgx < 100) {
                    pos = 1;
                } else {
                    if (imgx < parseInt(halfposition)) {
                        pos = 2;
                    } else if (imgx == parseInt(halfposition)) {
                        pos = 3;
                    } else if (imgx > parseInt(halfposition)) {
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
        xmlhttp6.onreadystatechange = function() {

            if (xmlhttp6.readyState == 4 && xmlhttp6.status == 200) {
                
            }
        };
        xmlhttp6.open("POST", "/Team/UpdateIntegrate", true);
        xmlhttp6.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
        
        xmlhttp6.send("idclub=" + idclub + "&date=" + date + "&idplayer=" + idplayer + "&idposition=" + idposition);
    }
};

