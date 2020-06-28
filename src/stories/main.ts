import "../polyfills.ts";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { StoryRootModule } from "./main.module";
platformBrowserDynamic().bootstrapModule(StoryRootModule)
    .catch(err => console.error(err));
