const readline = require('readline');
let requirementPerDay = 0;
let boxCapacity = 0;
let buyCount = 0; 
let dayCount = 0;
let boughtPreviousDay = true;

//TODO : constarints, user convenience , double space!

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
        await calculateResult(testCasesData)
    }

    getUserFeedBack();

    const calculateResult = (data) => {
        data.forEach(useCase => {
            //reset data
            requirementPerDay = 0;
            boxCapacity = 0;
            buyCount = 0; 
            dayCount = 0;
            boughtPreviousDay = true;

            useCaseArray = String(useCase).split(' ');
            boxCapacity = useCaseArray[0];
            requirementPerDay = useCaseArray[1];
            let daysLeft = useCaseArray[2];
            buyCount = Number(buyCount) + 1;
            getData(boxCapacity,requirementPerDay,daysLeft);
        })
    }

    const getData = (toffeInHand,requirementPerDay,daysLeft) => {
        // console.log(toffeInHand,requirementPerDay,daysLeft)
        const daysSurvived = Math.floor(toffeInHand/requirementPerDay);
        if(daysSurvived > 0) {
            //no buy
            const daysRemaining = daysLeft - daysSurvived;
            boughtPreviousDay = false;
            if( daysRemaining < 0 || daysRemaining === 0 ) {
                // servives
                console.log(buyCount);
                return;
            }
            dayCount = Number(dayCount) + Number(daysSurvived);
            getData(toffeInHand%requirementPerDay, requirementPerDay, daysRemaining);
        } else {
            //7 th day case.
            //2 consective buys - failure!!
            if(!boughtPreviousDay){
                if(dayCount % 7 === 6) {
                    //cannot buy on sunday, dies;
                    console.log('-1');
                    return;
                }
                //buy
                buyCount = Number(buyCount) + 1;
                getData(Number(toffeInHand)+Number(boxCapacity), requirementPerDay, daysLeft);
                boughtPreviousDay = true;
            } else {
                //consecutive buys not allowed, dies
                console.log('-1');
                return;
            }
        }
    }

}

module.exports = execute;