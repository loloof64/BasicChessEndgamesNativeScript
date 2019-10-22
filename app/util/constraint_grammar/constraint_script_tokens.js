"use strict"

/*
 * Spec: https://www.ecma-international.org/ecma-262/5.1/#sec-7
 * important notes:
 * *  The Tokens class hierarchy in this module is based upon, but does not precisely match the spec's hierarchy.
 *    Instead the hierarchy is meant to provide easy categorization/classification of the tokens for "future phases"
 *    such as: parsing/syntax highlighting/refactoring
 */

const { createToken } = require("chevrotain")

// Link: https://www.ecma-international.org/ecma-262/5.1/#sec-7.2
const Whitespace = createToken({ name: "Whitespace" })

// Link: https://www.ecma-international.org/ecma-262/5.1/#sec-7.3
const LineTerminator = createToken({
    name: "LineTerminator",
    categories: Whitespace
})

// Link: https://www.ecma-international.org/ecma-262/5.1/#sec-7.6
const IdentifierName = createToken({ name: "IdentifierName" })

const AbsAnyKeyword = createToken({
    name: "AbsAnyKeyword",
    categories: IdentifierName
})

const AbsKeyword = createToken({
    name: "AbsKeyword",
    categories: AbsAnyKeyword
})

const ReturnTok = createToken({ name: "ReturnTok", categories: AbsKeyword })

// An IdentifierName, but not a reservedKeyword
const Identifier = createToken({
    name: "Identifier",
    categories: IdentifierName
})

// Link: https://www.ecma-international.org/ecma-262/5.1/#sec-7.7
const AbsPunctuator = createToken({ name: "AbsPunctuator" })

const LParen = createToken({ name: "LParen", categories: AbsPunctuator })
const RParen = createToken({ name: "RParen", categories: AbsPunctuator })

const Semicolon = createToken({ name: "Semicolon", categories: AbsPunctuator })

const Exclamation = createToken({
    name: "Exclamation",
    categories: AbsPunctuator
})

const AmpersandAmpersand = createToken({
    name: "AmpersandAmpersand",
    categories: AbsPunctuator
})
const VerticalBarVerticalBar = createToken({
    name: "VerticalBarVerticalBar",
    categories: AbsPunctuator
})

const Question = createToken({ name: "Question", categories: AbsPunctuator })
const Colon = createToken({ name: "Colon", categories: AbsPunctuator })

const AbsMultiplicativeOperator = createToken({
    name: "AbsMultiplicativeOperator",
    categories: AbsPunctuator
})

const Percent = createToken({
    name: "Percent",
    categories: AbsMultiplicativeOperator
})

const AbsAdditiveOperator = createToken({
    name: "AbsAdditiveOperator",
    categories: AbsPunctuator
})

const Plus = createToken({ name: "Plus", categories: AbsAdditiveOperator })
const Minus = createToken({ name: "Minus", categories: AbsAdditiveOperator })

const AbsRelationalOperator = createToken({
    name: "AbsRelationalOperator",
    categories: AbsPunctuator
})

const Less = createToken({ name: "Less", categories: AbsRelationalOperator })
const Greater = createToken({
    name: "Greater",
    categories: AbsRelationalOperator
})
const LessEq = createToken({
    name: "LessEq",
    categories: AbsRelationalOperator
})
const GreaterEq = createToken({
    name: "GreaterEq",
    categories: AbsRelationalOperator
})

const AbsEqualityOperator = createToken({
    name: "AbsEqualityOperator",
    categories: AbsPunctuator
})

const EqEq = createToken({ name: "EqEq", categories: AbsEqualityOperator })
const NotEq = createToken({ name: "NotEq", categories: AbsEqualityOperator })

const AbsAssignmentOperator = createToken({
    name: "AbsAssignmentOperator",
    categories: AbsPunctuator
})

const Eq = createToken({ name: "Eq", categories: AbsAssignmentOperator })

// Link: https://www.ecma-international.org/ecma-262/5.1/#sec-7.8
const AbsLiteral = createToken({ name: "AbsLiteral" })

const AbsBooleanLiteral = createToken({
    name: "AbsBooleanLiteral",
    categories: AbsLiteral
})

const TrueTok = createToken({
    name: "TrueTok",
    categories: [AbsBooleanLiteral, AbsKeyword]
})

const FalseTok = createToken({
    name: "FalseTok",
    categories: [AbsBooleanLiteral, AbsKeyword]
})

const NumericLiteral = createToken({
    name: "NumericLiteral",
    categories: AbsLiteral
})

module.exports = {
    Whitespace,
    LineTerminator,
    IdentifierName,
    AbsAnyKeyword,
    AbsKeyword,
    ReturnTok,
    Identifier,
    AbsPunctuator,
    LParen,
    RParen,
    Semicolon,
    Exclamation,
    AmpersandAmpersand,
    VerticalBarVerticalBar,
    Question,
    Colon,
    AbsMultiplicativeOperator,
    Percent,
    AbsAdditiveOperator,
    Plus,
    Minus,
    AbsRelationalOperator,
    Less,
    Greater,
    LessEq,
    GreaterEq,
    AbsEqualityOperator,
    EqEq,
    NotEq,
    AbsAssignmentOperator,
    Eq,
    AbsLiteral,
    AbsBooleanLiteral,
    TrueTok,
    FalseTok,
    NumericLiteral,
}
