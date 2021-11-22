/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 */

class BattleScreen extends Phaser.Scene{
    constructor(){
        super({key: "BattleScreen"});
    } 

    preload() {
        /*
        AdMob.isInterstitialReady(function(ready){ if(ready){ isInterstitialReady = ready} });
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
        */
        this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
    }

    create() {
        if(isInterstitialReady)
        {
            AdMob.showInterstitial();
            AdMob.prepareInterstitial({
                adId: admobid.interstitial,
                autoShow:false,
            });
            isInterstitialReady = false;
        }
        this.button_audio = this.sound.add('button');
        this.userNameImage = this.add.image(540,560,'InputBack');
        this.userName = this.add.rexInputText(540, 560, 620, 70, 
            {
                text:'',
                type:'text',
                fontSize: '64px',
                fontFamily: 'RR',
                color: '#106eac',
            })
        .setOrigin(0.5,0.5);

        this.userNameText = this.add.text(210, 490, 'Arkadaşınızın kullanıcı adını yazın', { fixedWidth: 800, fixedHeight: 50 })
        .setStyle({
            fontSize: '40px',
            fontFamily: 'RR',
            fontWeight: 'bold',
            color: '#ffffff',
        })
        .setOrigin(0,0.5);

        this.inviteButton = this.add.image(540,700,'Invite');
        this.inviteButton.setInteractive().on('pointerdown', () => {
            if(sound_enable)
                this.button_audio.play();
            if(this.userName.text == ''){
                toast_error(this, 'Lütfen bir kullanıcı\nadı yazınız');
                return;
            }
            Client.invite_request(this.userName.text);
        });

        this.userNameText = this.add.text(540, 900, 'ya da', { fixedWidth: 800, fixedHeight: 70 })
        .setStyle({
            fontSize: '64px',
            fontFamily: 'RR',
            fontWeight: 'bold',
            color: '#ffffff',
            align: 'center',
        })
        .setOrigin(0.5,0.5);

        this.randomButton = this.add.image(540,1100,'Random');
        this.randomButton.setInteractive().on('pointerdown', () => {
            if(sound_enable)
                this.button_audio.play();
            Client.random_request();
        });

        this.mainPageButton = this.add.image(540,1550,'MainPage');
        this.mainPageButton.setInteractive().on('pointerdown', () => {
            if(sound_enable)
                this.button_audio.play();
            game.scene.stop('BattleScreen');
            game.scene.start('HomeScreen');
        });

    }
    update(){
    }

}
