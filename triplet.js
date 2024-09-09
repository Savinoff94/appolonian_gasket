// @ts-nocheck
/// <reference path="./node_modules/@types/p5/global.d.ts" />
class Triplet {
    constructor(c1,c2,c3) {
        this.c1 = c1;
        this.c2 = c2;
        this.c3 = c3;
        this.possibleTangentCirclesBends = null;
        this.possibleCircles = null;
    }

    getPosiibleCircles() {
        return this.possibleCircles
    }

    calculatePosiibleBends() {
        const k1 = this.c1.bend
        const k2 = this.c2.bend
        const k3 = this.c3.bend
        const sum = k1 + k2 + k3
        const product = abs(k1 * k2 + k2 * k3 + k1 * k3)
        const root = 2 * sqrt(product)

        this.possibleTangentCirclesBends = [sum + root, sum - root]

        return this;
    }

    calculatePossibleCircles() {
        const k1 = this.c1.bend
        const k2 = this.c2.bend
        const k3 = this.c3.bend

        const [firstPossibleBend, secondPossibleBend] = this.possibleTangentCirclesBends;

        let z1 = this.c1.center
        let z2 = this.c2.center
        let z3 = this.c3.center

        let zk1 = z1.scale(k1)
        let zk2 = z2.scale(k2)
        let zk3 = z3.scale(k3)
        let sum = zk1.add(zk2).add(zk3)

        let  root = zk1.multiply(zk2).add(zk2.multiply(zk3)).add(zk1.multiply(zk3))
        root = root.sqrt().scale(2)

        let center1 = sum.add(root).scale(1/firstPossibleBend)
        let center2 = sum.sub(root).scale(1/firstPossibleBend)
        let center3 = sum.add(root).scale(1/secondPossibleBend)
        let center4 = sum.sub(root).scale(1/secondPossibleBend)

        this.possibleCircles = [
            new Circle(firstPossibleBend, center1.a, center1.b),
            new Circle(firstPossibleBend, center2.a, center2.b),
            new Circle(secondPossibleBend, center3.a, center3.b),
            new Circle(secondPossibleBend, center4.a, center4.b),
        ]

        return this;
    }

    validateCircle(newCircle, allCircles) {
        if(newCircle.radius < 2){
            return false
        }
        const isCircleDublicate = allCircles.some((circleItem) => {
            let d = dist(newCircle.center.a, newCircle.center.b, circleItem.center.a, circleItem.center.b)
            let radiusDiff = abs(newCircle.radius - circleItem.radius);
            if(d < epsilon && radiusDiff < epsilon) {
                return true;
            }
        })
   
        if(isCircleDublicate) {
            return false
        }
   
        const isTagent = [this.c1,this.c2,this.c3].every((circleItem) => {
            return newCircle.isTangent(circleItem)
        })
   
       if(!isTagent) return false
   
       return true
    }
}