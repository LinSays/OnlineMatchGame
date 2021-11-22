var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        banner: 'ca-app-pub-6093857782627159/5731646477',
        interstitial: 'ca-app-pub-6093857782627159/4418564808',
        rewarded: 'ca-app-pub-6093857782627159/8917627725'
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-6093857782627159/5731646477',
        interstitial: 'ca-app-pub-6093857782627159/4418564808',
        rewarded: 'ca-app-pub-6093857782627159/5091490402'
    };
} else {
    admobid = { // for Windows Phone
        banner: 'ca-app-pub-6093857782627159/5731646477',
        interstitial: 'ca-app-pub-6093857782627159/4418564808',
        rewarded: 'ca-app-pub-6093857782627159/5091490402'
    };
}

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
} else {
    initApp();
}

function initApp() {
    if (! AdMob ) { alert( 'admob plugin not ready' ); return; }
    AdMob.createBanner( {
        adId: admobid.banner, 
    } );
    AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);

    AdMob.prepareInterstitial({
        adId: admobid.interstitial,
        autoShow:false,
    });

    $(document).on('onAdLoaded', function(e){
        if(typeof e.originalEvent !== 'undefined') e = e.originalEvent;
        var data = e.data || e;
        if(data.adType === 'rewardvideo') {
            isRewardReady = true;
        }
    });

    $(document).on('onAdLoaded', function(e){
        if(typeof e.originalEvent !== 'undefined') e = e.originalEvent;
        var data = e.data || e;
        if(data.adType === 'rewardvideo') {
            isRewardReady = true;
        }
    });

    $(document).on('onAdDismiss', function(e){
        if(typeof e.originalEvent !== 'undefined') e = e.originalEvent;
        var data = e.data || e;
        if(data.adType === 'rewardvideo') {
            let activeScene = game.scene.getScenes(true)[0];
            game.scene.stop(activeScene.scene.key);
            game.scene.start('HomeScreen');
            // if(activeScene != undefined && activeScene.scene.key == 'EndScreen'){
            //     activeScene.processEndReward();
            // }
        }
    });

    window.plugins.insomnia.keepAwake();
}