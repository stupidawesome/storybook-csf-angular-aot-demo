import { EasierButton } from "../app/button/button.component";
export default {
    title: "Button",
    component: EasierButton
};
export const Text = () => ({
    moduleMetadata: {
        declarations: [EasierButton]
    },
    template: `
        <button easierButton>
            Hello Button
        </button>
    `
});
import { NgModule, Component } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
@Component({
    selector: "#root", template: `
        <button easierButton>
            Hello Button
        </button>
    `
})
export class StoryRoot {
}
@NgModule({
    declarations: [EasierButton
    ]
})
export class ModuleMetadata {
}
@NgModule({
    imports: [BrowserModule, ModuleMetadata], declarations: [StoryRoot], bootstrap: [StoryRoot]
})
export class StoryRootModule {
}
