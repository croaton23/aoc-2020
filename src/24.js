import { readTextFile } from './utils/io';


const main = () =>  {
    
    // 24.1
    let moves = readTextFile('24.txt')
        .split('\n')
        .map(row => [...row])

    for(let i = 0; i < moves.length; ++i) {
        for(let j = 0; j < moves[i].length; ++j) {
            if (moves[i][j] === 's' || moves[i][j] === 'n') {
                moves[i][j] = moves[i][j]+moves[i][j+1];
                moves[i][j+1] = 'X';
            }
        }
        moves[i] = moves[i].filter(m => m !== 'X');
    }

    let tiles = [];
    let length = 500;
    for(let i = 0; i < length; i++) {
        tiles.push([]);
        for(let j = 0; j < length; j++) {
           tiles[i].push('W'); 
        }
    }

    const root = {x: length / 2, y: length / 2};
    for(let i = 0; i < moves.length; ++i) {
        let pos = {...root};
        for(let j = 0; j < moves[i].length; ++j) {
            switch (moves[i][j]) {
                case 'w':
                    pos.x--;
                    break;
                case 'e':
                    pos.x++;
                    break;
                case 'nw':
                    if (pos.y & 1) {
                        pos.y--;
                    } else {
                        pos.x--;
                        pos.y--;
                    }
                    break;
                case 'ne':
                    if (pos.y & 1) {
                        pos.x++;
                        pos.y--;
                    } else {
                        pos.y--;
                    }
                    break;
                case 'sw':
                    if (pos.y & 1) {
                        pos.y++;
                    } else {
                        pos.x--;
                        pos.y++;
                    }
                    break;
                case 'se':
                    if (pos.y & 1) {
                        pos.x++;
                        pos.y++;
                    } else {
                        pos.y++;
                    }
                    break;
                default:
                    console.log("ERROR")
            }

            if (j === moves[i].length - 1) {
                if (tiles[pos.y][pos.x] === 'W'){
                    tiles[pos.y][pos.x] = 'B'
                }
                else{
                    tiles[pos.y][pos.x] = 'W';
                }
            }
        }
    }

    console.log([].concat(...tiles).filter(t => t==='B').length)

    // 24.2
    for (let moves = 100; moves > 0; moves-- ) {
        let copy = JSON.parse(JSON.stringify(tiles));

        for(let i = 1; i < length-1; i++) {
            for(let j = 1; j < length-1; j++) {
                let neigh = [tiles[i][j+1], tiles[i][j-1]];

                neigh.push(tiles[i-1][j]);
                neigh.push(tiles[i+1][j]);
                if (i & 1) {
                    neigh.push(tiles[i-1][j+1]);
                    neigh.push(tiles[i+1][j+1]);
                } else {
                    neigh.push(tiles[i-1][j-1]);
                    neigh.push(tiles[i+1][j-1]);
                }
                
                let black = neigh.filter(n=>n==='B').length;
                if (tiles[i][j] == 'B' && black === 0 || black > 2) {
                    copy[i][j] = 'W';
                }
                if (tiles[i][j] == 'W' && black === 2) {
                    copy[i][j] = 'B';
                }
            }
        }
        tiles = copy;
    }

    console.log([].concat(...tiles).filter(t => t==='B').length)
}

main();