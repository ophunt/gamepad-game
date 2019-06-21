import { Game } from "./Game";

const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d');

let game: Game = new Game(ctx);
game.main();
