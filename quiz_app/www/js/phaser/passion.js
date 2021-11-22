/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 */

class PassionScreen extends Phaser.Scene{
    constructor(){
        super({key: "PassionScreen"});
    } 

    preload() {
        // AdMob.isInterstitialReady(function(ready){ if(ready){ isInterstitialReady = ready} });
        // this.load.scenePlugin({
        //     key: 'rexuiplugin',
        //     url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
        //     sceneKey: 'rexUI'
        // });
    }

    create() {
        if(isInterstitialReady)
        {
            // AdMob.showInterstitial();
            // AdMob.prepareInterstitial({
            //     adId: admobid.interstitial,
            //     autoShow:false,
            // });
            isInterstitialReady = false;
        }
        this.firefox = this.add.particles('Spark').setDepth(10);
        this.button_audio = this.sound.add('button');
        this.bonus_audio = this.sound.add('bonus');
        this.passion_board = this.add.image(540,700,'PassionBoard').setScale(1.7);
        this.passion_back = this.add.image(540,740,'PassionBack').setScale(1.7);
        this.passion_flower = this.add.image(538,736,'Passion').setScale(1.6);
        this.lights = [];
        this.lights.push(this.add.image(540,740,'PassionLight1').setScale(1.7));
        this.lights.push(this.add.image(540,740,'PassionLight2').setScale(1.7));
        this.lights.push(this.add.image(540,740,'PassionLight3').setScale(1.7));
        this.lights.push(this.add.image(540,740,'PassionLight4').setScale(1.7));
        this.indicator = this.add.image(540,1110,'Indicator').setScale(1.7);

        this.lights_normal_tween = [];
        this.lights_turn_tween = [];
        for(let i=0; i<4; i++){
            this.lights_normal_tween.push(this.tweens.add({
                targets: this.lights[i],
                alpha: {from: 1, to: 0},
                duration: 500,
                ease: "Linear",
                yoyo: true,
                repeat: -1,
            }));
            this.lights_turn_tween.push(this.tweens.add({
                delay: i*100,
                targets: this.lights[i],
                alpha: {from: 1, to: 0},
                duration: 100,
                ease: "Cubic",
                yoyo: true,
                repeat: -1,
                repeatDelay:400
            }).stop());
        }

        this.turnButton = this.add.image(540,1350,'Turn', 0);
        this.turnButton.setInteractive().on('pointerdown', () => {
            if(sound_enable)
                this.button_audio.play();
            this.turn();
        });

        this.mainPageButton = this.add.image(540,1550,'MainPage');
        this.mainPageButton.setInteractive().on('pointerdown', () => {
            if(sound_enable)
                this.button_audio.play();
            game.scene.stop('PassionScreen');
            game.scene.start('HomeScreen');
        });

        this.turnOptions = {
            // prize names, starting from 12 o'clock going clockwise
            slicePrizes: [10,1,2,50,3,1,25,2,75,3],
            sliceTypes: [1,2,0,1,2,0,1,2,1,0],
         
            // wheel rotation duration, in milliseconds
            rotationTime:10000
        }
    }
    update(){
    }

    turn(){
        this.turnButton.disableInteractive().setAlpha(0.5);
        this.mainPageButton.disableInteractive().setAlpha(0.5);
        for(let i=0; i<4; i++)
        {
            this.lights_normal_tween[i].stop();
            this.lights[i].setAlpha(1);
            this.lights_turn_tween[i].restart();
        }
        var rounds = Phaser.Math.Between(3, 10);
        var degrees = Phaser.Math.Between(0, 360);
        this.panel_turn = this.tweens.add({
            targets: this.passion_flower,
            angle: 360 * rounds + degrees,
            duration: this.turnOptions.rotationTime,
            ease: "Cubic.easeOut",
            callbackScope: this,
            onComplete: function(tween){
                if(sound_enable)
                    this.bonus_audio.play();
                var emitter = this.firefox.createEmitter({
                    x: 540,
                    y: 1000,
                    angle: { min: 255, max: 285 },
                    speed: 500,
                    gravityX: 0,
                    gravityY: 400,
                    lifespan: 2500,
                    quantity: 5,
                    scale: { start: 0.1, end: 1 },
                    blendMode: 'ADD',
                    maxParticles: 100
                });
                let prize_index = Number.parseInt((this.passion_flower.angle+360)/36)%10;
                prize_type = this.turnOptions.sliceTypes[prize_index];
                prize_amount = this.turnOptions.slicePrizes[prize_index];
                if(prize_type == 0){
                    Client.prize(prize_amount,0,0);
                } else if(prize_type == 1){
                    Client.prize(0, prize_amount,0,0);
                } else{
                    Client.prize(0,0,prize_amount);
                }
                // this.turnButton.setInteractive().setAlpha(1.0);
                // this.mainPageButton.setInteractive().setAlpha(1.0);
                AdMob.isInterstitialReady(function(ready){ if(ready){ isInterstitialReady = ready} });
                for(let i=0; i<4; i++)
                {
                    this.lights_turn_tween[i].stop();
                    this.lights[i].setAlpha(1);
                    this.lights_normal_tween[i].restart();            
                }
                this.timer = this.time.addEvent({
                    delay: 4000,
                    callback: this.updateTimer,
                    args: [this],
                    loop: true
                });
            }
        });
    }

    updateTimer(scene){
        game_type = 'passion';
        game_state = 'pass';
        game.scene.stop('PassionScreen');
        game.scene.start('EndScreen');
    }
}
