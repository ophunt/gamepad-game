import { Game } from "./Game";

const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d');

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

let game: Game = new Game(ctx);
game.main();
