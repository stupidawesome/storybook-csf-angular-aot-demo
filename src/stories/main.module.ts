import { EasierButton } from "../app/button/button.component";
export default {
    title: "Button",
    component: EasierButton
};
export const Text = () => ({
    moduleMetadata: {
        imports: [EasierButtonModule]
    },
    template: `
        <button easierButton>
            Hello Button
        </button>
    `
});
import {
    NgModule,
    Component,
    DoBootstrap,
    ApplicationRef,
    Injector,
    APP_INITIALIZER,
    ComponentFactoryResolver, Type, ComponentRef,
} from "@angular/core"
import { BrowserModule } from "@angular/platform-browser";
import { EasierButtonModule } from "../app/button/button.module"
const t = {
    selector: "angular-storyroot", template: `
        <button easierButton>
            Hello Button
        </button>
    `
}
@Component(t)
export class StoryRoot {
}
@NgModule({
    declarations: [EasierButton
    ],
    exports: [EasierButton]
})
export class ModuleMetadata {
}

let bootstrapCb: Function

let startAngularApp = (cb: (renderComponent: (type: Type<any>) => Function) => void) => {
    bootstrapCb = cb
}

const getDeferred = (injector: Injector, componentFactoryResolver: ComponentFactoryResolver) => {
    function renderComponent(type: Type<any>) {
        const factory = componentFactoryResolver.resolveComponentFactory(type)
        const componentRef = factory.create(injector, undefined, document.getElementById("root"))

        return function destroy() {
            componentRef.destroy()
            componentRef.location.nativeElement.remove()
        }
    }

    return new Promise(resolve => {
        const doBootstrap = (cb: any) => {
            resolve()
            cb(renderComponent)
        }
        if (!bootstrapCb) {
            startAngularApp = doBootstrap
        } else {
            resolve()
            doBootstrap(bootstrapCb)
        }
    })
}

function deferBootstrap(injector: Injector, componentFactoryResolver: ComponentFactoryResolver) {
    return function () {
        return getDeferred(injector, componentFactoryResolver)
    }
}

export function createModule() {
    @NgModule({
        imports: [BrowserModule, ModuleMetadata], declarations: [StoryRoot],
        providers: [{
            provide: APP_INITIALIZER,
            useFactory: deferBootstrap,
            deps: [Injector, ComponentFactoryResolver],
            multi: true
        }]
    })
    class StoryRootModule implements DoBootstrap {
        constructor() {}

        ngDoBootstrap(appRef: ApplicationRef): void {
        }
    }
    return StoryRootModule
}


startAngularApp((renderComponent) => {
    const destroyComponent = renderComponent(StoryRoot)

    // destroyComponent()
})
