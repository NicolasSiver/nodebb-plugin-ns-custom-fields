# NodeBB: Custom Fields

Adds additional fields to the user's profile. Would you like to provide gender option for user profiles, or zodiac, or twitter handler, or facebook page, this plugin will help you.

![Version](https://img.shields.io/npm/v/nodebb-plugin-ns-custom-fields.svg)
![Dependencies](https://david-dm.org/NicolasSiver/nodebb-plugin-ns-custom-fields.svg)
![bitHound Score](https://www.bithound.io/github/NicolasSiver/nodebb-plugin-ns-custom-fields/badges/score.svg)
![Code Climate](https://img.shields.io/codeclimate/github/NicolasSiver/nodebb-plugin-ns-custom-fields.svg)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
 

- [Screenshots](#screenshots)
  - [Field Management](#field-management)
  - [Field Creation](#field-creation)
- [Themes](#themes)
  - [Profile View](#profile-view)
- [TODO](#todo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Screenshots

### Field Management

![Custom Fields List](screenshot.png)

### Field Creation

![Field Creation](screenshot2.png)

## Themes

### Profile View

Plugin provides additional collection under `customFields` field in user data for Account/Profile page.

You can use predefined templates via `IMPORT` directive.

**NodeBB 1.x.x**, Persona, Flex Version (insert link on template in user's profile template wherever you like):

```html
<!-- IMPORT partials/account/custom_fields_flex.tpl -->
```

For old versions of NodeBB/Persona you could use legacy templates:

```html
<!-- IMPORT partials/account/custom_fields_panel.tpl -->
```

or

```html
<!-- IMPORT partials/account/custom_fields_two_columns.tpl -->
```

## TODO

- Use Custom Fields in extended Tooltip for @mentions
- Use Sockets in ACP
- Add Sections to group custom fields
- Add Icons for custom field
- Add Parser handler to create additional formatting (Ex: by having Steam Id, create full url to the profile)
- Add Tests (Mocha/Tape)
- Add utility method: clear unused fields
- Layout designer for Edit page
- Group custom fields, i.e. IM, Networks, etc.
