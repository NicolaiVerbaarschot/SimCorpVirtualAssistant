const accessToken = "fe3ac7ce30b340d1b6802eb18de04809";
const baseUrl = "https://api.api.ai/v1/";
const localHost = "http://localhost:8080/";

const baseQueryObject = {
    columns: "*",
    filter: [],
    sort: "",
    order : "",
    group: "",
    search: ""
};

let queryObjectStack = [baseQueryObject];

const columnPositions = ["Symbol", "Market", "Price", "OpenPrice", "DailyHigh", "DailyLow", "PointChangeToday", "PercentChangeToday"];
let modColumns = columnPositions.slice();
//TODO: can these column names be fetched from the database? Would make the program a lot more robust. The column names
//TODO: in DB, DialogFlow, and here have to be consistent! - Do after refactor

// ---------------------------------------------- Table Operations ---------------------------------------------- //

function undo() {
    if (queryObjectStack.length > 1) {
        queryObjectStack.pop();
    } else {
        alert("You reached the base view. Cannot undo more actions.");
    }
}