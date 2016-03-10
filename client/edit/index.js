/* globals define, ajaxify, socket, app, config, utils, bootbox */

define('forum/client/plugins/custom-fields-edit', [], function () {
    'use strict';

    var Edit = {};

    var idPrefix = 'field_',
        api      = {
            get : 'plugins.ns-custom-fields.getFields',
            save: 'plugins.ns-custom-fields.saveFields'
        };

    Edit.init = function () {
        renderFields($('.custom-fields'));
    };

    Edit.save = function () {
        var $form = $('.form-horizontal');
        var data = $form.serializeArray().map(function (item) {
            return {
                name : item.name.replace(idPrefix, ''),
                value: item.value
            }
        });

        socket.emit(api.save, {uid: ajaxify.data.theirid, data: data}, function (error) {
            if (error) {
                return app.alertError(error.message);
            }

            app.alertSuccess('Custom fields are saved.');
        });
    };

    function appendControl($container) {
        var $row = $('<div></div>').addClass('row');
        var $column = $('<div></div>').addClass('col-md-4 col-md-offset-4 form-actions');
        var $button = $('<a></a>')
            .addClass('btn btn-primary btn-block')
            .attr('href', '#')
            .text('Save')
            .on('click', function () {
                Edit.save();
            });

        $container.append($row);
        $row.append($column);
        $column.append($button);
    }

    function appendFields(columns, fields, data) {
        var i = 0, len = fields.length, fieldKey, fieldEntity, content = data || {};
        var j = 0, columnsLen = columns.length, $column;

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
            $column = columns[j];
            fieldEntity = fields[i];
            //Namespace fields to prevent collisions
            fieldKey = idPrefix + fieldEntity.key;
            var $group = $('<div></div>').addClass('control-group');
            var $label = $('<label></label>').addClass('control-label').text(fieldEntity.name).attr('for', fieldKey);
            var $wrapper = $('<div></div>').addClass('controls');
            var $control = renderer[fieldEntity.type](fieldKey, fieldEntity);

            $group.append($label);
            $group.append($wrapper);
            $wrapper.append($control);

            $column.append($group);

            if ((j + 1) % columnsLen == 0) {
                j = 0;
            } else {
                ++j;
            }
        }
    }

    // Create 3 column layout
    function renderFields($parent) {
        var $form = $('<form></form>').addClass('form-horizontal');
        var $row = $('<div></div>').addClass('row');
        var columns = [
            $('<div></div>').addClass('col-md-4'),
            $('<div></div>').addClass('col-md-4'),
            $('<div></div>').addClass('col-md-4')
        ];

        $parent.append($form);
        $form.append($row);
        columns.forEach(function ($column) {
            $row.append($column);
        });

        appendFields(columns, ajaxify.data.customFields.fields, ajaxify.data.customFields.data);
        appendControl($form);
    }

    return Edit;
});
