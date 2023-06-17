// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://experimental.margonem.pl/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=margonem.pl
// @grant        none
// ==/UserScript==
// nie dzialaja z jakiegos powodu
let xds,xdds;
class CreateColor {
    constructor(master, color) {
        this.d = {x:0,y:0}
        this.rx = 0
        this.ry = 0
        this.fw = 0
        this.fh = 0
        this[xds] = undefined
        this[xdds] = undefined
        this.master = master
        this.color = color
        this.createDrawMask()
        this.update()
    }[(xds = 'mask', xdds = 'drawMask', 'getOrder')](){
        return this.master.ry + .1
    }
    draw(t) {
        const {map: x} = window.Engine
        let a = this.rx * 32 + 16 - this.fw / 2 - x.offset[0];
        let s = this.ry * 32 - this.fh + 32 - x.offset[1];
        let o = Math.round(this.rx) + Math.round(this.ry) * 256;
        let id = x.water[o] != null ? s + this.master.waterTopModify : s;
        if(this.drawMask) t.drawImage(this.drawMask, a, id, this.fw, this.fh);
    }

    update() {
        this.rx = this.master.rx - .025;
        this.ry = this.master.ry;
        this.d.x = this.master.d.x;
        this.d.y = this.master.d.y;
        this.fw = this.master.fw + 4;
        this.fh = this.master.fh + 4;
    }
    createDrawMask() {
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
    }

    updateColor(t) {
        this.color = t;
        this.createDrawMask();
    }
}
function AddColor(id, color){
    const x = window.Engine.npcs.getById(id);
    x.rainbowGroups = new CreateColor(x, color),function(a) {
        x.update = function(...s) {
            a.apply(x, s);
            if(x.rainbowGroups) x.rainbowGroups.update();
        }
    }(x.update);
}
const colors = ['#e6194b', "#3cb44b", "#ffe119", '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', "#bcf60c", '#fabebe', '#008080', '#e6beff', '#9a']
let e = {};
function randomColor(s) {
    if(!(s in e)) {
        if(s < colors.length) {
            e[s] = colors[s];
        } else {
            e[s] = colors[Math.round(Math.random() * colors.length)];
        }
    }
    return e[s];
}
((Engine)=>{
Object.entries(Engine.npcs.check()).forEach(([id, npc]) => {
    if (npc.grp) {
        const l = randomColor(npc.grp);
        AddColor(id, l)
    }
})
})(window.Engine)
