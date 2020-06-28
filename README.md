# Transform Storybook CSF to AoT compatible code for Angular

This repo is a sandbox for using TypeScript Compiler API to transform Storybook CSF stories into AoT compatible code for consumption by `@ngtools/webpack` and `AngularCompilerPlugin`. This allows stories to benefit from AoT compilation which is the default in Angular 9+ and enables the Ivy view engine.

## To run this demo

- clone the repo
- npm install

Run these two commands in separate terminals:

```bash
npm run tools:dev
npm run stories:serve
```

Then you can edit stories under `src/stories/button.ts` to see changes in the browser. For now don't change anything in this file except `template` and `moduleMetadata`. No other properties are currently supported, this is just a technical proof.

## What this does

Storybook CSF format is tailored towards the react component model, which is at odds with how Angular compiles components. As of version 9, Angular compiles components ahead of time by default. CSF format is not compatible with AoT, so it needs to be transformed into a format that Angular can statically analyse. This is achieved using the TypeScript Compiler API to extract metadata from the CSF story file and generate AoT compatible code.

## What this doesn't do

It doesn't actually integrate with Storybook at this stage. It doesn't support all of the properties that can be defined in a CSF story, and it only works with parenthesised expressions returned from an arrow function. This can be expanded later.
