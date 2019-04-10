var Fuse = require('fuse.js');

var documents = [{
    // Versions Document
    title: 'Versions',
    section: 'Vivan',
    body: 'Vivan was the first chat bot to be implemented.',
    tags: ['vivan']
}, {
    title: 'Versions',
    section: 'Vivo',
    body: 'Vivan was the second chat bot to be implemented.',
    tags: ['vito']
},
    // Website Layout Document
    {
    title: 'Website Layout',
    section: 'Assistant',
    body: 'The assistant can be found in the upper right corner',
    tags: ['assistant', 'layout']
}, {
    title: 'Website Layout',
    section: 'Queries',
    body: 'The queries can be found in the top left corner',
    tags: ['queries', 'layout']
    }];

var options = {
    keys: [{
        name: 'title',
        weight: 0.4
    }, {
        name: 'section',
        weight: 0.7
    },{
        name: 'body',
        weight: 0.3
    }]
};

var fuse = new Fuse(documents, options);

exports.fuse = fuse;
exports.documents = documents;