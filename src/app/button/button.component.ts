import { ChangeDetectionStrategy, Component, Input, ɵivyEnabled } from "@angular/core"

console.log("Ivy enabled: ", ɵivyEnabled)

@Component({
    selector: "button[easierButton]",
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ["./button.component.scss"],
    host: {
        "[attr.constraints]": "constraints"
    },
    template: `
        <ng-content></ng-content>
    `,
})
export class EasierButton {
    @Input()
    constraints = "fill"

    constructor() {
        console.log('hello!')
    }
}
