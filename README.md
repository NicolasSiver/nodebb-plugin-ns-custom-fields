# NodeBB: Custom Fields

Adds additional fields to the user's profile

![Version](https://img.shields.io/npm/v/nodebb-plugin-ns-custom-fields.svg)
![Dependencies](https://david-dm.org/NicolasSiver/nodebb-plugin-ns-custom-fields.svg)
![bitHound Score](https://www.bithound.io/github/NicolasSiver/nodebb-plugin-ns-custom-fields/badges/score.svg)
![Code Climate](https://img.shields.io/codeclimate/github/NicolasSiver/nodebb-plugin-ns-custom-fields.svg)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
 

- [Themes](#themes)
  - [Profile View](#profile-view)
- [TODO](#todo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Themes

### Profile View

Plugin provides additional Array under `customFields` field in user data for Account/Profile page.
Use import of template, here is a small example:

```html
<!-- IMPORT partials/account/custom_fields_panel.tpl -->
```

or

```html
<!-- IMPORT partials/account/custom_fields_two_columns.tpl -->
```

Result will look like panel with 2 columns.

(For example, see: https://community.nodebb.org/topic/4337/nodebb-plugin-ns-custom-fields-ns-custom-fields/41)

## TODO

- Edit Custom Field (key, name)
- Use Custom Fields in extended Tooltip for @mentions
- Use Sockets in ACP
- Add Sections to group custom fields
- Add Icons for custom field
- Add Parser handler to create additional formatting (Ex: by having Steam Id, create full url to the profile)
- Add Tests (Mocha/Tape)
- Add utility method: clear unused fields
- Drag-n-drop for Custom Fields order
