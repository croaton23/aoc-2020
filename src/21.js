import { readTextFile } from './utils/io';


const main = () =>  {
    
    let menus = readTextFile('21.txt')
        .split('\n')
        .map(row => row.split('(contains '))
        .map(row => ({ings: row[0].trim().split(' '), algs: row[1].slice(0, -1).split(', ')}))
    
    let found = new Map();
    let change = true;
    while (change) {
        change = false;

        let myBreak = false;
        for (let i = 0; i < menus.length && !myBreak; ++i) {
            for (let j = 0; j < menus.length && !myBreak; ++j) {
                if (i === j) continue;

                if (menus[i].ings.length === 1 && menus[i].algs.length === 1) {
                    change = true;
                    found.set(menus[i].algs[0], menus[i].ings[0]);
                    menus = menus.map(m => ({
                        ings: m.ings.filter(ing => ing !== menus[i].ings[0]),
                        algs: m.algs.filter(alg => alg !== menus[i].algs[0])
                    }))
                }

                const intersect = menus[i].algs.filter(v => menus[j].algs.includes(v));

                if (intersect.length === 1) {
                    let same = menus[i].ings.filter(v => menus[j].ings.includes(v));
                    for (let k = 0; k < menus.length; ++k) {
                        if (k === i || k === j) continue;
                        if (menus[k].algs.filter(v => menus[i].algs.includes(v))[0] === intersect[0]) {
                            same = same.filter(ing => menus[k].ings.includes(ing));
                            console.log('her')
                        }
                    }

                    if (same.length === 1) {
                        change = true;
                        found.set(intersect[0], same[0]);
                        menus = menus.map(m => ({
                            ings: m.ings.filter(ing => ing !== same[0]),
                            algs: m.algs.filter(alg => alg !== intersect[0])
                        }))
                        myBreak = true;
                    }
                }
            }
        }
    }
    
    found = new Map([...found.entries()].sort());
    console.log([...found.entries()].sort());
    console.log([...found.values()].reduce((str, a) => str += `${a},`, ""));
}

main();