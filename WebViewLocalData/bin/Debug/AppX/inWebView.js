(function () {
    document.addEventListener("DOMContentLoaded", () => {
        doSomething.addEventListener("click", () => {
            window.external.notify("From the WebView!");
        });
        callComponent.addEventListener("click", () => {
            var num = NotifyComponent.getNum();
            console.log("The number is: " + num);
        });
    });
})();