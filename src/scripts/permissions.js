﻿var UserPermissionLevel = {
    VIEWER: 0,
    TRUSTED: 1,
    OWNER: 2
};

var levelString = function (level) {
    if (level == UserPermissionLevel.VIEWER) { return "Viewer"; }
    if (level === UserPermissionLevel.TRUSTED) { return "Trusted"; }
    if (level === UserPermissionLevel.OWNER) { return "Owner"; }
    else { return "Value is not a UserPermissionLevel"; }
}


var SyncPermissionsManager = {
    permissionLevel: UserPermissionLevel.VIEWER,

    modifyPermissions: function (level) {
        console.log("Modified permissions: " + levelString(this.permissionLevel) + " to " + levelString(level));

        if (level != this.permissionLevel) {
            $.growl({ style: 'notice', title: 'Notice', size: 'large', location: 'tc', fixed: false, message: "Your permissions have changed from " + levelString(this.permissionLevel) + " to " + levelString(level) });
        }
        this.permissionLevel = level;

        

        if (this.permissionLevel === UserPermissionLevel.VIEWER) {
            $(".controlItem").hide();
            $("#QueueName").attr('readonly', true);
            $("#queue-body").sortable("disable");
        }
        else if (this.permissionLevel === UserPermissionLevel.TRUSTED){
            $(".controlItem").show();
            $("#QueueName").attr('readonly', false);
            $("#queue-body").sortable("option", "disabled", false);
        }
        else if (this.permissionLevel === UserPermissionLevel.OWNER) {
            $(".controlItem").show();
            $("#QueueName").attr('readonly', false);
            $("#queue-body").sortable("option", "disabled", false);
        }

        SocketCommandManager.refreshUserList();
    }

};

