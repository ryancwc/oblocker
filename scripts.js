// Load library
var gui = require('nw.gui');
var AutoLaunch = require('auto-launch');

var oblockerAutoLauncher = new AutoLaunch({
    name: 'oBlocker'
});
 
oblockerAutoLauncher.enable();
// Reference to window and tray
var win = gui.Window.get();


win.maximize();
item = new gui.MenuItem({
  label: "Exit oBlocker",
  click: function() {
    process.exit(0)
  },
});
win.on('close', function() {
  // alert("Minimizing to the taskbar!")
  // Hide window
  this.hide();

  // Show tray
  tray = new gui.Tray({
    icon: 'app.png'
  });
  var menu = new gui.Menu();
  menu.append(item); 
  tray.menu = menu;
  // Show window and remove tray when clicked
  tray.on('click', function() {
    win.show();
    win.maximize();
    this.remove();
    tray = null;
  });
});

function loaded() {
  iframeDoc = document.getElementById("foo").contentWindow.document;
  iframeDoc.getElementsByClassName("user")[0].value = "OBlocker";
  iframeDoc.getElementsByClassName("team")[0].value = "224497";
  iframeDoc.getElementsByClassName("passkey")[0].value = "afe9f903e9e503c8389b3f948e4801b6";
  iframeDoc.getElementsByClassName("save-id")[0].click();
  iframeDoc.getElementsByClassName("folding-start")[0].getElementsByClassName("button")[0].click();
  document.getElementById("foo").contentWindow.power_set("light");
  document.getElementById("foo").contentWindow.power_update("light");
  setInterval(doSomething, 100); // Time in milliseconds
  // setInterval(refresher, 10000); // Time in milliseconds
}

function pauseButton(){
  if(document.getElementById("pauseBtn").innerHTML == "Pause Folding"){
      iframeDoc = document.getElementById("foo").contentWindow.document;
      iframeDoc.getElementsByClassName("folding-stop")[0].getElementsByClassName("button")[0].click();
      document.getElementById("pauseBtn").innerHTML = "Start Folding";
      document.getElementById("pauseBtn").style.backgroundColor = "#2ece71";
      document.getElementById("indicator").style.color = "#fc3737";
      document.getElementById("indicator").innerHTML = "Deactivated";
      document.getElementById("statuson").style.display = "none";
      document.getElementById("statusoff").style.display = "block";
  }else{
    iframeDoc = document.getElementById("foo").contentWindow.document;
    iframeDoc.getElementsByClassName("folding-start")[0].getElementsByClassName("button")[0].click();
    document.getElementById("pauseBtn").innerHTML = "Pause Folding";
    document.getElementById("pauseBtn").style.backgroundColor = "#dc3934";
    document.getElementById("indicator").style.color = "#3cb272";
    document.getElementById("indicator").innerHTML = "Activated";
    document.getElementById("statusoff").style.display = "none";
    document.getElementById("statuson").style.display = "block";
  }

}

function doSomething() {
  document.getElementById("PPD").innerHTML = document.getElementById("foo").contentWindow.document.getElementById("ppd").innerHTML;
  document.getElementById("Status").innerHTML = "Status: " + document.getElementById("foo").contentWindow.document.getElementById("status-image").getAttribute("title");
}
function refresher() {
  document.getElementById("PPD").innerHTML = document.getElementById("foo").contentWindow.document.getElementById("ppd").innerHTML;
  document.getElementById("Status").innerHTML = "Status: " + document.getElementById("foo").contentWindow.document.getElementById("status-image").getAttribute("title");
}

