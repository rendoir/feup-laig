/**
 * @typedef {Object} PrologRequest
 * @property {string} command
 * @property {string[]} args
 * @property {Function} onSuccess 
 * @property {Function} onError
 * 
 * Create a object with some properties to makes a request
 * @param {string} command 
 * @param {string[]} args 
 * @param {Function} onSuccess 
 * @param {Function} onError 
 * @returns {PrologRequest}
 */
function createRequest(command, args, onSuccess, onError) {
    let request = {
        command: command,
        args: args,
        onSuccess: onSuccess,
        onError: onError
    };
    return request;
}

/**
 * Transform the {@link request} in a string and send the request.
 * @param {PrologRequest} request 
 * @see getPrologRequest
 */
function prologRequest(request) {
    // Get Parameter Values
    let requestString = request.command.toString();
    if (request.args != null)
        requestString += '(' + request.args.toString() + ')';

    // Make Request
    getPrologRequest(requestString, request.onSuccess, request.onError);
}

/**
 * Send the @param requestString to the server, and set the function to call when receive de reply
 * @param {string} requestString 
 * @param {Function} onSuccess 
 * @param {Function} onError 
 * @param {number} port 
 */
function getPrologRequest(requestString, onSuccess, onError, port) {
    var requestPort = port || 8081
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, true);

    request.onload = function(data) {
        let reply;
        try {
            reply = JSON.parse(data.target.response);
        } catch (e) {
            return console.log("JSON Parse ERROR");
        }
        if (onSuccess && data.target.status == 200)
            onSuccess(reply);
        else
            console.log("Reply Message: ", reply.msg, "; Return Value: ", reply.return);
    };
    request.onerror = onError || function() { console.log("Error waiting for response"); };

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
}

function closeServer() {
    getPrologRequest('quit');
}

function testConnection() {
    getPrologRequest('testConnection');
}

testConnection();