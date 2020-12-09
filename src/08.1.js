import { readTextFile } from './utils/io';

const main = () =>  {

    // 8.1
    const code = readTextFile('08.1.txt')
        .split('\n')
        .map(line => line.split(' '))
        .map(line => ({op: line[0], val: +line[1]}));

    const runCode = (code, pos, accumulator, visited) => {
        if (visited.includes(pos) || pos > code.length) return [-1, accumulator];
        if (pos == code.length) return [0, accumulator];

        switch (code[pos].op) {
            case 'nop':
                return runCode(code, pos + 1, accumulator, [...visited, pos]);
            case 'acc':
                return runCode(code, pos + 1, accumulator + code[pos].val, [...visited, pos]);
            case 'jmp':
                return runCode(code, pos + code[pos].val, accumulator, [...visited, pos]);
        }
    }

    console.log(runCode(code, 0, 0, [])[1]);

    // 8.2
    const codeReplacer = (code, toReplace, onReplace, i) => {
        if (i >= code.length)
            return -1;

        if (code[i].op !== toReplace) 
            return codeReplacer(code, toReplace, onReplace, i + 1);

        const newCode = code.map((item, index) => index === i 
            ? {...item, op: onReplace}
            : item);

        const [returnCode, accumulator] = runCode(newCode, 0, 0, []);
        
        return returnCode !== -1
            ? accumulator
            : codeReplacer(code, toReplace, onReplace, i + 1);
    }

    const jmp2Nop = codeReplacer(code, 'jmp', 'nop', 0);
    console.log(jmp2Nop !== -1 
        ? jmp2Nop 
        : codeReplacer(code, 'nop', 'jmp', 0));
}

main();