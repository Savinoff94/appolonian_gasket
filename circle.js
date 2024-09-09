// @ts-nocheck
/// <reference path="./node_modules/@types/p5/global.d.ts" />
class Circle {

    constructor(bend, x, y) {
        this.center = new Complex(x, y)
        this.bend = bend;
        this.radius = abs(1 / this.bend)
    }

    show() {
        stroke(0)
        noFill()
        circle(this.center.a, this.center.b, (this.radius * 2))
    }
    dist(other) {
        return dist(this.center.a, this.center.b, other.center.a, other.center.b)
    }
    isTangent(c2) {
        let d = this.dist(c2)
        let r1 = this.radius
        let r2 = c2.radius
    
        let a = abs(d-(r1+r2)) < epsilon
        let b = abs(d-abs(r2-r1)) < epsilon
    
        return (a || b)
    }
}