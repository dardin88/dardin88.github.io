$(document).ready(function () {
    $("#menu").load("menu.html", function () {
        if (document.location.href.indexOf("index.html") > -1) {
            $("#homeLink").addClass("activeMenuLink");
        } else if (document.location.href.indexOf("research.html") > -1) {
            $("#researchLink").addClass("activeMenuLink");
        } else if (document.location.href.indexOf("publications.html") > -1) {
            $("#publicationsLink").addClass("activeMenuLink");
        } else if (document.location.href.indexOf("teaching.html") > -1) {
            $("#teachingLink").addClass("activeMenuLink");
            $('#thesis').DataTable({
                "info": false,
                "lengthChange": false,
                "paging": true,
                "pageLength": 5,
                "searching": true,
                "order": [[ 3, "desc" ]]
            });
            $('#courses').DataTable({
                "info": false,
                "lengthChange": false,
                "paging": true,
                "pageLength": 5,
                "searching": true
            });
        } else if (document.location.href.indexOf("projects.html") > -1) {
            $("#projectsLink").addClass("activeMenuLink");
        } else if (document.location.href.indexOf("services.html") > -1) {
            $("#servicesLink").addClass("activeMenuLink");
        } else if (document.location.href.indexOf("awards.html") > -1) {
            $("#awardsLink").addClass("activeMenuLink");
        } else {
            $("#homeLink").addClass("activeMenuLink");
        }
    });
    $("#footer").load("footer.html");
});
