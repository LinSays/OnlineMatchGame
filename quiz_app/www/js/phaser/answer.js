/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 */


class AnswerScreen extends Phaser.Scene{
    constructor(){
        super({key: "AnswerScreen"});
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create() {
        let passedNumber = 0;
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0xfa5c00, 1);
        this.graphics.fillRoundedRect(250,100,580,150, 10);
        this.graphics.fillStyle(0xffffff, 1);
        this.graphics.fillRoundedRect(200,250,680,1000, 10);
        this.add.text(540, 175, 'EN İYİ ÇÖZÜM', {
            fontFamily: 'RR',
            fontWeight: 'bold',
            fontSize: '80px',
            color: "#ffffff",
        }).setOrigin(0.5, 0.5);
        this.add.text(540, 1450, 'Cevabınız değerlendiriliyor', {
            fontFamily: 'RR',
            fontWeight: 'bold',
            fontSize: '70px',
            color: "#ffffff",
        }).setOrigin(0.5, 0.5);
        if(cur_number <= cur_word){
            passedNumber = cur_word - 1;

            let questionWord = '';
            for(let i=0; i<mix_word.length; i++){
                questionWord += mix_word[i];
            }
            this.add.text(540, 500, questionWord, {
                fontFamily: 'RR',
                fontWeight: 'bold',
                fontSize: '100px',
                color: "#fa5c00",
            }).setOrigin(0.5, 0.5);
            this.add.text(540, 700, gameData.wordData[passedNumber].matchArray[0], {
                fontFamily: 'RR',
                fontWeight: 'bold',
                fontSize: '120px',
                color: "#1d3d59",
            }).setOrigin(0.5, 0.5);
            this.add.text(540, 800, gameData.wordData[passedNumber].meaning, {
                fontFamily: 'RR',
                fontWeight: 'light',
                fontSize: '40px',
                color: "#1d3d59",
            }).setOrigin(0.5, 0.5);
        } else {
            passedNumber = cur_number - 1;
            let questionNumber = '';
            for(let i=0; i<gameData.numData[passedNumber].array.length; i++)
                questionNumber += gameData.numData[passedNumber].array[i] + ' ';

            this.add.text(540, 350, questionNumber, {
                    fontFamily: 'RR',
                    fontWeight: 'bold',
                    fontSize: '80px',
                    color: "#fa5c00",
                }).setOrigin(0.5, 0.5);

            this.add.text(540, 500, gameData.numData[passedNumber].result, {
                    fontFamily: 'RR',
                    fontWeight: 'bold',
                    fontSize: '100px',
                    color: "#fa5c00",
                }).setOrigin(0.5, 0.5);

            if(numberResults == ''){
                this.add.text(540, 700, 'No Answer', {
                    fontFamily: 'RR',
                    fontWeight: 'bold',
                    fontSize: '100px',
                    color: "#1d3d59",
                }).setOrigin(0.5, 0.5);
            }
            else{
                this.add.text(540, 850, numberResults, {
                    fontFamily: 'RR',
                    fontWeight: 'bold',
                    fontSize: '60px',
                    color: "#1d3d59",
                }).setOrigin(0.5, 0.5);
            }
        }
        this.timer = this.time.addEvent({
            delay: 10000,
            callback: this.updateTimer,
            args: [this],
            loop: false
        });
    }

    update(){
    }

    updateTimer(scene){
        scene.timer.remove();
        scene.time.removeEvent(scene.timer);
        game.scene.stop('AnswerScreen');
        game.scene.start('EndScreen');
    }
}
