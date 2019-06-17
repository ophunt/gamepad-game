"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.facing = Direction.Right;
    }
    Player.prototype.update = function (inputs, game) {
        if (inputs.a) {
            this.attack(game);
        }
        if (inputs.b) {
            this.color = "red";
        }
        else if (inputs.x) {
            this.color = "blue";
        }
        else if (inputs.y) {
            this.color = "yellow";
        }
    };
    Player.prototype.draw = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 20, 20);
        // TODO: Replace with drawing a real character
        ctx.fillStyle = "orange";
        switch (this.facing) {
            case Direction.Up:
                ctx.fillRect(this.x, this.y, 20, 2);
                break;
            case Direction.Down:
                ctx.fillRect(this.x, this.y + 18, 20, 2);
                break;
            case Direction.Left:
                ctx.fillRect(this.x, this.y, 2, 20);
                break;
            case Direction.Right:
                ctx.fillRect(this.x + 18, this.y, 2, 20);
                break;
        }
    };
    Player.prototype.move = function (game, direction) {
        var newTile;
    };
    Player.prototype.attack = function (game) {
        ;
    };
    return Player;
}());
