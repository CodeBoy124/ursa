// consts

const REGEX_ID_NAME = /^{{[a-zA-Z0-9\-_.]+\/[a-zA-Z0-9\-_.]+}}/;
const REGEX_NAME = /^{{[a-zA-Z0-9\-_.]+}}/;

// globals

let consumed = null;

// functions

const idNameToken = (value) => ({
  kind: "id-name",
  value: value.slice(2, -2),
});

const nameToken = (value) => ({
  kind: "name",
  value: value.slice(2, -2),
});

const textToken = (value) => ({
  kind: "text",
  value,
});

function consume(rgx, txt) {
  const match = txt.match(rgx);
  consumed = match ? match[0] : null;
  return consumed != null;
}

function createOrAppendToToken(tokens, newToken) {
  if (tokens.length == 0 || tokens[tokens.length - 1].kind != newToken.kind) {
    tokens.push(newToken);
  } else {
    const lastToken = tokens[tokens.length - 1];
    if (lastToken.value == null && newToken.value == null) return;
    lastToken.value = (lastToken.value ?? "") + (newToken.value ?? "");
  }
}

function tokenize(template) {
  const tokens = [];

  while (template.length > 0) {
    if (consume(REGEX_ID_NAME, template)) {
      template = template.slice(consumed?.length);
      tokens.push(idNameToken(consumed));
      continue;
    }

    if (consume(REGEX_NAME, template)) {
      template = template.slice(consumed?.length);
      tokens.push(nameToken(consumed));
      continue;
    }

    consumed = template[0];
    template = template.slice(1);
    createOrAppendToToken(tokens, textToken(consumed));
  }
  return tokens;
}
