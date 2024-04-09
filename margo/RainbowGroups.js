class DrawMask {
    constructor(master, color) {
        this.master = master;
        this.color = color;
        this.d = {};
        this.createDrawMask();
        this.update();
    }

    getOrder() {
        return this.master.ry + 0.1;
    }

    draw(ctx) {
        let left = this.rx * 32 + 16 - this.fw / 2 - Engine.map.offset[0];
        const top = this.ry * 32 - this.fh + 32 - Engine.map.offset[1];
        const wpos = Math.round(this.rx) + Math.round(this.ry) * 256;
        const topModify = isset(Engine.map.water[wpos]) ? top + this.master.waterTopModify : top;
        if (this.drawMask){
       ctx.drawImage(this.drawMask, left, topModify, this.fw, this.fh)
        };
    }

    update() {
        this.rx = this.master.rx - 0.025;
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
            const canvas = document.createElement("canvas");
            canvas.width = 32;
            canvas.height = 48;
            const ctx = canvas.getContext("2d");
            ctx.globalAlpha = .2;
            ctx.drawImage(this.mask, 0, 0, this.mask.width, this.mask.height);
            ctx.globalAlpha = 1;
            ctx.drawImage(this.mask, 0, 0, this.mask.width, this.mask.height);
            ctx.globalCompositeOperation = "source-in";
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            this.drawMask = canvas;

        }
    }
}
    let e = {};
function randomColor(s) {
const colors = ['#e6194b', "#3cb44b", "#ffe119", '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', "#bcf60c", '#0073ff', '#8000ff', '#ff6600', '#ff0019']
    if(!(s in e)) {
        if(s < colors.length) {
            e[s] = colors[s];
        } else {
            e[s] = colors[Math.round(Math.random() * colors.length)];
        }
    }
    return e[s];
}
(old => {
    Engine.communication.dispatcher.on_npc = function (data) {
        old.apply(this, arguments);
        Object.values(data).forEach(npcProperties => {
            const npc = Engine.npcs.getById(npcProperties.id);
            if (npc && npc.grp && !npc.hasOwnProperty('rainbow')) {
                const color = randomColor(npc.grp);
                npc.rainbow = new DrawMask(npc, color);
                (old => {
                    npc.update = function (...args) {
                        old.apply(npc, args);
                        npc.rainbow.update();
                    };
                })(npc.update);
            }
        });
    }
})(Engine.communication.dispatcher.on_npc);

(old =>{
    Engine.npcs.getDrawableList = function () {
        const list = old.apply(this, arguments);
        Object.values(list).forEach(npc => {
            if (npc.rainbow && npc.rainbow.drawMask) list.push(npc.rainbow);
        });
        return list;
    }
})(Engine.npcs.getDrawableList);
