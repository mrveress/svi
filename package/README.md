# SVI
##### Animated State-Managed Save Icon, Or just Save Icon

SVI it's animated icon wrote with CSS3/JS.
CSS3 here using animations and transitions for change the icon from one state to another.
JS here for managing states of the icon, handling events of the icon.
Just check how it works here:
https://mrveress.github.io/svi/demo/demo-umd.html

## CDN Links
This package is available at npm, and I strongly recommend to use npm CDN for JS/CSS links:
- For UMD (Universal Module Definition) JS - https://unpkg.com/svi/dist/svi.umd.min.js
- For ESM (ES Module) JS - https://unpkg.com/svi/dist/svi.esm.min.js
- For CSS - https://unpkg.com/svi/dist/svi.min.css

## How to initialize with UDM (Universal Module Definition)
- Import CSS in your HTML
```html
<link rel="stylesheet" type="text/css" href="https://unpkg.com/svi/dist/svi.min.css"/>
```
- Import UMD JS in your HTML
```html
<script src="https://unpkg.com/svi/dist/svi.umd.min.js"></script>
```
- Add some div (use it as root element for save icon)
```html
<div id="sample-save-icon"></div>
```
- After the div (or in the end of the body of the document, or in ```document.addEventListener("DOMContentLoaded",()=>{})``` run next JS code:
```js
let saveIcon = new svi(document.querySelector("#sample-save-icon"), true);
```

## How to initialize with ESM (ES Module)
- Import CSS in your HTML
```html
<link rel="stylesheet" type="text/css" href="https://unpkg.com/svi/dist/svi.min.css"/>
```
- Add some div (use it as root element for save icon)
```html
<div id="sample-save-icon"></div>
```
- Import ESM JS and implement your JS in your HTML (or move all of this to separated JS module)
```html
<script type="module">
    import svi from "https://unpkg.com/svi/dist/svi.esm.min.js";
    let saveIcon = new svi(document.querySelector("#save-icon"), true);
</script>
```