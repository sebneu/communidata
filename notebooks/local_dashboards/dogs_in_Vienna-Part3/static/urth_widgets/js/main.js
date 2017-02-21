/*
 * Copyright (c) Jupyter Development Team.
 * Distributed under the terms of the Modified BSD License.
 */
define([
    'require'
], function(require) {
    'use strict';

    var load_css = function (name) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = name;
        document.getElementsByTagName('head')[0].appendChild(link);
    };

    return {
        load_ipython_extension: function () {
            return new Promise(function(resolve) {
                //create a mapping for declarativewidgets and its dependencies
                requirejs.config({
                    map: {
                        '*': {
                            'jupyter-decl-widgets': 'nbextensions/declarativewidgets/js/widgets'
                        },
                        'nbextensions/declarativewidgets/js': {
                            'jupyter-js-widgets': 'ipywidgets4-or-jupyter-js-widgets'
                        }
                    },
                    paths: {
                        'ipywidgets4-or-jupyter-js-widgets': [
                            'does/not/exist',  //HACK: fallbacks was acting strange with 2 items
                            Jupyter.notebook.base_url+'nbextensions/widgets/widgets/js/widget',
                            Jupyter.notebook.base_url+'nbextensions/jupyter-js-widgets/extension',
                        ]
                    }
                });

                require([
                    'base/js/namespace',
                    'base/js/events',
                    './init/init'
                ],function(Jupyter, events, init) {
                    init({
                        namespace: Jupyter,
                        events: events
                    });

                    load_css(window.Urth._getModuleBasedComponentRoot() + 'css/main.css');
                    console.debug('loaded declarativewidgets');
                    resolve();
                });
            });
        }
    };
});
