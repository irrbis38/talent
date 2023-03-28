"use strict";

// on ready
$(function () {
    // mobile menu
    $("#hamburger").on("click", openMobileMenu);
    $("#navMainClose").on("click", closeMobileMenu);

    // js-slider-main init
    if ($(".js-slider-main").length) {
        const slider = $(".js-slider-main");
        initSliderMain(slider);
    }

    // js-slider-reviews init
    if ($(".js-slider-reviews").length) {
        const slider = $(".js-slider-reviews");
        initSliderReviews(slider);
    }

    // js-slider-features init
    if ($(".js-slider-features-wrap").length) {
        $(".js-slider-features-wrap").each(function () {
            const sliderWrap = $(this);
            initSliderFeatures(sliderWrap);
        });
    }

    // js-slider-blogposts init
    if ($(".js-slider-blogposts").length) {
        const slider = $(".js-slider-blogposts");
        initSliderBlogposts(slider);
    }

    // js-slider-video init
    if ($(".js-slider-video").length) {
        const slider = $(".js-slider-video");
        initSliderVideo(slider);
    }

    // js-slider-press init
    if ($(".js-slider-press").length) {
        const slider = $(".js-slider-press");
        initSliderPress(slider);
    }

    // tabs functionality
    $(document).on("click", ".js-tabs-link", switchTabs);

    // file upload func
    $(".js-upload-input").on("change", uploadFile);

    // play video in popup
    playVideo();

    // open tab from another page
    if (window.location.hash) {
        $('.js-tabs-link[href="' + window.location.hash + '"]').click();
    }
});

// on load
$(window).on("load", function () {
    shaveTxt($(".js-blogpost-shave")); //shave.js init
    animateSectionTop();
    animateElementsInView();
    animateSliderReviews();
    showLeaderContentAutomatically();
});

// on scroll
$(window).on("scroll", function () {
    animateElementsInView();
    animateSliderReviews();
    showLeaderContentAutomatically();
});

// add body fixed position
const setBodyFixed = () => {
    const scrollDistance = $(window).scrollTop();
    $("body")
        .css("top", scrollDistance * -1)
        .addClass("is-fixed");
};

// remove body fixed position without jumping to top of page
const setBodyNotFixed = () => {
    const scrollDistance = parseInt($("body").css("top"), 10);
    $("body").css("top", "").removeClass("is-fixed");
    $(window).scrollTop(-scrollDistance);
};

// init slick slider (js-slider-main)
const initSliderMain = (slider) => {
    slider.slick({
        autoplaySpeed: 11000,
        fade: true,
        arrows: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true,
                },
            },
        ],
    });
};

// init slick slider (js-slider-blogposts)
const initSliderBlogposts = (slider) => {
    slider.slick({
        vertical: true,
        slidesToShow: 4,
        infinite: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    variableWidth: true,
                    vertical: false,
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 650,
                settings: {
                    variableWidth: true,
                    vertical: false,
                    slidesToShow: 1,
                },
            },
        ],
    });
};

// init slick slider (js-slider-video)
const initSliderVideo = (slider) => {
    slider.slick({
        variableWidth: true,
    });
};

// init slick slider (js-slider-press)
const initSliderPress = (slider) => {
    slider.slick({
        slidesToShow: 4,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    variableWidth: true,
                },
            },
        ],
    });
};

// init slick slider (js-slider-features)
const initSliderFeatures = function (wrap) {
    const sliderFeatures = wrap.find(".js-slider-features");
    const sliderThumbs = wrap.find(".js-slider-thumbs");

    sliderSettings = {
        arrows: false,
        fade: true,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    autoplay: false,
                },
            },
        ],
    };

    sliderFeatures.slick(sliderSettings);
    connectSliderToThumbs(sliderFeatures, sliderThumbs);
    connectThumbsToSlider(sliderThumbs);
};

const connectSliderToThumbs = (slider, thumbs) => {
    slider.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
        setTimeout(function () {
            thumbs.find(".is-current").removeClass("is-current");
            thumbs
                .find(".js-slider-thumb:nth-child(" + (nextSlide + 1) + ")")
                .addClass("is-current");
        }, 20);
    });
};

