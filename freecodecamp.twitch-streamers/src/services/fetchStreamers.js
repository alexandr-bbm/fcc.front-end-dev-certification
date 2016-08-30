export default function fetchStreamers () {
    const promiseArr = STREAMERS_LIST.map((streamerName) => {
        return new Promise((resolve) => {
            $.ajax({
                url: `https://api.twitch.tv/kraken/streams/${streamerName}`,
                jsonp: "callback",
                dataType: 'jsonp',
                success: (data) => {
                    let streamer = {
                        name: streamerName
                    };
                    if (data.stream === undefined) {
                        streamer = {
                            ...streamer,
                            available: false,
                            message: data.message.replace(`'${streamerName}'`, '')
                        };
                        resolve(streamer);
                    } else {
                        const status = data.stream ? 'online' : 'offline';
                        streamer.game = data.stream ? data.stream.game : null;
                        fetchImageForChannel(streamerName)
                            .then((logo) => {
                                streamer = {
                                    ...streamer,
                                    available: true,
                                    status,
                                    url: `https://www.twitch.tv/${streamerName}`,
                                    logo
                                };
                                resolve(streamer);
                            })
                    }
                }
            });
        })
    });
    return Promise.all(promiseArr)
}

const STREAMERS_LIST = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas",
    "brunofin",
    "comster404"
];

function fetchImageForChannel (channel) {
    return new Promise((resolve) => {
        $.ajax({
            url: `https://api.twitch.tv/kraken/channels/${channel}`,
            jsonp: "callback",
            dataType: 'jsonp',
            success: (data) => resolve(data.logo)
        })
    });
}
