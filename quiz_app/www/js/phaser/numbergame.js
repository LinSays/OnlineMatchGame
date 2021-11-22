/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 */

// var worker = new Worker(
//     `data:text/javascript,
//     var numberResults = [];
//     function pushLog(logs, offset){
//         for(let i=0; i<numberResults.length; i++){
//             if(numberResults[i].offset > offset || (numberResults[i].offset == offset && numberResults[i].log.length >= logs.length)){
//                 numberResults.splice(i,0,{log:logs, offset:offset});
//                 return;
//             }
//         }
//         numberResults.push({log:logs, offset:offset});
//     }
//     function calcTargetNumber(arrayNumbers, resultNumber, logs){
//         for(let i=0; i<arrayNumbers.length; i++){
//             for(let j=0; j<arrayNumbers.length; j++){
//                 if(i == j)
//                     continue;
//                 for(let k=0; k<4; k++){
//                     let number = 0;
//                     if(k==0){
//                         number = arrayNumbers[i] + arrayNumbers[j];
//                     }
//                     else if(k==1){
//                         number = arrayNumbers[i] - arrayNumbers[j];
//                         if(number<=0)
//                             continue;
//                     }
//                     else if(k==2){
//                         number = arrayNumbers[i] * arrayNumbers[j];
//                         if(number>=10000)
//                             continue;
//                     }
//                     else if(k==3){
//                         number = Number.parseInt(arrayNumbers[i] / arrayNumbers[j]);
//                         if(arrayNumbers[i] % arrayNumbers[j] != 0)
//                             continue;
//                     }
//                     let newArray = [number];
//                     for(let p=0; p<arrayNumbers.length; p++){
//                         if(p!=i && p!=j){
//                             newArray.push(arrayNumbers[p]);
//                         }
//                     }
//                     let obj = {x:arrayNumbers[i], y:arrayNumbers[j], operator:k, equal:number};
//                     let newLog = [...logs, obj];
//                     if(number == resultNumber)
//                     {
//                         pushLog(newLog, Math.abs(number - resultNumber));
//                         return;
//                     }
//                     else if(Math.abs(number - resultNumber)<=3){
//                         pushLog(newLog, Math.abs(number - resultNumber));
//                     }
//                     if(newArray.length>1){
//                         calcTargetNumber(newArray, resultNumber, newLog);
//                     }
//                 }
//             }
//         }
//     }
//     onmessage = function(event){    //This will be called when worker.postMessage is called in the outside code.
//         let arrayNumbers = event.data.arrayNumbers;
//         let resultNumber = event.data.resultNumber;
//         let logs = event.data.logs;
//         numberResults = [];
//         calcTargetNumber(arrayNumbers, resultNumber, logs);
//         postMessage(numberResults);    //Send the result to the outside code.
//     };
//     `
// );


