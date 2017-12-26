function getPrologRequest(requestString, onSuccess, onError, port) {
    var requestPort = port || 8081
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, true);

    request.onload = function(data) {
        let reply = JSON.parse(data.target.response);
        if (onSuccess)
            onSuccess(reply);
        else
            console.log("Request successful. Reply: " + reply.msg);
    };
    request.onerror = onError || function() { console.log("Error waiting for response"); };

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
}

function prologRequest(request) {
    // Get Parameter Values
    let requestString = request.command.toString();
    if (request.args != null)
        requestString += '(' + request.args.toString() + ')';

    // Make Request
    getPrologRequest(requestString, request.onSuccess);
}

function closeServer() {
    getPrologRequest('quit');
}

function testConnection() {
    return prologRequest({ command: 'testConnection' });
}

testConnection();