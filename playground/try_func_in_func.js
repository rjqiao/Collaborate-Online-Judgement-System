const fs = require('fs');
const {promisify} = require('util');

const readFilePromisified = promisify(fs.readFile);



const func1 = async function () {
    console.log("start func1");

    const func2 = async function () {
        console.log("start func2");
        // fs.readFile("./file1.txt", (err, data) => {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         console.log(data.toString());
        //     }
        // });
        try{
            var data = await readFilePromisified('./file1.txt');
            data = await readFilePromisified('./file2.txt');
        } catch (e) {
            console.error(e);
        }
        console.log(data.toString());
        console.log("end func2");
    };
    func2();
    console.log("end func1");
};


func1();