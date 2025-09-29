btnResetToExample.addEventListener("click", () => {
  localStorage.setItem("template", initial_template);
  localStorage.setItem("groups", initial_groups);
  updateScreen();
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
