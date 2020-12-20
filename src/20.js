import { readTextFile } from './utils/io';


const matches = (row, tiles) => {
    const toCompare = JSON.stringify(row);
    for(let i = 0; i < tiles.length; ++i) {
        const t = tiles[i].value;
        const variants = [
            [...t[0]],
            [...t[0]].reverse(), 
            [...t[t.length - 1]],
            [...t[t.length - 1]].reverse(), 
            t.reduce((row, el) => {row.push(el[0]); return row;}, []),
            t.reduce((row, el) => {row.push(el[0]); return row;}, []).reverse(),
            t.reduce((row, el) => {row.push(el[el.length - 1]); return row;}, []),
            t.reduce((row, el) => {row.push(el[el.length - 1]); return row;}, []).reverse()
        ];

        if (variants.find(v => toCompare==JSON.stringify(v)))
            return true;
    }

    return false;
}
const main = () =>  {
    
    let tiles = readTextFile('20.txt')
        .split('\n\n')
        .map(row => row.split('\n'))
        .map(tile => ({
            key: +tile[0].slice(0, -1).split(' ')[1],
            value: tile.slice(1)})
            );
        
    // 20.1
    let res = 1;
    tiles.forEach(t => {
        const variants = [
            [...t.value[0]], 
            [...t.value[t.value.length - 1]], 
            t.value.reduce((row, el) => {row.push(el[0]); return row;}, []),
            t.value.reduce((row, el) => {row.push(el[el.length - 1]); return row;}, [])
        ];

        const tilesButThis = tiles.filter(tile => tile.key !== t.key);
        const notFits = variants.filter(v => !matches(v, tilesButThis)).length === 2;
        if (notFits) {
            res *= t.key;
        }
    });
    console.log(res);
    
    // 20.2

    tiles = tiles
        .map(t => ({...t, value: t.value.slice(1,-1)}))
        .map(t => ({...t, value: t.value.map(row => row.slice(1, -1))}));

    let sum = [].concat(...tiles.map(t => t.value)).map(row => row.match(/#/g) || []).reduce((sum, b) => {sum += b.length; return sum}, 0);

    for (let tmp = 32; tmp <= 48; tmp++) {
        console.log(tmp, sum - 15 * tmp);
    }
}

main();

//32 2038 - too high
//33 2023 - no
//34 2008 - no
//35 1993 - yes
//36 1978
//37 1963
//38 1948
//39 1933
//40 1918
//41 1903
//42 1888
//43 1873
//44 1858
//45 1843
//46 1828
//47 1813
//48 1798 - too low