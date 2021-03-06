﻿ 'use strict';

define([
    'vent',
    'AppLayout',
    'marionette',
    'Settings/Indexers/Delete/IndexerDeleteView',
    'Commands/CommandController',
    'Mixins/AsModelBoundView',
    'Mixins/AsValidatedView',
    'Mixins/AsEditModalView',
    'Form/FormBuilder',
    'Mixins/AutoComplete',
    'bootstrap'
], function (vent, AppLayout, Marionette, DeleteView, CommandController, AsModelBoundView, AsValidatedView, AsEditModalView) {

    var view = Marionette.ItemView.extend({
        template: 'Settings/Indexers/Edit/IndexerEditViewTemplate',

        events: {
            'click .x-back' : '_back'
        },

        _deleteView: DeleteView,

        initialize: function (options) {
            this.targetCollection = options.targetCollection;
        },

        _onAfterSave: function () {
            this.targetCollection.add(this.model, { merge: true });
            vent.trigger(vent.Commands.CloseModalCommand);
        },

        _onAfterSaveAndAdd: function () {
            this.targetCollection.add(this.model, { merge: true });

            require('Settings/Indexers/Add/IndexerSchemaModal').open(this.targetCollection);
        },

        _back: function () {
            if (this.model.isNew()) {
                this.model.destroy();
            }

            require('Settings/Indexers/Add/IndexerSchemaModal').open(this.targetCollection);
        }
    });

    AsModelBoundView.call(view);
    AsValidatedView.call(view);
    AsEditModalView.call(view);

    return view;
});
