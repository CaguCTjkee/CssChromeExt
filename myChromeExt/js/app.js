function addCssOnPage(css) {
    if(document.getElementById('ext_css') === null) {
        // create style el
        link = document.createElement('style');
        link.id = 'ext_css';
        link.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    document.getElementById('ext_css').innerHTML = css;
}

var url = location.href.split('/')[2];

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for(key in changes) {

        if(key === url) {
            addCssOnPage(changes[key].newValue);
        }
    }

});

chrome.storage.sync.get(url, function(items) {
    if(typeof items[url] !== "undefined") {

        addCssOnPage(items[url]);
    }
});
