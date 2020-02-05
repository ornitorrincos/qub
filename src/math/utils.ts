import { Vec3 } from "./vec3";

export function mix (start: number, finish: number, t: number): number {
    return (1 - t) * start + t * finish;
}

export function randomInUnitSphere (): Vec3 {
    let p: Vec3 = new Vec3();

    do {
        p = Vec3.sub(Vec3.smul(new Vec3(Math.random(), Math.random(), Math.random()), 2), new Vec3(1, 1, 1));
    } while (p.length2() >= 1);

    return p;
}
