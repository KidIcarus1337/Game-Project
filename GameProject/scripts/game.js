$(document).ready(function() {
    //Link other Javascript files
    $.getScript("scripts/functions.js", function() {
        $.getScript("scripts/pathing.js", function() {
            $.getScript("scripts/logs.js", function() {
                //Game intro
                cursorBlink(3, true);
                setTimeout(function() {
                    $("textarea").text("");
                    log(opening_log);
                }, 2000);
                current_position = game_start;
                $("#input").keypress(function(e) {
                    if (e.which === 13 && $("#input").val() !== "") {
                        document.getElementById("input").disabled = true;
                        var input_val = $("#input").val().toLowerCase();
                        $("#input").val("");
                        if ($("#auto_skip").is(":checked")) {
                            current_position(input_val);
                        } else {
                            $("textarea").text($("textarea").text() + "\n" + "|");
                            $("textarea").scrollTop($("textarea")[0].scrollHeight);
                            cursorBlink(1, true);
                            setTimeout(function() {
                                $("textarea").text($("textarea").text().slice(0, -1));
                                current_position(input_val);
                            }, 1000);
                        }
                    }
                });
            });
        });
    });
});