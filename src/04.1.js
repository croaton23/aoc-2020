import { readTextFile } from './utils/io';


const main = () =>  {
    
    // 4.1
    console.log(readTextFile('04.1.txt')
        .split('\n\n')
        .map(pass => pass.replace('\n',' '))
        .filter(item => 
            item.indexOf('iyr') !== -1 &&
            item.indexOf('byr') !== -1 &&
            item.indexOf('eyr') !== -1 &&
            item.indexOf('hgt') !== -1 &&
            item.indexOf('hcl') !== -1 &&
            item.indexOf('ecl') !== -1 &&
            item.indexOf('pid') !== -1).length);
    
    // 4.2
    const validation = {
        byr: v => v && v.length === 4 && +v >= 1920 && +v <= 2002,
        iyr: v => v && v.length === 4 && +v >= 2010 && +v <= 2020,
        eyr: v => v && v.length === 4 && +v >= 2020 && +v <= 2030,
        hgt: v => (/^\d+cm$/.test(v) && +v.match(/^\d+/)[0] >= 150 && +v.match(/^\d+/)[0] <=193) || (/^\d+in$/.test(v) && +v.match(/^\d+/)[0] >= 59 && +v.match(/^\d+/)[0] <=76),
        hcl: v => v && /^#[0-9a-f]{6}$/i.test(v),
        ecl: v => v && /amb|blu|brn|gry|grn|hzl|oth/i.test(v) > 0,
        pid: v => v && /[0-9]{9}/i.test(v),
        cid: v => true

    };
    
    console.log(readTextFile('04.1.txt')
        .split('\n\n')
        .map(pass => pass.replace('\n',' ').replace('\n', ' '))
        .map(pass =>  pass.split(' '))
        .map(pass =>  pass.map(item => item.split(':')))
        .map(pass => pass.map(item => (validation[item[0]] || ((x) => true))(item[1]) ))
        .filter(pass => pass.every(item => item)).length)
}

main();