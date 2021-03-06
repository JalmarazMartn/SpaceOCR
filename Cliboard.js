document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('apikey').value = getCookie('apikey');
    document.getElementById('regexpDesc').value = getCookie('regexpDesc');
    document.getElementById('regexp').value = getCookie('regexp');
});

var ClipboardUtils = new function () {
    var permissions = {
        'image/bmp': true,
        'image/gif': true,
        'image/png': true,
        'image/jpeg': true,
        'image/tiff': true
    };
    function getType(types) {
        for (var j = 0; j < types.length; ++j) {
            var type = types[j];
            if (permissions[type]) {
                return type;
            }
        }
        return null;
    }
    function getItem(items) {
        for (var i = 0; i < items.length; ++i) {
            var item = items[i];
            if (item) {
                var type = getType(item.types);
                if (type) {
                    return item.getType(type);
                }
            }
        }
        return null;
    }
    function loadFile(file, callback) {
        if (window.FileReader) {
            var reader = new FileReader();
            reader.onload = function () {
                callback(reader.result, null);
            };
            reader.onerror = function () {
                callback(null, 'Incorrect file.');
            };
            reader.readAsDataURL(file);
        } else {
            callback(null, 'File api is not supported.');
        }
    }

    this.readImage = function (callback) {
        if (navigator.clipboard) {
            var promise = navigator.clipboard.read();
            promise
                .then(function (items) {
                    var promise = getItem(items);
                    if (promise == null) {
                        callback(null, null);
                        return;
                    }
                    promise
                        .then(function (result) {
                            loadFile(result, callback);
                        })
                        .catch(function (error) {
                            callback(null, 'Reading clipboard error.');
                        });
                })
                .catch(function (error) {
                    callback(null, 'Reading clipboard error.');
                });
        } else {
            callback(null, 'Clipboard is not supported.');
        }
    };
};

// Usage example:
function pasteImageBitmap() {
    ClipboardUtils.readImage(function (data, error) {
        if (error) {
            alert(error);
            return;
        }
        if (data) {
            //window.alert(data);
            //get the image data in base 64
            var index = data.indexOf(",");
            var imageData = data.substring(index + 1);
            document.getElementById("textbox").value = imageData;
            sendImage();
            return;
        }
        alert('Image bitmap is not avaialble - copy it to clipboard.');
    });
}
function sendImage() {
    var base64data = document.getElementById("textbox").value;
    var myHeaders = new Headers();
    var apikey = document.getElementById("apikey").value;
    if (apikey == "") {
        apikey = 'helloworld';
    }
    myHeaders.append("apikey", apikey);
    setCookie(document.getElementById("apikey"), 30);
    setCookie(document.getElementById("regexpDesc"), 30);
    setCookie(document.getElementById("regexp"), 30);
    var formdata = new FormData();
    formdata.append("language", "eng");
    formdata.append("isOverlayRequired", "false");
    //formdata.append("url", "http://dl.a9t9.com/ocrbenchmark/eng.png");
    formdata.append("base64Image", 'data:image/bmp;base64,' + base64data);
    formdata.append("iscreatesearchablepdf", "false");
    formdata.append("issearchablepdfhidetextlayer", "false");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch("https://api.ocr.space/parse/image", requestOptions)
        .then(function (response) {
                return response.text();
            })
        .then(function (result) {
                document.getElementById("textarea").value = result;
                var regexp = '';
                if (!document.getElementById("regexp").value == "") {
                    regexp = new RegExp(document.getElementById("regexp").value, "gm");
                }
                document.getElementById("textarea").value = findSubstring(result, regexp);
            })
        .catch(function (error) {
                return alert('error' + error);
            });
}
//find if the string contains the regexp and returns first match
function findSubstring(str, regexp) {
    var json = JSON.parse(str);
    if (!json.ParsedResults[0].ParsedText) {
        return str;
    }
    var parsedText = json.ParsedResults[0].ParsedText;
    //get all matches of the regexp
    var matches = ArrayOfMatchesFromRegexp(regexp,parsedText);
    if (matches.length == 0) {
        return parsedText;
    }
    var allMatchesString = "";
    for (i = 0; i < matches.length; i++) {
        var match = matches[i];
        if (match.length > 1) {                
            allMatchesString += match[1] + "\n";
        }
        else {
            allMatchesString += match[0] + "\n";
        }
    }
    return allMatchesString;
}
function ArrayOfMatchesFromRegexp(regexp, str) {
    var matches = [];
    do {
        var match = regexp.exec(str);
        if (match) {
            matches.push(match);
        }
    } while (match);
    return matches;
}
function setCookie(element, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = element.id + "=" + element.value + ";" + expires + ";path=/";
}
//get the stored cookie value and set the value of the element    
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}