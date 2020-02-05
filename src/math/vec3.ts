export class Vec3 {
    public x: number
    public y: number
    public z: number

    constructor (x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get r () { return this.x; }
    set r (n: number) { this.x = n; }
    get g () { return this.y; }
    set g (n: number) { this.y = n; }
    get b () { return this.z; }
    set b (n: number) { this.z = n; }

    public negate (): Vec3 {
        return new Vec3(
            -this.x,
            -this.y,
            -this.z
        );
    }

    public length (): number {
        return Math.sqrt(this.length2());
    }

    public length2 (): number {
        return Vec3.dot(this, this);
    }

    public normalize (): Vec3 {
        const l = this.length();

        return new Vec3(
            this.x / l,
            this.y / l,
            this.z / l
        );
    }

    public static dot (v1: Vec3, v2: Vec3): number {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }

    public static cross (v1: Vec3, v2: Vec3): Vec3 {
        return new Vec3(
            v1.y * v2.z - v1.z * v2.y,
            v1.z * v2.x - v1.x * v2.z,
            v1.x * v2.y - v1.y * v2.x
        );
    }

    public static add (v1: Vec3, v2: Vec3) {
        return new Vec3(
            v1.x + v2.x,
            v1.y + v2.y,
            v1.z + v2.z
        );
    }

    public static sub (v1: Vec3, v2: Vec3): Vec3 {
        return new Vec3(
            v1.x - v2.x,
            v1.y - v2.y,
            v1.z - v2.z
        );
    }

    public static mul (v1: Vec3, v2: Vec3): Vec3 {
        return new Vec3(
            v1.x * v2.x,
            v1.y * v2.y,
            v1.z * v2.z
        );
    }

    public static div (v1: Vec3, v2: Vec3): Vec3 {
        return new Vec3(
            v1.x / v2.x,
            v1.y / v2.y,
            v1.z / v2.z
        );
    }

    public static smul (v1: Vec3, t: number): Vec3 {
        return new Vec3(
            v1.x * t,
            v1.y * t,
            v1.z * t
        );
    }

    public static sdiv (v1: Vec3, t: number): Vec3 {
        return new Vec3(
            v1.x / t,
            v1.y / t,
            v1.z / t
        );
    }
}
