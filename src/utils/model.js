export class CoordinatesDTO {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class DragonCaveDTO {
    constructor(numberOfTreasures) {
        this.numberOfTreasures = numberOfTreasures;
    }
}

export class PersonDTO {
    constructor(name, eyeColor, hairColor, location, birthday, height) {
        this.name = name;
        this.eyeColor = eyeColor;
        this.hairColor = hairColor;
        this.location = location;
        this.birthday = birthday;
        this.height = height;
    }
}

export class LocationDTO {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export class DragonHeadDTO {
    constructor(eyesCount, toothCount) {
        this.eyesCount = eyesCount;
        this.toothCount = toothCount;
    }
}

export class DragonDTO {
    constructor(name, coordinates, cave, killer = null, age = 0, description = null, wingspan, character = null, head = null) {
        // Проверка на обязательные поля и их валидность
        if (!name || typeof name !== 'string' || name.trim() === '') {
            throw new Error('Name cannot be null or empty');
        }
        if (!coordinates || !(coordinates instanceof CoordinatesDTO)) {
            throw new Error('Coordinates cannot be null');
        }
        if (!cave || !(cave instanceof DragonCaveDTO)) {
            throw new Error('Cave cannot be null');
        }
        if (age <= 0) {
            throw new Error('Age must be greater than 0');
        }
        if (!wingspan || wingspan <= 0) {
            throw new Error('Wingspan must be greater than 0');
        }

        // Установка значений свойств
        this.name = name;
        this.coordinates = coordinates;
        this.cave = cave;
        this.killer = killer;
        this.age = age;
        this.description = description;
        this.wingspan = wingspan;
        this.character = character;
        this.head = head;
    }
}
