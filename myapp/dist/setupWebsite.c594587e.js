// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../public/javascripts/network.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Network = Network;
var accessToken = "fe3ac7ce30b340d1b6802eb18de04809";
var baseUrl = "https://api.api.ai/v1/"; //var network = new Network(successHandler, errorHandler);

function Network(successHandler, errorHandler) {
  this.successHandler = successHandler;
  this.errorHandler = errorHandler;
}

Network.prototype.send = function (value) {
  $.ajax({
    type: "POST",
    url: baseUrl + "query?v=20150910",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      "Authorization": "Bearer " + accessToken
    },
    data: JSON.stringify({
      query: value,
      lang: "en",
      sessionId: "somerandomthing"
    }),
    success: this.successHandler,
    error: this.errorHandler
  });
};
},{}],"../public/javascripts/scripts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.action = action;
var accessToken = "fe3ac7ce30b340d1b6802eb18de04809";
var baseUrl = "https://api.api.ai/v1/";
var baseQueryObject = {
  columns: "*",
  filter: [],
  sort: "",
  order: "",
  group: "",
  search: ""
};
var queryObjectStack = [baseQueryObject]; // ---------------------------------------------- Table Operations ---------------------------------------------- //
// TODO: If we use more string attributes in the DB, this would have to be changed. Not ideal, could be implemented smarter

function searchTable(searchString) {
  var newQuery = copyQueryObject(queryObjectStack[queryObjectStack.length - 1]);
  newQuery.search = "Market = '" + searchString + "' OR Symbol = '" + searchString + "'";
  queryObjectStack.push(newQuery);
}

function clearSearch() {
  var newQuery = copyQueryObject(queryObjectStack[queryObjectStack.length - 1]);
  newQuery.search = "";
  queryObjectStack.push(newQuery);
}

function sortTable(stockAttribute) {
  var newQuery = copyQueryObject(queryObjectStack[queryObjectStack.length - 1]);
  newQuery.sort = stockAttribute;
  queryObjectStack.push(newQuery);
}

function reverseTable() {
  var newQuery = copyQueryObject(queryObjectStack[queryObjectStack.length - 1]);

  if (queryObjectStack[queryObjectStack.length - 1].order == "DESC") {
    newQuery.order = "";
  } else {
    newQuery.order = "DESC";
  }

  queryObjectStack.push(newQuery);
}

function groupTable(columnName) {
  var newQuery = copyQueryObject(queryObjectStack[queryObjectStack.length - 1]);
  newQuery.group = columnName;
  queryObjectStack.push(newQuery);
}

function filterTable(stockAttribute, threshold, higherLower) {
  var boolHL = false;

  if (higherLower === "higher than") {
    boolHL = true;
  }

  var newQuery = copyQueryObject(queryObjectStack[queryObjectStack.length - 1]);
  newQuery.filter = [[stockAttribute, threshold, boolHL]];
  queryObjectStack.push(newQuery);
}

function undo() {
  if (queryObjectStack.length > 1) {
    queryObjectStack.pop();
  } else {
    alert("You reached the base view. Cannot undo more actions.");
  }
}

function reset() {
  queryObjectStack = [baseQueryObject];
}

function action(data) {
  // get intent
  var intent = data.result.action; // exit if action cannot be executed

  if (data.result.actionIncomplete) return; // TODO: Make robust
  // get parameters

  var stockAttribute = data.result.parameters["StockAttribute"];
  var searchString = data.result.parameters["searchString"];
  var groupString = data.result.parameters["attribute"];
  var filterThreshold = data.result.parameters["number"];
  var higherLower = data.result.parameters["higherLower"]; // match intent to corresponding action

  switch (intent) {
    case "searchTable":
      searchTable(searchString);
      break;

    case "clearSearch":
      clearSearch();
      break;

    case "sortBy":
      sortTable(stockAttribute);
      break;

    case "reverseTable":
      reverseTable();
      break;

    case "groupTable":
      groupTable(groupString);
      break;

    case "filterTable":
      filterTable(stockAttribute, filterThreshold, higherLower);
      break;

    case "undo":
      undo();
      break;

    case "reset":
      reset();
      break;
  } // copy the query into the query field


  $("#queryText").val(queryParser(queryObjectStack[queryObjectStack.length - 1])); // execute the query

  $("#HButton").click();
} // ---------------------------------------------- Aux. Functions ---------------------------------------------- //


function copyQueryObject(queryObject) {
  return {
    columns: queryObject.columns,
    filter: queryObject.filter,
    sort: queryObject.sort,
    order: queryObject.order,
    group: queryObject.group,
    search: queryObject.search
  };
} // TODO move to external file


