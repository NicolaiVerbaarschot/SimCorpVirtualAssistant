
module.exports = function (data) {
    let labels = [];
    let vals = [];
    let attribute = Object.keys(data[0])[1];

    data.forEach(function (entry) {
        labels.push(entry.Symbol);
        vals.push(entry[attribute]);
    });

    return [labels, vals, attribute];
};