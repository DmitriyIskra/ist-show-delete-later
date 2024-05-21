$(document).ready(function () {
    let tabsItem = $('.tabs__item');
    let contentItem = $('.content__item');

    tabsItem.on("click", function (event){
        let activeContent = $(this).attr("data-target");
        tabsItem.removeClass("tabs__item--active");
        contentItem.removeClass("content__item--active"); 
        $(activeContent).toggleClass("content__item--active");
        $(this).addClass("tabs__item--active")
    });
});