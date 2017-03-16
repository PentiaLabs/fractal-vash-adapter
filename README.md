# Vash Adapter

Use Vash templates with Fractal.

See the Fractal [view templates guide](http://fractal.build/guide/core-concepts/views) for details on customisation and usage.

## Setup

In fractal.js put in:

```
const vash = require('@pentia/fractal-vash-adapter')({
    helpersName: 'html'
});

fractal.components.engine(vash);

fractal.components.set('ext', '.cshtml');
```

And you should be good to go.