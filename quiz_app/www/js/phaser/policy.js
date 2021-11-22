/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 */

class PolicyScreen extends Phaser.Scene{
    constructor(){
        super({key: "PolicyScreen"});
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });;
    }

    create() {
        this.button_audio = this.sound.add('button');
        this.policy = this.rexUI.add.scrollablePanel({
            x: 540,
            y: 800,
            width: 1000,
            height: 1200,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 30, 0xffffff),

            panel: {
                child: this.rexUI.add.fixWidthSizer({
                    space: {
                        left: 10,
                        right: 10,
                        top: 10,
                        bottom: 10,
                        item: 16,
                        line: 16,
                    }
                }),

                mask: {
                    padding: 1
                },
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x106ead),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0xfa5c00),
                input: 'drag',
                position: 0,
            },

            scroller:{
                threshold: 0,
            },

            clamplChildOY : true,

            space: {
                left: 30,
                right: 30,
                top: 30,
                bottom: 30,

                panel: 30,

                header: 10,
            },

            header: this.add.text(0, 0, 'GİZLİLİK SÖZLEŞMESİ', { fixedWidth: 1000, fixedHeight: 100 })
            .setStyle({
                fontSize: '64px',
                fontFamily: 'RR',
                fontWeight: 'bold',
                fill: '#000000',
            })
            .setOrigin(0.5,0.5),
            
            expand: {
                header: true,
            },

            align: {
                header: 'center',
            },
        });
        var sizer = this.policy.getElement('panel');
        sizer.add(this.add.text(0, 0, policy_content, { fixedWidth: 900})
        .setStyle({
            fontSize: '48px',
            fontFamily: 'RR',
            fontWeight: 'bold',
            color: '#000000',
            wordWrap: { width: 900}
        }));
        this.policy.layout();
        this.policy.setSliderEnable(true);
        this.policy.setScrollerEnable(true);

        this.mainPage = this.add.image(540,1500,'MainPage');
        this.mainPage.setInteractive().on('pointerdown', () => {
            if(sound_enable)
                this.button_audio.play();
            game.domContainer.style.display = 'block';
            game.scene.stop('PolicyScreen');
            game.scene.start('HomeScreen');
        });
        game.domContainer.style.display = 'none';
    }
    
    update(){
    }
}
