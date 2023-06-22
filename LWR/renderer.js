const information = document.getElementById("info");
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`;
const func = async () => {
  const response = await window.versions.ping();
  //
  const ta = document.createElement("TEXTAREA");
  ta.appendChild(document.createTextNode(response));
  document.body.appendChild(ta);
};
func();
