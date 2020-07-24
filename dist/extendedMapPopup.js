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
})({"kK6Q":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requiredArgs;

function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}
},{}],"KYJg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toDate;

var _index = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  (0, _index.default)(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}
},{"../_lib/requiredArgs/index.js":"kK6Q"}],"H70G":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInMilliseconds;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInMilliseconds
 * @category Millisecond Helpers
 * @summary Get the number of milliseconds between the given dates.
 *
 * @description
 * Get the number of milliseconds between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of milliseconds
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many milliseconds are between
 * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
 * var result = differenceInMilliseconds(
 *   new Date(2014, 6, 2, 12, 30, 21, 700),
 *   new Date(2014, 6, 2, 12, 30, 20, 600)
 * )
 * //=> 1100
 */
function differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  return dateLeft.getTime() - dateRight.getTime();
}
},{"../toDate/index.js":"KYJg","../_lib/requiredArgs/index.js":"kK6Q"}],"oGJj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInMinutes;

var _index = _interopRequireDefault(require("../differenceInMilliseconds/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_MINUTE = 60000;
/**
 * @name differenceInMinutes
 * @category Minute Helpers
 * @summary Get the number of minutes between the given dates.
 *
 * @description
 * Get the signed number of full (rounded towards 0) minutes between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of minutes
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many minutes are between 2 July 2014 12:07:59 and 2 July 2014 12:20:00?
 * var result = differenceInMinutes(
 *   new Date(2014, 6, 2, 12, 20, 0),
 *   new Date(2014, 6, 2, 12, 7, 59)
 * )
 * //=> 12
 *
 * @example
 * // How many minutes are from 10:01:59 to 10:00:00
 * var result = differenceInMinutes(
 *   new Date(2000, 0, 1, 10, 0, 0),
 *   new Date(2000, 0, 1, 10, 1, 59)
 * )
 * //=> -1
 */

function differenceInMinutes(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var diff = (0, _index.default)(dirtyDateLeft, dirtyDateRight) / MILLISECONDS_IN_MINUTE;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
}
},{"../differenceInMilliseconds/index.js":"H70G","../_lib/requiredArgs/index.js":"kK6Q"}],"Ph2E":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.API_URI = void 0;
const API_URI = 'https://api.tribalwarshelp.com/graphql';
exports.API_URI = API_URI;

var _default = function _default() {
  let {
    query,
    variables = {}
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return fetch(API_URI, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.json();
  }).then((_ref) => {
    let {
      data,
      errors
    } = _ref;

    if (errors && Array.isArray(errors) && errors.length > 0) {
      throw new Error(errors[0].message);
    }

    return new Promise(resolve => resolve(data));
  });
};

exports.default = _default;
},{}],"V6Mf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (date, options) => {
  return new Date(date).toLocaleDateString(window.game_data.locale.replace('_', '-'), options ? options : {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

exports.default = _default;
},{}],"DMkL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = () => window.location.host.split('.')[0];

exports.default = _default;
},{}],"KWxH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setItem = exports.getItem = void 0;

const getItem = key => {
  const json = localStorage.getItem(key);
  let obj = {};

  if (json) {
    obj = JSON.parse(json);
  }

  return obj;
};

exports.getItem = getItem;

const setItem = (key, payload) => {
  localStorage.setItem(key, JSON.stringify(payload));
};

