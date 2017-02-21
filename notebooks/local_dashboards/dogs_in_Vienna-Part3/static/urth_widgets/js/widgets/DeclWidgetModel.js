// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

define(["jupyter-js-widgets"], function(widgets) {
    "use strict";

    /**
     * Collection of patches on top of ipywidgets.WidgetModel
     */
    var DeclWidgetModel = widgets.WidgetModel.extend({
        constructor: function() {
            widgets.WidgetModel.apply(this, arguments);
            // WidgetModel expects widgets' state to be set from kernel and won't
            // set `_first_state` to false until that happens. But DeclWidgets
            // are different: we do initial setup on client and then notify kernel.
            this._first_state = false;
        },

        /*
         * Avoiding out of sequence messages due to new promise/async code in WidgetModel
         */
        send_sync_message: function(attrs, callbacks) {
            var data = {method: 'backbone', sync_data: attrs};
            this.comm.send(data, callbacks);
        }
    });
    
    return {
        DeclWidgetModel: DeclWidgetModel
    };

});