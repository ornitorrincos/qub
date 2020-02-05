import { Vec3, Ray } from "../math";

export class Camera {
    private readonly lowerLeftCorner: Vec3
    private readonly horizontal: Vec3
    private readonly vertical: Vec3
    private readonly origin: Vec3

    public constructor () {
        this.lowerLeftCorner = new Vec3(-2.0, -1.0, -1.0);
        this.horizontal = new Vec3(4.0, 0.0, 0.0);
        this.vertical = new Vec3(0.0, 2.0, 0.0);
        this.origin = new Vec3(0.0, 0.0, 0.0);
    }

    public getRay (u: number, v: number): Ray {
        const direction = Vec3.add(this.lowerLeftCorner, Vec3.add(Vec3.smul(this.vertical, v), Vec3.smul(this.horizontal, u)));
        return new Ray(this.origin, direction);
    }
}
