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
 * Transform the request in a string and send it to server.
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
function getPrologRequest(requestString, onSuccess, onError, port, tries) {
    var requestPort = port || 8081
    var request = new XMLHttpRequest();
    if (!tries) {
        tries = 0;
    }
    request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, true);

    request.onload = function(data) {
        tries = 0;
        let reply;
        try {
            let res = data.target.response.substring(1, data.target.response.length - 1);
            reply = JSON.parse(res);
        } catch (e) {
            return console.log("Error: Json parse: " + data.target.response);
        }
        if (onSuccess && data.target.status == 200)
            onSuccess(reply);
        else
            console.log("Reply Message: ", reply.msg, "; Return Value: ", reply.return);
    };
    request.onerror = onError || function() {
        console.log("Error waiting for response");
        if (tries < 2) {
            tries++;
            getPrologRequest(requestString, onSuccess, onError, port, tries);
        }
    };

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
    last_request = request;
}

/**
 * Send command to close server
 */
function closeServer() {
    getPrologRequest('quit');
}

/**
 * Send command to test connection to the server
 */
function testConnection() {
    getPrologRequest('testConnection');
}


testConnection();