function queryParser(queryObject) {
  var query = "SELECT " + queryObject.columns + " FROM Stocks"; // Re-arranging
  // Filter and Search

  var filterLength = queryObject.filter.length;
  var searchLength = queryObject.search.length;

  if (!(filterLength === 0 && searchLength === 0)) {
    // Check for filter or a search
    query += " WHERE ";

    if (filterLength !== 0) {
      // Check if there is a filter
      // TODO: multiple filters (AND vs. OR)
      query += queryObject.filter[0][0];
      if (queryObject.filter[0][2]) query += " > ";else query += " < ";
      query += queryObject.filter[0][1];

      if (searchLength !== 0) {
        // Check if there is a filter and search
        query += " AND " + queryObject.search;
      }
    } else {
      // There is only a search
      query += queryObject.search;
    }
  } // Group and sort


  var sortLength = queryObject.sort.length;
  var groupLength = queryObject.group.length;

  if (!(sortLength === 0 && groupLength === 0)) {
    query += " ORDER BY ";

    if (groupLength !== 0) {
      query += queryObject.group;
      if (sortLength !== 0) query += ", " + queryObject.sort;
    } else {
      query += queryObject.sort;
    }
  } // Sorting order


  if (queryObject.order) {
    query += " " + queryObject.order;
  }

  query += ";";
  return query;
}
},{}],"../public/javascripts/speechRecognition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpeechRecognition = SpeechRecognition;

function SpeechRecognition(updateHandler, resultHandler, queryHandler) {
  this.recognition = new webkitSpeechRecognition();
  this.isSpeaking = false;
  var self = this; // The most hacky solution ever

  this.recognition.onstart = function (_) {
    console.log("on start: " + self.isSpeaking);
    updateHandler("Stop");
  };

  this.recognition.onresult = function (event) {
    var text = "";

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      text += event.results[i][0].transcript;
    }

    resultHandler(text);
    queryHandler.send(text);
    console.log("on result: " + self.isSpeaking);
  };

  this.recognition.onend = function (_) {
    updateHandler("Speak");
    self.isSpeaking = false;
    console.log("on end: " + self.isSpeaking);
  };

  this.recognition.lang = "en-US";
}

SpeechRecognition.prototype.switch = function () {
  console.log("switching: " + this.isSpeaking);

  if (this.isSpeaking) {
    this.isSpeaking = false;
    this.recognition.stop();
  } else {
    this.isSpeaking = true;
    this.recognition.start();
  }
};
},{}],"../public/javascripts/setupWebsite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRec = updateRec;
exports.network = void 0;

var _network = require("./network");

var _scripts = require("./scripts");

var _speechRecognition = require("./speechRecognition");

function setResponse(val) {
  $("#response").text($("#response").text() + val + "\r\n");
  $("#response").scrollTop($("#response")[0].scrollHeight);
}

var successHandler = function successHandler(data) {
  var reply = formatMultipleLineReply(data.result.fulfillment.speech); // Allow multi line responses

  setResponse("Bot: " + reply);
  (0, _scripts.action)(data);
};

var errorHandler = function errorHandler() {
  setResponse("Internal Server Error");
};

var network = new _network.Network(successHandler, errorHandler);
exports.network = network;

function setInput(text) {
  $("#input").val(text);
}

function updateRec(text) {
  $("#rec").text(text);
}

var speechRecognition = new _speechRecognition.SpeechRecognition(updateRec, setInput, network);
$(document).ready(function () {
  $("#HButton").on("click", function () {
    var query = $("#queryText").val();
    $.ajax({
      url: "http://localhost:8080/api/" + query
    }).done(function (data) {
      console.log(data);
      $("#databaseContainer").html(data.toString());
    });
  });
  $("#input").keypress(function (event) {
    if (event.which == 13) {
      event.preventDefault();
      var text = $("#input").val();
      setResponse("You: " + text);
      network.send(text);
    }
  });
  $("#rec").click(function (event) {
    speechRecognition.switch();
  });
  $("#rowButton").click(function () {
    $("#myTable").append("<tr><td>Beer</td><td>$ 20.00 </td></tr>");
  });
  $("#addRow").click(function () {
    addRow();
  });
  $("#removeRow").click(function () {
    removeRow();
  });
  $("#showHideTable").click(function () {
    toggleTable();
  });
  $("#sortBtn").click(function () {
    $("#stockTitle").click();
  });
  $("#populate").click(function () {
    $("tbody").each(function (elem, index) {
      var arr = $.makeArray($("tr", this).detach());
      arr.reverse();
      $(this).append(arr);
    });
  });
  $('#table').DataTable({
    "ordering": true // false to disable sorting (or any other option)

  });
  $('.dataTables_length').addClass('bs-select');
});

function formatMultipleLineReply(response) {
  var responseLines = response.split('#linebreak'); // split response by keyword #linebreak

  var multiLineReply = ""; // create output variable

  for (var i = 0; i < responseLines.length - 1; i++) {
    // append all but the last line with \n
    multiLineReply += responseLines[i] + "\n ";
  }

  multiLineReply += responseLines[responseLines.length - 1]; // append the last line

  return multiLineReply; // return the result
}
},{"./network":"../public/javascripts/network.js","./scripts":"../public/javascripts/scripts.js","./speechRecognition":"../public/javascripts/speechRecognition.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58049" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","../public/javascripts/setupWebsite.js"], null)
//# sourceMappingURL=/setupWebsite.c594587e.js.map