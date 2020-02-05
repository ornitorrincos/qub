import { Config } from "../config";

export class Page {
    private canvas;
    private ctx: CanvasRenderingContext2D;
    private button;
    private callback: (page: Page) => Promise<unknown>

    public constructor () {
        this.createElements();
    }

    private createElements (): void {
        this.canvas = document.createElement("canvas");

        this.canvas.height = Config.height;
        this.canvas.width = Config.width;

        this.ctx = this.canvas.getContext("2d");

        this.button = document.createElement("button");
        this.button.innerHTML = "render";
        this.button.addEventListener("click", this.emitRender.bind(this));

        const div = document.createElement("div");

        const body = document.getElementById("body");
        body.appendChild(this.button);
        div.appendChild(this.canvas);
        body.appendChild(div);
    }

    public setRenderCallback (callback: (page: Page) => Promise<unknown>) {
        this.callback = callback;
    }

    private emitRender (): void {
        this.callback(this);
    }

    public setPixel (x: number, y: number, r: number, g: number, b: number) {
        this.ctx.fillStyle = `rgb(${this.clamp(r * 255)}, ${this.clamp(g * 255)}, ${this.clamp(b * 255)})`;

        this.ctx.fillRect(x, y, 1, 1);
    }

    private clamp (n: number) {
        return Math.min(Math.max(n, 0), 255);
    }
}
