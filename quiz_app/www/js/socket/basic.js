/**
 * Created by Jerome on 03-03-17.
 */

var Client = {};
/*
Client.socket = io("https://www.1word1action.com/", {
    withCredentials: true,
    extraHeaders: {
      "1word1action-header": "secure"
    }
  });
*/
Client.socket = io("http://192.168.114.12:8081/", {
    withCredentials: true,
    extraHeaders: {
      "1word1action-header": "secure"
    }
  });
// Client.socket = io("http://localhost:8081/");
// Client.socket = io("http://quizpuzzle.chileracing.net/");

Client.login = function(username, password){
    Client.socket.emit('login', {username: username, password: password});
};

Client.prize = function(heart, point, coin){
    Client.socket.emit('prize', {username: userData.userName, heart:heart, point: point, coin: coin});
};

Client.google = function(google_info){
    Client.socket.emit('google', {google_info: google_info});
};

Client.forgot = function(username){
    Client.socket.emit('forgot', {username: username});
};

Client.logout = function(){
    Client.socket.emit('logout', {});
};

Client.register = function(username, email, password, avatar){
    Client.socket.emit('register', {username: username, email: email, password: password, avatar: avatar});
};

Client.user_update = function(username, email, password, avatar){
    Client.socket.emit('user_update', {prevname: userData.userName, username: username, email: email, password: password, avatar: avatar});
};

Client.rank_list = function(){
    Client.socket.emit('rank_list', {});
};

Client.rule_content = function(){
    Client.socket.emit('rule_content', {});
};

Client.method_content = function(){
    Client.socket.emit('method_content', {});
};

Client.policy_content = function(){
    Client.socket.emit('policy_content', {});
};


////////////////////////////////////////////////////////////////////////////

Client.socket.on('connect',function(){
    let activeScene = game.scene.getScenes(true)[0];
    if(activeScene != undefined && activeScene.scene.key == 'LoginScreen'){
        if(window.localStorage.getItem('UserName') != null){
            Client.login(window.localStorage.getItem('UserName'), window.localStorage.getItem('Password'))
        }
    }
});

Client.socket.on('disconnect',function(){
    let activeScene = game.scene.getScenes(true)[0];
    game.scene.stop(activeScene.scene.key);
    game.scene.start('HomeScreen');
    // toast_error(game.scene.getScene('LoginScreen'), 'Connection lost');
});

Client.socket.on('kicked',function(){
    let activeScene = game.scene.getScenes(true)[0];
    game.scene.stop(activeScene.scene.key);
    game.scene.start('HomeScreen');
    toast_error(game.scene.getScene('HomeScreen'), 'Oyundan çıkarıldınız');
});

Client.socket.on('login',function(data){
    if(data.result)
    {
        userData = data.result;
        window.localStorage.setItem("UserName", userData.userName);
        window.localStorage.setItem("Password", userData.password);
        game.scene.stop('LoginScreen');
        game.scene.start('HomeScreen');
    }
    else
    {
        toast_error(game.scene.getScene('LoginScreen'), 'Giriş yapıalamadı,\nyeniden deneyin');
    }
});

Client.socket.on('register',function(data){
    if(data.result)
    {
        game.scene.stop('RegisterScreen');
        game.scene.start('LoginScreen');
        toast_error(game.scene.getScene('LoginScreen'), 'Üyelik kaydınız oluşturuldu,\nlütfen giriş yapın');
    }
    else
    {
        toast_error(game.scene.getScene('RegisterScreen'), 'Üyelik oluşturulamadı, lütfen\nbilgilerinizi değiştirin');
    }
});

Client.socket.on('user_update',function(data){
    if(data.result)
    {
        game.scene.stop('ProfileScreen');
        game.scene.start('HomeScreen');
        toast_error(game.scene.getScene('HomeScreen'), 'Bilgileriniz güncellendi');
    }
    else
    {
        toast_error(game.scene.getScene('ProfileScreen'), 'Güncelleme yapılamadı,\ngirdiğiniz kullanıcı\nadı sistemde kayıtlı');
    }
});

