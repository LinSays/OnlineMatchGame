Client.stage_start = function(){
    Client.socket.emit('stage_start', {username : userData.userName});
};

Client.stage_end = function(){
    Client.socket.emit('standalone_end', {username : userData.userName, heart:1, point:cur_point, coin:0});
};

Client.socket.on('stage_start',function(data){
    let activeScene = game.scene.getScenes(true)[0];
    if(data.result)
    {
        gameData = data.gameData;
        game_type = "stage";
        game_state = "";
        cur_number = 0;
        cur_word = 0;
        cur_point = 0;

        game.scene.stop(activeScene.scene.key);
        game.scene.start('NumberGameScreen');
        console.log(data);
    }
    else
    {
        if(data.need_power){
            passion_modal(activeScene);
        }
        else{
            toast_error(activeScene, "CAN NOT PLAY\nSTAGE GAME!");
        }
    }
});
