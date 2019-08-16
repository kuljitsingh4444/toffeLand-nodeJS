const readline = require('readline');
const execute = () => {
    console.log(`
        T - test cases count\n 
        N - number of toffes in a box \n 
        K - the number of toffees you have to eat everyday to survive \n 
        S - the number of days you need to survive\n\n
        Constraints\n
        1 ≤ T ≤ 100\n
        1 ≤ N ≤ 100\n
        1 ≤ K ≤ 100\n
        1 ≤ S ≤ 1000\n\n`
    );

    let testCasesCount;
    let testCasesData = [];

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const question1 = () => {
        return new Promise((resolve, reject) => {
                rl.question('Enter Value of T\n', (answer) => {
                resolve(testCasesCount = answer)
            })
        })
    }

    const question2 = () => {
        return new Promise((resolve, reject) => {
                rl.question('Enter values of N,K,S separated by single space!\n', (answer) => {  
                let isValid = true;  
                let testCaseArray = answer.split(' ');
                if(testCaseArray.length !== 3){
                    isValid = false;
                }
                testCaseArray.forEach(testData => {
                    if(isNaN(testData)) {
                        isValid = false;
                    }
                })
                if(!isValid){
                    console.log('\nInvalid Input!\n\n Try Again\n');
                    getUserFeedBack();
                    return;
                }
                resolve(testCasesData.push(answer));
            })
        })
    }

    const multipleQuestions = async() => {
        for(let i = 1; i <= Number(testCasesCount) ; i++) {
            await question2();
        }
    }

    const getUserFeedBack = async () => {
        await question1();
        if(Number(testCasesCount) === 0 || isNaN(testCasesCount)){
            console.log('\nInvalid Input!\n\n Try Again\n');
            getUserFeedBack();
            return;
        }
        await multipleQuestions();
        rl.close();
        calculateResult(testCasesData)
    }

    getUserFeedBack();

    const calculateResult = (data) => {
        data.forEach(useCase => {
            //calcute day i can survive on 1st, buy
            //calcute day i can survive on 2nd, buy...+ add remaing from prev buy of there.
            //cannot buy in multiple of 7th day.
            //assuming correct input from here.
            useCaseArray = String(useCase).split(' ');
            console.log(useCaseArray)
        })
    }

}

module.exports = execute;