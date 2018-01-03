angular.module('app').service('detailsService', function () {

    var selectedMSA = {};

    //CREATE MODIFY PANEL
    this.showCreateModify = function () { //Customize names of these to ids so they are specific to each panel
        $("#createModifyPanel").fadeIn(200);
        $(".filters-box").addClass("right-to-left");
        $(".filters-box").removeClass("left-to-right");
        $("body").addClass("no-scroll");
    }
    this.closeRightPanel = function () {
        $("#createModifyPanel").fadeOut(200);
        $(".filters-box").addClass("left-to-right");
        $(".filters-box").removeClass("right-to-left");
    }

    //DETAILS PANEL
    this.showDetails = function () {
        $("#detailsPanel").fadeIn(200);
        $(".filters-box").addClass("right-to-left");
        $(".filters-box").removeClass("left-to-right");
        $("body").addClass("no-scroll");
    }
    this.closeDetails = function () {
        $("#detailsPanel").fadeOut(200);
        $(".filters-box").addClass("left-to-right");
        $(".filters-box").removeClass("right-to-left");
    }

    //REJECT PANEL
    this.showReject = function () {
        $("#rejectPanel").fadeIn(200);
        $(".filters-box").addClass("right-to-left");
        $(".filters-box").removeClass("left-to-right");
        $("body").addClass("no-scroll");
    }
    this.closeReject = function () {
        $("#rejectPanel").fadeOut(200);
        $(".filters-box").addClass("left-to-right");
        $(".filters-box").removeClass("right-to-left");
        
    }

    //OTHER PANELS....
    //  this.showDetails = function() {
    //     $("#details").fadeIn(200);
    //     $(".filters-box").addClass("right-to-left");
    //     $(".filters-box").removeClass("left-to-right");
    //     $("body").addClass("no-scroll");
    // }
    // this.closeDetails = function() {
    //     $("#details").fadeOut(200);
    //      $(".filters-box").addClass("left-to-right");
    //      $(".filters-box").removeClass("right-to-left");
    // }

    //If I press ESC the side panel is closed 
    $(document).keyup(function (event) {
        if (event.which == 27) {
            $(".filters-box").addClass("left-to-right");
            $(".bcs-filters").fadeOut(200);
        }
    });
});