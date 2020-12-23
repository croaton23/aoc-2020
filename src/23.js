const main = () =>  {
    
    // 23.1, 23.2
    let input = [..."789465123"].map(i => +i);
    console.log(input)
    const iter = 1_000_000;
    for (let j = 10; j <= iter; j++) {
        input.push(j);
    }
    const max = iter + 1;
    let list = LinkedList.of(input);

    const n = input.length;
    let current = 0;
    for(let i = 0; i <  10 * iter; ++i) {
        const n1 = input[(current + 1) % n];
        const n2 = input[(current + 2) % n];
        const n3 = input[(current + 3) % n];

        let seek = (input[current] + max - 1) % max;
        if (seek === 0) seek = max-1;

        let insertIndex = -1;
        while(insertIndex < 0) {
            if (n1 === seek || n2 === seek || n3 === seek){
                seek = (seek + max - 1) % max;
                if (seek === 0) seek = max-1;
            }
            else {
                let right = current + 1;
                let left = current - 1;
                if (left < 0) left = n-1;
                while(insertIndex < 0) {
                    if (input[left] === seek) insertIndex = (left + 1) % n;
                    if (input[right] === seek) insertIndex = (right + 1) % n;
                    right = (right + 1) % n;
                    left = left - 1;
                    if (left < 0) left = n-1;
                }
            }
        }

        let j = current;
        while(j != insertIndex) {
            input[(j+3)%n] = input[j];
            j--;
            if (j < 0) j = n-1;
        }
        input[(j+3)%n] = input[j];

        input[(insertIndex)%n] = n1; 
        input[(insertIndex+1)%n] = n2; 
        input[(insertIndex+2)%n] = n3; 
        
        if (i % 10000 === 0)
            console.log(i);

            if (i >= 9_999_999) {
            let index1 = input.indexOf(1);

            console.log(input[(index1 + 1)%n]);
            console.log(input[(index1 + 2)%n]);
            console.log()
        }

        current = (current+4)%n;
    }

    let index1 = input.indexOf(1);

    console.log(input[(index1 + 1)%n]);
    console.log(input[(index1 + 2)%n]);

    // 23.1
    // for(let i = (index1 +1)%n; i !== index1; i = (i + 1)%n) {
    //     process.stdout.write(""+input[i]);
    // }
}

main();