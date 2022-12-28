let iconClasses;
let headerLinksStyle;

document.addEventListener("DOMContentLoaded", function () {
    iconClasses = document.getElementById('icon').classList;
    headerLinksStyle = document.getElementById('header-links').style;

    if (window.innerWidth < 640) {
        document.getElementById('icon').style.inset='0% 0% 0% 100%';
        headerLinksStyle.opacity = 0;
    }
});

function onClickMenu() {

        if (iconClasses.contains('fa-bars')) {
            iconClasses.replace('fa-bars', 'fa-xmark');
            document.getElementById('icon').style.inset='0% 100% 0% 0%';
            headerLinksStyle.opacity = 1;
        } else {
            iconClasses.replace('fa-xmark', 'fa-bars')
            headerLinksStyle.opacity = 0;
            document.getElementById('icon').style.inset='0% 0% 0% 100%';
        }
};

window.addEventListener('resize', function () {
    if (window.innerWidth < 640 && iconClasses.contains('fa-bars')) {
        document.getElementById('icon').style.inset='0% 0% 0% 100%';
        headerLinksStyle.opacity = 0;
    } else {
        headerLinksStyle.opacity = 1;
        document.getElementById('icon').style.inset='0% 100% 0% 0%';
    }
})