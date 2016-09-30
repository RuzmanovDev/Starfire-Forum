import Sammy from 'sammy'
import 'jquery'
import {kinveyConst} from 'kinvey-constants'
import {userController} from 'user-controller'
import {threadController} from 'thread-controller'
import {requester} from 'requester'

const wrapper = '#wrapper';

const sammyApp = Sammy(wrapper, function () {
    // User handling routes
    this.get('#/register', userController.register);
    this.get('#/login', userController.login);
    this.get('#/logout', userController.logout);

    // navigation routes
    this.get('#/home', threadController.home);
    this.get('#/askQuestion', threadController.askQuestion);

    // Categories routes
    this.get('#/ios', ()=> threadController.showThread('ios'));
    this.get('#/javascript', ()=> threadController.showThread('javascript'));
    this.get('#/csharp', ()=> threadController.showThread('csharp'));

    this.get('#/components', threadController.components);

    this.get('#/:id', threadController.showQuestion);

    this.get('#/', threadController.home);

});

sammyApp.run('#/');

$(function(){

    /// да, да.. знам, че не трябва да е тука
    /// ще го махна по някое време
    ///

    $(".navigation").each(function(){
        calcIndicatorWidth.call(this);
    })
    function calcIndicatorWidth() {
        let indicator   = $(this).find(".activity-indicator"),
            active      = $(this).find(".active").length ? $(this).find(".active") : $(this).find(" > a").eq(0).addClass("active"),
            activeIndex = $(this).attr("activeIndex") || 0;


        if(activeIndex < active.index()) {
            indicator.addClass("to-right").removeClass("to-left");
        }
        else {
            indicator.addClass("to-left").removeClass("to-right");
        }

        indicator.css({
            "margin-left"  : active.position().left,
            "margin-right" : $(this).width() - (active.outerWidth() + active.position().left)
        })
        $(this).attr("activeIndex", active.index());
    }

    $(document).on("click", ".navigation", calcIndicatorWidth);

    $(document).on("click", ".navigation > a", function(e) {
        $(this).addClass("active")
            .siblings().removeClass("active");

        $(this).parent().trigger("click");
    });

    $(window).resize(function() {
        $(".navigation").each(function(){
            calcIndicatorWidth.call(this);
        })
    })
})