import { readTextFile } from './utils/io';


const main = () =>  {

    // 6.1
    console.log(readTextFile('06.1.txt')
        .split('\n\n')
        .map(item => item.replace(/\n/g, ''))
        .map(item => [...new Set([...item])])
        .reduce((sum, element) => sum + element.length, 0));

    // 6.2
    console.log(readTextFile('06.1.txt')
        .split('\n\n')
        .map(text => text.split('\n'))
        .map(ans => ans.map(elem => [...elem]))
        .map(item => item.reduce((a, b) => a.filter(c => b.includes(c)), item[0]))
        .reduce((a, b) => a + b.length, 0));
}

main();