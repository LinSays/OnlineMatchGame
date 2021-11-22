Client.invite_request = function(friend_name){
    Client.socket.emit('invite_request', {inviteuser : friend_name, waituser : userData.userName});
};

Client.invite_accept = function(){
    Client.socket.emit('invite_accept', {roomId : room_id, waituser : invite_name, inviteuser:userData.userName});
};

Client.invite_reject = function(){
    Client.socket.emit('invite_reject', {roomId : room_id, waituser : invite_name, inviteuser:userData.userName});
    room_id = "";
    invite_name = "";
};

Client.battle_cancel = function(){
    Client.socket.emit('battle_cancel', {roomId : room_id, waituser : invite_name});
    room_id = "";
    invite_name = "";
};

Client.online_end = function(point){
    Client.socket.emit('online_end', {room_id: room_id, username : userData.userName, point: (cur_point + point), step: cur_number+cur_word+1 });
};

Client.random_request = function(){
    Client.socket.emit('random_request', {username : userData.userName});
};

Client.socket.on('invite_request',function(data){
    let activeScene = game.scene.getScenes(true)[0];
    if(data.result)
    {
        if(data.from)
        {
            room_id = data.result.roomId;
            invite_name = data.from;
            invite_modal(activeScene);
        }
        else if(data.to)
        {
            room_id = data.result.roomId;
            game.scene.stop(activeScene.scene.key);
            game.scene.start('BattleWaitScreen');
        }
    }
    else
    {
        if(data.need_point){
            toast_error(activeScene, "YOU NEED AT\nLEAST 50 POINT\nTO PLAY");
        }
        else if(data.need_power){
            passion_modal(activeScene);
        }
        else if(!data.from)
        {
            toast_error(activeScene, data.error);
        }
    }
});

Client.socket.on('invite_accept',function(data){
    if(data.result == false)
    {
        room_id = "";
        invite_name = "";
        let activeScene = game.scene.getScenes(true)[0];
        if(data.need_point){
            toast_error(activeScene, "YOU NEED AT\nLEAST 50 POINT\nTO PLAY");
        }
        else if(data.need_power){
            passion_modal(activeScene);
        }
        else{
            toast_error(activeScene, data.error);
        }
    }
});

Client.socket.on('invite_reject',function(data){
    if(data.result)
    {
        room_id = "";
        invite_name = "";
        let activeScene = game.scene.getScenes(true)[0];
        reject_modal(activeScene);
    }
});

Client.socket.on('online_start',function(data){
    if(data.result)
    {
        room_id = data.result.roomId;
        if(data.oppoData)
        {
            game_type = "battle";
            oppoData = data.oppoData;
        } else{
            game_type = "tournament";
        }
        game_state = "";
        gameData = data.gameData;
        cur_number = 0;
        cur_word = 0;
        cur_point = 0;
        let activeScene = game.scene.getScenes(true)[0];
        if(game_type == "battle"){
            if(activeScene.scene.key != 'BattleWaitScreen')
            {
                game.scene.stop(activeScene.scene.key);
                game.scene.start('BattleWaitScreen');
            }
            else{
                activeScene.startGame();
            }
        }
        else if(game_type == "tournament"){
            console.log(gameData);
            game.scene.stop(activeScene.scene.key);
            game.scene.start('TournamentWaitScreen');
        }
    }
    else
    {
        console.log('failed');
    }
});

Client.socket.on('online_end',function(data){
    if(data.result)
    {
        let activeScene = game.scene.getScenes(true)[0];
        cur_point += activeScene.point;
        winner_name_list = data.winner;
        winner_point_list = data.winnerPoint;
        if(cur_number == cur_word)
            cur_number++;
        else
            cur_word++;
        game.scene.stop(activeScene.scene.key);
        game.scene.start('AnswerScreen');
    }
    else
    {
        console.log('failed');
    }
});

Client.socket.on('remain_alone',function(data){
    let activeScene = game.scene.getScenes(true)[0];
    winner_name_list = data.winner;
    winner_point_list = data.winnerPoint;
    console.log(data);
    game_state = 'remain_alone';
    game.scene.stop(activeScene.scene.key);
    game.scene.start('AnswerScreen');
});

Client.socket.on('random_request',function(data){
    let activeScene = game.scene.getScenes(true)[0];
    if(data.result)
    {
        room_id = data.result.roomId;
        game.scene.stop(activeScene.scene.key);
        game.scene.start('BattleWaitScreen');
    }
    else
    {
        if(data.need_point){
            toast_error(activeScene, "YOU NEED AT\nLEAST 50 POINT\nTO PLAY");
        }
        else if(data.need_power){
            passion_modal(activeScene);
        }
        else{
            toast_error(activeScene, data.error);
        }
    }
});
