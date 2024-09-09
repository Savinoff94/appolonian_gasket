// @ts-nocheck
/// <reference path="./node_modules/@types/p5/global.d.ts" />
const allCircles = [];
let queue = []
const epsilon = 0.1

let qwe = 0;

function mousePressed() {
    let nextQueue = []
    for (let triplet of queue) {
        const possibleCircles = triplet.calculatePosiibleBends().calculatePossibleCircles().getPosiibleCircles()
        for(let newCircle of possibleCircles) {
            if(triplet.validateCircle(newCircle, allCircles)) {
                allCircles.push(newCircle)
                let t1 = new Triplet(triplet.c1,triplet.c2,newCircle)
                let t2 = new Triplet(triplet.c1,triplet.c3,newCircle)
                let t3 = new Triplet(triplet.c2,triplet.c3,newCircle)
                nextQueue = nextQueue.concat([t1,t2,t3])
            }
        }
    }
    
    queue = nextQueue

    allCircles.forEach((circleItem) => {
        circleItem.show()
    })

}
let flag = false;
function setup() {
    createCanvas(600, 600);

    let c1 = new Circle(-1/200, 200, 200)
    let c2 = new Circle(1/100, 100, 200)
    let c3 = new Circle(1/100, 300, 200)

    allCircles.push(c1)
    allCircles.push(c2)
    allCircles.push(c3)

    queue.push(new Triplet(c1,c2,c3))

    for(let i = 0; i < 15; i ++) {
        mousePressed()
    }
    flag = true

}

function draw() {
    background(200)
    if(!flag) {
        allCircles.forEach((circleItem) => {
            circleItem.show()
    
        })

        return 
    }
    
    
    allCircles.forEach((circleItem) => {
        circleItem.move()

    })
}