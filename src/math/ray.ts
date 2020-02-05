import { Vec3 } from "./vec3";

export class Ray {
    public readonly origin: Vec3
    public readonly direction: Vec3

    constructor (origin?: Vec3, direction?: Vec3) {
        this.origin = origin || new Vec3();
        this.direction = direction || new Vec3();
    }

    public pointAtParameter (t: number): Vec3 {
        return Vec3.add(this.origin, Vec3.smul(this.direction, t));
    }
}
