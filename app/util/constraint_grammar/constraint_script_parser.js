"use strict"

const { EmbeddedActionsParser, EOF, tokenMatcher } = require("chevrotain")
const tokens = require("./constraint_script_tokens")
// for conciseness
const t = tokens

const ENABLE_SEMICOLON_INSERTION = true
const DISABLE_SEMICOLON_INSERTION = false

let records = {};

// as defined in https://www.ecma-international.org/ecma-262/5.1/index.html
class ConstraintScriptParser extends EmbeddedActionsParser {
    set orgText(newText) {
        this._orgText = newText
    }

    reset() {
        super.reset();
        records = {};
    }

    constructor() {
        super(tokens, {
            // Reduces Parser Initialization time and this grammar does not need
            // a larger lookahead.
            maxLookahead: 2
        })

        // Optimization to avoid traversing the prototype chain at hotspots.
        this.SUPER_CONSUME = super.CONSUME
        this.SUPER_CONSUME2 = super.CONSUME2

        this._orgText = ""

        // to avoid V8 hidden class changes by dynamic definition
        // of properties on "this"

        const $ = this

        // A.3 Expressions
        // Note that the binary expression operators are treated as a flat list
        // instead of using a new rule for each precedence level.
        // This is both faster and less verbose but it means additional logic must be used to re-order the flat list
        // into a precedence tree.
        // This approach was used in the swift compiler.
        // https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/doc/uid/TP40014097-CH32-ID383
        // (scroll down to the note on binary expressions)

        // Also note that such logic can only be implemented once the parser actually outputs some data structure...

        // See 11.1
        $.RULE("PrimaryExpression", () => {
            let value, id;
            $.OR(
                [
                    { ALT: () => {
                        id = $.CONSUME(t.Identifier).image;
                        value = records[id];
                    }},
                    { ALT: () => {
                        const rawValue = $.CONSUME(t.AbsLiteral).image;
                        value = parseInt(rawValue);
                    }},
                    { ALT: () => { 
                        value = $.SUBRULE($.ParenthesisExpression);
                    }}
                ]
            );

            return value;
        })

        $.RULE("ParenthesisExpression", () => {
            $.CONSUME(t.LParen)
            const value = $.SUBRULE($.Expression);
            $.CONSUME(t.RParen)
            return value;
        })

        // See 11.4
        $.RULE("UnaryExpression", () => {
            let value, op;
            $.OR([
                { ALT: () => {
                    value = $.SUBRULE($.PrimaryExpression);
                 }},
                {
                    ALT: () => {
                        $.OR2(
                            [
                                { ALT: () => {
                                    op = $.CONSUME(t.Plus);
                                }},
                                { ALT: () => {
                                    op = $.CONSUME(t.Minus) ;
                                }},
                                { ALT: () => {
                                    op = $.CONSUME(t.Exclamation);
                                }}
                            ]
                        )
                        value = $.SUBRULE($.UnaryExpression);

                        // Obviously, nothing to in case of t.Plus
                        if (tokenMatcher(op, t.Minus)) {
                            value *= -1;
                        } else if (tokenMatcher(op, t.Exclamation)) {
                            value = !value;
                        }
                    }
                }
            ])
            return value;
        })

        $.RULE("BinaryExpression", () => {
            let value, op, rhsValue;
            value = $.SUBRULE($.UnaryExpression);
            $.MANY(() => {
                $.OR(
                    [
                        // flat list of binary operators
                        { ALT: () => op = $.CONSUME(t.VerticalBarVerticalBar) },
                        { ALT: () => op = $.CONSUME(t.AmpersandAmpersand) },
                        { ALT: () => op = $.CONSUME(t.AbsEqualityOperator) },
                        { ALT: () => op = $.CONSUME(t.AbsRelationalOperator) },
                        {
                            ALT: () =>
                                op = $.CONSUME(t.AbsMultiplicativeOperator)
                        },
                        { ALT: () => op = $.CONSUME(t.AbsAdditiveOperator) }
                    ]
                )
                rhsValue = $.SUBRULE2($.UnaryExpression)
                if (tokenMatcher(op, t.VerticalBarVerticalBar)) {
                    value = value || rhsValue;
                } else if (tokenMatcher(op, t.AmpersandAmpersand)) {
                    value = value && rhsValue;
                } else if (tokenMatcher(op, t.AbsEqualityOperator)) {
                    if (tokenMatcher(op, t.EqEq)) {
                        value = value === rhsValue;
                    }
                     else if (tokenMatcher(op, t.NotEq)) {
                        value = value !== rhsValue;
                    } 
                } else if (tokenMatcher(op, t.AbsRelationalOperator)) {
                    if (tokenMatcher(op, t.Less)) {
                        value = value < rhsValue;
                    } else if (tokenMatcher(op, t.Greater)) {
                        value = value > rhsValue;
                    } else if (tokenMatcher(op, t.LessEq)) {
                        value = value <= rhsValue;
                    } else if (tokenMatcher(op, t.GreaterEq)) {
                        value = value >= rhsValue;
                    } 
                } else if (tokenMatcher(op, t.AbsMultiplicativeOperator)) {
                    if (tokenMatcher(op, t.Percent)) {
                        value = value % rhsValue;
                    } 
                } else if (tokenMatcher(op, t.AbsAdditiveOperator)) {
                    if (tokenMatcher(op, t.Plus)) {
                        value += rhsValue;
                    } else if (tokenMatcher(op, t.Minus)) {
                        value -= rhsValue;
                    } 
                } 
            })

            return value;
        })

        // See 11.13
        $.RULE("AssignmentExpression", () => {
            let value, ifResult, elseResult;
            value = $.SUBRULE($.BinaryExpression)
            $.OPTION(() => {
                $.CONSUME(t.Question)
                ifResult = $.SUBRULE($.AssignmentExpression)
                $.CONSUME(t.Colon)
                elseResult = $.SUBRULE2($.AssignmentExpression)

                value = value ? ifResult : elseResult;
            })

            return value;
        })

        // See 11.14
        $.RULE("Expression", () => {
            return $.SUBRULE($.AssignmentExpression);
        })

        // A.4 Statements

        // See 12.2
        $.RULE("VariableStatement", () => {
            $.SUBRULE($.VariableDeclarationList);
            $.CONSUME(t.Semicolon, DISABLE_SEMICOLON_INSERTION)
        })

        // See 12.2
        $.RULE("VariableDeclarationList", () => {
            $.SUBRULE($.VariableDeclaration)
        })

        // See 12.2
        $.RULE("VariableDeclaration", () => {
            const id = $.CONSUME(t.Identifier).image;
            const value = $.SUBRULE($.Initialiser);
            records[id] = value;
        })

        // See 12.2
        $.RULE("Initialiser", () => {
            $.CONSUME(t.Eq)
            return $.SUBRULE($.AssignmentExpression);
        })

        // See 12.9
        $.RULE("ReturnStatement", () => {
            $.CONSUME(t.ReturnTok)
            const value = $.SUBRULE($.Expression)
            $.CONSUME(t.Semicolon, DISABLE_SEMICOLON_INSERTION)
            return value;
        })

        $.RULE("Script", () => {
            $.MANY(() => {
                $.SUBRULE($.VariableStatement)
            })
            return $.SUBRULE($.ReturnStatement);
        });

        this.performSelfAnalysis()
    }

