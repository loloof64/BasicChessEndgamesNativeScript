"use strict"

const tokenize = require("./constraint_script_lexer").tokenize
const ConstraintScriptParser = require("./constraint_script_parser").ConstraintScriptParser

const parserInstance = new ConstraintScriptParser()

function parse(str) {
    const tokens = tokenize(str)
    parserInstance.input = tokens
    parserInstance.orgText = str
    const value = parserInstance.Script()

    if (parserInstance.errors.length > 0) {
        throw Error(parserInstance.errors)
    }

    return value;
}

module.exports = {
    parse, parserInstance
}
