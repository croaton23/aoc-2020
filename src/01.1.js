import { readTextFile } from './utils/io';

const main = () =>  {
    
    var text = readTextFile('01.1.txt');

    const input = text.split('\n').map(t => parseInt(t));
    for(let i = 0; i < input.length; ++i) {
        for(let j = 1; j < input.length; ++j) {
            for(let k = 1; k < input.length; ++k) {
                if (input[i] + input[j] + input[k] === 2020) console.log(input[i] * input[j] * input[k]);
            }
        }
    }
}

main();