Client.socket.on('forgot',function(data){
    let activeScene = game.scene.getScenes(true)[0];
    if(data.result)
    {
        toast_error(activeScene, 'Yeni şifreniz e-mail\nadresinize gönderildi');
    }
    else
    {
        toast_error(activeScene, 'Sistemde kayıtlı böyle bir\nkullanıcı görünmüyor');
    }
});

Client.socket.on('rank_list',function(data){
    let activeScene = game.scene.getScenes(true)[0];
    if(data.result)
    {
        rank_list = data.result;
        game.scene.stop(activeScene.scene.key);
        game.scene.start('RankScreen');
    }
    else
    {
        toast_error(activeScene, 'Sayfa yüklenemedi, daha\nsonra tekrar deneyin');
    }
});

Client.socket.on('rule_content',function(data){
    let activeScene = game.scene.getScenes(true)[0];
    if(data.result)
    {
        rule_content = data.result;
        game.scene.stop(activeScene.scene.key);
        game.scene.start('RuleScreen');
    }
    else
    {
        toast_error(activeScene, 'Sayfa yüklenemedi, daha\nsonra tekrar deneyin');
    }
});

Client.socket.on('policy_content',function(data){
    let activeScene = game.scene.getScenes(true)[0];
    if(data.result)
    {
        policy_content = data.result;
        game.scene.stop(activeScene.scene.key);
        game.scene.start('PolicyScreen');
    }
    else
    {
        toast_error(activeScene, 'Sayfa yüklenemedi, daha\nsonra tekrar deneyin');
    }
});

Client.socket.on('method_content',function(data){
    let activeScene = game.scene.getScenes(true)[0];
    if(data.result)
    {
        method_content = data.result;
        game.scene.stop(activeScene.scene.key);
        game.scene.start('MethodScreen');
    }
    else
    {
        toast_error(activeScene, 'Sayfa yüklenemedi, daha\nsonra tekrar deneyin');
    }
});

Client.socket.on('update_userdata',function(data){
    userData = data.result;
    if(game.scene.isActive('HomeScreen'))
        game.scene.getScene('HomeScreen').update_userData();
});

Client.socket.on('reward',function(data){
    if(prize_type == 0){
        Client.prize(prize_amount, 0, 0);
    }
    else if(prize_type == 1){
        Client.prize(0, prize_amount, 0);
    }
    else if(prize_type == 2){
        Client.prize(0, 0, prize_amount);
    }
});

Client.socket.on('rewarded',function(data){
    let activeScene = game.scene.getScenes(true)[0];
    if(data.heart != 0)
    {
        toast_error(activeScene, data.heart + ' can kazandınız');
    }
    else if(data.point != 0)
    {
        toast_error(activeScene, data.point + ' puan kazandınız');
    }
    else if(data.coin != 0)
    {
        toast_error(activeScene, data.coin + ' jeton kazandınız');
    }
});

var createLabel = function (scene, text) {
    return scene.rexUI.add.label({
        width: 280,
        height: 140,

        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0xfa5c00),

        text: scene.add.text(0, 0, text, {
            fontFamily: 'RR',
            fontWeight: 'bold',
            fontSize: '90px',
            color: "#ffffff",
            align: "center"
        }),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        },

        align: "center"
    });
}

function invite_modal(scene){
    var cover = scene.add.rectangle(-1000,-1000,2080,2680,0x000000, 0.2).setOrigin(0,0).setDepth(1).setInteractive();
    var dialog = scene.rexUI.add.dialog({
        x: 540,
        y: 800,

        background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0xffffff),
        content: scene.add.text(0, 0, invite_name + '\nile düello oynamak\nister misiniz?', {
            fontFamily: 'RR',
            fontWeight: 'bold',
            fontSize: '64px',
            color: "#106eac",
            align: "center"
        }),

        actions: [
            createLabel(scene, 'EVET'),
            createLabel(scene, 'HAYIR')
        ],

        space: {
            content: 25,
            action: 15,

            left: 60,
            right: 60,
            top: 40,
            bottom: 40,
        },

        align: {
            actions: 'center', // 'center'|'left'|'right'
        },

        expand: {
            content: false, // Content is a pure text object
        }
    }).setDepth(100)
        .layout()
        // .drawBounds(scene.add.graphics(), 0xff0000)
        .popUp(1000);

    dialog
        .on('button.click', function (button, groupName, index) {
            if(index == 0)
            {
                Client.invite_accept();
            }
            else
            {
                Client.invite_reject();
            }
            cover.destroy();
            dialog.destroy();
        })
        .on('button.over', function (button, groupName, index) {
            // button.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('button.out', function (button, groupName, index) {
            // button.getElement('background').setStrokeStyle();
        });
}

