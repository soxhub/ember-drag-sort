"use strict";



define('dummy/app', ['exports', 'ember', 'dummy/resolver', 'ember-load-initializers', 'dummy/config/environment'], function (exports, _ember, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = void 0;

  _ember.default.MODEL_FACTORY_INJECTIONS = true;

  App = _ember.default.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('dummy/components/drag-sort-item', ['exports', 'ember-drag-sort/components/drag-sort-item'], function (exports, _dragSortItem) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dragSortItem.default;
    }
  });
});
define('dummy/components/drag-sort-list', ['exports', 'ember-drag-sort/components/drag-sort-list'], function (exports, _dragSortList) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dragSortList.default;
    }
  });
});
define('dummy/components/fork-me', ['exports', 'ember-fork-me/components/fork-me'], function (exports, _forkMe) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _forkMe.default;
    }
  });
});
define('dummy/components/nested-item', ['exports', 'ember-component', 'dummy/templates/components/nested-item'], function (exports, _emberComponent, _nestedItem) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberComponent.default.extend({
    layout: _nestedItem.default,
    classNames: ['nestedItem'],

    item: undefined,
    dragEndAction: undefined,
    group: 'nested group'
  });
});
define('dummy/controllers/index', ['exports', 'ember-controller', 'ember-array/utils', 'ember-concurrency', 'rsvp', 'ember-computed'], function (exports, _emberController, _utils, _emberConcurrency, _rsvp, _emberComputed) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) {
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

  exports.default = _emberController.default.extend({

    items1: (0, _emberComputed.default)(function () {
      return (0, _utils.A)([{ name: 'Foo' }, { name: 'Bar' }, { name: 'Baz' }, { name: 'Quux' }]);
    }),

    items2: (0, _emberComputed.default)(function () {
      return (0, _utils.A)([{ name: 'Zomg' }, { name: 'Lol' }]);
    }),

    items3: (0, _emberComputed.default)(function () {
      return (0, _utils.A)([{ name: 'Foo' }, { name: 'Bar' }, { name: 'Baz' }, { name: 'Quux' }]);
    }),

    items4: (0, _emberComputed.default)(function () {
      return (0, _utils.A)([{ name: 'Zomg' }, { name: 'Lol' }]);
    }),

    items5: (0, _emberComputed.default)(function () {
      return (0, _utils.A)([{ name: 'Bar' }, { name: 'Baz' }, { name: 'Foo' }, { name: 'Quux' }]);
    }),

    items6: (0, _emberComputed.default)(function () {
      return (0, _utils.A)([{ name: 'Zomg' }, { name: 'Lol' }]);
    }),

    items7: (0, _emberComputed.default)(function () {
      return (0, _utils.A)([{ name: 'Foo' }, { name: 'Bar' }, { name: 'Baz' }]);
    }),

    items8: (0, _emberComputed.default)(function () {
      return (0, _utils.A)();
    }),

    items9: (0, _emberComputed.default)(function () {
      return (0, _utils.A)();
    }),

    items10: (0, _emberComputed.default)(function () {
      return (0, _utils.A)([{ name: 'Foo' }, { name: 'Bar' }, { name: 'Baz' }, { name: 'Quux' }]);
    }),

    items11: (0, _emberComputed.default)(function () {
      return (0, _utils.A)([{ name: 'Zomg' }, { name: 'Lol' }]);
    }),

    nestedItem: (0, _emberComputed.default)(function () {
      return {
        name: 'Foo',
        children: (0, _utils.A)([{
          name: 'Bar',
          children: (0, _utils.A)([{
            name: 'Baz',
            children: (0, _utils.A)([])
          }, {
            name: 'Quuz',
            children: (0, _utils.A)([])
          }])
        }, {
          name: 'Zomg',
          children: (0, _utils.A)([])
        }, {
          name: 'Lol',
          children: (0, _utils.A)([])
        }])
      };
    }),

    networkFailure: false,

    actions: {
      dragEnd: function dragEnd(_ref) {
        var sourceList = _ref.sourceList,
            sourceIndex = _ref.sourceIndex,
            targetList = _ref.targetList,
            targetIndex = _ref.targetIndex;

        if (sourceList === targetList && sourceIndex === targetIndex) return;

        var item = sourceList.objectAt(sourceIndex);

        sourceList.removeAt(sourceIndex);
        targetList.insertAt(targetIndex, item);
      },
      determineForeignPosition: function determineForeignPosition(_ref2) {
        var draggedItem = _ref2.draggedItem,
            items = _ref2.items;

        return (0, _utils.A)(items.slice()) // create a copy of the list
        .addObject(draggedItem).sortBy('name').indexOf(draggedItem);
      },
      dragEnd2: function dragEnd2(_ref3) {
        var sourceList = _ref3.sourceList,
            sourceIndex = _ref3.sourceIndex,
            targetList = _ref3.targetList,
            targetIndex = _ref3.targetIndex;

        if (sourceList === targetList && sourceIndex === targetIndex) return;

        var unsortableList = this.get('items7');

        var item = sourceList.objectAt(sourceIndex);

        if (sourceList === unsortableList) item = _extends({}, item); // shallow clone
        else sourceList.removeAt(sourceIndex);

        if (targetList !== unsortableList) targetList.insertAt(targetIndex, item);
      },
      determineForeignPosition2: function determineForeignPosition2(_ref4) {
        var items = _ref4.items;

        return items.length;
      }
    },

    dragEndTask: (0, _emberConcurrency.task)(regeneratorRuntime.mark(function _callee(_ref5) {
      var sourceList = _ref5.sourceList,
          sourceIndex = _ref5.sourceIndex,
          targetList = _ref5.targetList,
          targetIndex = _ref5.targetIndex;
      var item;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(sourceList === targetList && sourceIndex === targetIndex)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', _rsvp.default.resolve());

            case 2:
              item = sourceList.objectAt(sourceIndex);


              sourceList.removeAt(sourceIndex);
              targetList.insertAt(targetIndex, item);

              _context.next = 7;
              return (0, _emberConcurrency.timeout)(2000);

            case 7:
              if (!this.get('networkFailure')) {
                _context.next = 11;
                break;
              }

              // Rollback
              targetList.removeAt(targetIndex);
              sourceList.insertAt(sourceIndex, item);

              return _context.abrupt('return', _rsvp.default.reject({ message: "Request timed out." }));

            case 11:
              return _context.abrupt('return', _rsvp.default.resolve());

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).drop()
  });
});
define('dummy/ember-drag-sort/tests/ember-drag-sort/components/drag-sort-item.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint - ember-drag-sort/components/drag-sort-item.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-drag-sort/components/drag-sort-item.js should pass ESLint.\n');
  });
});
define('dummy/ember-drag-sort/tests/ember-drag-sort/components/drag-sort-list.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint - ember-drag-sort/components/drag-sort-list.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-drag-sort/components/drag-sort-list.js should pass ESLint.\n');
  });
});
define('dummy/ember-drag-sort/tests/ember-drag-sort/services/drag-sort.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint - ember-drag-sort/services/drag-sort.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-drag-sort/services/drag-sort.js should pass ESLint.\n');
  });
});
define('dummy/ember-drag-sort/tests/ember-drag-sort/utils/trigger.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint - ember-drag-sort/utils/trigger.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-drag-sort/utils/trigger.js should pass ESLint.\n');
  });
});
define('dummy/helpers/and', ['exports', 'ember', 'ember-truth-helpers/helpers/and'], function (exports, _ember, _and) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_and.andHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_and.andHelper);
  }

  exports.default = forExport;
});
define('dummy/helpers/append', ['exports', 'ember-composable-helpers/helpers/append'], function (exports, _append) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _append.default;
    }
  });
  Object.defineProperty(exports, 'append', {
    enumerable: true,
    get: function () {
      return _append.append;
    }
  });
});
define('dummy/helpers/array', ['exports', 'ember-composable-helpers/helpers/array'], function (exports, _array) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _array.default;
    }
  });
  Object.defineProperty(exports, 'array', {
    enumerable: true,
    get: function () {
      return _array.array;
    }
  });
});
define('dummy/helpers/cancel-all', ['exports', 'ember', 'ember-concurrency/-helpers'], function (exports, _ember, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.cancelHelper = cancelHelper;


  var CANCEL_REASON = "the 'cancel-all' template helper was invoked";

  function cancelHelper(args) {
    var cancelable = args[0];
    if (!cancelable || typeof cancelable.cancelAll !== 'function') {
      _ember.default.assert('The first argument passed to the `cancel-all` helper should be a Task or TaskGroup (without quotes); you passed ' + cancelable, false);
    }

    return (0, _helpers.taskHelperClosure)('cancelAll', [cancelable, CANCEL_REASON]);
  }

  exports.default = _ember.default.Helper.helper(cancelHelper);
});
define('dummy/helpers/chunk', ['exports', 'ember-composable-helpers/helpers/chunk'], function (exports, _chunk) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _chunk.default;
    }
  });
  Object.defineProperty(exports, 'chunk', {
    enumerable: true,
    get: function () {
      return _chunk.chunk;
    }
  });
});
define('dummy/helpers/compact', ['exports', 'ember-composable-helpers/helpers/compact'], function (exports, _compact) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _compact.default;
    }
  });
  Object.defineProperty(exports, 'compact', {
    enumerable: true,
    get: function () {
      return _compact.compact;
    }
  });
});
define('dummy/helpers/compute', ['exports', 'ember-composable-helpers/helpers/compute'], function (exports, _compute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _compute.default;
    }
  });
  Object.defineProperty(exports, 'compute', {
    enumerable: true,
    get: function () {
      return _compute.compute;
    }
  });
});
define('dummy/helpers/contains', ['exports', 'ember-composable-helpers/helpers/contains'], function (exports, _contains) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _contains.default;
    }
  });
  Object.defineProperty(exports, 'contains', {
    enumerable: true,
    get: function () {
      return _contains.contains;
    }
  });
});
define('dummy/helpers/dec', ['exports', 'ember-composable-helpers/helpers/dec'], function (exports, _dec) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dec.default;
    }
  });
  Object.defineProperty(exports, 'dec', {
    enumerable: true,
    get: function () {
      return _dec.dec;
    }
  });
});
define('dummy/helpers/drop', ['exports', 'ember-composable-helpers/helpers/drop'], function (exports, _drop) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _drop.default;
    }
  });
  Object.defineProperty(exports, 'drop', {
    enumerable: true,
    get: function () {
      return _drop.drop;
    }
  });
});
define('dummy/helpers/eq', ['exports', 'ember', 'ember-truth-helpers/helpers/equal'], function (exports, _ember, _equal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_equal.equalHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_equal.equalHelper);
  }

  exports.default = forExport;
});
define('dummy/helpers/filter-by', ['exports', 'ember-composable-helpers/helpers/filter-by'], function (exports, _filterBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _filterBy.default;
    }
  });
  Object.defineProperty(exports, 'filterBy', {
    enumerable: true,
    get: function () {
      return _filterBy.filterBy;
    }
  });
});
define('dummy/helpers/filter', ['exports', 'ember-composable-helpers/helpers/filter'], function (exports, _filter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _filter.default;
    }
  });
  Object.defineProperty(exports, 'filter', {
    enumerable: true,
    get: function () {
      return _filter.filter;
    }
  });
});
define('dummy/helpers/find-by', ['exports', 'ember-composable-helpers/helpers/find-by'], function (exports, _findBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _findBy.default;
    }
  });
  Object.defineProperty(exports, 'findBy', {
    enumerable: true,
    get: function () {
      return _findBy.findBy;
    }
  });
});
define('dummy/helpers/flatten', ['exports', 'ember-composable-helpers/helpers/flatten'], function (exports, _flatten) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _flatten.default;
    }
  });
  Object.defineProperty(exports, 'flatten', {
    enumerable: true,
    get: function () {
      return _flatten.flatten;
    }
  });
});
define('dummy/helpers/group-by', ['exports', 'ember-composable-helpers/helpers/group-by'], function (exports, _groupBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _groupBy.default;
    }
  });
  Object.defineProperty(exports, 'groupBy', {
    enumerable: true,
    get: function () {
      return _groupBy.groupBy;
    }
  });
});
define('dummy/helpers/gt', ['exports', 'ember', 'ember-truth-helpers/helpers/gt'], function (exports, _ember, _gt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_gt.gtHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_gt.gtHelper);
  }

  exports.default = forExport;
});
define('dummy/helpers/gte', ['exports', 'ember', 'ember-truth-helpers/helpers/gte'], function (exports, _ember, _gte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_gte.gteHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_gte.gteHelper);
  }

  exports.default = forExport;
});
define('dummy/helpers/has-next', ['exports', 'ember-composable-helpers/helpers/has-next'], function (exports, _hasNext) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _hasNext.default;
    }
  });
  Object.defineProperty(exports, 'hasNext', {
    enumerable: true,
    get: function () {
      return _hasNext.hasNext;
    }
  });
});
define('dummy/helpers/has-previous', ['exports', 'ember-composable-helpers/helpers/has-previous'], function (exports, _hasPrevious) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _hasPrevious.default;
    }
  });
  Object.defineProperty(exports, 'hasPrevious', {
    enumerable: true,
    get: function () {
      return _hasPrevious.hasPrevious;
    }
  });
});
define('dummy/helpers/inc', ['exports', 'ember-composable-helpers/helpers/inc'], function (exports, _inc) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _inc.default;
    }
  });
  Object.defineProperty(exports, 'inc', {
    enumerable: true,
    get: function () {
      return _inc.inc;
    }
  });
});
define('dummy/helpers/intersect', ['exports', 'ember-composable-helpers/helpers/intersect'], function (exports, _intersect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _intersect.default;
    }
  });
  Object.defineProperty(exports, 'intersect', {
    enumerable: true,
    get: function () {
      return _intersect.intersect;
    }
  });
});
define('dummy/helpers/invoke', ['exports', 'ember-composable-helpers/helpers/invoke'], function (exports, _invoke) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _invoke.default;
    }
  });
  Object.defineProperty(exports, 'invoke', {
    enumerable: true,
    get: function () {
      return _invoke.invoke;
    }
  });
});
define('dummy/helpers/is-array', ['exports', 'ember', 'ember-truth-helpers/helpers/is-array'], function (exports, _ember, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_isArray.isArrayHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_isArray.isArrayHelper);
  }

  exports.default = forExport;
});
define('dummy/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _isEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
    }
  });
});
define('dummy/helpers/join', ['exports', 'ember-composable-helpers/helpers/join'], function (exports, _join) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _join.default;
    }
  });
  Object.defineProperty(exports, 'join', {
    enumerable: true,
    get: function () {
      return _join.join;
    }
  });
});
define('dummy/helpers/lt', ['exports', 'ember', 'ember-truth-helpers/helpers/lt'], function (exports, _ember, _lt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_lt.ltHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_lt.ltHelper);
  }

  exports.default = forExport;
});
define('dummy/helpers/lte', ['exports', 'ember', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _lte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_lte.lteHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_lte.lteHelper);
  }

  exports.default = forExport;
});
define('dummy/helpers/map-by', ['exports', 'ember-composable-helpers/helpers/map-by'], function (exports, _mapBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _mapBy.default;
    }
  });
  Object.defineProperty(exports, 'mapBy', {
    enumerable: true,
    get: function () {
      return _mapBy.mapBy;
    }
  });
});
define('dummy/helpers/map', ['exports', 'ember-composable-helpers/helpers/map'], function (exports, _map) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _map.default;
    }
  });
  Object.defineProperty(exports, 'map', {
    enumerable: true,
    get: function () {
      return _map.map;
    }
  });
});
define('dummy/helpers/next', ['exports', 'ember-composable-helpers/helpers/next'], function (exports, _next) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _next.default;
    }
  });
  Object.defineProperty(exports, 'next', {
    enumerable: true,
    get: function () {
      return _next.next;
    }
  });
});
define('dummy/helpers/not-eq', ['exports', 'ember', 'ember-truth-helpers/helpers/not-equal'], function (exports, _ember, _notEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_notEqual.notEqualHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_notEqual.notEqualHelper);
  }

  exports.default = forExport;
});
define('dummy/helpers/not', ['exports', 'ember', 'ember-truth-helpers/helpers/not'], function (exports, _ember, _not) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_not.notHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_not.notHelper);
  }

  exports.default = forExport;
});
define('dummy/helpers/object-at', ['exports', 'ember-composable-helpers/helpers/object-at'], function (exports, _objectAt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _objectAt.default;
    }
  });
  Object.defineProperty(exports, 'objectAt', {
    enumerable: true,
    get: function () {
      return _objectAt.objectAt;
    }
  });
});
define('dummy/helpers/optional', ['exports', 'ember-composable-helpers/helpers/optional'], function (exports, _optional) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _optional.default;
    }
  });
  Object.defineProperty(exports, 'optional', {
    enumerable: true,
    get: function () {
      return _optional.optional;
    }
  });
});
define('dummy/helpers/or', ['exports', 'ember', 'ember-truth-helpers/helpers/or'], function (exports, _ember, _or) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_or.orHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_or.orHelper);
  }

  exports.default = forExport;
});
define('dummy/helpers/perform', ['exports', 'ember', 'ember-concurrency/-helpers'], function (exports, _ember, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.performHelper = performHelper;
  function performHelper(args, hash) {
    return (0, _helpers.taskHelperClosure)('perform', args, hash);
  }

  exports.default = _ember.default.Helper.helper(performHelper);
});
define('dummy/helpers/pipe-action', ['exports', 'ember-composable-helpers/helpers/pipe-action'], function (exports, _pipeAction) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pipeAction.default;
    }
  });
});
define('dummy/helpers/pipe', ['exports', 'ember-composable-helpers/helpers/pipe'], function (exports, _pipe) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pipe.default;
    }
  });
  Object.defineProperty(exports, 'pipe', {
    enumerable: true,
    get: function () {
      return _pipe.pipe;
    }
  });
});
define('dummy/helpers/previous', ['exports', 'ember-composable-helpers/helpers/previous'], function (exports, _previous) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _previous.default;
    }
  });
  Object.defineProperty(exports, 'previous', {
    enumerable: true,
    get: function () {
      return _previous.previous;
    }
  });
});
define('dummy/helpers/queue', ['exports', 'ember-composable-helpers/helpers/queue'], function (exports, _queue) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _queue.default;
    }
  });
  Object.defineProperty(exports, 'queue', {
    enumerable: true,
    get: function () {
      return _queue.queue;
    }
  });
});
define('dummy/helpers/range', ['exports', 'ember-composable-helpers/helpers/range'], function (exports, _range) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _range.default;
    }
  });
  Object.defineProperty(exports, 'range', {
    enumerable: true,
    get: function () {
      return _range.range;
    }
  });
});
define('dummy/helpers/reduce', ['exports', 'ember-composable-helpers/helpers/reduce'], function (exports, _reduce) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _reduce.default;
    }
  });
  Object.defineProperty(exports, 'reduce', {
    enumerable: true,
    get: function () {
      return _reduce.reduce;
    }
  });
});
define('dummy/helpers/reject-by', ['exports', 'ember-composable-helpers/helpers/reject-by'], function (exports, _rejectBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _rejectBy.default;
    }
  });
  Object.defineProperty(exports, 'rejectBy', {
    enumerable: true,
    get: function () {
      return _rejectBy.rejectBy;
    }
  });
});
define('dummy/helpers/repeat', ['exports', 'ember-composable-helpers/helpers/repeat'], function (exports, _repeat) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _repeat.default;
    }
  });
  Object.defineProperty(exports, 'repeat', {
    enumerable: true,
    get: function () {
      return _repeat.repeat;
    }
  });
});
define('dummy/helpers/reverse', ['exports', 'ember-composable-helpers/helpers/reverse'], function (exports, _reverse) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _reverse.default;
    }
  });
  Object.defineProperty(exports, 'reverse', {
    enumerable: true,
    get: function () {
      return _reverse.reverse;
    }
  });
});
define('dummy/helpers/shuffle', ['exports', 'ember-composable-helpers/helpers/shuffle'], function (exports, _shuffle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _shuffle.default;
    }
  });
  Object.defineProperty(exports, 'shuffle', {
    enumerable: true,
    get: function () {
      return _shuffle.shuffle;
    }
  });
});
define('dummy/helpers/slice', ['exports', 'ember-composable-helpers/helpers/slice'], function (exports, _slice) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _slice.default;
    }
  });
  Object.defineProperty(exports, 'slice', {
    enumerable: true,
    get: function () {
      return _slice.slice;
    }
  });
});
define('dummy/helpers/sort-by', ['exports', 'ember-composable-helpers/helpers/sort-by'], function (exports, _sortBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _sortBy.default;
    }
  });
  Object.defineProperty(exports, 'sortBy', {
    enumerable: true,
    get: function () {
      return _sortBy.sortBy;
    }
  });
});
define('dummy/helpers/take', ['exports', 'ember-composable-helpers/helpers/take'], function (exports, _take) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _take.default;
    }
  });
  Object.defineProperty(exports, 'take', {
    enumerable: true,
    get: function () {
      return _take.take;
    }
  });
});
define('dummy/helpers/task', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _toArray(arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  }

  function taskHelper(_ref) {
    var _ref2 = _toArray(_ref),
        task = _ref2[0],
        args = _ref2.slice(1);

    return task._curry.apply(task, _toConsumableArray(args));
  }

  exports.default = _ember.default.Helper.helper(taskHelper);
});
define('dummy/helpers/toggle-action', ['exports', 'ember-composable-helpers/helpers/toggle-action'], function (exports, _toggleAction) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toggleAction.default;
    }
  });
});
define('dummy/helpers/toggle', ['exports', 'ember-composable-helpers/helpers/toggle'], function (exports, _toggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
  Object.defineProperty(exports, 'toggle', {
    enumerable: true,
    get: function () {
      return _toggle.toggle;
    }
  });
});
define('dummy/helpers/union', ['exports', 'ember-composable-helpers/helpers/union'], function (exports, _union) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _union.default;
    }
  });
  Object.defineProperty(exports, 'union', {
    enumerable: true,
    get: function () {
      return _union.union;
    }
  });
});
define('dummy/helpers/without', ['exports', 'ember-composable-helpers/helpers/without'], function (exports, _without) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _without.default;
    }
  });
  Object.defineProperty(exports, 'without', {
    enumerable: true,
    get: function () {
      return _without.without;
    }
  });
});
define('dummy/helpers/xor', ['exports', 'ember', 'ember-truth-helpers/helpers/xor'], function (exports, _ember, _xor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_xor.xorHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_xor.xorHelper);
  }

  exports.default = forExport;
});
define('dummy/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('dummy/initializers/ember-concurrency', ['exports', 'ember-concurrency'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-concurrency',
    initialize: function initialize() {}
  };
});
define('dummy/initializers/export-application-global', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember.default.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('dummy/initializers/truth-helpers', ['exports', 'ember', 'ember-truth-helpers/utils/register-helper', 'ember-truth-helpers/helpers/and', 'ember-truth-helpers/helpers/or', 'ember-truth-helpers/helpers/equal', 'ember-truth-helpers/helpers/not', 'ember-truth-helpers/helpers/is-array', 'ember-truth-helpers/helpers/not-equal', 'ember-truth-helpers/helpers/gt', 'ember-truth-helpers/helpers/gte', 'ember-truth-helpers/helpers/lt', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _registerHelper, _and, _or, _equal, _not, _isArray, _notEqual, _gt, _gte, _lt, _lte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() /* container, application */{

    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (_ember.default.Helper) {
      return;
    }

    (0, _registerHelper.registerHelper)('and', _and.andHelper);
    (0, _registerHelper.registerHelper)('or', _or.orHelper);
    (0, _registerHelper.registerHelper)('eq', _equal.equalHelper);
    (0, _registerHelper.registerHelper)('not', _not.notHelper);
    (0, _registerHelper.registerHelper)('is-array', _isArray.isArrayHelper);
    (0, _registerHelper.registerHelper)('not-eq', _notEqual.notEqualHelper);
    (0, _registerHelper.registerHelper)('gt', _gt.gtHelper);
    (0, _registerHelper.registerHelper)('gte', _gte.gteHelper);
    (0, _registerHelper.registerHelper)('lt', _lt.ltHelper);
    (0, _registerHelper.registerHelper)('lte', _lte.lteHelper);
  }

  exports.default = {
    name: 'truth-helpers',
    initialize: initialize
  };
});
define('dummy/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('dummy/router', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = _ember.default.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {});

  exports.default = Router;
});
define('dummy/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('dummy/services/drag-sort', ['exports', 'ember-drag-sort/services/drag-sort'], function (exports, _dragSort) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dragSort.default;
    }
  });
});
define("dummy/templates/components/nested-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gf+xiRuc", "block": "{\"statements\":[[11,\"p\",[]],[15,\"class\",\"nestedItem-title\"],[13],[0,\"\\n  \"],[1,[28,[\"item\",\"name\"]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[6,[\"drag-sort-list\"],null,[[\"items\",\"group\",\"dragEndAction\"],[[28,[\"item\",\"children\"]],[28,[\"group\"]],[28,[\"dragEndAction\"]]]],{\"statements\":[[0,\"  \"],[1,[33,[\"nested-item\"],null,[[\"item\",\"group\",\"dragEndAction\"],[[28,[\"child\"]],[28,[\"group\"]],[28,[\"dragEndAction\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"child\"]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/components/nested-item.hbs" } });
});
define("dummy/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "YCG/XQRZ", "block": "{\"statements\":[[1,[33,[\"fork-me\"],[\"https://github.com/Deveo/ember-drag-sort/\"],null],false],[0,\"\\n\\n\"],[11,\"h1\",[]],[13],[0,\"ember-drag-sort demo\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  See\\n\\n  \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/Deveo/ember-drag-sort/blob/gen-0/tests/dummy/app/templates/index.hbs\"],[13],[1,[26,[\"concat\"]],false],[0,\"demo template source\"],[1,[26,[\"concat\"]],false],[14],[0,\"\\n\\n  and\\n\\n  \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/Deveo/ember-drag-sort/blob/gen-0/tests/dummy/app/controllers/index.js\"],[13],[1,[26,[\"concat\"]],false],[0,\"demo controller source\"],[1,[26,[\"concat\"]],false],[14],[0,\".\\n\"],[14],[0,\"\\n\\n\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"list-groups\"],[13],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"list-group-wrapper\"],[13],[0,\"\\n    \"],[11,\"h2\",[]],[13],[0,\"Simple usage\"],[14],[0,\"\\n\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Sort lists, drag between lists. Won't let you drag items from/to other groups.\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"section\",[]],[15,\"class\",\"list-group\"],[13],[0,\"\\n      \"],[11,\"article\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n        \"],[11,\"h4\",[]],[13],[0,\"List 1\"],[14],[0,\"\\n\\n\"],[6,[\"drag-sort-list\"],null,[[\"items\",\"dragEndAction\"],[[28,[\"items1\"]],[33,[\"action\"],[[28,[null]],\"dragEnd\"],null]]],{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"the-item\"],[13],[0,\"\\n            \"],[1,[28,[\"item\",\"name\"]],false],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"      \"],[14],[0,\"\\n\\n      \"],[11,\"article\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n        \"],[11,\"h4\",[]],[13],[0,\"List 2 with drag handles\"],[14],[0,\"\\n\\n\"],[6,[\"drag-sort-list\"],null,[[\"items\",\"handle\",\"dragEndAction\"],[[28,[\"items2\"]],\".handle\",[33,[\"action\"],[[28,[null]],\"dragEnd\"],null]]],{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"the-item\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"handle\"],[15,\"draggable\",\"true\"],[13],[0,\"☰\"],[14],[0,\"\\n            \"],[1,[28,[\"item\",\"name\"]],false],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"list-group-wrapper\"],[13],[0,\"\\n    \"],[11,\"h2\",[]],[13],[0,\"Async action\"],[14],[0,\"\\n\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Uses async action, driven by \"],[11,\"a\",[]],[15,\"href\",\"http://ember-concurrency.com/\"],[13],[0,\"ember-concurrency\"],[14],[0,\".\\n\\n      See \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/Deveo/ember-drag-sort/blob/gen-0/tests/dummy/app/controllers/index.js#L69-L82\"],[13],[0,\"task source\"],[14],[0,\".\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      \"],[11,\"label\",[]],[13],[0,\"\\n        \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\"],[\"checkbox\",[28,[\"networkFailure\"]]]]],false],[0,\"\\n        Simulate network failure.\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Status:\\n\\n\"],[6,[\"if\"],[[28,[\"dragEndTask\",\"isRunning\"]]],null,{\"statements\":[[0,\"        Updating...\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"dragEndTask\",\"last\",\"error\"]]],null,{\"statements\":[[0,\"        \"],[1,[28,[\"dragEndTask\",\"last\",\"error\",\"message\"]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        Idle.\\n      \"]],\"locals\":[]}]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n\\n    \"],[11,\"section\",[]],[15,\"class\",\"list-group\"],[13],[0,\"\\n      \"],[11,\"article\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n        \"],[11,\"h4\",[]],[13],[0,\"List 3\"],[14],[0,\"\\n\\n\"],[6,[\"drag-sort-list\"],null,[[\"items\",\"group\",\"draggingEnabled\",\"dragEndAction\"],[[28,[\"items3\"]],2,[28,[\"dragEndTask\",\"isIdle\"]],[33,[\"action\"],[[28,[null]],[33,[\"perform\"],[[28,[\"dragEndTask\"]]],null]],null]]],{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"the-item\"],[13],[0,\"\\n            \"],[1,[28,[\"item\",\"name\"]],false],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"      \"],[14],[0,\"\\n\\n\\n      \"],[11,\"article\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n        \"],[11,\"h4\",[]],[13],[0,\"List 4\"],[14],[0,\"\\n\\n\"],[6,[\"drag-sort-list\"],null,[[\"items\",\"group\",\"draggingEnabled\",\"dragEndAction\"],[[28,[\"items4\"]],2,[33,[\"not\"],[[28,[\"dragEndTask\",\"isRunning\"]]],null],[33,[\"action\"],[[28,[null]],[33,[\"perform\"],[[28,[\"dragEndTask\"]]],null]],null]]],{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"the-item\"],[13],[0,\"\\n            \"],[1,[28,[\"item\",\"name\"]],false],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"list-groups\"],[13],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"list-group-wrapper\"],[13],[0,\"\\n    \"],[11,\"h2\",[]],[13],[0,\"Unsortable list\"],[14],[0,\"\\n\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Use `determineForeignPositionAction` to prevent user from rearranging a list, while still letting them drag in and out of the list\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"section\",[]],[15,\"class\",\"list-group\"],[13],[0,\"\\n      \"],[11,\"article\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n        \"],[11,\"h4\",[]],[13],[0,\"List 5 (always sorted alphabetically)\"],[14],[0,\"\\n\\n\"],[6,[\"drag-sort-list\"],null,[[\"items\",\"group\",\"dragEndAction\",\"determineForeignPositionAction\"],[[28,[\"items5\"]],3,[33,[\"action\"],[[28,[null]],\"dragEnd\"],null],[33,[\"action\"],[[28,[null]],\"determineForeignPosition\"],null]]],{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"the-item\"],[13],[0,\"\\n            \"],[1,[28,[\"item\",\"name\"]],false],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"      \"],[14],[0,\"\\n\\n      \"],[11,\"article\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n        \"],[11,\"h4\",[]],[13],[0,\"List 6 (sorted by user)\"],[14],[0,\"\\n\\n\"],[6,[\"drag-sort-list\"],null,[[\"items\",\"group\",\"dragEndAction\"],[[28,[\"items6\"]],3,[33,[\"action\"],[[28,[null]],\"dragEnd\"],null]]],{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"the-item\"],[13],[0,\"\\n            \"],[1,[28,[\"item\",\"name\"]],false],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"list-group-wrapper\"],[13],[0,\"\\n    \"],[11,\"h2\",[]],[13],[0,\"Create copies of items by dragging out, delete by dragging in\"],[14],[0,\"\\n\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Drag out of source list to create copies of items. Drag back into the source list to remove copies. The source list can't be modified.\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"section\",[]],[15,\"class\",\"list-group\"],[13],[0,\"\\n      \"],[11,\"article\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n        \"],[11,\"h4\",[]],[13],[0,\"List 7 (source, always sorted alphabetically)\"],[14],[0,\"\\n\\n\"],[6,[\"drag-sort-list\"],null,[[\"items\",\"group\",\"dragEndAction\",\"determineForeignPositionAction\"],[[28,[\"items7\"]],4,[33,[\"action\"],[[28,[null]],\"dragEnd2\"],null],[33,[\"action\"],[[28,[null]],\"determineForeignPosition2\"],null]]],{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"the-item\"],[13],[0,\"\\n            \"],[1,[28,[\"item\",\"name\"]],false],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"      \"],[14],[0,\"\\n\\n      \"],[11,\"article\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n        \"],[11,\"h4\",[]],[13],[0,\"List 8 (target, sorted by user)\"],[14],[0,\"\\n\\n\"],[6,[\"drag-sort-list\"],null,[[\"items\",\"group\",\"dragEndAction\"],[[28,[\"items8\"]],4,[33,[\"action\"],[[28,[null]],\"dragEnd2\"],null]]],{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"the-item\"],[13],[0,\"\\n            \"],[1,[28,[\"item\",\"name\"]],false],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"      \"],[14],[0,\"\\n\\n      \"],[11,\"article\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n        \"],[11,\"h4\",[]],[13],[0,\"List 9 (target, sorted by user)\"],[14],[0,\"\\n\\n\"],[6,[\"drag-sort-list\"],null,[[\"items\",\"group\",\"dragEndAction\"],[[28,[\"items9\"]],4,[33,[\"action\"],[[28,[null]],\"dragEnd2\"],null]]],{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"the-item\"],[13],[0,\"\\n            \"],[1,[28,[\"item\",\"name\"]],false],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"list-group-wrapper\"],[13],[0,\"\\n    \"],[11,\"h2\",[]],[13],[0,\"Tables\"],[14],[0,\"\\n\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      ember-drag-sort uses a simple CSS technique to render the placeholder: `:before` and `:after` pseudoelements.\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Unfortunately, this doesn't work with HTML tables because table semantics are very restrictive. To work around this problem, top/bottom padding on table cells can be used instead of selectors.\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      This is not a great solution because padding appears \"],[11,\"em\",[]],[13],[0,\"inside\"],[14],[0,\" table cells. If you want your cells to have borders, you'll have to apply them to inner elements instead.\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      See \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/Deveo/ember-drag-sort/blob/gen-0/tests/dummy/app/styles/app.css#L126-L159\"],[13],[0,\"style overrides of this demo.\"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"section\",[]],[15,\"class\",\"list-group\"],[13],[0,\"\\n      \"],[11,\"article\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n        \"],[11,\"h4\",[]],[13],[0,\"Table 1\"],[14],[0,\"\\n\\n\"],[6,[\"drag-sort-list\"],null,[[\"items\",\"tagName\",\"childTagName\",\"group\",\"dragEndAction\"],[[28,[\"items10\"]],\"table\",\"tr\",\"table\",[33,[\"action\"],[[28,[null]],\"dragEnd\"],null]]],{\"statements\":[[0,\"          \"],[11,\"td\",[]],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"the-item\"],[13],[0,\"\\n              \"],[1,[28,[\"item\",\"name\"]],false],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"      \"],[14],[0,\"\\n\\n      \"],[11,\"article\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n        \"],[11,\"h4\",[]],[13],[0,\"Table 2\"],[14],[0,\"\\n\\n\"],[6,[\"drag-sort-list\"],null,[[\"items\",\"tagName\",\"childTagName\",\"group\",\"dragEndAction\"],[[28,[\"items11\"]],\"table\",\"tr\",\"table\",[33,[\"action\"],[[28,[null]],\"dragEnd\"],null]]],{\"statements\":[[0,\"          \"],[11,\"td\",[]],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"the-item\"],[13],[0,\"\\n              \"],[1,[28,[\"item\",\"name\"]],false],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"list-group-wrapper\"],[13],[0,\"\\n  \"],[11,\"h2\",[]],[13],[0,\"Nested list\"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    See\\n    \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/Deveo/ember-drag-sort/blob/gen-0/tests/dummy/app/templates/components/nested-item.hbs\"],[13],[1,[26,[\"concat\"]],false],[0,\"component template source\"],[1,[26,[\"concat\"]],false],[14],[0,\".\\n  \"],[14],[0,\"\\n\\n  \"],[1,[33,[\"nested-item\"],null,[[\"item\",\"dragEndAction\"],[[28,[\"nestedItem\"]],[33,[\"action\"],[[28,[null]],\"dragEnd\"],null]]]],false],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/index.hbs" } });
});


define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("dummy/app")["default"].create({});
}
//# sourceMappingURL=dummy.map