const connectThumbsToSlider = function (thumbs) {
    thumbs.find(".js-slider-thumb").on("click", function (evt) {
        evt.preventDefault();
        thumbs.find(".is-current").removeClass("is-current");
        $(this).addClass("is-current");
        thumbs
            .closest(".js-slider-features-wrap")
            .find(".js-slider-features")
            .slick("slickGoTo", $(this).index());
    });
};

// slick slider autoplay pause
const slickPause = (slider) => {
    slider.slick("slickPause");
};

// slick slider autoplay play
const slickPlay = (slider) => {
    slider.slick("slickPlay");
};

// init slick slider (js-slider-reviews)
const initSliderReviews = (slider) => {
    const slideNumber = slider.children().length;
    const sliderModule = document.querySelector(".js-slider-reviews-module");

    if (slideNumber < 5) {
        slider.slick({
            fade: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        adaptiveHeight: true,
                    },
                },
            ],
        });
    } else {
        renderDots(slideNumber, sliderModule);

        if ($(".js-slider-dots").length) {
            const dotsRendered = $(".js-slider-dots");

            dotsRendered.slick({
                slidesToShow: 4,
                arrows: false,
                vertical: true,
                asNavFor: slider,
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 4,
                            vertical: false,
                        },
                    },
                ],
            });

            slider.slick({
                fade: true,
                asNavFor: dotsRendered,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            adaptiveHeight: true,
                        },
                    },
                ],
            });
        }
    }
};

// create dots slider for slider with more then 4 slides
const createDot = (fragment) => {
    const sliderDotContainer = document.createElement("li");
    const sliderDot = document.createElement("div");

    sliderDotContainer.className = "slider-dots__slide";
    sliderDot.className = "slider-dots__dot";

    sliderDotContainer.appendChild(sliderDot);
    fragment.appendChild(sliderDotContainer);
};

const renderDots = (slides, module) => {
    const fragment = document.createDocumentFragment();
    const sliderDots = document.createElement("ul");

    sliderDots.className = "slider-dots js-slider-dots";

    for (let i = 0; i < slides; i++) {
        createDot(sliderDots);
    }

    fragment.appendChild(sliderDots);
    module.appendChild(fragment);
};

// main navigation
const openMobileMenu = (evt) => {
    evt.preventDefault();
    const navMain = $("#navMain");

    navMain.addClass("is-active");
    setBodyFixed();
};

const closeMobileMenu = (evt) => {
    evt.preventDefault();
    const navMain = $("#navMain");

    navMain.removeClass("is-active");
    setBodyNotFixed();
};

// tabs functionality
const switchTabs = function (evt) {
    evt.preventDefault();
    const tabsLink = $(this);
    const dataTab = tabsLink.attr("data-tab");
    const tabHash = tabsLink.attr("href");
    const tabsWrap = tabsLink.closest(".js-tabs-wrap");
    const tabsSlider = tabsWrap.find(".js-slider-features");
    let destination = tabsWrap.offset().top - $("#header").outerHeight();

    tabsWrap.find(".current-tab").removeClass("current-tab");
    tabsWrap
        .find(".js-tabs-content[data-tab=" + dataTab + "]")
        .addClass("current-tab");
    tabsLink.addClass("current-tab");
    window.location.hash = tabHash;

    $("html:not(:animated),body:not(:animated)").animate(
        { scrollTop: destination },
        900
    );

    // tab slider func
    if (dataTab === "2") {
        tabsSlider.removeClass("is-hidden");
    } else {
        tabsSlider.addClass("is-hidden");
    }
    if (tabsSlider.hasClass("slick-initialized")) {
        tabsSlider.slick("setPosition");
    }

    // animate js-animated section
    animateElementsInView();
};

// file upload functionality
const uploadFile = function () {
    const inputUpload = $(this);
    const uploadWrap = inputUpload.closest(".js-upload");
    const uploadName = uploadWrap.find(".js-upload-name");
    uploadName.text(this.files[0].name).addClass("has-file");
};

// play video
const playVideo = () => {
    $(".js-video").magnificPopup({
        type: "iframe",
        iframe: {
            patterns: {
                youtube: {
                    index: "youtube.com/",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1",
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1",
                },
            },
        },
    });
};

// shave.js functionality
const shaveTxt = (txt) => {
    txt.shave(56);
    $(window).on("resize", function () {
        txt.shave(56);
    });
};

