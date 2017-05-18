function message(msg) {
    document.getElementById('result').innerHTML = msg;
    document.getElementById('result').className = '';
}

document.addEventListener('DOMContentLoaded', function() {

    var editor = ace.edit("css");
    editor.getSession().setMode("ace/mode/css");

    var url = null;
    chrome.tabs.query({'active' : true, 'lastFocusedWindow' : true}, function(tabs) {
        url = tabs[0].url.split('/')[2]; // get url of site
    });

    // get data
    chrome.storage.sync.get(url, function(items) {
        if(typeof items[url] !== "undefined") {

            if(typeof editor !== "undefined")
            {
                editor.setValue(items[url], -1);
            }
            else
                document.getElementById('result').innerHTML = items[url];

        }
    });

    document.getElementById('save_css').onclick = function() {

        var data = new Object();

        if(typeof editor !== "undefined")
            data[url] = editor.getValue();
        else
            data[url] = document.getElementById('css').value;

        chrome.storage.sync.set(data, function() {
            //  Data's been saved boys and girls, go on home
            message('Css for site <b>' + url + '</b> saved.');
        });

    }

});
