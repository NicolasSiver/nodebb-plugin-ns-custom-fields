'use strict';

/* globals define, ajaxify, socket, app, config, utils, bootbox */

require([], function () {
    var fieldsMeta,
        idPrefix = 'field_',
        api      = {
            get : 'plugins.ns-custom-fields.getFields',
            save: 'plugins.ns-custom-fields.saveFields'
        };

    init();

    function init() {
        socket.emit(api.get, function (error, payload) {
            if (error) {
                return app.alertError(error.message);
            }

            fieldsMeta = payload;

            if (fieldsMeta.fields.length > 0) {
                renderFields();
            }
        });
    }

    function appendControl(form) {
        var actions = $('<div></div>').addClass('form-actions');
        var button = $('<a></a>')
            .addClass('btn btn-primary')
            .attr('href', '#')
            .text('Save Fields')
            .on('click', function () {
                saveFields(form);
            });

        actions.append(button);
        form.append($('<br/>'));
        form.append(actions);
    }

    function appendFields(form, fields, data) {
        var i = 0, len = fields.length, fieldKey, fieldEntity, content = data || {};

        for (i; i < len; ++i) {
            fieldEntity = fields[i];
            //Namespace fields to prevent collisions
            fieldKey = idPrefix + fieldEntity.key;
            var group = $('<div></div>').addClass('control-group');
            var label = $('<label></label>').addClass('control-label').text(fieldEntity.name).attr('for', fieldKey);
            var inputWrapper = $('<div></div>').addClass('controls');
            var input = $('<input>')
                .addClass('form-control')
                .attr('id', fieldKey)
                .attr('placeholder', fieldEntity.name)
                .attr('name', fieldKey)
                .val(content[fieldEntity.key]);

            group.append(label);
            group.append(inputWrapper);
            inputWrapper.append(input);

            form.append(group);
        }
    }

    function renderFields() {
        var row = $('.account :first-child');
        //Profile consists of 3 columns - Avatar, Profile, Password
        //Shrink columns
        var profile = $(row.children()[1]).attr('class', 'col-md-4');
        var password = $(row.children()[2]).attr('class', 'col-md-3');
        var customFields = $('<div></div>').addClass('col-md-3');
        var form = $('<form></form>').addClass('form-horizontal');

        profile.after(customFields);
        customFields.append(form);

        appendFields(form, fieldsMeta.fields, fieldsMeta.data);
        appendControl(form);
    }

    function saveFields(form) {
        var data = form.serializeArray().map(function (item) {
            return {
                name : item.name.replace(idPrefix, ''),
                value: item.value
            }
        });
        socket.emit(api.save, data, function (error) {
            if (error) {
                return app.alertError(error.message);
            }
            app.alertSuccess('Custom Fields are saved');
        });
    }
});