// shoe leader content on load
const showLeaderContentAutomatically = () => {
    $(".js-leader-name").each(function () {
        if ($(this).isInViewport()) {
            const leaderBlock = $(this).closest(".js-leader-block");
            const leaderContent = leaderBlock.find(".js-leader-content");

            leaderBlock.addClass("is-active");
            leaderContent.slideDown(300);
        }
    });
};

// check if en element is in viewport
$.fn.isInViewport = function (gap) {
    if (gap === undefined) {
        gap = 0;
    }
    const elementTop = $(this).offset().top + gap;
    const elementBottom = elementTop + $(this).outerHeight();
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

// animate section top on main page
const animateSectionTop = () => {
    $(".js-section-top").addClass("is-animated");
    setTimeout(function () {
        $(".js-slider-main").addClass("is-autoplayed");
        slickPlay($(".js-slider-main"));
    }, 1500);
};

// animate js-slider-reviews
const animateSliderReviews = () => {
    setTimeout(function () {
        $(".is-animated .js-slider-reviews").each(function () {
            $(this).addClass("start-slide-effect");
        });
    }, 1000);
};

// animate elements if they are in view
const animateElementsInView = () => {
    $(".js-animated").each(function () {
        if ($(this).isInViewport()) {
            $(this).addClass("is-animated");
        }
    });
};

// JS UPDATE

document.addEventListener("DOMContentLoaded", function (event) {
    AOS.init({ once: true, duration: 500 });

    const menuItems = document.querySelectorAll(".navmain__link");
    const allHeaderDropdown = document.querySelectorAll(".header__dropdown");
    const allNavmainItems = document.querySelectorAll(".navmain__item");
    const allSubitems = document.querySelectorAll(".nav__subitem");
    const allLinksWithDropdown =
        document.querySelectorAll(".navmain__dropdown");
    const navmainClose = document.querySelector(".navmain__close");

    menuItems.forEach((el) =>
        el.addEventListener("mouseover", (event) => {
            headerLinksHoverHandler(event, menuItems, allHeaderDropdown);
        })
    );

    window.addEventListener("mouseover", (e) => {
        const isActiveMenuItem = e.target.closest(".navmain__item");
        const isActiveHeaderDropdown = e.target.closest(".header__dropdown");

        if (!(isActiveMenuItem || isActiveHeaderDropdown)) {
            menuItems.forEach((item) => item.classList.remove("active"));
            allNavmainItems.forEach((item) => item.classList.remove("active"));
            allHeaderDropdown.forEach((item) =>
                item.classList.remove("active")
            );
        }
    });

    allLinksWithDropdown.forEach((el) =>
        el.addEventListener("click", (e) =>
            headerLinksClickHandler(e, allNavmainItems, allSubitems)
        )
    );

    navmainClose.addEventListener("click", () => {
        allNavmainItems.forEach((item) => item.classList.remove("open"));
        allSubitems.forEach((item) => (item.style.maxHeight = null));
    });
});

const headerLinksHoverHandler = (e, menuItems, allHeaderDropdown) => {
    if (window.innerWidth > 1024) {
        if (!e.currentTarget.classList.contains("active")) {
            menuItems.forEach((item) => {
                item.classList.remove("active");
                item.parentElement.classList.remove("active");
            });
            allHeaderDropdown.forEach((item) =>
                item.classList.remove("active")
            );

            const currentNavmainLink = e.currentTarget;
            const currentID = currentNavmainLink.dataset.dropdown;

            if (currentID) {
                const activeDropdown = document.getElementById(currentID);
                activeDropdown.classList.add("active");
                currentNavmainLink.classList.add("active");
                currentNavmainLink.parentElement.classList.add("active");
            }
        }
    }
};

const headerLinksClickHandler = (e, allLinks, allSublinks) => {
    if (window.innerWidth < 1024) {
        e.preventDefault();
        const link = e.currentTarget.closest(".navmain__item");
        const sublink = link.nextElementSibling;
        if (link.classList.contains("open")) {
            link.classList.remove("open");
            sublink.style.maxHeight = null;
        } else {
            allLinks.forEach((item) => item.classList.remove("open"));
            allSublinks.forEach((item) => (item.style.maxHeight = null));
            link.classList.add("open");
            sublink.style.maxHeight = sublink.scrollHeight + "px";
        }
    }
};
