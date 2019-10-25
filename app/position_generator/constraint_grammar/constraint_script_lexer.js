"use strict"

/**
 * ECMAScript cannot be easily lexed using a distinct lexing phase.
 * See: https://users.soe.ucsc.edu/~cormac/papers/dls14a.pdf
 *
 * So to expedite the creation of the chevrotain ECMA5 grammar.
 * The Acorn project was used to (only) tokenize the input text
 *
 * In the future this should be refactored to avoid the distinct lexing phase based on:
 * https://github.com/SAP/chevrotain/blob/master/test/full_flow/ecma_quirks/ecma_quirks.ts
 *
 */
const acorn = require("acorn")
const acornTokTypes = acorn.tokTypes
const tokens = require("./constraint_script_tokens")

function createChevToken(chevTokenClass, acornToken) {
    return {
        tokenTypeIdx: chevTokenClass.tokenTypeIdx,
        image: acornToken.value,
        startOffset: acornToken.start,
        endOffset: acornToken.end
    }
}

function tokenize(str) {
    const result = []
    for (let token of acorn.tokenizer(str, { ecmaVersion: 6 })) {
        let acornType = token.type
        let ctt
        // https://github.com/ternjs/acorn/blob/master/src/tokentype.js#L54
        switch (acornType) {
            case acornTokTypes._var:
                ctt = tokens.VarTok
                break
            case acornTokTypes.name:
                switch (token.value) {
                    default:
                        ctt = tokens.Identifier
                        break
                }
                break
            case acornTokTypes._return:
                ctt = tokens.ReturnTok
                break
            case acornTokTypes.parenL:
                ctt = tokens.LParen
                break
            case acornTokTypes.parenR:
                ctt = tokens.RParen
                break
            case acornTokTypes.semi:
                ctt = tokens.Semicolon
                break
            case acornTokTypes.prefix:
                switch (token.value) {
                    case "!":
                        ctt = tokens.Exclamation
                        break
                }
                break
            case acornTokTypes.logicalAND:
                ctt = tokens.AmpersandAmpersand
                break
            case acornTokTypes.logicalOR:
                ctt = tokens.VerticalBarVerticalBar
                break
            case acornTokTypes.question:
                ctt = tokens.Question
                break
            case acornTokTypes.colon:
                ctt = tokens.Colon
                break
            case acornTokTypes.modulo:
                ctt = tokens.Percent
                break
            case acornTokTypes.plusMin:
                switch (token.value) {
                    case "+":
                        ctt = tokens.Plus

                        break
                    case "-":
                        ctt = tokens.Minus
                        break
                }
                break
            case acornTokTypes.relational:
                switch (token.value) {
                    case "<":
                        ctt = tokens.Less
                        break
                    case ">":
                        ctt = tokens.Greater
                        break
                    case "<=":
                        ctt = tokens.LessEq
                        break
                    case ">=":
                        ctt = tokens.GreaterEq
                        break
                }
                break
            case acornTokTypes.equality:
                switch (token.value) {
                    case "==":
                        ctt = tokens.EqEq
                        break
                    case "!=":
                        ctt = tokens.NotEq
                        break
                }
                break
            case acornTokTypes.eq:
                ctt = tokens.Eq
                break
            case acornTokTypes._true:
                ctt = tokens.TrueTok
                break
            case acornTokTypes._false:
                ctt = tokens.FalseTok
                break
            case acornTokTypes.num:
                ctt = tokens.NumericLiteral
                break
            default:
                throw "Unrecognized token "+token.value;
        }
        const chevToken = createChevToken(ctt, token)
        result.push(chevToken)
    }

    return result
}

module.exports = {
    tokenize
}
