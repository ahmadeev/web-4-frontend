
export const drawDots = (r, shots) => {
    if (!r) {
        console.log("нет r");
        return;
    }

    console.log("начали рисовать")
    console.log("shots:", shots)
    console.log("r:", r)
    for (let shot of shots) {
        console.log("shot:", shot)
        drawDot(shot.x, shot.y, shot.r, shot.hit, r)
    }
    console.log("закончили рисовать")
}

export const drawDot = (x, y, r, isHit, lastR) => {
    const svg = document.querySelector('svg')
    const CENTER_CONST = svg.getBoundingClientRect().height / 2;
    const R_CONST = 80

    // x += R_CONST * x / r + CENTER_CONST
    // y += -R_CONST * y / r + CENTER_CONST

    x += R_CONST * x / lastR + CENTER_CONST
    y += -R_CONST * y / lastR + CENTER_CONST

    // console.log(`x: ${x}, y: ${y}, r: ${r}, isHit: ${isHit}`);

    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    dot.setAttributeNS(null, 'cx', x);
    dot.setAttributeNS(null, 'cy', y);
    dot.setAttributeNS(null, 'class', 'target-dot');
    dot.setAttributeNS(null, 'r', '3');

    let dotColor;
    // console.log(`r: ${r}, last r: ${lastR}`);
    if (r === parseFloat(lastR)) {
        dotColor = (isHit ? 'fill: green; stroke: black;' : 'fill: red; stroke: black;')
    } else {
        dotColor = 'fill: white; stroke: black;'
    }

    dot.setAttributeNS(null, 'style', dotColor);
    svg.appendChild(dot);
    // console.log("точка нарисована")
}