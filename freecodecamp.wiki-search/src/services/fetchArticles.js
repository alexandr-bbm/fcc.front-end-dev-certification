export default function getArticles (query) {
    const remoteUrlWithOrigin = 'https://en.wikipedia.org/w/api.php';
    let queryData = {
        action: 'opensearch',
        format: 'json',
        limit: '10',
        namespace: '0'
    };
    queryData.search = query;
    // todo reject
    return new Promise((resolve, reject) => {
        $.ajax({
            url: remoteUrlWithOrigin,
            jsonp: "callback",
            dataType: 'jsonp',
            data: queryData,
            xhrFields: {withCredentials: true},
            success: (data) => {
                resolve(processRawResponse(data))
            },

        });
    })

}

/**
 * @param data Response from wiki, [[request],[titles], [snippets], [urls]]
 *
 */
function processRawResponse (data) {
    const titles = data[1];
    const snippets = data[2];
    const urls = data[3];
    const number = data[1].length;
    let result = [];
    for (let i = 0; i < number; i++) {
        result.push({
            title: titles[i],
            content: snippets[i],
            url: urls[i]
        })
    }
    return result;
}