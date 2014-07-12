var current_position;

function game_start(input_val) {
    switch (input_val) {
        case "start": case "start game": case "game start": case "begin": case "go":
            $("textarea").text("");
            setTimeout(function() {
                cursorBlink(6, true);
                setTimeout(function() {
                    $("textarea").text("");
                    log(game_start_log);
                    current_position = game_start2;
                }, 3500);
            }, 3000);
            break;
        default:
            log(incorrect_input);
    }
}

function game_start2(input_val) {
    switch (input_val) {
        case "get up": case "up": case "sit up": case "arise": case "wake up":
            log(game_start2_log);
            current_position = start_room;
            break;
        case "don't get up": case "lie down": case "stay down": case "do nothing": case "stay": case "go back to sleep": case "sleep":
            log(game_start_no_log);
            game_start_no_log = incorrect_input;
            break;
        default:
            log(incorrect_input);
    }
}

function start_room(input_val) {
    switch (input_val) {
        
        default:
            log(incorrect_input);
    }
}