var twitch_access_token = null;

var ws;

// Handle message handling for token authentication
window.addEventListener( 'message', onMessage );
function onMessage(event) { 
    if(event.origin !== window.location.origin) {
        return;
    }

    let message = event.data;

    if(message.type === "TOKEN") { 
        twitch_access_token = message.token;
        logToConsoleAndDebug("Retrieved Twitch Token: " + twitch_access_token);
        twitchInit();
    }
}


// Source: https://www.thepolyglotdeveloper.com/2015/03/create-a-random-nonce-string-using-javascript/
function nonce(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function heartbeat() {
    var message = {
        type: 'PING'
    };
    logToConsoleAndDebug(('SENT: ' + JSON.stringify(message) + '\n'));
    ws.send(JSON.stringify(message));
}

function listen(topic, auth_token) {
    var message = {
        type: 'LISTEN',
        nonce: nonce(15),
        data: {
            topics: [topic],
            auth_token: auth_token
        }
    };
    logToConsoleAndDebug('SENT: ' + JSON.stringify(message) + '\n');
    ws.send(JSON.stringify(message));
}

function connect(channel_id, auth_token) {
    var heartbeatInterval = 1000 * 60; //ms between PING's
    var reconnectInterval = 1000 * 1; //ms to wait before reconnect
    var heartbeatHandle;

    ws = new WebSocket('wss://pubsub-edge.twitch.tv');

    ws.onopen = function(event) {
        logToConsoleAndDebug('INFO: Socket Opened\n');
        heartbeat();
        heartbeatHandle = setInterval(heartbeat, heartbeatInterval);
        
        listen("channel-subscribe-events-v1." + channel_id, auth_token);
        // listen("channel-points-channel-v1." + channel_id, auth_token);
        listen("channel-bits-events-v2." + channel_id, auth_token);
    };

    ws.onerror = function(error) {
        logToConsoleAndDebug('ERR:  ' + JSON.stringify(error) + '\n');
    };

    ws.onmessage = function(event) {
        var top_level_message = JSON.parse(event.data);

        logToConsoleAndDebug('RECV: ' + JSON.stringify(top_level_message) + '\n');
        if(top_level_message.type == "RESPONSE") { 
            if(top_level_message.error == "ERR_BADAUTH") { 
                twitchInit();
            }
        }
        if (top_level_message.type == 'RECONNECT') {
            logToConsoleAndDebug('INFO: Reconnecting...\n');
            setTimeout(connect, reconnectInterval);
        }
        if (top_level_message.type == "MESSAGE") {
            var topic = top_level_message.data.topic;

            var twitch_message = JSON.parse(top_level_message.data.message);

            if (topic.startsWith("channel-points-channel-v1")) {
                var name = twitch_message.data.redemption.user.display_name;
                var count = twitch_message.data.redemption.reward.cost;

                queueRoll(name, count);
            }
            else if(topic.startsWith("channel-bits-events-v2")) {
                if(twitch_message.data.is_anonymous == false) {
                    var user_id = twitch_message.data.user_id;
                    var bits_per_roll = parseInt(document.querySelector("#bitsPerRoll").value);
                    var count = Math.floor(twitch_message.data.bits_used / bits_per_roll);

                    if(count > 0) {
                        fetch(
                            'https://api.twitch.tv/helix/users?id=' + user_id,
                            {
                                "headers": {
                                    "Client-ID": "zzkq9lw1rprzcr2edg6hn61ducjvri",
                                    "Authorization": "Bearer " + twitch_access_token
                                }
                            }
                        )
                        .then(resp => resp.json())
                        .then(resp => {
                            var name = resp["data"][0]["display_name"];
                            
                            queueRoll(name, count);
                        })
                        .catch(err => {
                            logToConsoleAndDebug(err);
                        });
                    }
                }
            }
            else if(topic.startsWith("channel-subscribe-events-v1")) {
                var name = null;
                var count = null;

                if(twitch_message.context == "anonsubgift") {
                    name = twitch_message.recipient_display_name;
                }
                else {
                    name = twitch_message.display_name;
                }
                
                count = twitch_message.multi_month_duration;

                if(count == 0) {
                    count = 1;
                }

                queueRoll(name, count);
            } else {
                logToConsoleAndDebug("Found topic that I wasn't listening for?: " + topic);
            }
        }
    }

    ws.onclose = function() {
        logToConsoleAndDebug('INFO: Socket Closed\n');
        clearInterval(heartbeatHandle);
        logToConsoleAndDebug('INFO: Reconnecting...\n');
        setTimeout(connect, reconnectInterval);
    };
}

function getTwitchToken() {
    var redirect_url = location.toString().substring(0, location.toString().lastIndexOf('/')) + "/twitch_redirect.html";

    const twitch_token_url = "https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=zzkq9lw1rprzcr2edg6hn61ducjvri&redirect_uri=" + redirect_url + "&scope=channel:read:subscriptions+bits:read";

    window.open(twitch_token_url,'',"width=256px, height=256px");
}

window.getTwitchToken = getTwitchToken

function twitchInit() {
    if(twitch_access_token === null) {
        logToConsoleAndDebug("Attempting to connect to twitch with null access token");
        return;
    }

    fetch(
        'https://api.twitch.tv/helix/users',
        {
            "headers": {
                "Client-ID": "zzkq9lw1rprzcr2edg6hn61ducjvri",
                "Authorization": "Bearer " + twitch_access_token
            }
        }
    )
    .then(resp => resp.json())
    .then(resp => {
        let channel_id = resp["data"][0]["id"];

        document.getElementById("twitchIntegrationDiv").innerHTML = "<p>Automatically queueing subs/bits to \"" + resp["data"][0]["display_name"] + "\".</p>";
        
        connect(channel_id, twitch_access_token);
    })
    .catch(err => {
        logToConsoleAndDebug(err);
    });
}

