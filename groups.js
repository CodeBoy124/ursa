let groups = {};

function parseGroups() {
  groups = {};
  let selectedGroups = [];
  let selectedGroupsPushMode = false;
  const lines = inptGroups.value
    .replace(/\r/g, "")
    .split("\n")
    .filter((line) => line.length != 0);
  for (const line of lines) {
    if (line[0] == ">") {
      selectedGroupsPushMode = false;
      for (let selectedGroup of selectedGroups) {
        groups[selectedGroup].push(line.slice(1));
      }
    } else {
      if (!groups.hasOwnProperty(line)) groups[line] = [];

      if (selectedGroupsPushMode) {
        selectedGroups.push(line);
      } else {
        selectedGroups = [line];
      }

      selectedGroupsPushMode = true;
    }
  }
}
