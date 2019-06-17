"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ButtonInput = /** @class */ (function () {
    function ButtonInput(name, gamepad, index) {
        this.name = name;
        this.gamepad = gamepad;
        this.index = index;
        this.button = gamepad.buttons[this.index];
        this.pressed = this.button.pressed;
    }
    ButtonInput.prototype.readInput = function (gamepad) {
        // This might need to be retrieved from the Gamepad every time: test
        this.pressed = this.button.pressed;
    };
    return ButtonInput;
}());
exports.ButtonInput = ButtonInput;
