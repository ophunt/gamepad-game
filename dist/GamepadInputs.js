"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ButtonInput_1 = require("./ButtonInput");
var GamepadInputs = /** @class */ (function () {
    function GamepadInputs(gamepad) {
        this.gamepad = gamepad;
        this.a = new ButtonInput_1.ButtonInput("a", gamepad, 0);
        this.b = new ButtonInput_1.ButtonInput("b", gamepad, 1);
        this.x = new ButtonInput_1.ButtonInput("x", gamepad, 2);
        this.y = new ButtonInput_1.ButtonInput("y", gamepad, 3);
    }
    return GamepadInputs;
}());
exports.GamepadInputs = GamepadInputs;
