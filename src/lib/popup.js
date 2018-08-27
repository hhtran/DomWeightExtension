let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute("value", data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: `document.body.appendChild("
        <script>
          .overlay {
            position: relative;
          }

          .overlay:after {
            position: absolute;
            content:"";
            top:0;
            left:0;
            width:100%;
            height:100%;
            opacity:0;
          }

          .overlay:hover:after  {
            opacity: .5;
          }
        </script>
      ")`
    });
  });
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      file: "src/lib/colorDomNodes.js"
    });
  });
};
