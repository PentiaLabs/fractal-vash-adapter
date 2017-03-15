'use strict';

const vash = require('vash');
const Adapter = require('@frctl/fractal').Adapter;

class VashAdapter extends Adapter {
     constructor(vash, source, app) {
        super(vash, source);
        
        this._app = app;
        this.this.viewsLoaded = false;
    }

    loadViews (source) {
        for (let item of source.flattenDeep()) {
            if (item.isDefault) {
                if (item.content) {
                    vash.install(item.path.replace('--default', ''), item.content)
                } else {
                    console.error(item.path, 'is empty, please add content');
                }

            }
            vash.install(item.path, item.content)
            if (item.alias) {
                vash.install(item.alias, item.content)
            }
        }
        this.viewsLoaded = true;
    }

    render(path, str, context, meta) {
        if (!this.viewsLoaded) loadViews(source);
            const template = vash.compile(str);
            context.cache = true;
            return Promise.resolve(template(context));
    }
}

module.exports = function(config) {
    if (typeof config !== 'undefined') {
        vash.config = config;
    }

    vash.helpers.tplcache = {}

    return {
        register(source, app) {
            return new VashAdapter(require('vash'), source);
        }
    }
};