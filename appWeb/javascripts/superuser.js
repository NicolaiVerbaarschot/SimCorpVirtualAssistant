
var keycode = $.ui.keyCode = {
    BACKSPACE: 8,
    COMMA: 188,
    DELETE: 46,
    DOWN: 9, // Swapped DOWN from 40 to 9 (TAB) TO REPLACE BEHAVIOUR
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    LEFT: 37,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PERIOD: 190,
    RIGHT: 39,
    SPACE: 32,
    TAB: 9,
    UP: 38
};

$( function() {
    var availableTags;
    var columnTags = ["Symbol", "Type", "Price", "QC", "Total_QTY", "Total_Price", "Maturity_Date", "Dirty_Value_QC", "Dirty_Value_PC", "Dirty_Value_RC"]
    //TODO fetch from db - same as in main.js

    function split( val ) {
        return val.split( / \s*/ );
    }

    function extractLast( term ) {
        return split( term ).pop();
    }

    function getFirstWord (str) {
        return str.split(" ")[0]
    }

    function updateTags(inputString) {
        let firstWord = getFirstWord(inputString);
        if (firstWord === "help") {return ["me please"];}
        else if (firstWord === "tableQuery") {return ["SELECT"];}
        else if (firstWord === "graphQuery") {return ["SELECT Symbol,"];}
        else {return ["help", "tableQuery", "graphQuery"];}
    }

    $( "#superuserInput" )
    // don't navigate away from the field on tab when selecting an item
        .on( "keydown", function( event ) {

            const input = $("#superuserInput");
            const output = $("#superuserResults");

            availableTags = updateTags(input.val());

            // Handles whether enter selects suggestion or submits
            if (event.keyCode === $.ui.keyCode.ENTER &&
                (!$('.ui-menu').is(':visible') || !$(this).autocomplete("instance").menu.active)
                && input.val() !== "") {

                const command = input.val();

                output.append("\n" + command + ":");

                $.ajax({
                    url: "http://localhost:8080/api/superuser/"+command
                })
                    .done(function( data ) {
                        output.append("\n");
                        output.append(data.toString());
                        const objDiv = document.getElementById("superuserResults");
                        objDiv.scrollTop = objDiv.scrollHeight;
                    });
                input.val("");
            }

            // Prevent tab default behaviour when focused on input field
            if ( event.keyCode === $.ui.keyCode.TAB) {
                event.preventDefault();
            }
        })

        // taken from jquery api documentation
        .autocomplete({
            autofocus: true,
            minLength: 0,
            source: function( request, response ) {
                // delegate back to autocomplete, but extract the last term
                response( $.ui.autocomplete.filter(
                    availableTags, extractLast( request.term ) ) );
            },
            position: { my: "left bottom", at: "left top", collision: "flip" },
            focus: function() {
                // prevent value inserted on focus
                return false;
            },
            select: function( event, ui ) {
                var terms = split( this.value );
                // remove the current input
                terms.pop();
                // add the selected item
                terms.push( ui.item.value );
                // add placeholder to get the comma-and-space at the end
                terms.push( "" );
                this.value = terms.join( " " );
                return false;
            }
        });
} );
