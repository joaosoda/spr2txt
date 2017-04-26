var spr2txt = window.spr2txt || {};
spr2txt.colorDict = {
    "0000": "#000000", "0001": "#1d2b53",
    "0010": "#7e2553", "0011": "#008751",
    "0100": "#ab5236", "0101": "#5f574f",
    "0110": "#c2c3c7", "0111": "#fff1e8",
    "1000": "#ff004d", "1001": "#ffa300",
    "1010": "#fff024", "1011": "#00e756",
    "1100": "#29adff", "1101": "#83769c",
    "1110": "#ff77a8", "1111": "#ffccaa",
};
spr2txt.color = "0000";

spr2txt.appendEventByClassName = function(className, eventName, callback) {
    var elements = document.getElementsByClassName(className);
    for(var i=0; i < elements.length; i++) {
        elements[i].addEventListener(eventName, callback);
    }
    return elements;
};

spr2txt.removeEventListener = function(className, eventName, callback) {
    var elements = document.getElementsByClassName(className);
    for(var i=0; i < elements.length; i++) {
        elements[i].removeEventListener(eventName, callback);
    }
    return elements;
};

spr2txt.appendEventById = function(id, eventName, callback) {
    var element = document.getElementsById(id);
    element.addEventListener(eventName, callback);
    return element;
};

spr2txt.colorTranslate = function(bit) {
    return spr2txt.colorDict[bit];
};

spr2txt.renderColor = function(className) {
    var elements = document.getElementsByClassName(className);
    for(var i=0; i < elements.length; i++) {
        bit = elements[i].getAttribute('data-color');
        spr2txt.changeBackgroundColor(elements[i], bit);
    }
    return elements;
};

spr2txt.changeBackgroundColor = function(element, bit) {
    element.style.backgroundColor = spr2txt.colorTranslate(bit);
};

spr2txt.normalizePixelCoord = function (x,p) { return (Math.floor((x-1)/p) * p) };

spr2txt.changeColor = function(event, bit) {
    var x = spr2txt.normalizePixelCoord(event.clientX, 32);
    var y = spr2txt.normalizePixelCoord(event.clientY, 32);

    var ctx = event.target.getContext("2d");
    ctx.fillStyle=spr2txt.colorTranslate(bit);
    ctx.fillRect(x,y,32,32);
};

spr2txt.clean = function(element, bit) {
    var ctx = element.getContext("2d");
    ctx.fillStyle=spr2txt.colorTranslate(bit);
    ctx.fillRect(0,0,256,256);
}

spr2txt.main = function() {
    var click = false;
    var canvas = document.getElementById('canvas');

    canvas.addEventListener('mousedown', function(that){
        click = true;
        spr2txt.changeColor(that, spr2txt.color);
    });

    canvas.addEventListener('mousemove', function(that){
        if(!click) return false;
        spr2txt.changeColor(that, spr2txt.color);
    });

    canvas.addEventListener('mouseup', function(that){
        click = false;
    });

    canvas.addEventListener('mouseleave', function(that){
        click = false;
    });

    spr2txt.appendEventByClassName('color', 'click', function(){
        var elements = document.getElementsByClassName('checked');
        for(var i=0; i < elements.length; i++) {
            elements[i].classList.remove('checked');
        }
        spr2txt.color = this.getAttribute('data-color');
        this.classList.add('checked');
    });

    spr2txt.clean(canvas, '0000');
    spr2txt.renderColor('color');

    /*var a = function (x,p) { return (Math.floor((x-1)/p) * p) + 1 };
    var b = function (x,y,p) { return [a(x,p),a(y,p)]; };
    var c = function(ang) { return Math.sin(ang * Math.PI/180) };
    var d = function(ang) { return (sinPer(ang) + 1)/2 };*/
};