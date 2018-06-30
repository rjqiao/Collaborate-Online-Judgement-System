


const http = request("http");

const data = {};
const problem_list = {problems:null};

data.getProblems = async function () {
    res = await http.get("api/xxx");

    return res.json();
};

problem_list.getProblems = function () {

};

