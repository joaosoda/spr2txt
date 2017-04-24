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

spr2txt.main = function() {
    var click = false;
    spr2txt.appendEventByClassName('pixel', 'mousedown', function(){
        click = true;
        spr2txt.changeBackgroundColor(this, spr2txt.color);
        this.setAttribute('data-color', spr2txt.color);
    });

    spr2txt.appendEventByClassName('pixel', 'mousemove', function(){
        if(!click) return false;
        spr2txt.changeBackgroundColor(this, spr2txt.color);
        this.setAttribute('data-color', spr2txt.color);
    });

    spr2txt.appendEventByClassName('pixel', 'mouseup', function(){
        click = false;
    });

    spr2txt.appendEventByClassName('color', 'click', function(){
        spr2txt.color = this.getAttribute('data-color');
    });

    spr2txt.renderColor('pixel');
    spr2txt.renderColor('color');
};