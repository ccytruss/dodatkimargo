// ==UserScript==
// @name         callbacki margonem si
// @author       cytrus
// @version      1
// @description  jakies calbacki
// @match        https://*.margonem.pl/
// @exclude      https://forum.margonem.pl/
// @exclude      https://addons2.margonem.pl/
// @grant        none
// ==/UserScript==
// przykladowe eventy: captcha,party,fight i pewnie jeszcze sporo ale mi sie nie chce pozdro
const wait = time => new Promise(resolve => setTimeout(resolve, time));
const essa = {
    events: {},
    addEventToCallback(event, callback) {
      if (this.events.event) return;

      (parseInput => {
        window.parseInput = (data, ...args) => {
          if (data[event]) {
            callback(data[event]);
          }
          parseInput(data, ...args);
        };
      })(window.parseInput);

      this.events[event] = true;
    }
  };

  essa.addEventToCallback("party", data => {
      console.log('test')
    if(data.members && data.members[hero.id].commander){
        _g('party&a=disband')
        wait(500);
    };
  });
