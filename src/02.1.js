import { readTextFile } from './utils/io';

const main = () =>  {
    
    // 2.1
    console.log(readTextFile('02.1.txt').split('\n').map(st => ({
        min: parseInt(st.split(' ')[0].split('-')[0]),
        max: parseInt(st.split(' ')[0].split('-')[1]),
        symbol: st.split(' ')[1][0],
        pass: st.split(' ')[2]
    }))
    .filter(item => 
         (item.pass.match(new RegExp(item.symbol, 'g')) || []).length >= item.min && 
         (item.pass.match(new RegExp(item.symbol, 'g')) || []).length <= item.max)
    .length);

    // 2.2
    console.log(readTextFile('02.1.txt').split('\n').map(st => ({
        min: parseInt(st.split(' ')[0].split('-')[0]),
        max: parseInt(st.split(' ')[0].split('-')[1]),
        symbol: st.split(' ')[1][0],
        pass: st.split(' ')[2]
    }))
    .filter(item => (item.pass[item.min - 1] === item.symbol) ^ (item.pass[item.max - 1] === item.symbol))
    .length);
}

main();