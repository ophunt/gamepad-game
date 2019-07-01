import { Game } from "./Game";

const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');

let game: Game = new Game(canvas);
game.main();
