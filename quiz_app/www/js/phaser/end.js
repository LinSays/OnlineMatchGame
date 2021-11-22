/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 */

class EndScreen extends Phaser.Scene{
    constructor(){
        super({key: "EndScreen"});
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });

        if((gameData.wordData != undefined && cur_word == gameData.wordData.length) || game_type == "passion" || game_state == "remain_alone")
            this.bEnd = true;
        else
            this.bEnd = false;

        if(this.bEnd && game_type == "battle"){
            cur_point = 100;
        } else if(this.bEnd && game_type == "tournament"){
            cur_point = 1000;
        }
    }

    create() {
        // AdMob.prepareRewardVideoAd({
        //     adId: admobid.rewarded,
        //     autoShow:false,
        //     user_id: userData.userName,
        // });
        this.button_audio = this.sound.add('button');
        if(game_state == "failed"){
            this.lose = this.add.image(540,480,'Lose');
            this.main_page = this.add.image(540,1140,'MainPage');
            this.main_page.setInteractive().on('pointerdown', () => {
                if(sound_enable)
                    this.button_audio.play();
                game.scene.stop('EndScreen');
                game.scene.start('HomeScreen');
            });
    
            if(game_type == "stage")
            {
                this.play_again = this.add.image(540,1320,'PlayAgain');
                this.play_again.setInteractive().on('pointerdown', () => {
                    if(sound_enable)
                        this.button_audio.play();
                    Client.stage_start();
                });
            }
            if(game_type == "daily")
            {
                this.play_again = this.add.image(540,1320,'PlayAgain');
                this.play_again.setInteractive().on('pointerdown', () => {
                    if(sound_enable)
                        this.button_audio.play();
                    Client.daily_start();
                });
            }

            if(game_type == "stage")
            {
                this.lostText = this.add.text(540, 850, 'Etabı\ngeçemediniz', { fixedWidth: 700, fixedHeight: 200, align:'center' })
                .setStyle({
                    fontSize: '80px',
                    fontFamily: 'RR',
                    fontWeight: 'bold',
                    color: '#ffffff',
                })
                .setOrigin(0.5,0.5);
            }
            else{ 
                this.lostText = this.add.text(540, 850, 'Bölümü\ngeçemediniz', { fixedWidth: 700, align:'center' })
                .setStyle({
                    fontSize: '80px',
                    fontFamily: 'RR',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    align: 'center'
                })
                .setOrigin(0.5,0.5);
            }
        } else if(game_state == "pass" || game_state == "remain_alone"){
            if(!this.bEnd){
                if(game_type == "stage" || game_type == "daily")
                {
                    this.win = this.add.image(540,480,'Win');
                    if(game_type == "stage"){
                        this.earnedPointText = this.add.text(410, 850, 'Kazandığınız\npuan', { fixedHeight: 120, align:'center' })
                        .setStyle({
                            fontSize: '48px',
                            fontFamily: 'RR',
                            fontWeight: 'bold',
                            color: '#ffffff',
                        })
                        .setOrigin(0.5,0.5);
                        this.pointBack = this.add.image(640,840,'Orange');
                        this.pointText = this.add.text(640,840, cur_point, { fixedWidth: 160, fixedHeight: 60, align:'center' })
                        .setStyle({
                            fontSize: '60px',
                            fontFamily: 'RR',
                            fontWeight: 'bold',
                            color: '#ffffff',
                        })
                        .setOrigin(0.5,0.5);
                    } else {
                        this.earnedPointText = this.add.text(410, 850, 'Kazandığınız\nJeton', { fixedHeight: 120, align:'center' })
                        .setStyle({
                            fontSize: '48px',
                            fontFamily: 'RR',
                            fontWeight: 'bold',
                            color: '#ffffff',
                        })
                        .setOrigin(0.5,0.5);
                        this.pointBack = this.add.image(640,840,'Orange');
                        this.pointText = this.add.text(640,840, cur_point>=10 ? 1:0, { fixedWidth: 160, fixedHeight: 60, align:'center' })
                        .setStyle({
                            fontSize: '60px',
                            fontFamily: 'RR',
                            fontWeight: 'bold',
                            color: '#ffffff',
                        })
                        .setOrigin(0.5,0.5);
                    }
                }
                else if(game_type == "battle")
                {
                    this.user1name = this.add.text(540, 400, winner_name_list[0], { fixedWidth: 700, fixedHeight: 100, align:'center' })
                    .setStyle({
                        fontSize: '80px',
                        fontFamily: 'RR',
                        fontWeight: 'bold',
                        color: '#ffffff',
                    })
                    .setOrigin(0.5,0.5);
                    this.point1Back = this.add.image(540,520,'Orange');
                    this.point1Text = this.add.text(540,520, winner_point_list[0], { fixedWidth: 160, fixedHeight: 60, align:'center' })
                    .setStyle({
                        fontSize: '60px',
                        fontFamily: 'RR',
                        fontWeight: 'bold',
                        color: '#ffffff',
                    })
                    .setOrigin(0.5,0.5);
                    this.user2name = this.add.text(540, 700, winner_name_list[1], { fixedWidth: 700, fixedHeight: 100, align:'center' })
                    .setStyle({
                        fontSize: '80px',
                        fontFamily: 'RR',
                        fontWeight: 'bold',
                        color: '#ffffff',
                    })
                    .setOrigin(0.5,0.5);
                    this.point2Back = this.add.image(540,820,'Orange');
                    this.point2Text = this.add.text(540,820, winner_point_list[1], { fixedWidth: 160, fixedHeight: 60, align:'center' })
                    .setStyle({
                        fontSize: '60px',
                        fontFamily: 'RR',
                        fontWeight: 'bold',
                        color: '#ffffff',
                    })
                    .setOrigin(0.5,0.5);
                }
    
                this.graphics = this.add.graphics();
                // this.graphics.lineStyle(4, '#ffffff', 1);
                this.graphics.fillStyle(0xffffff, 1);
                this.graphics.fillRoundedRect(100,1050,880,490, 10);
                this.gameStartText = this.add.text(540,1130, 'Sonraki bölüm geliyor', { fixedWidth: 780, align:'center' })
                .setStyle({
                    fontSize: '60px',
                    fontFamily: 'RR',
                    fontWeight: 'bold',
                    color: '#106ead',
                })
                .setOrigin(0.5,0.5);
                this.graphics.fillStyle(0xfa5c00, 1);
                this.graphics.fillRoundedRect(410,1200,260,260, 10);
                this.timeText = this.add.text(540,1330, '5', { fixedWidth: 170, fixedHeight: 170, align:'center' })
                .setStyle({
                    fontSize: '160px',
                    fontFamily: 'RR',
                    fontWeight: 'bold',
                    color: '#ffffff',
                })
                .setOrigin(0.5,0.5);
    
                this.timer = this.time.addEvent({
                    delay: 1000,
                    callback: this.updateTimer,
                    args: [this],
                    loop: true
                });
            } else {
                if(game_type == "stage" || game_type == "daily" || game_type == "passion")
                {
                    let showText = "";
                    if(game_type == "stage")
                        showText = 'Etabı bitirdiniz';
                    else if(game_type == "daily")
                        showText = 'Tebrikler oyunu bitirdiniz';
                    else if(game_type == "passion")
                        showText = 'Kazandığınız Ödül';
                    this.win = this.add.image(540,400,'Win');
                    this.gameFinishText = this.add.text(540,800, showText, { fixedWidth: 700, fixedHeight: 100, align:'center' })
                    .setStyle({
                        fontSize: '50px',
                        fontFamily: 'RR',
                        fontWeight: 'bold',
                        color: '#ffffff',
                    })
                    .setOrigin(0.5,0.5);
                }
                else if( game_type == "battle" || game_type == "tournament"){
                    if(game_state != 'remain_alone'){
                        let bWin = winner_name_list[0] == userData.userName;
                        if(!bWin)
                        {
                            if(game_type == "battle")
                                cur_point = 50;
                            else
                                cur_point = 100;
                        }
                        this.gameFinishText = this.add.text(540,game_type == "battle" ? 700 : 930, bWin ? 'KAZANDIN!' : 'KAYBETTİN!', { fixedWidth: 700, fixedHeight: 120, align:'center' })
                        .setStyle({
                            fontSize: '120px',
                            fontFamily: 'RR',
                            fontWeight: 'bold',
                            color: '#ffffff',
                        })
                        .setOrigin(0.5,0.5);
                        if( game_type == "battle"){
                            this.yourPointText = this.add.text(370,280, 'SEN', { fixedWidth: 700, fixedHeight: 120, align:'center' })
                            .setStyle({
                                fontSize: '100px',
                                fontFamily: 'RR',
                                fontWeight: 'bold',
                                color: '#ffffff',
                            })
                            .setOrigin(0.5,0.5);
                            this.yourPointBack = this.add.image(370,400,'Orange');
                            this.yourPointText = this.add.text(370,400, bWin? winner_point_list[0] : winner_point_list[1], { fixedWidth: 160, fixedHeight: 100, align:'center' })
                            .setStyle({
                                fontSize: '80px',
                                fontFamily: 'RR',
                                fontWeight: 'bold',
                                color: '#ffffff',
                            })
                            .setOrigin(0.5,0.5);
                            this.oppoPointText = this.add.text(710,280, 'RAKİP', { fixedWidth: 700, fixedHeight: 120, align:'center' })
                            .setStyle({
                                fontSize: '100px',
                                fontFamily: 'RR',
                                fontWeight: 'bold',
                                color: '#ffffff',
                            })
                            .setOrigin(0.5,0.5);
                            this.oppoPointBack = this.add.image(710,400,'Orange');
                            this.oppoPointText = this.add.text(710,400, bWin? winner_point_list[1] : winner_point_list[0], { fixedWidth: 160, fixedHeight: 100, align:'center' })
                            .setStyle({
                                fontSize: '80px',
                                fontFamily: 'RR',
                                fontWeight: 'bold',
                                color: '#ffffff',
                            })
                            .setOrigin(0.5,0.5);
                        }
                    } else {
                        this.gameFinishText = this.add.text(540, 500, game_type == 'battle' ? 'Rakibiniz oyundan\nçıktı ve siz\nkazandınız.' : 'Turnuvadaki tüm\nrakipleriniz oyundan\nçıktı ve siz kazandınız.', { fixedWidth: 700, fixedHeight: 300, align:'center' })
                        .setStyle({
                            fontSize: '64px',
                            fontFamily: 'RR',
                            fontWeight: 'bold',
                            color: '#ffffff',
                        })
                        .setOrigin(0.5,0.5);
                    }
                }
                
                let getText = 'AL ×2';
                this.prizeText = cur_point;
                this.adsPos = 1015;
                this.multiplier = 2;
                if( game_type == 'stage' ){
                    getText = 'AL ×3';
                    this.multiplier = 3;
                }
                else if( game_type == 'daily'){
                    getText = 'AL ×2';
                    this.multiplier = 2;
                }
                else if( game_type == 'battle'){
                    if(game_state == 'remain_alone' || winner_name_list[0] == userData.userName)
                    {
                        getText = 'AL ×2';
                        this.multiplier = 2;
                    }
                    else
                    {
                        getText = 'GERİ\nAL';
                        this.multiplier = 1;
                    }
                } else if (game_type == "tournament"){
                    this.adsPos = 1080;
                    if(game_state == 'remain_alone' || winner_name_list[0] == userData.userName){
                        getText = 'AL ×3';
                        this.multiplier = 3;
                    }
                    else
                    {
                        getText = 'GERİ\nAL';
                        this.multiplier = 1;
                    }
                } else if (game_type == "passion") {
                    this.prizeText = prize_amount;
                    this.multiplier = 2;
                }

                if((game_type != "daily" && game_type != "passion") || (game_type == "passion" && prize_type==1)){
                    this.pointAds = this.add.image(540,this.adsPos,'PointAds');
                    this.pointAds.setInteractive().on('pointerdown', () => {
                        if(sound_enable)
                            this.button_audio.play();
                        if(isRewardReady){
                            prize_amount *= this.multiplier;
                            // AdMob.showRewardVideoAd();
                            isRewardReady = false;
                            // AdMob.prepareRewardVideoAd({
                            //     adId: admobid.rewarded,
                            //     autoShow:false,
                            //     user_id: userData.userName,
                            // });
                        } else {
                            // AdMob.prepareRewardVideoAd({
                            //     adId: admobid.rewarded,
                            //     autoShow:false,
                            //     user_id: userData.userName,
                            // });
                            toast_error(this, 'Video hazır değil');
                        }

                    });
            
                    this.pointText = this.add.text(400,this.adsPos, this.prizeText, { fixedWidth: 160, fixedHeight: 60, align:'center' })
                    .setStyle({
                        fontSize: '60px',
                        fontFamily: 'RR',
                        fontWeight: 'bold',
                        color: '#ffffff',
                    })
                    .setOrigin(0.5,0.5);
    
                    this.getPointText = this.add.text(800,this.adsPos, getText)
                    .setStyle({
                        fontSize: '45px',
                        fontFamily: 'RR',
                        fontWeight: 'bold',
                        color: '#fa5c00',
                        align: 'center'
                    })
                    .setOrigin(0.5,0.5);
                }
    

                if(game_type == "daily" || (game_type == "passion" && prize_type==2))
                {
                    this.coinAds = this.add.image(540,this.adsPos,'CoinAds');
                    this.coinAds.setInteractive().on('pointerdown', () => {
                        if(sound_enable)
                            this.button_audio.play();
                        if(isRewardReady){
                            prize_amount *= this.multiplier;
                            // AdMob.showRewardVideoAd();
                            // isRewardReady = false;
                            // AdMob.prepareRewardVideoAd({
                            //     adId: admobid.rewarded,
                            //     autoShow:false,
                            //     user_id: userData.userName,
                            // });
                        } else {
                            // AdMob.prepareRewardVideoAd({
                            //     adId: admobid.rewarded,
                            //     autoShow:false,
                            //     user_id: userData.userName,
                            // });
                            toast_error(this, 'Video hazır değil');
                        }
                    });
        
                    this.coinText = this.add.text(400,this.adsPos, this.prizeText, { fixedWidth: 160, fixedHeight: 60, align:'center' })
                    .setStyle({
                        fontSize: '60px',
                        fontFamily: 'RR',
                        fontWeight: 'bold',
                        color: '#ffffff',
                    })
                    .setOrigin(0.5,0.5);
                    this.getCoinText = this.add.text(800,this.adsPos, getText)
                    .setStyle({
                        fontSize: '45px',
                        fontFamily: 'RR',
                        fontWeight: 'bold',
                        color: '#fa5c00',
                        align: 'center'
                    })
                    .setOrigin(0.5,0.5);
                }

                if(game_type == "passion" && prize_type==0)
                {
                    this.heartAds = this.add.image(540,this.adsPos,'HeartAds');
                    this.heartAds.setInteractive().on('pointerdown', () => {
                        if(sound_enable)
                            this.button_audio.play();
                        if(isRewardReady){
                            prize_amount *= this.multiplier;
                            // AdMob.showRewardVideoAd();
                            // isRewardReady = false;
                            // AdMob.prepareRewardVideoAd({
                            //     adId: admobid.rewarded,
                            //     autoShow:false,
                            //     user_id: userData.userName,
                            // });
                        } else {
                            // AdMob.prepareRewardVideoAd({
                            //     adId: admobid.rewarded,
                            //     autoShow:false,
                            //     user_id: userData.userName,
                            // });
                            toast_error(this, 'Video hazır değil');
                        }
                    });
        
                    this.heartText = this.add.text(400,this.adsPos, this.prizeText, { fixedWidth: 160, fixedHeight: 60, align:'center' })
                    .setStyle({
                        fontSize: '60px',
                        fontFamily: 'RR',
                        fontWeight: 'bold',
                        color: '#ffffff',
                    })
                    .setOrigin(0.5,0.5);
                    this.getHeartText = this.add.text(800,this.adsPos, getText)
                    .setStyle({
                        fontSize: '45px',
                        fontFamily: 'RR',
                        fontWeight: 'bold',
                        color: '#fa5c00',
                        align: 'center'
                    })
                    .setOrigin(0.5,0.5);
                }

                this.main_page = this.add.image(540,1310,'MainPage');
                this.main_page.setInteractive().on('pointerdown', () => {
                    if(sound_enable)
                        this.button_audio.play();
                    game.scene.stop('EndScreen');
                    game.scene.start('HomeScreen');
                });
        
                if(game_type == "stage")
                {
                    this.next_stage = this.add.image(540,1495,'NextStage');
                    this.next_stage.setInteractive().on('pointerdown', () => {
                        if(sound_enable)
                            this.button_audio.play();
                        Client.stage_start();
                    });
                }

                if(game_type == "daily")
                {
                    this.next_stage = this.add.image(540,1495,'PlayAgain');
                    this.next_stage.setInteractive().on('pointerdown', () => {
                        if(sound_enable)
                            this.button_audio.play();
                        Client.daily_start();
                    });
                }

            }
        }

        if(game_type == "tournament" && game_state != 'remain_alone'){
            this.fieldUsernameText = this.add.text(190, 280, 'Kullanıcı Adı', {
                fontFamily: 'RR',
                fontWeight: 'bold',
                fontSize: '80px',
                color: "#ffffff",
            }).setOrigin(0, 0.5);
            this.fieldPointText = this.add.text(890, 280, 'Puan', {
                fontFamily: 'RR',
                fontWeight: 'bold',
                fontSize: '80px',
                color: "#ffffff",
            }).setOrigin(1, 0.5);
            let bInRank = false;
            for(var i=0; i<winner_name_list.length; i++){
                let bEqual = false;
                if(winner_name_list[i] == userData.userName)
                {
                    bEqual = true;
                }
                this.graphics = this.add.graphics();
                this.graphics.fillStyle(bEqual ? 0xfa5c00 : 0xffffff, 1);
                this.graphics.fillRoundedRect(180,334 + 132*i,760,128, 10);
                this.rankNameText = this.add.text(190, 400 + 132*i, winner_name_list[i], {
                    fontFamily: 'RR',
                    fontWeight: 'bold',
                    fontSize: '80px',
                    color: bEqual ? "#ffffff" : "#106ead",
                }).setOrigin(0, 0.5);
                this.rankPointText = this.add.text(890, 400 + 132*i, winner_point_list[i], {
                    fontFamily: 'RR',
                    fontWeight: 'bold',
                    fontSize: '80px',
                    color: bEqual ? "#ffffff" : "#106ead",
                }).setOrigin(1, 0.5);
                if(bEqual)
                    bInRank = true;
            }
            if(!bInRank){
                this.graphics = this.add.graphics();
                this.graphics.fillStyle(0xfa5c00, 1);
                this.graphics.fillRoundedRect(180,334 + 132*i,760,128, 10);
                this.rankNameText = this.add.text(190, 400 + 132*i, userData.userName, {
                    fontFamily: 'RR',
                    fontWeight: 'bold',
                    fontSize: '80px',
                    color: "#106ead",
                }).setOrigin(0, 0.5);
                this.rankPointText = this.add.text(890, 400 + 132*i, cur_point, {
                    fontFamily: 'RR',
                    fontWeight: 'bold',
                    fontSize: '80px',
                    color: "#106ead",
                }).setOrigin(1, 0.5);
            }
        }
    }
    update(){
    }

    updateTimer(scene){
        let current_time = Number.parseInt(scene.timeText.text) - 1;
        if(current_time < 0)
        {
            if(game_state == "pass")
            {
                scene.timer.remove();
                scene.time.removeEvent(scene.timer);
                game.scene.stop('EndScreen');
                if(cur_number == cur_word)
                    game.scene.start('NumberGameScreen');
                else
                    game.scene.start('WordGameScreen');
            }
        }
        else{
            scene.timeText.setText(current_time);
        }
    }

    updateResult(){
    }

    processEndReward(){
        if((game_type != "daily" && game_type != "passion") || (game_type == "passion" && prize_type==1)){
            this.pointAds.destroy();
            this.pointText.destroy();
            this.getPointText.destroy();
            Client.prize(0, this.prizeText * this.multiplier, 0);
            this.addedText = this.add.text(540,this.adsPos, (this.prizeText* this.multiplier) + ' puan kazandınız', { fixedWidth: 1000, fixedHeight: 100, align:'center' })
            .setStyle({
                fontSize: '80px',
                fontFamily: 'RR',
                fontWeight: 'bold',
                color: '#ffffff',
            })
            .setOrigin(0.5,0.5);
        }
        if(game_type == "daily" || (game_type == "passion" && prize_type==2))
        {
            this.coinAds.destroy();
            this.coinText.destroy();
            this.getCoinText.destroy();
            Client.prize(0, 0, this.prizeText * this.multiplier);
            this.addedText = this.add.text(540,this.adsPos, (this.prizeText* this.multiplier) + ' jeton kazandınız', { fixedWidth: 1000, fixedHeight: 100, align:'center' })
            .setStyle({
                fontSize: '80px',
                fontFamily: 'RR',
                fontWeight: 'bold',
                color: '#ffffff',
            })
            .setOrigin(0.5,0.5);
        }
        if(game_type == "passion" && prize_type==0)
        {
            this.heartAds.destroy();
            this.heartText.destroy();
            this.getHeartText.destroy();
            Client.prize(this.prizeText * this.multiplier, 0, 0);
            this.addedText = this.add.text(540,this.adsPos, (this.prizeText* this.multiplier) + ' can kazandınız', { fixedWidth: 1000, fixedHeight: 100, align:'center' })
            .setStyle({
                fontSize: '80px',
                fontFamily: 'RR',
                fontWeight: 'bold',
                color: '#ffffff',
            })
            .setOrigin(0.5,0.5);
        }
    }
}
