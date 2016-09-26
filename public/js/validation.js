
$(document).ready(function() {
    // console.log("foobar3");

    $("#footer-formNewsletter").validate({
        debug: true,
        submitHandler: function(form) {
            var $spinner = $(form).siblings('.formNewsletter__spinner');
            var $signupmsg = $(form).siblings('.formNewsletter__successMessage');
            $(form).fadeOut(400,function() {
                $spinner.fadeIn();
            });
            var $form = $("#footer-formNewsletter");
            $.post($form.attr("action"), $form.serialize()).then(function() {
                $spinner.fadeOut(400,function() {
                    var $spinner = $(form).siblings('.formNewsletter__successMessage');
                    $signupmsg.fadeIn();
                });
            });

            // form.submit();

            // $(".formNewsletter__successMessage").siblings().fadeOut( 1000, function() {
            //     $(".formNewsletter__successMessage").fadeIn();
            // });
        },
        errorPlacement: function(error, element) {
          error.appendTo("#footer-formNewsletter");
        },
        rules: {
            emailNewsletter: {
                required: true,
                email: true
            }
        },
        messages: {
            emailNewsletter: {
                required: "Please enter a valid email address.",
                email: "Please enter a valid email address."
            }
        },
    });
});
