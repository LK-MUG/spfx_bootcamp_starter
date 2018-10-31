## lkmug-bootcamp

First webpart for the global O365 bootcamp session in Letterkenny, November 2018

Demonstrates creating a webpart and hooking it up to a third party API

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

```gulp clean - Removes all built artifacts from the code base
gulp test - Runs Jest testing suite
gulp serve - Serves the webpart in the SharePoint Framework workbench
gulp bundle - Bundles up the webpart
gulp package-solution - Prepares the package for deployment to SharePoint
```
