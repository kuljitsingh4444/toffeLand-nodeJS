const express = require('express');
let bParser = require('body-parser');
let path = require('path');
const readline = require('readline')
let app = express();

//write logic, refactor later, eg : double space!, spearate file ?

app.use(express.static(path.join(__dirname, '/public')));

app.use(bParser.json());
app.use(bParser.urlencoded({
    extended: false
}));

app.listen( 8000,()=> serverCallBack() )

const serverCallBack = () => {
    //Server start mesage
    console.log('Server running on port 8000\n\n\n');
    console.log(' T - test cases count\n N - number of toffes in a box \n K - the number of toffees you have to eat everyday to survive \n S - the number of days you need to survive\n\n');

    let testCasesCount;
    let testCasesData = [];

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const question1 = () => {
        return new Promise((resolve, reject) => {
                rl.question('Enter Value of T', (answer) => {
                resolve(testCasesCount = answer)
            })
        })
    }

    const question2 = () => {
        return new Promise((resolve, reject) => {
                rl.question('Enter values of N,K,S separated by single space!', (answer) => {  
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
                    console.log('invalid Input!\n\n Try Again');
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
            console.log('invalid Input!\n\n Try Again');
            getUserFeedBack();
            return;
        }

        await multipleQuestions();

        console.log(testCasesData);

        rl.close();
    }

    getUserFeedBack();
}