"format global";
/* */ 
"format global";
(function (global) {
  var babelHelpers = global.babelHelpers = {};

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.defaults = function (obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);

      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }

    return obj;
  };

  babelHelpers.createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  babelHelpers.createDecoratedClass = (function () {
    function defineProperties(target, descriptors, initializers) {
      for (var i = 0; i < descriptors.length; i++) {
        var descriptor = descriptors[i];
        var decorators = descriptor.decorators;
        var key = descriptor.key;
        delete descriptor.key;
        delete descriptor.decorators;
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

        if (decorators) {
          for (var f = 0; f < decorators.length; f++) {
            var decorator = decorators[f];

            if (typeof decorator === "function") {
              descriptor = decorator(target, key, descriptor) || descriptor;
            } else {
              throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
            }
          }

          if (descriptor.initializer !== undefined) {
            initializers[key] = descriptor;
            continue;
          }
        }

        Object.defineProperty(target, key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers);
      if (staticProps) defineProperties(Constructor, staticProps, staticInitializers);
      return Constructor;
    };
  })();

  babelHelpers.createDecoratedObject = function (descriptors) {
    var target = {};

    for (var i = 0; i < descriptors.length; i++) {
      var descriptor = descriptors[i];
      var decorators = descriptor.decorators;
      var key = descriptor.key;
      delete descriptor.key;
      delete descriptor.decorators;
      descriptor.enumerable = true;
      descriptor.configurable = true;
      if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

      if (decorators) {
        for (var f = 0; f < decorators.length; f++) {
          var decorator = decorators[f];

          if (typeof decorator === "function") {
            descriptor = decorator(target, key, descriptor) || descriptor;
          } else {
            throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
          }
        }
      }

      if (descriptor.initializer) {
        descriptor.value = descriptor.initializer.call(target);
      }

      Object.defineProperty(target, key, descriptor);
    }

    return target;
  };

  babelHelpers.defineDecoratedPropertyDescriptor = function (target, key, descriptors) {
    var _descriptor = descriptors[key];
    if (!_descriptor) return;
    var descriptor = {};

    for (var _key in _descriptor) descriptor[_key] = _descriptor[_key];

    descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined;
    Object.defineProperty(target, key, descriptor);
  };

  babelHelpers.taggedTemplateLiteral = function (strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  };

  babelHelpers.taggedTemplateLiteralLoose = function (strings, raw) {
    strings.raw = raw;
    return strings;
  };

  babelHelpers.toArray = function (arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  };

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  babelHelpers.slicedToArray = (function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  })();

  babelHelpers.slicedToArrayLoose = function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      var _arr = [];

      for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        _arr.push(_step.value);

        if (i && _arr.length === i) break;
      }

      return _arr;
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };

  babelHelpers.objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  babelHelpers.hasOwn = Object.prototype.hasOwnProperty;
  babelHelpers.slice = Array.prototype.slice;
  babelHelpers.bind = Function.prototype.bind;

  babelHelpers.defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  babelHelpers.asyncToGenerator = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        var callNext = step.bind(null, "next");
        var callThrow = step.bind(null, "throw");

        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            Promise.resolve(value).then(callNext, callThrow);
          }
        }

        callNext();
      });
    };
  };

  babelHelpers.interopExportWildcard = function (obj, defaults) {
    var newObj = defaults({}, obj);
    delete newObj["default"];
    return newObj;
  };

  babelHelpers.interopRequireWildcard = function (obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj["default"] = obj;
      return newObj;
    }
  };

  babelHelpers.interopRequireDefault = function (obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  };

  babelHelpers._typeof = function (obj) {
    return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers._extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  babelHelpers.get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  babelHelpers.set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  babelHelpers.newArrowCheck = function (innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.objectDestructuringEmpty = function (obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  };

  babelHelpers.temporalUndefined = {};

  babelHelpers.temporalAssertDefined = function (val, name, undef) {
    if (val === undef) {
      throw new ReferenceError(name + " is not defined - temporal dead zone");
    }

    return true;
  };

  babelHelpers.selfGlobal = typeof global === "undefined" ? self : global;
  babelHelpers.typeofReactElement = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 60103;

  babelHelpers.defaultProps = function (defaultProps, props) {
    if (defaultProps) {
      for (var propName in defaultProps) {
        if (typeof props[propName] === "undefined") {
          props[propName] = defaultProps[propName];
        }
      }
    }

    return props;
  };

  babelHelpers._instanceof = function (left, right) {
    if (right != null && right[Symbol.hasInstance]) {
      return right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  };

  babelHelpers.interopRequire = function (obj) {
    return obj && obj.__esModule ? obj["default"] : obj;
  };
})(typeof global === "undefined" ? self : global);

(function(global) {

  var defined = {};

  // indexOf polyfill for IE8
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++)
      if (this[i] === item)
        return i;
    return -1;
  }

  var getOwnPropertyDescriptor = true;
  try {
    Object.getOwnPropertyDescriptor({ a: 0 }, 'a');
  }
  catch(e) {
    getOwnPropertyDescriptor = false;
  }

  var defineProperty;
  (function () {
    try {
      if (!!Object.defineProperty({}, 'a', {}))
        defineProperty = Object.defineProperty;
    }
    catch (e) {
      defineProperty = function(obj, prop, opt) {
        try {
          obj[prop] = opt.value || opt.get.call(obj);
        }
        catch(e) {}
      }
    }
  })();

  function register(name, deps, declare) {
    if (arguments.length === 4)
      return registerDynamic.apply(this, arguments);
    doRegister(name, {
      declarative: true,
      deps: deps,
      declare: declare
    });
  }

  function registerDynamic(name, deps, executingRequire, execute) {
    doRegister(name, {
      declarative: false,
      deps: deps,
      executingRequire: executingRequire,
      execute: execute
    });
  }

  function doRegister(name, entry) {
    entry.name = name;

    // we never overwrite an existing define
    if (!(name in defined))
      defined[name] = entry;

    // we have to normalize dependencies
    // (assume dependencies are normalized for now)
    // entry.normalizedDeps = entry.deps.map(normalize);
    entry.normalizedDeps = entry.deps;
  }


  function buildGroups(entry, groups) {
    groups[entry.groupIndex] = groups[entry.groupIndex] || [];

    if (indexOf.call(groups[entry.groupIndex], entry) != -1)
      return;

    groups[entry.groupIndex].push(entry);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = defined[depName];

      // not in the registry means already linked / ES6
      if (!depEntry || depEntry.evaluated)
        continue;

      // now we know the entry is in our unlinked linkage group
      var depGroupIndex = entry.groupIndex + (depEntry.declarative != entry.declarative);

      // the group index of an entry is always the maximum
      if (depEntry.groupIndex === undefined || depEntry.groupIndex < depGroupIndex) {

        // if already in a group, remove from the old group
        if (depEntry.groupIndex !== undefined) {
          groups[depEntry.groupIndex].splice(indexOf.call(groups[depEntry.groupIndex], depEntry), 1);

          // if the old group is empty, then we have a mixed depndency cycle
          if (groups[depEntry.groupIndex].length == 0)
            throw new TypeError("Mixed dependency cycle detected");
        }

        depEntry.groupIndex = depGroupIndex;
      }

      buildGroups(depEntry, groups);
    }
  }

  function link(name) {
    var startEntry = defined[name];

    startEntry.groupIndex = 0;

    var groups = [];

    buildGroups(startEntry, groups);

    var curGroupDeclarative = !!startEntry.declarative == groups.length % 2;
    for (var i = groups.length - 1; i >= 0; i--) {
      var group = groups[i];
      for (var j = 0; j < group.length; j++) {
        var entry = group[j];

        // link each group
        if (curGroupDeclarative)
          linkDeclarativeModule(entry);
        else
          linkDynamicModule(entry);
      }
      curGroupDeclarative = !curGroupDeclarative; 
    }
  }

  // module binding records
  var moduleRecords = {};
  function getOrCreateModuleRecord(name) {
    return moduleRecords[name] || (moduleRecords[name] = {
      name: name,
      dependencies: [],
      exports: {}, // start from an empty module and extend
      importers: []
    })
  }

  function linkDeclarativeModule(entry) {
    // only link if already not already started linking (stops at circular)
    if (entry.module)
      return;

    var module = entry.module = getOrCreateModuleRecord(entry.name);
    var exports = entry.module.exports;

    var declaration = entry.declare.call(global, function(name, value) {
      module.locked = true;

      if (typeof name == 'object') {
        for (var p in name)
          exports[p] = name[p];
      }
      else {
        exports[name] = value;
      }

      for (var i = 0, l = module.importers.length; i < l; i++) {
        var importerModule = module.importers[i];
        if (!importerModule.locked) {
          for (var j = 0; j < importerModule.dependencies.length; ++j) {
            if (importerModule.dependencies[j] === module) {
              importerModule.setters[j](exports);
            }
          }
        }
      }

      module.locked = false;
      return value;
    });

    module.setters = declaration.setters;
    module.execute = declaration.execute;

    // now link all the module dependencies
    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = defined[depName];
      var depModule = moduleRecords[depName];

      // work out how to set depExports based on scenarios...
      var depExports;

      if (depModule) {
        depExports = depModule.exports;
      }
      else if (depEntry && !depEntry.declarative) {
        depExports = depEntry.esModule;
      }
      // in the module registry
      else if (!depEntry) {
        depExports = load(depName);
      }
      // we have an entry -> link
      else {
        linkDeclarativeModule(depEntry);
        depModule = depEntry.module;
        depExports = depModule.exports;
      }

      // only declarative modules have dynamic bindings
      if (depModule && depModule.importers) {
        depModule.importers.push(module);
        module.dependencies.push(depModule);
      }
      else
        module.dependencies.push(null);

      // run the setter for this dependency
      if (module.setters[i])
        module.setters[i](depExports);
    }
  }

  // An analog to loader.get covering execution of all three layers (real declarative, simulated declarative, simulated dynamic)
  function getModule(name) {
    var exports;
    var entry = defined[name];

    if (!entry) {
      exports = load(name);
      if (!exports)
        throw new Error("Unable to load dependency " + name + ".");
    }

    else {
      if (entry.declarative)
        ensureEvaluated(name, []);

      else if (!entry.evaluated)
        linkDynamicModule(entry);

      exports = entry.module.exports;
    }

    if ((!entry || entry.declarative) && exports && exports.__useDefault)
      return exports['default'];

    return exports;
  }

  function linkDynamicModule(entry) {
    if (entry.module)
      return;

    var exports = {};

    var module = entry.module = { exports: exports, id: entry.name };

    // AMD requires execute the tree first
    if (!entry.executingRequire) {
      for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
        var depName = entry.normalizedDeps[i];
        var depEntry = defined[depName];
        if (depEntry)
          linkDynamicModule(depEntry);
      }
    }

    // now execute
    entry.evaluated = true;
    var output = entry.execute.call(global, function(name) {
      for (var i = 0, l = entry.deps.length; i < l; i++) {
        if (entry.deps[i] != name)
          continue;
        return getModule(entry.normalizedDeps[i]);
      }
      throw new TypeError('Module ' + name + ' not declared as a dependency.');
    }, exports, module);

    if (output)
      module.exports = output;

    // create the esModule object, which allows ES6 named imports of dynamics
    exports = module.exports;
 
    if (exports && exports.__esModule) {
      entry.esModule = exports;
    }
    else {
      entry.esModule = {};
      
      // don't trigger getters/setters in environments that support them
      if ((typeof exports == 'object' || typeof exports == 'function') && exports !== global) {
        if (getOwnPropertyDescriptor) {
          var d;
          for (var p in exports)
            if (d = Object.getOwnPropertyDescriptor(exports, p))
              defineProperty(entry.esModule, p, d);
        }
        else {
          var hasOwnProperty = exports && exports.hasOwnProperty;
          for (var p in exports) {
            if (!hasOwnProperty || exports.hasOwnProperty(p))
              entry.esModule[p] = exports[p];
          }
         }
       }
      entry.esModule['default'] = exports;
      defineProperty(entry.esModule, '__useDefault', {
        value: true
      });
    }
  }

  /*
   * Given a module, and the list of modules for this current branch,
   *  ensure that each of the dependencies of this module is evaluated
   *  (unless one is a circular dependency already in the list of seen
   *  modules, in which case we execute it)
   *
   * Then we evaluate the module itself depth-first left to right 
   * execution to match ES6 modules
   */
  function ensureEvaluated(moduleName, seen) {
    var entry = defined[moduleName];

    // if already seen, that means it's an already-evaluated non circular dependency
    if (!entry || entry.evaluated || !entry.declarative)
      return;

    // this only applies to declarative modules which late-execute

    seen.push(moduleName);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      if (indexOf.call(seen, depName) == -1) {
        if (!defined[depName])
          load(depName);
        else
          ensureEvaluated(depName, seen);
      }
    }

    if (entry.evaluated)
      return;

    entry.evaluated = true;
    entry.module.execute.call(global);
  }

  // magical execution function
  var modules = {};
  function load(name) {
    if (modules[name])
      return modules[name];

    // node core modules
    if (name.substr(0, 6) == '@node/')
      return require(name.substr(6));

    var entry = defined[name];

    // first we check if this module has already been defined in the registry
    if (!entry)
      throw "Module " + name + " not present.";

    // recursively ensure that the module and all its 
    // dependencies are linked (with dependency group handling)
    link(name);

    // now handle dependency execution in correct order
    ensureEvaluated(name, []);

    // remove from the registry
    defined[name] = undefined;

    // exported modules get __esModule defined for interop
    if (entry.declarative)
      defineProperty(entry.module.exports, '__esModule', { value: true });

    // return the defined module object
    return modules[name] = entry.declarative ? entry.module.exports : entry.esModule;
  };

  return function(mains, depNames, declare) {
    return function(formatDetect) {
      formatDetect(function(deps) {
        var System = {
          _nodeRequire: typeof require != 'undefined' && require.resolve && typeof process != 'undefined' && require,
          register: register,
          registerDynamic: registerDynamic,
          get: load, 
          set: function(name, module) {
            modules[name] = module; 
          },
          newModule: function(module) {
            return module;
          }
        };
        System.set('@empty', {});

        // register external dependencies
        for (var i = 0; i < depNames.length; i++) (function(depName, dep) {
          if (dep && dep.__esModule)
            System.register(depName, [], function(_export) {
              return {
                setters: [],
                execute: function() {
                  for (var p in dep)
                    if (p != '__esModule' && !(typeof p == 'object' && p + '' == 'Module'))
                      _export(p, dep[p]);
                }
              };
            });
          else
            System.registerDynamic(depName, [], false, function() {
              return dep;
            });
        })(depNames[i], arguments[i]);

        // register modules in this bundle
        declare(System);

        // load mains
        var firstLoad = load(mains[0]);
        if (mains.length > 1)
          for (var i = 1; i < mains.length; i++)
            load(mains[i]);

        if (firstLoad.__useDefault)
          return firstLoad['default'];
        else
          return firstLoad;
      });
    };
  };

})(typeof self != 'undefined' ? self : global)
/* (['mainModule'], ['external-dep'], function($__System) {
  System.register(...);
})
(function(factory) {
  if (typeof define && define.amd)
    define(['external-dep'], factory);
  // etc UMD / module pattern
})*/

