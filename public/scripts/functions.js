function cursorBlink(times, stop_disabled) {
    var $txt = $("textarea").text().slice(0, -1);
    var tracker = 0;
    $(document).keypress(function(e) {
        if (e.which === 13 && stop_disabled !== true) {
            clearInterval(blinking);
        }
    });
    var blinking = setInterval(function() {
        if (($("textarea").text()).slice(-1) === "|") {
            $("textarea").text($txt + " ");
        } else {
            $("textarea").text($txt + "|");
        }
        tracker++;
        if (tracker === times) {
            clearInterval(blinking);
        }
    }, 500);
}

function log(text_input) {
    if ($("#log_clear").is(":checked")) {
        $("textarea").text("");
    }
    var char = 0;
    var $txt = $("textarea").text();
    if ($("#auto_skip").is(":checked")) {
        $("textarea").text($txt + text_input[0]);
        $("textarea").scrollTop($("textarea")[0].scrollHeight);
        if (text_input.length > 1) {
            cursorBlink();
            var new_text_input = text_input.slice(1);
            var new_text_pressed = false;
            $(document).keypress(function(e) {
                if (e.which === 13 && new_text_pressed === false) {
                    new_text_pressed = true;
                    $("textarea").text($("textarea").text() + "\n\n");
                    log(new_text_input);
                }
            });
        } else {
            $("textarea").text($("textarea").text() + "\n\n");
            document.getElementById("input").disabled = false;
            $("#input").focus();
        }
    } else {
        var $skip_pressed = false;
        var disable_$skip = false;
        setTimeout(function() {
            var $skip = $(document).keypress(function(e) {
                if (e.which === 13 && $skip_pressed === false && disable_$skip === false) {
                    $skip_pressed = true;
                    $("textarea").text($txt + text_input[0] + "\n" + "|");
                    $("textarea").scrollTop($("textarea")[0].scrollHeight);
                    clearInterval(logging);
                    disable_$skip = true;
                    if (text_input.length > 1) {
                        cursorBlink();
                        var new_text_input = text_input.slice(1);
                        var new_text_pressed = false;
                        $(document).keypress(function(e) {
                            if (e.which === 13 && new_text_pressed === false) {
                                new_text_pressed = true;
                                $("textarea").text($("textarea").text().slice(0, -1) + "\n");
                                log(new_text_input);
                            }
                        });
                    } else {
                        $("textarea").text($("textarea").text().slice(0, -1));
                        document.getElementById("input").disabled = false;
                        $("#input").focus();
                    }
                }
            });
        }, 100);
        var logging = setInterval(function() {
            char++;
            $("textarea").text($txt + text_input[0].substring(0, char) + "|");
            $("textarea").scrollTop($("textarea")[0].scrollHeight);
            if (char === text_input[0].length) {
                $("textarea").text($("textarea").text().slice(0, -1) + "\n" + "|");
                clearInterval(logging);
                disable_$skip = true;
                $("textarea").scrollTop($("textarea")[0].scrollHeight);
                if (text_input.length > 1) {
                    cursorBlink();
                    var new_text_input = text_input.slice(1);
                    var new_text_pressed = false;
                    $(document).keypress(function(e) {
                        if (e.which === 13 && new_text_pressed === false) {
                            new_text_pressed = true;
                            $("textarea").text($("textarea").text().slice(0, -1) + "\n");
                            log(new_text_input);
                        }
                    });
                } else {
                    $("textarea").text($("textarea").text().slice(0, -1));
                    document.getElementById("input").disabled = false;
                    $("#input").focus();
                }
            }
        }, (210 - $("#log_speed").val()));
    }
}

//Layout interactions
$(".slot").hover(function() {
    $(this).css({"border-color":"#FFFFFF", "color":"#FFFFFF"});
    }, function() {
    $(this).css({"border-color":"#272727", "color":"#4D94FF"});
});

$(".slot").mousedown(function() {
    $(this).css({"border-color":"#4D94FF", "color":"#4D94FF"});
});

$(".slot").mouseup(function() {
    $(this).css({"border-color":"#FFFFFF", "color":"#FFFFFF"});
});

$("#settings_button").click(function() {
    $("#dimmer").fadeTo("fast", 0.5);
    $("#settings").fadeIn(0);
    $("#dimmer").click(function() {
        $("#settings").fadeOut(0);
        $("#dimmer").fadeOut("fast");
    });
});

$("#auto_skip").click(function() {
    if ($("#auto_skip").is(":checked")) {
        $("#log_sound_effect_div, #log_speed_div").css({"opacity":"0.5"});
        document.getElementById("log_sound_effect").disabled = true;
        document.getElementById("log_speed").disabled = true;
    } else {
        $("#log_sound_effect_div, #log_speed_div").css({"opacity":"1"});
        document.getElementById("log_sound_effect").disabled = false;
        document.getElementById("log_speed").disabled = false;
    }
});