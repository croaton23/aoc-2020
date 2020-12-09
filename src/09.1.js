import { readTextFile } from './utils/io';

const main = () =>  {

    // 9.1
    const xmas = readTextFile('09.1.txt')
        .split('\n')
        .map(n => +n)

    const forLoop = (index, maxIndex, job) => {
        if (index === maxIndex)
            return false;

        return job(index) || forLoop(index + 1, maxIndex, job);
    }
    
    const tail = 25;
    const ans = forLoop(tail, xmas.length, i => {
        if (!forLoop(i - tail, i, j => {
            return forLoop(i - tail, i, k => {
                return xmas[k] + xmas[j] == xmas[i];
            });
        }))
            return xmas[i];
    });

    console.log(ans)
    
    // 9.2
    let sum = 0;
    let start = 0;

    console.log(forLoop(0, xmas.length, i => {
        while(sum > ans)
            sum -= xmas[start++];

        if (sum === ans)
            return Math.min.apply(null, xmas.slice(start, i)) +
                   Math.max.apply(null, xmas.slice(start, i));
        
        sum += xmas[i];
    }));
}

main();