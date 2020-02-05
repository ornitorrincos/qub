import { Shape, Hit } from "./shape";
import { Ray, Vec3 } from "../math";

export class Sphere extends Shape {
    public readonly center: Vec3
    public readonly radious: number

    public constructor (center?: Vec3, radious?: number) {
        super();

        this.center = center || new Vec3();
        this.radious = radious || 1;
    }

    public intersect (ray: Ray, tMin: number, tMax: number): Hit {
        const oc: Vec3 = Vec3.sub(ray.origin, this.center);
        const a = Vec3.dot(ray.direction, ray.direction);
        const b = 2 * Vec3.dot(oc, ray.direction);
        const c = Vec3.dot(oc, oc) - this.radious * this.radious;

        const discriminant = b * b - 4 * a * c;

        if (discriminant > 0) {
            let temp = (-b - Math.sqrt(discriminant)) / (2.0 * a);
            if (temp < tMax && temp > tMin) {
                const point = ray.pointAtParameter(temp);
                return {
                    t: temp,
                    point,
                    normal: Vec3.sdiv((Vec3.sub(point, this.center)), this.radious).normalize()
                };
            }

            temp = (-b - Math.sqrt(discriminant)) / (2.0 * a);
            if (temp < tMax && temp > tMin) {
                const point = ray.pointAtParameter(temp);
                return {
                    t: temp,
                    point,
                    normal: Vec3.sdiv((Vec3.sub(point, this.center)), this.radious).normalize()
                };
            }
        }

        return { t: -1 };
    }
}
