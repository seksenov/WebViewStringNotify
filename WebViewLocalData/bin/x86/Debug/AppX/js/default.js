// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {

    function log(message) {
        var el = document.createElement("div");
        el.textContent = message;
        logArea.appendChild(el);
    }

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;
	var nativeCompoenent = 0;

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.launch) {
			if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
				// TODO: This application has been newly launched. Initialize your application here.
			} else {
				// TODO: This application was suspended and then terminated.
				// To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
			}
			args.setPromise(WinJS.UI.processAll());

			webView.addEventListener("MSWebViewNavigationStarting", () => {
			    nativeComponent = new NotifyComponent.Notify();
			    nativeComponent.onnotifyappevent = (arg) => {
			        log("From WebView: " + arg.target);
			    }
			    webView.addWebAllowedObject("NotifyComponent", nativeComponent);
			})

			webView.navigateToString("<html><body>Temporary content</body></html>");

			saveButton.addEventListener("click", () => {
			    var localFolder = Windows.Storage.ApplicationData.current.localFolder;

			    localFolder.createFolderAsync("TempDir", Windows.Storage.CreationCollisionOption.openIfExists).then((folder) => {
			        return folder.createFileAsync("temp.html", Windows.Storage.CreationCollisionOption.replaceExisting);
			    }).then((file) => {
			        log("Writing to " + file.path);
			        return Windows.Storage.FileIO.writeTextAsync(file, "<!DOCTYPE html><html><head><script src='ms-appx-web:///inWebView.js'></script></head><body>Inside WebView <button id='callComponent'>Send Message</button></body></html>");
			    }).then(() => {
			        log("Written file to disk");
			    });
			});

			navigateButton.addEventListener("click", () => {
			    webView.navigate("ms-appdata:///local/TempDir/temp.html");
			    log("Navigated to local data html file");
			});

			navigateInPackage.addEventListener("click", () => {
			    webView.navigate("ms-appx-web:///inPackage.html");
			    log("Navigated to package html file");
			});

			webView.addEventListener("MSWebViewScriptNotify", (args) => {
			    log("From WebView: " + args.value);
			});

            
		}
	};

	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};

	app.start();
})();
