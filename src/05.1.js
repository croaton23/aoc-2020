import { readTextFile } from './utils/io';


const main = () =>  {

    // 5.1
    const middle = (a, b) => Math.round((a + b) / 2);
    const search = {
        B: (minMax) => ({...minMax, minX: middle(minMax.minX, minMax.maxX)}),
        F: (minMax) => ({...minMax, maxX: middle(minMax.minX, minMax.maxX)}),
        R: (minMax) => ({...minMax, minY: middle(minMax.minY, minMax.maxY)}),
        L: (minMax) => ({...minMax, maxY: middle(minMax.minY, minMax.maxY)}),
    }
    
    console.log(Math.max.apply(Math, readTextFile('05.1.txt')
        .split('\n')
        .map(pass => [...pass].reduce((minMax, move) => search[move](minMax), { minX: 0, maxX: 127, minY: 0, maxY: 7 } ))
        .map(minMax => minMax.minX * 8 + minMax.minY)));

    // 5.2
    const seats = readTextFile('05.1.txt')
        .split('\n')
        .map(pass => [...pass].reduce((minMax, move) => search[move](minMax), { minX: 0, maxX: 127, minY: 0, maxY: 7 } ))
        .map(minMax => minMax.minX * 8 + minMax.minY);
    
    console.log([...Array(128 * 8).keys()]
        .filter((k, i) => !seats.includes(i) && seats.includes(i-1) && seats.includes(i+1)));
}

main();