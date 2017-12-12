function getPrologRequest(requestString, onSuccess, onError, port) {
    var requestPort = port || 8081
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, true);

    request.onload = onSuccess || function(data) { console.log("Request successful. Reply: " + data.target.response); };
    request.onerror = onError || function() { console.log("Error waiting for response"); };

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
}

export function prologRequest(request) {
    let requestParsed = JSON.parse(request);

    // Get Parameter Values
    let requestString = requestParsed.command.toString() + '(' + requestParsed.args.toString() + ')';

    // Make Request
    getPrologRequest(requestString, requestParsed.onSuccess, requestParsed.onError);
}