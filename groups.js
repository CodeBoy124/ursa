let groups = {};

function parseGroups() {
  groups = {};
  let selectedGroup = null;
  const lines = inptGroups.value
    .replace(/\r/g, "")
    .split("\n")
    .filter((line) => line.length != 0);
  for (const line of lines) {
    if (line[0] == ">") {
      groups[selectedGroup].push(line.slice(1));
    } else {
      groups[line] = [];
      selectedGroup = line;
    }
  }
}
