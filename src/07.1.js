import { readTextFile } from './utils/io';



const main = () =>  {

    // 7.1
    const input = (readTextFile('07.1.txt')
        .split('\n')
        .map(line => line.substring(0, line.length - 1))
        .map(line => line.split(' bags contain '))
    )

    const whileRun = (input, bags) => {
        const newBags = input.map(row =>
            bags.some(b => row[1].includes(b)) && (bags.indexOf(row[0]) == -1) 
            ? row[0] 
            : null)
            .filter(x => x !== null)
        
        return newBags.length == 0
            ? bags
            : whileRun(input, newBags.concat(bags));
    }

    console.log(whileRun(input, ['shiny gold']).length - 1);

    // 7.2
    let bags = {}
    bags['shiny gold'] = 1;
    let sum = 0;
    while(Object.keys(bags).length > 0) {
        let newBags = {};
        for (var bag in bags) {
            var amount = bags[bag];
            input.forEach(row => {
                if (row[0] === bag) {
                    row[1].split(', ')
                        .map(row => row.split(' '))
                        .filter(row => row[0] !== 'no')
                        .map(row => ({
                            count: +row[0],
                            type: `${row[1]} ${row[2]}`
                        }))
                        .forEach(item => {
                            newBags[item.type] = item.count * amount + (newBags[item.type] || 0);
                        })
                }
            })
        }
        sum += Object.values(newBags).reduce((bag, sum) => sum += bag, 0);
        bags = newBags;
    }
    console.log(sum)
}

main();