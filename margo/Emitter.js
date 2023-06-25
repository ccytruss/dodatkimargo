class Emitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        events.push(event)
        if (typeof this.events[event] !== 'object') {
            this.events[event] = [];
        }
        this.events[event].push(listener);
        return () => this.off(event, listener);
    }

    off(event, listener) {
        if (typeof this.events[event] === 'object') {
            const idx = this.events[event].indexOf(listener);
            if (idx > -1) {
                this.events[event].splice(idx, 1);
            }
        }
    }

    emit(event, ...args) {
        if (typeof this.events[event] === 'object') {
            this.events[event].forEach(listener => listener.apply(this, args));
        }
    }

    once(event, listener) {
        const remove = this.on(event, (...args) => {
            remove();
            listener.apply(this, args);
        });
    }

    observe(obj, key, callback) {
        const originalFunction = obj[key];
        const originalContext = obj;
        obj[key] = (...args) => {
            callback.apply(this, args)
            return originalFunction.apply(originalContext, args);
        };
    }
}
const emitter = new Emitter();
