const mongoCollections = require('../config/mongoCollections');
// const words = mongoCollections.words;
const maths = mongoCollections.math;
let { ObjectId } = require('mongodb');

const exportedMethods = {

  async addMath(data) {
    if(!data || !data.target_num || !data.num_Array  || !data.operation || data.operation =='') {
      console.log("Failed in addWord! word is undefined");
      return false;
    }

    const mathCollection = await maths();
    const math = await mathCollection.find().toArray();

    let isExist = false;
    math.map((numberdata, index) => {
      if(numberdata.target_num == data.target_num && numberdata.operation == data.operation) {
        isExist = true;
        return;
      };
    });
    if(isExist) {
      console.log('The word is already exist1');
      return false;
    }

    const newMathData = {
      target_num: data.target_num,
      num_Array: data.num_Array,
      operation: data.operation,
    };

    const newInsertInformation = await mathCollection.insertOne(newMathData);
    if (newInsertInformation.insertedCount === 0) {
      console.log('Could not add word');
      return false;
    }

    return data;
  },

  async updateMath(data) {
    if(!data || !data.old_id || !data.target_num || !data.num_Array || !data.operation || data.operation == "") {
      console.log("Failed in updateWord! word is undefined");
      return false;
    }
    
    const mathCollection = await maths();
    const math = await mathCollection.find().toArray();

    let isExist = false;
    math.map((mathData, index) => {
      if(mathData.old_id == data._id) {
        isExist = true;
        return;
      };
    });
    
    if(!isExist) {
      console.log('The math is not exist');
      return false;
    }

    const newMathData = {
        target_num: data.target_num,
        num_Array: data.num_Array,
        operation: data.operation
    };
    
    const newInsertInformation = await mathCollection.updateOne({"_id": ObjectId(data.old_id)}, { $set: newMathData });
    if (newInsertInformation.updatedCount === 0) {
      console.log('Could not update word');
      // return false;
    }

    return true;
  },

  async removemath(id) {
    if (!id || id == '') {
      console.log( 'ReferenceError: You must provide an word to remove');
      return false;
    };

    const mathCollection = await maths();
    try {
      const deletionInfo = await mathCollection.removeOne({ _id: ObjectId(id) });
      if (deletionInfo.deletedCount === 0) {
        console.log(`Could not delete the word`);
        return false;
      }
    } catch (e) {
      console.log('the word is not exist');
      return false;
    }
    return true;
  },

  async getRandomMath() {
    const mathCollection = await maths();
    const math = await mathCollection.find().toArray();

    const rndIndex =  Math.floor(Math.random() * math.length);

    let result = {};
    math.map((mathdata, index) => {
      if(index == rndIndex) {
        result['array'] = mathdata.num_Array;
        result['result'] = mathdata.target_num;
        result['operation'] = mathdata.operation;
        return;
      };
    });
    return result;
  },

  async getAll(filter, pageId, countPerPage) {
    let perPage = countPerPage ? Number.parseInt(countPerPage) : 10;
    let curPage = Number.parseInt(pageId);
    let result = {};

    const mathCollection = await maths();
    let total = await mathCollection.find({}).count();
    if(!total) {
        console.log('could not get the total of words');
        total = 0;
    }
    else console.log(`page total is : ${total}`);

    let count = await mathCollection.find({target_num: {$regex: filter}}).count();
    if(!count) {
        console.log('could not get the count of words');
        count = 0;
    }
    else console.log(`page count is : ${count}`);

    if(Number.parseInt(count) <= perPage * ( curPage - 1 )) curPage = 1;
    try {
        const mathData = await mathCollection.find({target_num: {$regex: filter.toUpperCase()}}).skip(perPage * (curPage - 1)).limit(perPage).toArray();
        if(mathData)
            result = { result: mathData, totalNum: total, pageInfo: {perPage: perPage, count: count, curPage: curPage} };
        else 
            result = { result: [], totalNum: total, pageInfo: {perPage: 10, count: 0, curPage: 1}, error: 'could not get word data' };
        return result;
    } catch (e) {
        console.log(`Error while getWordList: ${e}`);
        result = { result: [], totalNum: total, pageInfo: {perPage: 10, count: 0, curPage: 1}, error: e };
        return result;
    }
  },
};

module.exports = exportedMethods;
