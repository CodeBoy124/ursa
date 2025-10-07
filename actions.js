btnResetToExample.addEventListener("click", () => {
  updateScreen(initial_template, initial_groups);
});

btnGenerate.addEventListener("click", () => {
  const tokens = tokenize(inptTemplate.value);
  const filledTemplate = fillNamesIn(tokens, groups);
  outText.innerText = filledTemplate;
  saveInputs();
  btnCopy.style.display = "block";
});

btnCopy.addEventListener("click", () => {
  navigator.clipboard.writeText(outText.innerText);
  alert("Copied");
});

inptGroups.addEventListener("change", () => {
  parseGroups();
});
