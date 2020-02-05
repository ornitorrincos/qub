import { Shape, Hit } from "../shapes";
import { Ray } from "../math";
import { Material } from "../material";

export interface ObjectIntersect {
    hit: Hit
    material: Material
}

export class RayObject {
    private readonly shape: Shape
    private readonly material: Material

    constructor (shape: Shape, material: Material) {
        this.shape = shape;
        this.material = material;
    }

    public intersect (ray: Ray, tMin: number, tMax: number): ObjectIntersect {
        const hit = this.shape.intersect(ray, tMin, tMax);

        return {
            hit,
            material: this.material
        };
    }
}
