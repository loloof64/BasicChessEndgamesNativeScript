"use strict"

const parse = require("./constraint_grammar/constraint_script_api").parse

function interpret(inputText) {
  try {
      const result = parse(inputText);
      return result;
  } catch (e) {
      console.error(e);
      throw e;
  }
}

export default interpret;