function reject_modal(scene){
    var cover = scene.add.rectangle(-1000,-1000,2080,2680,0x000000, 0.2).setOrigin(0,0).setDepth(1).setInteractive();
    var dialog = scene.rexUI.add.dialog({
        x: 540,
        y: 800,

        background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0xffffff),
        content: scene.add.text(0, 0, 'ARKADAŞINIZ SİZİNLE\nOYNAMAYI KABUL ETMEDİ', {
            fontFamily: 'RR',
            fontWeight: 'bold',
            fontSize: '64px',
            color: "#106eac",
            align: "center"
        }),

        actions: [
            createLabel(scene, 'TAMAM'),
        ],

        space: {
            content: 25,
            action: 15,

            left: 60,
            right: 60,
            top: 40,
            bottom: 40,
        },

        align: {
            actions: 'center', // 'center'|'left'|'right'
        },

        expand: {
            content: false, // Content is a pure text object
        }
    }).setDepth(100)
        .layout()
        // .drawBounds(scene.add.graphics(), 0xff0000)
        .popUp(1000);

    dialog
        .on('button.click', function (button, groupName, index) {
            cover.destroy();
            dialog.destroy();
            game.scene.stop(scene.scene.key);
            game.scene.start('BattleScreen');
        })
        .on('button.over', function (button, groupName, index) {
            // button.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('button.out', function (button, groupName, index) {
            // button.getElement('background').setStrokeStyle();
        });
}

function passion_modal(scene){
    var cover = scene.add.rectangle(-1000,-1000,2080,2680,0x000000, 0.2).setOrigin(0,0).setDepth(1).setInteractive();
    var dialog = scene.rexUI.add.dialog({
        x: 540,
        y: 800,

        background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0xffffff),
        content: scene.add.text(0, 0, 'MAALESEF YETERLİ\nCANINIZ/JETONUNUZ YOK.\nKAZANMAK İÇİN "ŞANSINI DENE"\nBÖLÜMÜNE GİTMEK İSTER\nMİSİNİZ?', {
            fontFamily: 'RR',
            fontWeight: 'bold',
            fontSize: '64px',
            color: "#106eac",
            align: "center"
        }),

        actions: [
            createLabel(scene, 'EVET'),
            createLabel(scene, 'HAYIR')
        ],

        space: {
            content: 25,
            action: 15,

            left: 60,
            right: 60,
            top: 40,
            bottom: 40,
        },

        align: {
            actions: 'center', // 'center'|'left'|'right'
        },

        expand: {
            content: false, // Content is a pure text object
        }
    }).setDepth(100)
        .layout()
        // .drawBounds(scene.add.graphics(), 0xff0000)
        .popUp(1000);

    dialog
        .on('button.click', function (button, groupName, index) {
            if(index == 0)
            {
                game.scene.stop(scene.scene.key);
                game.scene.start('PassionScreen');
            }
            cover.destroy();
            dialog.destroy();
        })
        .on('button.over', function (button, groupName, index) {
            // button.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('button.out', function (button, groupName, index) {
            // button.getElement('background').setStrokeStyle();
        });
}

function toast_error(scene, error){
    var toast = scene.rexUI.add.toast({
        x: 540,
        y: 300,

        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0xffffff).setStrokeStyle(10, 0xff0000, 1).setDepth(100),
        text: scene.add.text(0, 0, '', {
            fontFamily: 'RR',
            fontWeight: 'bold',
            fontSize: '64px',
            color: "#106eac",
            align: "center",
        }).setDepth(100),
        space: {
            left: 50,
            right: 50,
            top: 80,
            bottom: 80,
        },

        duration: {
            in: 250,
            hold: 3000,
            out: 250,
        },
    }).setDepth(100)
    .show(error)
}