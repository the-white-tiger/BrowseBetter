document.addEventListener(
    'DOMNodeInserted',
    function (e) {
        processClutter(e.target);
    },
    false
);

function processClutter(node) {
    var innerText = node.innerText;
    var text = '';
    if (typeof innerText === 'string' && innerText) {
        text = innerText;
    }

    chrome.storage.sync.get(['blacklist'], function (response) {
        var blackListedWords = response.blacklist
            ? JSON.parse(response.blacklist)
            : [];

        for (var i = 0; i < blackListedWords.length; i++) {
            if (text.indexOf(blackListedWords[i]) >= 0) {
                node.remove();
                console.log(
                    'hurray removed one---',
                    blackListedWords[i],
                    '----from---',
                    text
                );
            }
        }
    });
}
function runOnce() {
    var feedElementsArray = document.getElementsByClassName(
        'relative ember-view'
    );
    for (var i = 0; i < feedElementsArray.length; i++) {
        processClutter(feedElementsArray[i]);
    }
}

runOnce();
