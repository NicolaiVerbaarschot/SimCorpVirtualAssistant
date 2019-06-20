
const baseQueryObject = {
    columns: "*",
    filter: [],
    sort: "",
    order : "",
    group: "",
    search: ""
};

let queryObjectStack = [baseQueryObject];

// Only operation on client-side as it is state dependent
function undo() {
    if (queryObjectStack.length > 1) {
        queryObjectStack.pop();
    } else {
        alert("You reached the base view. Cannot undo more actions.");
    }
}