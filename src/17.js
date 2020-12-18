import { readTextFile } from './utils/io';

const main = () =>  {
    
    // 17.1, 17.2
    const scale = 2;
    let cubes = readTextFile('17.txt')
        .split('\n')
        .map(line => Array(scale * line.length).fill('.').concat([...line]).concat(Array(scale * line.length).fill('.')));
        
    const n = cubes[0].length;
    const emptyLines = Array(n/(2*scale + 1) * scale).fill(Array(n).fill('.'));
    cubes = emptyLines.concat(cubes).concat(emptyLines);
    const emptyPlane = emptyLines.concat(emptyLines).concat(emptyLines);
    let cubes3D = Array(Math.floor(n/2)).fill(emptyPlane);
    cubes3D.push(cubes);
    for(let i = 0; i < Math.floor(n/2); i++) cubes3D.push(emptyPlane);

    const emptyCube = Array(n).fill(emptyPlane);
    let cubes4D = Array(Math.floor(n/2)).fill(emptyCube);
    cubes4D.push(cubes3D);
    for(let i = 0; i < Math.floor(n/2); i++) cubes4D.push(emptyCube);
    //cubes3D = cubes3D.concat(Array(Math.floor(n/2)).fill(emptyPlane));

    let count = 0;
    while (count++ < 6) {
        let copy = JSON.parse(JSON.stringify(cubes4D));

        for(let x = 0; x < n; ++x) {
            for(let y = 0; y < n; ++y) {
                for(let z = 0; z < n; ++z) {
                    for(let w = 0; w < n; ++w) {
                    
                    let neighbours = [];

                    for(let l = -1; l < 2; l++){
                        for(let m = -1; m < 2; m++){
                            for(let o = -1; o < 2; o++){
                                for(let p = -1; p < 2; p++){
                                if (l == 0 && m == 0 && o == 0 && p == 0) continue;
                                //console.log(x+l, y+m, z+o);
                                //if (x+l == 13 && y+m == 21 && z+o == 0)
                                    //console.table(cubes3D[x+l])
                                if (x + l >= 0 && y+m >= 0 && z+o >= 0 && w+p >= 0 && x + l < n && y+m < n && z+o < n && w+p < n)
                                    neighbours.push(cubes4D[x+l][y+m][z+o][w+p]);
                                }
                            }
                        }
                    }
                    if (cubes4D[x][y][z][w] === '#' && neighbours.filter(neigh => neigh === '#').length !== 2
                        && neighbours.filter(neigh => neigh === '#').length !== 3) {
                        copy[x][y][z][w] = '.';
                    }
                    if (cubes4D[x][y][z][w] === '.' && neighbours.filter(neigh => neigh === '#').length === 3){
                        copy[x][y][z][w] = '#';
                    }
                }
            }
            }
        }
        cubes4D = copy;
    }
    
    console.log([].concat(...[].concat(...[].concat(...cubes4D))).filter(s => s==='#').length);
}

main();