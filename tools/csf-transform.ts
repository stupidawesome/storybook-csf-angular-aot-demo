import * as fs from "fs"
import * as path from "path"

global.ts = require("typescript")

const transformer = <T extends ts.Node>(context: ts.TransformationContext) => {
    return (rootNode: T) => {
        function visit(node: ts.Node): ts.Node {
            node = ts.visitEachChild(node, visit, context)

            return node
        }

        return ts.visitNode(rootNode, visit)
    }
}

function createAngularStoryApp(file?: string, identifiers?: string[]): void {
    if (!file || !identifiers) {
        throw new Error("Missing arguments")
    }
    // Create a Program to represent the project, then pull out the
    // source file to parse its AST.
    let program = ts.createProgram([file], {allowJs: true})
    const sourceFile = program.getSourceFile(file)

    if (!sourceFile) {
        throw new Error(`File not found: ${sourceFile}`)
    }

    // To print the AST, we'll use TypeScript's printer
    const printer = ts.createPrinter({newLine: ts.NewLineKind.LineFeed})

    let moduleMetadata
    let template

    ts.forEachChild(sourceFile, (node) => {
        if (ts.isVariableStatement(node)) {
            ts.forEachChild(node.declarationList, (node) => {
                if (ts.isVariableDeclaration(node)) {
                    if (ts.isArrowFunction(node.initializer)) {
                        if (ts.isParenthesizedExpression(node.initializer.body)) {
                            if (ts.isObjectLiteralExpression(node.initializer.body.expression)) {
                                node.initializer.body.expression.properties.forEach((prop) => {
                                    if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
                                        if (prop.name.text === "moduleMetadata") {
                                            moduleMetadata = prop.initializer
                                        }
                                        if (prop.name.text === "template") {
                                            template = prop.initializer
                                        }
                                    }
                                })
                            }
                        }
                    }
                }
            })
        }
    })

    const append = ts.createSourceFile("main.module.ts", `
import { NgModule, Component } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

@Component({
    selector: "#root",
    template: ${template ? printer.printNode(ts.EmitHint.Expression, template, sourceFile) : `""`}
})
export class StoryRoot {}

@NgModule(${moduleMetadata ? printer.printNode(ts.EmitHint.Expression, moduleMetadata, sourceFile) : ""})
export class ModuleMetadata {}

@NgModule({
    imports: [BrowserModule, ModuleMetadata],
    declarations: [StoryRoot],
    bootstrap: [StoryRoot]
})
export class StoryRootModule {}
`, sourceFile.languageVersion)

    const mainFile = ts.createSourceFile("main.ts", `
import "../polyfills.ts"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"
import { StoryRootModule } from "./main.module"
platformBrowserDynamic().bootstrapModule(StoryRootModule)
    .catch(err => console.error(err));
`, sourceFile.languageVersion)

    const moduleFile = ts.updateSourceFileNode(sourceFile, [...sourceFile.statements, ...append.statements])
    const mainModule = printer.printFile(moduleFile)
    const main = printer.printFile(mainFile)

    fs.writeFileSync(path.resolve(process.cwd(), "src", "stories", "main.ts"), main)
    fs.writeFileSync(path.resolve(process.cwd(), "src", "stories", "main.module.ts"), mainModule)
    console.log("file written")
}

// Run the extract function with the script's arguments
createAngularStoryApp(process.argv[2], process.argv.slice(3))
