# NodeBB: Custom Fields

Adds additional fields to the user's profile

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
 

- [Themes](#themes)
  - [Integration](#integration)
  - [Supported Themes](#supported-themes)
- [TODO](#todo)
- [Changelog](#changelog)
  - [v1.0.1 - 24.04.2015](#v101---24042015)
  - [v1.0.0 - 24.04.2015](#v100---24042015)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Themes

## Integration

Plugin provides additional Array under `customFields` field in user data for Account/Profile page.
Here is a small example of integration to *Vanilla* theme.

```html
<div class="panel panel-default">
    <div class="panel-body text-center">

        <div class="row">
            <!-- IF customFields.length --><div class="col-md-6"><!-- ENDIF customFields.length -->
            <!-- IF !customFields.length --><div class="col-md-12"><!-- ENDIF !customFields.length -->
                <!-- IF email -->
                <span class="account-bio-label">[[user:email]]</span>
                <span class="account-bio-value"><i class="fa fa-eye-slash {emailClass}" title="[[user:email_hidden]]"></i> {email}</span>
                <!-- ENDIF email -->

                <!-- IF fullname -->
                <span class="account-bio-label">[[user:fullname]]</span>
                <span class="account-bio-value">{fullname}</span>
                <!-- ENDIF fullname -->

                <!-- IF websiteName -->
                <span class="account-bio-label">[[user:website]]</span>
                <span class="account-bio-value"><a href="{website}">{websiteName}</a></span>
                <!-- ENDIF websiteName -->

                <!-- IF location -->
                <span class="account-bio-label">[[user:location]]</span>
                <span class="account-bio-value">{location}</span>
                <!-- ENDIF location -->

                <!-- IF age -->
                <span class="account-bio-label">[[user:age]]</span>
                <span class="account-bio-value">{age}</span>
                <!-- ENDIF age -->


                <span class="account-bio-label">[[user:followers]]</span>
                <span class="human-readable-number account-bio-value" title="{followerCount}">{followerCount}</span>

                <span class="account-bio-label">[[user:following]]</span>
                <span class="human-readable-number account-bio-value"  title="{followingCount}">{followingCount}</span>

                <span class="account-bio-label">[[user:joined]]</span>
                <span class="timeago account-bio-value" title="{joindate}"></span>

                <span class="account-bio-label">[[user:lastonline]]</span>
                <span class="timeago account-bio-value" title="{lastonline}"></span>

                <!-- IF !disableSignatures -->
                <!-- IF signature -->
                <hr/>
                <span class="account-bio-label">[[user:signature]]</span>
                <div class="post-signature">
                    <span id='signature'>{signature}</span>
                </div>
                <!-- ENDIF signature -->
                <!-- ENDIF !disableSignatures -->
            </div>
            <!-- IF customFields.length -->
            <div class="col-md-6">
                <!-- BEGIN customFields -->
                    <span class="account-bio-label">{customFields.name}</span>
                    <span class="account-bio-value">{customFields.value}</span>
                <!-- END customFields -->
            </div>
            <!-- ENDIF customFields.length -->
        </div>
    </div>
</div>
```

Result will look like panel with 2 columns.

## Supported Themes

Currently there is no theme with support for Custom Fields.

| Theme | Package | Comments |
| ------------- | ----------- | ----------- |
| No themes | - | :( |

# TODO

- Edit Custom Field (key, name)
- Use Custom Fields in extended Tooltip for @mentions
- Use Theme agnostic solution
- Use Sockets in ACP
- Add Sections to group custom fields
- Add Custom Fields with multiple selection (Combobox)
- Add Icons for custom field
- Add Parser handler to create additional formatting (Ex: by having Steam Id, create full url to the profile)
- Add Tests (Mocha/Tape)
- Just append client script to edit template without swapping whole template file - account/edit.tpl
- Use template engine to build edit page
- Add utility method: clear unused fields
- Add prompt message for custom fields in user's profile

> Pull Requests are welcome ;)

# Changelog

## v1.1.0 - 25.04.2015

- New Feature: Settings
- New Feature: custom fields in topic view

## v1.0.1 - 24.04.2015

- Fix for empty user objects

## v1.0.0 - 24.04.2015

- Very first release
