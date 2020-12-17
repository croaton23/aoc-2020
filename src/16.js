import { readTextFile } from './utils/io';

const main = () =>  {
    
    // 16.1
    const text = readTextFile('16.txt').split('\n\n');

    const rules = text[0]
        .split('\n')
        .map(row => row.split(':'))
        .map(row => ({name:row[0], rest: row[1].split(' ')}))
        .map(row => ({
                    name: row.name, 
                    min1: +row.rest[1].split('-')[0],
                    max1: +row.rest[1].split('-')[1],
                    min2: +row.rest[3].split('-')[0],
                    max2: +row.rest[3].split('-')[1],
            }));

    //console.log(rules)
        // .map(row => ({
        //         name: row[0], 
        //         min1: +row[1].split('-')[0],
        //         max1: +row[1].split('-')[1],
        //         min2: +row[3].split('-')[0],
        //         max2: +row[3].split('-')[1],
        // }));
    
    // const result = text[2]
    //     .split('\n')
    //     .splice(1)
    //     .map(row => row.split(',').map(item => +item))
    //     .map(row => row.filter(i => !rules.find(r => 
    //         r.min1 <= i && r.max1 >= i ||
    //         r.min2 <= i && r.max2 >= i)));

    //console.log([].concat(...result).reduce((a,b) => a + b));

    // 16.2
    const tickets = text[2]
        .split('\n')
        .splice(1)
        .map(row => row.split(',').map(item => +item))
        .filter(row => row.every(i => rules.find(r => 
            r.min1 <= i && r.max1 >= i ||
            r.min2 <= i && r.max2 >= i)));
    
    let fieldRules = tickets[0]
        .map((x,i) => tickets.map(x => x[i]))
        .map(row => rules.filter(r => row.every(i =>
            r.min1 <= i && r.max1 >= i ||
            r.min2 <= i && r.max2 >= i)));
    
    //console.log(fieldRules);

    let changed = true;
    let found = [];
    while(changed) {
        changed = false;
        for(let j = 0; j < fieldRules.length; ++j) {

            const filtered = fieldRules[j].filter(fr => !found.includes(fr.name))
            if (filtered.length == 1){
                found.push(filtered[0].name);
                fieldRules = fieldRules.map((row, index) => 
                        index != j 
                    ? row.filter(r => r.name != filtered[0].name)
                    : fieldRules[j]
                );

                changed = true;
                break;
            }
        }
    }      
    
    console.log(fieldRules);
}

main();