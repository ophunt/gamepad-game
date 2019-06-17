"use strict";
var AxisInput = /** @class */ (function () {
    function AxisInput(name, gamepad, index) {
        this.name = name;
        this.gamepad = gamepad;
        this.index = index;
        this.value = gamepad.axes[this.index];
    }
    AxisInput.prototype.readInput = function () {
        this.value = this.gamepad.axes[this.index];
    };
    return AxisInput;
}());
