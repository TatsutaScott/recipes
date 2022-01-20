const foodSketch = p => {
    let Engine = Matter.Engine,
        World = Matter.World,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Bodies = Matter.Bodies;

    const foods = [];
    const bounds = [];
    let mConstraint;
    let mainText;

    let canvas;
    const sizes = [20, 30, 40];

    const foodEmoji = [
        "🍕", "🍔", "🍟", "🌭", "🧂", "🍿", "🥓", "🥚", "🥯", "🥨", "🥐",
        "🍞", "🧈", "🥞", "🧇", "🍳", "🥖", "🧀", "🥗", "🥙", "🥪", "🌮",
        "🌯", "🥫", "🍱", "🥡", "🥠", "🥟", "🍠", "🥩", "🍗", "🍖", "🍘",
        "🍙", "🍚", "🍛", "🍜", "🦪", "🍣", "🍤", "🥣", "🍝", "🥘", "🍲",
        "🧆", "🍢", "🥮", "🍥", "🥧", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂",
        "🍰", "🍯", "🍮", "🍡", "🍭", "🍬", "🍫", "🧁", "🥝", "🥥", "🍇",
        "🍎", "🥭", "🍍", "🍌", "🍋", "🍊", "🍉", "🍈", "🍏", "🍐", "🍑",
        "🍒", "🍓", "🍅", "🍆", "🌽", "🧄", "🥔", "🥦", "🥬", "🥒", "🥑",
        "🍄", "🧅", "🥕", "🌰", "🥜"
    ];

    class Food {
        constructor(t, x, y, r) {
            let randomVel = p5.Vector.random2D();
            let options = {
                friction: 0.3,
                restitution: 0.1,
                velocity: { x: randomVel.x, y: randomVel.y },
                torque: 5
            };
            this.body = Bodies.rectangle(x, y, r * 2, r * 2, options);

            World.add(world, this.body);
            this.text = t;
            this.r = r;
        }
        show() {
            let pos = this.body.position;
            let angle = this.body.angle;

            p.push();
            p.translate(pos.x, pos.y);
            p.rotate(angle);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(this.r * 2);
            p.text(this.text, 0, 0);
            p.pop();
        }
    }

    class Boundary {
        constructor(x, y, w, h) {
            let options = {
                friction: 0.3,
                restitution: 0.6,
                isStatic: true,
            };
            this.body = Bodies.rectangle(x, y, w, h, options);
            this.w = w;
            this.h = h;
            World.add(world, this.body);
        }

        show() {
            let pos = this.body.position;
            let angle = this.body.angle;
            this.body.torque(4);
            p.push();
            p.translate(pos.x, pos.y);
            p.rotate(angle);
            p.rectMode(p.CENTER);
            p.strokeWeight(1);
            p.noStroke();
            p.fill(255, 0, 0);
            p.rect(0, 0, this.w, this.h);
            p.pop();
        }
    }

    class TextBoundary {
        constructor(t, x, y, size) {
            let options = {
                friction: 0.3,
                restitution: 0.6,
                isStatic: true,
            };
            this.t = t;
            this.size = size;
            p.textSize(size);
            //this.h = textAscent(this.t);
            this.w = p.textWidth(this.t);
            this.body = Bodies.rectangle(x, y, this.w, this.size * 1.5, options);

            World.add(world, this.body);
        }

        show() {
            let pos = this.body.position;
            let angle = this.body.angle;
            p.push();
            p.translate(pos.x, pos.y);
            p.rotate(angle);
            p.textAlign(p.CENTER);
            p.noStroke();
            p.fill(54, 145, 98);
            p.textStyle(p.BOLD);
            p.textSize(this.size);
            p.text(this.t, 0, 0);
            p.pop();
        }
    }


    let cWidth = document.body.clientWidth;
    let cHeight = document.body.clientHeight;

    p.setup = () => {
        let canvasDiv = document.getElementById('bgContainer');
        let w = canvasDiv.offsetWidth;
        let h = canvasDiv.offsetHeight;
        canvasDiv.position(0, 0);
        canvasDiv.style('z-index', -1);
        canvas = p.createCanvas(w, p.windowHeight);
        engine = Engine.create();
        world = engine.world;
        p.select('canvas').elt.style.letterSpacing = "20px";
        p.textFont("Helvetica")
        bounds.push(new Boundary(0, p.height / 2, 10, p.height));
        bounds.push(new Boundary(p.width, p.height / 2, 10, p.height));
        bounds.push(new Boundary(p.width / 2, 0, p.width, 10));
        bounds.push(new Boundary(p.width / 2, p.height, p.width, 10));

        mainText = new TextBoundary("LET'S EAT!", p.width / 2, p.height / 2, 40);

        World.add(world, bounds);
        World.add(world, mainText);

        let mouse = Mouse.create(canvas.elt);
        mouse.pixelRatio = p.pixelDensity() // for retina displays etc
        let options = {
            mouse: mouse
        }

        mConstraint = MouseConstraint.create(engine, options);
        World.add(world, mConstraint);
    }

    p.draw = () => {
        p.background(255);
        Engine.update(engine);
        for (let food of foods) {
            food.show();
        }
        mainText.show();

    }

    p.mousePressed = () => {
        if (p.mouseButton == p.LEFT) {
            for (let i = 0; i < 10; i++) {
                let size = p.random(sizes);
                let text = p.random(foodEmoji)
                let offsetX = p.random(-20, 20);
                let offsetY = p.random(-20, 20);

                foods.push(new Food(text, p.mouseX + offsetX, p.mouseY + offsetY, size));
            }
        }

    }
}

let bgSketch = new p5(foodSketch, document.getElementById('bgContainer'));
