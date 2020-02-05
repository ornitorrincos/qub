import { Sphere } from "../shapes";
import { RayObject, ObjectIntersect } from "./object";
import { Ray, Vec3 } from "../math";

export { ObjectIntersect } from "./object";

export class World {
    private readonly elements: RayObject[]

    public constructor () {
        this.elements = [];
        this.initialize();
    }

    public initialize () {
        this.elements.push(new RayObject(new Sphere(new Vec3(0, 0, -1), 0.5), { albedo: new Vec3(0, 0.8, 0) }));
        this.elements.push(new RayObject(new Sphere(new Vec3(0, -100.5, -1), 100), { albedo: new Vec3(0.5, 0.5, 0.5) }));
    }

    public intersect (ray: Ray, tMin: number, tMax: number): ObjectIntersect {
        let int: ObjectIntersect = {
            hit: {
                t: -1
            },
            material: {
                albedo: new Vec3(0.5, 0.5, 0.5)
            }
        };

        let closest = tMax;

        this.elements.forEach((shape) => {
            const intersect = shape.intersect(ray, tMin, closest);
            if (intersect.hit.t >= 0) {
                closest = int.hit.t;
                int = intersect;
            }
        });

        return int;
    }
}
