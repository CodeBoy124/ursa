// SemVer: breaking.features.fixes
const newestVersion = "1.1.0";

const versionData = {
  "1.1.0": {
    added: [
      "+You can now combine groups",
      "+Popup when new version is used",
      "+Responsivenes",
    ],
  },
};

function hasUsedIt() {
  return localStorage.getItem("template") || localStorage.getItem("groups");
}

function isNewVersion() {
  let currentVersion = localStorage.getItem("version");
  if (currentVersion == null && hasUsedIt()) {
    localStorage.setItem("version", "1.0.0");
    currentVersion = "1.0.0";
  } else if (currentVersion == null) {
    localStorage.setItem("version", newestVersion);
    return false;
  }
  return currentVersion != newestVersion;
}

function generateAlertMessage() {
  let msg = `Changes in version ${newestVersion}\n\n`;
  if (versionData[newestVersion].hasOwnProperty("added")) {
    msg += `New:\n${versionData[newestVersion].added.join("\n")}\n`;
  }
  return msg;
}

const handleVersionPopup = () => {
  if (!isNewVersion()) return;
  localStorage.setItem("version", newestVersion);
  alert(generateAlertMessage());
};

window.addEventListener("load", () => {
  handleVersionPopup();
});
