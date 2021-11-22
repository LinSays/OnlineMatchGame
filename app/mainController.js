const data = require('../data/');
const words = data.words;

function settingController(){
    return {
        async index(req, res){
            let date = new Date();
            console.log('ajax index request is received');
            let result = await words.getAll('', 1, 10);
            if(result.error) {
                console.log(result.error);
                res.render('setting', {
                    date: date,
                    messages: {error: 'Could not get word data'}, 
                    words: {
                        pageInfo: {perpage: 10, count: 0, curPage: 1}, 
                        result: []}
                    });
            }
            let resData = {date: date, messages: {error: 'no error'}, words: {pageInfo: {perpage : 10, count: result.result.length, curPage: 1}, result: result.result, totalNum: result.totalNum}};
            console.log(resData);
            res.render('setting', resData);
        },

        async word(req, res){
            console.log('ajax user request is received');
            let { filter, page, count } = req.body;

            //word table data: 
            const result = await words.getAll(filter, page, count);
            console.log(result);
            if(result.error) res.status(500).send({messages: {error: result.error}, words: {pageInfo: {perpage : count, count: 0, curPage: 1}, result: [], totalNum: 0}});
            else res.status(200).send({words: {pageInfo: result.pageInfo, result: result.result, totalNum: result.totalNum}});
        },

        async delete(req, res){
            console.log('ajax userDelete request is received');
            let { word } = req.body;
            let resData = {result: false};

            if(!word) {
                console.log('word is not supplied');
                res.status(403).send(resData);
                return;
            }

            //word table data: 
            const result = await words.removeword(word);
            resData = {result};
            if(!resData.result) res.status(404).send(resData);
            else res.status(200).send(resData);
        },

        async add(req, res){
            console.log('ajax add request is received');
            let { word, matchArrayString ,meaning} = req.body;
            console.log(word, matchArrayString);
            let resData = {result: false};
            if(!word || !matchArrayString || matchArrayString == ''||!meaning || meaning =="") {
                console.log('Invalid params is supplied');
                res.status(403).send(resData);
                return;
            }
            let matchArray = matchArrayString.toUpperCase().split(',');

            const result = await words.addWord({word: word.toUpperCase(), matchArray, meaning});
            resData = {result};
            if(!resData.result) res.status(500).send(resData);
            else res.status(200).send(resData);
        },

        async update(req, res){
            console.log('ajax update request is received');
            let { oldword, word, matchArrayString ,meaning} = req.body;
            console.log(oldword, word, matchArrayString);
            let resData = {result: false};
            if(!oldword || !word || !matchArrayString || matchArrayString == '' || !meaning || meaning =="") {
                console.log('Invalid params is supplied');
                res.status(403).send(resData);
                return;
            }
            let matchArray = matchArrayString.toUpperCase().split(',');

            const result = await words.updateWord({oldword, word: word.toUpperCase(), matchArray,meaning});
            resData = {result};
            if(!resData.result) res.status(500).send(resData);
            else res.status(200).send(resData);
        },
    }
}

module.exports = settingController;