import "../polyfills.ts";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { createModule } from "./main.module";
platformBrowserDynamic().bootstrapModule(createModule())
    .catch(err => console.error(err));
