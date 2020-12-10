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

    let prev = 0;
    let sums = [0,0,1];
    forLoop(0, jolts.length, (i) => {
        sums[jolts[i]-prev-1]++;
        prev = jolts[i];    
    });
    console.log(sums[0] * sums[2]);

    // 10.2 Solved manually with pen and paper!
}

main();