class NumberGameScreen extends Phaser.Scene{
    constructor(){
        super({key: "NumberGameScreen"});
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create() {
        numberResults = '';
        // worker.onmessage = function(event){
        //     numberResults = event.data;
        //     console.log(numberResults);
        // }
        // worker.postMessage({arrayNumbers: gameData.numData[cur_number].array, resultNumber: gameData.numData[cur_number].result});
        // numberResults = await puzzle.getNumberResult();
        numberResults = gameData.numData[0].operation; //solution for number
        
        this.action_audio = this.sound.add('action');
        this.start_audio = this.sound.add('start');
        if(sound_enable)
            this.start_audio.play();
        this.lose_audio = this.sound.add('lose');
        this.success_audio = this.sound.add('success');

        this.point = undefined;
        this.logo = this.add.image(540,120,'Logo');

        this.outline = this.add.image(540,840,'Outline');

        this.targetImage = this.add.image(320,350,'Target');
        this.targetNumber = this.add.text(320,390, gameData.numData[cur_number].result, { fixedWidth: 350, fixedHeight: 110 })
        .setOrigin(0.5,0.5)
        .setStyle({
            fontSize: '78px',
            fontFamily: 'RR',
            color: '#ffffff',
            align: 'center',
        });

        this.timeImage = this.add.image(760,350,'Time');
        this.timeText = this.add.text(760,390, '60', { fixedWidth: 350, fixedHeight: 110 })
        .setOrigin(0.5,0.5)
        .setStyle({
            fontSize: '78px',
            fontFamily: 'RR',
            color: '#ffffff',
            align: 'center',
        });
        let curTime = new Date();
        this.timeStamp = curTime.getTime();

        this.numberTexts = [];
        this.numberImages = [];
        this.selected_index = -1;
        this.selected_operator = -1;

        for (let i=0; i<6; i++)
        {
            let numberImage = this.add.image(300 + (i%3)*240, 720 + Math.floor(i/3) * 250, 'Number', 0);
            let numberText = this.add.text(300 + (i%3)*240, 720 + Math.floor(i/3) * 250, gameData.numData[cur_number].array[i], { fixedWidth: 180, fixedHeight: 100 })
            .setOrigin(0.5,0.5)
            .setStyle({
                fontSize: '92px',
                fontFamily: 'RR',
                fontWeight:'bold',
                color: '#1d3d59',
                align: 'center',
            });
            this.numberTexts.push(numberText);
            this.numberImages.push(numberImage);
            numberImage.setInteractive().on('pointerdown', () => {
                if(sound_enable)
                    this.action_audio.play();
                if(this.numberImages[i].alpha == 0.5)
                    return;
                if(this.selected_index == i)
                {
                    this.selected_index = -1;
                    this.numberImages[i].setFrame(0);
                    return;
                }
                if(this.selected_index == -1)
                {
                    this.selected_index = i;
                    this.numberImages[i].setFrame(1);
                    return;
                }
                if(this.selected_operator == -1)
                {
                    this.numberImages[this.selected_index].setFrame(0);
                    this.selected_index = i;
                    this.numberImages[i].setFrame(1);
                }
                else{
                    if(this.selected_operator == 1)
                    {
                        this.numberTexts[i].setText(Number.parseInt(this.numberTexts[i].text) + Number.parseInt(this.numberTexts[this.selected_index].text));
                        this.numberImages[this.selected_index].setAlpha(0.5).setFrame(0);
                        this.numberImages[i].setFrame(0);
                        this.selected_index = -1;
                        this.selected_operator = -1;
                        this.plusOperator.setFrame(1);

                    }
                    else if(this.selected_operator == 2)
                    {
                        this.numberTexts[i].setText(Number.parseInt(this.numberTexts[this.selected_index].text) - Number.parseInt(this.numberTexts[i].text));
                        this.numberImages[this.selected_index].setAlpha(0.5).setFrame(0);
                        this.numberImages[i].setFrame(0);
                        this.selected_index = -1;
                        this.selected_operator = -1;
                        this.minusOperator.setFrame(1);
                    }
                    else if(this.selected_operator == 3)
                    {
                        this.numberTexts[i].setText(Number.parseInt(this.numberTexts[this.selected_index].text) * Number.parseInt(this.numberTexts[i].text));
                        this.numberImages[this.selected_index].setAlpha(0.5).setFrame(0);
                        this.numberImages[i].setFrame(0);
                        this.selected_index = -1;
                        this.selected_operator = -1;
                        this.multiOperator.setFrame(1);
                    }
                    else if(this.selected_operator == 4)
                    {
                        let remainder = Number.parseInt(this.numberTexts[this.selected_index].text) % Number.parseInt(this.numberTexts[i].text);
                        if(remainder != 0)
                            return;
                        this.numberTexts[i].setText(Number.parseInt(this.numberTexts[this.selected_index].text) / Number.parseInt(this.numberTexts[i].text));
                        this.numberImages[this.selected_index].setAlpha(0.5).setFrame(0);
                        this.numberImages[i].setFrame(0);
                        this.selected_index = -1;
                        this.selected_operator = -1;
                        this.diviOperator.setFrame(1);
                    }
                }
            });
        }

        this.plusOperator = this.add.image(225, 1170,'Plus', 1);
        this.plusOperator.setInteractive().on('pointerdown', () => {
            if(sound_enable)
                this.action_audio.play();
            if(this.selected_operator == 1)
            {
                this.selected_operator = -1;
                this.plusOperator.setFrame(1);
            }
            else
            {
                this.refreshOperators();
                this.selected_operator = 1;
                this.plusOperator.setFrame(0);
            }
        });

        this.minusOperator = this.add.image(430,1170,'Minus', 1);
        this.minusOperator.setInteractive().on('pointerdown', () => {
            if(sound_enable)
                this.action_audio.play();
            if(this.selected_operator == 2)
            {
                this.selected_operator = -1;
                this.minusOperator.setFrame(1);
            }
            else
            {
                this.refreshOperators();
                this.selected_operator = 2;
                this.minusOperator.setFrame(0);
            }
        });

        this.multiOperator = this.add.image(635,1170,'Multi', 1);
        this.multiOperator.setInteractive().on('pointerdown', () => {
            if(sound_enable)
                this.action_audio.play();
            if(this.selected_operator == 3)
            {
                this.selected_operator = -1;
                this.multiOperator.setFrame(1);
            }
            else
            {
                this.refreshOperators();
                this.selected_operator = 3;
                this.multiOperator.setFrame(0);
            }
        });

        this.diviOperator = this.add.image(840,1170, 'Divi', 1);
        this.diviOperator.setInteractive().on('pointerdown', () => {
            if(sound_enable)
                this.action_audio.play();
            if(this.selected_operator == 4)
            {
                this.selected_operator = -1;
                this.diviOperator.setFrame(1);
            }
            else
            {
                this.refreshOperators();
                this.selected_operator = 4;
                this.diviOperator.setFrame(0);
            }
        });

        this.refreshButton = this.add.image(640,1380,'Refresh', 1);
        this.refreshButton.setInteractive().on('pointerdown', () => {
            if(sound_enable)
                this.action_audio.play();
            this.refreshNumbers();
            this.refreshOperators();
        });

        this.checkButton = this.add.image(440,1380,'Check', 1);
        this.checkButton.setInteractive().on('pointerdown', () => {
            if(sound_enable)
                this.action_audio.play();
            this.checkResult();
        });

        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            args: [this],
            loop: true
        });
    }
    update(){
    }

    checkResult(){
        if(this.selected_index == -1){
            toast_error(this, 'Lütfen bir sayı seçiniz');
            return;
        }

        let bPass = false;
        let target = Number.parseInt(this.targetNumber.text);
        let result = Number.parseInt(this.numberTexts[this.selected_index].text);
        this.point = 0;
        if(target == result)
        {
            bPass = true;
            this.point = 10 + Math.floor(Number.parseInt(this.timeText.text)/10);
        }
        else if(Math.abs(target-result) == 1)
        {
            bPass = true;
            this.point = 8;
        }
        else if(Math.abs(target-result) == 2)
        {
            bPass = true;
            this.point = 6;
        }
        else if(Math.abs(target-result) == 3)
        {
            bPass = true;
            this.point = 4;
        }
        else{
            if(sound_enable)
                this.lose_audio.play();
            toast_error(this, 'Hedefe +3 veya -3\nyakınlıktaki\nsayıya ulaşmalısınız');
            return;
        }

        if(!bPass && (game_type == "stage" || game_type == "daily"))
            game_state = "failed";
        else
            game_state = "pass";

        if(sound_enable)
            this.success_audio.play();
        if(game_type == "stage" || game_type == "daily")
        {
            this.timer.remove();
            this.time.removeEvent(this.timer);
            cur_point += this.point;
            // if(game_type == "stage"){
            //     Client.stage_end(bPass);
            // }
            // else if(game_type == "daily"){
            //     Client.daily_end(bPass);
            // }
            cur_number++;
            game.scene.stop('NumberGameScreen');
            game.scene.start('AnswerScreen');
        }
        else if(game_type == "battle" || game_type == "tournament")
        {
            Client.online_end(this.point);
            if(this.point >=10) {
                this.convertToWaitng();
            }
        }
    }

    convertToWaitng(){
        this.checkButton.setVisible(false);
        this.refreshButton.setVisible(false);
        this.plusOperator.setVisible(false);
        this.minusOperator.setVisible(false);
        this.multiOperator.setVisible(false);
        this.diviOperator.setVisible(false);
        this.waitingText = this.add.text(540, 1380, 'Rakip bekleniyor...', { fixedWidth: 700, fixedHeight: 120, align:'center' })
        .setStyle({
            fontSize: '64px',
            fontFamily: 'RR',
            fontWeight: 'bold',
            color: '#ffffff',
        })
        .setOrigin(0.5,0.5);
    }

    updateTimer(scene){
        let curTime = new Date();
        let current_time = 60 - Number.parseInt((curTime.getTime() - scene.timeStamp)/1000);
        if(current_time < 0)
        {
            scene.timer.remove();
            scene.time.removeEvent(scene.timer);
            if(sound_enable)
                scene.lose_audio.play();
            scene.timeText.setText('0');
            if(game_type == "stage" || game_type == "daily")
                game_state = "failed";
            else
                game_state = "pass";

            if(game_type == "stage" || game_type == "daily")
            {
                cur_point += scene.point;
                // if(game_type == "stage"){
                //     Client.stage_end(false);
                // }
                // else if(game_type == "daily"){
                //     Client.daily_end(false);
                // }
                cur_number++;
                game.scene.stop('NumberGameScreen');
                game.scene.start('AnswerScreen');
            }
            else if(game_type == "battle" || game_type == "tournament")
            {
                if(scene.point == undefined)
                {
                    scene.point = 0;
                }
                if(scene.point == 0)
                    Client.online_end(scene.point);
                scene.convertToWaitng();
            }
        }
        else{
            scene.timeText.setText(current_time);
        }
    }

    refreshNumbers(){
        this.selected_index = -1;
        for (let i=0; i<6; i++)
        {
            this.numberTexts[i].setText(gameData.numData[cur_number].array[i]);
            this.numberImages[i].setAlpha(1.0);
            this.numberImages[i].setFrame(0);
        }
    }

    refreshOperators(){
        this.selected_operator = -1;
        this.plusOperator.setFrame(1);
        this.minusOperator.setFrame(1);
        this.multiOperator.setFrame(1);
        this.diviOperator.setFrame(1);
    }
}
