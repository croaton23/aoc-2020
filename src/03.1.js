import { readTextFile } from './utils/io';

const field = readTextFile('03.1.txt').split('\n');

const slide = (incX, incY) => {
    let pos = { x: 0, y: 0};
    let result = 0;
    while (pos.y < field.length) {
        if (field[pos.y][pos.x] == '#') result++;

        let newPos = {x: (pos.x + incX) % field[0].length, y: pos.y + incY};
        pos = newPos;
    }

    return result;
}

const main = () =>  {
    // 3.1
    console.log(slide(3, 1));

    // 3.2
    const slides = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
    console.log(slides
        .map(s => slide(s[0], s[1]))
        .reduce((s1, s2) => s1 * s2));
}

main();