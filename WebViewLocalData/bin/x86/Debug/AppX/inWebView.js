(function () {
    document.addEventListener("DOMContentLoaded", () => {
        //doSomething.addEventListener("click", () => {
        //    window.external.notify("From the WebView!");
        //});
        callComponent.addEventListener("click", () => {
            try {
                var num = NotifyComponent.stringNotify("From the WebView!");
            } catch (e) {
                var m = e.message;
            }
        });
    });
})();