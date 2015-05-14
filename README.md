# NodeBB: Custom Fields

Adds additional fields to the user's profile

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
 

- [Themes](#themes)
  - [Integration](#integration)
  - [Supported Themes](#supported-themes)
- [TODO](#todo)
- [Changelog](#changelog)
  - [v1.1.1 - 26.04.2015](#v111---26042015)
  - [v1.1.0 - 25.04.2015](#v110---25042015)
  - [v1.0.1 - 24.04.2015](#v101---24042015)
  - [v1.0.0 - 24.04.2015](#v100---24042015)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Themes

## Profile View

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

# TODO

- Edit Custom Field (key, name)
- Use Custom Fields in extended Tooltip for @mentions
- Use Sockets in ACP
- Add Sections to group custom fields
- Add Icons for custom field
- Add Parser handler to create additional formatting (Ex: by having Steam Id, create full url to the profile)
- Add Tests (Mocha/Tape)
- Just append client script to edit template without swapping whole template file - account/edit.tpl
- Add utility method: clear unused fields
- Add prompt message for custom fields in user's profile

> Pull Requests are welcome ;)

# Changelog

## v1.2.0 - x.x.2015

- Use RequireJS for Admin Panel
- Use Less in plugin
- No need for swap of Account Edit View
- Added templates: panel and two columns
- Field Types support: Input (default) and Select

## v1.1.1 - 26.04.2015

- Fix user profile reference 
- Fix initialisation of the plugin

## v1.1.0 - 25.04.2015

- New Feature: Settings
- New Feature: custom fields in topic view

## v1.0.1 - 24.04.2015

- Fix for empty user objects

## v1.0.0 - 24.04.2015

- Very first release
