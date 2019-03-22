$(document).ready(function() {
    $("#input").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            var text = $("#input").val();
            send(text);
        }
    });
    $("#rec").click(function(event) {
        switchRecognition();
    });
    $("#rowButton").click(function() {
        $("#myTable").append("<tr><td>Beer</td><td>$ 20.00 </td></tr>");
    });

    $( "#addRow" ).click(function() {
        addRow();
    });

    $( "#removeRow" ).click(function() {
        removeRow();
    });

    $( "#showHideTable" ).click(function() {
        toggleTable();
    });

    $( "#sortBtn" ).click(function() {
        $( "#stockTitle" ).click();
    });

    $( "#sortBtn" ).click(function() {
        $( "#stockTitle" ).click();
    });

    $( "#sortBtn" ).click(function() {
        $( "#stockTitle" ).click();
    });

    $( "#populate" ).click(function() {
        $("tbody").each(function(elem,index){
            var arr = $.makeArray($("tr",this).detach());
            arr.reverse();
            $(this).append(arr);
        });
    });


    $('#table').DataTable({
        "ordering": true // false to disable sorting (or any other option)
    });
    $('.dataTables_length').addClass('bs-select');

});