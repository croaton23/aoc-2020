import { readTextFile } from './utils/io';

const play = (decks, moves, level) => {
    while(decks[0].length > 0 && decks[1].length > 0) {
        
        if (moves.find(m => JSON.stringify(m.deck1) === JSON.stringify(decks[0]) 
                        && JSON.stringify(m.deck2) === JSON.stringify(decks[1])))
            return level === 0 ? [0, decks[0]] : 0;
        
        moves.push({deck1: decks[0].slice(), deck2: decks[1].slice()});

        let winner;
        let cards = [decks[0][0], decks[1][0]];
        if (decks[0].length > cards[0] && decks[1].length > cards[1]) {

            winner = play([decks[0].slice(1, decks[0][0]+1), decks[1].slice(1, decks[1][0]+1)], [], level+1);
        } else {
            winner = decks[0][0] > decks[1][0] ? 0 : 1;
        }

        decks[winner].push(cards[winner]);
        decks[winner].push(cards[(winner + 1) % 2]);
        decks[0] = decks[0].slice(1);
        decks[1] = decks[1].slice(1);
    }    

    if (decks[0].length === 0)
        return level === 0 ? [1, decks[1]] : 1;
    if (decks[1].length === 0)
        return level === 0 ? [0, decks[0]] : 0;
        
    console.log('ERROR')
}

const main = () =>  {
    
    let cards = readTextFile('22.txt')
        .split('\n\n')
        .map(row => row.split('\n').slice(1))
        .map(item => item.map(card => +card))
    
    // 22.1    
    let deck1 = cards[0].slice();
    let deck2 = cards[1].slice();
    while(deck1.length > 0 && deck2.length > 0) {
        if (deck1[0] > deck2[0]) {
            deck1.push(deck1[0]);
            deck1.push(deck2[0]);
        } else {
            deck2.push(deck2[0]);
            deck2.push(deck1[0]);
        }
        deck1 = deck1.slice(1);
        deck2 = deck2.slice(1);
    }

    console.log(deck2.map((c, index) => c * (deck2.length - index)).reduce((sum, c) => sum + c, 0)
              + deck1.map((c, index) => c * (deck1.length - index)).reduce((sum, c) => sum + c, 0));
    
    // 22.2
    let deck1 = cards[0].slice();
    let deck2 = cards[1].slice();
    let [winner, deck] = play([deck1, deck2], [], 0);
    console.log(deck.map((c, index) => c * (deck.length - index)).reduce((sum, c) => sum + c, 0));
}

main();