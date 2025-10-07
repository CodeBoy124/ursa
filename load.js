const initial_template = `
You can get a random name from groups like this: {{first-group}}
If you want a second different name you use the same thing: {{first-group}}
Or even from a different group: {{second-group}}
You can also link names, so this: {{second-group/1}}
Can be linked to the following if you also use '/1': {{second-group/1}}
Of course you can also link another name using '/2': {{first-group/2}} and {{first-group/2}}
Finally, you might want to add people to multiple groups. You can do this by combining the groups names (view in the groups field)
`.trim();

const initial_groups = `
first-group
>Petrus
>Andreas
>Mathew

second-group
>Grogu
>Anakin
>Obi-One
>Yoda
>Rex

first-group
second-group
>Bill Gates
>Mark Zuckerberg
`.trim();

function updateScreen(template, groups) {
  inptTemplate.value = template ?? localStorage.getItem("template");
  inptGroups.value = groups ?? localStorage.getItem("groups");
  parseGroups();
}

window.addEventListener("load", () => {
  if (!localStorage.getItem("template")) {
    localStorage.setItem("template", initial_template);
  }
  if (!localStorage.getItem("groups")) {
    localStorage.setItem("groups", initial_groups);
  }
  updateScreen();
});

function saveInputs() {
  localStorage.setItem("template", inptTemplate.value);
  localStorage.setItem("groups", inptGroups.value);
}
