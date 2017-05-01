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

spr2txt.mem = [];

spr2txt.pointer = 0;

spr2txt.spritesLoc = {x:0,y:0};

spr2txt.appendEventByClassName = function(className, eventName, callback) {
    var elements = document.getElementsByClassName(className);
    for(var i=0; i < elements.length; i++) {
        elements[i].addEventListener(eventName, callback);
    }
    return elements;
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

    spr2txt.updateSpriteGrid(x/8,y/8,bit);

    spr2txt.setColorAddress(x/32,y/32,bit);

    var ctx = event.target.getContext("2d");
    ctx.fillStyle=spr2txt.colorTranslate(bit);
    ctx.fillRect(x,y,32,32);
};

spr2txt.setColorAddress = function(x,y,bit) {
    var i=spr2txt.pointer+(y*8)+x;
    spr2txt.mem[i] = bit;
};

spr2txt.updateSpriteGrid = function(x,y,bit) {
    var ctx = document.getElementById('sprites').getContext("2d");
    ctx.fillStyle=spr2txt.colorTranslate(bit);
    ctx.fillRect(spr2txt.spritesLoc.x+x,spr2txt.spritesLoc.y+y,4,4);
};

spr2txt.selectSprite = function(event,canvas) {
    var x = spr2txt.normalizePixelCoord(event.clientX-258, 32)/32;
    var y = spr2txt.normalizePixelCoord(event.clientY, 32)/32;
    var i = (y*8)+x;

    spr2txt.pointer=i*64;
    spr2txt.spritesLoc.x = x*32;
    spr2txt.spritesLoc.y = y*32;

    spr2txt.changeSprite(canvas)
};

spr2txt.clean = function(canvas,bit) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle=spr2txt.colorTranslate(bit);
    ctx.fillRect(0,0,256,256);
}

spr2txt.changeSprite = function(canvas) {
    spr2txt.clean(canvas,'0000');
    var ctx = canvas.getContext("2d");
    for(var x=0; x<8; x++) {
        for(var y=0; y<8; y++) {
            bit = spr2txt.mem[(y*8)+x+spr2txt.pointer];
            ctx.fillStyle=spr2txt.colorTranslate(bit);
            ctx.fillRect(x*32,y*32,32,32);
        }
    }
};

spr2txt.main = function() {
    var click = false;

    // Canvas events
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

    // Sprite grid events
    var sprites = document.getElementById('sprites');
    sprites.addEventListener('mousedown', function(that){
        spr2txt.selectSprite(that,canvas);
    });

    // Colors events
    spr2txt.appendEventByClassName('color', 'click', function(){
        var elements = document.getElementsByClassName('checked');
        for(var i=0; i < elements.length; i++) {
            elements[i].classList.remove('checked');
        }
        spr2txt.color = this.getAttribute('data-color');
        this.classList.add('checked');
    });
    spr2txt.renderColor('color');

    // Memory allocation
    for(var i=0; i<64*64; i++) {
        spr2txt.mem[i] = "0000";
    }
};