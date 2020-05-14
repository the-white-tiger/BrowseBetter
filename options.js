$(function () {
    chrome.storage.sync.get(['blacklist'], function (response) {
        var blackListedWords = response.blacklist
            ? JSON.parse(response.blacklist)
            : [];
        var display = '';
        for (var i = 0; i < blackListedWords.length; i++) {
            display = display + blackListedWords[i] + ',';
        }
        $('#showBlacklist').val(display);
    });

    $('#editWords').click(function () {
        var text = $('#showBlacklist').val();
        var newList = text.split(',');
        newList = JSON.stringify(newList);
        chrome.storage.sync.set({ blacklist: newList }, function () {
            console.log('successfully edited the list');
        });
    });
    $('#resetWords').click(function () {
        chrome.storage.sync.set({ blacklist: '' }, function () {
            console.log('successfully reset the list');
        });
    });
});
