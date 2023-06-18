// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*.margonem.pl/
// @grant        none
// ==/UserScript==
// nie dzialaja z jakiegos powodu
class ColoredGroups {
	constructor(master,color){
        this.d = {x:0,y:0}
        this.rx = 0
        this.ry = 0
        this.fw = 0
        this.fh = 0
        this.master = master
        this.color = color
        this.createMaskColor()
        this.update()
    }
	getOrder = function () {
		return this.master.ry + .1;
	};

	update = function () {
		if (!Engine.allInit) return
        this.rx = this.master.rx - .025;
        this.ry = this.master.ry;
        this.d.x = this.master.d.x;
        this.d.y = this.master.d.y;
        this.fw = this.master.fw + 4;
        this.fh = this.master.fh + 4;
	};

	setAlpha = (alpha) => {
		this.alpha = alpha;
	};
	updateColor = function (color) {
		this.color = color;
		this.drawMask = null;
	};

    createMaskColor() {
        this.mask = new Image;
        this.mask.src = "https://cronus.margonem.com/img/mask.png";
        this.mask.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 48;
            const context = canvas.getContext("2d");
            context.drawImage(this.mask, 0, 0, this.mask.width, this.mask.height);
            context.globalAlpha = .3;
            context.drawImage(this.mask, 0, 0, this.mask.width, this.mask.height);
            context.globalAlpha = 1;
            context.globalCompositeOperation = "source-in";
            context.fillStyle = this.color;
            context.fillRect(0, 0, canvas.width, canvas.height);
            this.drawMask = canvas;
        }
        return this.drawMask
    }

};

function add(id){
    const x = window.Engine.npcs.getById(id);
    x.rainbow = new ColoredGroups(x,'red')
    x.rainbow.update()
}
