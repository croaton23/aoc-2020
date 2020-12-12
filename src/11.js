import { readTextFile } from './utils/io';

const main = () =>  {

    // 11.1
    let seats = readTextFile('11.txt')
        .split('\n')
        .map(line => [...line]);

    let change = true;
    const m = seats.length;
    const n = seats[0].length;
    while (change) {
        
        change = false;
        let copy = JSON.parse(JSON.stringify(seats));

        for(let i = 0; i < m; ++i) {
            for(let j = 0; j < n; ++j) {
                
                let neighbours = [];
                if (i > 0) neighbours.push(seats[i-1][j]);
                if (j > 0) neighbours.push(seats[i][j-1]);
                if (i > 0 && j > 0) neighbours.push(seats[i-1][j-1]);
                if (i < m-1) neighbours.push(seats[i+1][j]);
                if (j < n-1) neighbours.push(seats[i][j+1]);
                if (i < m-1 && j < n-1) neighbours.push(seats[i+1][j+1]);
                if (i < m-1 && j > 0) neighbours.push(seats[i+1][j-1]);
                if (i > 0 && j < n-1) neighbours.push(seats[i-1][j+1]);
                
                if (seats[i][j] === 'L' && neighbours.every(neigh => neigh !== '#')) {
                    copy[i][j] = '#';
                    change = true;
                }
                if (seats[i][j] === '#' && neighbours.filter(neigh => neigh === '#').length >= 4){
                    copy[i][j] = 'L';
                    change = true;
                }
            }
        }
        seats = copy;
    }
    console.table([].concat(...seats).filter(s => s==='#').length);

    // 11.2
    seats = readTextFile('11.txt')
        .split('\n')
        .map(line => [...line]);
    change = true;
    while (change) {
        change = false;
        let copy = JSON.parse(JSON.stringify(seats));
        for(let i = 0; i < m; ++i) {
            for(let j = 0; j < n; ++j) {
                if (seats[i][j] === '.') continue;

                let neighbours = [];
                let ii = i;
                while (ii > 0 && seats[ii-1][j]==='.') ii--;
                if (ii > 0) neighbours.push(seats[ii-1][j]);

                let jj = j;
                while (jj > 0 && seats[i][jj-1]==='.') jj--;
                if (jj > 0) neighbours.push(seats[i][jj-1]);

                jj = j;
                ii = i;
                while (jj > 0 && ii > 0 && seats[ii-1][jj-1]==='.') {jj--; ii--;}
                if (jj > 0 && ii > 0) neighbours.push(seats[ii-1][jj-1]);

                ii = i;
                while (ii < m-1 && seats[ii+1][j]==='.') ii++;
                if (ii < m-1) neighbours.push(seats[ii+1][j]);

                jj = j;
                while (jj < n-1 && seats[i][jj+1]==='.') jj++;
                if (jj < n-1) neighbours.push(seats[i][jj+1]);

                jj = j;
                ii = i;
                while (jj < n-1 && ii < m-1 && seats[ii+1][jj+1]==='.') {jj++; ii++;}
                if (jj < n-1 && ii < m-1) neighbours.push(seats[ii+1][jj+1]);

                jj = j;
                ii = i;
                while (jj > 0 && ii < m-1 && seats[ii+1][jj-1]==='.') {jj--; ii++;}
                if (jj > 0 && ii < m-1) neighbours.push(seats[ii+1][jj-1]);

                jj = j;
                ii = i;
                while (jj < n-1 && ii > 0 && seats[ii-1][jj+1]==='.') {jj++; ii--;}
                if (jj < n-1 && ii > 0) neighbours.push(seats[ii-1][jj+1]);

                if (seats[i][j] === 'L' && neighbours.every(neigh => neigh !== '#')) {
                    copy[i][j] = '#';
                    change = true;
                }
                
                if (seats[i][j] === '#' && neighbours.filter(neigh => neigh === '#').length >= 5){
                    copy[i][j] = 'L';
                    change = true;
                }
                
            }
        }
        seats = copy.slice();
    }
    console.table([].concat(...seats).filter(s => s==='#').length);
}

main();