exports.setItem = setItem;
},{}],"HdqX":[function(require,module,exports) {
"use strict";

var _differenceInMinutes = _interopRequireDefault(require("date-fns/differenceInMinutes"));

var _requestCreator = _interopRequireDefault(require("./libs/requestCreator"));

var _formatDate = _interopRequireDefault(require("./utils/formatDate"));

var _getCurrentServer = _interopRequireDefault(require("./utils/getCurrentServer"));

var _localStorage = require("./utils/localStorage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==UserScript==
// @name         Extended Map Popup
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedMapPopup.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedMapPopup.js
// @version      0.3.0
// @description  Extended Map Popup
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*/game.php*screen=map*
// @grant        none
// ==/UserScript==
const SERVER = (0, _getCurrentServer.default)();
const CURR_SERVER_CONFIG = "\n    query server($key: String!) {\n        server(key: $key) {\n            config {\n                speed\n            }\n        }\n    }\n";
const LAST_VILLAGE_CONQUER_QUERY = "\n    query ennoblements($server: String!, $filter: EnnoblementFilter!) {\n        ennoblements(server: $server, filter: $filter) {\n            items {\n                ennobledAt\n                village {\n                    id\n                }\n            }\n        }\n    }\n";
const SERVER_CONFIG_LOCAL_STORAGE_KEY = 'kiszkowaty_extended_map_popup_server_cfg';

const loadServerConfigFromLocalStorage = () => {
  return (0, _localStorage.getItem)(SERVER_CONFIG_LOCAL_STORAGE_KEY);
};

const cacheServerConfig = function cacheServerConfig() {
  let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _localStorage.setItem)(SERVER_CONFIG_LOCAL_STORAGE_KEY, data);
};

const isConfigExpired = date => {
  return Math.abs((0, _differenceInMinutes.default)(date, new Date())) >= 60 * 24;
};

const loadServerConfig = async () => {
  let data = loadServerConfigFromLocalStorage();

  if (!data || !data.server || isConfigExpired(new Date(data.loadedAt))) {
    data = await (0, _requestCreator.default)({
      query: CURR_SERVER_CONFIG,
      variables: {
        key: SERVER
      }
    });
    data.loadedAt = new Date();
    cacheServerConfig(data);
  }

  return data && data.server && data.server.config ? data.server.config : {};
};

const loadVillageData = async function loadVillageData(id) {
  let {
    cacheOnly = false
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (cacheOnly || TWMap.popup.extendedMapPopupCache[id]) {
    return TWMap.popup.extendedMapPopupCache[id];
  }

  try {
    const data = await (0, _requestCreator.default)({
      query: LAST_VILLAGE_CONQUER_QUERY,
      variables: {
        server: SERVER,
        filter: {
          villageID: [id],
          sort: 'ennobledAt DESC'
        }
      }
    });
    TWMap.popup.extendedMapPopupCache[id] = data;
    return data;
  } catch (error) {
    console.log('loadVillageData', error);
  }
};

const calcLoyalty = (ennobledAt, speed) => {
  let loyalty = 25 + Math.abs((0, _differenceInMinutes.default)(ennobledAt, new Date())) * (speed / 60);

  if (loyalty > 100) {
    loyalty = 100;
  }

  return Math.floor(loyalty);
};

const renderAdditionalInfo = (data, cfg) => {
  const ennoblement = data && data.ennoblements && data.ennoblements.items && data.ennoblements.items.length > 0 ? data.ennoblements.items[0] : undefined;
  const parent = document.querySelector('#map_popup #info_content tbody');
  let lastEnnobledAt = parent.querySelector('#lastEnnobledAt');

  if (!lastEnnobledAt) {
    lastEnnobledAt = document.createElement('tr');
    lastEnnobledAt.id = 'lastEnnobledAt';
    parent.appendChild(lastEnnobledAt);
  }

  lastEnnobledAt.innerHTML = "\n          <td>\n              Last ennobled at:\n          </td>\n          <td>\n              ".concat(ennoblement ? (0, _formatDate.default)(ennoblement.ennobledAt) : 'Never', "\n          </td>\n      ");
  let loyalty = parent.querySelector('#loyalty');

  if (!loyalty) {
    loyalty = document.createElement('tr');
    loyalty.id = 'loyalty';
    parent.appendChild(loyalty);
  }

  loyalty.innerHTML = "\n          <td>\n              Possible loyalty:\n          </td>\n          <td>\n              ".concat(ennoblement ? calcLoyalty(new Date(ennoblement.ennobledAt), cfg.speed) : 100, "\n          </td>\n      ");
};

const createLoadVillageHandler = cfg => async e => {
  TWMap.popup._loadVillage(e);

  const data = await loadVillageData(parseInt(e));
  renderAdditionalInfo(data, cfg);
};

const createDisplayForVillageHandler = cfg => async (e, a, t) => {
  TWMap.popup._displayForVillage(e, a, t);

  const data = await loadVillageData(parseInt(e.id), {
    cacheOnly: true
  });
  renderAdditionalInfo(data, cfg);
};

(async function () {
  try {
    const config = await loadServerConfig();
    TWMap.popup.extendedMapPopupCache = {};
    TWMap.popup._loadVillage = TWMap.popup.loadVillage;
    TWMap.popup.loadVillage = createLoadVillageHandler(config);
    TWMap.popup._displayForVillage = TWMap.popup.displayForVillage;
    TWMap.popup.displayForVillage = createDisplayForVillageHandler(config);
  } catch (error) {
    console.log('extended map popup', error);
  }
})();
},{"date-fns/differenceInMinutes":"oGJj","./libs/requestCreator":"Ph2E","./utils/formatDate":"V6Mf","./utils/getCurrentServer":"DMkL","./utils/localStorage":"KWxH"}]},{},["HdqX"], null)