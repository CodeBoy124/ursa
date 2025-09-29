function getNameDistances(names, previousNames) {
  const nameDistances = [];

  for (const name of names) {
    let closestDistance = 0;
    for (
      let prevNameIndex = 0;
      prevNameIndex < previousNames.length;
      prevNameIndex++
    ) {
      if (previousNames[prevNameIndex] != name) continue;
      closestDistance = prevNameIndex + 1;
    }
    nameDistances.push([name, closestDistance]);
  }

  return nameDistances;
}

function getRandomName(names, previousNames, ignoreName = null) {
  // find closest distances
  let nameDistanceEntries = getNameDistances(names, previousNames);

  // ignore name
  if (ignoreName != null) {
    nameDistanceEntries = nameDistanceEntries.filter(
      (entry) => entry[0] != ignoreName
    );
  }

  // sort based on distance
  nameDistanceEntries.sort((a, b) => a[1] - b[1]);

  // Limit options to the most distant
  if (previousNames.length > 0) {
    nameDistanceEntries = nameDistanceEntries.slice(
      0,
      Math.max(1, Math.min(3, nameDistanceEntries.length - 1))
    );
  }

  const chosen =
    nameDistanceEntries[
      Math.floor(Math.random() * nameDistanceEntries.length)
    ][0];
  previousNames.push(chosen);
  return chosen;
}

function lookAhead(kinds, tokens, start_index) {
  for (let i = start_index; i < tokens.length; i++) {
    if (kinds.includes(tokens[i].kind)) return tokens[i];
  }
  return null;
}

function fillNamesIn(tokens, groups) {
  const idNames = {};
  let history = [];

  // fill in id-names
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].kind != "id-name") continue;
    const [nameGroup, nameId] = tokens[i].value.split("/");
    idNames[nameId] ??= getRandomName(groups[nameGroup], history);
    tokens[i].value = idNames[nameId];
  }

  // Fill in other names
  history = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].kind == "id-name") history.push(tokens[i].value);
    if (tokens[i].kind != "name") continue;

    const nameGroup = tokens[i].value;

    // Look ahead
    const ahead = lookAhead(["id-name", "name"], tokens, i + 1);
    const newValue = getRandomName(groups[nameGroup], history, ahead?.value);
    tokens[i].value = newValue;
  }

  return tokens.map((token) => token.value).join("");
}
