'use strict';

/* globals define, ajaxify, socket, app, config, utils, bootbox */

$(document).ready(function () {
    var fieldsMeta,
        idPrefix = 'field_',
        api      = {
            get : 'plugins.ns-custom-fields.getFields',
            save: 'plugins.ns-custom-fields.saveFields'
        };

    $(window).on('action:ajaxify.contentLoaded', function (ev, data) {
        //Persona Theme
        if (data.tpl === 'account/edit') {
            init();
        }
    });

    function init() {
        socket.emit(api.get, {uid: app.user.uid}, function (error, payload) {
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

        var renderer = {
            input: function (key, entity) {
                return $('<input>')
                    .addClass('form-control')
                    .attr('id', key)
                    .attr('name', key)
                    .attr('placeholder', entity.prompt)
                    .val(content[entity.key]);
            },

            select: function (key, entity) {
                var selectedId = content[entity.key];
                var selected = false;
                var select = $('<select></select>').addClass('form-control').attr('name', key);

                //Prompt option
                var promptOption = $('<option></option>')
                    .attr('value', 'default')
                    .attr('disabled', 'disabled')
                    .text(entity.prompt)
                    .appendTo(select);

                entity.options.forEach(function (item, index) {
                    var option = $('<option></option>')
                        .attr('value', item.id)
                        .text(item.text);
                    if (selectedId == item.id) {
                        selected = true;
                        option.prop('selected', true);
                    }
                    option.appendTo(select);
                });

                if (!selected) {
                    promptOption.prop('selected', true);
                }

                return select;
            }
        };

        for (i; i < len; ++i) {
            fieldEntity = fields[i];
            //Namespace fields to prevent collisions
            fieldKey = idPrefix + fieldEntity.key;
            var group = $('<div></div>').addClass('control-group');
            var label = $('<label></label>').addClass('control-label').text(fieldEntity.name).attr('for', fieldKey);
            var wrapper = $('<div></div>').addClass('controls');
            var control = renderer[fieldEntity.type](fieldKey, fieldEntity);

            group.append(label);
            group.append(wrapper);
            wrapper.append(control);

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
        socket.emit(api.save, {uid: app.user.uid, data: data}, function (error) {
            if (error) {
                return app.alertError(error.message);
            }
            app.alertSuccess('Custom Fields are saved');
        });
    }
});
