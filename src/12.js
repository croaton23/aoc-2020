import { readTextFile } from './utils/io';

const main = () =>  {

    // 11.1
    let turns = readTextFile('12.txt')
        .split('\n')
        .map(line => ({turn: line[0], steps: +line.substr(1)}))
        .map(turn => turn.turn === 'L' ? {
                turn: 'R', 
                steps: (360-turn.steps) / 90
            } 
            : turn.turn === 'R' ? {
                turn: turn.turn, 
                steps: turn.steps / 90
            } : turn
            );
        

    let east = 0;
    let north = 0;
    let dirs = {
        E: steps => east += steps,
        S: steps => north -= steps,
        W: steps => east -= steps,
        N: steps => north += steps
    };
    let dir = 0;

    for(let i = 0; i < turns.length; ++i)
    {
        switch((turns[i].turn)) {
            case 'R':
                dir = (dir + turns[i].steps) % 4;
            break;
            case 'F':
                dirs[Object.keys(dirs)[dir]](turns[i].steps);
            break;
            default: 
                dirs[turns[i].turn](turns[i].steps);
            break;
        }

    }
    console.log(Math.abs(east) + Math.abs(north));

    // 12.2
    let ship = { E: 0, N: 0 };
    let wp = { E: 10, N: 1 };
    dirs = {
        E: steps => wp.E += steps,
        S: steps => wp.N -= steps,
        W: steps => wp.E -= steps,
        N: steps => wp.N += steps,
    };

    for(let i = 0; i < turns.length; ++i)
    {
        switch((turns[i].turn)) {
            case 'R':
                const angle = Math.PI / 2 * turns[i].steps;
                wp = {
                    E : wp.E * Math.cos(angle) + wp.N * Math.sin(angle),
                    N : wp.N * Math.cos(angle) - wp.E * Math.sin(angle)
                }
            break;
            case 'F':
                ship = {
                    E: ship.E + turns[i].steps * wp.E,
                    N: ship.N + turns[i].steps * wp.N
                };
            break;
            default: 
                dirs[turns[i].turn](turns[i].steps);
            break;
        }
    }

    console.log(Math.round(Math.abs(ship.E) + Math.abs(ship.N)));
}

main();