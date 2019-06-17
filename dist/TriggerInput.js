"use strict";
var TriggerInput = /** @class */ (function () {
    function TriggerInput(name, gamepad, index) {
        this.name = name;
        this.gamepad = gamepad;
        this.index = index;
        this.value = 0;
        this.button = gamepad.buttons[this.index];
        this.value = this.button.value;
    }
    TriggerInput.prototype.readInput = function (gamepad) {
        this.value = this.button.value;
    };
    return TriggerInput;
}());
