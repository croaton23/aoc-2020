import { readTextFile } from './utils/io';

const main = () =>  {

    // 13.1
    let timetable = readTextFile('13.txt')
        .split('\n');
    let start = +timetable[0];
    let times = timetable[1]
        .split(',')
        .filter(x => x != 'x')
        .map(x => [+x, +x - (start % +x)])
        .sort((x,y) => x[1] - y[1]);
    
    console.log(times[0][0] * times[0][1]);
    
    // 13.2
    let found = false;
    let i = 99999998503132;
    while(!found) {
        i += 10857169;
        if ((i +13) % 69029831 !== 0)
            continue;
        
        found = true;
        console.log(i);
    }
}

main();