window.addEventListener("load", () => {
    document.querySelector("#topLeft").innerHTML = "Floating";
    var panel = document.querySelector("#panel");
    var mainContent = document.querySelector(".main-content");    
    startTime();

    function startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = addZero(m);
        s = addZero(s);
        document.getElementById('clock').innerHTML =
            h + ":" + m + ":" + s;
        var t = setTimeout(startTime, 1000);
    }

    function addZero(i) {
        if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
        return i;
    }

    dragElement(document.getElementById("panel"));

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id)) {
            document.getElementById(elmnt.id).onmousedown = dragMouseDown; /* if present, the header is where you move the DIV from:*/
        } else {
            elmnt.onmousedown = dragMouseDown; /* otherwise, move the DIV from anywhere inside the DIV:*/
        }

        function dragMouseDown(e) {
            if(isElementContained(panel, mainContent)){
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }else{
                clearPosition();
                panel.style.position = "fixed";
                panel.style.left = 0;
                panel.style.top = "60px";
                document.querySelectorAll("input[type='radio']").forEach((radioElement) => {
                    radioElement.checked = false;
                })
            }
            
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            var marginTop = parseInt(panel.style.marginTop) || 0;
            var marginLeft = parseInt(panel.style.marginLeft) || 0;
            panel.style.marginTop = null;
            panel.style.marginLeft = null;
            var top = elmnt.offsetTop - pos2;
            var left = elmnt.offsetLeft - pos1;

            elmnt.style.top = top + "px";
            elmnt.style.left = left + "px";
            elmnt.style.marginTop = marginTop + "px";
            elmnt.style.marginLeft = marginLeft + "px"
            panel.classList.remove("lower-right");
            panel.classList.remove("center");
            document.querySelector("#topLeft").innerHTML = "Floating";
            document.querySelectorAll("input[type='radio']").forEach((radioElement) => {
                radioElement.checked = false;
            })     
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    var setPosition = (e) => {
        clearPosition();
        if (e.currentTarget.value == "center") {
            setCenter();
        } else if (e.currentTarget.value == "LR") {
            setLowerRight();
        }
    };

    window.onresize = (e) =>{
        if(panel.classList.contains("center")){
            setCenter();
        } else if (panel.classList.contains("lower-right")){
            setLowerRight();
        }
    }

    function setCenter(){
        document.querySelector("#topLeft").innerHTML = "Center";
        panel.classList.add("center");
        panel.style.position = "fixed";
        panel.style.top = window.innerHeight / 2 + "px";
        panel.style.left = window.innerWidth / 2 + "px";
        panel.style.marginTop = -(panel.clientHeight / 2) + "px";
        panel.style.marginLeft = -(panel.clientWidth / 2) + "px";
    }

    function setLowerRight(){
        document.querySelector("#topLeft").innerHTML = "Lower Right";
        panel.classList.add("lower-right");
        panel.style.position = "fixed";
        panel.style.bottom = "60px";
        panel.style.right = 0;
    }

    function clearPosition(){
        document.querySelector("#topLeft").innerHTML = "Floating";
        panel.style.left = null;
        panel.style.top = null;
        panel.style.bottom = null;
        panel.style.right = null;
        panel.style.marginLeft = null;
        panel.style.marginTop = null;
        panel.classList.remove("lower-right");
        panel.classList.remove("center");        
    }

    function isElementContained(sElement, lElement){
        var sBRect = sElement.getBoundingClientRect();
        var lBRect = lElement.getBoundingClientRect();
        return (lBRect.bottom >= sBRect.bottom)
    }

    window.onkeyup = (e) =>{
        if(e.keyCode == 13){
            panel.style.display = "block"
        }else if(e.keyCode == 27){
            panel.style.display = "none";
        }
    }

    document.querySelectorAll("input[type='radio']").forEach((radioElement) => {
        radioElement.addEventListener("click", setPosition);
    })

})