(['1'], [], function($__System) {

$__System.registerDynamic("2", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  exports["default"] = Function.prototype.bind;
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

$__System.register('3', ['2', '4', '5', '6', '7', '8', '9'], function (_export) {
    var _bind, EntityList, Family, _createClass, _classCallCheck, _Map, _getIterator, World;

    return {
        setters: [function (_3) {
            _bind = _3['default'];
        }, function (_6) {
            EntityList = _6['default'];
        }, function (_7) {
            Family = _7['default'];
        }, function (_) {
            _createClass = _['default'];
        }, function (_2) {
            _classCallCheck = _2['default'];
        }, function (_4) {
            _Map = _4['default'];
        }, function (_5) {
            _getIterator = _5['default'];
        }],
        execute: function () {
            'use strict';

            World = (function () {
                function World() {
                    _classCallCheck(this, World);

                    this.systems = [];
                    this.families = new _Map();
                    this.entities = new EntityList();
                }

                _createClass(World, [{
                    key: 'addSystem',
                    value: function addSystem(system) {
                        this.systems.push(system);
                        system.addedToWorld(this);
                    }
                }, {
                    key: 'addEntity',
                    value: function addEntity(entity) {
                        var _this = this;

                        this.entities.add(entity);

                        this.updateFamilies(entity);

                        entity.onComponentAdded.add(function () {
                            return _this.updateFamilies(entity);
                        });
                        entity.onComponentRemoved.add(function () {
                            return _this.updateFamilies(entity);
                        });
                    }
                }, {
                    key: 'removeEntity',
                    value: function removeEntity(entity) {
                        this.entities.remove(entity);
                        entity.destroy();

                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = _getIterator(this.families.values()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var family = _step.value;

                                family.removeEntity(entity);
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator['return']) {
                                    _iterator['return']();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    }
                }, {
                    key: 'addEntities',
                    value: function addEntities() {
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _len = arguments.length, entities = Array(_len), _key = 0; _key < _len; _key++) {
                                entities[_key] = arguments[_key];
                            }

                            for (var _iterator2 = _getIterator(entities), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var entity = _step2.value;

                                this.addEntity(entity);
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                                    _iterator2['return']();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
                    }
                }, {
                    key: 'updateFamilies',
                    value: function updateFamilies(entity) {
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = _getIterator(this.families.values()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var family = _step3.value;

                                // addEntity of family will actually remove or add as needed
                                family.addEntity(entity);
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                                    _iterator3['return']();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }
                    }
                }, {
                    key: 'getFamily',
                    value: function getFamily() {
                        for (var _len2 = arguments.length, traits = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                            traits[_key2] = arguments[_key2];
                        }

                        var familyId = Family.getId(traits);
                        if (!this.families.has(familyId)) {
                            var family = new (_bind.apply(Family, [null].concat(traits)))();
                            var _iteratorNormalCompletion4 = true;
                            var _didIteratorError4 = false;
                            var _iteratorError4 = undefined;

                            try {
                                for (var _iterator4 = _getIterator(this.entities), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                    var entity = _step4.value;

                                    family.addEntity(entity);
                                }
                            } catch (err) {
                                _didIteratorError4 = true;
                                _iteratorError4 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                                        _iterator4['return']();
                                    }
                                } finally {
                                    if (_didIteratorError4) {
                                        throw _iteratorError4;
                                    }
                                }
                            }

                            this.families.set(familyId, family);

                            return family;
                        }

                        return this.families.get(familyId);
                    }
                }, {
                    key: 'onEntityAdded',
                    value: function onEntityAdded() {
                        var family = this.getFamily.apply(this, arguments);

                        return family.onAddEntity;
                    }
                }, {
                    key: 'onEntityRemoved',
                    value: function onEntityRemoved() {
                        var family = this.getFamily.apply(this, arguments);

                        return family.onRemoveEntity;
                    }
                }, {
                    key: 'update',
                    value: function update(dt) {
                        this.systems.forEach(function (system) {
                            return system.update(dt);
                        });
                    }
                }]);

                return World;
            })();

            _export('default', World);
        }
    };
});
$__System.register("a", ["6", "7"], function (_export) {
    var _createClass, _classCallCheck, System;

    return {
        setters: [function (_) {
            _createClass = _["default"];
        }, function (_2) {
            _classCallCheck = _2["default"];
        }],
        execute: function () {
            "use strict";

            System = (function () {
                function System() {
                    _classCallCheck(this, System);

                    this.active = true;
                    this.world = null;
                }

                _createClass(System, [{
                    key: "addedToWorld",
                    value: function addedToWorld(world) {
                        this.world = world;
                    }
                }, {
                    key: "removedFromWorld",
                    value: function removedFromWorld() {
                        this.world = null;
                    }
                }, {
                    key: "update",
                    value: function update(dt) {
                        if (!this.active) {
                            return;
                        }
                    }
                }]);

                return System;
            })();

            _export("default", System);
        }
    };
});
$__System.register('4', ['6', '7', '8', 'c', 'd', 'b'], function (_export) {
    var _createClass, _classCallCheck, _Map, _get, _inherits, LinkedList, EntityList;

    return {
        setters: [function (_) {
            _createClass = _['default'];
        }, function (_2) {
            _classCallCheck = _2['default'];
        }, function (_3) {
            _Map = _3['default'];
        }, function (_c) {
            _get = _c['default'];
        }, function (_d) {
            _inherits = _d['default'];
        }, function (_b) {
            LinkedList = _b['default'];
        }],
        execute: function () {
            'use strict';

            EntityList = (function (_LinkedList) {
                _inherits(EntityList, _LinkedList);

                function EntityList() {
                    _classCallCheck(this, EntityList);

                    _get(Object.getPrototypeOf(EntityList.prototype), 'constructor', this).call(this);
                    this._entities = new _Map();
                }

                _createClass(EntityList, [{
                    key: 'add',
                    value: function add(entity) {
                        var node = _get(Object.getPrototypeOf(EntityList.prototype), 'add', this).call(this, entity);
                        this._entities.set(entity.id, node);

                        return node;
                    }
                }, {
                    key: 'remove',
                    value: function remove(entity) {
                        var node = this._entities.get(entity.id);
                        if (node) {
                            this.removeNode(node);
                        }
                    }
                }, {
                    key: 'removeNode',
                    value: function removeNode(node) {
                        _get(Object.getPrototypeOf(EntityList.prototype), 'removeNode', this).call(this, node);
                        this._entities['delete'](node.data.id);
                    }
                }, {
                    key: 'has',
                    value: function has(entity) {
                        return this._entities.has(entity.id);
                    }
                }, {
                    key: 'clear',
                    value: function clear() {
                        _get(Object.getPrototypeOf(EntityList.prototype), 'clear', this).call(this);
                        this._entities.clear();
                    }
                }]);

                return EntityList;
            })(LinkedList);

            _export('default', EntityList);
        }
    };
});
$__System.register('5', ['4', '6', '7', 'e', 'f'], function (_export) {
    var EntityList, _createClass, _classCallCheck, Entity, Signal, Family;

    return {
        setters: [function (_3) {
            EntityList = _3['default'];
        }, function (_) {
            _createClass = _['default'];
        }, function (_2) {
            _classCallCheck = _2['default'];
        }, function (_e) {
            Entity = _e['default'];
        }, function (_f) {
            Signal = _f['default'];
        }],
        execute: function () {
            'use strict';

            Family = (function () {
                _createClass(Family, null, [{
                    key: 'getId',
                    value: function getId() {
                        for (var _len = arguments.length, traits = Array(_len), _key = 0; _key < _len; _key++) {
                            traits[_key] = arguments[_key];
                        }

                        return traits.sort().join(',');
                    }
                }]);

                function Family() {
                    _classCallCheck(this, Family);

                    this._anyOfComponents = [];
                    this._allOfComponents = [];
                    this._noneOfComponents = [];

                    this.entities = new EntityList();

                    for (var _len2 = arguments.length, traits = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        traits[_key2] = arguments[_key2];
                    }

                    this.assignTaxonomy(traits);

                    this.onAddEntity = new Signal();
                    this.onRemoveEntity = new Signal();
                }

                _createClass(Family, [{
                    key: 'assignTaxonomy',
                    value: function assignTaxonomy(traits) {
                        // TODO: something if trying to change this after it's filled?
                        this._allOfComponents = traits.filter(function (name) {
                            return name.substr(0, 1) !== '!' && name.substr(0, 1) !== '?';
                        });

                        this._noneOfComponents = traits.filter(function (name) {
                            return name.substr(0, 1) === '!';
                        }).map(function (name) {
                            return name.substr(1);
                        });

                        this._anyOfComponents = traits.filter(function (name) {
                            return name.substr(0, 1) === '?';
                        }).map(function (name) {
                            return name.substr(1);
                        });
                    }
                }, {
                    key: 'addEntity',
                    value: function addEntity(entity) {
                        return this._checkEntity(entity);
                    }
                }, {
                    key: 'removeEntity',
                    value: function removeEntity(entity) {
                        return this._removeEntity(entity);
                    }
                }, {
                    key: '_addEntity',
                    value: function _addEntity(entity) {
                        if (!this.entities.has(entity)) {
                            this.entities.add(entity);
                            this.onAddEntity.post(entity);

                            return true;
                        }

                        return false;
                    }
                }, {
                    key: '_removeEntity',
                    value: function _removeEntity(entity) {
                        if (this.entities.has(entity)) {
                            this.entities.remove(entity);
                            this.onRemoveEntity.post(entity);

                            return true;
                        }

                        return false;
                    }
                }, {
                    key: 'forEach',
                    value: function forEach(callback) {
                        var reversed = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

                        this.entities.forEach(callback, reversed);
                    }
                }, {
                    key: '_checkEntity',
                    value: function _checkEntity(entity, components) {
                        var contains = this.entities.has(entity),
                            interested = true;

                        components = components || entity.getComponentNames();

                        if (this._allOfComponents.length > 0) {
                            interested = this._allOfComponents.every(function (component) {
                                return components.indexOf(component) >= 0;
                            });
                        }

                        if (this._noneOfComponents.length > 0 && interested) {
                            interested = this._noneOfComponents.every(function (component) {
                                return components.indexOf(component) < 0;
                            });
                        }

                        if (this._anyOfComponents.length > 0 && interested) {
                            interested = this._anyOfComponents.some(function (component) {
                                return components.indexOf(component) >= 0;
                            });
                        }

                        if (contains && !interested) {
                            this._removeEntity(entity);
                        } else if (!contains && interested) {
                            this._addEntity(entity);
                        }

                        return interested;
                    }
                }]);

                return Family;
            })();

            _export('default', Family);
        }
    };
});
$__System.register('10', ['7'], function (_export) {
    var _classCallCheck, LinkedListNode;

    return {
        setters: [function (_) {
            _classCallCheck = _['default'];
        }],
        execute: function () {
            'use strict';

            LinkedListNode = function LinkedListNode(data) {
                _classCallCheck(this, LinkedListNode);

                this.prev = this.next = null;
                this.data = data;
            };

            _export('default', LinkedListNode);
        }
    };
});
$__System.registerDynamic("11", ["12", "13", "14"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('12');
  $__require('13');
  module.exports = $__require('14')('iterator');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("15", ["11"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('11'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("16", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
  }
  process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      setTimeout(drainQueue, 0);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("17", ["16"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('16');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("18", ["17"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__System._nodeRequire ? process : $__require('17');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("19", ["18"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('18');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("1a", ["1b", "1c"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var isObject = $__require('1b'),
      document = $__require('1c').document,
      is = isObject(document) && isObject(document.createElement);
  module.exports = function(it) {
    return is ? document.createElement(it) : {};
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("1d", ["1c"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('1c').document && document.documentElement;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("1e", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(fn, args, that) {
    var un = that === undefined;
    switch (args.length) {
      case 0:
        return un ? fn() : fn.call(that);
      case 1:
        return un ? fn(args[0]) : fn.call(that, args[0]);
      case 2:
        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
      case 3:
        return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
      case 4:
        return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
    }
    return fn.apply(that, args);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("1f", ["20", "1e", "1d", "1a", "1c", "21", "19"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var ctx = $__require('20'),
        invoke = $__require('1e'),
        html = $__require('1d'),
        cel = $__require('1a'),
        global = $__require('1c'),
        process = global.process,
        setTask = global.setImmediate,
        clearTask = global.clearImmediate,
        MessageChannel = global.MessageChannel,
        counter = 0,
        queue = {},
        ONREADYSTATECHANGE = 'onreadystatechange',
        defer,
        channel,
        port;
    var run = function() {
      var id = +this;
      if (queue.hasOwnProperty(id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    };
    var listner = function(event) {
      run.call(event.data);
    };
    if (!setTask || !clearTask) {
      setTask = function setImmediate(fn) {
        var args = [],
            i = 1;
        while (arguments.length > i)
          args.push(arguments[i++]);
        queue[++counter] = function() {
          invoke(typeof fn == 'function' ? fn : Function(fn), args);
        };
        defer(counter);
        return counter;
      };
      clearTask = function clearImmediate(id) {
        delete queue[id];
      };
      if ($__require('21')(process) == 'process') {
        defer = function(id) {
          process.nextTick(ctx(run, id, 1));
        };
      } else if (MessageChannel) {
        channel = new MessageChannel;
        port = channel.port2;
        channel.port1.onmessage = listner;
        defer = ctx(port.postMessage, port, 1);
      } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
        defer = function(id) {
          global.postMessage(id + '', '*');
        };
        global.addEventListener('message', listner, false);
      } else if (ONREADYSTATECHANGE in cel('script')) {
        defer = function(id) {
          html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function() {
            html.removeChild(this);
            run.call(id);
          };
        };
      } else {
        defer = function(id) {
          setTimeout(ctx(run, id, 1), 0);
        };
      }
    }
    module.exports = {
      set: setTask,
      clear: clearTask
    };
  })($__require('19'));
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("22", ["1c", "1f", "21", "19"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var global = $__require('1c'),
        macrotask = $__require('1f').set,
        Observer = global.MutationObserver || global.WebKitMutationObserver,
        process = global.process,
        Promise = global.Promise,
        isNode = $__require('21')(process) == 'process',
        head,
        last,
        notify;
    var flush = function() {
      var parent,
          domain,
          fn;
      if (isNode && (parent = process.domain)) {
        process.domain = null;
        parent.exit();
      }
      while (head) {
        domain = head.domain;
        fn = head.fn;
        if (domain)
          domain.enter();
        fn();
        if (domain)
          domain.exit();
        head = head.next;
      }
      last = undefined;
      if (parent)
        parent.enter();
    };
    if (isNode) {
      notify = function() {
        process.nextTick(flush);
      };
    } else if (Observer) {
      var toggle = 1,
          node = document.createTextNode('');
      new Observer(flush).observe(node, {characterData: true});
      notify = function() {
        node.data = toggle = -toggle;
      };
    } else if (Promise && Promise.resolve) {
      notify = function() {
        Promise.resolve().then(flush);
      };
    } else {
      notify = function() {
        macrotask.call(global, flush);
      };
    }
    module.exports = function asap(fn) {
      var task = {
        fn: fn,
        next: undefined,
        domain: isNode && process.domain
      };
      if (last)
        last.next = task;
      if (!head) {
        head = task;
        notify();
      }
      last = task;
    };
  })($__require('19'));
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("23", ["24", "25", "14"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var anObject = $__require('24'),
      aFunction = $__require('25'),
      SPECIES = $__require('14')('species');
  module.exports = function(O, D) {
    var C = anObject(O).constructor,
        S;
    return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("26", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = Object.is || function is(x, y) {
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("27", ["28", "29", "1c", "20", "2a", "2b", "1b", "24", "25", "2c", "2d", "2e", "26", "14", "23", "22", "2f", "30", "31", "32", "33", "34", "19"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var $ = $__require('28'),
        LIBRARY = $__require('29'),
        global = $__require('1c'),
        ctx = $__require('20'),
        classof = $__require('2a'),
        $export = $__require('2b'),
        isObject = $__require('1b'),
        anObject = $__require('24'),
        aFunction = $__require('25'),
        strictNew = $__require('2c'),
        forOf = $__require('2d'),
        setProto = $__require('2e').set,
        same = $__require('26'),
        SPECIES = $__require('14')('species'),
        speciesConstructor = $__require('23'),
        asap = $__require('22'),
        PROMISE = 'Promise',
        process = global.process,
        isNode = classof(process) == 'process',
        P = global[PROMISE],
        Wrapper;
    var testResolve = function(sub) {
      var test = new P(function() {});
      if (sub)
        test.constructor = Object;
      return P.resolve(test) === test;
    };
    var USE_NATIVE = function() {
      var works = false;
      function P2(x) {
        var self = new P(x);
        setProto(self, P2.prototype);
        return self;
      }
      try {
        works = P && P.resolve && testResolve();
        setProto(P2, P);
        P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
        if (!(P2.resolve(5).then(function() {}) instanceof P2)) {
          works = false;
        }
        if (works && $__require('2f')) {
          var thenableThenGotten = false;
          P.resolve($.setDesc({}, 'then', {get: function() {
              thenableThenGotten = true;
            }}));
          works = thenableThenGotten;
        }
      } catch (e) {
        works = false;
      }
      return works;
    }();
    var sameConstructor = function(a, b) {
      if (LIBRARY && a === P && b === Wrapper)
        return true;
      return same(a, b);
    };
    var getConstructor = function(C) {
      var S = anObject(C)[SPECIES];
      return S != undefined ? S : C;
    };
    var isThenable = function(it) {
      var then;
      return isObject(it) && typeof(then = it.then) == 'function' ? then : false;
    };
    var PromiseCapability = function(C) {
      var resolve,
          reject;
      this.promise = new C(function($$resolve, $$reject) {
        if (resolve !== undefined || reject !== undefined)
          throw TypeError('Bad Promise constructor');
        resolve = $$resolve;
        reject = $$reject;
      });
      this.resolve = aFunction(resolve), this.reject = aFunction(reject);
    };
    var perform = function(exec) {
      try {
        exec();
      } catch (e) {
        return {error: e};
      }
    };
    var notify = function(record, isReject) {
      if (record.n)
        return;
      record.n = true;
      var chain = record.c;
      asap(function() {
        var value = record.v,
            ok = record.s == 1,
            i = 0;
        var run = function(reaction) {
          var handler = ok ? reaction.ok : reaction.fail,
              resolve = reaction.resolve,
              reject = reaction.reject,
              result,
              then;
          try {
            if (handler) {
              if (!ok)
                record.h = true;
              result = handler === true ? value : handler(value);
              if (result === reaction.promise) {
                reject(TypeError('Promise-chain cycle'));
              } else if (then = isThenable(result)) {
                then.call(result, resolve, reject);
              } else
                resolve(result);
            } else
              reject(value);
          } catch (e) {
            reject(e);
          }
        };
        while (chain.length > i)
          run(chain[i++]);
        chain.length = 0;
        record.n = false;
        if (isReject)
          setTimeout(function() {
            var promise = record.p,
                handler,
                console;
            if (isUnhandled(promise)) {
              if (isNode) {
                process.emit('unhandledRejection', value, promise);
              } else if (handler = global.onunhandledrejection) {
                handler({
                  promise: promise,
                  reason: value
                });
              } else if ((console = global.console) && console.error) {
                console.error('Unhandled promise rejection', value);
              }
            }
            record.a = undefined;
          }, 1);
      });
    };
    var isUnhandled = function(promise) {
      var record = promise._d,
          chain = record.a || record.c,
          i = 0,
          reaction;
      if (record.h)
        return false;
      while (chain.length > i) {
        reaction = chain[i++];
        if (reaction.fail || !isUnhandled(reaction.promise))
          return false;
      }
      return true;
    };
    var $reject = function(value) {
      var record = this;
      if (record.d)
        return;
      record.d = true;
      record = record.r || record;
      record.v = value;
      record.s = 2;
      record.a = record.c.slice();
      notify(record, true);
    };
    var $resolve = function(value) {
      var record = this,
          then;
      if (record.d)
        return;
      record.d = true;
      record = record.r || record;
      try {
        if (record.p === value)
          throw TypeError("Promise can't be resolved itself");
        if (then = isThenable(value)) {
          asap(function() {
            var wrapper = {
              r: record,
              d: false
            };
            try {
              then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
            } catch (e) {
              $reject.call(wrapper, e);
            }
          });
        } else {
          record.v = value;
          record.s = 1;
          notify(record, false);
        }
      } catch (e) {
        $reject.call({
          r: record,
          d: false
        }, e);
      }
    };
    if (!USE_NATIVE) {
      P = function Promise(executor) {
        aFunction(executor);
        var record = this._d = {
          p: strictNew(this, P, PROMISE),
          c: [],
          a: undefined,
          s: 0,
          d: false,
          v: undefined,
          h: false,
          n: false
        };
        try {
          executor(ctx($resolve, record, 1), ctx($reject, record, 1));
        } catch (err) {
          $reject.call(record, err);
        }
      };
      $__require('30')(P.prototype, {
        then: function then(onFulfilled, onRejected) {
          var reaction = new PromiseCapability(speciesConstructor(this, P)),
              promise = reaction.promise,
              record = this._d;
          reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
          reaction.fail = typeof onRejected == 'function' && onRejected;
          record.c.push(reaction);
          if (record.a)
            record.a.push(reaction);
          if (record.s)
            notify(record, false);
          return promise;
        },
        'catch': function(onRejected) {
          return this.then(undefined, onRejected);
        }
      });
    }
    $export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
    $__require('31')(P, PROMISE);
    $__require('32')(PROMISE);
    Wrapper = $__require('33')[PROMISE];
    $export($export.S + $export.F * !USE_NATIVE, PROMISE, {reject: function reject(r) {
        var capability = new PromiseCapability(this),
            $$reject = capability.reject;
        $$reject(r);
        return capability.promise;
      }});
    $export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {resolve: function resolve(x) {
        if (x instanceof P && sameConstructor(x.constructor, this))
          return x;
        var capability = new PromiseCapability(this),
            $$resolve = capability.resolve;
        $$resolve(x);
        return capability.promise;
      }});
    $export($export.S + $export.F * !(USE_NATIVE && $__require('34')(function(iter) {
      P.all(iter)['catch'](function() {});
    })), PROMISE, {
      all: function all(iterable) {
        var C = getConstructor(this),
            capability = new PromiseCapability(C),
            resolve = capability.resolve,
            reject = capability.reject,
            values = [];
        var abrupt = perform(function() {
          forOf(iterable, false, values.push, values);
          var remaining = values.length,
              results = Array(remaining);
          if (remaining)
            $.each.call(values, function(promise, index) {
              var alreadyCalled = false;
              C.resolve(promise).then(function(value) {
                if (alreadyCalled)
                  return;
                alreadyCalled = true;
                results[index] = value;
                --remaining || resolve(results);
              }, reject);
            });
          else
            resolve(results);
        });
        if (abrupt)
          reject(abrupt.error);
        return capability.promise;
      },
      race: function race(iterable) {
        var C = getConstructor(this),
            capability = new PromiseCapability(C),
            reject = capability.reject;
        var abrupt = perform(function() {
          forOf(iterable, false, function(promise) {
            C.resolve(promise).then(capability.resolve, reject);
          });
        });
        if (abrupt)
          reject(abrupt.error);
        return capability.promise;
      }
    });
  })($__require('19'));
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("35", ["36", "12", "13", "27", "33"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('36');
  $__require('12');
  $__require('13');
  $__require('27');
  module.exports = $__require('33').Promise;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("37", ["35"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('35'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("38", ["21"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var cof = $__require('21');
  module.exports = Array.isArray || function(arg) {
    return cof(arg) == 'Array';
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("39", ["28"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('28');
  module.exports = function(it) {
    var keys = $.getKeys(it),
        getSymbols = $.getSymbols;
    if (getSymbols) {
      var symbols = getSymbols(it),
          isEnum = $.isEnum,
          i = 0,
          key;
      while (symbols.length > i)
        if (isEnum.call(it, key = symbols[i++]))
          keys.push(key);
    }
    return keys;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3a", ["3b", "28"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toIObject = $__require('3b'),
      getNames = $__require('28').getNames,
      toString = {}.toString;
  var windowNames = typeof window == 'object' && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
  var getWindowNames = function(it) {
    try {
      return getNames(it);
    } catch (e) {
      return windowNames.slice();
    }
  };
  module.exports.get = function getOwnPropertyNames(it) {
    if (windowNames && toString.call(it) == '[object Window]')
      return getWindowNames(it);
    return getNames(toIObject(it));
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3c", ["28", "3b"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('28'),
      toIObject = $__require('3b');
  module.exports = function(object, el) {
    var O = toIObject(object),
        keys = $.getKeys(O),
        length = keys.length,
        index = 0,
        key;
    while (length > index)
      if (O[key = keys[index++]] === el)
        return key;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3d", ["28", "1c", "3e", "2f", "2b", "3f", "40", "41", "31", "42", "14", "3c", "3a", "39", "38", "24", "3b", "43", "29"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('28'),
      global = $__require('1c'),
      has = $__require('3e'),
      DESCRIPTORS = $__require('2f'),
      $export = $__require('2b'),
      redefine = $__require('3f'),
      $fails = $__require('40'),
      shared = $__require('41'),
      setToStringTag = $__require('31'),
      uid = $__require('42'),
      wks = $__require('14'),
      keyOf = $__require('3c'),
      $names = $__require('3a'),
      enumKeys = $__require('39'),
      isArray = $__require('38'),
      anObject = $__require('24'),
      toIObject = $__require('3b'),
      createDesc = $__require('43'),
      getDesc = $.getDesc,
      setDesc = $.setDesc,
      _create = $.create,
      getNames = $names.get,
      $Symbol = global.Symbol,
      $JSON = global.JSON,
      _stringify = $JSON && $JSON.stringify,
      setter = false,
      HIDDEN = wks('_hidden'),
      isEnum = $.isEnum,
      SymbolRegistry = shared('symbol-registry'),
      AllSymbols = shared('symbols'),
      useNative = typeof $Symbol == 'function',
      ObjectProto = Object.prototype;
  var setSymbolDesc = DESCRIPTORS && $fails(function() {
    return _create(setDesc({}, 'a', {get: function() {
        return setDesc(this, 'a', {value: 7}).a;
      }})).a != 7;
  }) ? function(it, key, D) {
    var protoDesc = getDesc(ObjectProto, key);
    if (protoDesc)
      delete ObjectProto[key];
    setDesc(it, key, D);
    if (protoDesc && it !== ObjectProto)
      setDesc(ObjectProto, key, protoDesc);
  } : setDesc;
  var wrap = function(tag) {
    var sym = AllSymbols[tag] = _create($Symbol.prototype);
    sym._k = tag;
    DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
      configurable: true,
      set: function(value) {
        if (has(this, HIDDEN) && has(this[HIDDEN], tag))
          this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, createDesc(1, value));
      }
    });
    return sym;
  };
  var isSymbol = function(it) {
    return typeof it == 'symbol';
  };
  var $defineProperty = function defineProperty(it, key, D) {
    if (D && has(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!has(it, HIDDEN))
          setDesc(it, HIDDEN, createDesc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (has(it, HIDDEN) && it[HIDDEN][key])
          it[HIDDEN][key] = false;
        D = _create(D, {enumerable: createDesc(0, false)});
      }
      return setSymbolDesc(it, key, D);
    }
    return setDesc(it, key, D);
  };
  var $defineProperties = function defineProperties(it, P) {
    anObject(it);
    var keys = enumKeys(P = toIObject(P)),
        i = 0,
        l = keys.length,
        key;
    while (l > i)
      $defineProperty(it, key = keys[i++], P[key]);
    return it;
  };
  var $create = function create(it, P) {
    return P === undefined ? _create(it) : $defineProperties(_create(it), P);
  };
  var $propertyIsEnumerable = function propertyIsEnumerable(key) {
    var E = isEnum.call(this, key);
    return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
  };
  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
    var D = getDesc(it = toIObject(it), key);
    if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))
      D.enumerable = true;
    return D;
  };
  var $getOwnPropertyNames = function getOwnPropertyNames(it) {
    var names = getNames(toIObject(it)),
        result = [],
        i = 0,
        key;
    while (names.length > i)
      if (!has(AllSymbols, key = names[i++]) && key != HIDDEN)
        result.push(key);
    return result;
  };
  var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
    var names = getNames(toIObject(it)),
        result = [],
        i = 0,
        key;
    while (names.length > i)
      if (has(AllSymbols, key = names[i++]))
        result.push(AllSymbols[key]);
    return result;
  };
  var $stringify = function stringify(it) {
    if (it === undefined || isSymbol(it))
      return;
    var args = [it],
        i = 1,
        $$ = arguments,
        replacer,
        $replacer;
    while ($$.length > i)
      args.push($$[i++]);
    replacer = args[1];
    if (typeof replacer == 'function')
      $replacer = replacer;
    if ($replacer || !isArray(replacer))
      replacer = function(key, value) {
        if ($replacer)
          value = $replacer.call(this, key, value);
        if (!isSymbol(value))
          return value;
      };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  };
  var buggyJSON = $fails(function() {
    var S = $Symbol();
    return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
  });
  if (!useNative) {
    $Symbol = function Symbol() {
      if (isSymbol(this))
        throw TypeError('Symbol is not a constructor');
      return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
    };
    redefine($Symbol.prototype, 'toString', function toString() {
      return this._k;
    });
    isSymbol = function(it) {
      return it instanceof $Symbol;
    };
    $.create = $create;
    $.isEnum = $propertyIsEnumerable;
    $.getDesc = $getOwnPropertyDescriptor;
    $.setDesc = $defineProperty;
    $.setDescs = $defineProperties;
    $.getNames = $names.get = $getOwnPropertyNames;
    $.getSymbols = $getOwnPropertySymbols;
    if (DESCRIPTORS && !$__require('29')) {
      redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
    }
  }
  var symbolStatics = {
    'for': function(key) {
      return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
    },
    keyFor: function keyFor(key) {
      return keyOf(SymbolRegistry, key);
    },
    useSetter: function() {
      setter = true;
    },
    useSimple: function() {
      setter = false;
    }
  };
  $.each.call(('hasInstance,isConcatSpreadable,iterator,match,replace,search,' + 'species,split,toPrimitive,toStringTag,unscopables').split(','), function(it) {
    var sym = wks(it);
    symbolStatics[it] = useNative ? sym : wrap(sym);
  });
  setter = true;
  $export($export.G + $export.W, {Symbol: $Symbol});
  $export($export.S, 'Symbol', symbolStatics);
  $export($export.S + $export.F * !useNative, 'Object', {
    create: $create,
    defineProperty: $defineProperty,
    defineProperties: $defineProperties,
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    getOwnPropertyNames: $getOwnPropertyNames,
    getOwnPropertySymbols: $getOwnPropertySymbols
  });
  $JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});
  setToStringTag($Symbol, 'Symbol');
  setToStringTag(Math, 'Math', true);
  setToStringTag(global.JSON, 'JSON', true);
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("44", ["3d", "36", "33"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('3d');
  $__require('36');
  module.exports = $__require('33').Symbol;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("45", ["44"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('44');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("46", ["45"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('45'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("47", ["46", "48", "49", "37", "19"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var _Symbol = $__require('46')["default"];
    var _Object$create = $__require('48')["default"];
    var _Object$setPrototypeOf = $__require('49')["default"];
    var _Promise = $__require('37')["default"];
    !(function(global) {
      "use strict";
      var hasOwn = Object.prototype.hasOwnProperty;
      var undefined;
      var $Symbol = typeof _Symbol === "function" ? _Symbol : {};
      var iteratorSymbol = $Symbol.iterator || "@@iterator";
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
      var inModule = typeof module === "object";
      var runtime = global.regeneratorRuntime;
      if (runtime) {
        if (inModule) {
          module.exports = runtime;
        }
        return;
      }
      runtime = global.regeneratorRuntime = inModule ? module.exports : {};
      function wrap(innerFn, outerFn, self, tryLocsList) {
        var generator = _Object$create((outerFn || Generator).prototype);
        var context = new Context(tryLocsList || []);
        generator._invoke = makeInvokeMethod(innerFn, self, context);
        return generator;
      }
      runtime.wrap = wrap;
      function tryCatch(fn, obj, arg) {
        try {
          return {
            type: "normal",
            arg: fn.call(obj, arg)
          };
        } catch (err) {
          return {
            type: "throw",
            arg: err
          };
        }
      }
      var GenStateSuspendedStart = "suspendedStart";
      var GenStateSuspendedYield = "suspendedYield";
      var GenStateExecuting = "executing";
      var GenStateCompleted = "completed";
      var ContinueSentinel = {};
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}
      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
      GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
      GeneratorFunctionPrototype.constructor = GeneratorFunction;
      GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";
      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function(method) {
          prototype[method] = function(arg) {
            return this._invoke(method, arg);
          };
        });
      }
      runtime.isGeneratorFunction = function(genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
      };
      runtime.mark = function(genFun) {
        if (_Object$setPrototypeOf) {
          _Object$setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          if (!(toStringTagSymbol in genFun)) {
            genFun[toStringTagSymbol] = "GeneratorFunction";
          }
        }
        genFun.prototype = _Object$create(Gp);
        return genFun;
      };
      runtime.awrap = function(arg) {
        return new AwaitArgument(arg);
      };
      function AwaitArgument(arg) {
        this.arg = arg;
      }
      function AsyncIterator(generator) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if (record.type === "throw") {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;
            if (value instanceof AwaitArgument) {
              return _Promise.resolve(value.arg).then(function(value) {
                invoke("next", value, resolve, reject);
              }, function(err) {
                invoke("throw", err, resolve, reject);
              });
            }
            return _Promise.resolve(value).then(function(unwrapped) {
              result.value = unwrapped;
              resolve(result);
            }, reject);
          }
        }
        if (typeof process === "object" && process.domain) {
          invoke = process.domain.bind(invoke);
        }
        var previousPromise;
        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new _Promise(function(resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
        this._invoke = enqueue;
      }
      defineIteratorMethods(AsyncIterator.prototype);
      runtime.async = function(innerFn, outerFn, self, tryLocsList) {
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
        return runtime.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
      };
      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
          }
          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg;
            }
            return doneResult();
          }
          while (true) {
            var delegate = context.delegate;
            if (delegate) {
              if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
                context.delegate = null;
                var returnMethod = delegate.iterator["return"];
                if (returnMethod) {
                  var record = tryCatch(returnMethod, delegate.iterator, arg);
                  if (record.type === "throw") {
                    method = "throw";
                    arg = record.arg;
                    continue;
                  }
                }
                if (method === "return") {
                  continue;
                }
              }
              var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);
              if (record.type === "throw") {
                context.delegate = null;
                method = "throw";
                arg = record.arg;
                continue;
              }
              method = "next";
              arg = undefined;
              var info = record.arg;
              if (info.done) {
                context[delegate.resultName] = info.value;
                context.next = delegate.nextLoc;
              } else {
                state = GenStateSuspendedYield;
                return info;
              }
              context.delegate = null;
            }
            if (method === "next") {
              if (state === GenStateSuspendedYield) {
                context.sent = arg;
              } else {
                context.sent = undefined;
              }
            } else if (method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw arg;
              }
              if (context.dispatchException(arg)) {
                method = "next";
                arg = undefined;
              }
            } else if (method === "return") {
              context.abrupt("return", arg);
            }
            state = GenStateExecuting;
            var record = tryCatch(innerFn, self, context);
            if (record.type === "normal") {
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;
              var info = {
                value: record.arg,
                done: context.done
              };
              if (record.arg === ContinueSentinel) {
                if (context.delegate && method === "next") {
                  arg = undefined;
                }
              } else {
                return info;
              }
            } else if (record.type === "throw") {
              state = GenStateCompleted;
              method = "throw";
              arg = record.arg;
            }
          }
        };
      }
      defineIteratorMethods(Gp);
      Gp[iteratorSymbol] = function() {
        return this;
      };
      Gp[toStringTagSymbol] = "Generator";
      Gp.toString = function() {
        return "[object Generator]";
      };
      function pushTryEntry(locs) {
        var entry = {tryLoc: locs[0]};
        if (1 in locs) {
          entry.catchLoc = locs[1];
        }
        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }
        this.tryEntries.push(entry);
      }
      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
      }
      function Context(tryLocsList) {
        this.tryEntries = [{tryLoc: "root"}];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }
      runtime.keys = function(object) {
        var keys = [];
        for (var key in object) {
          keys.push(key);
        }
        keys.reverse();
        return function next() {
          while (keys.length) {
            var key = keys.pop();
            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          }
          next.done = true;
          return next;
        };
      };
      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }
          if (typeof iterable.next === "function") {
            return iterable;
          }
          if (!isNaN(iterable.length)) {
            var i = -1,
                next = function next() {
                  while (++i < iterable.length) {
                    if (hasOwn.call(iterable, i)) {
                      next.value = iterable[i];
                      next.done = false;
                      return next;
                    }
                  }
                  next.value = undefined;
                  next.done = true;
                  return next;
                };
            return next.next = next;
          }
        }
        return {next: doneResult};
      }
      runtime.values = values;
      function doneResult() {
        return {
          value: undefined,
          done: true
        };
      }
      Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
          this.prev = 0;
          this.next = 0;
          this.sent = undefined;
          this.done = false;
          this.delegate = null;
          this.tryEntries.forEach(resetTryEntry);
          if (!skipTempReset) {
            for (var name in this) {
              if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                this[name] = undefined;
              }
            }
          }
        },
        stop: function stop() {
          this.done = true;
          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;
          if (rootRecord.type === "throw") {
            throw rootRecord.arg;
          }
          return this.rval;
        },
        dispatchException: function dispatchException(exception) {
          if (this.done) {
            throw exception;
          }
          var context = this;
          function handle(loc, caught) {
            record.type = "throw";
            record.arg = exception;
            context.next = loc;
            return !!caught;
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;
            if (entry.tryLoc === "root") {
              return handle("end");
            }
            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc");
              var hasFinally = hasOwn.call(entry, "finallyLoc");
              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error("try statement without catch or finally");
              }
            }
          }
        },
        abrupt: function abrupt(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }
          if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
            finallyEntry = null;
          }
          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;
          if (finallyEntry) {
            this.next = finallyEntry.finallyLoc;
          } else {
            this.complete(record);
          }
          return ContinueSentinel;
        },
        complete: function complete(record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }
          if (record.type === "break" || record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = record.arg;
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }
        },
        finish: function finish(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },
        "catch": function _catch(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;
              if (record.type === "throw") {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          };
          return ContinueSentinel;
        }
      };
    })(typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : undefined);
  })($__require('19'));
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("4a", ["47"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var g = typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : this;
  var hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
  var oldRuntime = hadRuntime && g.regeneratorRuntime;
  g.regeneratorRuntime = undefined;
  module.exports = $__require('47');
  if (hadRuntime) {
    g.regeneratorRuntime = oldRuntime;
  } else {
    try {
      delete g.regeneratorRuntime;
    } catch (e) {
      g.regeneratorRuntime = undefined;
    }
  }
  module.exports = {
    "default": module.exports,
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("4b", ["4a"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('4a');
  global.define = __define;
  return module.exports;
});

$__System.register('b', ['6', '7', '9', '10', '15', '4c', '4b'], function (_export) {
    var _createClass, _classCallCheck, _getIterator, LinkedListNode, _Symbol$iterator, _Array$from, _regeneratorRuntime, LinkedList;

    return {
        setters: [function (_) {
            _createClass = _['default'];
        }, function (_2) {
            _classCallCheck = _2['default'];
        }, function (_3) {
            _getIterator = _3['default'];
        }, function (_5) {
            LinkedListNode = _5['default'];
        }, function (_4) {
            _Symbol$iterator = _4['default'];
        }, function (_c) {
            _Array$from = _c['default'];
        }, function (_b) {
            _regeneratorRuntime = _b['default'];
        }],
        execute: function () {
            'use strict';

            LinkedList = (function () {
                function LinkedList() {
                    _classCallCheck(this, LinkedList);

                    this.head = this.tail = null;
                    this.size = 0;
                }

                _createClass(LinkedList, [{
                    key: 'addNode',
                    value: function addNode(node) {
                        if (this.head === null) {
                            this.head = this.tail = node;
                        } else {
                            node.prev = this.tail;
                            this.tail.next = node;
                            this.tail = node;
                        }

                        this.size++;
                    }
                }, {
                    key: 'add',
                    value: function add(obj) {
                        var node = new LinkedListNode(obj);

                        this.addNode(node);

                        return node;
                    }
                }, {
                    key: 'findNode',
                    value: function findNode(obj) {
                        var eqFn = arguments.length <= 1 || arguments[1] === undefined ? function (a, b) {
                            return a === b;
                        } : arguments[1];
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = _getIterator(this.nodes()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var node = _step.value;

                                if (eqFn(node.data, obj)) {
                                    return node;
                                }
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator['return']) {
                                    _iterator['return']();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }

                        return null;
                    }
                }, {
                    key: 'has',
                    value: function has(obj) {
                        var eqFn = arguments.length <= 1 || arguments[1] === undefined ? function (a, b) {
                            return a === b;
                        } : arguments[1];

                        return !!this.findNode(obj, eqFn);
                    }
                }, {
                    key: 'findWhere',
                    value: function findWhere(obj) {
                        var data = [];

                        this.forEach(function (item) {
                            for (var key in obj) {
                                if (item.hasOwnProperty(key) && item[key] === obj[key]) {
                                    data.push(item);
                                }
                            }
                        });

                        return data;
                    }
                }, {
                    key: 'remove',
                    value: function remove(obj) {
                        var eqFn = arguments.length <= 1 || arguments[1] === undefined ? function (a, b) {
                            return a === b;
                        } : arguments[1];

                        this.removeNode(this.findNode(obj, eqFn));
                    }
                }, {
                    key: 'removeNode',
                    value: function removeNode(node) {
                        if (!node) {
                            return;
                        }

                        if (node.prev === null) {
                            this.head = node.next;
                        } else {
                            node.prev.next = node.next;
                        }

                        if (node.next === null) {
                            this.tail = node.prev;
                        } else {
                            node.next.prev = node.prev;
                        }

                        this.size--;
                    }
                }, {
                    key: 'clear',
                    value: function clear() {
                        this.head = this.tail = null;
                        this.size = 0;
                    }
                }, {
                    key: 'isEmpty',
                    value: function isEmpty() {
                        return this.size === 0;
                    }
                }, {
                    key: 'toArray',
                    value: function toArray() {
                        return _Array$from(this);
                    }
                }, {
                    key: 'forEach',
                    value: function forEach(callback) {
                        var reversed = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = _getIterator(this.nodes(reversed)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var node = _step2.value;

                                if (callback(node.data) === false) {
                                    break;
                                }
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                                    _iterator2['return']();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
                    }
                }, {
                    key: 'nodes',
                    value: _regeneratorRuntime.mark(function nodes() {
                        var reversed = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
                        var node;
                        return _regeneratorRuntime.wrap(function nodes$(context$2$0) {
                            while (1) switch (context$2$0.prev = context$2$0.next) {
                                case 0:
                                    node = reversed ? this.tail : this.head;

                                case 1:
                                    if (!node) {
                                        context$2$0.next = 7;
                                        break;
                                    }

                                    context$2$0.next = 4;
                                    return node;

                                case 4:
                                    node = reversed ? node.prev : node.next;
                                    context$2$0.next = 1;
                                    break;

                                case 7:
                                case 'end':
                                    return context$2$0.stop();
                            }
                        }, nodes, this);
                    })
                }, {
                    key: _Symbol$iterator,
                    value: _regeneratorRuntime.mark(function value() {
                        var node;
                        return _regeneratorRuntime.wrap(function value$(context$2$0) {
                            while (1) switch (context$2$0.prev = context$2$0.next) {
                                case 0:
                                    node = this.head;

                                case 1:
                                    if (!node) {
                                        context$2$0.next = 7;
                                        break;
                                    }

                                    context$2$0.next = 4;
                                    return node.data;

                                case 4:
                                    node = node.next;
                                    context$2$0.next = 1;
                                    break;

                                case 7:
                                case 'end':
                                    return context$2$0.stop();
                            }
                        }, value, this);
                    })
                }, {
                    key: 'values',
                    get: function get() {
                        return this.toArray();
                    }
                }]);

                return LinkedList;
            })();

            _export('default', LinkedList);
        }
    };
});
$__System.registerDynamic("4d", ["24", "4e", "33"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var anObject = $__require('24'),
      get = $__require('4e');
  module.exports = $__require('33').getIterator = function(it) {
    var iterFn = get(it);
    if (typeof iterFn != 'function')
      throw TypeError(it + ' is not iterable!');
    return anObject(iterFn.call(it));
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("4f", ["13", "12", "4d"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('13');
  $__require('12');
  module.exports = $__require('4d');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("9", ["4f"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('4f'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.register('f', ['6', '7', '9', 'b'], function (_export) {
    var _createClass, _classCallCheck, _getIterator, LinkedList, Signal;

    return {
        setters: [function (_) {
            _createClass = _['default'];
        }, function (_2) {
            _classCallCheck = _2['default'];
        }, function (_3) {
            _getIterator = _3['default'];
        }, function (_b) {
            LinkedList = _b['default'];
        }],
        execute: function () {
            'use strict';

            Signal = (function () {
                function Signal() {
                    _classCallCheck(this, Signal);

                    this.listeners = new LinkedList();
                }

                _createClass(Signal, [{
                    key: 'post',
                    value: function post() {
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = _getIterator(this.listeners), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var listener = _step.value;

                                listener.apply(undefined, arguments);
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator['return']) {
                                    _iterator['return']();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    }
                }, {
                    key: 'add',
                    value: function add(listener) {
                        this.listeners.add(listener);
                    }
                }, {
                    key: 'remove',
                    value: function remove(listener) {
                        this.listeners.remove(listener);
                    }
                }, {
                    key: 'clear',
                    value: function clear() {
                        this.listeners.clear();
                    }
                }]);

                return Signal;
            })();

            _export('default', Signal);
        }
    };
});
$__System.registerDynamic("50", ["2b", "51"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $export = $__require('2b');
  $export($export.P, 'Map', {toJSON: $__require('51')('Map')});
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("52", ["53", "54"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var strong = $__require('53');
  $__require('54')('Map', function(get) {
    return function Map() {
      return get(this, arguments.length > 0 ? arguments[0] : undefined);
    };
  }, {
    get: function get(key) {
      var entry = strong.getEntry(this, key);
      return entry && entry.v;
    },
    set: function set(key, value) {
      return strong.def(this, key === 0 ? 0 : key, value);
    }
  }, strong, true);
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("55", ["36", "12", "13", "52", "50", "33"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('36');
  $__require('12');
  $__require('13');
  $__require('52');
  $__require('50');
  module.exports = $__require('33').Map;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("8", ["55"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('55'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.register('e', ['6', '7', '8', '4c', 'f'], function (_export) {
    var _createClass, _classCallCheck, _Map, _Array$from, Signal, ENTITY_ID, Entity;

    return {
        setters: [function (_) {
            _createClass = _['default'];
        }, function (_2) {
            _classCallCheck = _2['default'];
        }, function (_3) {
            _Map = _3['default'];
        }, function (_c) {
            _Array$from = _c['default'];
        }, function (_f) {
            Signal = _f['default'];
        }],
        execute: function () {
            'use strict';

            ENTITY_ID = 0;

            Entity = (function () {
                function Entity(name) {
                    _classCallCheck(this, Entity);

                    this.id = ++ENTITY_ID;
                    this.name = name;

                    this.components = new _Map();

                    this.onComponentAdded = new Signal();
                    this.onComponentRemoved = new Signal();
                }

                _createClass(Entity, [{
                    key: 'getComponentNames',
                    value: function getComponentNames() {
                        return _Array$from(this.components.keys());
                    }
                }, {
                    key: 'addComponent',
                    value: function addComponent(componentName) {
                        var componentData = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

                        if (this.components.has(componentName)) {
                            return;
                        }

                        // TODO: require componentData to be instance of Component?

                        this.components.set(componentName, componentData);

                        this.onComponentAdded.post(componentName, this);
                    }
                }, {
                    key: 'removeComponent',
                    value: function removeComponent(componentName) {
                        this.components['delete'](componentName);
                        this.onComponentRemoved.post(componentName, this);
                    }
                }, {
                    key: 'getComponent',
                    value: function getComponent(componentName) {
                        return this.components.get(componentName) || null;
                    }
                }, {
                    key: 'destroy',
                    value: function destroy() {
                        this.onComponentAdded.clear();
                        this.onComponentRemoved.clear();
                        //this.components.clear();
                    }
                }]);

                return Entity;
            })();

            _export('default', Entity);
        }
    };
});
$__System.registerDynamic("34", ["14"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var ITERATOR = $__require('14')('iterator'),
      SAFE_CLOSING = false;
  try {
    var riter = [7][ITERATOR]();
    riter['return'] = function() {
      SAFE_CLOSING = true;
    };
    Array.from(riter, function() {
      throw 2;
    });
  } catch (e) {}
  module.exports = function(exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING)
      return false;
    var safe = false;
    try {
      var arr = [7],
          iter = arr[ITERATOR]();
      iter.next = function() {
        safe = true;
      };
      arr[ITERATOR] = function() {
        return iter;
      };
      exec(arr);
    } catch (e) {}
    return safe;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("56", ["20", "2b", "57", "58", "59", "5a", "4e", "34"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var ctx = $__require('20'),
      $export = $__require('2b'),
      toObject = $__require('57'),
      call = $__require('58'),
      isArrayIter = $__require('59'),
      toLength = $__require('5a'),
      getIterFn = $__require('4e');
  $export($export.S + $export.F * !$__require('34')(function(iter) {
    Array.from(iter);
  }), 'Array', {from: function from(arrayLike) {
      var O = toObject(arrayLike),
          C = typeof this == 'function' ? this : Array,
          $$ = arguments,
          $$len = $$.length,
          mapfn = $$len > 1 ? $$[1] : undefined,
          mapping = mapfn !== undefined,
          index = 0,
          iterFn = getIterFn(O),
          length,
          result,
          step,
          iterator;
      if (mapping)
        mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
      if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
        for (iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++) {
          result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
        }
      } else {
        length = toLength(O.length);
        for (result = new C(length); length > index; index++) {
          result[index] = mapping ? mapfn(O[index], index) : O[index];
        }
      }
      result.length = index;
      return result;
    }});
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("5b", ["12", "56", "33"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('12');
  $__require('56');
  module.exports = $__require('33').Array.from;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("4c", ["5b"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('5b'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("57", ["5c"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var defined = $__require('5c');
  module.exports = function(it) {
    return Object(defined(it));
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("5d", ["28", "57", "5e", "40"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('28'),
      toObject = $__require('57'),
      IObject = $__require('5e');
  module.exports = $__require('40')(function() {
    var a = Object.assign,
        A = {},
        B = {},
        S = Symbol(),
        K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function(k) {
      B[k] = k;
    });
    return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
  }) ? function assign(target, source) {
    var T = toObject(target),
        $$ = arguments,
        $$len = $$.length,
        index = 1,
        getKeys = $.getKeys,
        getSymbols = $.getSymbols,
        isEnum = $.isEnum;
    while ($$len > index) {
      var S = IObject($$[index++]),
          keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
          length = keys.length,
          j = 0,
          key;
      while (length > j)
        if (isEnum.call(S, key = keys[j++]))
          T[key] = S[key];
    }
    return T;
  } : Object.assign;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("5f", ["2b", "5d"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $export = $__require('2b');
  $export($export.S + $export.F, 'Object', {assign: $__require('5d')});
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("60", ["5f", "33"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('5f');
  module.exports = $__require('33').Object.assign;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("61", ["60"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('60'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("51", ["2d", "2a"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var forOf = $__require('2d'),
      classof = $__require('2a');
  module.exports = function(NAME) {
    return function toJSON() {
      if (classof(this) != NAME)
        throw TypeError(NAME + "#toJSON isn't generic");
      var arr = [];
      forOf(this, false, arr.push, arr);
      return arr;
    };
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("62", ["2b", "51"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $export = $__require('2b');
  $export($export.P, 'Set', {toJSON: $__require('51')('Set')});
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("54", ["28", "1c", "2b", "40", "63", "30", "2d", "2c", "1b", "31", "2f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('28'),
      global = $__require('1c'),
      $export = $__require('2b'),
      fails = $__require('40'),
      hide = $__require('63'),
      redefineAll = $__require('30'),
      forOf = $__require('2d'),
      strictNew = $__require('2c'),
      isObject = $__require('1b'),
      setToStringTag = $__require('31'),
      DESCRIPTORS = $__require('2f');
  module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
    var Base = global[NAME],
        C = Base,
        ADDER = IS_MAP ? 'set' : 'add',
        proto = C && C.prototype,
        O = {};
    if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function() {
      new C().entries().next();
    }))) {
      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
      redefineAll(C.prototype, methods);
    } else {
      C = wrapper(function(target, iterable) {
        strictNew(target, C, NAME);
        target._c = new Base;
        if (iterable != undefined)
          forOf(iterable, IS_MAP, target[ADDER], target);
      });
      $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','), function(KEY) {
        var IS_ADDER = KEY == 'add' || KEY == 'set';
        if (KEY in proto && !(IS_WEAK && KEY == 'clear'))
          hide(C.prototype, KEY, function(a, b) {
            if (!IS_ADDER && IS_WEAK && !isObject(a))
              return KEY == 'get' ? undefined : false;
            var result = this._c[KEY](a === 0 ? 0 : a, b);
            return IS_ADDER ? this : result;
          });
      });
      if ('size' in proto)
        $.setDesc(C.prototype, 'size', {get: function() {
            return this._c.size;
          }});
    }
    setToStringTag(C, NAME);
    O[NAME] = C;
    $export($export.G + $export.W + $export.F, O);
    if (!IS_WEAK)
      common.setStrong(C, NAME, IS_MAP);
    return C;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("32", ["33", "28", "2f", "14"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var core = $__require('33'),
      $ = $__require('28'),
      DESCRIPTORS = $__require('2f'),
      SPECIES = $__require('14')('species');
  module.exports = function(KEY) {
    var C = core[KEY];
    if (DESCRIPTORS && C && !C[SPECIES])
      $.setDesc(C, SPECIES, {
        configurable: true,
        get: function() {
          return this;
        }
      });
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2a", ["21", "14"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var cof = $__require('21'),
      TAG = $__require('14')('toStringTag'),
      ARG = cof(function() {
        return arguments;
      }()) == 'Arguments';
  module.exports = function(it) {
    var O,
        T,
        B;
    return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof(T = (O = Object(it))[TAG]) == 'string' ? T : ARG ? cof(O) : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("4e", ["2a", "14", "64", "33"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var classof = $__require('2a'),
      ITERATOR = $__require('14')('iterator'),
      Iterators = $__require('64');
  module.exports = $__require('33').getIteratorMethod = function(it) {
    if (it != undefined)
      return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("5a", ["65"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toInteger = $__require('65'),
      min = Math.min;
  module.exports = function(it) {
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("59", ["64", "14"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var Iterators = $__require('64'),
      ITERATOR = $__require('14')('iterator'),
      ArrayProto = Array.prototype;
  module.exports = function(it) {
    return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("58", ["24"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var anObject = $__require('24');
  module.exports = function(iterator, fn, value, entries) {
    try {
      return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined)
        anObject(ret.call(iterator));
      throw e;
    }
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2d", ["20", "58", "59", "24", "5a", "4e"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var ctx = $__require('20'),
      call = $__require('58'),
      isArrayIter = $__require('59'),
      anObject = $__require('24'),
      toLength = $__require('5a'),
      getIterFn = $__require('4e');
  module.exports = function(iterable, entries, fn, that) {
    var iterFn = getIterFn(iterable),
        f = ctx(fn, that, entries ? 2 : 1),
        index = 0,
        length,
        step,
        iterator;
    if (typeof iterFn != 'function')
      throw TypeError(iterable + ' is not iterable!');
    if (isArrayIter(iterFn))
      for (length = toLength(iterable.length); length > index; index++) {
        entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
      }
    else
      for (iterator = iterFn.call(iterable); !(step = iterator.next()).done; ) {
        call(iterator, f, step.value, entries);
      }
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2c", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it, Constructor, name) {
    if (!(it instanceof Constructor))
      throw TypeError(name + ": use the 'new' operator!");
    return it;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("30", ["3f"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var redefine = $__require('3f');
  module.exports = function(target, src) {
    for (var key in src)
      redefine(target, key, src[key]);
    return target;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("53", ["28", "63", "30", "20", "2c", "5c", "2d", "66", "67", "42", "3e", "1b", "32", "2f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('28'),
      hide = $__require('63'),
      redefineAll = $__require('30'),
      ctx = $__require('20'),
      strictNew = $__require('2c'),
      defined = $__require('5c'),
      forOf = $__require('2d'),
      $iterDefine = $__require('66'),
      step = $__require('67'),
      ID = $__require('42')('id'),
      $has = $__require('3e'),
      isObject = $__require('1b'),
      setSpecies = $__require('32'),
      DESCRIPTORS = $__require('2f'),
      isExtensible = Object.isExtensible || isObject,
      SIZE = DESCRIPTORS ? '_s' : 'size',
      id = 0;
  var fastKey = function(it, create) {
    if (!isObject(it))
      return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!$has(it, ID)) {
      if (!isExtensible(it))
        return 'F';
      if (!create)
        return 'E';
      hide(it, ID, ++id);
    }
    return 'O' + it[ID];
  };
  var getEntry = function(that, key) {
    var index = fastKey(key),
        entry;
    if (index !== 'F')
      return that._i[index];
    for (entry = that._f; entry; entry = entry.n) {
      if (entry.k == key)
        return entry;
    }
  };
  module.exports = {
    getConstructor: function(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function(that, iterable) {
        strictNew(that, C, NAME);
        that._i = $.create(null);
        that._f = undefined;
        that._l = undefined;
        that[SIZE] = 0;
        if (iterable != undefined)
          forOf(iterable, IS_MAP, that[ADDER], that);
      });
      redefineAll(C.prototype, {
        clear: function clear() {
          for (var that = this,
              data = that._i,
              entry = that._f; entry; entry = entry.n) {
            entry.r = true;
            if (entry.p)
              entry.p = entry.p.n = undefined;
            delete data[entry.i];
          }
          that._f = that._l = undefined;
          that[SIZE] = 0;
        },
        'delete': function(key) {
          var that = this,
              entry = getEntry(that, key);
          if (entry) {
            var next = entry.n,
                prev = entry.p;
            delete that._i[entry.i];
            entry.r = true;
            if (prev)
              prev.n = next;
            if (next)
              next.p = prev;
            if (that._f == entry)
              that._f = next;
            if (that._l == entry)
              that._l = prev;
            that[SIZE]--;
          }
          return !!entry;
        },
        forEach: function forEach(callbackfn) {
          var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3),
              entry;
          while (entry = entry ? entry.n : this._f) {
            f(entry.v, entry.k, this);
            while (entry && entry.r)
              entry = entry.p;
          }
        },
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });
      if (DESCRIPTORS)
        $.setDesc(C.prototype, 'size', {get: function() {
            return defined(this[SIZE]);
          }});
      return C;
    },
    def: function(that, key, value) {
      var entry = getEntry(that, key),
          prev,
          index;
      if (entry) {
        entry.v = value;
      } else {
        that._l = entry = {
          i: index = fastKey(key, true),
          k: key,
          v: value,
          p: prev = that._l,
          n: undefined,
          r: false
        };
        if (!that._f)
          that._f = entry;
        if (prev)
          prev.n = entry;
        that[SIZE]++;
        if (index !== 'F')
          that._i[index] = entry;
      }
      return that;
    },
    getEntry: getEntry,
    setStrong: function(C, NAME, IS_MAP) {
      $iterDefine(C, NAME, function(iterated, kind) {
        this._t = iterated;
        this._k = kind;
        this._l = undefined;
      }, function() {
        var that = this,
            kind = that._k,
            entry = that._l;
        while (entry && entry.r)
          entry = entry.p;
        if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
          that._t = undefined;
          return step(1);
        }
        if (kind == 'keys')
          return step(0, entry.k);
        if (kind == 'values')
          return step(0, entry.v);
        return step(0, [entry.k, entry.v]);
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);
      setSpecies(NAME);
    }
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("68", ["53", "54"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var strong = $__require('53');
  $__require('54')('Set', function(get) {
    return function Set() {
      return get(this, arguments.length > 0 ? arguments[0] : undefined);
    };
  }, {add: function add(value) {
      return strong.def(this, value = value === 0 ? 0 : value, value);
    }}, strong);
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("67", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(done, value) {
    return {
      value: value,
      done: !!done
    };
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("69", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function() {};
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("6a", ["69", "67", "64", "3b", "66"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var addToUnscopables = $__require('69'),
      step = $__require('67'),
      Iterators = $__require('64'),
      toIObject = $__require('3b');
  module.exports = $__require('66')(Array, 'Array', function(iterated, kind) {
    this._t = toIObject(iterated);
    this._i = 0;
    this._k = kind;
  }, function() {
    var O = this._t,
        kind = this._k,
        index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return step(1);
    }
    if (kind == 'keys')
      return step(0, index);
    if (kind == 'values')
      return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');
  Iterators.Arguments = Iterators.Array;
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("13", ["6a", "64"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('6a');
  var Iterators = $__require('64');
  Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("42", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var id = 0,
      px = Math.random();
  module.exports = function(key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("41", ["1c"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var global = $__require('1c'),
      SHARED = '__core-js_shared__',
      store = global[SHARED] || (global[SHARED] = {});
  module.exports = function(key) {
    return store[key] || (store[key] = {});
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("14", ["41", "42", "1c"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var store = $__require('41')('wks'),
      uid = $__require('42'),
      Symbol = $__require('1c').Symbol;
  module.exports = function(name) {
    return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("31", ["28", "3e", "14"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var def = $__require('28').setDesc,
      has = $__require('3e'),
      TAG = $__require('14')('toStringTag');
  module.exports = function(it, tag, stat) {
    if (it && !has(it = stat ? it : it.prototype, TAG))
      def(it, TAG, {
        configurable: true,
        value: tag
      });
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("6b", ["28", "43", "31", "63", "14"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('28'),
      descriptor = $__require('43'),
      setToStringTag = $__require('31'),
      IteratorPrototype = {};
  $__require('63')(IteratorPrototype, $__require('14')('iterator'), function() {
    return this;
  });
  module.exports = function(Constructor, NAME, next) {
    Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
    setToStringTag(Constructor, NAME + ' Iterator');
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("64", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {};
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3e", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var hasOwnProperty = {}.hasOwnProperty;
  module.exports = function(it, key) {
    return hasOwnProperty.call(it, key);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2f", ["40"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = !$__require('40')(function() {
    return Object.defineProperty({}, 'a', {get: function() {
        return 7;
      }}).a != 7;
  });
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("43", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("63", ["28", "43", "2f"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('28'),
      createDesc = $__require('43');
  module.exports = $__require('2f') ? function(object, key, value) {
    return $.setDesc(object, key, createDesc(1, value));
  } : function(object, key, value) {
    object[key] = value;
    return object;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3f", ["63"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('63');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("29", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = true;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("66", ["29", "2b", "3f", "63", "3e", "64", "6b", "31", "28", "14"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var LIBRARY = $__require('29'),
      $export = $__require('2b'),
      redefine = $__require('3f'),
      hide = $__require('63'),
      has = $__require('3e'),
      Iterators = $__require('64'),
      $iterCreate = $__require('6b'),
      setToStringTag = $__require('31'),
      getProto = $__require('28').getProto,
      ITERATOR = $__require('14')('iterator'),
      BUGGY = !([].keys && 'next' in [].keys()),
      FF_ITERATOR = '@@iterator',
      KEYS = 'keys',
      VALUES = 'values';
  var returnThis = function() {
    return this;
  };
  module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    $iterCreate(Constructor, NAME, next);
    var getMethod = function(kind) {
      if (!BUGGY && kind in proto)
        return proto[kind];
      switch (kind) {
        case KEYS:
          return function keys() {
            return new Constructor(this, kind);
          };
        case VALUES:
          return function values() {
            return new Constructor(this, kind);
          };
      }
      return function entries() {
        return new Constructor(this, kind);
      };
    };
    var TAG = NAME + ' Iterator',
        DEF_VALUES = DEFAULT == VALUES,
        VALUES_BUG = false,
        proto = Base.prototype,
        $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
        $default = $native || getMethod(DEFAULT),
        methods,
        key;
    if ($native) {
      var IteratorPrototype = getProto($default.call(new Base));
      setToStringTag(IteratorPrototype, TAG, true);
      if (!LIBRARY && has(proto, FF_ITERATOR))
        hide(IteratorPrototype, ITERATOR, returnThis);
      if (DEF_VALUES && $native.name !== VALUES) {
        VALUES_BUG = true;
        $default = function values() {
          return $native.call(this);
        };
      }
    }
    if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
      hide(proto, ITERATOR, $default);
    }
    Iterators[NAME] = $default;
    Iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: !DEF_VALUES ? $default : getMethod('entries')
      };
      if (FORCED)
        for (key in methods) {
          if (!(key in proto))
            redefine(proto, key, methods[key]);
        }
      else
        $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("65", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var ceil = Math.ceil,
      floor = Math.floor;
  module.exports = function(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("6c", ["65", "5c"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toInteger = $__require('65'),
      defined = $__require('5c');
  module.exports = function(TO_STRING) {
    return function(that, pos) {
      var s = String(defined(that)),
          i = toInteger(pos),
          l = s.length,
          a,
          b;
      if (i < 0 || i >= l)
        return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("12", ["6c", "66"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $at = $__require('6c')(true);
  $__require('66')(String, 'String', function(iterated) {
    this._t = String(iterated);
    this._i = 0;
  }, function() {
    var O = this._t,
        index = this._i,
        point;
    if (index >= O.length)
      return {
        value: undefined,
        done: true
      };
    point = $at(O, index);
    this._i += point.length;
    return {
      value: point,
      done: false
    };
  });
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("36", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("6d", ["36", "12", "13", "68", "62", "33"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('36');
  $__require('12');
  $__require('13');
  $__require('68');
  $__require('62');
  module.exports = $__require('33').Set;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("6e", ["6d"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('6d'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.register("6f", ["6", "7", "61", "6e", "4c"], function (_export) {
    var _createClass, _classCallCheck, _Object$assign, _Set, _Array$from, Serializable;

    return {
        setters: [function (_) {
            _createClass = _["default"];
        }, function (_2) {
            _classCallCheck = _2["default"];
        }, function (_3) {
            _Object$assign = _3["default"];
        }, function (_e) {
            _Set = _e["default"];
        }, function (_c) {
            _Array$from = _c["default"];
        }],
        execute: function () {
            "use strict";

            Serializable = (function () {
                function Serializable(props) {
                    _classCallCheck(this, Serializable);

                    this._serializeWhiteList = new _Set();
                    for (var key in props) {
                        this[key] = props[key];
                        this._serializeWhiteList.add(key);
                    }
                }

                _createClass(Serializable, [{
                    key: "serializeAble",
                    value: function serializeAble(prop) {
                        this._serializeWhiteList.add(prop);
                    }
                }, {
                    key: "toJSON",
                    value: function toJSON() {
                        var copy = _Object$assign({}, this);
                        return JSON.stringify(copy, _Array$from(this._serializeWhiteList));
                    }
                }]);

                return Serializable;
            })();

            _export("default", Serializable);
        }
    };
});
$__System.register('70', ['7', 'c', 'd', '6f'], function (_export) {
  var _classCallCheck, _get, _inherits, Serializable, Component;

  return {
    setters: [function (_) {
      _classCallCheck = _['default'];
    }, function (_c) {
      _get = _c['default'];
    }, function (_d) {
      _inherits = _d['default'];
    }, function (_f) {
      Serializable = _f['default'];
    }],
    execute: function () {
      'use strict';

      Component = (function (_Serializable) {
        _inherits(Component, _Serializable);

        function Component() {
          _classCallCheck(this, Component);

          _get(Object.getPrototypeOf(Component.prototype), 'constructor', this).apply(this, arguments);
        }

        return Component;
      })(Serializable);

      _export('default', Component);
    }
  };
});
$__System.register('71', ['3', '5', '70', 'e', 'a'], function (_export) {
  'use strict';

  return {
    setters: [function (_3) {
      var _exportObj = {};
      _exportObj['World'] = _3['default'];

      _export(_exportObj);
    }, function (_2) {
      var _exportObj2 = {};
      _exportObj2['Family'] = _2['default'];

      _export(_exportObj2);
    }, function (_) {
      var _exportObj3 = {};
      _exportObj3['Component'] = _['default'];

      _export(_exportObj3);
    }, function (_e) {
      var _exportObj4 = {};
      _exportObj4['Entity'] = _e['default'];

      _export(_exportObj4);
    }, function (_a) {
      var _exportObj5 = {};
      _exportObj5['System'] = _a['default'];

      _export(_exportObj5);
    }],
    execute: function () {}
  };
});
$__System.registerDynamic("72", ["28"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('28');
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("73", ["72"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('72'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("6", ["73"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _Object$defineProperty = $__require('73')["default"];
  exports["default"] = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        _Object$defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("7", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  exports["default"] = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("24", ["1b"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var isObject = $__require('1b');
  module.exports = function(it) {
    if (!isObject(it))
      throw TypeError(it + ' is not an object!');
    return it;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("1b", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2e", ["28", "1b", "24", "20"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var getDesc = $__require('28').getDesc,
      isObject = $__require('1b'),
      anObject = $__require('24');
  var check = function(O, proto) {
    anObject(O);
    if (!isObject(proto) && proto !== null)
      throw TypeError(proto + ": can't set as prototype!");
  };
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? function(test, buggy, set) {
      try {
        set = $__require('20')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) {
        buggy = true;
      }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy)
          O.__proto__ = proto;
        else
          set(O, proto);
        return O;
      };
    }({}, false) : undefined),
    check: check
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("74", ["2b", "2e"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $export = $__require('2b');
  $export($export.S, 'Object', {setPrototypeOf: $__require('2e').set});
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("75", ["74", "33"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('74');
  module.exports = $__require('33').Object.setPrototypeOf;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("49", ["75"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('75'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("76", ["28"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('28');
  module.exports = function create(P, D) {
    return $.create(P, D);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("48", ["76"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('76'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("d", ["48", "49"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _Object$create = $__require('48')["default"];
  var _Object$setPrototypeOf = $__require('49')["default"];
  exports["default"] = function(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = _Object$create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("40", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("25", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    if (typeof it != 'function')
      throw TypeError(it + ' is not a function!');
    return it;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("20", ["25"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var aFunction = $__require('25');
  module.exports = function(fn, that, length) {
    aFunction(fn);
    if (that === undefined)
      return fn;
    switch (length) {
      case 1:
        return function(a) {
          return fn.call(that, a);
        };
      case 2:
        return function(a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function(a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function() {
      return fn.apply(that, arguments);
    };
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("33", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var core = module.exports = {version: '1.2.6'};
  if (typeof __e == 'number')
    __e = core;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("1c", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
  if (typeof __g == 'number')
    __g = global;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2b", ["1c", "33", "20"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var global = $__require('1c'),
      core = $__require('33'),
      ctx = $__require('20'),
      PROTOTYPE = 'prototype';
  var $export = function(type, name, source) {
    var IS_FORCED = type & $export.F,
        IS_GLOBAL = type & $export.G,
        IS_STATIC = type & $export.S,
        IS_PROTO = type & $export.P,
        IS_BIND = type & $export.B,
        IS_WRAP = type & $export.W,
        exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
        target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
        key,
        own,
        out;
    if (IS_GLOBAL)
      source = name;
    for (key in source) {
      own = !IS_FORCED && target && key in target;
      if (own && key in exports)
        continue;
      out = own ? target[key] : source[key];
      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? (function(C) {
        var F = function(param) {
          return this instanceof C ? new C(param) : C(param);
        };
        F[PROTOTYPE] = C[PROTOTYPE];
        return F;
      })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
      if (IS_PROTO)
        (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
    }
  };
  $export.F = 1;
  $export.G = 2;
  $export.S = 4;
  $export.P = 8;
  $export.B = 16;
  $export.W = 32;
  module.exports = $export;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("77", ["2b", "33", "40"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $export = $__require('2b'),
      core = $__require('33'),
      fails = $__require('40');
  module.exports = function(KEY, exec) {
    var fn = (core.Object || {})[KEY] || Object[KEY],
        exp = {};
    exp[KEY] = exec(fn);
    $export($export.S + $export.F * fails(function() {
      fn(1);
    }), 'Object', exp);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("5c", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    if (it == undefined)
      throw TypeError("Can't call method on  " + it);
    return it;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("21", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toString = {}.toString;
  module.exports = function(it) {
    return toString.call(it).slice(8, -1);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("5e", ["21"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var cof = $__require('21');
  module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it) {
    return cof(it) == 'String' ? it.split('') : Object(it);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3b", ["5e", "5c"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var IObject = $__require('5e'),
      defined = $__require('5c');
  module.exports = function(it) {
    return IObject(defined(it));
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("78", ["3b", "77"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toIObject = $__require('3b');
  $__require('77')('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor) {
    return function getOwnPropertyDescriptor(it, key) {
      return $getOwnPropertyDescriptor(toIObject(it), key);
    };
  });
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("28", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $Object = Object;
  module.exports = {
    create: $Object.create,
    getProto: $Object.getPrototypeOf,
    isEnum: {}.propertyIsEnumerable,
    getDesc: $Object.getOwnPropertyDescriptor,
    setDesc: $Object.defineProperty,
    setDescs: $Object.defineProperties,
    getKeys: $Object.keys,
    getNames: $Object.getOwnPropertyNames,
    getSymbols: $Object.getOwnPropertySymbols,
    each: [].forEach
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("79", ["28", "78"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('28');
  $__require('78');
  module.exports = function getOwnPropertyDescriptor(it, key) {
    return $.getDesc(it, key);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("7a", ["79"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('79'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("c", ["7a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _Object$getOwnPropertyDescriptor = $__require('7a')["default"];
  exports["default"] = function get(_x, _x2, _x3) {
    var _again = true;
    _function: while (_again) {
      var object = _x,
          property = _x2,
          receiver = _x3;
      _again = false;
      if (object === null)
        object = Function.prototype;
      var desc = _Object$getOwnPropertyDescriptor(object, property);
      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
          return undefined;
        } else {
          _x = parent;
          _x2 = property;
          _x3 = receiver;
          _again = true;
          desc = parent = undefined;
          continue _function;
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;
        if (getter === undefined) {
          return undefined;
        }
        return getter.call(receiver);
      }
    }
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

$__System.register('1', ['6', '7', '71', 'c', 'd'], function (_export) {
    var _createClass, _classCallCheck, Entity, Component, System, World, _get, _inherits, HealthComponent, CombatSystem, Main;

    return {
        setters: [function (_2) {
            _createClass = _2['default'];
        }, function (_) {
            _classCallCheck = _['default'];
        }, function (_3) {
            Entity = _3.Entity;
            Component = _3.Component;
            System = _3.System;
            World = _3.World;
        }, function (_c) {
            _get = _c['default'];
        }, function (_d) {
            _inherits = _d['default'];
        }],
        execute: function () {
            'use strict';

            HealthComponent = (function (_Component) {
                _inherits(HealthComponent, _Component);

                function HealthComponent() {
                    var maxHealth = arguments.length <= 0 || arguments[0] === undefined ? 100 : arguments[0];

                    _classCallCheck(this, HealthComponent);

                    var health = maxHealth;

                    _get(Object.getPrototypeOf(HealthComponent.prototype), 'constructor', this).call(this, { health: health, maxHealth: maxHealth });
                }

                return HealthComponent;
            })(Component);

            CombatSystem = (function (_System) {
                _inherits(CombatSystem, _System);

                function CombatSystem() {
                    _classCallCheck(this, CombatSystem);

                    _get(Object.getPrototypeOf(CombatSystem.prototype), 'constructor', this).apply(this, arguments);
                }

                _createClass(CombatSystem, [{
                    key: 'damage',
                    value: function damage(entity, amount) {
                        var health = entity.getComponent('health');
                        health.health -= amount;
                        if (health.health < 0) {
                            health.health = 0;
                        }
                    }
                }, {
                    key: 'heal',
                    value: function heal(entity, amount) {
                        var health = entity.getComponent('health');
                        health.health += amount;
                        if (health.health > health.maxHealth) {
                            health.health = health.maxHealth;
                        }
                    }
                }, {
                    key: 'update',
                    value: function update(dt) {}
                }]);

                return CombatSystem;
            })(System);

            Main = (function () {
                function Main() {
                    _classCallCheck(this, Main);

                    this.world = new World();

                    this.init();
                }

                _createClass(Main, [{
                    key: 'init',
                    value: function init() {
                        this.hero = new Entity();
                        this.hero.addComponent('health', new HealthComponent());

                        this.combat = new CombatSystem();

                        this.world.addSystem(this.combat);

                        this.world.addEntities(this.hero);
                    }
                }]);

                return Main;
            })();

            window.game = new Main();
        }
    };
});
})
(function(factory) {
  factory();
});
//# sourceMappingURL=basic.js.map