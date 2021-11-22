/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 */

function cryptName(name){
    return name[0] + '***' +name[name.length-1];
}

class RankScreen extends Phaser.Scene{
    constructor(){
        super({key: "RankScreen"});
    } 

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
        if(rank_list.length > 0){
            if(rank_list[0].avatar != "")
            {
                if(this.textures.exists('user_avatar_0'))
                    this.textures.remove('user_avatar_0');
                this.textures.addBase64('user_avatar_0', rank_list[0].avatar);
            }
        }

        if(rank_list.length > 1){
            if(rank_list[1].avatar != "")
            {
                if(this.textures.exists('user_avatar_1'))
                    this.textures.remove('user_avatar_1');
                this.textures.addBase64('user_avatar_1', rank_list[1].avatar);
            }
        }

        if(rank_list.length > 2){
            if(rank_list[2].avatar != "")
            {
                if(this.textures.exists('user_avatar_2'))
                    this.textures.remove('user_avatar_2');
                this.textures.addBase64('user_avatar_2', rank_list[2].avatar);
            }
        }

    }

    create() {
        this.button_audio = this.sound.add('button');
        this.graphics = this.add.graphics();
        if(rank_list.length > 0){
            this.graphics.fillStyle(0xfa5c00, 1);
            this.graphics.fillRoundedRect(510,140,60,80, 20);
            this.add.text(540, 180, '1', {
                fontFamily: 'RR',
                fontWeight: 'bold',
                fontSize: '45px',
                color: "#ffffff",
                align: "center"
            }).setOrigin(0.5, 0.5);

            this.graphics.fillStyle(0xffffff, 1);
            this.graphics.fillRoundedRect(390,230,300,60, 20);
            this.add.text(540, 260, rank_list[0].point, {
                fontFamily: 'RR',
                fontWeight: 'bold',
                fontSize: '32px',
                color: "#106ead",
                align: "center"
            }).setOrigin(0.5, 0.5);
    
            if(rank_list[0].avatar == ""){
                this.userAvatar_0 = this.add.image(540,420,'UserAvatar').setDisplaySize(250,250);   
            }
            else{
                this.userAvatar_0 = this.add.image(540,420,'user_avatar_0');
                this.userAvatar_0.setDisplaySize(250,250);
                this.userAvatar_0_cover = this.add.image(540,420,'avatar_cover').setDisplaySize(250,250).setDepth(5);
            }
        
            this.graphics.fillStyle(0xfa5c00, 1);
            this.graphics.fillRoundedRect(390,550,300,60, 20);
            this.add.text(540, 580, cryptName(rank_list[0].userName), {
                fontFamily: 'RR',
                fontWeight: 'bold',
                fontSize: '32px',
                color: "#ffffff",
                align: "center",
                fixedWidth: 280
            }).setOrigin(0.5, 0.5);
        }

        if(rank_list.length > 1){
            this.graphics.fillStyle(0xfa5c00, 1);
            this.graphics.fillRoundedRect(315,610,50,60, 20);
            this.add.text(340, 640, '2', {
                fontFamily: 'RR',
                fontWeight: 'bold',
                fontSize: '32px',
                color: "#ffffff",
                align: "center"
            }).setOrigin(0.5, 0.5);

            this.graphics.fillStyle(0xffffff, 1);
            this.graphics.fillRoundedRect(230,675,220,40, 20);
            this.add.text(340, 700, rank_list[1].point, {
                fontFamily: 'RR',
                fontWeight: 'bold',
                fontSize: '28px',
                color: "#106ead",
                align: "center"
            }).setOrigin(0.5, 0.5);
    
            if(rank_list[1].avatar == ""){
                this.userAvatar_0 = this.add.image(340,820,'UserAvatar').setDisplaySize(190,190);   
            }
            else{
                this.userAvatar_0 = this.add.image(340,820,'user_avatar_1');
                this.userAvatar_0.setDisplaySize(190,190);
                this.userAvatar_0_cover = this.add.image(340,820,'avatar_cover').setDisplaySize(190,190).setDepth(5);
            }
        
            this.graphics.fillStyle(0xfa5c00, 1);
            this.graphics.fillRoundedRect(230,920,220,40, 20);
            this.add.text(340, 940, cryptName(rank_list[1].userName), {
                fontFamily: 'RR',
                fontWeight: 'bold',
                fontSize: '28px',
                color: "#ffffff",
                align: "center",
                fixedWidth: 210
            }).setOrigin(0.5, 0.5);
        }

        if(rank_list.length > 2){
            this.graphics.fillStyle(0xfa5c00, 1);
            this.graphics.fillRoundedRect(715,610,50,60, 20);
            this.add.text(740, 640, '3', {
                fontFamily: 'RR',
                fontWeight: 'bold',
                fontSize: '32px',
                color: "#ffffff",
                align: "center"
            }).setOrigin(0.5, 0.5);

            this.graphics.fillStyle(0xffffff, 1);
            this.graphics.fillRoundedRect(630,675,220,40, 20);
            this.add.text(740, 700, rank_list[2].point, {
                fontFamily: 'RR',
                fontWeight: 'bold',
                fontSize: '28px',
                color: "#106ead",
                align: "center"
            }).setOrigin(0.5, 0.5);
    
            if(rank_list[2].avatar == ""){
                this.userAvatar_0 = this.add.image(740,820,'UserAvatar').setDisplaySize(190,190);   
            }
            else{
                this.userAvatar_0 = this.add.image(740,820,'user_avatar_2');
                this.userAvatar_0.setDisplaySize(190,190);
                this.userAvatar_0_cover = this.add.image(740,820,'avatar_cover').setDisplaySize(190,190).setDepth(5);
            }
        
            this.graphics.fillStyle(0xfa5c00, 1);
            this.graphics.fillRoundedRect(630,920,220,40, 20);
            this.add.text(740, 940, cryptName(rank_list[2].userName), {
                fontFamily: 'RR',
                fontWeight: 'bold',
                fontSize: '28px',
                color: "#ffffff",
                align: "center",
                fixedWidth: 210
            }).setOrigin(0.5, 0.5);
        }

        this.graphics.fillStyle(0xffffff, 1);
        this.graphics.fillRoundedRect(220,995,640,275, 20);
        this.add.text(540, 1045, "SİZ", {
            fontFamily: 'RR',
            fontWeight: 'bold',
            fontSize: '80px',
            color: "#106ead",
            align: "center"
        }).setOrigin(0.5, 0.5);

        this.add.text(390, 1105, "Sıralama", {
            fontFamily: 'RR',
            fontWeight: 'bold',
            fontSize: '36px',
            color: "#fa5c00",
            align: "center"
        }).setOrigin(0.5, 0.5);

        this.add.text(690, 1105, "Puan", {
            fontFamily: 'RR',
            fontWeight: 'bold',
            fontSize: '36px',
            color: "#fa5c00",
            align: "center"
        }).setOrigin(0.5, 0.5);

        this.graphics.fillStyle(0xfa5c00, 1);
        this.graphics.fillRoundedRect(270,1130,240,110, 20);
        this.add.text(390, 1185, userData.rank, {
            fontFamily: 'RR',
            fontWeight: 'bold',
            fontSize: '48px',
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5, 0.5);

        this.graphics.fillStyle(0xfa5c00, 1);
        this.graphics.fillRoundedRect(570,1130,240,110, 20);
        this.add.text(690, 1185, userData.point, {
            fontFamily: 'RR',
            fontWeight: 'bold',
            fontSize: '48px',
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5, 0.5);

        this.mainpageButton = this.add.image(540,1550,'MainPage');
        this.mainpageButton.setInteractive().on('pointerdown', () => {
            if(sound_enable)
                this.button_audio.play();
            game.scene.stop('RankScreen');
            game.scene.start('HomeScreen');
        });
    }
    update(){
    }
}
