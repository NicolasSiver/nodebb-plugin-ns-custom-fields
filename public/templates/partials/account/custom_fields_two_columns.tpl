<div class="panel panel-default">
    <div class="panel-body text-center">

        <!-- IF customFields.length -->
        <div class="row">
            <div class="col-md-6">
                <!-- ENDIF customFields.length -->

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
                <span class="human-readable-number account-bio-value" title="{followingCount}">{followingCount}</span>

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

                <!-- IF customFields.length -->
            </div>
            <div class="col-md-6 ns-custom-fields">
                <!-- BEGIN customFields -->
                <span class="account-bio-label">{customFields.name}</span>
                <span class="account-bio-value">{customFields.value}</span>
                <!-- END customFields -->
            </div>
        </div>
        <!-- ENDIF customFields.length -->
    </div>
</div>