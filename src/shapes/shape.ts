import { Vec3, Ray } from "../math";

export interface Hit {
    t: number
    point?: Vec3
    normal?: Vec3
}

export abstract class Shape {
    public abstract intersect(ray: Ray, tMin: number, tMax: number): Hit
}
