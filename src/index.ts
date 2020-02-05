import { Page } from "./page";
import { Config } from "./config";

import { Vec3, Ray, randomInUnitSphere } from "./math";
import { World, ObjectIntersect } from "./world";
import { Camera } from "./camera";

const SAFE_INSERSECT = 0.001;

const computeLambert = function (lightIntensity: Vec3, lightDirection: Vec3, normal: Vec3): Vec3 {
    return Vec3.smul(lightIntensity, Math.max(0.0, Vec3.dot(lightDirection, normal)));
};

const directLighting = function (world: World, position: Vec3, normal: Vec3): Vec3 {
    const lightDirection = new Vec3(-1, 1, 0.5).normalize();
    const lightIntensity = new Vec3(0.5, 0.5, 0.5);

    return new Vec3();
};

const ambientLighting = function (direction: Vec3): Vec3 {
    const unitDirection: Vec3 = direction.normalize();
    const t = 0.5 * (unitDirection.y + 1.0);
    return Vec3.add(Vec3.smul(new Vec3(1.0, 1.0, 1.0), (1.0 - t)), Vec3.smul(new Vec3(0.5, 0.7, 1.0), t));
};

const color = function (r: Ray, world: World, bounces: number, previousPosition?: Vec3, previousNormal?: Vec3): Vec3 {
    const intersect: ObjectIntersect = world.intersect(r, SAFE_INSERSECT, Number.MAX_SAFE_INTEGER);

    if ((intersect.hit.t > 0) && (bounces > 0)) {
        const position = intersect.hit.point;
        const normal = intersect.hit.normal;

        const newP = Vec3.add(intersect.hit.point, Vec3.smul(normal, 0.005));

        const target: Vec3 = Vec3.add(Vec3.add(intersect.hit.point, normal), randomInUnitSphere());
        const newRay = new Ray(newP, Vec3.sub(target, newP).normalize());

        const bounceColor = color(newRay, world, bounces - 1, position, normal);

        return Vec3.mul(bounceColor, intersect.material.albedo);
    }

    let directColor = new Vec3();
    if (bounces <  Config.bounces) {
        directColor = directLighting(world, previousPosition, previousNormal);
    }

    const ambientColor = ambientLighting(r.direction);

    return Vec3.add(ambientColor, directColor);
};

const flipY = function (y: number): number {
    return (Config.height - 1) - y;
};

const render = async function (page: Page) {
    const camera = new Camera();
    const world = new World();
    world.initialize();

    return new Promise((resolve) => {
        for (let j = 0; j < Config.height; j++) {
            for (let i = 0; i < Config.width; i++) {
                let col = new Vec3();

                for (let s = 0; s < Config.pixelSamples; s++) {
                    const u = (i + Math.random()) / Config.width;
                    const v = (flipY(j) + Math.random()) / Config.height;

                    const ray = camera.getRay(u, v);

                    col = Vec3.add(col, color(ray, world, Config.bounces));
                }

                col = Vec3.sdiv(col, Config.pixelSamples);
                page.setPixel(i, j, col.r, col.g, col.b);
            }
        }

        resolve();
    });
};

window.onload = function () {
    const page = new Page();

    page.setRenderCallback(render);
};
