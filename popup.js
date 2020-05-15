$(function () {
    $('#submitWord').click(function () {
        chrome.storage.sync.get(['blacklist'], function (res) {
            // default blackListedWords is object
            console.log(res);
            var blackListedWords = res.blacklist;
            var parsedArray = blackListedWords
                ? JSON.parse(blackListedWords)
                : [];
            var newAdd = $('#addWord').val();
            parsedArray.push(newAdd);
            var stringfiedNewArray = JSON.stringify(parsedArray);

            chrome.storage.sync.set(
                { blacklist: stringfiedNewArray },
                function () {
                    console.log('New Word Added');
                    window.close()
                }
            );
        });
    });
});
