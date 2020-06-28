import { EasierButton } from "../app/button/button.component"

export default {
    title: "Button",
    component: EasierButton,
}

export const Text = () => ({
    moduleMetadata: {
        declarations: [EasierButton]
    },
    template: `
        <button easierButton>
            Hello Button
        </button>
    `,
})
