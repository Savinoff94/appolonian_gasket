// @ts-nocheck
/// <reference path="./node_modules/@types/p5/global.d.ts" />
class Circle {

    constructor(bend, x, y) {
        this.center = new Complex(x, y)
        this.bend = bend;
        this.radius = abs(1 / this.bend)
        
        this.xoff = 0;
        this.yoff = 100;
        this.roff = 0;
        this.plus = random(0.0045, 0.01)
        this.plus2 = random(0.0045, 0.01)
        // this.plus = random(0.01, 0.05)
        // this.plus2 = random(0.01, 0.05)
        this.plus3 = random(0.001, 0.005)
        this.animationCenter =  new Complex(x, y)
        this.radiusMultipyer = 1
        this.radiusMultipyerMuliplyer = 1
    }

    show() {
        stroke(1)
        noFill()
        if(this.bend > 0) {

            circle(this.center.a, this.center.b, 0.5 * (this.radius * 2))
        }
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
    move() {
        // this.radiusMultipyer = map((noise(this.xoff)), 0, 1, this.radius * 0.1, this.radius * this.radiusMultipyer)
        this.radiusMultipyer = (noise(this.xoff))
        this.animationCenter.a = map((noise(this.xoff)), 0, 1, this.center.a - (this.radius * (1 - this.radiusMultipyer)), this.center.a + (this.radius * (1 - this.radiusMultipyer)))
        this.animationCenter.b = map((noise(this.yoff)), 0, 1, this.center.b - (this.radius * (1 - this.radiusMultipyer)), this.center.b + (this.radius * (1 - this.radiusMultipyer)))
        this.xoff += this.plus
        this.yoff += this.plus2
        this.roff += this.plus3
        // this.xoff += 0.005
        // this.yoff += 0.005
        stroke(1)
        // if biggest circle not animate
        if(this.bend > 0) {
        circle(this.animationCenter.a, this.animationCenter.b, this.radiusMultipyer * (this.radius * 2))
        }
        return this
    }
}