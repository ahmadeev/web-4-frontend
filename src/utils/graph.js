
export const drawDots = (r, shots) => {
    if (!r || parseFloat(r) === 0) {
        return;
    }
    r = parseFloat(r);
    console.log("actual r:", r)

    let dotsToDraw = [];
    for (let shot of shots) {
        if (r === shot.r) {
            dotsToDraw.push(shot);
        } else {
            drawDot(shot.x, shot.y, shot.r, shot.hit, r)
        }
    }
    for (let dot of dotsToDraw) {
        drawDot(dot.x, dot.y, dot.r, dot.hit, r)
    }
}

export const drawDot = (x, y, r, isHit, lastR) => {
    if (!r || parseFloat(r) === 0 || !lastR || parseFloat(lastR) === 0) {
        return;
    }
    lastR = parseFloat(lastR);
    const svg = document.querySelector('svg')
    const CENTER_CONST = svg.getBoundingClientRect().height / 2;
    const R_CONST = 80

    x += R_CONST * x / lastR + CENTER_CONST
    y += -R_CONST * y / lastR + CENTER_CONST

    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    dot.setAttributeNS(null, 'cx', x);
    dot.setAttributeNS(null, 'cy', y);
    dot.setAttributeNS(null, 'class', 'target-dot');
    dot.setAttributeNS(null, 'r', '3');

    let dotColor;
    /* TODO: костыль для правильного окрашивания */

    if (r === (lastR < 0 ? -lastR : lastR)) {
        console.log("принято: r:", r, "lastR:", lastR)
        dotColor = (isHit ? 'fill: green; stroke: black;' : 'fill: red; stroke: black;')
    } else {
        console.log("отмена: r:", r, "lastR:", lastR)
        dotColor = 'fill: white; stroke: black;'
    }

    dot.setAttributeNS(null, 'style', dotColor);
    svg.appendChild(dot);
}