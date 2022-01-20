const constructionBg = p => {
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


    let food = [];
    let count = 0;
    let cWidth = document.body.clientWidth;
    let cHeight = document.body.clientHeight;
    let rows = p.int(cHeight / 50);
    let cols = p.int(cWidth / 50);
    p.setup = () => {
        p.createCanvas(cWidth, cHeight);
        for (let i = 0; i < cols * rows; i++) {
            food.push(p.random(foodEmoji));
        }
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(20);
    }

    p.draw = () => {
        p.background(255);
        for (let i = 0; i < cols; i++) {
            let x = (i + 0.5) * (p.width / cols);
            for (let q = 0; q < rows; q++) {
                let y = (q + 0.5) * (p.height / rows);
                p.text(food[count], x, y);
                count++;
            }
        }
        food[p.int(p.random(food.length))] = p.random(foodEmoji);
        count = 0;
    }
}

let bgSketch = new p5(constructionBg, document.getElementById('bgContainer'));
