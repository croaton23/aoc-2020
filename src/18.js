import { readTextFile } from './utils/io';

const clean = (str) => {
    str = str.trim();
    let state = 0;
    let atLeastOne = false;
    let charsOusideParentesis = 0;
    for (let i = 0; i < str.length; ++i) {
        if (str[i] === '(') {state ++; atLeastOne = true;}
        if (state === 0) charsOusideParentesis++;
        if (str[i] === ')') {state --; atLeastOne = true;}
    }

    if (charsOusideParentesis === 0 && atLeastOne){
        return str.slice(1,-1);
    }

    return str.trim();
}

const calc1 = (str) => {
    str = clean(str);

    let state = 0;
    for (let i = str.length - 1; i >= 0; --i) {
        if (str[i] === '(') state ++;
        if (str[i] === ')') state --;
        if (str[i] === '+' && state === 0)
            return calc1(str.slice(0, i)) + calc1(str.slice(i+1)); 
        if (str[i] === '*' && state === 0)
            return calc1(str.slice(0, i)) * calc1(str.slice(i+1)); 
    }

    return +str;
}

const calc2 = (str) => {
    str = clean(str);   

    let state = 0;
    let candidates = [];
    for (let i = str.length - 1; i >= 0; --i) {
        if (str[i] === '(') state ++;
        if (str[i] === ')') state --;
        if ((str[i] === '+' || str[i] === '*') && state === 0) 
            candidates.push({op: str[i], index: i})
    }

    if (candidates.find(c => c.op === '*')) {
        const res = candidates.find(c => c.op === '*');
        return calc2(str.slice(0, res.index)) * calc2(str.slice(res.index+1)); 
    }

    if (candidates.find(c => c.op === '+')) {
        const res = candidates.find(c => c.op === '+');
        return calc2(str.slice(0, res.index)) + calc2(str.slice(res.index+1)); 
    }

    return +str;
}

const main = () =>  {
    
    let numbers = readTextFile('18.txt').split('\n').map(item => item.replace(/\s/g, ''))
    
    // 18.1
    console.log(numbers.map(n => calc1(n)).reduce((x,y) => x + y));
    
    // 18.2
    console.log(numbers.map(n => calc2(n)).reduce((x,y) => x + y));
}

main();