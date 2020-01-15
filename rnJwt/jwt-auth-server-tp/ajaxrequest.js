function AjaxRequest(config) {
    // Request URL
    this.url = null;
    // Request method
    this.method = 'get';
    // Response mime type
    this.handleAs = 'text';
    // Asynchronous request ?
    this.asynchronous = true;
    // Request parameters
    this.parameters = {};
    // AJAX transport (xmlHttpRequest object)
    this.transport = null;
    // On success callback
    this.onSuccess = function() {};
    // On error callback
    this.onError = function() {};
    // Cancel request method
    this.cancel = function() {
        if (this.transport !== null) {
            this.onError = function() {};
            this.onSuccess = function() {};
            this.transport.abort();
        }
    };
    // Submit parameters content-type default
    this.submitParametersAs = 'application/x-www-form-urlencoded';

    // Check config values
    if (typeof config !== 'object') {
        throw 'Request parameter should be an object';
    }

    // Check request URL parameter
    if (!config.url) {
        throw 'Request URL needed';
    }
    this.url = config.url;

    // check submit parameters content-type
    if (config.submitParametersAs) {
        this.submitParametersAs = config.submitParametersAs;
    }

    // Check request method parameter
    if (config.method) {
        if (typeof config.method === 'string') {
            var method = config.method.toLowerCase();
            if (method === 'get' || method === 'post') this.method = method;
            else throw "'" + config.method + "' method not supported";
        } else {
            throw "'method' parameter should be a string";
        }
    }

    // Check request asynchrounous mode parameter
    if (config.asynchronous) {
        if (typeof config.asynchronous === 'boolean') {
            this.asynchronous = config.asynchronous;
        } else {
            throw "'asynchronous' parameter should be a boolean";
        }
    }

    // Check request parameters parameter
    if (config.parameters) {
        if (config.parameters instanceof Object) {
            this.parameters = config.parameters;
        } else {
            throw "'parameters' parameter should be a object";
        }
    }

    var callbackFound = false;
    // Check onSuccess callback parameter
    if (config.onSuccess) {
        if (config.onSuccess instanceof Function) {
            this.onSuccess = config.onSuccess;
            callbackFound = true;
        } else {
            throw "'onSuccess' parameter should be a function";
        }
    }

    // Check onError callback parameter
    if (config.onError) {
        if (config.onError instanceof Function) {
            this.onError = config.onError;
            callbackFound = true;
        } else {
            throw "'onError' parameter should be a function";
        }
    }

    // Check whether onSuccess or onError callback parameter is present
    if (!callbackFound) {
        throw "'onSuccess' or 'onError' parameter not found";
    }

    // Check response mime type parameter
    if (config.handleAs) {
        if (typeof config.handleAs === 'string') {
            var handleAs = config.handleAs.toLowerCase();
            if (['text', 'json', 'xml'].indexOf(handleAs) !== -1) {
                this.handleAs = handleAs;
            } else {
                throw "handleAs format '" + config.handleAs + "' not supported";
            }
        } else {
            throw 'handleAs parameter should be a string';
        }
    }

    // Build transport
    this.transport = GetXmlHttpObject();

    // Build response callback function
    // Closure for this
    var requestThis = this;
    this.transport.onreadystatechange = function() {
        // On complete
        if (requestThis.transport.readyState === 4 || requestThis.transport.readyState === 'complete') {
            // On success result
            if (requestThis.transport.status === 200) {
                // Check response expected mime type
                var result = null;
                switch (requestThis.handleAs) {
                    case 'text':
                        result = requestThis.transport.responseText;
                        break;
                    case 'json':
                        result = JSON.parse(requestThis.transport.responseText);
                        break;
                    case 'xml':
                        result = requestThis.transport.responseXML;
                        break;
                    default:
                        throw 'handleAs consistancy problem, value is ' + requestThis.handleAs;
                }
                // Launch onSuccess callback with result parameter
                requestThis.onSuccess(result);
            } else {
                // Response code != 200 => Launch onError with parameters status and response content
                requestThis.onError(requestThis.transport.status, requestThis.transport.responseText);
            }
        }
    };

    // Build parameters string
    var parameters = new Array();
    // Iterate on parameters
    for (var i in this.parameters) {
        // Escape parameters with encodeURIComponent()
        parameters.push(i + '=' + encodeURIComponent(this.parameters[i]));
    }
    // Join escaped parameters with '&'
    var parametersString = parameters.join('&');
    if (this.method === 'get') {
        // Request method is 'get'
        // Open transport
        this.transport.open(
            this.method,
            // Parameters should be added to the request URL
            this.url + '?' + parametersString,
            this.asynchronous,
        );
        // Send request
        this.transport.send(null);
    } else {
        // Request method is 'post'
        // Open transport
        this.transport.open(this.method, this.url, this.asynchronous);
        // Set content type request header
        this.transport.setRequestHeader('Content-Type', this.submitParametersAs);

        if (this.submitParametersAs === 'application/x-www-form-urlencoded') {
            // Send request with parameters
            this.transport.send(parametersString);
        } else if (this.submitParametersAs === 'application/json') {
            // Send request with parameters
            this.transport.send(JSON.stringify(this.parameters));
        } else {
            throw new Error('Content-type ' + this.submitParametersAs + ' not yet implemented');
        }
    }

    // Get XmlHttpRequest object
    function GetXmlHttpObject() {
        // XmlHttpRequest object
        var xmlHttp = null;

        try {
            // Firefox, Opera 8.0+, Safari, IE 7+
            xmlHttp = new XMLHttpRequest();
        } catch (e) {
            // Internet Explorer - old IE - prior to version 7
            try {
                xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (e) {
                try {
                    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
                } catch (e) {
                    throw 'XMLHTTPRequest object not supported';
                }
            }
        }
        return xmlHttp;
    }
}
