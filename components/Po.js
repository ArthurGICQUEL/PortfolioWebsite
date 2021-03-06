import Script from 'next/script'

let Po = ({ buildUrl, buildPrefix, companyName, productName, productVersion }) => {
  return (
    <>
      <div id="unity-container" className="relative">
        <canvas
          id="unity-canvas"
          width={1280}
          height={720}
          className=" w-full bg-zinc-800"
        ></canvas>
        <button
          id="unity-start"
          className="rounded-full bg-gray-700 py-2 px-7 text-2xl font-bold text-gray-100 duration-200 ease-in hover:bg-gray-600"
        >
          Start Game
        </button>
        <div id="unity-loading-bar">
          <div id="unity-logo"></div>
          <div id="unity-progress-bar-empty">
            <div id="unity-progress-bar-full"></div>
          </div>
        </div>
        <div id="unity-warning"> </div>
        <div id="unity-footer">
          <div id="unity-fullscreen-button"></div>
          <div id="unity-build-title">Fullscreen</div>
        </div>
      </div>

      <Script id="unity-script">
        {`
            var container = document.querySelector("#unity-container");
            var canvas = document.querySelector("#unity-canvas");
            var loadingBar = document.querySelector("#unity-loading-bar");
            var progressBarFull = document.querySelector("#unity-progress-bar-full");
            var fullscreenButton = document.querySelector("#unity-fullscreen-button");
            var warningBanner = document.querySelector("#unity-warning");
            var startButton = document.querySelector("#unity-start");
            var logo = document.querySelector("#unity-logo");
      
            // Shows a temporary message banner/ribbon for a few seconds, or
            // a permanent error message on top of the canvas if type=='error'.
            // If type=='warning', a yellow highlight color is used.
            // Modify or remove this function to customize the visually presented
            // way that non-critical warnings and error messages are presented to the
            // user.
            function unityShowBanner(msg, type) {
              function updateBannerVisibility() {
                warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
              }
              var div = document.createElement('div');
              div.innerHTML = msg;
              warningBanner.appendChild(div);
              if (type == 'error') div.style = 'background: red; padding: 10px;';
              else {
                if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
                setTimeout(function() {
                  warningBanner.removeChild(div);
                  updateBannerVisibility();
                }, 5000);
              }
              updateBannerVisibility();
            }
            
            
            var loaderUrl = "${buildUrl}/${buildPrefix}.loader.js";
            var config = {
              dataUrl: "${buildUrl}/${buildPrefix}.data",
              frameworkUrl: "${buildUrl}/${buildPrefix}.framework.js",
              codeUrl: "${buildUrl}/${buildPrefix}.wasm",
              streamingAssetsUrl: "StreamingAssets",
              companyName: "${companyName}",
              productName: "${productName}",
              productVersion: "${productVersion}",
              showBanner: unityShowBanner,
            };
      
            // By default Unity keeps WebGL canvas render target size matched with
            // the DOM size of the canvas element (scaled by window.devicePixelRatio)
            // Set this to false if you want to decouple this synchronization from
            // happening inside the engine, and you would instead like to size up
            // the canvas DOM size and WebGL render target sizes yourself.
            // config.matchWebGLToCanvasSize = false;
      
            if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
              container.className = "unity-mobile";
              // Avoid draining fillrate performance on mobile devices,
              // and default/override low DPI mode on mobile browsers.
              config.devicePixelRatio = 1;
              unityShowBanner('WebGL builds are not supported on mobile devices.');
            }
      
            var script = document.createElement("script");
            script.src = loaderUrl;
            script.onload = () => {
              createUnityInstance(canvas, config, (progress) => {
                progressBarFull.style.width = 100 * progress + "%";
              }).then((unityInstance) => {
                loadingBar.style.display = "none";
                fullscreenButton.onclick = () => {
                  unityInstance.SetFullscreen(1);
                };
              }).catch((message) => {
                alert(message);
              });
            };
            startButton.onclick = () => {
              logo.style.display = "block";
              loadingBar.style.display = "block";
              startButton.style.display = "none";
              document.body.appendChild(script);
            };
          `}
      </Script>
    </>
  )
}

export default Po
