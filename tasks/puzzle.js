const data = require('../data');
const words = data.words;
const math = data.math;
const mongoCollections = require('../config/mongoCollections');
const maths = mongoCollections.math;

const generateRandom = (from, to) => {
  let start = from, end = to;
  start = from > to ? to : from; 
  return start + Math.floor(Math.random() * (end - start + 1));
};

const randomCalculate = (array, tmp) => {
  let result = tmp;
  const rdIdx = generateRandom(0, array.length - 1);
  if (!tmp) {
    result = array[rdIdx];
  } else {
    const sign = generateRandom(0, 3);
    switch(sign) {
        case 0:
            result = tmp + array[rdIdx];
            break;
        case 1:
            result = tmp * array[rdIdx];
            break;
        case 2:
            result = Math.abs(tmp - array[rdIdx]);
            break;
        case 3:
            if (tmp % array[rdIdx] != 0) result = tmp + array[rdIdx];
            else result = tmp / array[rdIdx];
            break;
    }
  }
  array.splice(rdIdx, 1) ;
  return result;
};

const generatedNumber = () => {
  let array = [];
  let data = {array: []};
  for (let i = 0; i<5; i++)
    array.push(generateRandom(1, 9));
  array.push(25*Math.ceil(generateRandom(1, 100)/25));
  data.array = Array.from(array);

  let result = 0;
  data.result = generateRandom(101, 999);
  return data;
};

const exportedMethods = {

  async getNumberData() {
    // let data;// = {array: [1, 1, 1, 1, 1, 1], result: 450};
    // while(data == undefined || data == 0) {
    //   data = generatedNumber()
    // }
    // console.log('numdata:');
    // console.log(data);
    
    // const mathCollection =  await maths();
    // const mathData =  await mathCollection.find().toArray();
    // let array = [];
    // let data = {array: []};
    // for (let i = 0; i<6; i++){
    //   array.push(parseInt(mathData[0].num_Array[i]));
    // }
      
    // data.array = Array.from(array);
    // data.result = parseInt(mathData[0].target_num);
    // data.operation = mathData[0].operation;
    // return data;
    return await math.getRandomMath();
  },
  async getNumberResult(){
    const mathCollection =  await maths();
    const mathData =  await mathCollection.find().toArray();
    return  mathData[0].operation;
  },
  async getWordData() {
    return await words.getRandomWord();
  },

};

module.exports = exportedMethods;
