const data = require('../data/');
const math = data.math;
function setting_mathController(){
    return {
        async index(req, res){
            let date = new Date();
            console.log('ajax index request is received');
            let result = await math.getAll('', 1, 10);
            if(result.error) {
                console.log(result.error);
                res.render('math', {
                    date: date,
                    messages: {error: 'Could not get word data'}, 
                    math: {
                        pageInfo: {perpage: 10, count: 0, curPage: 1}, 
                        result: []}
                    });
            }
            let resData = {date: date, messages: {error: 'no error'}, math: {pageInfo: {perpage : 10, count: result.result.length, curPage: 1}, result: result.result, totalNum: result.totalNum}};
            console.log(resData);
            res.render('math', resData);
        },

        async number(req, res){
            console.log('ajax user request is received');
            let { filter, page, count } = req.body;

            //word table data: 
            const result = await math.getAll(filter, page, count);
            console.log("huyuanjin");
            console.log(result);
            if(result.error) res.status(500).send({messages: {error: result.error}, math: {pageInfo: {perpage : count, count: 0, curPage: 1}, result: [], totalNum: 0}});
            else res.status(200).send({math: {pageInfo: result.pageInfo, result: result.result, totalNum: result.totalNum}});
        },

        async delete(req, res){
            console.log('ajax userDelete request is received');
            let { id } = req.body;
            let resData = {result: false};

            if(!id) {
                console.log('id is not supplied');
                res.status(403).send(resData);
                return;
            }

            //word table data: 
            const result = await math.removemath(id);
            resData = {result};
            if(!resData.result) res.status(404).send(resData);
            else res.status(200).send(resData);
        },

        async add(req, res){
            console.log('jinhuyuan');
            console.log('ajax add request is received');
            let { target_num, num_Array, operation} = req.body;
            console.log(target_num, num_Array, operation);
            let resData = {result: false};
            if(!target_num || !num_Array || !operation ||operation == '') {
                console.log('Invalid params is supplied');
                res.status(403).send(resData);
                return;
            }
            num_Array = num_Array.split(',');

            const result = await math.addMath({target_num, num_Array, operation});
            resData = {result};
            if(!resData.result) res.status(500).send(resData);
            else res.status(200).send(resData);
        },

        async update(req, res){
            console.log('ajax update request is received');
            let { old_id, target_num, num_Array, operation } = req.body;
            console.log(old_id, target_num, num_Array,operation);
            let resData = {result: false};
            if(!old_id || !target_num || !num_Array || !operation ||operation == '') {
                console.log('Invalid params is supplied');
                res.status(403).send(resData);
                return;
            }
            num_Array = num_Array.split(',');

            const result = await math.updateMath({old_id, target_num, num_Array, operation});
            resData = {result};
            if(!resData.result) res.status(500).send(resData);
            else res.status(200).send(resData);
        },
    }
}

module.exports = setting_mathController;