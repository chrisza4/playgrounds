# TypeScriptPlay
Try using TypeScript

## Setting up environment

Set up TypeScript is easy once you know (but a lot of confusion will grown when you search online)

You will need tools as followed:

1. TypeScript Complier (tsc)
2. TypeScript types manager (typings)

First one is obvious, compile typescript to javascript

Second is needed when you use any javascript modules (trust me, you will. React, Express, etc.), you will need type definition file. Typings is a tools to load community definition file.

### Start

```
npm -i
npm -i typings --global
typings install
npm run api
```

### How I set up server

I use `tsc -w` to watch all typescript file, compile to js in dist folder, and let nodemon do its job.

We can set `tsc` complied folder in tsconfig.json

### How I set up testing

```
mocha --compilers ts:ts-node/register . $(find ./src/ -name '*.spec.ts')
```

Use ts-node as a typescript compiler and pipe the code to mocha.

### Helpers

```
npm get-package $packageName
```

This will automatically install both Typings and NPM
