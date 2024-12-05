export class ShotRequestDTO {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
}

export class ShotResponseDTO {
    constructor(x, y, r, isHit, currentTime, scriptTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = isHit;
        this.currentTime = currentTime;
        this.scriptTime = scriptTime;
    }
}


