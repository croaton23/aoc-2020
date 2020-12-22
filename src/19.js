import { readTextFile } from './utils/io';


const work = (el, rules) => {
    if (el === '"a"' || el === '"b"') {
        return [...el.slice(1, -1)];
    } else {
        let row = rules[el];
        if (row.length === 1) return work(row[0], rules);

        const orIndex = row.indexOf('|');
        const options = [];
        if (orIndex >= 0) {
            options.push(row.slice(0, orIndex));
            options.push(row.slice(orIndex + 1));
        } else options.push(row);
        let globalRes = [];
        
        for (let p =0; p < options.length; ++p)
        {
            let res = [[]];
            row = options[p];
            for(let i = 0; i < row.length; ++i) {
                const all = work(row[i], rules);
                let newRes = [];
                for(let j = 0; j < res.length; ++j) {
                    for(let k = 0; k < all.length; ++k) {
                        newRes.push(res[j].concat(all[k]));
                    }
                }
                res = JSON.parse(JSON.stringify(newRes));
            }
            globalRes = globalRes.concat([...res]);
        }
        
        return globalRes;
    }
}

const main = () =>  {
    
    let numbers = readTextFile('19.txt')
        .split('\n\n')
        .map(row => row.split('\n'))
        
    let rules = numbers[0].map(row => row.split(':')).map(row => ({key: +row[0], rule: row[1].trim().split(' ')}))
    rules = rules.reduce((map, obj) => {
        map[+obj.key] = obj.rule; return map;
    }, {});
    
    // 19.1 
    let res = work('0', rules).map(item => item.reduce((a,b) => a+b));
    console.log(numbers[1].filter(item => res.includes(item)).length);

    // 19.2
    const fortietwos = work('42', rules).map(item => item.reduce((a,b) => a+b));
    const thirtyfirsts = work('31', rules).map(item => item.reduce((a,b) => a+b));
    
    let count = 0;
    for (let i = 0; i < numbers[1].length; ++i) {
        const check = numbers[1][i];
        let fits = true;
        let index = 0;
        let count1 = 0;
        
        while(fits && index+8 <= check.length) {
                if (!fortietwos.includes(check.slice(index, index+8))) {
                    fits = false;
                } else count1++;
            index += 8;
        }

        fits = true;
        index -= 8;
        let count2 = 0;

        while(fits && index+8 <= check.length) {
            if (!thirtyfirsts.includes(check.slice(index, index+8))) {
                fits = false;
            } else count2 ++;
            
            index += 8;
        }

        if (fits && (index === check.length) && count1 > count2 && count2 > 0)
            count++;
        
    }
    console.log(count);
}

main();