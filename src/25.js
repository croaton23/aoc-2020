import { readTextFile } from './utils/io';


const main = () =>  {
    
    // 25.1
    const inp1 = 10705932;
    const inp2 = 12301431;
    let mult = 1;
    let count = 1;
    const weirdConst = 20201227;
    while(true) {
        mult = mult *7 % weirdConst;
        if (mult === inp1){
            console.log(count);
            break;
        }
        count++;
    }

    mult = 1;
    for(let i = 0; i < count; i++){
        mult = mult * inp2 % weirdConst;
    }

    console.log(mult)
}

main();