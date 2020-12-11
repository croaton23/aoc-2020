import { readTextFile } from './utils/io';

const main = () =>  {

    // 10.1
    const jolts = readTextFile('10.1.txt')
        .split('\n')
        .map(n => +n)
        .sort((a,b) => a - b);

    const forLoop = (index, maxIndex, job) => {
        if (index === maxIndex)
            return false;

        return job(index) || forLoop(index + 1, maxIndex, job);
    }

    let sums = [1,0,1];
    forLoop(1, jolts.length, i => {
        sums[jolts[i] - jolts[i-1] - 1]++;
    });
    console.log(sums[0] * sums[2]);

    // 10.2 Solved manually with pen and paper!
}

main();