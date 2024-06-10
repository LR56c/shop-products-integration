"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nValidationException = void 0;
const common_1 = require("@nestjs/common");
class I18nValidationException extends common_1.HttpException {
    constructor(errors, status = common_1.HttpStatus.BAD_REQUEST) {
        super(HttpMessages[status], status);
        this.errors = errors;
    }
}
exports.I18nValidationException = I18nValidationException;
var HttpMessages;
(function (HttpMessages) {
    HttpMessages[HttpMessages["Continue"] = 100] = "Continue";
    HttpMessages[HttpMessages["Switching Protocols"] = 101] = "Switching Protocols";
    HttpMessages[HttpMessages["Processing"] = 102] = "Processing";
    HttpMessages[HttpMessages["Earlyhints"] = 103] = "Earlyhints";
    HttpMessages[HttpMessages["Ok"] = 200] = "Ok";
    HttpMessages[HttpMessages["Created"] = 201] = "Created";
    HttpMessages[HttpMessages["Accepted"] = 202] = "Accepted";
    HttpMessages[HttpMessages["Non Authoritative Information"] = 203] = "Non Authoritative Information";
    HttpMessages[HttpMessages["No Content"] = 204] = "No Content";
    HttpMessages[HttpMessages["Reset Content"] = 205] = "Reset Content";
    HttpMessages[HttpMessages["Partial Content"] = 206] = "Partial Content";
    HttpMessages[HttpMessages["Ambiguous"] = 300] = "Ambiguous";
    HttpMessages[HttpMessages["Moved Permanently"] = 301] = "Moved Permanently";
    HttpMessages[HttpMessages["Found"] = 302] = "Found";
    HttpMessages[HttpMessages["See Other"] = 303] = "See Other";
    HttpMessages[HttpMessages["Not Modified"] = 304] = "Not Modified";
    HttpMessages[HttpMessages["Temporary Redirect"] = 307] = "Temporary Redirect";
    HttpMessages[HttpMessages["Permanent Redirect"] = 308] = "Permanent Redirect";
    HttpMessages[HttpMessages["Bad Request"] = 400] = "Bad Request";
    HttpMessages[HttpMessages["Unauthorized"] = 401] = "Unauthorized";
    HttpMessages[HttpMessages["Payment Required"] = 402] = "Payment Required";
    HttpMessages[HttpMessages["Forbidden"] = 403] = "Forbidden";
    HttpMessages[HttpMessages["Not Found"] = 404] = "Not Found";
    HttpMessages[HttpMessages["Method Not Allowed"] = 405] = "Method Not Allowed";
    HttpMessages[HttpMessages["Not Acceptable"] = 406] = "Not Acceptable";
    HttpMessages[HttpMessages["Proxy Authentication Required"] = 407] = "Proxy Authentication Required";
    HttpMessages[HttpMessages["Request Timeout"] = 408] = "Request Timeout";
    HttpMessages[HttpMessages["Conflict"] = 409] = "Conflict";
    HttpMessages[HttpMessages["Gone"] = 410] = "Gone";
    HttpMessages[HttpMessages["Length Required"] = 411] = "Length Required";
    HttpMessages[HttpMessages["Precondition Failed"] = 412] = "Precondition Failed";
    HttpMessages[HttpMessages["Payload Too Large"] = 413] = "Payload Too Large";
    HttpMessages[HttpMessages["URI Too Long"] = 414] = "URI Too Long";
    HttpMessages[HttpMessages["Unsupported Media Type"] = 415] = "Unsupported Media Type";
    HttpMessages[HttpMessages["Requested Range Not Satisfiable"] = 416] = "Requested Range Not Satisfiable";
    HttpMessages[HttpMessages["Expectation Failed"] = 417] = "Expectation Failed";
    HttpMessages[HttpMessages["I Am A Teapot"] = 418] = "I Am A Teapot";
    HttpMessages[HttpMessages["Misdirected"] = 421] = "Misdirected";
    HttpMessages[HttpMessages["Unprocessable Entity"] = 422] = "Unprocessable Entity";
    HttpMessages[HttpMessages["Failed Dependency"] = 424] = "Failed Dependency";
    HttpMessages[HttpMessages["Precondition Required"] = 428] = "Precondition Required";
    HttpMessages[HttpMessages["Too Many Requests"] = 429] = "Too Many Requests";
    HttpMessages[HttpMessages["Internal Server Error"] = 500] = "Internal Server Error";
    HttpMessages[HttpMessages["Not Implemented"] = 501] = "Not Implemented";
    HttpMessages[HttpMessages["Bad Gateway"] = 502] = "Bad Gateway";
    HttpMessages[HttpMessages["Service Unavailable"] = 503] = "Service Unavailable";
    HttpMessages[HttpMessages["Gateway Timeout"] = 504] = "Gateway Timeout";
    HttpMessages[HttpMessages["HTTP Version Not Supported"] = 505] = "HTTP Version Not Supported";
})(HttpMessages || (HttpMessages = {}));
//# sourceMappingURL=i18n-validation-error.interface.js.map