    /*
     * Link https://www.ecma-international.org/ecma-262/5.1/#sec-7.9.1
     * Automatic semicolon insertion implementation.
     * The spec defines the insertion in terms of encountering an "offending"
     * token and then inserting a semicolon under one of three basic rules.
     * 1. Offending token is after a lineTerminator.
     * 2. Offending token is a '}' RCurly.
     * 3. Reached EOF but failed to parse a complete ECMAScript Program.
     *
     * In addition there are two overriding conditions on these rules.
     * 1. do not insert if the semicolon would then be parsed as an empty statement.
     * 2. do not If that semicolon would become one of the two semicolons in the header of a for statement.
     *
     * The implementation approaches this problem in a slightly different but equivalent approach:
     *
     * anytime a semicolon should be consumed AND
     * the nextToken is not a semicolon AND
     * the context is one that allows semicolon insertion (not in a for header or empty Statement) AND
     * one of the 3 basic rules match
     * ---------------------------------->
     * THEN insert a semicolon
     *
     * Note that the context information is passed as the 'trySemiColonInsertion' argument
     * to the CONSUME parsing DSL method
     */
    canAndShouldDoSemiColonInsertion() {
        const nextToken = this.LA(1)
        const isNextTokenSemiColon = tokenMatcher(nextToken, t.Semicolon)
        return (
            isNextTokenSemiColon === false &&
            (this.lineTerminatorHere() || // basic rule 1a and 3
            tokenMatcher(nextToken, t.RCurly) || // basic rule 1b
                tokenMatcher(nextToken, EOF))
        ) // basic rule 2
    }

    // // TODO: performance: semicolon insertion costs 5-10% of runtime, can this be improved?
    CONSUME(tokClass, trySemiColonInsertion) {
        if (
            trySemiColonInsertion === true &&
            this.canAndShouldDoSemiColonInsertion()
        ) {
            return insertedSemiColon
        }
        return this.SUPER_CONSUME(tokClass)
    }

    CONSUME2(tokClass, trySemiColonInsertion) {
        if (
            trySemiColonInsertion === true &&
            this.canAndShouldDoSemiColonInsertion()
        ) {
            return insertedSemiColon
        }
        return this.SUPER_CONSUME2(tokClass)
    }

    // TODO: implement once the parser builds some data structure we can explore.
    // in the case of "for (x in y)" form.
    // the "IN" is only allowed if x is a left hand side expression
    // https://www.ecma-international.org/ecma-262/5.1/index.html#sec-12.6
    // so this method must verify that the exp parameter fulfills this condition.
    canInComeAfterExp(exp) {
        // TODO: temp implemntatoin, will always allow IN style iteration for now.
        return true
    }

    noLineTerminatorHere() {
        return !this.lineTerminatorHere()
    }

    lineTerminatorHere() {
        const prevToken = this.LA(0)
        const nextToken = this.LA(1)
        const seekStart = prevToken.endOffset
        const seekEnd = nextToken.startOffset - 1

        let i = seekStart
        while (i < seekEnd) {
            const code = this._orgText.charCodeAt(i)
            if (
                code === 10 ||
                code === 13 ||
                code === 0x2028 ||
                code === 0x2029
            ) {
                return true
            }
            i++
        }
        return false
    }
}

const insertedSemiColon = {
    tokenTypeIdx: t.Semicolon.tokenTypeIdx,
    image: ";",
    startOffset: NaN,
    endOffset: NaN,
    automaticallyInserted: true
}

module.exports = {
    ConstraintScriptParser
}
