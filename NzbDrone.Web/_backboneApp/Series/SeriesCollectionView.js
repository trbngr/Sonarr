﻿'use strict';

define(['app', 'Quality/QualityProfileCollection', 'Series/SeriesItemView'], function (app, qualityProfileCollection) {
    NzbDrone.Series.SeriesCollectionView = Backbone.Marionette.CompositeView.extend({
        itemView: NzbDrone.Series.SeriesItemView,
        itemViewOptions: {},
        template: 'Series/SeriesCollectionTemplate',
        tagName: 'table',
        className: 'table table-hover',
        qualityProfileCollection: qualityProfileCollection,

        initialize: function () {
            this.collection = new NzbDrone.Series.SeriesCollection();
            this.collection.fetch();
            this.qualityProfileCollection.fetch();

            this.itemViewOptions = { qualityProfiles: this.qualityProfileCollection };
        },

        onShow: function () {
            this.$el.dataTable({
                sDom: "<'row'<'span14'l><'span6'f>r>t<'row'<'span14'i><'span6'p>>",
                sPaginationType: "bootstrap",
                bLengthChange: false,
                bPaginate: false,
                bFilter: true,
                aaSorting: [[1, 'asc']],
                bStateSave: true,
                iCookieDuration: 60 * 60 * 24 * 365, //1 year
                oLanguage: {
                    sInfo: "_TOTAL_ series",
                    sEmptyTable: "No series have been added"
                },
                aoColumns: [
                    {
                        sType: "title-string",
                        sWidth: "13px"
                    },
                    null,
                    null,
                    null,
                    null,
                    {
                        sType: "best-date"
                    },
                    {
                        bSortable: false,
                        sWidth: "125px"
                    },
                    {
                        bSortable: false,
                        sWidth: "50px"
                    }
                ]
            });
        }
    });

});
