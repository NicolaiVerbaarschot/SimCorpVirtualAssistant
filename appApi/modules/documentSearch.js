const Fuse = require('fuse.js/dist/fuse.js');

const documents = [{

    // Versions Document
        title: 'Versions',
        section: 'Summary',
        body: 'Vito was not always as shiny and pretty as we know she is today. Before she was birthed, numerous other imlplementations were carrying the Vi-name! There exists three major Vi-versions; Vivan, Vivan Node, and Vito; The naming convention is no accident; Vivan represents version one or V1, Vivan Node reporesents the migration of Vivan to a Node.js, and finally Vito represents version 2 or V2.',
        tags: ['versions']
    }, {
        title: 'Versions',
        section: 'Vivan',
        body: 'Vivan was the initial implementation of the chat bot. It was implemeneted through basic HTML and Javacript, with all computations taking place on the front-end. It met some basic product requirements and provided a solid foundation for the development of Vivan Node.',
        tags: ['versions','vivan']
    }, {
        title: 'Versions',
        section: 'Vivan Node',
        body: 'Vivan Node is less of a complete version and more a stepping stone from Vivan to Vito. There were many funcionalities planned for the implementation of Vito, but a better architecture was desired to improve preformance and scalability. A better architecture also made it easier to design and plan new features for Vito. To achieve this Vivan was migrated, with the same basic funcionalities, to a node.js express app.',
        tags: ['versions','vivan node']
    },{
        title: 'Versions',
        section: 'Vito',
        body: 'Vito is the current, supported version of the chat bot. It was built directly off of Vivan Node, extending existing features as well as adding a slew of new ones.',
        tags: ['versions','vito']
    },

    // Website Document
    {
        title: 'Website',
        section: 'Navigation Bar',
        body: 'The navigation bar is located at the top of the homepage, and is persitant accross all sub-pages. It contains links to other pages in the following order; The SimCorp website, the assistant homepage, the documentation, and the about page.',
        tags: ['website', 'navigation']
    }, {
        title: 'Website',
        section: 'Assistant',
        body: 'The assistant element of the page is located in the top right. It provides a simple input field where the user can type textual input to be sent to the DialogFlow Bot. This text, as well as the response from the bot are logged in the text field above. There is also a buttons tied to the input field that enables text to speech.',
        tags: ['website', 'assistant']
    }, {
        title: 'Website',
        section: 'Queries',
        body: 'The query element is located in the top left. It consists of two sepereate input fields, for graph and table queries respectively. Queries can be typed manually but the assistant can also be used to enact graph and table queries.',
        tags: ['website', 'queries']
    }, {
        title: 'Website',
        section: 'Database',
        body: 'The database element is located below the query element, and displays table query results. It is also possible to preform grid operations through the assistant, that will live update in database element.',
        tags: ['website', 'database']
    }, {
        title: 'Website',
        section: 'Document Search',
        body: 'The search element is located below the database element, and is responsible for displaying search results from this documentation. Searchs are requested through the assistant, and the response is formatted and served into this element.',
        tags: ['website', 'document search']
    }, {
        title: 'Website',
        section: 'Visualization',
        body: 'The visualization element is located below the assistant element. It display graphs upon request. Like the databse element, these requests can be entered as SQL queries directly in the query element, but can also be enacted through dialog with the assistant',
        tags: ['website', 'visualization']
    },

    // Attributes Document
    {
        title: 'Attributes',
        section: 'summary',
        body: 'Vito knows about the attributes used to describe all your assets. These attributes are described below:',
        tags: ['attributes', 'summary']
    }, {
        title: 'Attributes',
        section: 'Symbol',
        body: 'Symbol is an ID for each asset. For example APPL is the symbol of Apple.',
        tags: ['attributes', 'symbol'],
    }, {
        title: 'Attributes',
        section: 'Type',
        body: 'An asset can be of three types: Fund, Bond or Stock.',
        tags: ['attributes', 'type'],
    }, {
        title: 'Attributes',
        section: 'Price',
        body: 'Price shows the price of a single asset.',
        tags: ['attributes', 'price'],
    }, {
        title: 'Attributes',
        section: 'QC',
        body: 'QC is the currency of the price of each asset.',
        tags: ['attributes', 'qc'],
    }, {
        title: 'Attributes',
        section: 'TOTAL_QTY',
        body: 'TOTAL_QTY is the total ammount of each asset in the portfolio.',
        tags: ['attributes', 'TOTAL_QTY'],
    }, {
        title: 'Attributes',
        section: 'TOTAL_PRICE',
        body: 'TOTAL_PRICE shows the total price of all the assets. This is calculated as Price times total quantity.',
        tags: ['attributes', 'TOTAL_PRICE'],
    }, {
        title: 'Attributes',
        section: 'MATURITY_DATE',
        body: 'Maturity date refers to the final payment date of the asset.',
        tags: ['attributes', 'MATURITY_DATE'],
    }, {
        title: 'Attributes',
        section: 'DIRTY_VALUE_QC',
        body: 'DIRTY_VALUE_QC refers to something we dont really know what is.',
        tags: ['attributes', 'DIRTY_VALUE_QC'],
    }, {
        title: 'Attributes',
        section: 'DIRTY_VALUE_PC',
        body: 'DIRTY_VALUE_PC refers to something we dont really know what is.',
        tags: ['attributes', 'DIRTY_VALUE_PC'],
    }, {
        title: 'Attributes',
        section: 'DIRTY_VALUE_RC',
        body: 'DIRTY_VALUE_RC refers to something we dont really know what is.',
        tags: ['attributes', 'DIRTY_VALUE_RC'],
    },

    // Features Document
    {
        title: 'Features',
        section: 'summary',
        body: 'Vito ships chalk-full of a healthy set of features. Many of them were originally introduced in Vivan, but there are also come that are completely new! The following provides an overview of Vitos most significant features.',
        tags: ['feature', 'summary']
    }, {
        title: 'Features',
        section: 'Grid Operations & Database Integration',
        body: 'Grid operations were part of the basic set of requirements met by Vivan. Upon development of Vito, some more advanced grid operations were added. Here is a list of all the grid operations currently supported by Vito:\n' +
            '\n' +
            'Sorting\n' +
            'Grouping\n' +
            'Showing/hiding columns\n' +
            'Reversing the table order\n' +
            'Table search\n' +
            'Furthermore, Vito is integrated with a remote SQL server which is used to store all of the data that can be shown in the graph. In fact, all the grid operations are actually implemented as different SQL queries. When a user specifies a grouping, a valid SQL query is formed where the data will be ordered accordingly.',
        tags: ['feature', 'Grid']
    }, {
        title: 'Features',
        section: 'Natural Language Processing',
        body: 'Vito is capable of natural language processing. This is a requirement for the ability to interact with the assisant through natural language, be that typed or spoken. Dialogflow, the host of the assistant, uses machine learning techniques coupled with developer defined training phrases to be able to resolve an intent from any given input.',
        tags: ['feature', 'nlp', 'natural language']
    }, {
        title: 'Features',
        section: 'Document Search',
        body: 'It is possible to search Vitos documentation pages via the assistant. Search strings are matched to either document titles, headers, or body content; Each with respective weights, and the results are displayed on the homepage.',
        tags: ['feature', 'doucment search']
    },

    // Dependencies Document
    {
        title: 'Dependencies',
        section: 'Dependencies',
        body: 'DialogFLow\n' +
            'DialogFlow is a Google product used for creating chat bots. It is with DialogFLow, that Vito has been built and trained.\n' +
            '\n' +
            'Node.js\n' +
            'Node.js is a framework for back-end web architecture. It allows for rapid, asynchronous, server-side computations, that allow Vito to respond and enact actions more quickly and efficiently. Node.js was first introduted in Vivan Node, hence the name.\n' +
            '\n' +
            'Chart.js\n' +
            'Chart.js is a lightweight framework for generating charts and diagrams in HTML and Javascript. It is used to make Vitos visualizations\n' +
            '\n' +
            'Fuse.js\n' +
            'Fuse.js is another lightweight framework that provides fuzzy matching capabilities. It currently serves as the backbone for document search',
        tags: [    ]
    },

    // Investopedia document
    // Dependencies Document
    {
        title: 'Investopedia',
        section: 'Summary',
        body: 'Investing: The act of committing money or capital to an endeavor with the expectation of obtaining an additional income or profit.\n' +
            '\n' +
            'Legendary investor Warren Buffett defines investing as “… the process of laying out money now to receive more money in the future.” The goal of investing is to put your money to work in one or more types of investment vehicles in the hopes of growing your money over time.\n',
        tags: [    ]
    }, {
        title: 'Investopedia',
        section: 'investing introduction',
        body: 'Investing is really about “working smarter and not harder.” Most of us work hard at our jobs, whether for a company or our own business. We often work long hours, which requires sacrifice and adds stress. Taking some of our hard-earned money and investing for our future needs is a way to make the most of what we earn.\n' +
            '\n' +
            'Investing is also about making priorities for your money. Spending is easy and gives instant gratification—whether the splurge is on a new outfit, a vacation to some exotic spot or dinner in a fancy restaurant. All of these are wonderful and make life more enjoyable. But investing requires prioritizing our financial futures over our present desires.\n' +
            '\n' +
            'Investing is a way to set aside money while you are busy with life and have that money work for you so that you can fully reap the rewards of your labor in the future. Investing is a means to a happier ending.\n' +
            '\n' +
            '[ Investing is a complicated subject, but it can be very rewarding to those that put in the effort. If you\'re interested in accelerating your learning path, Investopedia\'s Investing for Beginners Course provides an in-depth introduction to the topic taught by a Chartered Financial Analyst. You\'ll learn investing basics, how to manage your portfolio, risk reduction techniques, and more in over 75 lessons containing on-demand video, exercises, and interactive content. ]',
        tags: [    ]
    }, {
        title: 'Investopedia',
        section: 'Investing Vehicles',
        body: 'There are many different ways you can go about investing, including putting money into stocks, bonds, mutual funds, ETFs, real estate (and other alternative investment vehicles), or even starting your own business.\n' +
            '\n' +
            'Every investment vehicle has its positives and negatives, which we\'ll discuss in a later section of this tutorial. Understanding how different types of investment vehicles work is critical to your success. For example, what does a mutual fund invest in? Who is managing the fund? What are the fees and expenses? Are there any costs or penalties for accessing your money? These are all questions that should be answered before making an investment. While it is true there are no guarantees of making money, some work on your part can increase your odds of being a successful investor. Analysis, research and even just reading up on investing can all help.',
        tags: [    ]
    }, {
        title: 'Investopedia',
        section: 'Investing Vehicles',
        body: 'There are many different ways you can go about investing, including putting money into stocks, bonds, mutual funds, ETFs, real estate (and other alternative investment vehicles), or even starting your own business.\n' +
            '\n' +
            'Every investment vehicle has its positives and negatives, which we\'ll discuss in a later section of this tutorial. Understanding how different types of investment vehicles work is critical to your success. For example, what does a mutual fund invest in? Who is managing the fund? What are the fees and expenses? Are there any costs or penalties for accessing your money? These are all questions that should be answered before making an investment. While it is true there are no guarantees of making money, some work on your part can increase your odds of being a successful investor. Analysis, research and even just reading up on investing can all help.',
        tags: [    ]
    },
    {
        title: 'Investopedia',
        section: 'Compound Interest',
        body: 'Now that you have a general idea of what investing is and why you should do it, it\'s time to learn about how investing lets you take advantage of one of the miracles of mathematics: compound interest.\n' +
            '\n' +
            'Compounding is the process of generating more return on an asset\'s reinvested earnings. To work, it requires two things: the reinvestment of earnings and time. Compound interest can help your initial investment grow exponentially. For younger investors, it is the greatest investing tool possible, and the #1 argument for starting as early as possible. Below we give a couple of examples of compound interest.',
        tags: [    ]
    }, {
        title: 'Investopedia',
        section: 'Investing early',
        body: 'Another way to look at the power of compounding is to compare how much less initial investment you need if you start early to reach the same goal.\n' +
            '\n' +
            'A 25-year-old who wishes to accumulate $1 million by age 60 would need to invest $880.21 each month assuming a constant return of 5%.\n' +
            '\n' +
            'A 35-year-old wishing to accumulate $1 million by age 60 would need to invest $1,679.23 each month using the same assumptions.\n' +
            '\n' +
            'A 45-year-old would need to invest $3,741.27 each month to accumulate the same $1 million by age 60. That’s almost 4 times the amount that the 25-year old needs. Starting early is especially helpful when saving for retirement, when putting aside a little bit early in your career can reap great benefits.',
        tags: [    ]
    }



];

const options = {
    shouldSort: true,
    includeScore: true,
    keys: [{
        name: 'title',
        weight: 0.4
    }, {
        name: 'section',
        weight: 0.7
    },{
        name: 'body',
        weight: 0.4
    }]
};

const fuse = new Fuse(documents, options);

module.exports.fuse = fuse;
module.exports.documents = documents;
