import { readTextFile } from './utils/io';

const main = () =>  {
    
    // 15.1, 15.2
    const input = [0,14,1,3,7,9];
    let map = new Map();
    input.forEach((i, index) => map.set(i, -index));
    
    let prevValue = input[input.length - 1];
    for(let i = input.length; i < 30000000; ++i) {
        let stepsApart = 0;
        let last = map.get(prevValue);
        
        if (last > 0 || Object.is(last, +0)) {
            stepsApart = i -1 - last;
            map.set(prevValue, i -1);
        }
        
        if (map.has(stepsApart)) {
            const lastSeen = map.get(stepsApart);
            if (lastSeen < 0 || Object.is(lastSeen, -0))
                map.set(stepsApart, -lastSeen);
        }
        else
            map.set(stepsApart, -i);

        prevValue = stepsApart;
    }

    console.log(prevValue);
}

main();