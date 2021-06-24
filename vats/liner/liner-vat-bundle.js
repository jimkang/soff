
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getAugmentedNamespace(n) {
		if (n.__esModule) return n;
		var a = Object.defineProperty({}, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var linerVat = {};

	/* eslint complexity: [2, 18], max-statements: [2, 33] */
	var shams = function hasSymbols() {
		if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
		if (typeof Symbol.iterator === 'symbol') { return true; }

		var obj = {};
		var sym = Symbol('test');
		var symObj = Object(sym);
		if (typeof sym === 'string') { return false; }

		if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
		if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

		// temp disabled per https://github.com/ljharb/object.assign/issues/17
		// if (sym instanceof Symbol) { return false; }
		// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
		// if (!(symObj instanceof Symbol)) { return false; }

		// if (typeof Symbol.prototype.toString !== 'function') { return false; }
		// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

		var symVal = 42;
		obj[sym] = symVal;
		for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
		if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

		if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

		var syms = Object.getOwnPropertySymbols(obj);
		if (syms.length !== 1 || syms[0] !== sym) { return false; }

		if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

		if (typeof Object.getOwnPropertyDescriptor === 'function') {
			var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
			if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
		}

		return true;
	};

	var origSymbol = typeof Symbol !== 'undefined' && Symbol;
	var hasSymbolSham = shams;

	var hasSymbols$1 = function hasNativeSymbols() {
		if (typeof origSymbol !== 'function') { return false; }
		if (typeof Symbol !== 'function') { return false; }
		if (typeof origSymbol('foo') !== 'symbol') { return false; }
		if (typeof Symbol('bar') !== 'symbol') { return false; }

		return hasSymbolSham();
	};

	/* eslint no-invalid-this: 1 */

	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var slice$2 = Array.prototype.slice;
	var toStr$1 = Object.prototype.toString;
	var funcType = '[object Function]';

	var implementation$1 = function bind(that) {
	    var target = this;
	    if (typeof target !== 'function' || toStr$1.call(target) !== funcType) {
	        throw new TypeError(ERROR_MESSAGE + target);
	    }
	    var args = slice$2.call(arguments, 1);

	    var bound;
	    var binder = function () {
	        if (this instanceof bound) {
	            var result = target.apply(
	                this,
	                args.concat(slice$2.call(arguments))
	            );
	            if (Object(result) === result) {
	                return result;
	            }
	            return this;
	        } else {
	            return target.apply(
	                that,
	                args.concat(slice$2.call(arguments))
	            );
	        }
	    };

	    var boundLength = Math.max(0, target.length - args.length);
	    var boundArgs = [];
	    for (var i = 0; i < boundLength; i++) {
	        boundArgs.push('$' + i);
	    }

	    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

	    if (target.prototype) {
	        var Empty = function Empty() {};
	        Empty.prototype = target.prototype;
	        bound.prototype = new Empty();
	        Empty.prototype = null;
	    }

	    return bound;
	};

	var implementation = implementation$1;

	var functionBind = Function.prototype.bind || implementation;

	var bind$1 = functionBind;

	var src$3 = bind$1.call(Function.call, Object.prototype.hasOwnProperty);

	var undefined$1;

	var $SyntaxError = SyntaxError;
	var $Function = Function;
	var $TypeError$1 = TypeError;

	// eslint-disable-next-line consistent-return
	var getEvalledConstructor = function (expressionSyntax) {
		try {
			return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
		} catch (e) {}
	};

	var $gOPD = Object.getOwnPropertyDescriptor;
	if ($gOPD) {
		try {
			$gOPD({}, '');
		} catch (e) {
			$gOPD = null; // this is IE 8, which has a broken gOPD
		}
	}

	var throwTypeError = function () {
		throw new $TypeError$1();
	};
	var ThrowTypeError = $gOPD
		? (function () {
			try {
				// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
				arguments.callee; // IE 8 does not throw here
				return throwTypeError;
			} catch (calleeThrows) {
				try {
					// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
					return $gOPD(arguments, 'callee').get;
				} catch (gOPDthrows) {
					return throwTypeError;
				}
			}
		}())
		: throwTypeError;

	var hasSymbols = hasSymbols$1();

	var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

	var needsEval = {};

	var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto(Uint8Array);

	var INTRINSICS = {
		'%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
		'%Array%': Array,
		'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
		'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined$1,
		'%AsyncFromSyncIteratorPrototype%': undefined$1,
		'%AsyncFunction%': needsEval,
		'%AsyncGenerator%': needsEval,
		'%AsyncGeneratorFunction%': needsEval,
		'%AsyncIteratorPrototype%': needsEval,
		'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
		'%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
		'%Boolean%': Boolean,
		'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
		'%Date%': Date,
		'%decodeURI%': decodeURI,
		'%decodeURIComponent%': decodeURIComponent,
		'%encodeURI%': encodeURI,
		'%encodeURIComponent%': encodeURIComponent,
		'%Error%': Error,
		'%eval%': eval, // eslint-disable-line no-eval
		'%EvalError%': EvalError,
		'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
		'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
		'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
		'%Function%': $Function,
		'%GeneratorFunction%': needsEval,
		'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
		'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
		'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
		'%isFinite%': isFinite,
		'%isNaN%': isNaN,
		'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
		'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
		'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
		'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
		'%Math%': Math,
		'%Number%': Number,
		'%Object%': Object,
		'%parseFloat%': parseFloat,
		'%parseInt%': parseInt,
		'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
		'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
		'%RangeError%': RangeError,
		'%ReferenceError%': ReferenceError,
		'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
		'%RegExp%': RegExp,
		'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
		'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
		'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
		'%String%': String,
		'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined$1,
		'%Symbol%': hasSymbols ? Symbol : undefined$1,
		'%SyntaxError%': $SyntaxError,
		'%ThrowTypeError%': ThrowTypeError,
		'%TypedArray%': TypedArray,
		'%TypeError%': $TypeError$1,
		'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
		'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
		'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
		'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
		'%URIError%': URIError,
		'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
		'%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
		'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
	};

	var doEval = function doEval(name) {
		var value;
		if (name === '%AsyncFunction%') {
			value = getEvalledConstructor('async function () {}');
		} else if (name === '%GeneratorFunction%') {
			value = getEvalledConstructor('function* () {}');
		} else if (name === '%AsyncGeneratorFunction%') {
			value = getEvalledConstructor('async function* () {}');
		} else if (name === '%AsyncGenerator%') {
			var fn = doEval('%AsyncGeneratorFunction%');
			if (fn) {
				value = fn.prototype;
			}
		} else if (name === '%AsyncIteratorPrototype%') {
			var gen = doEval('%AsyncGenerator%');
			if (gen) {
				value = getProto(gen.prototype);
			}
		}

		INTRINSICS[name] = value;

		return value;
	};

	var LEGACY_ALIASES = {
		'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
		'%ArrayPrototype%': ['Array', 'prototype'],
		'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
		'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
		'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
		'%ArrayProto_values%': ['Array', 'prototype', 'values'],
		'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
		'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
		'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
		'%BooleanPrototype%': ['Boolean', 'prototype'],
		'%DataViewPrototype%': ['DataView', 'prototype'],
		'%DatePrototype%': ['Date', 'prototype'],
		'%ErrorPrototype%': ['Error', 'prototype'],
		'%EvalErrorPrototype%': ['EvalError', 'prototype'],
		'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
		'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
		'%FunctionPrototype%': ['Function', 'prototype'],
		'%Generator%': ['GeneratorFunction', 'prototype'],
		'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
		'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
		'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
		'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
		'%JSONParse%': ['JSON', 'parse'],
		'%JSONStringify%': ['JSON', 'stringify'],
		'%MapPrototype%': ['Map', 'prototype'],
		'%NumberPrototype%': ['Number', 'prototype'],
		'%ObjectPrototype%': ['Object', 'prototype'],
		'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
		'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
		'%PromisePrototype%': ['Promise', 'prototype'],
		'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
		'%Promise_all%': ['Promise', 'all'],
		'%Promise_reject%': ['Promise', 'reject'],
		'%Promise_resolve%': ['Promise', 'resolve'],
		'%RangeErrorPrototype%': ['RangeError', 'prototype'],
		'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
		'%RegExpPrototype%': ['RegExp', 'prototype'],
		'%SetPrototype%': ['Set', 'prototype'],
		'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
		'%StringPrototype%': ['String', 'prototype'],
		'%SymbolPrototype%': ['Symbol', 'prototype'],
		'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
		'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
		'%TypeErrorPrototype%': ['TypeError', 'prototype'],
		'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
		'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
		'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
		'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
		'%URIErrorPrototype%': ['URIError', 'prototype'],
		'%WeakMapPrototype%': ['WeakMap', 'prototype'],
		'%WeakSetPrototype%': ['WeakSet', 'prototype']
	};

	var bind = functionBind;
	var hasOwn$1 = src$3;
	var $concat = bind.call(Function.call, Array.prototype.concat);
	var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
	var $replace = bind.call(Function.call, String.prototype.replace);
	var $strSlice = bind.call(Function.call, String.prototype.slice);

	/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
	var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
	var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
	var stringToPath = function stringToPath(string) {
		var first = $strSlice(string, 0, 1);
		var last = $strSlice(string, -1);
		if (first === '%' && last !== '%') {
			throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
		} else if (last === '%' && first !== '%') {
			throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
		}
		var result = [];
		$replace(string, rePropName, function (match, number, quote, subString) {
			result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
		});
		return result;
	};
	/* end adaptation */

	var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
		var intrinsicName = name;
		var alias;
		if (hasOwn$1(LEGACY_ALIASES, intrinsicName)) {
			alias = LEGACY_ALIASES[intrinsicName];
			intrinsicName = '%' + alias[0] + '%';
		}

		if (hasOwn$1(INTRINSICS, intrinsicName)) {
			var value = INTRINSICS[intrinsicName];
			if (value === needsEval) {
				value = doEval(intrinsicName);
			}
			if (typeof value === 'undefined' && !allowMissing) {
				throw new $TypeError$1('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
			}

			return {
				alias: alias,
				name: intrinsicName,
				value: value
			};
		}

		throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
	};

	var getIntrinsic = function GetIntrinsic(name, allowMissing) {
		if (typeof name !== 'string' || name.length === 0) {
			throw new $TypeError$1('intrinsic name must be a non-empty string');
		}
		if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
			throw new $TypeError$1('"allowMissing" argument must be a boolean');
		}

		var parts = stringToPath(name);
		var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

		var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
		var intrinsicRealName = intrinsic.name;
		var value = intrinsic.value;
		var skipFurtherCaching = false;

		var alias = intrinsic.alias;
		if (alias) {
			intrinsicBaseName = alias[0];
			$spliceApply(parts, $concat([0, 1], alias));
		}

		for (var i = 1, isOwn = true; i < parts.length; i += 1) {
			var part = parts[i];
			var first = $strSlice(part, 0, 1);
			var last = $strSlice(part, -1);
			if (
				(
					(first === '"' || first === "'" || first === '`')
					|| (last === '"' || last === "'" || last === '`')
				)
				&& first !== last
			) {
				throw new $SyntaxError('property names with quotes must have matching quotes');
			}
			if (part === 'constructor' || !isOwn) {
				skipFurtherCaching = true;
			}

			intrinsicBaseName += '.' + part;
			intrinsicRealName = '%' + intrinsicBaseName + '%';

			if (hasOwn$1(INTRINSICS, intrinsicRealName)) {
				value = INTRINSICS[intrinsicRealName];
			} else if (value != null) {
				if (!(part in value)) {
					if (!allowMissing) {
						throw new $TypeError$1('base intrinsic for ' + name + ' exists, but the property is not available.');
					}
					return void undefined$1;
				}
				if ($gOPD && (i + 1) >= parts.length) {
					var desc = $gOPD(value, part);
					isOwn = !!desc;

					// By convention, when a data property is converted to an accessor
					// property to emulate a data property that does not suffer from
					// the override mistake, that accessor's getter is marked with
					// an `originalValue` property. Here, when we detect this, we
					// uphold the illusion by pretending to see that original data
					// property, i.e., returning the value rather than the getter
					// itself.
					if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
						value = desc.get;
					} else {
						value = value[part];
					}
				} else {
					isOwn = hasOwn$1(value, part);
					value = value[part];
				}

				if (isOwn && !skipFurtherCaching) {
					INTRINSICS[intrinsicRealName] = value;
				}
			}
		}
		return value;
	};

	var callBind$1 = {exports: {}};

	(function (module) {

	var bind = functionBind;
	var GetIntrinsic = getIntrinsic;

	var $apply = GetIntrinsic('%Function.prototype.apply%');
	var $call = GetIntrinsic('%Function.prototype.call%');
	var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

	var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
	var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
	var $max = GetIntrinsic('%Math.max%');

	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
		} catch (e) {
			// IE 8 has a broken defineProperty
			$defineProperty = null;
		}
	}

	module.exports = function callBind(originalFunction) {
		var func = $reflectApply(bind, $call, arguments);
		if ($gOPD && $defineProperty) {
			var desc = $gOPD(func, 'length');
			if (desc.configurable) {
				// original length, plus the receiver, minus any additional arguments (after the receiver)
				$defineProperty(
					func,
					'length',
					{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
				);
			}
		}
		return func;
	};

	var applyBind = function applyBind() {
		return $reflectApply(bind, $apply, arguments);
	};

	if ($defineProperty) {
		$defineProperty(module.exports, 'apply', { value: applyBind });
	} else {
		module.exports.apply = applyBind;
	}
	}(callBind$1));

	var GetIntrinsic$1 = getIntrinsic;

	var callBind = callBind$1.exports;

	var $indexOf = callBind(GetIntrinsic$1('String.prototype.indexOf'));

	var callBound$1 = function callBoundIntrinsic(name, allowMissing) {
		var intrinsic = GetIntrinsic$1(name, !!allowMissing);
		if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
			return callBind(intrinsic);
		}
		return intrinsic;
	};

	var _nodeResolve_empty = {};

	var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'default': _nodeResolve_empty
	});

	var require$$0$2 = /*@__PURE__*/getAugmentedNamespace(_nodeResolve_empty$1);

	var hasMap = typeof Map === 'function' && Map.prototype;
	var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
	var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
	var mapForEach = hasMap && Map.prototype.forEach;
	var hasSet = typeof Set === 'function' && Set.prototype;
	var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
	var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
	var setForEach = hasSet && Set.prototype.forEach;
	var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
	var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
	var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
	var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
	var booleanValueOf = Boolean.prototype.valueOf;
	var objectToString$3 = Object.prototype.toString;
	var functionToString = Function.prototype.toString;
	var match = String.prototype.match;
	var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
	var gOPS = Object.getOwnPropertySymbols;
	var symToString = typeof Symbol === 'function' ? Symbol.prototype.toString : null;
	var isEnumerable = Object.prototype.propertyIsEnumerable;

	var inspectCustom = require$$0$2.custom;
	var inspectSymbol = inspectCustom && isSymbol$2(inspectCustom) ? inspectCustom : null;

	var objectInspect = function inspect_(obj, options, depth, seen) {
	    var opts = options || {};

	    if (has$3(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
	        throw new TypeError('option "quoteStyle" must be "single" or "double"');
	    }
	    if (
	        has$3(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
	            ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
	            : opts.maxStringLength !== null
	        )
	    ) {
	        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
	    }
	    var customInspect = has$3(opts, 'customInspect') ? opts.customInspect : true;
	    if (typeof customInspect !== 'boolean') {
	        throw new TypeError('option "customInspect", if provided, must be `true` or `false`');
	    }

	    if (
	        has$3(opts, 'indent')
	        && opts.indent !== null
	        && opts.indent !== '\t'
	        && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
	    ) {
	        throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');
	    }

	    if (typeof obj === 'undefined') {
	        return 'undefined';
	    }
	    if (obj === null) {
	        return 'null';
	    }
	    if (typeof obj === 'boolean') {
	        return obj ? 'true' : 'false';
	    }

	    if (typeof obj === 'string') {
	        return inspectString(obj, opts);
	    }
	    if (typeof obj === 'number') {
	        if (obj === 0) {
	            return Infinity / obj > 0 ? '0' : '-0';
	        }
	        return String(obj);
	    }
	    if (typeof obj === 'bigint') {
	        return String(obj) + 'n';
	    }

	    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
	    if (typeof depth === 'undefined') { depth = 0; }
	    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
	        return isArray$4(obj) ? '[Array]' : '[Object]';
	    }

	    var indent = getIndent(opts, depth);

	    if (typeof seen === 'undefined') {
	        seen = [];
	    } else if (indexOf(seen, obj) >= 0) {
	        return '[Circular]';
	    }

	    function inspect(value, from, noIndent) {
	        if (from) {
	            seen = seen.slice();
	            seen.push(from);
	        }
	        if (noIndent) {
	            var newOpts = {
	                depth: opts.depth
	            };
	            if (has$3(opts, 'quoteStyle')) {
	                newOpts.quoteStyle = opts.quoteStyle;
	            }
	            return inspect_(value, newOpts, depth + 1, seen);
	        }
	        return inspect_(value, opts, depth + 1, seen);
	    }

	    if (typeof obj === 'function') {
	        var name = nameOf(obj);
	        var keys = arrObjKeys(obj, inspect);
	        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + keys.join(', ') + ' }' : '');
	    }
	    if (isSymbol$2(obj)) {
	        var symString = symToString.call(obj);
	        return typeof obj === 'object' ? markBoxed(symString) : symString;
	    }
	    if (isElement(obj)) {
	        var s = '<' + String(obj.nodeName).toLowerCase();
	        var attrs = obj.attributes || [];
	        for (var i = 0; i < attrs.length; i++) {
	            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
	        }
	        s += '>';
	        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
	        s += '</' + String(obj.nodeName).toLowerCase() + '>';
	        return s;
	    }
	    if (isArray$4(obj)) {
	        if (obj.length === 0) { return '[]'; }
	        var xs = arrObjKeys(obj, inspect);
	        if (indent && !singleLineValues(xs)) {
	            return '[' + indentedJoin(xs, indent) + ']';
	        }
	        return '[ ' + xs.join(', ') + ' ]';
	    }
	    if (isError(obj)) {
	        var parts = arrObjKeys(obj, inspect);
	        if (parts.length === 0) { return '[' + String(obj) + ']'; }
	        return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';
	    }
	    if (typeof obj === 'object' && customInspect) {
	        if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
	            return obj[inspectSymbol]();
	        } else if (typeof obj.inspect === 'function') {
	            return obj.inspect();
	        }
	    }
	    if (isMap(obj)) {
	        var mapParts = [];
	        mapForEach.call(obj, function (value, key) {
	            mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
	        });
	        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
	    }
	    if (isSet(obj)) {
	        var setParts = [];
	        setForEach.call(obj, function (value) {
	            setParts.push(inspect(value, obj));
	        });
	        return collectionOf('Set', setSize.call(obj), setParts, indent);
	    }
	    if (isWeakMap(obj)) {
	        return weakCollectionOf('WeakMap');
	    }
	    if (isWeakSet(obj)) {
	        return weakCollectionOf('WeakSet');
	    }
	    if (isNumber(obj)) {
	        return markBoxed(inspect(Number(obj)));
	    }
	    if (isBigInt(obj)) {
	        return markBoxed(inspect(bigIntValueOf.call(obj)));
	    }
	    if (isBoolean(obj)) {
	        return markBoxed(booleanValueOf.call(obj));
	    }
	    if (isString(obj)) {
	        return markBoxed(inspect(String(obj)));
	    }
	    if (!isDate(obj) && !isRegExp$1(obj)) {
	        var ys = arrObjKeys(obj, inspect);
	        if (ys.length === 0) { return '{}'; }
	        if (indent) {
	            return '{' + indentedJoin(ys, indent) + '}';
	        }
	        return '{ ' + ys.join(', ') + ' }';
	    }
	    return String(obj);
	};

	function wrapQuotes(s, defaultStyle, opts) {
	    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
	    return quoteChar + s + quoteChar;
	}

	function quote(s) {
	    return String(s).replace(/"/g, '&quot;');
	}

	function isArray$4(obj) { return toStr(obj) === '[object Array]'; }
	function isDate(obj) { return toStr(obj) === '[object Date]'; }
	function isRegExp$1(obj) { return toStr(obj) === '[object RegExp]'; }
	function isError(obj) { return toStr(obj) === '[object Error]'; }
	function isSymbol$2(obj) { return toStr(obj) === '[object Symbol]'; }
	function isString(obj) { return toStr(obj) === '[object String]'; }
	function isNumber(obj) { return toStr(obj) === '[object Number]'; }
	function isBigInt(obj) { return toStr(obj) === '[object BigInt]'; }
	function isBoolean(obj) { return toStr(obj) === '[object Boolean]'; }

	var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
	function has$3(obj, key) {
	    return hasOwn.call(obj, key);
	}

	function toStr(obj) {
	    return objectToString$3.call(obj);
	}

	function nameOf(f) {
	    if (f.name) { return f.name; }
	    var m = match.call(functionToString.call(f), /^function\s*([\w$]+)/);
	    if (m) { return m[1]; }
	    return null;
	}

	function indexOf(xs, x) {
	    if (xs.indexOf) { return xs.indexOf(x); }
	    for (var i = 0, l = xs.length; i < l; i++) {
	        if (xs[i] === x) { return i; }
	    }
	    return -1;
	}

	function isMap(x) {
	    if (!mapSize || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        mapSize.call(x);
	        try {
	            setSize.call(x);
	        } catch (s) {
	            return true;
	        }
	        return x instanceof Map; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isWeakMap(x) {
	    if (!weakMapHas || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        weakMapHas.call(x, weakMapHas);
	        try {
	            weakSetHas.call(x, weakSetHas);
	        } catch (s) {
	            return true;
	        }
	        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isSet(x) {
	    if (!setSize || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        setSize.call(x);
	        try {
	            mapSize.call(x);
	        } catch (m) {
	            return true;
	        }
	        return x instanceof Set; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isWeakSet(x) {
	    if (!weakSetHas || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        weakSetHas.call(x, weakSetHas);
	        try {
	            weakMapHas.call(x, weakMapHas);
	        } catch (s) {
	            return true;
	        }
	        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isElement(x) {
	    if (!x || typeof x !== 'object') { return false; }
	    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
	        return true;
	    }
	    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
	}

	function inspectString(str, opts) {
	    if (str.length > opts.maxStringLength) {
	        var remaining = str.length - opts.maxStringLength;
	        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
	        return inspectString(str.slice(0, opts.maxStringLength), opts) + trailer;
	    }
	    // eslint-disable-next-line no-control-regex
	    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
	    return wrapQuotes(s, 'single', opts);
	}

	function lowbyte(c) {
	    var n = c.charCodeAt(0);
	    var x = {
	        8: 'b',
	        9: 't',
	        10: 'n',
	        12: 'f',
	        13: 'r'
	    }[n];
	    if (x) { return '\\' + x; }
	    return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16).toUpperCase();
	}

	function markBoxed(str) {
	    return 'Object(' + str + ')';
	}

	function weakCollectionOf(type) {
	    return type + ' { ? }';
	}

	function collectionOf(type, size, entries, indent) {
	    var joinedEntries = indent ? indentedJoin(entries, indent) : entries.join(', ');
	    return type + ' (' + size + ') {' + joinedEntries + '}';
	}

	function singleLineValues(xs) {
	    for (var i = 0; i < xs.length; i++) {
	        if (indexOf(xs[i], '\n') >= 0) {
	            return false;
	        }
	    }
	    return true;
	}

	function getIndent(opts, depth) {
	    var baseIndent;
	    if (opts.indent === '\t') {
	        baseIndent = '\t';
	    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
	        baseIndent = Array(opts.indent + 1).join(' ');
	    } else {
	        return null;
	    }
	    return {
	        base: baseIndent,
	        prev: Array(depth + 1).join(baseIndent)
	    };
	}

	function indentedJoin(xs, indent) {
	    if (xs.length === 0) { return ''; }
	    var lineJoiner = '\n' + indent.prev + indent.base;
	    return lineJoiner + xs.join(',' + lineJoiner) + '\n' + indent.prev;
	}

	function arrObjKeys(obj, inspect) {
	    var isArr = isArray$4(obj);
	    var xs = [];
	    if (isArr) {
	        xs.length = obj.length;
	        for (var i = 0; i < obj.length; i++) {
	            xs[i] = has$3(obj, i) ? inspect(obj[i], obj) : '';
	        }
	    }
	    for (var key in obj) { // eslint-disable-line no-restricted-syntax
	        if (!has$3(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
	        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
	        if ((/[^\w$]/).test(key)) {
	            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
	        } else {
	            xs.push(key + ': ' + inspect(obj[key], obj));
	        }
	    }
	    if (typeof gOPS === 'function') {
	        var syms = gOPS(obj);
	        for (var j = 0; j < syms.length; j++) {
	            if (isEnumerable.call(obj, syms[j])) {
	                xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
	            }
	        }
	    }
	    return xs;
	}

	var GetIntrinsic = getIntrinsic;
	var callBound = callBound$1;
	var inspect = objectInspect;

	var $TypeError = GetIntrinsic('%TypeError%');
	var $WeakMap = GetIntrinsic('%WeakMap%', true);
	var $Map = GetIntrinsic('%Map%', true);

	var $weakMapGet = callBound('WeakMap.prototype.get', true);
	var $weakMapSet = callBound('WeakMap.prototype.set', true);
	var $weakMapHas = callBound('WeakMap.prototype.has', true);
	var $mapGet = callBound('Map.prototype.get', true);
	var $mapSet = callBound('Map.prototype.set', true);
	var $mapHas = callBound('Map.prototype.has', true);

	/*
	 * This function traverses the list returning the node corresponding to the
	 * given key.
	 *
	 * That node is also moved to the head of the list, so that if it's accessed
	 * again we don't need to traverse the whole list. By doing so, all the recently
	 * used nodes can be accessed relatively quickly.
	 */
	var listGetNode = function (list, key) { // eslint-disable-line consistent-return
		for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
			if (curr.key === key) {
				prev.next = curr.next;
				curr.next = list.next;
				list.next = curr; // eslint-disable-line no-param-reassign
				return curr;
			}
		}
	};

	var listGet = function (objects, key) {
		var node = listGetNode(objects, key);
		return node && node.value;
	};
	var listSet = function (objects, key, value) {
		var node = listGetNode(objects, key);
		if (node) {
			node.value = value;
		} else {
			// Prepend the new node to the beginning of the list
			objects.next = { // eslint-disable-line no-param-reassign
				key: key,
				next: objects.next,
				value: value
			};
		}
	};
	var listHas = function (objects, key) {
		return !!listGetNode(objects, key);
	};

	var sideChannel = function getSideChannel() {
		var $wm;
		var $m;
		var $o;
		var channel = {
			assert: function (key) {
				if (!channel.has(key)) {
					throw new $TypeError('Side channel does not contain ' + inspect(key));
				}
			},
			get: function (key) { // eslint-disable-line consistent-return
				if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
					if ($wm) {
						return $weakMapGet($wm, key);
					}
				} else if ($Map) {
					if ($m) {
						return $mapGet($m, key);
					}
				} else {
					if ($o) { // eslint-disable-line no-lonely-if
						return listGet($o, key);
					}
				}
			},
			has: function (key) {
				if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
					if ($wm) {
						return $weakMapHas($wm, key);
					}
				} else if ($Map) {
					if ($m) {
						return $mapHas($m, key);
					}
				} else {
					if ($o) { // eslint-disable-line no-lonely-if
						return listHas($o, key);
					}
				}
				return false;
			},
			set: function (key, value) {
				if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
					if (!$wm) {
						$wm = new $WeakMap();
					}
					$weakMapSet($wm, key, value);
				} else if ($Map) {
					if (!$m) {
						$m = new $Map();
					}
					$mapSet($m, key, value);
				} else {
					if (!$o) {
						/*
						 * Initialize the linked list as an empty node, so that we don't have
						 * to special-case handling of the first node: we can always refer to
						 * it as (previous node).next, instead of something like (list).head
						 */
						$o = { key: {}, next: null };
					}
					listSet($o, key, value);
				}
			}
		};
		return channel;
	};

	var replace = String.prototype.replace;
	var percentTwenties = /%20/g;

	var Format = {
	    RFC1738: 'RFC1738',
	    RFC3986: 'RFC3986'
	};

	var formats$3 = {
	    'default': Format.RFC3986,
	    formatters: {
	        RFC1738: function (value) {
	            return replace.call(value, percentTwenties, '+');
	        },
	        RFC3986: function (value) {
	            return String(value);
	        }
	    },
	    RFC1738: Format.RFC1738,
	    RFC3986: Format.RFC3986
	};

	var formats$2 = formats$3;

	var has$2 = Object.prototype.hasOwnProperty;
	var isArray$3 = Array.isArray;

	var hexTable = (function () {
	    var array = [];
	    for (var i = 0; i < 256; ++i) {
	        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
	    }

	    return array;
	}());

	var compactQueue = function compactQueue(queue) {
	    while (queue.length > 1) {
	        var item = queue.pop();
	        var obj = item.obj[item.prop];

	        if (isArray$3(obj)) {
	            var compacted = [];

	            for (var j = 0; j < obj.length; ++j) {
	                if (typeof obj[j] !== 'undefined') {
	                    compacted.push(obj[j]);
	                }
	            }

	            item.obj[item.prop] = compacted;
	        }
	    }
	};

	var arrayToObject = function arrayToObject(source, options) {
	    var obj = options && options.plainObjects ? Object.create(null) : {};
	    for (var i = 0; i < source.length; ++i) {
	        if (typeof source[i] !== 'undefined') {
	            obj[i] = source[i];
	        }
	    }

	    return obj;
	};

	var merge$1 = function merge(target, source, options) {
	    /* eslint no-param-reassign: 0 */
	    if (!source) {
	        return target;
	    }

	    if (typeof source !== 'object') {
	        if (isArray$3(target)) {
	            target.push(source);
	        } else if (target && typeof target === 'object') {
	            if ((options && (options.plainObjects || options.allowPrototypes)) || !has$2.call(Object.prototype, source)) {
	                target[source] = true;
	            }
	        } else {
	            return [target, source];
	        }

	        return target;
	    }

	    if (!target || typeof target !== 'object') {
	        return [target].concat(source);
	    }

	    var mergeTarget = target;
	    if (isArray$3(target) && !isArray$3(source)) {
	        mergeTarget = arrayToObject(target, options);
	    }

	    if (isArray$3(target) && isArray$3(source)) {
	        source.forEach(function (item, i) {
	            if (has$2.call(target, i)) {
	                var targetItem = target[i];
	                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
	                    target[i] = merge(targetItem, item, options);
	                } else {
	                    target.push(item);
	                }
	            } else {
	                target[i] = item;
	            }
	        });
	        return target;
	    }

	    return Object.keys(source).reduce(function (acc, key) {
	        var value = source[key];

	        if (has$2.call(acc, key)) {
	            acc[key] = merge(acc[key], value, options);
	        } else {
	            acc[key] = value;
	        }
	        return acc;
	    }, mergeTarget);
	};

	var assign = function assignSingleSource(target, source) {
	    return Object.keys(source).reduce(function (acc, key) {
	        acc[key] = source[key];
	        return acc;
	    }, target);
	};

	var decode = function (str, decoder, charset) {
	    var strWithoutPlus = str.replace(/\+/g, ' ');
	    if (charset === 'iso-8859-1') {
	        // unescape never throws, no try...catch needed:
	        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
	    }
	    // utf-8
	    try {
	        return decodeURIComponent(strWithoutPlus);
	    } catch (e) {
	        return strWithoutPlus;
	    }
	};

	var encode = function encode(str, defaultEncoder, charset, kind, format) {
	    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
	    // It has been adapted here for stricter adherence to RFC 3986
	    if (str.length === 0) {
	        return str;
	    }

	    var string = str;
	    if (typeof str === 'symbol') {
	        string = Symbol.prototype.toString.call(str);
	    } else if (typeof str !== 'string') {
	        string = String(str);
	    }

	    if (charset === 'iso-8859-1') {
	        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
	            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
	        });
	    }

	    var out = '';
	    for (var i = 0; i < string.length; ++i) {
	        var c = string.charCodeAt(i);

	        if (
	            c === 0x2D // -
	            || c === 0x2E // .
	            || c === 0x5F // _
	            || c === 0x7E // ~
	            || (c >= 0x30 && c <= 0x39) // 0-9
	            || (c >= 0x41 && c <= 0x5A) // a-z
	            || (c >= 0x61 && c <= 0x7A) // A-Z
	            || (format === formats$2.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
	        ) {
	            out += string.charAt(i);
	            continue;
	        }

	        if (c < 0x80) {
	            out = out + hexTable[c];
	            continue;
	        }

	        if (c < 0x800) {
	            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
	            continue;
	        }

	        if (c < 0xD800 || c >= 0xE000) {
	            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
	            continue;
	        }

	        i += 1;
	        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
	        out += hexTable[0xF0 | (c >> 18)]
	            + hexTable[0x80 | ((c >> 12) & 0x3F)]
	            + hexTable[0x80 | ((c >> 6) & 0x3F)]
	            + hexTable[0x80 | (c & 0x3F)];
	    }

	    return out;
	};

	var compact = function compact(value) {
	    var queue = [{ obj: { o: value }, prop: 'o' }];
	    var refs = [];

	    for (var i = 0; i < queue.length; ++i) {
	        var item = queue[i];
	        var obj = item.obj[item.prop];

	        var keys = Object.keys(obj);
	        for (var j = 0; j < keys.length; ++j) {
	            var key = keys[j];
	            var val = obj[key];
	            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
	                queue.push({ obj: obj, prop: key });
	                refs.push(val);
	            }
	        }
	    }

	    compactQueue(queue);

	    return value;
	};

	var isRegExp = function isRegExp(obj) {
	    return Object.prototype.toString.call(obj) === '[object RegExp]';
	};

	var isBuffer = function isBuffer(obj) {
	    if (!obj || typeof obj !== 'object') {
	        return false;
	    }

	    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
	};

	var combine = function combine(a, b) {
	    return [].concat(a, b);
	};

	var maybeMap = function maybeMap(val, fn) {
	    if (isArray$3(val)) {
	        var mapped = [];
	        for (var i = 0; i < val.length; i += 1) {
	            mapped.push(fn(val[i]));
	        }
	        return mapped;
	    }
	    return fn(val);
	};

	var utils$2 = {
	    arrayToObject: arrayToObject,
	    assign: assign,
	    combine: combine,
	    compact: compact,
	    decode: decode,
	    encode: encode,
	    isBuffer: isBuffer,
	    isRegExp: isRegExp,
	    maybeMap: maybeMap,
	    merge: merge$1
	};

	var getSideChannel = sideChannel;
	var utils$1 = utils$2;
	var formats$1 = formats$3;
	var has$1 = Object.prototype.hasOwnProperty;

	var arrayPrefixGenerators = {
	    brackets: function brackets(prefix) {
	        return prefix + '[]';
	    },
	    comma: 'comma',
	    indices: function indices(prefix, key) {
	        return prefix + '[' + key + ']';
	    },
	    repeat: function repeat(prefix) {
	        return prefix;
	    }
	};

	var isArray$2 = Array.isArray;
	var push = Array.prototype.push;
	var pushToArray = function (arr, valueOrArray) {
	    push.apply(arr, isArray$2(valueOrArray) ? valueOrArray : [valueOrArray]);
	};

	var toISO = Date.prototype.toISOString;

	var defaultFormat = formats$1['default'];
	var defaults$3 = {
	    addQueryPrefix: false,
	    allowDots: false,
	    charset: 'utf-8',
	    charsetSentinel: false,
	    delimiter: '&',
	    encode: true,
	    encoder: utils$1.encode,
	    encodeValuesOnly: false,
	    format: defaultFormat,
	    formatter: formats$1.formatters[defaultFormat],
	    // deprecated
	    indices: false,
	    serializeDate: function serializeDate(date) {
	        return toISO.call(date);
	    },
	    skipNulls: false,
	    strictNullHandling: false
	};

	var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
	    return typeof v === 'string'
	        || typeof v === 'number'
	        || typeof v === 'boolean'
	        || typeof v === 'symbol'
	        || typeof v === 'bigint';
	};

	var stringify$1 = function stringify(
	    object,
	    prefix,
	    generateArrayPrefix,
	    strictNullHandling,
	    skipNulls,
	    encoder,
	    filter,
	    sort,
	    allowDots,
	    serializeDate,
	    format,
	    formatter,
	    encodeValuesOnly,
	    charset,
	    sideChannel
	) {
	    var obj = object;

	    if (sideChannel.has(object)) {
	        throw new RangeError('Cyclic object value');
	    }

	    if (typeof filter === 'function') {
	        obj = filter(prefix, obj);
	    } else if (obj instanceof Date) {
	        obj = serializeDate(obj);
	    } else if (generateArrayPrefix === 'comma' && isArray$2(obj)) {
	        obj = utils$1.maybeMap(obj, function (value) {
	            if (value instanceof Date) {
	                return serializeDate(value);
	            }
	            return value;
	        });
	    }

	    if (obj === null) {
	        if (strictNullHandling) {
	            return encoder && !encodeValuesOnly ? encoder(prefix, defaults$3.encoder, charset, 'key', format) : prefix;
	        }

	        obj = '';
	    }

	    if (isNonNullishPrimitive(obj) || utils$1.isBuffer(obj)) {
	        if (encoder) {
	            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults$3.encoder, charset, 'key', format);
	            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults$3.encoder, charset, 'value', format))];
	        }
	        return [formatter(prefix) + '=' + formatter(String(obj))];
	    }

	    var values = [];

	    if (typeof obj === 'undefined') {
	        return values;
	    }

	    var objKeys;
	    if (generateArrayPrefix === 'comma' && isArray$2(obj)) {
	        // we need to join elements in
	        objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : undefined }];
	    } else if (isArray$2(filter)) {
	        objKeys = filter;
	    } else {
	        var keys = Object.keys(obj);
	        objKeys = sort ? keys.sort(sort) : keys;
	    }

	    for (var i = 0; i < objKeys.length; ++i) {
	        var key = objKeys[i];
	        var value = typeof key === 'object' && key.value !== undefined ? key.value : obj[key];

	        if (skipNulls && value === null) {
	            continue;
	        }

	        var keyPrefix = isArray$2(obj)
	            ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix
	            : prefix + (allowDots ? '.' + key : '[' + key + ']');

	        sideChannel.set(object, true);
	        var valueSideChannel = getSideChannel();
	        pushToArray(values, stringify(
	            value,
	            keyPrefix,
	            generateArrayPrefix,
	            strictNullHandling,
	            skipNulls,
	            encoder,
	            filter,
	            sort,
	            allowDots,
	            serializeDate,
	            format,
	            formatter,
	            encodeValuesOnly,
	            charset,
	            valueSideChannel
	        ));
	    }

	    return values;
	};

	var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
	    if (!opts) {
	        return defaults$3;
	    }

	    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
	        throw new TypeError('Encoder has to be a function.');
	    }

	    var charset = opts.charset || defaults$3.charset;
	    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
	        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
	    }

	    var format = formats$1['default'];
	    if (typeof opts.format !== 'undefined') {
	        if (!has$1.call(formats$1.formatters, opts.format)) {
	            throw new TypeError('Unknown format option provided.');
	        }
	        format = opts.format;
	    }
	    var formatter = formats$1.formatters[format];

	    var filter = defaults$3.filter;
	    if (typeof opts.filter === 'function' || isArray$2(opts.filter)) {
	        filter = opts.filter;
	    }

	    return {
	        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults$3.addQueryPrefix,
	        allowDots: typeof opts.allowDots === 'undefined' ? defaults$3.allowDots : !!opts.allowDots,
	        charset: charset,
	        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$3.charsetSentinel,
	        delimiter: typeof opts.delimiter === 'undefined' ? defaults$3.delimiter : opts.delimiter,
	        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults$3.encode,
	        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults$3.encoder,
	        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults$3.encodeValuesOnly,
	        filter: filter,
	        format: format,
	        formatter: formatter,
	        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults$3.serializeDate,
	        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults$3.skipNulls,
	        sort: typeof opts.sort === 'function' ? opts.sort : null,
	        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$3.strictNullHandling
	    };
	};

	var stringify_1 = function (object, opts) {
	    var obj = object;
	    var options = normalizeStringifyOptions(opts);

	    var objKeys;
	    var filter;

	    if (typeof options.filter === 'function') {
	        filter = options.filter;
	        obj = filter('', obj);
	    } else if (isArray$2(options.filter)) {
	        filter = options.filter;
	        objKeys = filter;
	    }

	    var keys = [];

	    if (typeof obj !== 'object' || obj === null) {
	        return '';
	    }

	    var arrayFormat;
	    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
	        arrayFormat = opts.arrayFormat;
	    } else if (opts && 'indices' in opts) {
	        arrayFormat = opts.indices ? 'indices' : 'repeat';
	    } else {
	        arrayFormat = 'indices';
	    }

	    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

	    if (!objKeys) {
	        objKeys = Object.keys(obj);
	    }

	    if (options.sort) {
	        objKeys.sort(options.sort);
	    }

	    var sideChannel = getSideChannel();
	    for (var i = 0; i < objKeys.length; ++i) {
	        var key = objKeys[i];

	        if (options.skipNulls && obj[key] === null) {
	            continue;
	        }
	        pushToArray(keys, stringify$1(
	            obj[key],
	            key,
	            generateArrayPrefix,
	            options.strictNullHandling,
	            options.skipNulls,
	            options.encode ? options.encoder : null,
	            options.filter,
	            options.sort,
	            options.allowDots,
	            options.serializeDate,
	            options.format,
	            options.formatter,
	            options.encodeValuesOnly,
	            options.charset,
	            sideChannel
	        ));
	    }

	    var joined = keys.join(options.delimiter);
	    var prefix = options.addQueryPrefix === true ? '?' : '';

	    if (options.charsetSentinel) {
	        if (options.charset === 'iso-8859-1') {
	            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
	            prefix += 'utf8=%26%2310003%3B&';
	        } else {
	            // encodeURIComponent('✓')
	            prefix += 'utf8=%E2%9C%93&';
	        }
	    }

	    return joined.length > 0 ? prefix + joined : '';
	};

	var utils = utils$2;

	var has = Object.prototype.hasOwnProperty;
	var isArray$1 = Array.isArray;

	var defaults$2 = {
	    allowDots: false,
	    allowPrototypes: false,
	    allowSparse: false,
	    arrayLimit: 20,
	    charset: 'utf-8',
	    charsetSentinel: false,
	    comma: false,
	    decoder: utils.decode,
	    delimiter: '&',
	    depth: 5,
	    ignoreQueryPrefix: false,
	    interpretNumericEntities: false,
	    parameterLimit: 1000,
	    parseArrays: true,
	    plainObjects: false,
	    strictNullHandling: false
	};

	var interpretNumericEntities = function (str) {
	    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
	        return String.fromCharCode(parseInt(numberStr, 10));
	    });
	};

	var parseArrayValue = function (val, options) {
	    if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
	        return val.split(',');
	    }

	    return val;
	};

	// This is what browsers will submit when the ✓ character occurs in an
	// application/x-www-form-urlencoded body and the encoding of the page containing
	// the form is iso-8859-1, or when the submitted form has an accept-charset
	// attribute of iso-8859-1. Presumably also with other charsets that do not contain
	// the ✓ character, such as us-ascii.
	var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

	// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
	var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

	var parseValues = function parseQueryStringValues(str, options) {
	    var obj = {};
	    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
	    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
	    var parts = cleanStr.split(options.delimiter, limit);
	    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
	    var i;

	    var charset = options.charset;
	    if (options.charsetSentinel) {
	        for (i = 0; i < parts.length; ++i) {
	            if (parts[i].indexOf('utf8=') === 0) {
	                if (parts[i] === charsetSentinel) {
	                    charset = 'utf-8';
	                } else if (parts[i] === isoSentinel) {
	                    charset = 'iso-8859-1';
	                }
	                skipIndex = i;
	                i = parts.length; // The eslint settings do not allow break;
	            }
	        }
	    }

	    for (i = 0; i < parts.length; ++i) {
	        if (i === skipIndex) {
	            continue;
	        }
	        var part = parts[i];

	        var bracketEqualsPos = part.indexOf(']=');
	        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

	        var key, val;
	        if (pos === -1) {
	            key = options.decoder(part, defaults$2.decoder, charset, 'key');
	            val = options.strictNullHandling ? null : '';
	        } else {
	            key = options.decoder(part.slice(0, pos), defaults$2.decoder, charset, 'key');
	            val = utils.maybeMap(
	                parseArrayValue(part.slice(pos + 1), options),
	                function (encodedVal) {
	                    return options.decoder(encodedVal, defaults$2.decoder, charset, 'value');
	                }
	            );
	        }

	        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
	            val = interpretNumericEntities(val);
	        }

	        if (part.indexOf('[]=') > -1) {
	            val = isArray$1(val) ? [val] : val;
	        }

	        if (has.call(obj, key)) {
	            obj[key] = utils.combine(obj[key], val);
	        } else {
	            obj[key] = val;
	        }
	    }

	    return obj;
	};

	var parseObject = function (chain, val, options, valuesParsed) {
	    var leaf = valuesParsed ? val : parseArrayValue(val, options);

	    for (var i = chain.length - 1; i >= 0; --i) {
	        var obj;
	        var root = chain[i];

	        if (root === '[]' && options.parseArrays) {
	            obj = [].concat(leaf);
	        } else {
	            obj = options.plainObjects ? Object.create(null) : {};
	            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
	            var index = parseInt(cleanRoot, 10);
	            if (!options.parseArrays && cleanRoot === '') {
	                obj = { 0: leaf };
	            } else if (
	                !isNaN(index)
	                && root !== cleanRoot
	                && String(index) === cleanRoot
	                && index >= 0
	                && (options.parseArrays && index <= options.arrayLimit)
	            ) {
	                obj = [];
	                obj[index] = leaf;
	            } else {
	                obj[cleanRoot] = leaf;
	            }
	        }

	        leaf = obj;
	    }

	    return leaf;
	};

	var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
	    if (!givenKey) {
	        return;
	    }

	    // Transform dot notation to bracket notation
	    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

	    // The regex chunks

	    var brackets = /(\[[^[\]]*])/;
	    var child = /(\[[^[\]]*])/g;

	    // Get the parent

	    var segment = options.depth > 0 && brackets.exec(key);
	    var parent = segment ? key.slice(0, segment.index) : key;

	    // Stash the parent if it exists

	    var keys = [];
	    if (parent) {
	        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
	        if (!options.plainObjects && has.call(Object.prototype, parent)) {
	            if (!options.allowPrototypes) {
	                return;
	            }
	        }

	        keys.push(parent);
	    }

	    // Loop through children appending to the array until we hit depth

	    var i = 0;
	    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
	        i += 1;
	        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
	            if (!options.allowPrototypes) {
	                return;
	            }
	        }
	        keys.push(segment[1]);
	    }

	    // If there's a remainder, just add whatever is left

	    if (segment) {
	        keys.push('[' + key.slice(segment.index) + ']');
	    }

	    return parseObject(keys, val, options, valuesParsed);
	};

	var normalizeParseOptions = function normalizeParseOptions(opts) {
	    if (!opts) {
	        return defaults$2;
	    }

	    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
	        throw new TypeError('Decoder has to be a function.');
	    }

	    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
	        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
	    }
	    var charset = typeof opts.charset === 'undefined' ? defaults$2.charset : opts.charset;

	    return {
	        allowDots: typeof opts.allowDots === 'undefined' ? defaults$2.allowDots : !!opts.allowDots,
	        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults$2.allowPrototypes,
	        allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults$2.allowSparse,
	        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults$2.arrayLimit,
	        charset: charset,
	        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$2.charsetSentinel,
	        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults$2.comma,
	        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults$2.decoder,
	        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults$2.delimiter,
	        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
	        depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults$2.depth,
	        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
	        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults$2.interpretNumericEntities,
	        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults$2.parameterLimit,
	        parseArrays: opts.parseArrays !== false,
	        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults$2.plainObjects,
	        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$2.strictNullHandling
	    };
	};

	var parse$1 = function (str, opts) {
	    var options = normalizeParseOptions(opts);

	    if (str === '' || str === null || typeof str === 'undefined') {
	        return options.plainObjects ? Object.create(null) : {};
	    }

	    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
	    var obj = options.plainObjects ? Object.create(null) : {};

	    // Iterate over the keys and setup the new object

	    var keys = Object.keys(tempObj);
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
	        obj = utils.merge(obj, newObj, options);
	    }

	    if (options.allowSparse === true) {
	        return obj;
	    }

	    return utils.compact(obj);
	};

	var stringify = stringify_1;
	var parse = parse$1;
	var formats = formats$3;

	var lib = {
	    formats: formats,
	    parse: parse,
	    stringify: stringify
	};

	var lodash_clonedeep = {exports: {}};

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	(function (module, exports) {
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
	cloneableTags[boolTag] = cloneableTags[dateTag] =
	cloneableTags[float32Tag] = cloneableTags[float64Tag] =
	cloneableTags[int8Tag] = cloneableTags[int16Tag] =
	cloneableTags[int32Tag] = cloneableTags[mapTag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[setTag] =
	cloneableTags[stringTag] = cloneableTags[symbolTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Detect free variable `exports`. */
	var freeExports = exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  // Don't return `map.set` because it's not chainable in IE 11.
	  map.set(pair[0], pair[1]);
	  return map;
	}

	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  // Don't return `set.add` because it's not chainable in IE 11.
	  set.add(value);
	  return set;
	}

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array ? array.length : 0;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	/** Used for built-in method references. */
	var arrayProto = Array.prototype,
	    funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    Symbol = root.Symbol,
	    Uint8Array = root.Uint8Array,
	    getPrototype = overArg(Object.getPrototypeOf, Object),
	    objectCreate = Object.create,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable,
	    splice = arrayProto.splice;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols,
	    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
	    nativeKeys = overArg(Object.keys, Object);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView'),
	    Map = getNative(root, 'Map'),
	    Promise = getNative(root, 'Promise'),
	    Set = getNative(root, 'Set'),
	    WeakMap = getNative(root, 'WeakMap'),
	    nativeCreate = getNative(Object, 'create');

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  this.__data__ = new ListCache(entries);
	}

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	}

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  return this.__data__['delete'](key);
	}

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var cache = this.__data__;
	  if (cache instanceof ListCache) {
	    var pairs = cache.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      return this;
	    }
	    cache = this.__data__ = new MapCache(pairs);
	  }
	  cache.set(key, value);
	  return this;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];

	  var length = result.length,
	      skipIndexes = !!length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {boolean} [isFull] Specify a clone including symbols.
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      if (isHostObject(value)) {
	        return object ? value : {};
	      }
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, baseClone, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  if (!isArr) {
	    var props = isFull ? getAllKeys(value) : keys(value);
	  }
	  arrayEach(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
	  });
	  return result;
	}

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	function baseCreate(proto) {
	  return isObject(proto) ? objectCreate(proto) : {};
	}

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var result = new buffer.constructor(buffer.length);
	  buffer.copy(result);
	  return result;
	}

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
	  return arrayReduce(array, addMapEntry, new map.constructor);
	}

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
	  return arrayReduce(array, addSetEntry, new set.constructor);
	}

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    assignValue(object, key, newValue === undefined ? source[key] : newValue);
	  }
	  return object;
	}

	/**
	 * Copies own symbol properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	/**
	 * Creates an array of the own enumerable symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge < 14, and promises in Node.js.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, cloneFunc, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case dataViewTag:
	      return cloneDataView(object, isDeep);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);

	    case mapTag:
	      return cloneMap(object, isDeep, cloneFunc);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      return cloneRegExp(object);

	    case setTag:
	      return cloneSet(object, isDeep, cloneFunc);

	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @see _.clone
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return baseClone(value, true, true);
	}

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = cloneDeep;
	}(lodash_clonedeep, lodash_clonedeep.exports));

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER$1 = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag$1 = '[object Function]',
	    genTag$1 = '[object GeneratorFunction]';

	/** Used to detect unsigned integer values. */
	var reIsUint$1 = /^(?:0|[1-9]\d*)$/;

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply$1(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	/** Used for built-in method references. */
	var objectProto$2 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString$2 = objectProto$2.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax$2 = Math.max;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];

	  var length = result.length,
	      skipIndexes = !!length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty$1.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex$1(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Used by `_.defaults` to customize its `_.assignIn` use.
	 *
	 * @private
	 * @param {*} objValue The destination value.
	 * @param {*} srcValue The source value.
	 * @param {string} key The key of the property to assign.
	 * @param {Object} object The parent object of `objValue`.
	 * @returns {*} Returns the value to assign.
	 */
	function assignInDefaults(objValue, srcValue, key, object) {
	  if (objValue === undefined ||
	      (eq(objValue, objectProto$2[key]) && !hasOwnProperty$1.call(object, key))) {
	    return srcValue;
	  }
	  return objValue;
	}

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty$1.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject$2(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty$1.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  start = nativeMax$2(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax$2(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply$1(func, this, otherArgs);
	  };
	}

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    assignValue(object, key, newValue === undefined ? source[key] : newValue);
	  }
	  return object;
	}

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex$1(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER$1 : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint$1.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject$2(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex$1(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$2;

	  return value === proto;
	}

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty$1.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString$2.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction$1(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike$2(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction$1(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject$2(value) ? objectToString$2.call(value) : '';
	  return tag == funcTag$1 || tag == genTag$1;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject$2(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike$2(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * This method is like `_.assignIn` except that it accepts `customizer`
	 * which is invoked to produce the assigned values. If `customizer` returns
	 * `undefined`, assignment is handled by the method instead. The `customizer`
	 * is invoked with five arguments: (objValue, srcValue, key, object, source).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias extendWith
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @see _.assignWith
	 * @example
	 *
	 * function customizer(objValue, srcValue) {
	 *   return _.isUndefined(objValue) ? srcValue : objValue;
	 * }
	 *
	 * var defaults = _.partialRight(_.assignInWith, customizer);
	 *
	 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	 * // => { 'a': 1, 'b': 2 }
	 */
	var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
	  copyObject(source, keysIn(source), object, customizer);
	});

	/**
	 * Assigns own and inherited enumerable string keyed properties of source
	 * objects to the destination object for all destination properties that
	 * resolve to `undefined`. Source objects are applied from left to right.
	 * Once a property is set, additional values of the same property are ignored.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.defaultsDeep
	 * @example
	 *
	 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	 * // => { 'a': 1, 'b': 2 }
	 */
	var defaults$1 = baseRest(function(args) {
	  args.push(undefined, assignInDefaults);
	  return apply$1(assignInWith, undefined, args);
	});

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	var lodash_defaults = defaults$1;

	var qs = lib;
	var cloneDeep$1 = lodash_clonedeep.exports;
	var defaults = lodash_defaults;

	// Gets, sets, syncs route state. Does not actually execute app flows based on route changes.
	// That's followRoute's job.

	function RouteState$1({ followRoute, windowObject, propsToCoerceToBool }) {
	  var ephemeralDict = {}; // This is the stuff that won't get synced to the hash.
	  if (!propsToCoerceToBool) {
	    propsToCoerceToBool = [];
	  }

	  windowObject.onhashchange = routeFromHash;

	  return {
	    addToRoute,
	    removeFromRoute,
	    updateEphemeralState,
	    overwriteRouteEntirely,
	    routeFromHash,
	    unpackEncodedRoute,
	    getRouteFromHash
	  };

	  function routeFromHash() {
	    followRoute(getRouteFromHash(), ephemeralDict);
	  }

	  function getRouteFromHash() {
	    // Skip the # part of the hash.
	    var dict = qs.parse(windowObject.location.hash.slice(1));
	    for (var i = 0; i < propsToCoerceToBool.length; ++i) {
	      const prop = propsToCoerceToBool[i];
	      let val = dict[prop];
	      if (val === 'yes') {
	        val = true;
	      } else if (val == 'no') {
	        val = false;
	      } else {
	        val = val ? true : false;
	      }
	      dict[prop] = val;
	    }
	    return dict;
	  }

	  function addToRoute(updateDict, shouldFollowNewRoute = true) {
	    var routeDict = defaults(cloneDeep$1(updateDict), getRouteFromHash());
	    syncHashToRoute(routeDict);
	    if (shouldFollowNewRoute) {
	      followRoute(routeDict, ephemeralDict);
	    }
	  }

	  function removeFromRoute(key, shouldFollowNewRoute = true) {
	    var routeDict = getRouteFromHash();
	    delete routeDict[key];
	    syncHashToRoute(routeDict);
	    if (shouldFollowNewRoute) {
	      followRoute(routeDict, ephemeralDict);
	    }
	  }

	  function updateEphemeralState(updateDict, shouldFollowNewRoute = true) {
	    for (var key in updateDict) {
	      ephemeralDict[key] = updateDict[key];
	    }

	    if (shouldFollowNewRoute) {
	      followRoute(getRouteFromHash(), ephemeralDict);
	    }
	  }

	  function overwriteRouteEntirely(newDict) {
	    syncHashToRoute(newDict);
	    followRoute(newDict, ephemeralDict);
	  }

	  function syncHashToRoute(routeDict) {
	    var dictCopy = cloneDeep$1(routeDict);
	    for (var i = 0; i < propsToCoerceToBool.length; ++i) {
	      const prop = propsToCoerceToBool[i];
	      let val = dictCopy[prop];
	      if (val) {
	        val = 'yes';
	      } else {
	        val = 'no';
	      }
	      dictCopy[prop] = val;
	    }
	    var updatedURL =
	      windowObject.location.protocol +
	      '//' +
	      windowObject.location.host +
	      windowObject.location.pathname +
	      '#' +
	      qs.stringify(dictCopy);
	    // Sync URL without triggering onhashchange.
	    windowObject.history.pushState(null, null, updatedURL);
	  }

	  function unpackEncodedRoute(encodedStateFromRedirect) {
	    var routeDict = qs.parse(decodeURIComponent(encodedStateFromRedirect));
	    syncHashToRoute(routeDict);
	    followRoute(routeDict, ephemeralDict);
	  }
	}

	var routeState$1 = RouteState$1;

	var xhtml = "http://www.w3.org/1999/xhtml";

	var namespaces = {
	  svg: "http://www.w3.org/2000/svg",
	  xhtml: xhtml,
	  xlink: "http://www.w3.org/1999/xlink",
	  xml: "http://www.w3.org/XML/1998/namespace",
	  xmlns: "http://www.w3.org/2000/xmlns/"
	};

	function namespace(name) {
	  var prefix = name += "", i = prefix.indexOf(":");
	  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
	  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
	}

	function creatorInherit(name) {
	  return function() {
	    var document = this.ownerDocument,
	        uri = this.namespaceURI;
	    return uri === xhtml && document.documentElement.namespaceURI === xhtml
	        ? document.createElement(name)
	        : document.createElementNS(uri, name);
	  };
	}

	function creatorFixed(fullname) {
	  return function() {
	    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
	  };
	}

	function creator(name) {
	  var fullname = namespace(name);
	  return (fullname.local
	      ? creatorFixed
	      : creatorInherit)(fullname);
	}

	function none() {}

	function selector(selector) {
	  return selector == null ? none : function() {
	    return this.querySelector(selector);
	  };
	}

	function selection_select(select) {
	  if (typeof select !== "function") select = selector(select);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	      }
	    }
	  }

	  return new Selection$1(subgroups, this._parents);
	}

	function empty$1() {
	  return [];
	}

	function selectorAll(selector) {
	  return selector == null ? empty$1 : function() {
	    return this.querySelectorAll(selector);
	  };
	}

	function selection_selectAll(select) {
	  if (typeof select !== "function") select = selectorAll(select);

	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        subgroups.push(select.call(node, node.__data__, i, group));
	        parents.push(node);
	      }
	    }
	  }

	  return new Selection$1(subgroups, parents);
	}

	function matcher(selector) {
	  return function() {
	    return this.matches(selector);
	  };
	}

	function selection_filter(match) {
	  if (typeof match !== "function") match = matcher(match);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup.push(node);
	      }
	    }
	  }

	  return new Selection$1(subgroups, this._parents);
	}

	function sparse(update) {
	  return new Array(update.length);
	}

	function selection_enter() {
	  return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
	}

	function EnterNode(parent, datum) {
	  this.ownerDocument = parent.ownerDocument;
	  this.namespaceURI = parent.namespaceURI;
	  this._next = null;
	  this._parent = parent;
	  this.__data__ = datum;
	}

	EnterNode.prototype = {
	  constructor: EnterNode,
	  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
	  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
	  querySelector: function(selector) { return this._parent.querySelector(selector); },
	  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
	};

	function constant$4(x) {
	  return function() {
	    return x;
	  };
	}

	var keyPrefix = "$"; // Protect against keys like “__proto__”.

	function bindIndex(parent, group, enter, update, exit, data) {
	  var i = 0,
	      node,
	      groupLength = group.length,
	      dataLength = data.length;

	  // Put any non-null nodes that fit into update.
	  // Put any null nodes into enter.
	  // Put any remaining data into enter.
	  for (; i < dataLength; ++i) {
	    if (node = group[i]) {
	      node.__data__ = data[i];
	      update[i] = node;
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }

	  // Put any non-null nodes that don’t fit into exit.
	  for (; i < groupLength; ++i) {
	    if (node = group[i]) {
	      exit[i] = node;
	    }
	  }
	}

	function bindKey(parent, group, enter, update, exit, data, key) {
	  var i,
	      node,
	      nodeByKeyValue = {},
	      groupLength = group.length,
	      dataLength = data.length,
	      keyValues = new Array(groupLength),
	      keyValue;

	  // Compute the key for each node.
	  // If multiple nodes have the same key, the duplicates are added to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if (node = group[i]) {
	      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
	      if (keyValue in nodeByKeyValue) {
	        exit[i] = node;
	      } else {
	        nodeByKeyValue[keyValue] = node;
	      }
	    }
	  }

	  // Compute the key for each datum.
	  // If there a node associated with this key, join and add it to update.
	  // If there is not (or the key is a duplicate), add it to enter.
	  for (i = 0; i < dataLength; ++i) {
	    keyValue = keyPrefix + key.call(parent, data[i], i, data);
	    if (node = nodeByKeyValue[keyValue]) {
	      update[i] = node;
	      node.__data__ = data[i];
	      nodeByKeyValue[keyValue] = null;
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }

	  // Add any remaining nodes that were not bound to data to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
	      exit[i] = node;
	    }
	  }
	}

	function selection_data(value, key) {
	  if (!value) {
	    data = new Array(this.size()), j = -1;
	    this.each(function(d) { data[++j] = d; });
	    return data;
	  }

	  var bind = key ? bindKey : bindIndex,
	      parents = this._parents,
	      groups = this._groups;

	  if (typeof value !== "function") value = constant$4(value);

	  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
	    var parent = parents[j],
	        group = groups[j],
	        groupLength = group.length,
	        data = value.call(parent, parent && parent.__data__, j, parents),
	        dataLength = data.length,
	        enterGroup = enter[j] = new Array(dataLength),
	        updateGroup = update[j] = new Array(dataLength),
	        exitGroup = exit[j] = new Array(groupLength);

	    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

	    // Now connect the enter nodes to their following update node, such that
	    // appendChild can insert the materialized enter node before this node,
	    // rather than at the end of the parent node.
	    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
	      if (previous = enterGroup[i0]) {
	        if (i0 >= i1) i1 = i0 + 1;
	        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
	        previous._next = next || null;
	      }
	    }
	  }

	  update = new Selection$1(update, parents);
	  update._enter = enter;
	  update._exit = exit;
	  return update;
	}

	function selection_exit() {
	  return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
	}

	function selection_join(onenter, onupdate, onexit) {
	  var enter = this.enter(), update = this, exit = this.exit();
	  enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
	  if (onupdate != null) update = onupdate(update);
	  if (onexit == null) exit.remove(); else onexit(exit);
	  return enter && update ? enter.merge(update).order() : update;
	}

	function selection_merge(selection) {

	  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group0[i] || group1[i]) {
	        merge[i] = node;
	      }
	    }
	  }

	  for (; j < m0; ++j) {
	    merges[j] = groups0[j];
	  }

	  return new Selection$1(merges, this._parents);
	}

	function selection_order() {

	  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
	    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
	      if (node = group[i]) {
	        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
	        next = node;
	      }
	    }
	  }

	  return this;
	}

	function selection_sort(compare) {
	  if (!compare) compare = ascending$1;

	  function compareNode(a, b) {
	    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
	  }

	  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        sortgroup[i] = node;
	      }
	    }
	    sortgroup.sort(compareNode);
	  }

	  return new Selection$1(sortgroups, this._parents).order();
	}

	function ascending$1(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	}

	function selection_call() {
	  var callback = arguments[0];
	  arguments[0] = this;
	  callback.apply(null, arguments);
	  return this;
	}

	function selection_nodes() {
	  var nodes = new Array(this.size()), i = -1;
	  this.each(function() { nodes[++i] = this; });
	  return nodes;
	}

	function selection_node() {

	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
	      var node = group[i];
	      if (node) return node;
	    }
	  }

	  return null;
	}

	function selection_size() {
	  var size = 0;
	  this.each(function() { ++size; });
	  return size;
	}

	function selection_empty() {
	  return !this.node();
	}

	function selection_each(callback) {

	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
	      if (node = group[i]) callback.call(node, node.__data__, i, group);
	    }
	  }

	  return this;
	}

	function attrRemove$1(name) {
	  return function() {
	    this.removeAttribute(name);
	  };
	}

	function attrRemoveNS$1(fullname) {
	  return function() {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}

	function attrConstant$1(name, value) {
	  return function() {
	    this.setAttribute(name, value);
	  };
	}

	function attrConstantNS$1(fullname, value) {
	  return function() {
	    this.setAttributeNS(fullname.space, fullname.local, value);
	  };
	}

	function attrFunction$1(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttribute(name);
	    else this.setAttribute(name, v);
	  };
	}

	function attrFunctionNS$1(fullname, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
	    else this.setAttributeNS(fullname.space, fullname.local, v);
	  };
	}

	function selection_attr(name, value) {
	  var fullname = namespace(name);

	  if (arguments.length < 2) {
	    var node = this.node();
	    return fullname.local
	        ? node.getAttributeNS(fullname.space, fullname.local)
	        : node.getAttribute(fullname);
	  }

	  return this.each((value == null
	      ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
	      ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
	      : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
	}

	function defaultView(node) {
	  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
	      || (node.document && node) // node is a Window
	      || node.defaultView; // node is a Document
	}

	function styleRemove$1(name) {
	  return function() {
	    this.style.removeProperty(name);
	  };
	}

	function styleConstant$1(name, value, priority) {
	  return function() {
	    this.style.setProperty(name, value, priority);
	  };
	}

	function styleFunction$1(name, value, priority) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.style.removeProperty(name);
	    else this.style.setProperty(name, v, priority);
	  };
	}

	function selection_style(name, value, priority) {
	  return arguments.length > 1
	      ? this.each((value == null
	            ? styleRemove$1 : typeof value === "function"
	            ? styleFunction$1
	            : styleConstant$1)(name, value, priority == null ? "" : priority))
	      : styleValue(this.node(), name);
	}

	function styleValue(node, name) {
	  return node.style.getPropertyValue(name)
	      || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
	}

	function propertyRemove(name) {
	  return function() {
	    delete this[name];
	  };
	}

	function propertyConstant(name, value) {
	  return function() {
	    this[name] = value;
	  };
	}

	function propertyFunction(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) delete this[name];
	    else this[name] = v;
	  };
	}

	function selection_property(name, value) {
	  return arguments.length > 1
	      ? this.each((value == null
	          ? propertyRemove : typeof value === "function"
	          ? propertyFunction
	          : propertyConstant)(name, value))
	      : this.node()[name];
	}

	function classArray(string) {
	  return string.trim().split(/^|\s+/);
	}

	function classList(node) {
	  return node.classList || new ClassList(node);
	}

	function ClassList(node) {
	  this._node = node;
	  this._names = classArray(node.getAttribute("class") || "");
	}

	ClassList.prototype = {
	  add: function(name) {
	    var i = this._names.indexOf(name);
	    if (i < 0) {
	      this._names.push(name);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  remove: function(name) {
	    var i = this._names.indexOf(name);
	    if (i >= 0) {
	      this._names.splice(i, 1);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  contains: function(name) {
	    return this._names.indexOf(name) >= 0;
	  }
	};

	function classedAdd(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) list.add(names[i]);
	}

	function classedRemove(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) list.remove(names[i]);
	}

	function classedTrue(names) {
	  return function() {
	    classedAdd(this, names);
	  };
	}

	function classedFalse(names) {
	  return function() {
	    classedRemove(this, names);
	  };
	}

	function classedFunction(names, value) {
	  return function() {
	    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
	  };
	}

	function selection_classed(name, value) {
	  var names = classArray(name + "");

	  if (arguments.length < 2) {
	    var list = classList(this.node()), i = -1, n = names.length;
	    while (++i < n) if (!list.contains(names[i])) return false;
	    return true;
	  }

	  return this.each((typeof value === "function"
	      ? classedFunction : value
	      ? classedTrue
	      : classedFalse)(names, value));
	}

	function textRemove() {
	  this.textContent = "";
	}

	function textConstant$1(value) {
	  return function() {
	    this.textContent = value;
	  };
	}

	function textFunction$1(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.textContent = v == null ? "" : v;
	  };
	}

	function selection_text(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? textRemove : (typeof value === "function"
	          ? textFunction$1
	          : textConstant$1)(value))
	      : this.node().textContent;
	}

	function htmlRemove() {
	  this.innerHTML = "";
	}

	function htmlConstant(value) {
	  return function() {
	    this.innerHTML = value;
	  };
	}

	function htmlFunction(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.innerHTML = v == null ? "" : v;
	  };
	}

	function selection_html(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? htmlRemove : (typeof value === "function"
	          ? htmlFunction
	          : htmlConstant)(value))
	      : this.node().innerHTML;
	}

	function raise() {
	  if (this.nextSibling) this.parentNode.appendChild(this);
	}

	function selection_raise() {
	  return this.each(raise);
	}

	function lower() {
	  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
	}

	function selection_lower() {
	  return this.each(lower);
	}

	function selection_append(name) {
	  var create = typeof name === "function" ? name : creator(name);
	  return this.select(function() {
	    return this.appendChild(create.apply(this, arguments));
	  });
	}

	function constantNull() {
	  return null;
	}

	function selection_insert(name, before) {
	  var create = typeof name === "function" ? name : creator(name),
	      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
	  return this.select(function() {
	    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
	  });
	}

	function remove() {
	  var parent = this.parentNode;
	  if (parent) parent.removeChild(this);
	}

	function selection_remove() {
	  return this.each(remove);
	}

	function selection_cloneShallow() {
	  return this.parentNode.insertBefore(this.cloneNode(false), this.nextSibling);
	}

	function selection_cloneDeep() {
	  return this.parentNode.insertBefore(this.cloneNode(true), this.nextSibling);
	}

	function selection_clone(deep) {
	  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
	}

	function selection_datum(value) {
	  return arguments.length
	      ? this.property("__data__", value)
	      : this.node().__data__;
	}

	var filterEvents = {};

	var event = null;

	if (typeof document !== "undefined") {
	  var element = document.documentElement;
	  if (!("onmouseenter" in element)) {
	    filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
	  }
	}

	function filterContextListener(listener, index, group) {
	  listener = contextListener(listener, index, group);
	  return function(event) {
	    var related = event.relatedTarget;
	    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
	      listener.call(this, event);
	    }
	  };
	}

	function contextListener(listener, index, group) {
	  return function(event1) {
	    var event0 = event; // Events can be reentrant (e.g., focus).
	    event = event1;
	    try {
	      listener.call(this, this.__data__, index, group);
	    } finally {
	      event = event0;
	    }
	  };
	}

	function parseTypenames$1(typenames) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    return {type: t, name: name};
	  });
	}

	function onRemove(typename) {
	  return function() {
	    var on = this.__on;
	    if (!on) return;
	    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
	      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	      } else {
	        on[++i] = o;
	      }
	    }
	    if (++i) on.length = i;
	    else delete this.__on;
	  };
	}

	function onAdd(typename, value, capture) {
	  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
	  return function(d, i, group) {
	    var on = this.__on, o, listener = wrap(value, i, group);
	    if (on) for (var j = 0, m = on.length; j < m; ++j) {
	      if ((o = on[j]).type === typename.type && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
	        o.value = value;
	        return;
	      }
	    }
	    this.addEventListener(typename.type, listener, capture);
	    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
	    if (!on) this.__on = [o];
	    else on.push(o);
	  };
	}

	function selection_on(typename, value, capture) {
	  var typenames = parseTypenames$1(typename + ""), i, n = typenames.length, t;

	  if (arguments.length < 2) {
	    var on = this.node().__on;
	    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
	      for (i = 0, o = on[j]; i < n; ++i) {
	        if ((t = typenames[i]).type === o.type && t.name === o.name) {
	          return o.value;
	        }
	      }
	    }
	    return;
	  }

	  on = value ? onAdd : onRemove;
	  if (capture == null) capture = false;
	  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
	  return this;
	}

	function customEvent(event1, listener, that, args) {
	  var event0 = event;
	  event1.sourceEvent = event;
	  event = event1;
	  try {
	    return listener.apply(that, args);
	  } finally {
	    event = event0;
	  }
	}

	function dispatchEvent(node, type, params) {
	  var window = defaultView(node),
	      event = window.CustomEvent;

	  if (typeof event === "function") {
	    event = new event(type, params);
	  } else {
	    event = window.document.createEvent("Event");
	    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
	    else event.initEvent(type, false, false);
	  }

	  node.dispatchEvent(event);
	}

	function dispatchConstant(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params);
	  };
	}

	function dispatchFunction(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params.apply(this, arguments));
	  };
	}

	function selection_dispatch(type, params) {
	  return this.each((typeof params === "function"
	      ? dispatchFunction
	      : dispatchConstant)(type, params));
	}

	var root$2 = [null];

	function Selection$1(groups, parents) {
	  this._groups = groups;
	  this._parents = parents;
	}

	function selection() {
	  return new Selection$1([[document.documentElement]], root$2);
	}

	Selection$1.prototype = selection.prototype = {
	  constructor: Selection$1,
	  select: selection_select,
	  selectAll: selection_selectAll,
	  filter: selection_filter,
	  data: selection_data,
	  enter: selection_enter,
	  exit: selection_exit,
	  join: selection_join,
	  merge: selection_merge,
	  order: selection_order,
	  sort: selection_sort,
	  call: selection_call,
	  nodes: selection_nodes,
	  node: selection_node,
	  size: selection_size,
	  empty: selection_empty,
	  each: selection_each,
	  attr: selection_attr,
	  style: selection_style,
	  property: selection_property,
	  classed: selection_classed,
	  text: selection_text,
	  html: selection_html,
	  raise: selection_raise,
	  lower: selection_lower,
	  append: selection_append,
	  insert: selection_insert,
	  remove: selection_remove,
	  clone: selection_clone,
	  datum: selection_datum,
	  on: selection_on,
	  dispatch: selection_dispatch
	};

	function select$3(selector) {
	  return typeof selector === "string"
	      ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
	      : new Selection$1([[selector]], root$2);
	}

	function create$1(name) {
	  return select$3(creator(name).call(document.documentElement));
	}

	var nextId = 0;

	function local() {
	  return new Local;
	}

	function Local() {
	  this._ = "@" + (++nextId).toString(36);
	}

	Local.prototype = local.prototype = {
	  constructor: Local,
	  get: function(node) {
	    var id = this._;
	    while (!(id in node)) if (!(node = node.parentNode)) return;
	    return node[id];
	  },
	  set: function(node, value) {
	    return node[this._] = value;
	  },
	  remove: function(node) {
	    return this._ in node && delete node[this._];
	  },
	  toString: function() {
	    return this._;
	  }
	};

	function sourceEvent() {
	  var current = event, source;
	  while (source = current.sourceEvent) current = source;
	  return current;
	}

	function point(node, event) {
	  var svg = node.ownerSVGElement || node;

	  if (svg.createSVGPoint) {
	    var point = svg.createSVGPoint();
	    point.x = event.clientX, point.y = event.clientY;
	    point = point.matrixTransform(node.getScreenCTM().inverse());
	    return [point.x, point.y];
	  }

	  var rect = node.getBoundingClientRect();
	  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
	}

	function mouse(node) {
	  var event = sourceEvent();
	  if (event.changedTouches) event = event.changedTouches[0];
	  return point(node, event);
	}

	function selectAll(selector) {
	  return typeof selector === "string"
	      ? new Selection$1([document.querySelectorAll(selector)], [document.documentElement])
	      : new Selection$1([selector == null ? [] : selector], root$2);
	}

	function touch(node, touches, identifier) {
	  if (arguments.length < 3) identifier = touches, touches = sourceEvent().changedTouches;

	  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
	    if ((touch = touches[i]).identifier === identifier) {
	      return point(node, touch);
	    }
	  }

	  return null;
	}

	function touches(node, touches) {
	  if (touches == null) touches = sourceEvent().touches;

	  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
	    points[i] = point(node, touches[i]);
	  }

	  return points;
	}

	var src$2 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		create: create$1,
		creator: creator,
		local: local,
		matcher: matcher,
		mouse: mouse,
		namespace: namespace,
		namespaces: namespaces,
		clientPoint: point,
		select: select$3,
		selectAll: selectAll,
		selection: selection,
		selector: selector,
		selectorAll: selectorAll,
		style: styleValue,
		touch: touch,
		touches: touches,
		window: defaultView,
		get event () { return event; },
		customEvent: customEvent
	});

	var require$$1$2 = /*@__PURE__*/getAugmentedNamespace(src$2);

	function OneListenerPerElement() {
	  var oldListeners = {};

	  return {
	    setListener,
	    on
	  };

	  // Makes sure there is one listener per element-event combination.
	  // Depends on elements with ids and listener functions with names.
	  function setListener({ eventName, listener, element }) {
	    const listenerKey = `${element.id}|${eventName}`;
	    var oldListener = oldListeners[listenerKey];
	    if (oldListener) {
	      element.removeEventListener(eventName, oldListener);
	    }
	    element.addEventListener(eventName, listener);
	    oldListeners[listenerKey] = listener;
	  }

	  // Shorthand for setListener
	  function on(selector, eventName, listener) {
	    setListener({ eventName, listener, element: document.querySelector(selector) });
	  }
	}

	var oneListenerPerElement = OneListenerPerElement;

	var { select: select$2 } = require$$1$2;

	var OLPE$1 = oneListenerPerElement;
	var startContainerSel = select$2('#start-container');

	var { on: on$1 } = OLPE$1();

	function wireControls$1({ onStart }) {
	  on$1('#start-button', 'click', onStartClick);

	  function onStartClick() {
	    startContainerSel.classed('hidden', true);
	    onStart();
	  }
	}

	var wireControls_1 = wireControls$1;

	const timeNeededForEnvelopeDecay$1 = 2;
	const envelopePeakRate = 0.01;
	const envelopeDecayRate = 0.99;
	const vibratoRateFreq = 165;
	const vibratoPitchVariance = 10;
	const durationSeconds = 1.0;

	function playTickSynth$1({
	  ticksTicked,
	  riff,
	  pan,
	  ctx,
	  delaySeconds = 0,
	  vibratoOn,
	  sampleDownloader,
	}) {
	  if (!sampleDownloader.downloadStatus.samplesDownloaded) {
	    console.error(new Error('Samples not downloaded yet!'));
	    return;
	  }

	  const riffIndex = ticksTicked % riff.length;
	  const note = riff[riffIndex];
	  //console.log('midVol', note.midVol);

	  var buffer = sampleDownloader.downloadStatus.sampleBuffers[note.pitchIndex];

	  var player = ctx.createBufferSource();
	  player.buffer = buffer;

	  var vibrato;
	  if (vibratoOn) {
	    vibrato = getVibrato({
	      rateFreq: vibratoRateFreq,
	      pitchVariance: vibratoPitchVariance,
	      ctx,
	    });
	  }

	  var envelope = ctx.createGain();

	  var panner = ctx.createStereoPanner();
	  panner.pan.value = pan;

	  if (vibratoOn) {
	    vibrato.amp.connect(player.detune);
	  }
	  player.connect(envelope);
	  envelope.connect(panner);
	  panner.connect(ctx.destination);

	  const startTime = ctx.currentTime + delaySeconds;
	  const stopTime = startTime + durationSeconds;
	  envelope.gain.value = note.startVol;
	  envelope.gain.setTargetAtTime(note.midVol, startTime, envelopePeakRate);
	  envelope.gain.setTargetAtTime(0, stopTime, envelopeDecayRate);
	  player.start(startTime);
	  player.stop(stopTime + timeNeededForEnvelopeDecay$1);
	  if (vibratoOn) {
	    vibrato.generator.start(startTime);
	    vibrato.generator.stop(stopTime + timeNeededForEnvelopeDecay$1);
	  }
	}

	function getVibrato({ rateFreq, pitchVariance, ctx }) {
	  var generator = ctx.createOscillator();
	  generator.frequency.value = rateFreq;
	  var amp = ctx.createGain();
	  amp.gain.value = pitchVariance;
	  generator.connect(amp);
	  return { generator, amp };
	}

	var tickSynth = playTickSynth$1;

	var alea$1 = {exports: {}};

	(function (module) {
	// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
	// http://baagoe.com/en/RandomMusings/javascript/
	// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
	// Original work is under MIT license -

	// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	// THE SOFTWARE.



	(function(global, module, define) {

	function Alea(seed) {
	  var me = this, mash = Mash();

	  me.next = function() {
	    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
	    me.s0 = me.s1;
	    me.s1 = me.s2;
	    return me.s2 = t - (me.c = t | 0);
	  };

	  // Apply the seeding algorithm from Baagoe.
	  me.c = 1;
	  me.s0 = mash(' ');
	  me.s1 = mash(' ');
	  me.s2 = mash(' ');
	  me.s0 -= mash(seed);
	  if (me.s0 < 0) { me.s0 += 1; }
	  me.s1 -= mash(seed);
	  if (me.s1 < 0) { me.s1 += 1; }
	  me.s2 -= mash(seed);
	  if (me.s2 < 0) { me.s2 += 1; }
	  mash = null;
	}

	function copy(f, t) {
	  t.c = f.c;
	  t.s0 = f.s0;
	  t.s1 = f.s1;
	  t.s2 = f.s2;
	  return t;
	}

	function impl(seed, opts) {
	  var xg = new Alea(seed),
	      state = opts && opts.state,
	      prng = xg.next;
	  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; };
	  prng.double = function() {
	    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
	  };
	  prng.quick = prng;
	  if (state) {
	    if (typeof(state) == 'object') copy(state, xg);
	    prng.state = function() { return copy(xg, {}); };
	  }
	  return prng;
	}

	function Mash() {
	  var n = 0xefc8249d;

	  var mash = function(data) {
	    data = String(data);
	    for (var i = 0; i < data.length; i++) {
	      n += data.charCodeAt(i);
	      var h = 0.02519603282416938 * n;
	      n = h >>> 0;
	      h -= n;
	      h *= n;
	      n = h >>> 0;
	      h -= n;
	      n += h * 0x100000000; // 2^32
	    }
	    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
	  };

	  return mash;
	}


	if (module && module.exports) {
	  module.exports = impl;
	} else if (define && define.amd) {
	  define(function() { return impl; });
	} else {
	  this.alea = impl;
	}

	})(
	  commonjsGlobal,
	  module,    // present in node.js
	  (typeof undefined) == 'function'    // present with an AMD loader
	);
	}(alea$1));

	var xor128$1 = {exports: {}};

	(function (module) {
	// A Javascript implementaion of the "xor128" prng algorithm by
	// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

	(function(global, module, define) {

	function XorGen(seed) {
	  var me = this, strseed = '';

	  me.x = 0;
	  me.y = 0;
	  me.z = 0;
	  me.w = 0;

	  // Set up generator function.
	  me.next = function() {
	    var t = me.x ^ (me.x << 11);
	    me.x = me.y;
	    me.y = me.z;
	    me.z = me.w;
	    return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
	  };

	  if (seed === (seed | 0)) {
	    // Integer seed.
	    me.x = seed;
	  } else {
	    // String seed.
	    strseed += seed;
	  }

	  // Mix in string seed, then discard an initial batch of 64 values.
	  for (var k = 0; k < strseed.length + 64; k++) {
	    me.x ^= strseed.charCodeAt(k) | 0;
	    me.next();
	  }
	}

	function copy(f, t) {
	  t.x = f.x;
	  t.y = f.y;
	  t.z = f.z;
	  t.w = f.w;
	  return t;
	}

	function impl(seed, opts) {
	  var xg = new XorGen(seed),
	      state = opts && opts.state,
	      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
	  prng.double = function() {
	    do {
	      var top = xg.next() >>> 11,
	          bot = (xg.next() >>> 0) / 0x100000000,
	          result = (top + bot) / (1 << 21);
	    } while (result === 0);
	    return result;
	  };
	  prng.int32 = xg.next;
	  prng.quick = prng;
	  if (state) {
	    if (typeof(state) == 'object') copy(state, xg);
	    prng.state = function() { return copy(xg, {}); };
	  }
	  return prng;
	}

	if (module && module.exports) {
	  module.exports = impl;
	} else if (define && define.amd) {
	  define(function() { return impl; });
	} else {
	  this.xor128 = impl;
	}

	})(
	  commonjsGlobal,
	  module,    // present in node.js
	  (typeof undefined) == 'function'    // present with an AMD loader
	);
	}(xor128$1));

	var xorwow$1 = {exports: {}};

	(function (module) {
	// A Javascript implementaion of the "xorwow" prng algorithm by
	// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

	(function(global, module, define) {

	function XorGen(seed) {
	  var me = this, strseed = '';

	  // Set up generator function.
	  me.next = function() {
	    var t = (me.x ^ (me.x >>> 2));
	    me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
	    return (me.d = (me.d + 362437 | 0)) +
	       (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
	  };

	  me.x = 0;
	  me.y = 0;
	  me.z = 0;
	  me.w = 0;
	  me.v = 0;

	  if (seed === (seed | 0)) {
	    // Integer seed.
	    me.x = seed;
	  } else {
	    // String seed.
	    strseed += seed;
	  }

	  // Mix in string seed, then discard an initial batch of 64 values.
	  for (var k = 0; k < strseed.length + 64; k++) {
	    me.x ^= strseed.charCodeAt(k) | 0;
	    if (k == strseed.length) {
	      me.d = me.x << 10 ^ me.x >>> 4;
	    }
	    me.next();
	  }
	}

	function copy(f, t) {
	  t.x = f.x;
	  t.y = f.y;
	  t.z = f.z;
	  t.w = f.w;
	  t.v = f.v;
	  t.d = f.d;
	  return t;
	}

	function impl(seed, opts) {
	  var xg = new XorGen(seed),
	      state = opts && opts.state,
	      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
	  prng.double = function() {
	    do {
	      var top = xg.next() >>> 11,
	          bot = (xg.next() >>> 0) / 0x100000000,
	          result = (top + bot) / (1 << 21);
	    } while (result === 0);
	    return result;
	  };
	  prng.int32 = xg.next;
	  prng.quick = prng;
	  if (state) {
	    if (typeof(state) == 'object') copy(state, xg);
	    prng.state = function() { return copy(xg, {}); };
	  }
	  return prng;
	}

	if (module && module.exports) {
	  module.exports = impl;
	} else if (define && define.amd) {
	  define(function() { return impl; });
	} else {
	  this.xorwow = impl;
	}

	})(
	  commonjsGlobal,
	  module,    // present in node.js
	  (typeof undefined) == 'function'    // present with an AMD loader
	);
	}(xorwow$1));

	var xorshift7$1 = {exports: {}};

	(function (module) {
	// A Javascript implementaion of the "xorshift7" algorithm by
	// François Panneton and Pierre L'ecuyer:
	// "On the Xorgshift Random Number Generators"
	// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

	(function(global, module, define) {

	function XorGen(seed) {
	  var me = this;

	  // Set up generator function.
	  me.next = function() {
	    // Update xor generator.
	    var X = me.x, i = me.i, t, v;
	    t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
	    t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
	    t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
	    t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
	    t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
	    X[i] = v;
	    me.i = (i + 1) & 7;
	    return v;
	  };

	  function init(me, seed) {
	    var j, X = [];

	    if (seed === (seed | 0)) {
	      // Seed state array using a 32-bit integer.
	      X[0] = seed;
	    } else {
	      // Seed state using a string.
	      seed = '' + seed;
	      for (j = 0; j < seed.length; ++j) {
	        X[j & 7] = (X[j & 7] << 15) ^
	            (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
	      }
	    }
	    // Enforce an array length of 8, not all zeroes.
	    while (X.length < 8) X.push(0);
	    for (j = 0; j < 8 && X[j] === 0; ++j);
	    if (j == 8) X[7] = -1;

	    me.x = X;
	    me.i = 0;

	    // Discard an initial 256 values.
	    for (j = 256; j > 0; --j) {
	      me.next();
	    }
	  }

	  init(me, seed);
	}

	function copy(f, t) {
	  t.x = f.x.slice();
	  t.i = f.i;
	  return t;
	}

	function impl(seed, opts) {
	  if (seed == null) seed = +(new Date);
	  var xg = new XorGen(seed),
	      state = opts && opts.state,
	      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
	  prng.double = function() {
	    do {
	      var top = xg.next() >>> 11,
	          bot = (xg.next() >>> 0) / 0x100000000,
	          result = (top + bot) / (1 << 21);
	    } while (result === 0);
	    return result;
	  };
	  prng.int32 = xg.next;
	  prng.quick = prng;
	  if (state) {
	    if (state.x) copy(state, xg);
	    prng.state = function() { return copy(xg, {}); };
	  }
	  return prng;
	}

	if (module && module.exports) {
	  module.exports = impl;
	} else if (define && define.amd) {
	  define(function() { return impl; });
	} else {
	  this.xorshift7 = impl;
	}

	})(
	  commonjsGlobal,
	  module,    // present in node.js
	  (typeof undefined) == 'function'    // present with an AMD loader
	);
	}(xorshift7$1));

	var xor4096$1 = {exports: {}};

	(function (module) {
	// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
	//
	// This fast non-cryptographic random number generator is designed for
	// use in Monte-Carlo algorithms. It combines a long-period xorshift
	// generator with a Weyl generator, and it passes all common batteries
	// of stasticial tests for randomness while consuming only a few nanoseconds
	// for each prng generated.  For background on the generator, see Brent's
	// paper: "Some long-period random number generators using shifts and xors."
	// http://arxiv.org/pdf/1004.3115v1.pdf
	//
	// Usage:
	//
	// var xor4096 = require('xor4096');
	// random = xor4096(1);                        // Seed with int32 or string.
	// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
	// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
	//
	// For nonzero numeric keys, this impelementation provides a sequence
	// identical to that by Brent's xorgens 3 implementaion in C.  This
	// implementation also provides for initalizing the generator with
	// string seeds, or for saving and restoring the state of the generator.
	//
	// On Chrome, this prng benchmarks about 2.1 times slower than
	// Javascript's built-in Math.random().

	(function(global, module, define) {

	function XorGen(seed) {
	  var me = this;

	  // Set up generator function.
	  me.next = function() {
	    var w = me.w,
	        X = me.X, i = me.i, t, v;
	    // Update Weyl generator.
	    me.w = w = (w + 0x61c88647) | 0;
	    // Update xor generator.
	    v = X[(i + 34) & 127];
	    t = X[i = ((i + 1) & 127)];
	    v ^= v << 13;
	    t ^= t << 17;
	    v ^= v >>> 15;
	    t ^= t >>> 12;
	    // Update Xor generator array state.
	    v = X[i] = v ^ t;
	    me.i = i;
	    // Result is the combination.
	    return (v + (w ^ (w >>> 16))) | 0;
	  };

	  function init(me, seed) {
	    var t, v, i, j, w, X = [], limit = 128;
	    if (seed === (seed | 0)) {
	      // Numeric seeds initialize v, which is used to generates X.
	      v = seed;
	      seed = null;
	    } else {
	      // String seeds are mixed into v and X one character at a time.
	      seed = seed + '\0';
	      v = 0;
	      limit = Math.max(limit, seed.length);
	    }
	    // Initialize circular array and weyl value.
	    for (i = 0, j = -32; j < limit; ++j) {
	      // Put the unicode characters into the array, and shuffle them.
	      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
	      // After 32 shuffles, take v as the starting w value.
	      if (j === 0) w = v;
	      v ^= v << 10;
	      v ^= v >>> 15;
	      v ^= v << 4;
	      v ^= v >>> 13;
	      if (j >= 0) {
	        w = (w + 0x61c88647) | 0;     // Weyl.
	        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
	        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
	      }
	    }
	    // We have detected all zeroes; make the key nonzero.
	    if (i >= 128) {
	      X[(seed && seed.length || 0) & 127] = -1;
	    }
	    // Run the generator 512 times to further mix the state before using it.
	    // Factoring this as a function slows the main generator, so it is just
	    // unrolled here.  The weyl generator is not advanced while warming up.
	    i = 127;
	    for (j = 4 * 128; j > 0; --j) {
	      v = X[(i + 34) & 127];
	      t = X[i = ((i + 1) & 127)];
	      v ^= v << 13;
	      t ^= t << 17;
	      v ^= v >>> 15;
	      t ^= t >>> 12;
	      X[i] = v ^ t;
	    }
	    // Storing state as object members is faster than using closure variables.
	    me.w = w;
	    me.X = X;
	    me.i = i;
	  }

	  init(me, seed);
	}

	function copy(f, t) {
	  t.i = f.i;
	  t.w = f.w;
	  t.X = f.X.slice();
	  return t;
	}
	function impl(seed, opts) {
	  if (seed == null) seed = +(new Date);
	  var xg = new XorGen(seed),
	      state = opts && opts.state,
	      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
	  prng.double = function() {
	    do {
	      var top = xg.next() >>> 11,
	          bot = (xg.next() >>> 0) / 0x100000000,
	          result = (top + bot) / (1 << 21);
	    } while (result === 0);
	    return result;
	  };
	  prng.int32 = xg.next;
	  prng.quick = prng;
	  if (state) {
	    if (state.X) copy(state, xg);
	    prng.state = function() { return copy(xg, {}); };
	  }
	  return prng;
	}

	if (module && module.exports) {
	  module.exports = impl;
	} else if (define && define.amd) {
	  define(function() { return impl; });
	} else {
	  this.xor4096 = impl;
	}

	})(
	  commonjsGlobal,                                     // window object or global
	  module,    // present in node.js
	  (typeof undefined) == 'function'    // present with an AMD loader
	);
	}(xor4096$1));

	var tychei$1 = {exports: {}};

	(function (module) {
	// A Javascript implementaion of the "Tyche-i" prng algorithm by
	// Samuel Neves and Filipe Araujo.
	// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

	(function(global, module, define) {

	function XorGen(seed) {
	  var me = this, strseed = '';

	  // Set up generator function.
	  me.next = function() {
	    var b = me.b, c = me.c, d = me.d, a = me.a;
	    b = (b << 25) ^ (b >>> 7) ^ c;
	    c = (c - d) | 0;
	    d = (d << 24) ^ (d >>> 8) ^ a;
	    a = (a - b) | 0;
	    me.b = b = (b << 20) ^ (b >>> 12) ^ c;
	    me.c = c = (c - d) | 0;
	    me.d = (d << 16) ^ (c >>> 16) ^ a;
	    return me.a = (a - b) | 0;
	  };

	  /* The following is non-inverted tyche, which has better internal
	   * bit diffusion, but which is about 25% slower than tyche-i in JS.
	  me.next = function() {
	    var a = me.a, b = me.b, c = me.c, d = me.d;
	    a = (me.a + me.b | 0) >>> 0;
	    d = me.d ^ a; d = d << 16 ^ d >>> 16;
	    c = me.c + d | 0;
	    b = me.b ^ c; b = b << 12 ^ d >>> 20;
	    me.a = a = a + b | 0;
	    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
	    me.c = c = c + d | 0;
	    b = b ^ c;
	    return me.b = (b << 7 ^ b >>> 25);
	  }
	  */

	  me.a = 0;
	  me.b = 0;
	  me.c = 2654435769 | 0;
	  me.d = 1367130551;

	  if (seed === Math.floor(seed)) {
	    // Integer seed.
	    me.a = (seed / 0x100000000) | 0;
	    me.b = seed | 0;
	  } else {
	    // String seed.
	    strseed += seed;
	  }

	  // Mix in string seed, then discard an initial batch of 64 values.
	  for (var k = 0; k < strseed.length + 20; k++) {
	    me.b ^= strseed.charCodeAt(k) | 0;
	    me.next();
	  }
	}

	function copy(f, t) {
	  t.a = f.a;
	  t.b = f.b;
	  t.c = f.c;
	  t.d = f.d;
	  return t;
	}
	function impl(seed, opts) {
	  var xg = new XorGen(seed),
	      state = opts && opts.state,
	      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
	  prng.double = function() {
	    do {
	      var top = xg.next() >>> 11,
	          bot = (xg.next() >>> 0) / 0x100000000,
	          result = (top + bot) / (1 << 21);
	    } while (result === 0);
	    return result;
	  };
	  prng.int32 = xg.next;
	  prng.quick = prng;
	  if (state) {
	    if (typeof(state) == 'object') copy(state, xg);
	    prng.state = function() { return copy(xg, {}); };
	  }
	  return prng;
	}

	if (module && module.exports) {
	  module.exports = impl;
	} else if (define && define.amd) {
	  define(function() { return impl; });
	} else {
	  this.tychei = impl;
	}

	})(
	  commonjsGlobal,
	  module,    // present in node.js
	  (typeof undefined) == 'function'    // present with an AMD loader
	);
	}(tychei$1));

	var seedrandom$3 = {exports: {}};

	/*
	Copyright 2019 David Bau.

	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
	CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
	TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
	SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	*/

	(function (module) {
	(function (global, pool, math) {
	//
	// The following constants are related to IEEE 754 limits.
	//

	var width = 256,        // each RC4 output is 0 <= x < 256
	    chunks = 6,         // at least six RC4 outputs for each double
	    digits = 52,        // there are 52 significant digits in a double
	    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
	    startdenom = math.pow(width, chunks),
	    significance = math.pow(2, digits),
	    overflow = significance * 2,
	    mask = width - 1,
	    nodecrypto;         // node.js crypto module, initialized at the bottom.

	//
	// seedrandom()
	// This is the seedrandom function described above.
	//
	function seedrandom(seed, options, callback) {
	  var key = [];
	  options = (options == true) ? { entropy: true } : (options || {});

	  // Flatten the seed string or build one from local entropy if needed.
	  var shortseed = mixkey(flatten(
	    options.entropy ? [seed, tostring(pool)] :
	    (seed == null) ? autoseed() : seed, 3), key);

	  // Use the seed to initialize an ARC4 generator.
	  var arc4 = new ARC4(key);

	  // This function returns a random double in [0, 1) that contains
	  // randomness in every bit of the mantissa of the IEEE 754 value.
	  var prng = function() {
	    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
	        d = startdenom,                 //   and denominator d = 2 ^ 48.
	        x = 0;                          //   and no 'extra last byte'.
	    while (n < significance) {          // Fill up all significant digits by
	      n = (n + x) * width;              //   shifting numerator and
	      d *= width;                       //   denominator and generating a
	      x = arc4.g(1);                    //   new least-significant-byte.
	    }
	    while (n >= overflow) {             // To avoid rounding up, before adding
	      n /= 2;                           //   last byte, shift everything
	      d /= 2;                           //   right using integer math until
	      x >>>= 1;                         //   we have exactly the desired bits.
	    }
	    return (n + x) / d;                 // Form the number within [0, 1).
	  };

	  prng.int32 = function() { return arc4.g(4) | 0; };
	  prng.quick = function() { return arc4.g(4) / 0x100000000; };
	  prng.double = prng;

	  // Mix the randomness into accumulated entropy.
	  mixkey(tostring(arc4.S), pool);

	  // Calling convention: what to return as a function of prng, seed, is_math.
	  return (options.pass || callback ||
	      function(prng, seed, is_math_call, state) {
	        if (state) {
	          // Load the arc4 state from the given state if it has an S array.
	          if (state.S) { copy(state, arc4); }
	          // Only provide the .state method if requested via options.state.
	          prng.state = function() { return copy(arc4, {}); };
	        }

	        // If called as a method of Math (Math.seedrandom()), mutate
	        // Math.random because that is how seedrandom.js has worked since v1.0.
	        if (is_math_call) { math[rngname] = prng; return seed; }

	        // Otherwise, it is a newer calling convention, so return the
	        // prng directly.
	        else return prng;
	      })(
	  prng,
	  shortseed,
	  'global' in options ? options.global : (this == math),
	  options.state);
	}

	//
	// ARC4
	//
	// An ARC4 implementation.  The constructor takes a key in the form of
	// an array of at most (width) integers that should be 0 <= x < (width).
	//
	// The g(count) method returns a pseudorandom integer that concatenates
	// the next (count) outputs from ARC4.  Its return value is a number x
	// that is in the range 0 <= x < (width ^ count).
	//
	function ARC4(key) {
	  var t, keylen = key.length,
	      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

	  // The empty key [] is treated as [0].
	  if (!keylen) { key = [keylen++]; }

	  // Set up S using the standard key scheduling algorithm.
	  while (i < width) {
	    s[i] = i++;
	  }
	  for (i = 0; i < width; i++) {
	    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
	    s[j] = t;
	  }

	  // The "g" method returns the next (count) outputs as one number.
	  (me.g = function(count) {
	    // Using instance members instead of closure state nearly doubles speed.
	    var t, r = 0,
	        i = me.i, j = me.j, s = me.S;
	    while (count--) {
	      t = s[i = mask & (i + 1)];
	      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
	    }
	    me.i = i; me.j = j;
	    return r;
	    // For robust unpredictability, the function call below automatically
	    // discards an initial batch of values.  This is called RC4-drop[256].
	    // See http://google.com/search?q=rsa+fluhrer+response&btnI
	  })(width);
	}

	//
	// copy()
	// Copies internal state of ARC4 to or from a plain object.
	//
	function copy(f, t) {
	  t.i = f.i;
	  t.j = f.j;
	  t.S = f.S.slice();
	  return t;
	}
	//
	// flatten()
	// Converts an object tree to nested arrays of strings.
	//
	function flatten(obj, depth) {
	  var result = [], typ = (typeof obj), prop;
	  if (depth && typ == 'object') {
	    for (prop in obj) {
	      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
	    }
	  }
	  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
	}

	//
	// mixkey()
	// Mixes a string seed into a key that is an array of integers, and
	// returns a shortened string seed that is equivalent to the result key.
	//
	function mixkey(seed, key) {
	  var stringseed = seed + '', smear, j = 0;
	  while (j < stringseed.length) {
	    key[mask & j] =
	      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
	  }
	  return tostring(key);
	}

	//
	// autoseed()
	// Returns an object for autoseeding, using window.crypto and Node crypto
	// module if available.
	//
	function autoseed() {
	  try {
	    var out;
	    if (nodecrypto && (out = nodecrypto.randomBytes)) {
	      // The use of 'out' to remember randomBytes makes tight minified code.
	      out = out(width);
	    } else {
	      out = new Uint8Array(width);
	      (global.crypto || global.msCrypto).getRandomValues(out);
	    }
	    return tostring(out);
	  } catch (e) {
	    var browser = global.navigator,
	        plugins = browser && browser.plugins;
	    return [+new Date, global, plugins, global.screen, tostring(pool)];
	  }
	}

	//
	// tostring()
	// Converts an array of charcodes to a string
	//
	function tostring(a) {
	  return String.fromCharCode.apply(0, a);
	}

	//
	// When seedrandom.js is loaded, we immediately mix a few bits
	// from the built-in RNG into the entropy pool.  Because we do
	// not want to interfere with deterministic PRNG state later,
	// seedrandom will not call math.random on its own again after
	// initialization.
	//
	mixkey(math.random(), pool);

	//
	// Nodejs and AMD support: export the implementation as a module using
	// either convention.
	//
	if (module.exports) {
	  module.exports = seedrandom;
	  // When in node.js, try using crypto package for autoseeding.
	  try {
	    nodecrypto = require$$0$2;
	  } catch (ex) {}
	} else {
	  // When included as a plain script, set up Math.seedrandom global.
	  math['seed' + rngname] = seedrandom;
	}


	// End anonymous scope, and pass initial values.
	})(
	  // global: `self` in browsers (including strict mode and web workers),
	  // otherwise `this` in Node and other environments
	  (typeof self !== 'undefined') ? self : commonjsGlobal,
	  [],     // pool: entropy pool starts empty
	  Math    // math: package containing random, pow, and seedrandom
	);
	}(seedrandom$3));

	// A library of seedable RNGs implemented in Javascript.
	//
	// Usage:
	//
	// var seedrandom = require('seedrandom');
	// var random = seedrandom(1); // or any seed.
	// var x = random();       // 0 <= x < 1.  Every bit is random.
	// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

	// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
	// Period: ~2^116
	// Reported to pass all BigCrush tests.
	var alea = alea$1.exports;

	// xor128, a pure xor-shift generator by George Marsaglia.
	// Period: 2^128-1.
	// Reported to fail: MatrixRank and LinearComp.
	var xor128 = xor128$1.exports;

	// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
	// Period: 2^192-2^32
	// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
	var xorwow = xorwow$1.exports;

	// xorshift7, by François Panneton and Pierre L'ecuyer, takes
	// a different approach: it adds robustness by allowing more shifts
	// than Marsaglia's original three.  It is a 7-shift generator
	// with 256 bits, that passes BigCrush with no systmatic failures.
	// Period 2^256-1.
	// No systematic BigCrush failures reported.
	var xorshift7 = xorshift7$1.exports;

	// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
	// very long period that also adds a Weyl generator. It also passes
	// BigCrush with no systematic failures.  Its long period may
	// be useful if you have many generators and need to avoid
	// collisions.
	// Period: 2^4128-2^32.
	// No systematic BigCrush failures reported.
	var xor4096 = xor4096$1.exports;

	// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
	// number generator derived from ChaCha, a modern stream cipher.
	// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
	// Period: ~2^127
	// No systematic BigCrush failures reported.
	var tychei = tychei$1.exports;

	// The original ARC4-based prng included in this library.
	// Period: ~2^1600
	var sr = seedrandom$3.exports;

	sr.alea = alea;
	sr.xor128 = xor128;
	sr.xorwow = xorwow;
	sr.xorshift7 = xorshift7;
	sr.xor4096 = xor4096;
	sr.tychei = tychei;

	var seedrandom$2 = sr;

	var buildImpulse_1 = buildImpulse$1;

	var chunkSize = 2048;

	var queue$2 = [];
	var targets = {};

	var lastImpulseId = 0;
	function buildImpulse$1(length, decay, reverse, cb){
	  
	  lastImpulseId += 1;
	  var target = targets[lastImpulseId] = {
	    id: lastImpulseId,
	    cb: cb,
	    length: length,
	    decay: decay,
	    reverse: reverse,
	    impulseL: new Float32Array(length),
	    impulseR: new Float32Array(length)
	  };

	  queue$2.push([ target.id, 0, Math.min(chunkSize, length) ]);

	  setTimeout(next, 1);
	  return lastImpulseId
	}

	buildImpulse$1.cancel = function(id){
	  if (targets[id]){
	delete targets[id];
	    return true
	  } else {
	    return false
	  }
	};

	function next(){
	  var item = queue$2.shift();
	  if (item){
	    var target = targets[item[0]];
	    if (target){
	      var length = target.length;
	      var decay = target.decay;
	      var reverse = target.reverse;
	      var from = item[1];
	      var to = item[2];

	      var impulseL = target.impulseL;
	      var impulseR = target.impulseR;

	      for (var i=from;i<to;i++) {
	        var n = reverse ? length - i : i;
	        impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
	        impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
	      }

	      if (to >= length-1){
	delete targets[item[0]];
	        target.cb([target.impulseL, target.impulseR]);
	      } else {
	        queue$2.push([ target.id, to, Math.min(to + chunkSize, length) ]);
	      }
	    }
	  }
	  
	  if (queue$2.length){
	    setTimeout(next, 5);
	  }
	}

	// based on https://github.com/web-audio-components/simple-reverb by Nick Thompson

	var buildImpulse = buildImpulse_1;

	var soundbankReverb = SimpleReverb;

	function SimpleReverb(context){
	  var node = context.createGain();
	  var dry = node._dry = context.createGain();
	  var wet = node._wet = context.createGain();

	  var output = node.output = context.createGain();

	  var convolver = node._convolver = context.createConvolver();
	  var filter = node._filter = context.createBiquadFilter();
	  
	  node.connect(dry);
	  node.connect(wet);

	  convolver.connect(filter);
	  dry.connect(output);
	  wet.connect(convolver);
	  filter.connect(output);


	  Object.defineProperties(node, properties);

	  node._time = 3;
	  node._decay = 2;
	  node._reverse = false;

	  node.cutoff.value = 20000;
	  node.filterType = 'lowpass';

	  node._building = false;
	  node._buildImpulse();


	  return node
	}

	var properties = {

	  connect: {
	    value: function(){
	      this.output.connect.apply(this.output, arguments);
	    }
	  },

	  disconnect: {
	    value: function(){
	      this.output.disconnect.apply(this.output, arguments);
	    }
	  },

	  wet: {
	    get: function(){
	      return this._wet.gain
	    }
	  },

	  dry: {
	    get: function(){
	      return this._dry.gain
	    }
	  },

	  cutoff: {
	    get: function(){
	      return this._filter.frequency
	    }
	  },

	  filterType: {
	    get: function(){
	      return this._filter.type
	    },
	    set: function(value){
	      this._filter.type = value;
	    }
	  },

	  _buildImpulse: {
	    value: function () {
	      var self = this;
	      var rate = self.context.sampleRate;
	      var length = Math.max(rate * self.time, 1);

	      if (self._building){
	        buildImpulse.cancel(self._building);
	      }

	      self._building = buildImpulse(length, self.decay, self.reverse, function(channels){
	        var impulse = self.context.createBuffer(2, length, rate);
	        impulse.getChannelData(0).set(channels[0]);
	        impulse.getChannelData(1).set(channels[1]);
	        self._convolver.buffer = impulse;
	        self._building = false;
	      });
	    }
	  },

	  /**
	   * Public parameters.
	   */

	  time: {
	    enumerable: true,
	    get: function () { return this._time; },
	    set: function (value) {
	      this._time = value;
	      this._buildImpulse();
	    }
	  },

	  decay: {
	    enumerable: true,
	    get: function () { return this._decay; },
	    set: function (value) {
	      this._decay = value;
	      this._buildImpulse();
	    }
	  },

	  reverse: {
	    enumerable: true,
	    get: function () { return this._reverse; },
	    set: function (value) {
	      this._reverse = value;
	      this._buildImpulse();
	    }
	  }

	};

	var seedrandom$1 = seedrandom$2;
	var SoundbankReverb = soundbankReverb;

	class SynthNode {
	  constructor(ctx, params) {
	    this.ctx = ctx;
	    this.params = params;
	    this.node = null;
	  }
	  node() {
	    return this.node;
	  }
	  connect({ synthNode, audioNode }) {
	    if (audioNode) {
	      this.node.connect(audioNode);
	    } else if (synthNode) {
	      this.node.connect(synthNode.node);
	    } else {
	      throw new Error('No synthNode or raw AudioNode passed to connect.');
	    }
	  }
	  play({ startTime, endTime }) {
	    try {
	      this.node.start(startTime);
	      if (!isNaN(endTime)) {
	        this.node.stop(endTime);
	      }
	    } catch (e) {
	      console.log(e);
	    }
	  }
	}

	class VibratoGenerator$1 extends SynthNode {
	  constructor(ctx, params) {
	    super(ctx, params);
	    this.node = this.ctx.createOscillator();
	    this.node.frequency.value = this.params.rateFreq;
	  }
	}

	class VibratoAmp$1 extends SynthNode {
	  constructor(ctx, params) {
	    super(ctx, params);
	    this.node = this.ctx.createGain();
	    this.node.gain.value = this.params.pitchVariance;
	  }
	  connect({ synthNode, audioNode }) {
	    var connectTargetNode = audioNode || synthNode.node;
	    var connectTarget = connectTargetNode[this.params.destProp || 'detune'];
	    this.node.connect(connectTarget);
	  }
	  play() {}
	}

	class Carrier$1 extends SynthNode {
	  constructor(ctx, params) {
	    super(ctx, params);
	    this.node = this.ctx.createOscillator();
	    if (
	      this.params.carrierWaveType === 'custom' &&
	      this.params.carrierCustomWaveArrayLength &&
	      this.params.carrierCustomWaveSeed
	    ) {
	      this.node.setPeriodicWave(
	        getCustomWave({
	          carrierCustomWaveArrayLength: this.params
	            .carrierCustomWaveArrayLength,
	          carrierCustomWaveSeed: this.params.carrierCustomWaveSeed,
	          ctx: this.ctx,
	        })
	      );
	    } else {
	      this.node.type = this.params.carrierWaveType;
	      this.node.frequency.value = this.params.carrierFreq;
	    }
	  }
	}

	class Gain$1 extends SynthNode {
	  constructor(ctx, params) {
	    super(ctx, params);
	    this.node = this.ctx.createGain();
	    this.node.gain.value = this.params.gain;
	  }
	  play() {}
	}

	class Envelope$1 extends SynthNode {
	  constructor(ctx, params) {
	    super(ctx, params);
	    this.node = this.ctx.createGain();
	  }
	  play({ startTime, endTime }) {
	    this.node.gain.value = 0;
	    this.node.gain.setTargetAtTime(
	      this.params.envelopeMaxGain,
	      startTime,
	      this.params.envelopePeakRateK
	    );
	    this.node.gain.setTargetAtTime(
	      0,
	      Math.max(endTime - this.params.timeNeededForEnvelopeDecay, startTime),
	      this.params.envelopeDecayRateK
	    );
	  }
	}

	class Reverb$1 extends SynthNode {
	  constructor(ctx, params) {
	    super(ctx, params);
	    this.node = this.ctx.createGain();
	    this.node = SoundbankReverb(ctx);
	    this.node.time = this.params.reverbSeconds;
	    this.node.wet.value = this.params.reverbWet;
	    this.node.dry.value = this.params.reverbDry;
	  }
	  play() {}
	}

	class Compressor$1 extends SynthNode {
	  constructor(ctx, params) {
	    super(ctx, params);
	    this.node = ctx.createDynamicsCompressor();
	  }
	  play({ startTime }) {
	    this.node.threshold.setValueAtTime(
	      this.params.compressorThreshold,
	      startTime
	    );
	    this.node.knee.setValueAtTime(this.params.compressorKnee, startTime);
	    this.node.ratio.setValueAtTime(this.params.compressorRatio, startTime);
	    this.node.attack.setValueAtTime(this.params.compressorAttack, startTime);
	    this.node.release.setValueAtTime(this.params.compressorRelease, startTime);
	  }
	}

	class Sampler$1 extends SynthNode {
	  constructor(ctx, params) {
	    super(ctx, params);
	    this.node = ctx.createBufferSource();
	    this.node.buffer = params.sampleBuffer;
	    if (params.sampleDetune) {
	      this.node.detune.value = params.sampleDetune;
	    }
	  }
	  play({ startTime, endTime }) {
	    this.node.start(startTime);
	    this.node.stop(endTime + this.params.timeNeededForEnvelopeDecay);
	  }
	}

	function getCustomWave({
	  carrierCustomWaveArrayLength,
	  carrierCustomWaveSeed,
	  ctx,
	}) {
	  var random = seedrandom$1(carrierCustomWaveSeed);
	  var real = new Float32Array(carrierCustomWaveArrayLength);
	  var imaginary = new Float32Array(carrierCustomWaveArrayLength);
	  real[0] = 0;
	  imaginary[0] = 0;
	  for (var i = 1; i < carrierCustomWaveArrayLength; ++i) {
	    real[i] = -1.0 + random() * 2;
	    imaginary[i] = -1.0 + random() * 2;
	  }
	  //console.log('real', real, 'imaginary', imaginary);
	  return ctx.createPeriodicWave(real, imaginary);
	}

	var synthNode = {
	  Carrier: Carrier$1,
	  VibratoGenerator: VibratoGenerator$1,
	  VibratoAmp: VibratoAmp$1,
	  Envelope: Envelope$1,
	  Reverb: Reverb$1,
	  Compressor: Compressor$1,
	  Sampler: Sampler$1,
	  Gain: Gain$1,
	};

	var {
	  Carrier,
	  VibratoGenerator,
	  VibratoAmp,
	  Envelope,
	  Reverb,
	  Compressor,
	  Sampler,
	  Gain,
	} = synthNode;

	var cachedReverb;

	// samplerOn is mutually exclusive with vibratoOn and modOn.
	function playSynth$2({
	  modOn = false,
	  modIndex,
	  modFreq,
	  carrierOn = false,
	  carrierWaveType,
	  carrierFreq,
	  carrierCustomWaveArrayLength,
	  carrierCustomWaveSeed,
	  envelopeOn = false,
	  envelopeMaxGain = 0.3,
	  envelopePeakRateK,
	  envelopeDecayRateK,
	  timeNeededForEnvelopeDecay = 1, // TODO: Expose in UI
	  vibratoOn = false,
	  vibratoRateHz,
	  vibratoPitchVarCents,
	  delaySeconds = 0,
	  soundDurationSeconds,
	  reverbOn = false,
	  reverbSeconds,
	  reverbWet,
	  reverbDry,
	  useCachedReverb = true,
	  compressorOn = false,
	  compressorThreshold = -50,
	  compressorKnee = 40,
	  compressorRatio = 12,
	  compressorAttack = 0,
	  compressorRelease = 0.25,
	  samplerOn = false,
	  samplerKits = [], // Containing sampleBuffer and sampleDetune
	  gainOn = false,
	  gain = 1,
	  ctx,
	  addToChain,
	}) {
	  //console.log('useCachedReverb', useCachedReverb);
	  var activeSynths = [];
	  setUpSynthChain();
	  if (addToChain) {
	    addToChain(activeSynths);
	  }
	  play();

	  function setUpSynthChain() {
	    if (samplerOn) {
	      activeSynths.push(
	        samplerKits.map(
	          (kit) =>
	            new Sampler(ctx, {
	              sampleBuffer: kit.sampleBuffer,
	              sampleDetune: kit.sampleDetune,
	              timeNeededForEnvelopeDecay,
	            })
	        )
	      );
	    } else {
	      if (vibratoOn) {
	        activeSynths.push(
	          new VibratoGenerator(ctx, { rateFreq: vibratoRateHz })
	        );

	        activeSynths.push(
	          new VibratoAmp(ctx, { pitchVariance: vibratoPitchVarCents })
	        );
	      }

	      if (modOn) {
	        const deviation = modIndex * modFreq;
	        activeSynths.push(new VibratoGenerator(ctx, { rateFreq: modFreq }));
	        activeSynths.push(
	          new VibratoAmp(ctx, {
	            pitchVariance: deviation,
	            destProp: 'frequency',
	          })
	        );
	      }
	    }

	    if (carrierOn) {
	      activeSynths.push(
	        new Carrier(ctx, {
	          carrierFreq,
	          carrierWaveType,
	          carrierCustomWaveArrayLength,
	          carrierCustomWaveSeed,
	        })
	      );
	    }

	    if (gainOn) {
	      activeSynths.push(new Gain(ctx, { gain }));
	    }

	    if (envelopeOn) {
	      activeSynths.push(
	        new Envelope(ctx, {
	          envelopeMaxGain,
	          envelopePeakRateK,
	          envelopeDecayRateK,
	          timeNeededForEnvelopeDecay,
	        })
	      );
	    }

	    if (reverbOn) {
	      // HACK: Creating new Reverb every time there's a new event makes it to
	      // a lot of calculating to figure out what to give to the convolver node,
	      // which causes stutters. This hack depends on us only using one context.
	      if (!useCachedReverb || !cachedReverb) {
	        cachedReverb = new Reverb(ctx, { reverbSeconds, reverbWet, reverbDry });
	      }
	      activeSynths.push(cachedReverb);
	    }

	    if (compressorOn) {
	      activeSynths.push(
	        new Compressor(ctx, {
	          compressorThreshold,
	          compressorKnee,
	          compressorRatio,
	          compressorAttack,
	          compressorRelease,
	        })
	      );
	    }

	    // All of this assumes that every node only connects
	    // to one other node.
	    for (var i = 0; i < activeSynths.length; ++i) {
	      let synth = activeSynths[i];
	      let nextSynth;
	      let isEnd = i + 1 === activeSynths.length;
	      if (isEnd) {
	        if (Array.isArray(synth)) {
	          synth.forEach((singleSynth) =>
	            singleSynth.connect({ audioNode: ctx.destination })
	          );
	        } else {
	          synth.connect({ audioNode: ctx.destination });
	        }
	      } else {
	        nextSynth = activeSynths[i + 1];
	        if (Array.isArray(synth)) {
	          synth.forEach((singleSynth) =>
	            connectToNextSynthOrSynths(singleSynth, nextSynth)
	          );
	        } else {
	          connectToNextSynthOrSynths(synth, nextSynth);
	        }
	      }
	    }
	    //activeSynths[activeSynths.length - 1].connect({
	    //audioNode: ctx.destination,
	    //});
	  }

	  function play() {
	    const startTime = ctx.currentTime + delaySeconds;
	    const endTime = startTime + +soundDurationSeconds;

	    activeSynths.forEach(playNodeOrGroup);

	    function playNodeOrGroup(nodeOrGroup) {
	      if (Array.isArray(nodeOrGroup)) {
	        nodeOrGroup.forEach((node) => node.play({ startTime, endTime }));
	      } else {
	        nodeOrGroup.play({ startTime, endTime });
	      }
	    }
	  }
	}

	function connectToNextSynthOrSynths(src, dest) {
	  if (Array.isArray(dest)) {
	    dest.forEach((destSynth) => src.connect({ synthNode: destSynth }));
	  } else {
	    src.connect({ synthNode: dest });
	  }
	}

	var synth = playSynth$2;

	var require$$4 = [
		{
			yearsFromNow: 0,
			years: {
				base: 0,
				exp: 1
			},
			contentHTML: "Now. You are alive and listening to this piece.",
			category: "earth",
			id: "event-EBME",
			startTimeInCompactUnits: 0,
			easedStartTime: 0,
			cleanedContentHTML: "Now. You are alive and listening to this piece.",
			skimmableContent: "Now. You are alive and listening to this piece."
		},
		{
			yearsFromNow: "10,000",
			contentHTML: "The <a href=\"/wiki/Red_supergiant_star\" title=\"Red supergiant star\">red supergiant star</a> <a href=\"/wiki/Antares\" title=\"Antares\">Antares</a> will likely have exploded in a <a href=\"/wiki/Supernova\" title=\"Supernova\">supernova</a>. The explosion is expected to be easily visible in daylight.<sup id=\"cite_ref-hockey_10-0\" class=\"reference\"><a href=\"#cite_note-hockey-10\">[8]</a></sup>",
			years: {
				base: 10000,
				exp: 1
			},
			category: "galaxy",
			id: "event-BRoq",
			startTimeInCompactUnits: 4,
			easedStartTime: 4,
			cleanedContentHTML: "The red supergiant star Antares will likely have exploded in a supernova. The explosion is expected to be easily visible in daylight.[8]",
			skimmableContent: "The red supergiant star Antares will likely have exploded."
		},
		{
			yearsFromNow: "15,000",
			contentHTML: "According to the <a href=\"/wiki/Sahara_pump_theory\" title=\"Sahara pump theory\">Sahara pump theory</a>, the <a href=\"/wiki/Precession\" title=\"Precession\">precession</a> of Earth's poles will move the <a href=\"/wiki/North_African_Monsoon\" class=\"mw-redirect\" title=\"North African Monsoon\">North African Monsoon</a> far enough north to convert the <a href=\"/wiki/Sahara\" title=\"Sahara\">Sahara</a> back into a tropical climate, <a href=\"/wiki/Neolithic_Subpluvial\" title=\"Neolithic Subpluvial\">as it was</a> 5,000–10,000 years ago.<sup id=\"cite_ref-tropicalsahara1_11-0\" class=\"reference\"><a href=\"#cite_note-tropicalsahara1-11\">[9]</a></sup><sup id=\"cite_ref-tropicalsahara2_12-0\" class=\"reference\"><a href=\"#cite_note-tropicalsahara2-12\">[10]</a></sup>",
			years: {
				base: 15000,
				exp: 1
			},
			category: "earth",
			id: "event-NOuX",
			startTimeInCompactUnits: 4.176091259055681,
			easedStartTime: 4.699234656595423,
			cleanedContentHTML: "According to the Sahara pump theory, the precession of Earth's poles will move the North African Monsoon far enough north to convert the Sahara back into a tropical climate, as it was 5,000–10,000 years ago.[9][10]",
			skimmableContent: "The Sahara's climate will become tropical."
		},
		{
			yearsFromNow: "36,000",
			contentHTML: "The small <a href=\"/wiki/Red_dwarf\" title=\"Red dwarf\">red dwarf</a> <a href=\"/wiki/Ross_248\" title=\"Ross 248\">Ross 248</a> will pass within 3.024 light-years of Earth, becoming the closest star to the Sun.<sup id=\"cite_ref-Matthews1993_15-0\" class=\"reference\"><a href=\"#cite_note-Matthews1993-15\">[13]</a></sup> It will recede after about 8,000 years, making first <a href=\"/wiki/Alpha_Centauri\" title=\"Alpha Centauri\">Alpha Centauri</a> again and then <a href=\"/wiki/Gliese_445\" title=\"Gliese 445\">Gliese 445</a> the nearest stars<sup id=\"cite_ref-Matthews1993_15-1\" class=\"reference\"><a href=\"#cite_note-Matthews1993-15\">[13]</a></sup> (<a href=\"/wiki/List_of_nearest_stars_and_brown_dwarfs#Distant_future_and_past_encounters\" title=\"List of nearest stars and brown dwarfs\">see timeline</a>).",
			years: {
				base: 36000,
				exp: 1
			},
			category: "earth",
			id: "event-BJCq",
			startTimeInCompactUnits: 4.556302500767287,
			easedStartTime: 6.174799731025908,
			cleanedContentHTML: "The small red dwarf Ross 248 will pass within 3.024 light-years of Earth, becoming the closest star to the Sun.[13] It will recede after about 8,000 years, making first Alpha Centauri again and then Gliese 445 the nearest stars[13] (see timeline).",
			skimmableContent: "The small red dwarf Ross 248 will pass within 3.024 light-years of Earth, becoming the closest star to the Sun."
		},
		{
			yearsFromNow: "50,000",
			contentHTML: "According to Berger and Loutre, the current <a href=\"/wiki/Interglacial\" title=\"Interglacial\">interglacial</a> period ends,<sup id=\"cite_ref-Berger2002_16-0\" class=\"reference\"><a href=\"#cite_note-Berger2002-16\">[14]</a></sup> sending the Earth back into a <a href=\"/wiki/Glacial_period\" title=\"Glacial period\">glacial period</a> of the current <a href=\"/wiki/Ice_age\" title=\"Ice age\">ice age</a>, regardless of the effects of anthropogenic <a href=\"/wiki/Global_warming\" title=\"Global warming\">global warming</a>.<p><a href=\"/wiki/Niagara_Falls\" title=\"Niagara Falls\">Niagara Falls</a> will have eroded away the remaining 32&nbsp;km to <a href=\"/wiki/Lake_Erie\" title=\"Lake Erie\">Lake Erie</a>, and cease to exist.<sup id=\"cite_ref-Niagara_Parks_17-0\" class=\"reference\"><a href=\"#cite_note-Niagara_Parks-17\">[15]</a></sup></p><p>The many <a href=\"/wiki/Glacial_lake\" title=\"Glacial lake\">glacial lakes</a> of the <a href=\"/wiki/Canadian_Shield\" title=\"Canadian Shield\">Canadian Shield</a> will have been erased by <a href=\"/wiki/Post-glacial_rebound\" title=\"Post-glacial rebound\">post-glacial rebound</a> and erosion.<sup id=\"cite_ref-18\" class=\"reference\"><a href=\"#cite_note-18\">[16]</a></sup></p>",
			years: {
				base: 50000,
				exp: 1
			},
			category: "earth",
			id: "event-CjwF",
			startTimeInCompactUnits: 4.698970004336019,
			easedStartTime: 6.716757840690438,
			cleanedContentHTML: "According to Berger and Loutre, the current interglacial period ends,[14] sending the Earth back into a glacial period of the current ice age, regardless of the effects of anthropogenic global warming.<p>Niagara Falls will have eroded away the remaining 32 km to Lake Erie, and cease to exist.[15]</p><p>The many glacial lakes of the Canadian Shield will have been erased by post-glacial rebound and erosion.[16]</p>",
			skimmableContent: "The Earth returns to a glacial period of the current ice age. Niagara Falls will cease to exist."
		},
		{
			yearsFromNow: "100,000",
			contentHTML: "The <a href=\"/wiki/Proper_motion\" title=\"Proper motion\">proper motion</a> of stars across the <a href=\"/wiki/Celestial_sphere\" title=\"Celestial sphere\">celestial sphere</a>, which is the result of their movement through the <a href=\"/wiki/Milky_Way\" title=\"Milky Way\">Milky Way</a>, renders many of the <a href=\"/wiki/Constellation\" title=\"Constellation\">constellations</a> unrecognisable.<sup id=\"cite_ref-Tapping_2005_20-0\" class=\"reference\"><a href=\"#cite_note-Tapping_2005-20\">[18]</a></sup>",
			years: {
				base: 100000,
				exp: 1
			},
			category: "galaxy",
			id: "event-qplV",
			startTimeInCompactUnits: 5,
			easedStartTime: 7.84,
			cleanedContentHTML: "The proper motion of stars across the celestial sphere, which is the result of their movement through the Milky Way, renders many of the constellations unrecognisable.[18]",
			skimmableContent: "The motion of stars renders many of the constellations unrecognisable."
		},
		{
			yearsFromNow: "100,000",
			contentHTML: "The <a href=\"/wiki/Hypergiant\" title=\"Hypergiant\">hypergiant</a> star <a href=\"/wiki/VY_Canis_Majoris\" title=\"VY Canis Majoris\">VY Canis Majoris</a> will likely have exploded in a <a href=\"/wiki/Superluminous_supernova\" title=\"Superluminous supernova\">hypernova</a>.<sup id=\"cite_ref-Monnier_Tuthill_Lopez_1999_21-0\" class=\"reference\"><a href=\"#cite_note-Monnier_Tuthill_Lopez_1999-21\">[19]</a></sup>",
			years: {
				base: 100000,
				exp: 1
			},
			category: "galaxy",
			id: "event-lASx",
			startTimeInCompactUnits: 5,
			easedStartTime: 7.84,
			cleanedContentHTML: "The hypergiant star VY Canis Majoris will likely have exploded in a hypernova.[19]",
			skimmableContent: "The hypergiant star VY Canis Majoris will likely have exploded."
		},
		{
			yearsFromNow: "100,000",
			contentHTML: "Earth will likely have undergone a <a href=\"/wiki/Supervolcanic\" class=\"mw-redirect\" title=\"Supervolcanic\">supervolcanic</a> eruption large enough to erupt 400&nbsp;km<sup>3</sup> (96 cubic miles) of <a href=\"/wiki/Magma\" title=\"Magma\">magma</a>. For comparison, <a href=\"/wiki/Lake_Erie\" title=\"Lake Erie\">Lake Erie</a> is 484&nbsp;km<sup>3</sup> (116&nbsp;cu&nbsp;mi).<sup id=\"cite_ref-toba_22-0\" class=\"reference\"><a href=\"#cite_note-toba-22\">[20]</a></sup>",
			years: {
				base: 100000,
				exp: 1
			},
			category: "earth",
			id: "event-ytaS",
			startTimeInCompactUnits: 5,
			easedStartTime: 7.84,
			cleanedContentHTML: "Earth will likely have undergone a supervolcanic eruption large enough to erupt 400 km3 (96 cubic miles) of magma. For comparison, Lake Erie is 484 km3 (116 cu mi).[20]",
			skimmableContent: "Earth will likely have undergone a supervolcanic eruption with enough Magma to fill Lake Erie."
		},
		{
			yearsFromNow: "100,000",
			contentHTML: "Native North American <a href=\"/wiki/Earthworm\" title=\"Earthworm\">earthworms</a>, such as <a href=\"/wiki/Megascolecidae\" title=\"Megascolecidae\">Megascolecidae</a>, will have naturally spread north through the United States <a href=\"/wiki/Upper_Midwest\" title=\"Upper Midwest\">Upper Midwest</a> to the <a href=\"/wiki/Canada%E2%80%93United_States_border\" title=\"Canada–United States border\">Canada–US border</a>, recovering from the <a href=\"/wiki/Laurentide_Ice_Sheet\" title=\"Laurentide Ice Sheet\">Laurentide Ice Sheet</a> glaciation (38°N to 49°N), assuming a migration rate of 10&nbsp;metres per year.<sup id=\"cite_ref-23\" class=\"reference\"><a href=\"#cite_note-23\">[21]</a></sup> (However, non-native <a href=\"/wiki/Invasive_earthworms_of_North_America\" title=\"Invasive earthworms of North America\">invasive earthworms of North America</a> have already been introduced by humans on a much shorter timescale, causing a shock to the regional <a href=\"/wiki/Ecosystem\" title=\"Ecosystem\">ecosystem</a>.)",
			years: {
				base: 100000,
				exp: 1
			},
			category: "earth",
			id: "event-TLdB",
			startTimeInCompactUnits: 5,
			easedStartTime: 7.84,
			cleanedContentHTML: "Native North American earthworms, such as Megascolecidae, will have naturally spread north through the United States Upper Midwest to the Canada–US border, recovering from the Laurentide Ice Sheet glaciation (38°N to 49°N), assuming a migration rate of 10 metres per year.[21] (However, non-native invasive earthworms of North America have already been introduced by humans on a much shorter timescale, causing a shock to the regional ecosystem.)",
			skimmableContent: "Native North American earthworms will have naturally spread to the Canada–US border."
		},
		{
			yearsFromNow: "> 100,000",
			contentHTML: "As one of the <a href=\"/wiki/Long-term_effects_of_global_warming\" title=\"Long-term effects of global warming\">long-term effects of global warming</a>, 10% of <a href=\"/wiki/Greenhouse_gas\" title=\"Greenhouse gas\">anthropogenic carbon dioxide</a> will still remain in a stabilized atmosphere.<sup id=\"cite_ref-24\" class=\"reference\"><a href=\"#cite_note-24\">[22]</a></sup>",
			years: {
				base: 100000,
				exp: 1
			},
			category: "earth",
			id: "event-EQlf",
			startTimeInCompactUnits: 5,
			easedStartTime: 7.84,
			cleanedContentHTML: "As one of the long-term effects of global warming, 10% of anthropogenic carbon dioxide will still remain in a stabilized atmosphere.[22]",
			skimmableContent: "As one of the long-term effects of global warming, 10% of anthropogenic carbon dioxide will still remain in a stabilized atmosphere."
		},
		{
			yearsFromNow: "250,000",
			contentHTML: "<a href=\"/wiki/L%C5%8D%CA%BBihi_Seamount\" title=\"Lōʻihi Seamount\">Lōʻihi</a>, the youngest volcano in the <a href=\"/wiki/Hawaiian%E2%80%93Emperor_seamount_chain\" title=\"Hawaiian–Emperor seamount chain\">Hawaiian–Emperor seamount chain</a>, will rise above the surface of the ocean and become a new <a href=\"/wiki/High_island\" title=\"High island\">volcanic island</a>.<sup id=\"cite_ref-havo_25-0\" class=\"reference\"><a href=\"#cite_note-havo-25\">[23]</a></sup>",
			years: {
				base: 250000,
				exp: 1
			},
			category: "earth",
			id: "event-kKdb",
			startTimeInCompactUnits: 5.3979400086720375,
			easedStartTime: 9.283981330245394,
			cleanedContentHTML: "Lōʻihi, the youngest volcano in the Hawaiian–Emperor seamount chain, will rise above the surface of the ocean and become a new volcanic island.",
			skimmableContent: "Lōʻihi, the youngest volcano in the Hawaiian–Emperor seamount chain, will rise above the surface of the ocean and become a new volcanic island.",
			speakableContent: "Low eehee, the youngest volcano in the Hawaiian–Emperor seamount chain, will rise above the surface of the ocean and become a new volcanic island."
		},
		{
			yearsFromNow: "c. 300,000",
			contentHTML: "At some point in the next \"several\" hundred thousand years, the <a href=\"/wiki/Wolf%E2%80%93Rayet_star\" title=\"Wolf–Rayet star\">Wolf–Rayet star</a> <a href=\"/wiki/WR_104\" title=\"WR 104\">WR 104</a> is expected to explode in a <a href=\"/wiki/Supernova\" title=\"Supernova\">supernova</a>. It has been suggested that it may produce a <a href=\"/wiki/Gamma-ray_burst\" title=\"Gamma-ray burst\">gamma-ray burst</a> that could pose a threat to life on Earth should its poles be aligned 12° or lower towards Earth. The star's axis of rotation has yet to be determined with certainty.<sup id=\"cite_ref-26\" class=\"reference\"><a href=\"#cite_note-26\">[24]</a></sup>",
			years: {
				base: 300000,
				exp: 1
			},
			category: "galaxy",
			id: "event-oTNP",
			startTimeInCompactUnits: 5.477121254719663,
			easedStartTime: 9.56592085249107,
			cleanedContentHTML: "At some point in the next \"several\" hundred thousand years, the Wolf–Rayet star WR 104 is expected to explode in a supernova. It has been suggested that it may produce a gamma-ray burst that could pose a threat to life on Earth should its poles be aligned 12° or lower towards Earth. The star's axis of rotation has yet to be determined with certainty.[24]",
			skimmableContent: "The Wolf–Rayet star WR 104 is expected to explode; it may produce a gamma-ray burst that could pose a threat to life on Earth."
		},
		{
			yearsFromNow: "500,000",
			contentHTML: "Earth will likely have been hit by an asteroid of roughly 1&nbsp;km in diameter, <a href=\"/wiki/Asteroid_impact_avoidance\" title=\"Asteroid impact avoidance\">assuming it cannot be averted</a>.<sup id=\"cite_ref-Bostrom_2002_27-0\" class=\"reference\"><a href=\"#cite_note-Bostrom_2002-27\">[25]</a></sup>",
			years: {
				base: 500000,
				exp: 1
			},
			category: "earth",
			id: "event-VHRY",
			startTimeInCompactUnits: 5.698970004336019,
			easedStartTime: 10.346601454795223,
			cleanedContentHTML: "Earth will likely have been hit by an asteroid of roughly 1 km in diameter, assuming it cannot be averted.[25]",
			skimmableContent: "Earth will likely have been hit by an asteroid of roughly 1 km in diameter."
		},
		{
			yearsFromNow: "500,000",
			contentHTML: "The rugged terrain of <a href=\"/wiki/Badlands_National_Park\" title=\"Badlands National Park\">Badlands National Park</a> in <a href=\"/wiki/South_Dakota\" title=\"South Dakota\">South Dakota</a> will have eroded away completely.<sup id=\"cite_ref-28\" class=\"reference\"><a href=\"#cite_note-28\">[26]</a></sup>",
			years: {
				base: 500000,
				exp: 1
			},
			category: "earth",
			id: "event-DciZ",
			startTimeInCompactUnits: 5.698970004336019,
			easedStartTime: 10.346601454795223,
			cleanedContentHTML: "The rugged terrain of Badlands National Park in South Dakota will have eroded away completely.[26]",
			skimmableContent: "The rugged terrain of Badlands National Park in South Dakota will have eroded away completely."
		},
		{
			yearsFromNow: "950,000",
			contentHTML: "<a href=\"/wiki/Meteor_Crater\" title=\"Meteor Crater\">Meteor Crater</a>, a large <a href=\"/wiki/Impact_crater\" title=\"Impact crater\">impact crater</a> in Arizona considered the \"freshest\" of its kind, will have eroded away.<sup id=\"cite_ref-29\" class=\"reference\"><a href=\"#cite_note-29\">[27]</a></sup>",
			years: {
				base: 950000,
				exp: 1
			},
			category: "earth",
			id: "event-TjbW",
			startTimeInCompactUnits: 5.977723605288848,
			easedStartTime: 11.30862599789441,
			cleanedContentHTML: "Meteor Crater, a large impact crater in Arizona considered the \"freshest\" of its kind, will have eroded away.[27]",
			skimmableContent: "Meteor Crater in Arizona will have eroded away."
		},
		{
			yearsFromNow: "1 million",
			contentHTML: "Highest estimated time until the <a href=\"/wiki/Red_supergiant_star\" title=\"Red supergiant star\">red supergiant star</a> <a href=\"/wiki/Betelgeuse\" title=\"Betelgeuse\">Betelgeuse</a> explodes in a <a href=\"/wiki/Supernova\" title=\"Supernova\">supernova</a>. The explosion is expected to be easily visible in daylight.<sup id=\"cite_ref-beteldeath_30-0\" class=\"reference\"><a href=\"#cite_note-beteldeath-30\">[28]</a></sup><sup id=\"cite_ref-betel_31-0\" class=\"reference\"><a href=\"#cite_note-betel-31\">[29]</a></sup> It may explode in as little as 100,000 years, if particular evolutionary models turn out to be correct.",
			years: {
				base: 1000000,
				exp: 1
			},
			category: "galaxy",
			id: "event-EffI",
			startTimeInCompactUnits: 6,
			easedStartTime: 11.384615384615385,
			cleanedContentHTML: "The red supergiant star Betelgeuse explodes in a supernova. The explosion is expected to be easily visible in daylight.[28][29] It may explode in as little as 100,000 years, if particular evolutionary models turn out to be correct.",
			skimmableContent: "Highest estimated time until the red supergiant star Betelgeuse explodes."
		},
		{
			yearsFromNow: "1 million",
			contentHTML: "<a href=\"/wiki/Desdemona_(moon)\" title=\"Desdemona (moon)\">Desdemona</a> and <a href=\"/wiki/Cressida_(moon)\" title=\"Cressida (moon)\">Cressida</a>, moons of <a href=\"/wiki/Uranus\" title=\"Uranus\">Uranus</a>, will likely have collided.<sup id=\"cite_ref-Uranus_32-0\" class=\"reference\"><a href=\"#cite_note-Uranus-32\">[30]</a></sup>",
			years: {
				base: 1000000,
				exp: 1
			},
			category: "solar",
			id: "event-bPbV",
			startTimeInCompactUnits: 6,
			easedStartTime: 11.384615384615385,
			cleanedContentHTML: "Desdemona and Cressida, moons of Uranus, will likely have collided.[30]",
			skimmableContent: "Desdemona and Cressida, moons of Uranus, will likely have collided."
		},
		{
			yearsFromNow: "2 million",
			contentHTML: "Estimated time for the recovery of <a href=\"/wiki/Coral_reef\" title=\"Coral reef\">coral reef</a> ecosystems from human-caused <a href=\"/wiki/Ocean_acidification\" title=\"Ocean acidification\">ocean acidification</a>; a similar time was taken for the recovery of marine ecosystems after the acidification event that occurred about 65 million years ago.<sup id=\"cite_ref-34\" class=\"reference\"><a href=\"#cite_note-34\">[32]</a></sup>",
			years: {
				base: 2000000,
				exp: 1
			},
			category: "earth",
			id: "event-Nwgx",
			startTimeInCompactUnits: 6.301029995663981,
			easedStartTime: 12.398868014680788,
			cleanedContentHTML: "Estimated time for the recovery of coral reef ecosystems from human-caused ocean acidification; a similar time was taken for the recovery of marine ecosystems after the acidification event that occurred about 65 million years ago.[32]",
			skimmableContent: "Estimated time for the recovery of coral reef ecosystems from human-caused ocean acidification."
		},
		{
			yearsFromNow: "2 million+",
			contentHTML: "The <a href=\"/wiki/Grand_Canyon\" title=\"Grand Canyon\">Grand Canyon</a> will erode further, deepening slightly, but principally widening into a broad valley surrounding the <a href=\"/wiki/Colorado_River\" title=\"Colorado River\">Colorado River</a>.<sup id=\"cite_ref-35\" class=\"reference\"><a href=\"#cite_note-35\">[33]</a></sup>",
			years: {
				base: 2000000,
				exp: 1
			},
			category: "earth",
			id: "event-tkYx",
			startTimeInCompactUnits: 6.301029995663981,
			easedStartTime: 12.398868014680788,
			cleanedContentHTML: "The Grand Canyon will erode further, deepening slightly, but principally widening into a broad valley surrounding the Colorado River.[33]",
			skimmableContent: "The Grand Canyon will erode further widening into a broad valley."
		},
		{
			yearsFromNow: "10 million",
			contentHTML: "The widening <a href=\"/wiki/East_African_Rift\" title=\"East African Rift\">East African Rift</a> valley is flooded by the <a href=\"/wiki/Red_Sea\" title=\"Red Sea\">Red Sea</a>, causing a new ocean basin to divide the continent of <a href=\"/wiki/Africa\" title=\"Africa\">Africa</a><sup id=\"cite_ref-rift_37-0\" class=\"reference\"><a href=\"#cite_note-rift-37\">[35]</a></sup> and the <a href=\"/wiki/African_Plate\" title=\"African Plate\">African Plate</a> into the newly formed Nubian Plate and the <a href=\"/wiki/Somali_Plate\" title=\"Somali Plate\">Somali Plate</a>.",
			years: {
				base: 10000000,
				exp: 1
			},
			category: "earth",
			id: "event-yqTm",
			startTimeInCompactUnits: 7,
			easedStartTime: 14.666666666666666,
			cleanedContentHTML: "The widening East African Rift valley is flooded by the Red Sea, causing a new ocean basin to divide the continent of Africa[35] and the African Plate into the newly formed Nubian Plate and the Somali Plate.",
			skimmableContent: "The widening East African Rift valley is flooded by the Red Sea, causing a new ocean basin to divide the continent of Africa."
		},
		{
			yearsFromNow: "10 million",
			contentHTML: "Estimated time for full recovery of <a href=\"/wiki/Biodiversity\" title=\"Biodiversity\">biodiversity</a> after a potential <a href=\"/wiki/Holocene_extinction\" title=\"Holocene extinction\">Holocene extinction</a>, if it were on the scale of the five previous <a href=\"/wiki/Extinction_event\" title=\"Extinction event\">major extinction events</a>.<sup id=\"cite_ref-38\" class=\"reference\"><a href=\"#cite_note-38\">[36]</a></sup><p>Even without a mass extinction, by this time most current species will have disappeared through the <a href=\"/wiki/Background_extinction_rate\" title=\"Background extinction rate\">background extinction rate</a>, with many <a href=\"/wiki/Clade\" title=\"Clade\">clades</a> gradually evolving into new forms.<sup id=\"cite_ref-39\" class=\"reference\"><a href=\"#cite_note-39\">[37]</a></sup></p>",
			years: {
				base: 10000000,
				exp: 1
			},
			category: "earth",
			id: "event-iTbh",
			startTimeInCompactUnits: 7,
			easedStartTime: 14.666666666666666,
			cleanedContentHTML: "Estimated time for full recovery of biodiversity after a potential Holocene extinction, if it were on the scale of the five previous major extinction events.[36]<p>Even without a mass extinction, by this time most current species will have disappeared through the background extinction rate, with many clades gradually evolving into new forms.[37]</p>",
			skimmableContent: "Estimated time for full recovery of biodiversity after a potential Holocene extinction."
		},
		{
			yearsFromNow: "10 to 1,000 million",
			contentHTML: "<a href=\"/wiki/Cupid_(moon)\" title=\"Cupid (moon)\">Cupid</a> and <a href=\"/wiki/Belinda_(moon)\" title=\"Belinda (moon)\">Belinda</a>, moons of <a href=\"/wiki/Uranus\" title=\"Uranus\">Uranus</a>, will likely have collided.<sup id=\"cite_ref-Uranus_32-1\" class=\"reference\"><a href=\"#cite_note-Uranus-32\">[30]</a></sup>",
			years: {
				base: 17500000,
				exp: 1
			},
			category: "solar",
			id: "event-isjh",
			startTimeInCompactUnits: 7.243038048686294,
			easedStartTime: 15.427934436588917,
			cleanedContentHTML: "Cupid and Belinda, moons of Uranus, will likely have collided.[30]",
			skimmableContent: "Cupid and Belinda, moons of Uranus, will likely have collided."
		},
		{
			yearsFromNow: "25 million",
			contentHTML: "According to <a href=\"/wiki/Christopher_R._Scotese\" class=\"mw-redirect\" title=\"Christopher R. Scotese\">Christopher R. Scotese</a>, the movement of the <a href=\"/wiki/San_Andreas_Fault\" title=\"San Andreas Fault\">San Andreas Fault</a> will cause the <a href=\"/wiki/Gulf_of_California\" title=\"Gulf of California\">Gulf of California</a> to flood into the <a href=\"/wiki/Central_Valley_(California)\" title=\"Central Valley (California)\">Central Valley</a>. This will form a new inland sea on the <a href=\"/wiki/West_Coast_of_the_United_States\" title=\"West Coast of the United States\">West Coast</a> of <a href=\"/wiki/North_America\" title=\"North America\">North America</a>.<sup id=\"cite_ref-scotese_40-0\" class=\"reference\"><a href=\"#cite_note-scotese-40\">[38]</a></sup>",
			years: {
				base: 25000000,
				exp: 1
			},
			category: "earth",
			id: "event-FLzu",
			startTimeInCompactUnits: 7.3979400086720375,
			easedStartTime: 15.906086396614693,
			cleanedContentHTML: "According to Christopher R. Scotese, the movement of the San Andreas Fault will cause the Gulf of California to flood into the Central Valley. This will form a new inland sea on the West Coast of North America.[38]",
			skimmableContent: "The San Andreas Fault will create a new inland sea on the West Coast of North America."
		},
		{
			yearsFromNow: "50 million",
			contentHTML: "Maximum estimated time before the moon <a href=\"/wiki/Phobos_(moon)\" title=\"Phobos (moon)\">Phobos</a> collides with <a href=\"/wiki/Mars\" title=\"Mars\">Mars</a>.<sup id=\"cite_ref-Bills_41-0\" class=\"reference\"><a href=\"#cite_note-Bills-41\">[39]</a></sup>",
			years: {
				base: 50000000,
				exp: 1
			},
			category: "solar",
			id: "event-kjla",
			startTimeInCompactUnits: 7.698970004336019,
			easedStartTime: 16.82001173186837,
			cleanedContentHTML: "Maximum estimated time before the moon Phobos collides with Mars.[39]",
			skimmableContent: "Maximum estimated time before the moon Phobos collides with Mars."
		},
		{
			yearsFromNow: "50 million",
			contentHTML: "According to Christopher R. Scotese, the movement of the <a href=\"/wiki/San_Andreas_Fault\" title=\"San Andreas Fault\">San Andreas Fault</a> will cause the current locations of Los Angeles and San Francisco to merge.<sup id=\"cite_ref-scotese_40-1\" class=\"reference\"><a href=\"#cite_note-scotese-40\">[38]</a></sup> The Californian coast will begin to be subducted into the <a href=\"/wiki/Aleutian_Trench\" title=\"Aleutian Trench\">Aleutian Trench</a>.<sup id=\"cite_ref-trench_42-0\" class=\"reference\"><a href=\"#cite_note-trench-42\">[40]</a></sup><p>Africa's collision with <a href=\"/wiki/Eurasia\" title=\"Eurasia\">Eurasia</a> closes the <a href=\"/wiki/Mediterranean_Basin\" title=\"Mediterranean Basin\">Mediterranean Basin</a> and creates a mountain range similar to the <a href=\"/wiki/Himalayas\" title=\"Himalayas\">Himalayas</a>.<sup id=\"cite_ref-medi_43-0\" class=\"reference\"><a href=\"#cite_note-medi-43\">[41]</a></sup></p><p>The <a href=\"/wiki/Appalachian_Mountains\" title=\"Appalachian Mountains\">Appalachian Mountains</a> peaks will largely erode away,<sup id=\"cite_ref-44\" class=\"reference\"><a href=\"#cite_note-44\">[42]</a></sup> weathering at 5.7 <a href=\"/wiki/Bubnoff_unit\" title=\"Bubnoff unit\">Bubnoff units</a>, although topography will actually rise as regional <a href=\"/wiki/Valley\" title=\"Valley\">valleys</a> deepen at twice this rate.<sup id=\"cite_ref-45\" class=\"reference\"><a href=\"#cite_note-45\">[43]</a></sup></p>",
			years: {
				base: 50000000,
				exp: 1
			},
			category: "earth",
			id: "event-TDas",
			startTimeInCompactUnits: 7.698970004336019,
			easedStartTime: 16.82001173186837,
			cleanedContentHTML: "According to Christopher R. Scotese, the movement of the San Andreas Fault will cause the current locations of Los Angeles and San Francisco to merge.[38] The Californian coast will begin to be subducted into the Aleutian Trench.[40]<p>Africa's collision with Eurasia closes the Mediterranean Basin and creates a mountain range similar to the Himalayas.[41]</p><p>The Appalachian Mountains peaks will largely erode away,[42] weathering at 5.7 Bubnoff units, although topography will actually rise as regional valleys deepen at twice this rate.[43]</p>",
			skimmableContent: "The San Andreas Fault will cause the current locations of Los Angeles and San Francisco to merge.Africa's collision with Eurasia closes the Mediterranean Basin and creates a mountain range similar to the Himalayas."
		},
		{
			yearsFromNow: "50–60 million",
			contentHTML: "The <a href=\"/wiki/Canadian_Rockies\" title=\"Canadian Rockies\">Canadian Rockies</a> will erode away to a plain, assuming a rate of 60 <a href=\"/wiki/Bubnoff_unit\" title=\"Bubnoff unit\">Bubnoff units</a>.<sup id=\"cite_ref-46\" class=\"reference\"><a href=\"#cite_note-46\">[44]</a></sup> The <a href=\"/wiki/Southern_Rocky_Mountains\" title=\"Southern Rocky Mountains\">Southern Rockies</a> in the United States are eroding at a somewhat slower rate.<sup id=\"cite_ref-47\" class=\"reference\"><a href=\"#cite_note-47\">[45]</a></sup>",
			years: {
				base: 55000000,
				exp: 1
			},
			category: "earth",
			id: "event-Mdhj",
			startTimeInCompactUnits: 7.740362689494244,
			easedStartTime: 16.944128460419705,
			cleanedContentHTML: "The Canadian Rockies will erode away to a plain, assuming a rate of 60 Bubnoff units.[44] The Southern Rockies in the United States are eroding at a somewhat slower rate.[45]",
			skimmableContent: "The Canadian Rockies will erode away."
		},
		{
			yearsFromNow: "50–400 million",
			contentHTML: "Estimated time for Earth to naturally replenish its <a href=\"/wiki/Fossil_fuel\" title=\"Fossil fuel\">fossil fuel</a> reserves.<sup id=\"cite_ref-48\" class=\"reference\"><a href=\"#cite_note-48\">[46]</a></sup>",
			years: {
				base: 65000000,
				exp: 1
			},
			category: "earth",
			id: "event-WkFj",
			startTimeInCompactUnits: 7.812913356642856,
			easedStartTime: 17.16078173990676,
			cleanedContentHTML: "Estimated time for Earth to naturally replenish its fossil fuel reserves.[46]",
			skimmableContent: "Estimated time for Earth to naturally replenish its fossil fuel reserves."
		},
		{
			yearsFromNow: "80 million",
			contentHTML: "The <a href=\"/wiki/Hawaii_(island)\" title=\"Hawaii (island)\">Big Island</a> will have become the last of the current <a href=\"/wiki/Hawaiian_Islands\" title=\"Hawaiian Islands\">Hawaiian Islands</a> to sink beneath the surface of the ocean, while a more recently formed chain of \"new Hawaiian Islands\" will then have emerged in their place.<sup id=\"cite_ref-49\" class=\"reference\"><a href=\"#cite_note-49\">[47]</a></sup>",
			years: {
				base: 80000000,
				exp: 1
			},
			category: "earth",
			id: "event-YcHN",
			startTimeInCompactUnits: 7.903089986991944,
			easedStartTime: 17.428499815823454,
			cleanedContentHTML: "The Big Island will have become the last of the current Hawaiian Islands to sink beneath the surface of the ocean, while a more recently formed chain of \"new Hawaiian Islands\" will then have emerged in their place.[47]",
			skimmableContent: "The Big Island will have become the last of the current Hawaiian Islands to sink."
		},
		{
			yearsFromNow: "100 million",
			contentHTML: "Earth will likely have been hit by an asteroid comparable in size to the one that triggered the <a href=\"/wiki/Cretaceous%E2%80%93Paleogene_extinction_event\" title=\"Cretaceous–Paleogene extinction event\">K–Pg extinction</a> 66 million years ago, <a href=\"/wiki/Asteroid-impact_avoidance\" class=\"mw-redirect\" title=\"Asteroid-impact avoidance\">assuming it cannot be averted</a>.<sup id=\"cite_ref-kpg1_50-0\" class=\"reference\"><a href=\"#cite_note-kpg1-50\">[48]</a></sup>",
			years: {
				base: 100000000,
				exp: 1
			},
			category: "earth",
			id: "event-bafq",
			startTimeInCompactUnits: 8,
			easedStartTime: 17.714285714285715,
			cleanedContentHTML: "Earth will likely have been hit by an asteroid comparable in size to the one that triggered the K–Pg extinction 66 million years ago, assuming it cannot be averted.[48]",
			skimmableContent: "Earth will likely have been hit by an asteroid comparable in size to the one that triggered the K–Pg extinction 66 million years ago."
		},
		{
			yearsFromNow: "100 million",
			contentHTML: "Upper estimate for lifespan of the <a href=\"/wiki/Rings_of_Saturn\" title=\"Rings of Saturn\">rings of Saturn</a> in their current state.<sup id=\"cite_ref-51\" class=\"reference\"><a href=\"#cite_note-51\">[49]</a></sup>",
			years: {
				base: 100000000,
				exp: 1
			},
			category: "solar",
			id: "event-JkCa",
			startTimeInCompactUnits: 8,
			easedStartTime: 17.714285714285715,
			cleanedContentHTML: "Upper estimate for lifespan of the rings of Saturn in their current state.[49]",
			skimmableContent: "The rings of Saturn will fall apart."
		},
		{
			yearsFromNow: "110 million",
			contentHTML: "The Sun's luminosity has increased by 1%.<sup id=\"cite_ref-52\" class=\"reference\"><a href=\"#cite_note-52\">[50]</a></sup>",
			years: {
				base: 110000000,
				exp: 1
			},
			category: "solar",
			id: "event-BjSI",
			startTimeInCompactUnits: 8.041392685158225,
			easedStartTime: 17.835749961896035,
			cleanedContentHTML: "The Sun's luminosity has increased by 1%.[50]",
			skimmableContent: "The Sun's luminosity will increase by 1%."
		},
		{
			yearsFromNow: "240 million",
			contentHTML: "From its present position, the <a href=\"/wiki/Solar_System\" title=\"Solar System\">Solar System</a> completes <a href=\"/wiki/Galactic_year\" title=\"Galactic year\">one full orbit</a> of the <a href=\"/wiki/Galactic_center\" class=\"mw-redirect\" title=\"Galactic center\">Galactic center</a>.<sup id=\"cite_ref-galyear_55-0\" class=\"reference\"><a href=\"#cite_note-galyear-55\">[53]</a></sup>",
			years: {
				base: 240000000,
				exp: 1
			},
			category: "solar",
			id: "event-Kmiu",
			startTimeInCompactUnits: 8.380211241711606,
			easedStartTime: 18.81667192759605,
			cleanedContentHTML: "From its present position, the Solar System completes one full orbit of the Galactic center.[53]",
			skimmableContent: "The Solar System completes one full orbit of the Galactic center."
		},
		{
			yearsFromNow: "250 million",
			contentHTML: "According to Christopher R. Scotese, due to the northward movement of the West Coast of North America, the coast of California will collide with Alaska.<sup id=\"cite_ref-scotese_40-3\" class=\"reference\"><a href=\"#cite_note-scotese-40\">[38]</a></sup>",
			years: {
				base: 250000000,
				exp: 1
			},
			category: "earth",
			id: "event-tNdY",
			startTimeInCompactUnits: 8.397940008672037,
			easedStartTime: 18.86735448781092,
			cleanedContentHTML: "According to Christopher R. Scotese, due to the northward movement of the West Coast of North America, the coast of California will collide with Alaska.[38]",
			skimmableContent: "The coast of California will collide with Alaska."
		},
		{
			yearsFromNow: "~250 million",
			contentHTML: "Rapid <a href=\"/wiki/Biological_evolution\" class=\"mw-redirect\" title=\"Biological evolution\">biological evolution</a> may occur due to the formation of a supercontinent, causing lower temperatures and higher oxygen levels.<sup id=\"cite_ref-59\" class=\"reference\"><a href=\"#cite_note-59\">[57]</a></sup>",
			years: {
				base: 250000000,
				exp: 1
			},
			category: "earth",
			id: "event-EhBu",
			startTimeInCompactUnits: 8.397940008672037,
			easedStartTime: 18.86735448781092,
			cleanedContentHTML: "Rapid biological evolution may occur due to the formation of a supercontinent, causing lower temperatures and higher oxygen levels.[57]",
			skimmableContent: "Rapid biological evolution may occur due to the formation of a supercontinent."
		},
		{
			yearsFromNow: "250–350 million",
			contentHTML: "All the continents on Earth may fuse into a <a href=\"/wiki/Supercontinent\" title=\"Supercontinent\">supercontinent</a>. Three potential arrangements of this configuration have been dubbed <a href=\"/wiki/Amasia_(continent)\" title=\"Amasia (continent)\">Amasia</a>, <a href=\"/wiki/Novopangaea\" title=\"Novopangaea\">Novopangaea</a>, and <a href=\"/wiki/Pangaea_Ultima\" title=\"Pangaea Ultima\">Pangaea Ultima</a>.<sup id=\"cite_ref-scotese_40-4\" class=\"reference\"><a href=\"#cite_note-scotese-40\">[38]</a></sup><sup id=\"cite_ref-Williams_Nield_2007_56-0\" class=\"reference\"><a href=\"#cite_note-Williams_Nield_2007-56\">[54]</a></sup> This will likely result in a glacial period, lowering sea levels and increasing oxygen levels, further lowering global temperatures.<sup id=\"cite_ref-57\" class=\"reference\"><a href=\"#cite_note-57\">[55]</a></sup><sup id=\"cite_ref-58\" class=\"reference\"><a href=\"#cite_note-58\">[56]</a></sup>",
			years: {
				base: 300000000,
				exp: 1
			},
			category: "earth",
			id: "event-SSGb",
			startTimeInCompactUnits: 8.477121254719663,
			easedStartTime: 19.092945547712414,
			cleanedContentHTML: "All the continents on Earth may fuse into a supercontinent. Three potential arrangements of this configuration have been dubbed Amasia, Novopangaea, and Pangaea Ultima.[38][54] This will likely result in a glacial period, lowering sea levels and increasing oxygen levels, further lowering global temperatures.[55][56]",
			skimmableContent: "All the continents on Earth may fuse into a supercontinent."
		},
		{
			yearsFromNow: "300–600 million",
			contentHTML: "Estimated time for <a href=\"/wiki/Venus\" title=\"Venus\">Venus</a>'s mantle temperature to reach its maximum. Then, over a period of about 100 million years, major subduction occurs and the crust is recycled.<sup id=\"cite_ref-Strom1994_60-0\" class=\"reference\"><a href=\"#cite_note-Strom1994-60\">[58]</a></sup>",
			years: {
				base: 325000000,
				exp: 1
			},
			category: "solar",
			id: "event-GMTf",
			startTimeInCompactUnits: 8.511883360978874,
			easedStartTime: 19.19158861482875,
			cleanedContentHTML: "Estimated time for Venus's mantle temperature to reach its maximum. Then, over a period of about 100 million years, major subduction occurs and the crust is recycled.[58]",
			skimmableContent: "Estimated time for Venus's mantle temperature to reach its maximum."
		},
		{
			yearsFromNow: "350 million",
			contentHTML: "According to the extroversion model, first developed by <a href=\"/wiki/Paul_F._Hoffman\" title=\"Paul F. Hoffman\">Paul F. Hoffman</a> the <a href=\"/wiki/Pacific_ocean\" class=\"mw-redirect\" title=\"Pacific ocean\">Pacific Ocean</a> will close completely.<sup id=\"cite_ref-61\" class=\"reference\"><a href=\"#cite_note-61\">[59]</a></sup><sup id=\"cite_ref-62\" class=\"reference\"><a href=\"#cite_note-62\">[60]</a></sup><sup id=\"cite_ref-Williams_Nield_2007_56-1\" class=\"reference\"><a href=\"#cite_note-Williams_Nield_2007-56\">[54]</a></sup>",
			years: {
				base: 350000000,
				exp: 1
			},
			category: "earth",
			id: "event-rRha",
			startTimeInCompactUnits: 8.544068044350276,
			easedStartTime: 19.28270362794239,
			cleanedContentHTML: "According to the extroversion model, first developed by Paul F. Hoffman the Pacific Ocean will close completely.[59][60][54]",
			skimmableContent: "The Pacific Ocean will be gone."
		},
		{
			yearsFromNow: "400–500 million",
			contentHTML: "The supercontinent (Pangaea Ultima, Novopangaea, or Amasia) will likely have rifted apart.<sup id=\"cite_ref-Williams_Nield_2007_56-2\" class=\"reference\"><a href=\"#cite_note-Williams_Nield_2007-56\">[54]</a></sup> This will likely result in higher global temperatures, similar to the <a href=\"/wiki/Cretaceous_period\" class=\"mw-redirect\" title=\"Cretaceous period\">Cretaceous period</a>.<sup id=\"cite_ref-63\" class=\"reference\"><a href=\"#cite_note-63\">[61]</a></sup>",
			years: {
				base: 400000000,
				exp: 1
			},
			category: "earth",
			id: "event-gWSt",
			startTimeInCompactUnits: 8.602059991327963,
			easedStartTime: 19.44636153135249,
			cleanedContentHTML: "The supercontinent (Pangaea Ultima, Novopangaea, or Amasia) will likely have rifted apart.[54] This will likely result in higher global temperatures, similar to the Cretaceous period.[61]",
			skimmableContent: "The supercontinent will likely have rifted apart."
		},
		{
			yearsFromNow: "500 million",
			contentHTML: "Estimated time until a <a href=\"/wiki/Gamma-ray_burst\" title=\"Gamma-ray burst\">gamma-ray burst</a>, or massive, hyperenergetic supernova, occurs within 6,500 light-years of Earth; close enough for its rays to affect Earth's <a href=\"/wiki/Ozone_layer\" title=\"Ozone layer\">ozone layer</a> and potentially trigger a <a href=\"/wiki/Extinction_event\" title=\"Extinction event\">mass extinction</a>, assuming the hypothesis is correct that a previous such explosion triggered the <a href=\"/wiki/Ordovician%E2%80%93Silurian_extinction_events\" title=\"Ordovician–Silurian extinction events\">Ordovician–Silurian extinction event</a>. However, the supernova would have to be precisely oriented relative to Earth to have any negative effect.<sup id=\"cite_ref-natgeo_64-0\" class=\"reference\"><a href=\"#cite_note-natgeo-64\">[62]</a></sup>",
			years: {
				base: 500000000,
				exp: 1
			},
			category: "earth",
			id: "event-KmRd",
			startTimeInCompactUnits: 8.698970004336019,
			easedStartTime: 19.718373180225726,
			cleanedContentHTML: "Estimated time until a gamma-ray burst, or massive, hyperenergetic supernova, occurs within 6,500 light-years of Earth; close enough for its rays to affect Earth's ozone layer and potentially trigger a mass extinction, assuming the hypothesis is correct that a previous such explosion triggered the Ordovician–Silurian extinction event. However, the supernova would have to be precisely oriented relative to Earth to have any negative effect.[62]",
			skimmableContent: "A gamma-ray burst, or massive, hyperenergetic supernova, occurs within 6,500 light-years of Earth, potentially triggering a mass extinction."
		},
		{
			yearsFromNow: "600 million",
			contentHTML: "<a href=\"/wiki/Tidal_acceleration\" title=\"Tidal acceleration\">Tidal acceleration</a> moves the <a href=\"/wiki/Moon\" title=\"Moon\">Moon</a> far enough from Earth that total <a href=\"/wiki/Solar_eclipse\" title=\"Solar eclipse\">solar eclipses</a> are no longer possible.<sup id=\"cite_ref-600mil_65-0\" class=\"reference\"><a href=\"#cite_note-600mil-65\">[63]</a></sup>",
			years: {
				base: 600000000,
				exp: 1
			},
			category: "earth",
			id: "event-dYim",
			startTimeInCompactUnits: 8.778151250383644,
			easedStartTime: 19.93926295146269,
			cleanedContentHTML: "Tidal acceleration moves the Moon far enough from Earth that total solar eclipses are no longer possible.[63]",
			skimmableContent: "Tidal acceleration moves the Moon far enough from Earth that total solar eclipses are no longer possible."
		},
		{
			yearsFromNow: "600 million",
			contentHTML: "The Sun's increasing luminosity begins to disrupt the <a href=\"/wiki/Carbonate%E2%80%93silicate_cycle\" title=\"Carbonate–silicate cycle\">carbonate–silicate cycle</a>; higher luminosity increases <a href=\"/wiki/Weathering\" title=\"Weathering\">weathering</a> of surface rocks, which traps <a href=\"/wiki/Carbon_dioxide\" title=\"Carbon dioxide\">carbon dioxide</a> in the ground as carbonate. As water evaporates from the Earth's surface, rocks harden, causing <a href=\"/wiki/Plate_tectonics\" title=\"Plate tectonics\">plate tectonics</a> to slow and eventually stop. Without volcanoes to recycle carbon into the Earth's atmosphere, carbon dioxide levels begin to fall.<sup id=\"cite_ref-swansong_66-0\" class=\"reference\"><a href=\"#cite_note-swansong-66\">[64]</a></sup> By this time, carbon dioxide levels will fall to the point at which <a href=\"/wiki/C3_carbon_fixation\" title=\"C3 carbon fixation\">C<sub>3</sub> photosynthesis</a> is no longer possible. All plants that utilize C<sub>3</sub> photosynthesis (≈99 percent of present-day species) will die.<sup id=\"cite_ref-Heath_Doyle_2009_67-0\" class=\"reference\"><a href=\"#cite_note-Heath_Doyle_2009-67\">[65]</a></sup>",
			years: {
				base: 600000000,
				exp: 1
			},
			category: "earth",
			id: "event-qvJH",
			startTimeInCompactUnits: 8.778151250383644,
			easedStartTime: 19.93926295146269,
			cleanedContentHTML: "The Sun's increasing luminosity begins to disrupt the carbonate–silicate cycle; higher luminosity increases weathering of surface rocks, which traps carbon dioxide in the ground as carbonate. As water evaporates from the Earth's surface, rocks harden, causing plate tectonics to slow and eventually stop. Without volcanoes to recycle carbon into the Earth's atmosphere, carbon dioxide levels begin to fall.[64] By this time, carbon dioxide levels will fall to the point at which C3 photosynthesis is no longer possible. All plants that utilize C3 photosynthesis (≈99 percent of present-day species) will die.[65]",
			skimmableContent: "Carbon dioxide levels will fall to the point at which C3 photosynthesis is no longer possible. Approximately 99 percent of present-day species of plants will die."
		},
		{
			yearsFromNow: "700–800 million",
			contentHTML: "The death of most <a href=\"/wiki/Plant_life\" class=\"mw-redirect\" title=\"Plant life\">plant life</a> will result in less <a href=\"/wiki/Oxygen\" title=\"Oxygen\">oxygen</a> in the <a href=\"/wiki/Atmosphere\" title=\"Atmosphere\">atmosphere</a>, allowing for more <a href=\"/wiki/DNA\" title=\"DNA\">DNA</a>-damaging <a href=\"/wiki/Ultraviolet_radiation\" class=\"mw-redirect\" title=\"Ultraviolet radiation\">ultraviolet radiation</a> to reach the surface. The rising temperatures will increase chemical reactions in the atmosphere, further lowering oxygen levels. Flying animals would be better off because of their ability to travel large distances looking for cooler temperatures.<sup id=\"cite_ref-68\" class=\"reference\"><a href=\"#cite_note-68\">[66]</a></sup> Many animals may be driven to the poles or possibly underground. These creatures would become active during the <a href=\"/wiki/Polar_night\" title=\"Polar night\">polar night</a> and hibernate during the <a href=\"/wiki/Polar_day\" class=\"mw-redirect\" title=\"Polar day\">polar day</a> due to the intense heat and radiation. Much of the land would become a barren desert, and plants and animals would primarily be found in the oceans.<sup id=\"cite_ref-69\" class=\"reference\"><a href=\"#cite_note-69\">[67]</a></sup>",
			years: {
				base: 700000000,
				exp: 1
			},
			category: "earth",
			id: "event-fZQb",
			startTimeInCompactUnits: 8.845098040014257,
			easedStartTime: 20.125076475598583,
			cleanedContentHTML: "The death of most plant life will result in less oxygen in the atmosphere, allowing for more DNA-damaging ultraviolet radiation to reach the surface. The rising temperatures will increase chemical reactions in the atmosphere, further lowering oxygen levels. Flying animals would be better off because of their ability to travel large distances looking for cooler temperatures.[66] Many animals may be driven to the poles or possibly underground. These creatures would become active during the polar night and hibernate during the polar day due to the intense heat and radiation. Much of the land would become a barren desert, and plants and animals would primarily be found in the oceans.[67]",
			skimmableContent: "The death of most plant life will result in less oxygen in the atmosphere, allowing for more DNA-damaging ultraviolet radiation to reach the surface.  Much of the land will become a barren desert."
		},
		{
			yearsFromNow: "800 million",
			contentHTML: "Carbon dioxide levels fall to the point at which <a href=\"/wiki/C4_carbon_fixation\" title=\"C4 carbon fixation\">C<sub>4</sub> photosynthesis</a> is no longer possible.<sup id=\"cite_ref-Heath_Doyle_2009_67-1\" class=\"reference\"><a href=\"#cite_note-Heath_Doyle_2009-67\">[65]</a></sup> Without plant life to recycle oxygen in the atmosphere, free oxygen and the ozone layer will disappear from the atmosphere allowing for intense levels of deadly UV light to reach the surface. In the book <i>The Life and Death of Planet Earth</i>, authors <a href=\"/wiki/Peter_D._Ward\" class=\"mw-redirect\" title=\"Peter D. Ward\">Peter D. Ward</a> and <a href=\"/wiki/Donald_Brownlee\" class=\"mw-redirect\" title=\"Donald Brownlee\">Donald Brownlee</a> stated that some animal life may be able to survive in the oceans. Eventually, however, all multicellular life will die out.<sup id=\"cite_ref-bd2_6_1665_70-0\" class=\"reference\"><a href=\"#cite_note-bd2_6_1665-70\">[68]</a></sup> The only life left on the Earth after this will be single-celled organisms.",
			years: {
				base: 800000000,
				exp: 1
			},
			category: "earth",
			id: "event-FJXe",
			startTimeInCompactUnits: 8.903089986991944,
			easedStartTime: 20.285339697695548,
			cleanedContentHTML: "Carbon dioxide levels fall to the point at which C4 photosynthesis is no longer possible.[65] Without plant life to recycle oxygen in the atmosphere, free oxygen and the ozone layer will disappear from the atmosphere allowing for intense levels of deadly UV light to reach the surface. In the book <i>The Life and Death of Planet Earth</i>, authors Peter D. Ward and Donald Brownlee stated that some animal life may be able to survive in the oceans. Eventually, however, all multicellular life will die out.[68] The only life left on the Earth after this will be single-celled organisms.",
			skimmableContent: "The only life left on the Earth after this will be single-celled organisms."
		},
		{
			yearsFromNow: "1 billion",
			contentHTML: "27% of the ocean's mass will have been subducted into the mantle. If this were to continue uninterrupted, it would reach an equilibrium where 65% of the surface water would remain at the surface.<sup id=\"cite_ref-hess5_4_569_72-0\" class=\"reference\"><a href=\"#cite_note-hess5_4_569-72\">[69]</a></sup>",
			years: {
				base: 1000000000,
				exp: 1
			},
			category: "earth",
			id: "event-NmEe",
			startTimeInCompactUnits: 9,
			easedStartTime: 20.551724137931036,
			cleanedContentHTML: "27% of the ocean's mass will have been subducted into the mantle. If this were to continue uninterrupted, it would reach an equilibrium where 65% of the surface water would remain at the surface.[69]",
			skimmableContent: "27% of the ocean's mass will have been subducted into the mantle."
		},
		{
			yearsFromNow: "1.1 billion",
			contentHTML: "The Sun's luminosity has risen by 10%, causing Earth's surface temperatures to reach an average of c. 320&nbsp;K (47&nbsp;°C; 116&nbsp;°F). The atmosphere will become a \"moist greenhouse\", resulting in a runaway evaporation of the oceans.<sup id=\"cite_ref-swansong_66-1\" class=\"reference\"><a href=\"#cite_note-swansong-66\">[64]</a></sup><sup id=\"cite_ref-mnras386_1_73-0\" class=\"reference\"><a href=\"#cite_note-mnras386_1-73\">[70]</a></sup> This would cause plate tectonics to stop completely, if not already stopped before this time.<sup id=\"cite_ref-FOOTNOTEBrownlee201095_74-0\" class=\"reference\"><a href=\"#cite_note-FOOTNOTEBrownlee201095-74\">[71]</a></sup> Pockets of water may still be present at the poles, allowing abodes for simple life.<sup id=\"cite_ref-abode_75-0\" class=\"reference\"><a href=\"#cite_note-abode-75\">[72]</a></sup><sup id=\"cite_ref-pressure_76-0\" class=\"reference\"><a href=\"#cite_note-pressure-76\">[73]</a></sup>",
			years: {
				base: 1100000000,
				exp: 1
			},
			category: "earth",
			id: "event-MAMN",
			startTimeInCompactUnits: 9.041392685158225,
			easedStartTime: 20.664961733137794,
			cleanedContentHTML: "The Sun's luminosity has risen by 10%, causing Earth's surface temperatures to reach an average of c. 320 K (47 °C; 116 °F). The atmosphere will become a \"moist greenhouse\", resulting in a runaway evaporation of the oceans. This would cause plate tectonics to stop completely, if not already stopped before this time. Pockets of water may still be present at the poles, allowing abodes for simple life.",
			skimmableContent: "The Sun's luminosity has risen by 10%, causing Earth's surface temperatures to reach an average of 320 Kelvin (or 47 degrees Celsius or 116 degrees Fahrenheit). Pockets of water may still be present at the poles, allowing abodes for simple life."
		},
		{
			yearsFromNow: "1.3 billion",
			contentHTML: "<a href=\"/wiki/Eukaryote\" title=\"Eukaryote\">Eukaryotic</a> life dies out on Earth due to carbon dioxide starvation. Only <a href=\"/wiki/Prokaryote\" title=\"Prokaryote\">prokaryotes</a> remain.<sup id=\"cite_ref-bd2_6_1665_70-1\" class=\"reference\"><a href=\"#cite_note-bd2_6_1665-70\">[68]</a></sup>",
			years: {
				base: 1300000000,
				exp: 1
			},
			category: "earth",
			id: "event-kOYo",
			startTimeInCompactUnits: 9.113943352306837,
			easedStartTime: 20.86266116137637,
			cleanedContentHTML: "Eukaryotic life dies out on Earth due to carbon dioxide starvation. Only prokaryotes remain.[68]",
			skimmableContent: "Eukaryotic life dies out on Earth due to carbon dioxide starvation. Only prokaryotes remain."
		},
		{
			yearsFromNow: "1.5–1.6 billion",
			contentHTML: "The Sun's rising luminosity causes its <a href=\"/wiki/Circumstellar_habitable_zone\" title=\"Circumstellar habitable zone\">circumstellar habitable zone</a> to move outwards; as <a href=\"/wiki/Carbon_dioxide\" title=\"Carbon dioxide\">carbon dioxide</a> rises in <a href=\"/wiki/Mars\" title=\"Mars\">Mars</a>'s atmosphere, its surface temperature rises to levels akin to Earth during the <a href=\"/wiki/Ice_age\" title=\"Ice age\">ice age</a>.<sup id=\"cite_ref-bd2_6_1665_70-2\" class=\"reference\"><a href=\"#cite_note-bd2_6_1665-70\">[68]</a></sup><sup id=\"cite_ref-mars_80-0\" class=\"reference\"><a href=\"#cite_note-mars-80\">[77]</a></sup>",
			years: {
				base: 1500000000,
				exp: 1
			},
			category: "earth",
			id: "event-LQNY",
			startTimeInCompactUnits: 9.176091259055681,
			easedStartTime: 21.031231375625616,
			cleanedContentHTML: "The Sun's rising luminosity causes its circumstellar habitable zone to move outwards; as carbon dioxide rises in Mars's atmosphere, its surface temperature rises to levels akin to Earth during the ice age.[68][77]",
			skimmableContent: "Mars's surface temperature rises to levels akin to Earth during the ice age."
		},
		{
			yearsFromNow: "2 billion",
			contentHTML: "High estimate until the Earth's oceans evaporate if the atmospheric pressure were to decrease via the <a href=\"/wiki/Nitrogen_cycle\" title=\"Nitrogen cycle\">nitrogen cycle</a>.<sup id=\"cite_ref-pnas106_24_81-0\" class=\"reference\"><a href=\"#cite_note-pnas106_24-81\">[78]</a></sup>",
			years: {
				base: 2000000000,
				exp: 1
			},
			category: "earth",
			id: "event-AtPG",
			startTimeInCompactUnits: 9.301029995663981,
			easedStartTime: 21.36795189995198,
			cleanedContentHTML: "High estimate until the Earth's oceans evaporate if the atmospheric pressure were to decrease via the nitrogen cycle.[78]",
			skimmableContent: "Earth's oceans evaporate."
		},
		{
			yearsFromNow: "2.3 billion",
			contentHTML: "The Earth's <a href=\"/wiki/Outer_core\" class=\"mw-redirect\" title=\"Outer core\">outer core</a> freezes, if the <a href=\"/wiki/Inner_core\" class=\"mw-redirect\" title=\"Inner core\">inner core</a> continues to grow at its current rate of 1&nbsp;mm (0.039&nbsp;in) per year.<sup id=\"cite_ref-ng4_264_82-0\" class=\"reference\"><a href=\"#cite_note-ng4_264-82\">[79]</a></sup><sup id=\"cite_ref-compo_83-0\" class=\"reference\"><a href=\"#cite_note-compo-83\">[80]</a></sup> Without its liquid outer core, the <a href=\"/wiki/Earth%27s_magnetic_field\" title=\"Earth's magnetic field\">Earth's magnetic field</a> shuts down,<sup id=\"cite_ref-magnet_84-0\" class=\"reference\"><a href=\"#cite_note-magnet-84\">[81]</a></sup> and charged particles emanating from the <a href=\"/wiki/Sun\" title=\"Sun\">Sun</a> gradually deplete the atmosphere.<sup id=\"cite_ref-85\" class=\"reference\"><a href=\"#cite_note-85\">[82]</a></sup>",
			years: {
				base: 2300000000,
				exp: 1
			},
			category: "earth",
			id: "event-Auxw",
			startTimeInCompactUnits: 9.361727836017593,
			easedStartTime: 21.53050348849983,
			cleanedContentHTML: "The Earth's outer core freezes, if the inner core continues to grow at its current rate of 1 mm (0.039 in) per year.[79][80] Without its liquid outer core, the Earth's magnetic field shuts down,[81] and charged particles emanating from the Sun gradually deplete the atmosphere.[82]",
			skimmableContent: "The Earth's outer core freezes. Without its liquid outer core, the Earth's magnetic field shuts down, and charged particles emanating from the Sun gradually deplete the atmosphere."
		},
		{
			yearsFromNow: "2.55 billion",
			contentHTML: "The Sun will have reached a maximum surface temperature of 5,820 K. From then on, it will become gradually cooler while its luminosity will continue to increase.<sup id=\"cite_ref-mnras386_1_73-1\" class=\"reference\"><a href=\"#cite_note-mnras386_1-73\">[70]</a></sup>",
			years: {
				base: 2550000000,
				exp: 1
			},
			category: "solar",
			id: "event-pBcr",
			startTimeInCompactUnits: 9.406540180433955,
			easedStartTime: 21.650082401295272,
			cleanedContentHTML: "The Sun will have reached a maximum surface temperature of 5,820 K. From then on, it will become gradually cooler while its luminosity will continue to increase.[70]",
			skimmableContent: "The Sun will have reached a maximum surface temperature of 5,820 Kelvin. From then on, it will become gradually cooler while its luminosity will continue to increase."
		},
		{
			yearsFromNow: "2.8 billion",
			contentHTML: "Earth's surface temperature reaches c. 420&nbsp;K (147&nbsp;°C; 296&nbsp;°F), even at the poles. At this point, all life, now reduced to unicellular colonies in isolated, scattered microenvironments such as high-altitude lakes or subsurface caves, will go extinct.<sup id=\"cite_ref-swansong_66-2\" class=\"reference\"><a href=\"#cite_note-swansong-66\">[64]</a></sup><sup id=\"cite_ref-global1_86-0\" class=\"reference\"><a href=\"#cite_note-global1-86\">[83]</a></sup>",
			years: {
				base: 2800000000,
				exp: 1
			},
			category: "earth",
			id: "event-bctp",
			startTimeInCompactUnits: 9.44715803134222,
			easedStartTime: 21.758154129925646,
			cleanedContentHTML: "Earth's surface temperature reaches c. 420 K (147 °C; 296 °F), even at the poles. At this point, all life, now reduced to unicellular colonies in isolated, scattered microenvironments such as high-altitude lakes or subsurface caves, will go extinct.[64][83]",
			skimmableContent: "Earth's surface temperature reaches 420 Kelvin or 147 degrees celsius or 296 degrees fahrenheit, even at the poles. All life, now reduced to unicellular colonies in isolated, scattered microenvironments such as high-altitude lakes or subsurface caves, will go extinct."
		},
		{
			yearsFromNow: "c. 3 billion",
			contentHTML: "There is a roughly 1-in-100,000 chance that the Earth might be ejected into interstellar space by a stellar encounter before this point, and a 1-in-3-million chance that it will then be captured by another star. Were this to happen, life, assuming it survived the interstellar journey, could potentially continue for far longer.<sup id=\"cite_ref-FOOTNOTEAdams200833–44_87-0\" class=\"reference\"><a href=\"#cite_note-FOOTNOTEAdams200833–44-87\">[84]</a></sup>",
			years: {
				base: 3000000000,
				exp: 1
			},
			category: "earth",
			id: "event-uXtT",
			startTimeInCompactUnits: 9.477121254719663,
			easedStartTime: 21.83768624858168,
			cleanedContentHTML: "There is a roughly 1-in-100,000 chance that the Earth might be ejected into interstellar space by a stellar encounter before this point, and a 1-in-3-million chance that it will then be captured by another star. Were this to happen, life, assuming it survived the interstellar journey, could potentially continue for far longer.[84]",
			skimmableContent: "There is a roughly 1-in-100,000 chance that the Earth might be ejected into interstellar space by a stellar encounter before this point, and a 1-in-3-million chance that it will then be captured by another star."
		},
		{
			yearsFromNow: "3 billion",
			contentHTML: "<a href=\"/wiki/Median\" title=\"Median\">Median</a> point at which the Moon's rising distance from the Earth lessens its stabilising effect on the Earth's <a href=\"/wiki/Axial_tilt\" title=\"Axial tilt\">axial tilt</a>. As a consequence, Earth's <a href=\"/wiki/True_polar_wander\" title=\"True polar wander\">true polar wander</a> becomes chaotic and extreme, leading to dramatic shifts in the planet's climate due to the changing axial tilt.<sup id=\"cite_ref-wander_88-0\" class=\"reference\"><a href=\"#cite_note-wander-88\">[85]</a></sup>",
			years: {
				base: 3000000000,
				exp: 1
			},
			category: "earth",
			id: "event-Ctyq",
			startTimeInCompactUnits: 9.477121254719663,
			easedStartTime: 21.83768624858168,
			cleanedContentHTML: "Median point at which the Moon's rising distance from the Earth lessens its stabilising effect on the Earth's axial tilt. As a consequence, Earth's true polar wander becomes chaotic and extreme, leading to dramatic shifts in the planet's climate due to the changing axial tilt.[85]",
			skimmableContent: "Median point at which the Moon's rising distance from the Earth lessens its stabilising effect on the Earth's axial tilt. As a consequence, Earth's true polar wander becomes chaotic and extreme"
		},
		{
			yearsFromNow: "3.3 billion",
			contentHTML: "1% chance that <a href=\"/wiki/Jupiter\" title=\"Jupiter\">Jupiter</a>'s gravity may make <a href=\"/wiki/Mercury_(planet)\" title=\"Mercury (planet)\">Mercury</a>'s orbit so <a href=\"/wiki/Orbital_eccentricity\" title=\"Orbital eccentricity\">eccentric</a> as to collide with <a href=\"/wiki/Venus\" title=\"Venus\">Venus</a>, sending the inner Solar System into chaos. Possible scenarios include Mercury colliding with the Sun, being ejected from the Solar System, or colliding with Earth.<sup id=\"cite_ref-chaos_89-0\" class=\"reference\"><a href=\"#cite_note-chaos-89\">[86]</a></sup>",
			years: {
				base: 3300000000,
				exp: 1
			},
			category: "solar",
			id: "event-iCSD",
			startTimeInCompactUnits: 9.518513939877888,
			easedStartTime: 21.947290277122562,
			cleanedContentHTML: "1% chance that Jupiter's gravity may make Mercury's orbit so eccentric as to collide with Venus, sending the inner Solar System into chaos. Possible scenarios include Mercury colliding with the Sun, being ejected from the Solar System, or colliding with Earth.[86]",
			skimmableContent: "There is a 1% chance that Jupiter's gravity may make Mercury's orbit so eccentric as to collide with Venus, sending the inner Solar System into chaos."
		},
		{
			yearsFromNow: "3.5–4.5 billion",
			contentHTML: "All water currently present in oceans (if not lost earlier) evaporates. The <a href=\"/wiki/Greenhouse_effect\" title=\"Greenhouse effect\">greenhouse effect</a> caused by the massive, water-rich atmosphere, combined with the Sun's luminosity reaching roughly 35–40% above its present value, will result in Earth's surface temperature rising to 1,400&nbsp;K (1,130&nbsp;°C; 2,060&nbsp;°F), which is hot enough to melt some surface rock.<sup id=\"cite_ref-FOOTNOTEBrownlee201095_74-1\" class=\"reference\"><a href=\"#cite_note-FOOTNOTEBrownlee201095-74\">[71]</a></sup><sup id=\"cite_ref-pnas106_24_81-1\" class=\"reference\"><a href=\"#cite_note-pnas106_24-81\">[78]</a></sup><sup id=\"cite_ref-guinan_ribas_90-0\" class=\"reference\"><a href=\"#cite_note-guinan_ribas-90\">[87]</a></sup><sup id=\"cite_ref-icarus74_91-0\" class=\"reference\"><a href=\"#cite_note-icarus74-91\">[88]</a></sup> This period in Earth's future is often compared to Venus today, but the temperature is actually around two times the temperature on Venus today, and at this temperature the surface will be partially molten,<sup id=\"cite_ref-venus_92-0\" class=\"reference\"><a href=\"#cite_note-venus-92\">[89]</a></sup> while Venus probably has a mostly solid surface at present. Venus will also probably drastically heat up at this time as well, most likely being much hotter than Earth will be as it is closer to the Sun.",
			years: {
				base: 3500000000,
				exp: 1
			},
			category: "earth",
			id: "event-NvcN",
			startTimeInCompactUnits: 9.544068044350276,
			easedStartTime: 22.01480187016443,
			cleanedContentHTML: "All water currently present in oceans (if not lost earlier) evaporates. The greenhouse effect caused by the massive, water-rich atmosphere, combined with the Sun's luminosity reaching roughly 35–40% above its present value, will result in Earth's surface temperature rising to 1,400 K (1,130 °C; 2,060 °F), which is hot enough to melt some surface rock.[71][78][87][88] This period in Earth's future is often compared to Venus today, but the temperature is actually around two times the temperature on Venus today, and at this temperature the surface will be partially molten,[89] while Venus probably has a mostly solid surface at present. Venus will also probably drastically heat up at this time as well, most likely being much hotter than Earth will be as it is closer to the Sun.",
			skimmableContent: "Earth's surface temperature will rise to 1,400 Kelvin (or 1,130 °C or 2,060 °F). The surface will be partially molten."
		},
		{
			yearsFromNow: "3.6 billion",
			contentHTML: "<a href=\"/wiki/Neptune\" title=\"Neptune\">Neptune</a>'s moon <a href=\"/wiki/Triton_(moon)\" title=\"Triton (moon)\">Triton</a> falls through the planet's <a href=\"/wiki/Roche_limit\" title=\"Roche limit\">Roche limit</a>, potentially disintegrating into a planetary <a href=\"/wiki/Ring_system\" title=\"Ring system\">ring system</a> similar to <a href=\"/wiki/Rings_of_Saturn\" title=\"Rings of Saturn\">Saturn</a>'s.<sup id=\"cite_ref-triton_93-0\" class=\"reference\"><a href=\"#cite_note-triton-93\">[90]</a></sup>",
			years: {
				base: 3600000000,
				exp: 1
			},
			category: "solar",
			id: "event-rUCQ",
			startTimeInCompactUnits: 9.556302500767288,
			easedStartTime: 22.047082853473036,
			cleanedContentHTML: "Neptune's moon Triton falls through the planet's Roche limit, potentially disintegrating into a planetary ring system similar to Saturn's.[90]",
			skimmableContent: "Neptune's moon Triton falls through the planet's Roche limit, potentially disintegrating into a planetary ring system similar to Saturn's."
		},
		{
			yearsFromNow: "4 billion",
			contentHTML: "<a href=\"/wiki/Median\" title=\"Median\">Median</a> point by which the <a href=\"/wiki/Andromeda_Galaxy\" title=\"Andromeda Galaxy\">Andromeda Galaxy</a> will have <a href=\"/wiki/Andromeda%E2%80%93Milky_Way_collision\" title=\"Andromeda–Milky Way collision\">collided</a> with the <a href=\"/wiki/Milky_Way\" title=\"Milky Way\">Milky Way</a>, which will thereafter merge to form a galaxy dubbed \"Milkomeda\".<sup id=\"cite_ref-cox_94-0\" class=\"reference\"><a href=\"#cite_note-cox-94\">[91]</a></sup> The planets of the Solar System are expected to be relatively unaffected by this collision.<sup id=\"cite_ref-95\" class=\"reference\"><a href=\"#cite_note-95\">[92]</a></sup><sup id=\"cite_ref-96\" class=\"reference\"><a href=\"#cite_note-96\">[93]</a></sup><sup id=\"cite_ref-milk_97-0\" class=\"reference\"><a href=\"#cite_note-milk-97\">[94]</a></sup>",
			years: {
				base: 4000000000,
				exp: 1
			},
			category: "galaxy",
			id: "event-bFCV",
			startTimeInCompactUnits: 9.602059991327963,
			easedStartTime: 22.16757885515516,
			cleanedContentHTML: "Median point by which the Andromeda Galaxy will have collided with the Milky Way, which will thereafter merge to form a galaxy dubbed \"Milkomeda\".[91] The planets of the Solar System are expected to be relatively unaffected by this collision.[92][93][94]",
			skimmableContent: "The Andromeda Galaxy will have collided with the Milky Way, which will thereafter merge to form a galaxy dubbed \"Milkomeda\". The planets of the Solar System are expected to be relatively unaffected by this collision."
		},
		{
			yearsFromNow: "4.5 billion",
			contentHTML: "Mars reaches the same solar flux the Earth did when it first formed, 4.5 billion years ago from today.<sup id=\"cite_ref-mars_80-1\" class=\"reference\"><a href=\"#cite_note-mars-80\">[77]</a></sup>",
			years: {
				base: 4500000000,
				exp: 1
			},
			category: "solar",
			id: "event-LfIP",
			startTimeInCompactUnits: 9.653212513775344,
			easedStartTime: 22.301841699961475,
			cleanedContentHTML: "Mars reaches the same solar flux the Earth did when it first formed, 4.5 billion years ago from today.[77]",
			skimmableContent: "Mars reaches the same solar flux the Earth did when it first formed, 4.5 billion years ago from today."
		},
		{
			yearsFromNow: "5.4 billion",
			contentHTML: "With the hydrogen supply exhausted at its core, the Sun leaves the <a href=\"/wiki/Main_sequence\" title=\"Main sequence\">main sequence</a> and begins to <a href=\"/wiki/Stellar_evolution\" title=\"Stellar evolution\">evolve</a> into a <a href=\"/wiki/Red_giant\" title=\"Red giant\">red giant</a>.<sup id=\"cite_ref-Schroder_2008_98-0\" class=\"reference\"><a href=\"#cite_note-Schroder_2008-98\">[95]</a></sup>",
			years: {
				base: 5400000000,
				exp: 1
			},
			category: "solar",
			id: "event-bchy",
			startTimeInCompactUnits: 9.732393759822969,
			easedStartTime: 22.50876203875088,
			cleanedContentHTML: "With the hydrogen supply exhausted at its core, the Sun leaves the main sequence and begins to evolve into a red giant.[95]",
			skimmableContent: "With the hydrogen supply exhausted at its core, the Sun leaves the main sequence and begins to evolve into a red giant."
		},
		{
			yearsFromNow: "7.5 billion",
			contentHTML: "Earth and Mars may become <a href=\"/wiki/Tidal_locking\" title=\"Tidal locking\">tidally locked</a> with the expanding subgiant Sun.<sup id=\"cite_ref-mars_80-3\" class=\"reference\"><a href=\"#cite_note-mars-80\">[77]</a></sup>",
			years: {
				base: 7500000000,
				exp: 1
			},
			category: "solar",
			id: "event-pmPz",
			startTimeInCompactUnits: 9.8750612633917,
			easedStartTime: 22.878819236990978,
			cleanedContentHTML: "Earth and Mars may become tidally locked with the expanding subgiant Sun.[77]",
			skimmableContent: "Earth and Mars may become tidally locked with the expanding subgiant Sun."
		},
		{
			yearsFromNow: "7.59 billion",
			contentHTML: "The Earth and Moon are very likely destroyed by falling into the Sun, just before the Sun reaches the tip of its <a href=\"/wiki/Red_giant\" title=\"Red giant\">red giant</a> phase and its maximum radius of 256 times the present-day value.<sup id=\"cite_ref-Schroder_2008_98-1\" class=\"reference\"><a href=\"#cite_note-Schroder_2008-98\">[95]</a></sup><sup id=\"cite_ref-earthredgiantsun_99-0\" class=\"reference\"><a href=\"#cite_note-earthredgiantsun-99\">[note 4]</a></sup> Before the final collision, the Moon possibly spirals below Earth's <a href=\"/wiki/Roche_limit\" title=\"Roche limit\">Roche limit</a>, breaking into a ring of debris, most of which falls to the Earth's surface.<sup id=\"cite_ref-powell2007_100-0\" class=\"reference\"><a href=\"#cite_note-powell2007-100\">[96]</a></sup><p>During this era, <a href=\"/wiki/Saturn\" title=\"Saturn\">Saturn</a>'s moon <a href=\"/wiki/Titan_(moon)\" title=\"Titan (moon)\">Titan</a> may reach surface temperatures necessary to support life.<sup id=\"cite_ref-Titan_101-0\" class=\"reference\"><a href=\"#cite_note-Titan-101\">[97]</a></sup></p>",
			years: {
				base: 7590000000,
				exp: 1
			},
			category: "earth",
			id: "event-bLKw",
			startTimeInCompactUnits: 9.880241775895481,
			easedStartTime: 22.892190187743168,
			cleanedContentHTML: "The Earth and Moon are very likely destroyed by falling into the Sun, just before the Sun reaches the tip of its red giant phase and its maximum radius of 256 times the present-day value.[95][note 4] Before the final collision, the Moon possibly spirals below Earth's Roche limit, breaking into a ring of debris, most of which falls to the Earth's surface.[96]<p>During this era, Saturn's moon Titan may reach surface temperatures necessary to support life.[97]</p>",
			skimmableContent: "The Earth and Moon are very likely destroyed by falling into the Sun. Before the final collision, the Moon possibly spirals below Earth's Roche limit, breaking into a ring of debris, most of which falls to the Earth's surface. During this era, Saturn's moon Titan may reach surface temperatures necessary to support life."
		},
		{
			yearsFromNow: "7.9 billion",
			contentHTML: "The Sun reaches the tip of the red-giant branch of the <a href=\"/wiki/Hertzsprung%E2%80%93Russell_diagram\" title=\"Hertzsprung–Russell diagram\">Hertzsprung–Russell diagram</a>, achieving its maximum radius of 256 times the present-day value.<sup id=\"cite_ref-Rybicki2001_102-0\" class=\"reference\"><a href=\"#cite_note-Rybicki2001-102\">[98]</a></sup> In the process, <a href=\"/wiki/Mercury_(planet)\" title=\"Mercury (planet)\">Mercury</a>, <a href=\"/wiki/Venus\" title=\"Venus\">Venus</a>, and very likely Earth are destroyed.<sup id=\"cite_ref-Schroder_2008_98-2\" class=\"reference\"><a href=\"#cite_note-Schroder_2008-98\">[95]</a></sup>",
			years: {
				base: 7900000000,
				exp: 1
			},
			category: "solar",
			id: "event-vISW",
			startTimeInCompactUnits: 9.897627091290442,
			easedStartTime: 22.937027980017035,
			cleanedContentHTML: "The Sun reaches the tip of the red-giant branch of the Hertzsprung–Russell diagram, achieving its maximum radius of 256 times the present-day value.[98] In the process, Mercury, Venus, and very likely Earth are destroyed.[95]",
			skimmableContent: "The Sun will achieve its maximum radius of 256 times the present-day value. In the process, Mercury, Venus, and very likely Earth will be destroyed."
		},
		{
			yearsFromNow: "8 billion",
			contentHTML: "The Sun becomes a carbon-oxygen <a href=\"/wiki/White_dwarf\" title=\"White dwarf\">white dwarf</a> with about 54.05% its present mass.<sup id=\"cite_ref-Schroder_2008_98-3\" class=\"reference\"><a href=\"#cite_note-Schroder_2008-98\">[95]</a></sup><sup id=\"cite_ref-nebula_103-0\" class=\"reference\"><a href=\"#cite_note-nebula-103\">[99]</a></sup><sup id=\"cite_ref-apj676_1_594_104-0\" class=\"reference\"><a href=\"#cite_note-apj676_1_594-104\">[100]</a></sup><sup id=\"cite_ref-dwarf_group_note_105-0\" class=\"reference\"><a href=\"#cite_note-dwarf_group_note-105\">[101]</a></sup> At this point, if somehow the Earth survives, temperatures on the surface of the planet, as well as other remaining planets in the Solar System, will begin dropping rapidly, due to the white dwarf Sun emitting much less energy than it does today.",
			years: {
				base: 8000000000,
				exp: 1
			},
			category: "solar",
			id: "event-TrJJ",
			startTimeInCompactUnits: 9.903089986991944,
			easedStartTime: 22.951106357160537,
			cleanedContentHTML: "The Sun becomes a carbon-oxygen white dwarf with about 54.05% its present mass.[95][99][100][101] At this point, if somehow the Earth survives, temperatures on the surface of the planet, as well as other remaining planets in the Solar System, will begin dropping rapidly, due to the white dwarf Sun emitting much less energy than it does today.",
			skimmableContent: "The Sun becomes a carbon-oxygen white dwarf with about 54.05% its present mass."
		},
		{
			yearsFromNow: "22 billion",
			contentHTML: "The end of the Universe in the <a href=\"/wiki/Big_Rip\" title=\"Big Rip\">Big Rip</a> scenario, assuming a model of <a href=\"/wiki/Dark_energy\" title=\"Dark energy\">dark energy</a> with <a href=\"/wiki/Equation_of_state_(cosmology)\" title=\"Equation of state (cosmology)\"><var style=\"padding-right: 1px;\">w</var> = −1.5</a>.<sup id=\"cite_ref-bigrip_106-0\" class=\"reference\"><a href=\"#cite_note-bigrip-106\">[102]</a></sup> If the density of dark energy is less than -1, then the Universe's expansion would continue to accelerate and the Observable Universe would continue to get smaller. Around 200 million years before the rip, galaxy clusters like the <a href=\"/wiki/Local_Group\" title=\"Local Group\">Local Group</a> or the <a href=\"/wiki/Sculptor_Group\" title=\"Sculptor Group\">Sculptor Group</a> would be destroyed. Sixty million years before the rip, all galaxies will begin to lose stars around their edges and will completely disintegrate in another 40 million years. Three months before the end, all star systems will become gravitationally unbound, and planets will fly off into the rapidly expanding universe. Thirty minutes before the end, <a href=\"/wiki/Planet\" title=\"Planet\">planets</a>, <a href=\"/wiki/Star\" title=\"Star\">stars</a>, <a href=\"/wiki/Asteroid\" title=\"Asteroid\">asteroids</a> and even extreme objects like <a href=\"/wiki/Neutron_star\" title=\"Neutron star\">neutron stars</a> and <a href=\"/wiki/Black_hole\" title=\"Black hole\">black holes</a> will evaporate into <a href=\"/wiki/Atom\" title=\"Atom\">atoms</a>. 10<sup>−19</sup> seconds before the end, atoms would break apart. Ultimately, once rip reaches the <a href=\"/wiki/Planck_scale\" class=\"mw-redirect\" title=\"Planck scale\">Planck scale</a>, cosmic strings would be disintegrated as well as the fabric of <a href=\"/wiki/Spacetime\" title=\"Spacetime\">spacetime</a> itself. The universe would enter into a \"rip singularity\" when all distances become infinitely large. Whereas a \"crunch singularity\" all matter is infinitely concentrated, in a \"rip singularity\" all matter is infinitely spread out.<sup id=\"cite_ref-107\" class=\"reference\"><a href=\"#cite_note-107\">[103]</a></sup> However, observations of <a href=\"/wiki/Galaxy_cluster\" title=\"Galaxy cluster\">galaxy cluster</a> speeds by the <a href=\"/wiki/Chandra_X-ray_Observatory\" title=\"Chandra X-ray Observatory\">Chandra X-ray Observatory</a> suggest that the true value of <var style=\"padding-right: 1px;\">w</var> is c. −0.991, meaning the Big Rip will not occur.<sup id=\"cite_ref-chand_108-0\" class=\"reference\"><a href=\"#cite_note-chand-108\">[104]</a></sup>",
			years: {
				base: 22000000000,
				exp: 1
			},
			category: "universe",
			id: "event-fDud",
			startTimeInCompactUnits: 10.342422680822207,
			easedStartTime: 24.06670936476562,
			cleanedContentHTML: "The end of the Universe in the Big Rip scenario, assuming a model of dark energy with w = −1.5.[102] If the density of dark energy is less than -1, then the Universe's expansion would continue to accelerate and the Observable Universe would continue to get smaller. Around 200 million years before the rip, galaxy clusters like the Local Group or the Sculptor Group would be destroyed. Sixty million years before the rip, all galaxies will begin to lose stars around their edges and will completely disintegrate in another 40 million years. Three months before the end, all star systems will become gravitationally unbound, and planets will fly off into the rapidly expanding universe. Thirty minutes before the end, planets, stars, asteroids and even extreme objects like neutron stars and black holes will evaporate into atoms. 10−19 seconds before the end, atoms would break apart. Ultimately, once rip reaches the Planck scale, cosmic strings would be disintegrated as well as the fabric of spacetime itself. The universe would enter into a \"rip singularity\" when all distances become infinitely large. Whereas a \"crunch singularity\" all matter is infinitely concentrated, in a \"rip singularity\" all matter is infinitely spread out.[103] However, observations of galaxy cluster speeds by the Chandra X-ray Observatory suggest that the true value of w is c. −0.991, meaning the Big Rip will not occur.[104]",
			skimmableContent: "The end of the Universe in the Big Rip scenario, assuming a model of dark energy with w = −1.5, which is unlikely. The universe would enter into a \"rip singularity\" when all distances become infinitely large."
		},
		{
			yearsFromNow: "100-150 billion",
			contentHTML: "The <a href=\"/wiki/Metric_expansion_of_space\" class=\"mw-redirect\" title=\"Metric expansion of space\">Universe's expansion</a> causes all galaxies beyond the former Milky Way's <a href=\"/wiki/Local_Group\" title=\"Local Group\">Local Group</a> to disappear beyond the <a href=\"/wiki/Particle_horizon\" title=\"Particle horizon\">cosmic light horizon</a>, removing them from the <a href=\"/wiki/Observable_universe\" title=\"Observable universe\">observable universe</a>.<sup id=\"cite_ref-galaxy_113-0\" class=\"reference\"><a href=\"#cite_note-galaxy-113\">[109]</a></sup>",
			years: {
				base: 100000000000,
				exp: 1
			},
			category: "galaxy",
			id: "event-LJnF",
			startTimeInCompactUnits: 11,
			easedStartTime: 25.677419354838708,
			cleanedContentHTML: "The Universe's expansion causes all galaxies beyond the former Milky Way's Local Group to disappear beyond the cosmic light horizon, removing them from the observable universe.[109]",
			skimmableContent: "The Universe's expansion causes all galaxies beyond the former Milky Way's Local Group to disappear beyond the cosmic light horizon, removing them from the observable universe."
		},
		{
			yearsFromNow: "150 billion",
			contentHTML: "The universe will have expanded in size by a factor of 10,000 to approximately 10<sup>15</sup> (1 quadrillion) light-years in diameter.<sup id=\"cite_ref-:0_114-0\" class=\"reference\"><a href=\"#cite_note-:0-114\">[110]</a></sup><p>Proximate galaxy group <a href=\"/wiki/M81_Group\" title=\"M81 Group\">M81</a>, currently one of the closest to the <a href=\"/wiki/Local_Group\" title=\"Local Group\">Local Group</a> at 11.4 million light-years away and receding at ≈300&nbsp;km/s, would then be over 100 billion light-years away and receding at more than 6 times the <a href=\"/wiki/Speed_of_light\" title=\"Speed of light\">speed of light</a>.<sup id=\"cite_ref-115\" class=\"reference\"><a href=\"#cite_note-115\">[111]</a></sup></p><p>Galaxy <a href=\"/wiki/GN-z11\" title=\"GN-z11\">GN-z11</a>, currently at 32 billion light-years away the most distant galaxy known, would then be more than 200 trillion light-years away and receding at over 10,000 times the speed of light, assuming convergence of the <a href=\"/wiki/Hubble%27s_law\" title=\"Hubble's law\">Hubble parameter</a> from currently ≈70&nbsp;km/s/Mpc to a future value of 55.4&nbsp;km/s/Mpc.</p>",
			years: {
				base: 150000000000,
				exp: 1
			},
			category: "universe",
			id: "event-jUfN",
			startTimeInCompactUnits: 11.176091259055681,
			easedStartTime: 26.097214020350936,
			cleanedContentHTML: "The universe will have expanded in size by a factor of 10,000 to approximately 1015 (1 quadrillion) light-years in diameter.[110]<p>Proximate galaxy group M81, currently one of the closest to the Local Group at 11.4 million light-years away and receding at ≈300 km/s, would then be over 100 billion light-years away and receding at more than 6 times the speed of light.[111]</p><p>Galaxy GN-z11, currently at 32 billion light-years away the most distant galaxy known, would then be more than 200 trillion light-years away and receding at over 10,000 times the speed of light, assuming convergence of the Hubble parameter from currently ≈70 km/s/Mpc to a future value of 55.4 km/s/Mpc.</p>",
			skimmableContent: "The universe will have expanded in size by a factor of 10,000 to approximately 1 quadrillion light-years in diameter."
		},
		{
			yearsFromNow: "150 billion",
			contentHTML: "The <a href=\"/wiki/Cosmic_microwave_background\" title=\"Cosmic microwave background\">cosmic microwave background</a> cools from its current temperature of c. 2.7&nbsp;K to 0.3&nbsp;K, rendering it essentially undetectable with current technology.<sup id=\"cite_ref-temp_116-0\" class=\"reference\"><a href=\"#cite_note-temp-116\">[112]</a></sup>",
			years: {
				base: 150000000000,
				exp: 1
			},
			category: "universe",
			id: "event-Wehh",
			startTimeInCompactUnits: 11.176091259055681,
			easedStartTime: 26.097214020350936,
			cleanedContentHTML: "The cosmic microwave background cools from its current temperature of c. 2.7 K to 0.3 K, rendering it essentially undetectable with current technology.[112]",
			skimmableContent: "The cosmic microwave background cools from its current temperature of 2.7 Kelvin to 0.3 Kelvin."
		},
		{
			yearsFromNow: "450 billion",
			contentHTML: "<a href=\"/wiki/Median\" title=\"Median\">Median</a> point by which the c. 47 galaxies<sup id=\"cite_ref-messier_117-0\" class=\"reference\"><a href=\"#cite_note-messier-117\">[113]</a></sup> of the Local Group will coalesce into a single large galaxy.<sup id=\"cite_ref-dying_4-1\" class=\"reference\"><a href=\"#cite_note-dying-4\">[4]</a></sup>",
			years: {
				base: 450000000000,
				exp: 1
			},
			category: "galaxy",
			id: "event-SEIr",
			startTimeInCompactUnits: 11.653212513775344,
			easedStartTime: 27.211179623638234,
			cleanedContentHTML: "Median point by which the c. 47 galaxies[113] of the Local Group will coalesce into a single large galaxy.[4]",
			skimmableContent: "The c. 47 galaxies of the Local Group will coalesce into a single large galaxy."
		},
		{
			yearsFromNow: "800 billion",
			contentHTML: "Expected time when the net light emission from the combined \"Milkomeda\" galaxy begins to decline as the <a href=\"/wiki/Red_dwarf\" title=\"Red dwarf\">red dwarf</a> stars pass through their <a href=\"/wiki/Blue_dwarf_(red-dwarf_stage)\" title=\"Blue dwarf (red-dwarf stage)\">blue dwarf</a> stage of peak luminosity.<sup id=\"cite_ref-bluedwarf_120-0\" class=\"reference\"><a href=\"#cite_note-bluedwarf-120\">[114]</a></sup>",
			years: {
				base: 800000000000,
				exp: 1
			},
			category: "galaxy",
			id: "event-Tffk",
			startTimeInCompactUnits: 11.903089986991944,
			easedStartTime: 27.78129012144513,
			cleanedContentHTML: "Expected time when the net light emission from the combined \"Milkomeda\" galaxy begins to decline as the red dwarf stars pass through their blue dwarf stage of peak luminosity.[114]",
			skimmableContent: "Expected time when the net light emission from the combined \"Milkomeda\" galaxy begins to decline as the red dwarf stars pass through their blue dwarf stage of peak luminosity."
		},
		{
			yearsFromNow: "100 billion – 1 trillion",
			contentHTML: "Estimated time until the Universe ends via the <a href=\"/wiki/Big_Crunch\" title=\"Big Crunch\">Big Crunch</a>, assuming a \"closed\" model. Depending on how long the <a href=\"/wiki/Expansion_of_the_universe\" title=\"Expansion of the universe\">expansion</a> phase is, the events in the contraction phase will happen in the reverse order.<sup id=\"cite_ref-Davies1994_121-0\" class=\"reference\"><a href=\"#cite_note-Davies1994-121\">[115]</a></sup> Galaxy <a href=\"/wiki/Supercluster\" title=\"Supercluster\">superclusters</a> would first merge, followed by <a href=\"/wiki/Galaxy_cluster\" title=\"Galaxy cluster\">galaxy clusters</a> and then later <a href=\"/wiki/Galaxy\" title=\"Galaxy\">galaxies</a>. Eventually, <a href=\"/wiki/Star\" title=\"Star\">stars</a> have become so close together that they will begin to collide with each other. As the Universe continues to contract, the <a href=\"/wiki/Cosmic_microwave_background\" title=\"Cosmic microwave background\">cosmic microwave background</a> <a href=\"/wiki/Temperature\" title=\"Temperature\">temperature</a> will rise above the surface temperature of certain stars, which means that these stars will no longer be able to expel their internal heat, slowly cooking themselves until they explode. It will begin with low-mass <a href=\"/wiki/Red_Dwarf\" title=\"Red Dwarf\">Red Dwarf</a> stars once the CMB reaches 2,400&nbsp;K (2,130&nbsp;°C; 3,860&nbsp;°F) around 500,000 years before the end, followed by <a href=\"/wiki/Stellar_classification\" title=\"Stellar classification\">K-type, G-type, F-type, A-type, B-type and finally O-type</a> stars around 100,000 years before the Big Crunch. Minutes before the Big Crunch, the temperature will be so great that <a href=\"/wiki/Atomic_nuclei\" class=\"mw-redirect\" title=\"Atomic nuclei\">atomic nuclei</a> will disband and the particles will be sucked up by already coalescing <a href=\"/wiki/Black_hole\" title=\"Black hole\">black holes</a>. Finally, all the black holes in the Universe will merge into one singular black hole containing all the <a href=\"/wiki/Matter\" title=\"Matter\">matter</a> in the universe, which would then devour the Universe, including itself.<sup id=\"cite_ref-Davies1994_121-1\" class=\"reference\"><a href=\"#cite_note-Davies1994-121\">[115]</a></sup> After this, it is possible that a new Big Bang would follow and create a new universe. The observed actions of <a href=\"/wiki/Dark_energy\" title=\"Dark energy\">dark energy</a> and the shape of the Universe do not support this scenario. It is thought that the Universe is flat and because of dark energy, the expansion of the universe will accelerate; However, the properties of dark energy are still not known, and thus it is possible that dark energy could reverse sometime in the future.<p>It is also possible that the Universe is a \"closed model\", but that the curvature is so small that we can't detect it over the distance of the current observable universe.<sup id=\"cite_ref-122\" class=\"reference\"><a href=\"#cite_note-122\">[116]</a></sup></p>",
			years: {
				base: 1000000000000,
				exp: 1
			},
			category: "universe",
			id: "event-YISK",
			startTimeInCompactUnits: 12,
			easedStartTime: 28,
			cleanedContentHTML: "Estimated time until the Universe ends via the Big Crunch, assuming a \"closed\" model. Depending on how long the expansion phase is, the events in the contraction phase will happen in the reverse order.[115] Galaxy superclusters would first merge, followed by galaxy clusters and then later galaxies. Eventually, stars have become so close together that they will begin to collide with each other. As the Universe continues to contract, the cosmic microwave background temperature will rise above the surface temperature of certain stars, which means that these stars will no longer be able to expel their internal heat, slowly cooking themselves until they explode. It will begin with low-mass Red Dwarf stars once the CMB reaches 2,400 K (2,130 °C; 3,860 °F) around 500,000 years before the end, followed by K-type, G-type, F-type, A-type, B-type and finally O-type stars around 100,000 years before the Big Crunch. Minutes before the Big Crunch, the temperature will be so great that atomic nuclei will disband and the particles will be sucked up by already coalescing black holes. Finally, all the black holes in the Universe will merge into one singular black hole containing all the matter in the universe, which would then devour the Universe, including itself.[115] After this, it is possible that a new Big Bang would follow and create a new universe. The observed actions of dark energy and the shape of the Universe do not support this scenario. It is thought that the Universe is flat and because of dark energy, the expansion of the universe will accelerate; However, the properties of dark energy are still not known, and thus it is possible that dark energy could reverse sometime in the future.<p>It is also possible that the Universe is a \"closed model\", but that the curvature is so small that we can't detect it over the distance of the current observable universe.[116]</p>",
			skimmableContent: "Estimated time until the Universe ends via the Big Crunch, assuming a \"closed\" model. Everything in the Universe will merge into one singular black hole containing all the matter in the universe, which would then devour the Universe, including itself. After this, it is possible that a new Big Bang would follow and create a new universe. (The observed actions of dark energy and the shape of the Universe do not support this scenario.)"
		},
		{
			yearsFromNow: "1.25 trillion",
			contentHTML: "The universe will have doubled in size more than 100 times (a factor of more than 10<sup>30</sup>) to more than 10<sup>41</sup> light-years in diameter. All gravitationally unbound galaxies currently separated by more than 1 <a href=\"/wiki/Parsec#Megaparsecs_and_gigaparsecs\" title=\"Parsec\">megaparsec</a> (Mpc) will at this point be separated by more than 10<sup>30</sup> Mpc (≈10<sup>36</sup> light-years) and receding from <i>each other</i> more than 100 million times the diameter of the currently <a href=\"/wiki/Observable_universe\" title=\"Observable universe\">observable universe</a> every second.<p>Distant galaxy <a href=\"/wiki/GN-z11\" title=\"GN-z11\">GN-z11</a> or its remnants would at that point also be more than 10<sup>41</sup> light-years away and receding more than 1 trillion times the diameter of the currently <a href=\"/wiki/Observable_universe\" title=\"Observable universe\">observable universe</a> every second<sup id=\"cite_ref-123\" class=\"reference\"><a href=\"#cite_note-123\">[note 7]</a></sup> (assuming a continued expansion rate of doubling every 12.2 billion years and future <a href=\"/wiki/Hubble%27s_law\" title=\"Hubble's law\">Hubble parameter</a> value of 55.4&nbsp;km/s/Mpc<sup id=\"cite_ref-:0_114-2\" class=\"reference\"><a href=\"#cite_note-:0-114\">[110]</a></sup>) . Beyond this point, the universe will expand by a factor of 10<sup>24</sup> every trillion years, and it will be increasingly difficult to describe the recession of any gravitationally unbound objects in terms of a familiar physical analogy.</p>",
			years: {
				base: 1250000000000,
				exp: 1
			},
			category: "universe",
			id: "event-LDTC",
			startTimeInCompactUnits: 12.096910013008056,
			easedStartTime: 28.21738917963605,
			speakableContent: "The universe will have doubled in size more than 100 times (a factor of more than 10 to the 30th power) to more than 10 to the 41st power light-years in diameter.",
			skimmableContent: "The universe will have doubled in size more than 100 times (a factor of more than 10<sup>30</sup> power) to more than 10<sup>41</sup> light-years in diameter.",
			cleanedContentHTML: "The universe will have doubled in size more than 100 times (a factor of more than 10<sup>30</sup>) to more than 10<sup>41</sup> to more than 10<sup>41</sup> light-years in diameter. All gravitationally unbound galaxies currently separated by more than 1 megaparsec (Mpc) will at this point be separated by more than 10<sup>30</sup> Mpc (≈10<sup>36</sup> light-years) and receding from <i>each other</i> more than 100 million times the diameter of the currently observable universe every second.<p>Distant galaxy GN-z11 or its remnants would at that point also be more than 10<sup>41</sup> light-years away and receding more than 1 trillion times the diameter of the currently observable universe every second (assuming a continued expansion rate of doubling every 12.2 billion years and future Hubble parameter value of 55.4 km/s/Mpc) . Beyond this point, the universe will expand by a factor of 10<sup>24</sup> every trillion years, and it will be increasingly difficult to describe the recession of any gravitationally unbound objects in terms of a familiar physical analogy.</p>"
		},
		{
			yearsFromNow: "4 trillion",
			contentHTML: "Estimated time until the red dwarf star <a href=\"/wiki/Proxima_Centauri\" title=\"Proxima Centauri\">Proxima Centauri</a>, the closest star to the Sun at a distance of 4.25 <a href=\"/wiki/Light-year\" title=\"Light-year\">light-years</a>, leaves the main sequence and becomes a <a href=\"/wiki/White_dwarf\" title=\"White dwarf\">white dwarf</a>.<sup id=\"cite_ref-124\" class=\"reference\"><a href=\"#cite_note-124\">[117]</a></sup>",
			years: {
				base: 4000000000000,
				exp: 1
			},
			category: "galaxy",
			id: "event-Kewv",
			startTimeInCompactUnits: 12.602059991327963,
			easedStartTime: 29.329619029814186,
			cleanedContentHTML: "Estimated time until the red dwarf star Proxima Centauri, the closest star to the Sun at a distance of 4.25 light-years, leaves the main sequence and becomes a white dwarf.[117]",
			skimmableContent: "Estimated time until the red dwarf star Proxima Centauri, the closest star to the Sun at a distance of 4.25 light-years, leaves the main sequence and becomes a white dwarf."
		},
		{
			yearsFromNow: "4.2 trillion",
			contentHTML: "The universe will have expanded by significantly more than a factor of 10<sup>100</sup>. All gravitationally unbound galaxies currently separated by more than 1 <a href=\"/wiki/Parsec#Megaparsecs_and_gigaparsecs\" title=\"Parsec\">Mpc</a> will at this point be separated by more than ≈10<sup>103</sup> Mpc (≈10<sup>110</sup> light-years) and receding from each other at more than ≈10<sup>83</sup> <a href=\"/wiki/Parsec#Megaparsecs_and_gigaparsecs\" title=\"Parsec\">Gpc</a>/s (≈10<sup>92</sup> light-years per second), assuming a continued expansion rate of doubling every 12.2 billion years and future <a href=\"/wiki/Hubble%27s_law\" title=\"Hubble's law\">Hubble parameter</a> value of 55.4&nbsp;km/s/Mpc.<sup id=\"cite_ref-:0_114-3\" class=\"reference\"><a href=\"#cite_note-:0-114\">[110]</a></sup><p>The <a href=\"/wiki/Comoving_and_proper_distances\" title=\"Comoving and proper distances\">proper distances</a> between galaxies will be increasing to such an extent<sup id=\"cite_ref-125\" class=\"reference\"><a href=\"#cite_note-125\">[note 8]</a></sup> that the rate at which they are receding from each other is accelerating by more than ≈10<sup>65</sup>&nbsp;Gpc/s/s (≈10<sup>74</sup> light-years per second per second) due to the expansion of the universe.</p>",
			years: {
				base: 4200000000000,
				exp: 1
			},
			category: "universe",
			id: "event-Pvwd",
			startTimeInCompactUnits: 12.6232492903979,
			easedStartTime: 29.375520522471586,
			cleanedContentHTML: "The universe will have expanded by significantly more than a factor of 10100. All gravitationally unbound galaxies currently separated by more than 1 Mpc will at this point be separated by more than ≈10103 Mpc (≈10110 light-years) and receding from each other at more than ≈1083 Gpc/s (≈1092 light-years per second), assuming a continued expansion rate of doubling every 12.2 billion years and future Hubble parameter value of 55.4 km/s/Mpc.[110]<p>The proper distances between galaxies will be increasing to such an extent[note 8] that the rate at which they are receding from each other is accelerating by more than ≈1065 Gpc/s/s (≈1074 light-years per second per second) due to the expansion of the universe.</p>",
			speakableContent: "The universe will have expanded by significantly more than a factor of 10<sup>100</sup> power.",
			skimmableContent: "The universe will have expanded by significantly more than a factor of 10 to the 100th power."
		},
		{
			yearsFromNow: "12 trillion",
			contentHTML: "Estimated time until the red dwarf <a href=\"/wiki/VB_10\" title=\"VB 10\">VB 10</a>, as of 2016 the least massive <a href=\"/wiki/Main_sequence\" title=\"Main sequence\">main sequence</a> star with an estimated mass of 0.075 <var>M</var><sub>☉</sub>, runs out of hydrogen in its core and becomes a <a href=\"/wiki/White_dwarf\" title=\"White dwarf\">white dwarf</a>.<sup id=\"cite_ref-S&amp;T_22_126-0\" class=\"reference\"><a href=\"#cite_note-S&amp;T_22-126\">[118]</a></sup><sup id=\"cite_ref-127\" class=\"reference\"><a href=\"#cite_note-127\">[119]</a></sup>",
			years: {
				base: 12000000000000,
				exp: 1
			},
			category: "galaxy",
			id: "event-xpcZ",
			startTimeInCompactUnits: 13.079181246047625,
			easedStartTime: 30.348941140274228,
			cleanedContentHTML: "Estimated time until the red dwarf VB 10, as of 2016 the least massive main sequence star with an estimated mass of 0.075 M☉, runs out of hydrogen in its core and becomes a white dwarf.[118][119]",
			skimmableContent: "Estimated time until the red dwarf VB 10, as of 2016 the least massive main sequence star with an estimated mass of 0.075 M☉, runs out of hydrogen in its core and becomes a white dwarf."
		},
		{
			yearsFromNow: "30 trillion",
			contentHTML: "Estimated time for stars (including the <a href=\"/wiki/Sun\" title=\"Sun\">Sun</a>) to undergo a close encounter with another star in local stellar neighborhoods. Whenever two stars (or stellar remnants) pass close to each other, their planets' orbits can be disrupted, potentially ejecting them from the system entirely. On average, the closer a planet's orbit to its parent star the longer it takes to be ejected in this manner, because it is gravitationally more tightly bound to the star.<sup id=\"cite_ref-strip_128-0\" class=\"reference\"><a href=\"#cite_note-strip-128\">[120]</a></sup>",
			years: {
				base: 30000000000000,
				exp: 1
			},
			category: "universe",
			id: "event-jdEL",
			startTimeInCompactUnits: 13.477121254719663,
			easedStartTime: 31.17687800962939,
			cleanedContentHTML: "Estimated time for stars (including the Sun) to undergo a close encounter with another star in local stellar neighborhoods. Whenever two stars (or stellar remnants) pass close to each other, their planets' orbits can be disrupted, potentially ejecting them from the system entirely. On average, the closer a planet's orbit to its parent star the longer it takes to be ejected in this manner, because it is gravitationally more tightly bound to the star.[120]",
			skimmableContent: "Stars (including the Sun) will undergo a close encounter with another star in local stellar neighborhoods. Whenever two stars (or stellar remnants) pass close to each other, their planets' orbits can be disrupted, potentially ejecting them from the system entirely."
		},
		{
			yearsFromNow: "100 trillion",
			contentHTML: "High estimate for the time until normal <a href=\"/wiki/Star_formation\" title=\"Star formation\">star formation</a> ends in galaxies.<sup id=\"cite_ref-dying_4-3\" class=\"reference\"><a href=\"#cite_note-dying-4\">[4]</a></sup> This marks the transition from the <a href=\"/wiki/Future_of_an_expanding_universe\" title=\"Future of an expanding universe\">Stelliferous Era to the Degenerate Era</a>; with no free hydrogen to form new stars, all remaining stars slowly exhaust their fuel and die.<sup id=\"cite_ref-five_ages_3-1\" class=\"reference\"><a href=\"#cite_note-five_ages-3\">[3]</a></sup>",
			years: {
				base: 100000000000000,
				exp: 1
			},
			category: "universe",
			id: "event-WLEC",
			startTimeInCompactUnits: 14,
			easedStartTime: 32.23529411764706,
			cleanedContentHTML: "High estimate for the time until normal star formation ends in galaxies.[4] This marks the transition from the Stelliferous Era to the Degenerate Era; with no free hydrogen to form new stars, all remaining stars slowly exhaust their fuel and die.[3]",
			skimmableContent: "Normal star formation ends in galaxies. This marks the transition from the Stelliferous Era to the Degenerate Era; with no free hydrogen to form new stars, all remaining stars slowly exhaust their fuel and die.",
			speakableContent: "Normal star formation ends in galaxies. This marks the transition from the stella ferrous Era to the Degenerate Era; with no free hydrogen to form new stars, all remaining stars slowly exhaust their fuel and die."
		},
		{
			yearsFromNow: "110–120 trillion",
			contentHTML: "Time by which all stars in the universe will have exhausted their fuel (the longest-lived stars, low-mass <a href=\"/wiki/Red_dwarf\" title=\"Red dwarf\">red dwarfs</a>, have lifespans of roughly 10–20 trillion years).<sup id=\"cite_ref-dying_4-4\" class=\"reference\"><a href=\"#cite_note-dying-4\">[4]</a></sup> After this point, the stellar-mass objects remaining are <a href=\"/wiki/Compact_star\" title=\"Compact star\">stellar remnants</a> (<a href=\"/wiki/White_dwarf\" title=\"White dwarf\">white dwarfs</a>, <a href=\"/wiki/Neutron_star\" title=\"Neutron star\">neutron stars</a>, <a href=\"/wiki/Stellar_black_hole\" title=\"Stellar black hole\">black holes</a>) and <a href=\"/wiki/Brown_dwarf\" title=\"Brown dwarf\">brown dwarfs</a>.<p>Collisions between brown dwarfs will create new red dwarfs on a marginal level: on average, about 100 stars will be shining in what was once the Milky Way. Collisions between stellar remnants will create occasional supernovae.<sup id=\"cite_ref-dying_4-5\" class=\"reference\"><a href=\"#cite_note-dying-4\">[4]</a></sup></p>",
			years: {
				base: 110000000000000,
				exp: 1
			},
			category: "universe",
			id: "event-aQad",
			startTimeInCompactUnits: 14.041392685158225,
			easedStartTime: 32.31769271870814,
			cleanedContentHTML: "Time by which all stars in the universe will have exhausted their fuel (the longest-lived stars, low-mass red dwarfs, have lifespans of roughly 10–20 trillion years).[4] After this point, the stellar-mass objects remaining are stellar remnants (white dwarfs, neutron stars, black holes) and brown dwarfs.<p>Collisions between brown dwarfs will create new red dwarfs on a marginal level: on average, about 100 stars will be shining in what was once the Milky Way. Collisions between stellar remnants will create occasional supernovae.[4]</p>",
			skimmableContent: "On average, about 100 stars will be shining in what was once the Milky Way. Collisions between stellar remnants will create occasional supernovae."
		},
		{
			yearsFromNow: "1 quadrillion",
			contentHTML: "Estimated time until stellar close encounters detach all planets in star systems (including the <a href=\"/wiki/Solar_System\" title=\"Solar System\">Solar System</a>) from their orbits.<sup id=\"cite_ref-dying_4-6\" class=\"reference\"><a href=\"#cite_note-dying-4\">[4]</a></sup><p>By this point, the <a href=\"/wiki/Black_dwarf\" title=\"Black dwarf\">Sun will have cooled</a> to five degrees above <a href=\"/wiki/Absolute_zero\" title=\"Absolute zero\">absolute zero</a>.<sup id=\"cite_ref-five_degs_129-0\" class=\"reference\"><a href=\"#cite_note-five_degs-129\">[121]</a></sup></p>",
			years: {
				base: 1000000000000000,
				exp: 1
			},
			category: "solar",
			id: "event-FlwT",
			startTimeInCompactUnits: 15,
			easedStartTime: 34.17142857142857,
			cleanedContentHTML: "Estimated time until stellar close encounters detach all planets in star systems (including the Solar System) from their orbits.[4]<p>By this point, the Sun will have cooled to five degrees above absolute zero.[121]</p>",
			skimmableContent: "Stellar close encounters detach all planets in star systems (including the Solar System) from their orbits. By this point, the Sun will have cooled to five degrees above absolute zero."
		},
		{
			yearsFromNow: "10–100 quintillion",
			contentHTML: "Estimated time until 90%–99% of <a href=\"/wiki/Brown_dwarf\" title=\"Brown dwarf\">brown dwarfs</a> and <a href=\"/wiki/Compact_star\" title=\"Compact star\">stellar remnants</a> (including the <a href=\"/wiki/Sun\" title=\"Sun\">Sun</a>) are ejected from galaxies. When two objects pass close enough to each other, they exchange orbital energy, with lower-mass objects tending to gain energy. Through repeated encounters, the lower-mass objects can gain enough energy in this manner to be ejected from their galaxy. This process eventually causes the Milky Way to eject the majority of its brown dwarfs and stellar remnants.<sup id=\"cite_ref-dying_4-7\" class=\"reference\"><a href=\"#cite_note-dying-4\">[4]</a></sup><sup id=\"cite_ref-five_ages_pp85–87_130-0\" class=\"reference\"><a href=\"#cite_note-five_ages_pp85–87-130\">[122]</a></sup>",
			years: {
				base: 10,
				exp: 18
			},
			category: "galaxy",
			id: "event-wuXN",
			startTimeInCompactUnits: 18,
			easedStartTime: 39.368421052631575,
			cleanedContentHTML: "Estimated time until 90%–99% of brown dwarfs and stellar remnants (including the Sun) are ejected from galaxies. When two objects pass close enough to each other, they exchange orbital energy, with lower-mass objects tending to gain energy. Through repeated encounters, the lower-mass objects can gain enough energy in this manner to be ejected from their galaxy. This process eventually causes the Milky Way to eject the majority of its brown dwarfs and stellar remnants.[4][122]",
			skimmableContent: "90%–99% of brown dwarfs and stellar remnants (including the Sun) will be ejected from galaxies."
		},
		{
			yearsFromNow: "10<sup>30</sup>",
			contentHTML: "Estimated time until those stars not ejected from galaxies (1%–10%) fall into their galaxies' central <a href=\"/wiki/Supermassive_black_hole\" title=\"Supermassive black hole\">supermassive black holes</a>. By this point, with <a href=\"/wiki/Binary_star\" title=\"Binary star\">binary stars</a> having fallen into each other, and planets into their stars, via emission of gravitational radiation, only solitary objects (stellar remnants, brown dwarfs, ejected planetary-mass objects, black holes) will remain in the universe.<sup id=\"cite_ref-dying_4-8\" class=\"reference\"><a href=\"#cite_note-dying-4\">[4]</a></sup>",
			years: {
				base: 10,
				exp: 31
			},
			category: "universe",
			id: "event-voru",
			startTimeInCompactUnits: 31,
			easedStartTime: 54.82352941176471,
			cleanedContentHTML: "Estimated time until those stars not ejected from galaxies (1%–10%) fall into their galaxies' central supermassive black holes. By this point, with binary stars having fallen into each other, and planets into their stars, via emission of gravitational radiation, only solitary objects (stellar remnants, brown dwarfs, ejected planetary-mass objects, and black holes) will remain in the universe.[4]",
			skimmableContent: "Those stars not ejected from galaxies fall into their galaxies' central supermassive black holes. By this point, with binary stars having fallen into each other, and planets into their stars, via emission of gravitational radiation, only solitary objects (stellar remnants, brown dwarfs, ejected planetary-mass objects, and black holes) will remain in the universe."
		},
		{
			yearsFromNow: "3×10<sup>43</sup>",
			contentHTML: "Estimated time for all nucleons in the observable universe to decay, if the hypothesized <a href=\"/wiki/Proton_decay\" title=\"Proton decay\">proton half-life</a> takes the largest possible value, 10<sup>41</sup> years,<sup id=\"cite_ref-dying_4-9\" class=\"reference\"><a href=\"#cite_note-dying-4\">[4]</a></sup> assuming that the <a href=\"/wiki/Big_Bang\" title=\"Big Bang\">Big Bang</a> was <a href=\"/wiki/Inflation_(cosmology)\" title=\"Inflation (cosmology)\">inflationary</a> and that the same process that made baryons predominate over anti-baryons in the early Universe makes protons decay.<sup id=\"cite_ref-half-life_133-1\" class=\"reference\"><a href=\"#cite_note-half-life-133\">[125]</a></sup><sup id=\"cite_ref-half-life_134-1\" class=\"reference\"><a href=\"#cite_note-half-life-134\">[note 9]</a></sup> By this time, if protons do decay, the <a href=\"/wiki/Future_of_an_expanding_universe\" title=\"Future of an expanding universe\">Black Hole Era</a>, in which black holes are the only remaining celestial objects, begins.<sup id=\"cite_ref-five_ages_3-2\" class=\"reference\"><a href=\"#cite_note-five_ages-3\">[3]</a></sup><sup id=\"cite_ref-dying_4-10\" class=\"reference\"><a href=\"#cite_note-dying-4\">[4]</a></sup>",
			years: {
				base: 10,
				exp: 43.477
			},
			category: "physics",
			id: "event-TdMg",
			startTimeInCompactUnits: 43.477,
			easedStartTime: 63.70338862895222,
			cleanedContentHTML: "Estimated time for all nucleons in the observable universe to decay, if the hypothesized proton half-life takes the largest possible value, 1041 years,[4] assuming that the Big Bang was inflationary and that the same process that made baryons predominate over anti-baryons in the early Universe makes protons decay.[125][note 9] By this time, if protons do decay, the Black Hole Era, in which black holes are the only remaining celestial objects, begins.[3][4]",
			skimmableContent: "Estimated time for all nucleons in the observable universe to decay, if the hypothesized proton half-life takes the largest possible value, 10<sup>41</sup> years, assuming that the Big Bang was inflationary and that the same process that made baryons predominate over anti-baryons in the early Universe makes protons decay. By this time, if protons do decay, the Black Hole Era, in which black holes are the only remaining celestial objects, begins.",
			speakableContent: "Estimated time for all nucleons in the observable universe to decay, if the hypothesized proton half-life takes the largest possible value, 10 to the 41st power years, assuming that the Big Bang was inflationary and that the same process that made baryons predominate over anti-baryons in the early Universe makes protons decay. By this time, if protons do decay, the Black Hole Era, in which black holes are the only remaining celestial objects, begins."
		},
		{
			yearsFromNow: "10<sup>65</sup>",
			contentHTML: "Assuming that protons do not decay, estimated time for rigid objects, from free-floating rocks in space to <a href=\"/wiki/Planets\" class=\"mw-redirect\" title=\"Planets\">planets</a>, to rearrange their atoms and molecules via <a href=\"/wiki/Quantum_tunneling\" class=\"mw-redirect\" title=\"Quantum tunneling\">quantum tunneling</a>. On this timescale, any discrete body of matter \"behaves like a liquid\" and becomes a smooth sphere due to diffusion and gravity.<sup id=\"cite_ref-dyson_131-2\" class=\"reference\"><a href=\"#cite_note-dyson-131\">[123]</a></sup>",
			years: {
				base: 10,
				exp: 65
			},
			category: "physics",
			id: "event-RSHJ",
			startTimeInCompactUnits: 65,
			easedStartTime: 72.89411764705882,
			cleanedContentHTML: "Assuming that protons do not decay, estimated time for rigid objects, from free-floating rocks in space to planets, to rearrange their atoms and molecules via quantum tunneling. On this timescale, any discrete body of matter \"behaves like a liquid\" and becomes a smooth sphere due to diffusion and gravity.[123]",
			skimmableContent: "Assuming that protons do not decay, estimated time for rigid objects, from free-floating rocks in space to planets, to rearrange their atoms and molecules via quantum tunneling. On this timescale, any discrete body of matter \"behaves like a liquid\" and becomes a smooth sphere due to diffusion and gravity."
		},
		{
			yearsFromNow: "5.8×10<sup>68</sup>",
			contentHTML: "Estimated time until a <a href=\"/wiki/Stellar_black_hole\" title=\"Stellar black hole\">stellar mass black hole</a> with a mass of 3 <a href=\"/wiki/Solar_mass\" title=\"Solar mass\">solar masses</a> decays into subatomic particles by <a href=\"/wiki/Hawking_radiation\" title=\"Hawking radiation\">Hawking radiation</a>.<sup id=\"cite_ref-Page_1976_135-0\" class=\"reference\"><a href=\"#cite_note-Page_1976-135\">[126]</a></sup>",
			years: {
				base: 10,
				exp: 68.763
			},
			category: "universe",
			id: "event-LTyf",
			startTimeInCompactUnits: 68.763,
			easedStartTime: 74.04323873686108,
			cleanedContentHTML: "Estimated time until a stellar mass black hole with a mass of 3 solar masses decays into subatomic particles by Hawking radiation.[126]",
			skimmableContent: "Estimated time until a stellar mass black hole with a mass of 3 solar masses decays into subatomic particles by Hawking radiation."
		},
		{
			yearsFromNow: "6×10<sup>99</sup>",
			contentHTML: "Estimated time until the supermassive black hole of <a href=\"/wiki/TON_618\" title=\"TON 618\">TON 618</a>, as of 2018 the <a href=\"/wiki/List_of_most_massive_black_holes\" title=\"List of most massive black holes\">most massive known</a> with the mass of 66 billion solar masses, dissipates by the emission of Hawking radiation,<sup id=\"cite_ref-Page_1976_135-1\" class=\"reference\"><a href=\"#cite_note-Page_1976-135\">[126]</a></sup> assuming zero angular momentum (non-rotating black hole).",
			years: {
				base: 10,
				exp: 99.778
			},
			category: "universe",
			id: "event-tzeW",
			startTimeInCompactUnits: 99.778,
			easedStartTime: 80.76441416620749,
			cleanedContentHTML: "Estimated time until the supermassive black hole of TON 618, as of 2018 the most massive known with the mass of 66 billion solar masses, dissipates by the emission of Hawking radiation,[126] assuming zero angular momentum (non-rotating black hole).",
			skimmableContent: "Estimated time until the supermassive black hole of TON 618, as of 2018 the most massive known with the mass of 66 billion solar masses, dissipates by the emission of Hawking radiation, assuming zero angular momentum (non-rotating black hole).",
			endMovement: true
		},
		{
			yearsFromNow: "1.7×10<sup>106</sup>",
			contentHTML: "Estimated time until a supermassive black hole with a mass of 20 trillion solar masses decays by the Hawking process.<sup id=\"cite_ref-Page_1976_135-2\" class=\"reference\"><a href=\"#cite_note-Page_1976-135\">[126]</a></sup> This marks the end of the Black Hole Era. Beyond this time, if protons do decay, the Universe enters the <a href=\"/wiki/Dark_Era\" class=\"mw-redirect\" title=\"Dark Era\">Dark Era</a>, in which all physical objects have decayed to subatomic particles, gradually winding down to their final energy state in the <a href=\"/wiki/Heat_death_of_the_universe\" title=\"Heat death of the universe\">heat death of the universe</a>.<sup id=\"cite_ref-five_ages_3-3\" class=\"reference\"><a href=\"#cite_note-five_ages-3\">[3]</a></sup><sup id=\"cite_ref-dying_4-11\" class=\"reference\"><a href=\"#cite_note-dying-4\">[4]</a></sup><p>Also by this time, if the projected expansion rate of the universe continues with doubling in size occurring approximately every 12 billion years,<sup id=\"cite_ref-:0_114-4\" class=\"reference\"><a href=\"#cite_note-:0-114\">[110]</a></sup> the universe will have expanded in size by a factor of more than <span class=\"mwe-math-element\"><span class=\"mwe-math-mathml-inline mwe-math-mathml-a11y\" style=\"display: none;\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\" alttext=\"{\\displaystyle 10^{10^{95}}.}\">  <semantics>    <mrow class=\"MJX-TeXAtom-ORD\">      <mstyle displaystyle=\"true\" scriptlevel=\"0\">        <msup>          <mn>10</mn>          <mrow class=\"MJX-TeXAtom-ORD\">            <msup>              <mn>10</mn>              <mrow class=\"MJX-TeXAtom-ORD\">                <mn>95</mn>              </mrow>            </msup>          </mrow>        </msup>        <mo>.</mo>      </mstyle>    </mrow>    <annotation encoding=\"application/x-tex\">{\\displaystyle 10^{10^{95}}.}</annotation>  </semantics></math></span><img src=\"https://wikimedia.org/api/rest_v1/media/math/render/svg/eac2b6880f040d4931c05aa7d242b2ec9a8a02af\" class=\"mwe-math-fallback-image-inline\" aria-hidden=\"true\" style=\"vertical-align: -0.338ex; width:6.347ex; height:3.009ex;\" alt=\"{\\displaystyle 10^{10^{95}}.}\"></span><sup id=\"cite_ref-136\" class=\"reference\"><a href=\"#cite_note-136\">[note 10]</a></sup><sup id=\"cite_ref-137\" class=\"reference\"><a href=\"#cite_note-137\">[note 11]</a></sup> If protons do decay, most of the universe would then be almost pure vacuum with each of the <a href=\"/wiki/Elementary_particle#Common_elementary_particles\" title=\"Elementary particle\">currently estimated 10<sup>97</sup> subatomic particles</a> being entirely alone within its cosmological event horizon.<sup id=\"cite_ref-138\" class=\"reference\"><a href=\"#cite_note-138\">[note 12]</a></sup> From a probabilistic standpoint, our currently observable universe would be unlikely to then contain even a single subatomic particle.<sup id=\"cite_ref-139\" class=\"reference\"><a href=\"#cite_note-139\">[note 13]</a></sup><sup id=\"cite_ref-140\" class=\"reference\"><a href=\"#cite_note-140\">[note 14]</a></sup></p>",
			years: {
				base: 10,
				exp: 106.23
			},
			category: "physics",
			id: "event-jvbH",
			startTimeInCompactUnits: 106.23,
			easedStartTime: 100.39645454545455,
			cleanedContentHTML: "Estimated time until a supermassive black hole with a mass of 20 trillion solar masses decays by the Hawking process. This marks the end of the Black Hole Era. Beyond this time, if protons do decay, the Universe enters the Dark Era, in which all physical objects have decayed to subatomic particles, gradually winding down to their final energy state in the heat death of the universe.<p>Also by this time, if the projected expansion rate of the universe continues with doubling in size occurring approximately every 12 billion years, the universe will have expanded in size by a factor of more than 10<sup>10<sup>95</sup></sup>. If protons do decay, most of the universe would then be almost pure vacuum with each of the currently estimated 1097 subatomic particles being entirely alone within its cosmological event horizon. From a probabilistic standpoint, our currently observable universe would be unlikely to then contain even a single subatomic particle.</p>",
			skimmableContent: "A supermassive black hole with a mass of 20 trillion solar masses decays by the Hawking process. This marks the end of the Black Hole Era. Beyond this time, if protons do decay, the Universe enters the Dark Era, in which all physical objects have decayed to subatomic particles, gradually winding down to their final energy state in the heat death of the universe."
		},
		{
			yearsFromNow: "10<sup>139</sup>",
			contentHTML: "2018 estimate of Standard Model lifetime before <a href=\"/wiki/False_vacuum#Vacuum_metastability_event\" title=\"False vacuum\">collapse of a false vacuum</a>; 95% confidence interval is 10<sup>58</sup> to 10<sup>241</sup> years due in part to uncertainty about the top quark mass.<sup id=\"cite_ref-141\" class=\"reference\"><a href=\"#cite_note-141\">[127]</a></sup>",
			years: {
				base: 10,
				exp: 139
			},
			category: "physics",
			id: "event-rlvs",
			startTimeInCompactUnits: 139,
			easedStartTime: 102.48181818181818,
			cleanedContentHTML: "2018 estimate of Standard Model lifetime before collapse of a false vacuum; 95% confidence interval is 1058 to 10241 years due in part to uncertainty about the top quark mass.",
			skimmableContent: "Collapse of a false vacuum, if the universe actually is in a false vacuum. This would mean that everything, from subatomic particles to galaxies, and all fundamental forces, would be reconstituted into new fundamental particles and forces and structures."
		},
		{
			yearsFromNow: "10<sup>1500</sup>",
			contentHTML: "Assuming protons do not decay, the estimated time until all <a href=\"/wiki/Baryonic_matter\" class=\"mw-redirect\" title=\"Baryonic matter\">baryonic matter</a> has either fused together to form <a href=\"/wiki/Iron-56\" title=\"Iron-56\">iron-56</a> or decayed from a higher mass element into iron-56 (see <a href=\"/wiki/Iron_star\" title=\"Iron star\">iron star</a>).<sup id=\"cite_ref-dyson_131-3\" class=\"reference\"><a href=\"#cite_note-dyson-131\">[123]</a></sup>",
			years: {
				base: 10,
				exp: 1500
			},
			category: "physics",
			id: "event-OPlH",
			startTimeInCompactUnits: 1100,
			easedStartTime: 163.63636363636363,
			cleanedContentHTML: "Assuming protons do not decay, the estimated time until all baryonic matter has either fused together to form iron-56 or decayed from a higher mass element into iron-56 (see iron star).[123]",
			skimmableContent: "Assuming protons do not decay, the estimated time until all baryonic matter has either fused together to form iron-56 or decayed from a higher mass element into iron-56.",
			endMovement: true
		},
		{
			yearsFromNow: "10<sup>10<sup>50</sup></sup>",
			contentHTML: "Estimated time for a <a href=\"/wiki/Boltzmann_brain\" title=\"Boltzmann brain\">Boltzmann brain</a> to appear in the vacuum via a spontaneous entropy decrease.<sup id=\"cite_ref-linde_6-1\" class=\"reference\"><a href=\"#cite_note-linde-6\">[6]</a></sup>",
			years: {
				base: 10,
				exp: 1e+50
			},
			category: "universe",
			id: "event-DrRp",
			startTimeInCompactUnits: 2900,
			easedStartTime: 278.18181818181813,
			cleanedContentHTML: "Estimated time for a Boltzmann brain to appear in the vacuum via a spontaneous entropy decrease.[6]",
			skimmableContent: "Estimated time for a Boltzmann brain to appear in the vacuum via a spontaneous entropy decrease.",
			endMovement: true
		},
		{
			yearsFromNow: "10<sup>10<sup>76</sup></sup>",
			contentHTML: "High estimate for the time until all iron stars collapse into black holes, assuming no proton decay or virtual black holes, which then (on these timescales) instantaneously evaporate into sub-atomic particles.<p>This is also the highest estimated possible time for Black Hole Era (and subsequent Dark Era) to finally commence. Beyond this point, it is almost certain that the Universe will contain no more baryonic matter and will be an almost pure vacuum (possibly accompanied with the presence of a <a href=\"/wiki/False_vacuum\" title=\"False vacuum\">false vacuum</a>) until it reaches its <a href=\"/wiki/Heat_death_of_the_universe\" title=\"Heat death of the universe\">final energy state</a>, assuming it does not happen before this time.</p>",
			years: {
				base: 10,
				exp: 1e+76
			},
			category: "physics",
			id: "event-PwTi",
			startTimeInCompactUnits: 3800,
			easedStartTime: 335.4545454545455,
			cleanedContentHTML: "High estimate for the time until all iron stars collapse into black holes, assuming no proton decay or virtual black holes, which then (on these timescales) instantaneously evaporate into sub-atomic particles. This is also the highest estimated possible time for the Black Hole Era (and subsequent Dark Era) to finally commence. Beyond this point, it is almost certain that the Universe will contain no more baryonic matter and will be an almost pure vacuum (possibly accompanied with the presence of a false vacuum) until it reaches its final energy state, assuming it does not happen before this time.",
			skimmableContent: "All iron stars collapse into black holes, assuming no proton decay or virtual black holes, which then (on these timescales) instantaneously evaporate into sub-atomic particles. This is also the highest estimated possible time for the Black Hole Era (and subsequent Dark Era) to finally commence. Beyond this point, it is almost certain that the Universe will contain no more baryonic matter and will be an almost pure vacuum (possibly accompanied with the presence of a false vacuum) until it reaches its final energy state, the heat death of the universe, assuming it does not happen before this time.",
			endMovement: true
		},
		{
			yearsFromNow: "10<sup>10<sup>120</sup></sup>",
			contentHTML: "High estimate for the time for the universe to reach its final energy state, even in the presence of a false vacuum.<sup id=\"cite_ref-linde_6-2\" class=\"reference\"><a href=\"#cite_note-linde-6\"></a></sup>",
			years: {
				base: 10,
				exp: 1e+120
			},
			category: "physics",
			id: "event-yuPb",
			startTimeInCompactUnits: 4700,
			easedStartTime: 392.7272727272727,
			cleanedContentHTML: "High estimate for the time for the universe to reach its final energy state, even in the presence of a false vacuum.",
			skimmableContent: "The universe will reach its final energy state, even in the presence of a false vacuum."
		},
		{
			yearsFromNow: "10<sup>10<sup>10<sup>56</sup></sup></sup>",
			contentHTML: "Around this vast timeframe, quantum tunnelling in any isolated patch of the vacuum could generate, via <a href=\"/wiki/Cosmic_inflation\" class=\"mw-redirect\" title=\"Cosmic inflation\">inflation</a>, new <a href=\"/wiki/Big_Bang\" title=\"Big Bang\">Big Bangs</a> giving birth to new universes. Because the total number of ways in which all the subatomic particles in the observable universe can be combined is 10<sup>10<sup>115</sup></sup>, a number which, when multiplied by 10<sup>10<sup>10<sup>56</sup></sup></sup>, disappears into the rounding error, this is also the time required for a <a href=\"/wiki/Quantum_tunnelling\" title=\"Quantum tunnelling\">quantum-tunnelled</a> and <a href=\"/wiki/Quantum_fluctuation\" title=\"Quantum fluctuation\">quantum fluctuation</a>-generated Big Bang to produce a new universe identical to our own, assuming that every new universe contained at least the same number of subatomic particles and obeyed laws of physics <a href=\"/wiki/String_theory_landscape\" title=\"String theory landscape\">within the range</a> predicted by <a href=\"/wiki/String_theory\" title=\"String theory\">string theory</a>.",
			years: {
				tooBig: true
			},
			category: "physics",
			id: "event-qQoQ",
			startTimeInCompactUnits: 5600,
			easedStartTime: 450,
			cleanedContentHTML: "Around this vast timeframe, quantum tunnelling in any isolated patch of the vacuum could generate, via <a href=\"/wiki/Cosmic_inflation\" class=\"mw-redirect\" title=\"Cosmic inflation\">inflation</a>, new <a href=\"/wiki/Big_Bang\" title=\"Big Bang\">Big Bangs</a> giving birth to new universes. Because the total number of ways in which all the subatomic particles in the observable universe can be combined is 10<sup>10<sup>115</sup></sup, a number which, when multiplied by 10<sup>10<sup>10<sup>56</sup></sup></sup>, disappears into the rounding error, this is also the time required for a <a href=\"/wiki/Quantum_tunnelling\" title=\"Quantum tunnelling\">quantum-tunnelled</a> and <a href=\"/wiki/Quantum_fluctuation\" title=\"Quantum fluctuation\">quantum fluctuation</a>-generated Big Bang to produce a new universe identical to our own, assuming that every new universe contained at least the same number of subatomic particles and obeyed laws of physics <a href=\"/wiki/String_theory_landscape\" title=\"String theory landscape\">within the range</a> predicted by <a href=\"/wiki/String_theory\" title=\"String theory\">string theory</a>.",
			speakableContent: "Quantum tunnelling in any isolated patch of the vacuum could generate, via inflation, new Big Bangs giving birth to new universes. Because the total number of ways in which all the subatomic particles in the observable universe can be combined is 10 to the 10th to the 115th power, a number which, when multiplied by 10 to the 10th to the 10th to the 56th power, disappears into the rounding error, this is also the time required for a quantum-tunnelled and quantum fluctuation-generated Big Bang to produce a new universe identical to our own.",
			skimmableContent: "Quantum tunnelling in any isolated patch of the vacuum could generate, via inflation, new Big Bangs giving birth to new universes. Because the total number of ways in which all the subatomic particles in the observable universe can be combined is 10<sup>10<sup>115</sup></sup>, a number which, when multiplied by 10<sup>10<sup>10<sup>56</sup></sup></sup>, disappears into the rounding error, this is also the time required for a quantum-tunnelled and quantum fluctuation-generated Big Bang to produce a new universe identical to our own.",
			isEnd: true
		}
	];

	var eventsList = require$$4;

	const scrollToEventDuration$1 = 500;
	const heightUnitsPerTick$4 = 20;
	const secondsPerCompactUnit$1 = 16;
	const ticksPerCompactUnit$4 = 16;
	const lowestCompactUnit$1 = eventsList[0].easedStartTime;
	const highestCompactUnit = eventsList[eventsList.length - 1].easedStartTime;
	const highestRawCompactUnit =
	  eventsList[eventsList.length - 1].startTimeInCompactUnits;
	const compactUnitRange$1 = highestCompactUnit - lowestCompactUnit$1;
	const secondsPerTick$1 = secondsPerCompactUnit$1 / ticksPerCompactUnit$4;
	const totalTicks$2 = highestCompactUnit * ticksPerCompactUnit$4;
	const speechOverlapSeconds$1 = 1.2;
	const baseSpeechVol$1 = 0.45;

	const maxCompactTimeToMod$1 = highestRawCompactUnit;
	const pieceLengthInHours = 2;
	const desiredEasedMax = (3600 * pieceLengthInHours) / secondsPerCompactUnit$1;
	const midCompactTimeToMod$1 = 100;
	const minCompactTimeToMod$1 = eventsList.find(
	  (e) => e.startTimeInCompactUnits > 0
	).startTimeInCompactUnits;
	const modRange1$1 = midCompactTimeToMod$1 - minCompactTimeToMod$1;
	const modRange2$1 = maxCompactTimeToMod$1 - midCompactTimeToMod$1;
	const desiredModRange2$1 = desiredEasedMax - midCompactTimeToMod$1;
	const bigTempoWaveAmp$1 = 0.15;
	const minVibratoTickLength$1 = 0.8;

	// At about 60 bpm, the 16-beat riff takes up about a
	// quarter of a minute.
	const ticksWherePanUnhinges$1 = 16 * 4 * 16;
	const maxConcurrentRiffs$1 = 4;

	const minTicksBetweenEventPlays$1 = 2;

	var concurrentRiffCountsForCategories$1 = {
	  earth: 1,
	  solar: 1,
	  galaxy: 2,
	  universe: 3,
	  physics: maxConcurrentRiffs$1,
	};

	const maxDistIndex$1 = 11;

	var intervals$1 = [
	  2, // octave
	  1.5, // fifth
	  4 / 3, // fourth
	  1.25, // major third
	  6 / 5, // minor third
	  9 / 8, // major second
	  16 / 9, // minor seventh
	  27 / 16, // major sixth
	  128 / 81, // minor sixth
	  243 / 128, // major seventh
	  256 / 243, // minor second
	  729 / 512, // tritone!
	];

	var consts = {
	  scrollToEventDuration: scrollToEventDuration$1,
	  heightUnitsPerTick: heightUnitsPerTick$4,
	  secondsPerCompactUnit: secondsPerCompactUnit$1,
	  ticksPerCompactUnit: ticksPerCompactUnit$4,
	  highestCompactUnit,
	  highestRawCompactUnit,
	  lowestCompactUnit: lowestCompactUnit$1,
	  compactUnitRange: compactUnitRange$1,
	  secondsPerTick: secondsPerTick$1,
	  totalTicks: totalTicks$2,
	  speechOverlapSeconds: speechOverlapSeconds$1,
	  baseSpeechVol: baseSpeechVol$1,
	  desiredEasedMax,
	  midCompactTimeToMod: midCompactTimeToMod$1,
	  minCompactTimeToMod: minCompactTimeToMod$1,
	  maxCompactTimeToMod: maxCompactTimeToMod$1,
	  modRange1: modRange1$1,
	  modRange2: modRange2$1,
	  desiredModRange2: desiredModRange2$1,
	  bigTempoWaveAmp: bigTempoWaveAmp$1,
	  minVibratoTickLength: minVibratoTickLength$1,
	  ticksWherePanUnhinges: ticksWherePanUnhinges$1,
	  concurrentRiffCountsForCategories: concurrentRiffCountsForCategories$1,
	  maxConcurrentRiffs: maxConcurrentRiffs$1,
	  maxDistIndex: maxDistIndex$1,
	  intervals: intervals$1,
	  minTicksBetweenEventPlays: minTicksBetweenEventPlays$1,
	};

	var playSynth$1 = synth;
	const {
	  secondsPerTick,
	  lowestCompactUnit,
	  compactUnitRange,
	  ticksPerCompactUnit: ticksPerCompactUnit$3,
	  maxDistIndex,
	  intervals,
	} = consts;

	const reverbWet = 0.9;
	const reverbDry = 0.1;
	const timeNeededForEnvelopeDecay = 1; // Making this too large makes things silent?
	const minimumTicksBetweenNewReverb = 20 / secondsPerTick;

	var lastEventTick = 0;

	function playEventSynth$1(opts) {
	  if (!opts.sampleDownloader.downloadStatus.samplesDownloaded) {
	    console.error(new Error('Event sample not downloaded yet!'));
	    return;
	  }

	  playEventWithSamples(opts);
	}

	function playEventWithSamples({
	  ctx,
	  events,
	  envelopeMaxGain,
	  delaySeconds = 0,
	  probable,
	  sampleDownloader,
	  muteHorns,
	}) {
	  // Big assumption: events given are close to each other in time, so
	  // the first one can be used as a proxy for the rest in some matters.
	  var firstEvent = events[0];
	  const currentTick = firstEvent.easedStartTime * ticksPerCompactUnit$3;

	  const soundDurationSeconds = Math.max(
	    firstEvent.isEnd ? 32.0 : 4.0,
	    0.5 * Math.max(Math.log(firstEvent.startTimeInCompactUnits))
	  ); // Intentionally not log10 here.

	  const envelopeDecayRateK = firstEvent.isEnd
	    ? 0
	    : Math.max(
	      (firstEvent.startTimeInCompactUnits - lowestCompactUnit) /
	          compactUnitRange,
	      0.2
	    );

	  const distanceIndex = distanceIndexForCompactUnits(
	    firstEvent.easedStartTime,
	    lowestCompactUnit,
	    compactUnitRange
	  );
	  //console.log('distanceIndex', distanceIndex);

	  var detuneAmounts = [0];
	  for (let i = 1; i < maxDistIndex - distanceIndex; ++i) {
	    detuneAmounts.push(pickDetuneAmount(maxDistIndex - distanceIndex, i));
	  }
	  //console.log('detuneAmounts', detuneAmounts);

	  var samplerKits = detuneAmounts.map((sampleDetune) => ({
	    sampleBuffer: sampleDownloader.downloadStatus.sampleBuffers[0],
	    sampleDetune,
	  }));

	  const reverbSeconds = distanceIndex * 2.5;
	  //console.log('currentTick', currentTick, 'lastEventTick', lastEventTick);

	  // If muteHorns is true, why bother going so far into this function or
	  // calling it at all? Because we still want to make our probable 'rolls' here
	  // so that all the proceeding rolls with this seed turn out the same
	  // whether horns are muted or not.
	  if (!muteHorns) {
	    playSynth$1({
	      ctx,
	      envelopeOn: true,
	      envelopeMaxGain:
	        samplerKits.length > 0
	          ? envelopeMaxGain / samplerKits.length + 0.05
	          : envelopeMaxGain,
	      envelopePeakRateK: 0.5,
	      envelopeDecayRateK,
	      timeNeededForEnvelopeDecay,
	      useCachedReverb:
	        currentTick - lastEventTick <= minimumTicksBetweenNewReverb,
	      reverbOn: true,
	      reverbSeconds,
	      reverbWet,
	      reverbDry,
	      samplerOn: true,
	      samplerKits,
	      soundDurationSeconds,
	      delaySeconds,
	    });
	  }

	  lastEventTick = currentTick;

	  function pickDetuneAmount(varianceLevel, chordIndex) {
	    const interval = intervals[Math.min(chordIndex, intervals.length - 1)];
	    const octave = probable.roll(varianceLevel / 2);
	    const cents = (octave + interval - 1) * 1200;

	    return cents;
	  }
	}

	// Goes higher the further in the future the unit is,
	// but more quickly earlier on.
	function distanceIndexForCompactUnits(
	  units,
	  lowestCompactUnit,
	  compactUnitRange
	) {
	  const proportion = (units - lowestCompactUnit) / compactUnitRange;
	  return Math.max(~~(Math.pow(proportion, 0.1) * maxDistIndex), 0.01);
	}

	var eventSynth = playEventSynth$1;

	function AddFeedbackDelay$1({ ctx, feedbackDelayEffect }) {
	  return addFeedbackDelayToChain;
	  function addFeedbackDelayToChain(activeSynths) {
	    let lastNode = activeSynths[activeSynths.length - 1].node;
	    let delay = ctx.createDelay();
	    delay.delayTime.value = feedbackDelayEffect.delaySeconds;
	    let feedback = ctx.createGain();
	    feedback.gain.value = feedbackDelayEffect.feedbackSeconds;
	    // lastNode is already connected to destination.
	    lastNode.connect(delay);
	    delay.connect(feedback);
	    feedback.connect(delay);
	    feedback.connect(ctx.destination);
	  }
	}

	var addFeedbackDelay = AddFeedbackDelay$1;

	var playSynth = synth;
	var AddFeedbackDelay = addFeedbackDelay;

	function playSample$1({
	  ctx,
	  delaySeconds = 0,
	  sampleBuffer,
	  //event,
	  soundDurationSeconds,
	  volume,
	  feedbackDelayEffect,
	}) {
	  var samplerKits = [{ sampleBuffer, sampleDetune: 0 }];

	  playSynth({
	    ctx,
	    envelopeOn: false,
	    reverbOn: false,
	    samplerOn: true,
	    gainOn: true,
	    samplerKits,
	    delaySeconds,
	    timeNeededForEnvelopeDecay: 1,
	    soundDurationSeconds,
	    gain: volume,
	    addToChain: feedbackDelayEffect
	      ? AddFeedbackDelay({ ctx, feedbackDelayEffect })
	      : undefined,
	  });
	}

	var playSample_1 = playSample$1;

	var sampleFiles$1 = [
	  'vibraphone/atonia-vibraphone-01.mp3',
	  'vibraphone/atonia-vibraphone-02.mp3',
	  'vibraphone/atonia-vibraphone-03.mp3',
	  'vibraphone/atonia-vibraphone-04.mp3',
	  'vibraphone/atonia-vibraphone-05.mp3',
	  'vibraphone/atonia-vibraphone-06.mp3',
	  'vibraphone/atonia-vibraphone-07.mp3',
	  'vibraphone/atonia-vibraphone-08.mp3',
	  'vibraphone/atonia-vibraphone-09.mp3',
	  'vibraphone/atonia-vibraphone-10.mp3',
	  'vibraphone/atonia-vibraphone-11.mp3',
	  'vibraphone/atonia-vibraphone-12.mp3',
	  'vibraphone/atonia-vibraphone-13.mp3',
	  'vibraphone/atonia-vibraphone-14.mp3',
	  'vibraphone/atonia-vibraphone-15.mp3',
	  'vibraphone/atonia-vibraphone-16.mp3',
	  'vibraphone/atonia-vibraphone-17.mp3',
	  'vibraphone/atonia-vibraphone-18.mp3',
	  'vibraphone/atonia-vibraphone-19.mp3',
	  'vibraphone/atonia-vibraphone-20.mp3',
	  'vibraphone/atonia-vibraphone-21.mp3',
	  'vibraphone/atonia-vibraphone-22.mp3',
	  'vibraphone/atonia-vibraphone-23.mp3',
	  'vibraphone/atonia-vibraphone-24.mp3',
	  'vibraphone/atonia-vibraphone-25.mp3',
	  'vibraphone/atonia-vibraphone-26.mp3',
	  'vibraphone/atonia-vibraphone-27.mp3',
	  'vibraphone/atonia-vibraphone-28.mp3',
	  'vibraphone/atonia-vibraphone-29.mp3',
	  'vibraphone/atonia-vibraphone-30.mp3',
	  'vibraphone/atonia-vibraphone-31.mp3',
	  'vibraphone/atonia-vibraphone-32.mp3',
	  'vibraphone/atonia-vibraphone-33.mp3',
	  'vibraphone/atonia-vibraphone-34.mp3',
	  'vibraphone/atonia-vibraphone-35.mp3',
	  'vibraphone/atonia-vibraphone-36.mp3',
	  'vibraphone/atonia-vibraphone-37.mp3',
	];

	function ascending(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	}

	function bisector(compare) {
	  if (compare.length === 1) compare = ascendingComparator(compare);
	  return {
	    left: function(a, x, lo, hi) {
	      if (lo == null) lo = 0;
	      if (hi == null) hi = a.length;
	      while (lo < hi) {
	        var mid = lo + hi >>> 1;
	        if (compare(a[mid], x) < 0) lo = mid + 1;
	        else hi = mid;
	      }
	      return lo;
	    },
	    right: function(a, x, lo, hi) {
	      if (lo == null) lo = 0;
	      if (hi == null) hi = a.length;
	      while (lo < hi) {
	        var mid = lo + hi >>> 1;
	        if (compare(a[mid], x) > 0) hi = mid;
	        else lo = mid + 1;
	      }
	      return lo;
	    }
	  };
	}

	function ascendingComparator(f) {
	  return function(d, x) {
	    return ascending(f(d), x);
	  };
	}

	var ascendingBisect = bisector(ascending);
	var bisectRight = ascendingBisect.right;
	var bisectLeft = ascendingBisect.left;

	function count(values, valueof) {
	  let count = 0;
	  if (valueof === undefined) {
	    for (let value of values) {
	      if (value != null && (value = +value) >= value) {
	        ++count;
	      }
	    }
	  } else {
	    let index = -1;
	    for (let value of values) {
	      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
	        ++count;
	      }
	    }
	  }
	  return count;
	}

	function length$1(array) {
	  return array.length | 0;
	}

	function empty(length) {
	  return !(length > 0);
	}

	function arrayify(values) {
	  return typeof values !== "object" || "length" in values ? values : Array.from(values);
	}

	function reducer(reduce) {
	  return values => reduce(...values);
	}

	function cross(...values) {
	  const reduce = typeof values[values.length - 1] === "function" && reducer(values.pop());
	  values = values.map(arrayify);
	  const lengths = values.map(length$1);
	  const j = values.length - 1;
	  const index = new Array(j + 1).fill(0);
	  const product = [];
	  if (j < 0 || lengths.some(empty)) return product;
	  while (true) {
	    product.push(index.map((j, i) => values[i][j]));
	    let i = j;
	    while (++index[i] === lengths[i]) {
	      if (i === 0) return reduce ? product.map(reduce) : product;
	      index[i--] = 0;
	    }
	  }
	}

	function cumsum(values, valueof) {
	  var sum = 0, index = 0;
	  return Float64Array.from(values, valueof === undefined
	    ? v => (sum += +v || 0)
	    : v => (sum += +valueof(v, index++, values) || 0));
	}

	function descending(a, b) {
	  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
	}

	function variance(values, valueof) {
	  let count = 0;
	  let delta;
	  let mean = 0;
	  let sum = 0;
	  if (valueof === undefined) {
	    for (let value of values) {
	      if (value != null && (value = +value) >= value) {
	        delta = value - mean;
	        mean += delta / ++count;
	        sum += delta * (value - mean);
	      }
	    }
	  } else {
	    let index = -1;
	    for (let value of values) {
	      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
	        delta = value - mean;
	        mean += delta / ++count;
	        sum += delta * (value - mean);
	      }
	    }
	  }
	  if (count > 1) return sum / (count - 1);
	}

	function deviation(values, valueof) {
	  const v = variance(values, valueof);
	  return v ? Math.sqrt(v) : v;
	}

	function extent(values, valueof) {
	  let min;
	  let max;
	  if (valueof === undefined) {
	    for (const value of values) {
	      if (value != null) {
	        if (min === undefined) {
	          if (value >= value) min = max = value;
	        } else {
	          if (min > value) min = value;
	          if (max < value) max = value;
	        }
	      }
	    }
	  } else {
	    let index = -1;
	    for (let value of values) {
	      if ((value = valueof(value, ++index, values)) != null) {
	        if (min === undefined) {
	          if (value >= value) min = max = value;
	        } else {
	          if (min > value) min = value;
	          if (max < value) max = value;
	        }
	      }
	    }
	  }
	  return [min, max];
	}

	function identity$3(x) {
	  return x;
	}

	function group(values, ...keys) {
	  return nest(values, identity$3, identity$3, keys);
	}

	function groups(values, ...keys) {
	  return nest(values, Array.from, identity$3, keys);
	}

	function rollup(values, reduce, ...keys) {
	  return nest(values, identity$3, reduce, keys);
	}

	function rollups(values, reduce, ...keys) {
	  return nest(values, Array.from, reduce, keys);
	}

	function nest(values, map, reduce, keys) {
	  return (function regroup(values, i) {
	    if (i >= keys.length) return reduce(values);
	    const groups = new Map();
	    const keyof = keys[i++];
	    let index = -1;
	    for (const value of values) {
	      const key = keyof(value, ++index, values);
	      const group = groups.get(key);
	      if (group) group.push(value);
	      else groups.set(key, [value]);
	    }
	    for (const [key, values] of groups) {
	      groups.set(key, regroup(values, i));
	    }
	    return map(groups);
	  })(values, 0);
	}

	var array = Array.prototype;

	var slice$1 = array.slice;

	function constant$3(x) {
	  return function() {
	    return x;
	  };
	}

	function range$2(start, stop, step) {
	  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

	  var i = -1,
	      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
	      range = new Array(n);

	  while (++i < n) {
	    range[i] = start + i * step;
	  }

	  return range;
	}

	var e10 = Math.sqrt(50),
	    e5 = Math.sqrt(10),
	    e2 = Math.sqrt(2);

	function ticks(start, stop, count) {
	  var reverse,
	      i = -1,
	      n,
	      ticks,
	      step;

	  stop = +stop, start = +start, count = +count;
	  if (start === stop && count > 0) return [start];
	  if (reverse = stop < start) n = start, start = stop, stop = n;
	  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

	  if (step > 0) {
	    start = Math.ceil(start / step);
	    stop = Math.floor(stop / step);
	    ticks = new Array(n = Math.ceil(stop - start + 1));
	    while (++i < n) ticks[i] = (start + i) * step;
	  } else {
	    start = Math.floor(start * step);
	    stop = Math.ceil(stop * step);
	    ticks = new Array(n = Math.ceil(start - stop + 1));
	    while (++i < n) ticks[i] = (start - i) / step;
	  }

	  if (reverse) ticks.reverse();

	  return ticks;
	}

	function tickIncrement(start, stop, count) {
	  var step = (stop - start) / Math.max(0, count),
	      power = Math.floor(Math.log(step) / Math.LN10),
	      error = step / Math.pow(10, power);
	  return power >= 0
	      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
	      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
	}

	function tickStep(start, stop, count) {
	  var step0 = Math.abs(stop - start) / Math.max(0, count),
	      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
	      error = step0 / step1;
	  if (error >= e10) step1 *= 10;
	  else if (error >= e5) step1 *= 5;
	  else if (error >= e2) step1 *= 2;
	  return stop < start ? -step1 : step1;
	}

	function sturges(values) {
	  return Math.ceil(Math.log(count(values)) / Math.LN2) + 1;
	}

	function bin() {
	  var value = identity$3,
	      domain = extent,
	      threshold = sturges;

	  function histogram(data) {
	    if (!Array.isArray(data)) data = Array.from(data);

	    var i,
	        n = data.length,
	        x,
	        values = new Array(n);

	    for (i = 0; i < n; ++i) {
	      values[i] = value(data[i], i, data);
	    }

	    var xz = domain(values),
	        x0 = xz[0],
	        x1 = xz[1],
	        tz = threshold(values, x0, x1);

	    // Convert number of thresholds into uniform thresholds.
	    if (!Array.isArray(tz)) {
	      tz = tickStep(x0, x1, tz);
	      tz = range$2(Math.ceil(x0 / tz) * tz, x1, tz); // exclusive
	    }

	    // Remove any thresholds outside the domain.
	    var m = tz.length;
	    while (tz[0] <= x0) tz.shift(), --m;
	    while (tz[m - 1] > x1) tz.pop(), --m;

	    var bins = new Array(m + 1),
	        bin;

	    // Initialize bins.
	    for (i = 0; i <= m; ++i) {
	      bin = bins[i] = [];
	      bin.x0 = i > 0 ? tz[i - 1] : x0;
	      bin.x1 = i < m ? tz[i] : x1;
	    }

	    // Assign data to bins by value, ignoring any outside the domain.
	    for (i = 0; i < n; ++i) {
	      x = values[i];
	      if (x0 <= x && x <= x1) {
	        bins[bisectRight(tz, x, 0, m)].push(data[i]);
	      }
	    }

	    return bins;
	  }

	  histogram.value = function(_) {
	    return arguments.length ? (value = typeof _ === "function" ? _ : constant$3(_), histogram) : value;
	  };

	  histogram.domain = function(_) {
	    return arguments.length ? (domain = typeof _ === "function" ? _ : constant$3([_[0], _[1]]), histogram) : domain;
	  };

	  histogram.thresholds = function(_) {
	    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant$3(slice$1.call(_)) : constant$3(_), histogram) : threshold;
	  };

	  return histogram;
	}

	function max(values, valueof) {
	  let max;
	  if (valueof === undefined) {
	    for (const value of values) {
	      if (value != null
	          && (max < value || (max === undefined && value >= value))) {
	        max = value;
	      }
	    }
	  } else {
	    let index = -1;
	    for (let value of values) {
	      if ((value = valueof(value, ++index, values)) != null
	          && (max < value || (max === undefined && value >= value))) {
	        max = value;
	      }
	    }
	  }
	  return max;
	}

	function min(values, valueof) {
	  let min;
	  if (valueof === undefined) {
	    for (const value of values) {
	      if (value != null
	          && (min > value || (min === undefined && value >= value))) {
	        min = value;
	      }
	    }
	  } else {
	    let index = -1;
	    for (let value of values) {
	      if ((value = valueof(value, ++index, values)) != null
	          && (min > value || (min === undefined && value >= value))) {
	        min = value;
	      }
	    }
	  }
	  return min;
	}

	// Based on https://github.com/mourner/quickselect
	// ISC license, Copyright 2018 Vladimir Agafonkin.
	function quickselect(array, k, left = 0, right = array.length - 1, compare = ascending) {
	  while (right > left) {
	    if (right - left > 600) {
	      const n = right - left + 1;
	      const m = k - left + 1;
	      const z = Math.log(n);
	      const s = 0.5 * Math.exp(2 * z / 3);
	      const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
	      const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
	      const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
	      quickselect(array, k, newLeft, newRight, compare);
	    }

	    const t = array[k];
	    let i = left;
	    let j = right;

	    swap(array, left, k);
	    if (compare(array[right], t) > 0) swap(array, left, right);

	    while (i < j) {
	      swap(array, i, j), ++i, --j;
	      while (compare(array[i], t) < 0) ++i;
	      while (compare(array[j], t) > 0) --j;
	    }

	    if (compare(array[left], t) === 0) swap(array, left, j);
	    else ++j, swap(array, j, right);

	    if (j <= k) left = j + 1;
	    if (k <= j) right = j - 1;
	  }
	  return array;
	}

	function swap(array, i, j) {
	  const t = array[i];
	  array[i] = array[j];
	  array[j] = t;
	}

	function number(x) {
	  return x === null ? NaN : +x;
	}

	function* numbers(values, valueof) {
	  if (valueof === undefined) {
	    for (let value of values) {
	      if (value != null && (value = +value) >= value) {
	        yield value;
	      }
	    }
	  } else {
	    let index = -1;
	    for (let value of values) {
	      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
	        yield value;
	      }
	    }
	  }
	}

	function quantile(values, p, valueof) {
	  values = Float64Array.from(numbers(values, valueof));
	  if (!(n = values.length)) return;
	  if ((p = +p) <= 0 || n < 2) return min(values);
	  if (p >= 1) return max(values);
	  var n,
	      i = (n - 1) * p,
	      i0 = Math.floor(i),
	      value0 = max(quickselect(values, i0).subarray(0, i0 + 1)),
	      value1 = min(values.subarray(i0 + 1));
	  return value0 + (value1 - value0) * (i - i0);
	}

	function quantileSorted(values, p, valueof = number) {
	  if (!(n = values.length)) return;
	  if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
	  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
	  var n,
	      i = (n - 1) * p,
	      i0 = Math.floor(i),
	      value0 = +valueof(values[i0], i0, values),
	      value1 = +valueof(values[i0 + 1], i0 + 1, values);
	  return value0 + (value1 - value0) * (i - i0);
	}

	function freedmanDiaconis(values, min, max) {
	  return Math.ceil((max - min) / (2 * (quantile(values, 0.75) - quantile(values, 0.25)) * Math.pow(count(values), -1 / 3)));
	}

	function scott(values, min, max) {
	  return Math.ceil((max - min) / (3.5 * deviation(values) * Math.pow(count(values), -1 / 3)));
	}

	function maxIndex(values, valueof) {
	  let max;
	  let maxIndex = -1;
	  let index = -1;
	  if (valueof === undefined) {
	    for (const value of values) {
	      ++index;
	      if (value != null
	          && (max < value || (max === undefined && value >= value))) {
	        max = value, maxIndex = index;
	      }
	    }
	  } else {
	    for (let value of values) {
	      if ((value = valueof(value, ++index, values)) != null
	          && (max < value || (max === undefined && value >= value))) {
	        max = value, maxIndex = index;
	      }
	    }
	  }
	  return maxIndex;
	}

	function mean(values, valueof) {
	  let count = 0;
	  let sum = 0;
	  if (valueof === undefined) {
	    for (let value of values) {
	      if (value != null && (value = +value) >= value) {
	        ++count, sum += value;
	      }
	    }
	  } else {
	    let index = -1;
	    for (let value of values) {
	      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
	        ++count, sum += value;
	      }
	    }
	  }
	  if (count) return sum / count;
	}

	function median(values, valueof) {
	  return quantile(values, 0.5, valueof);
	}

	function* flatten(arrays) {
	  for (const array of arrays) {
	    yield* array;
	  }
	}

	function merge(arrays) {
	  return Array.from(flatten(arrays));
	}

	function minIndex(values, valueof) {
	  let min;
	  let minIndex = -1;
	  let index = -1;
	  if (valueof === undefined) {
	    for (const value of values) {
	      ++index;
	      if (value != null
	          && (min > value || (min === undefined && value >= value))) {
	        min = value, minIndex = index;
	      }
	    }
	  } else {
	    for (let value of values) {
	      if ((value = valueof(value, ++index, values)) != null
	          && (min > value || (min === undefined && value >= value))) {
	        min = value, minIndex = index;
	      }
	    }
	  }
	  return minIndex;
	}

	function pairs(values, pairof = pair) {
	  const pairs = [];
	  let previous;
	  let first = false;
	  for (const value of values) {
	    if (first) pairs.push(pairof(previous, value));
	    previous = value;
	    first = true;
	  }
	  return pairs;
	}

	function pair(a, b) {
	  return [a, b];
	}

	function permute(source, keys) {
	  return Array.from(keys, key => source[key]);
	}

	function least(values, compare = ascending) {
	  let min;
	  let defined = false;
	  if (compare.length === 1) {
	    let minValue;
	    for (const element of values) {
	      const value = compare(element);
	      if (defined
	          ? ascending(value, minValue) < 0
	          : ascending(value, value) === 0) {
	        min = element;
	        minValue = value;
	        defined = true;
	      }
	    }
	  } else {
	    for (const value of values) {
	      if (defined
	          ? compare(value, min) < 0
	          : compare(value, value) === 0) {
	        min = value;
	        defined = true;
	      }
	    }
	  }
	  return min;
	}

	function leastIndex(values, compare = ascending) {
	  if (compare.length === 1) return minIndex(values, compare);
	  let minValue;
	  let min = -1;
	  let index = -1;
	  for (const value of values) {
	    ++index;
	    if (min < 0
	        ? compare(value, value) === 0
	        : compare(value, minValue) < 0) {
	      minValue = value;
	      min = index;
	    }
	  }
	  return min;
	}

	function greatest(values, compare = ascending) {
	  let max;
	  let defined = false;
	  if (compare.length === 1) {
	    let maxValue;
	    for (const element of values) {
	      const value = compare(element);
	      if (defined
	          ? ascending(value, maxValue) > 0
	          : ascending(value, value) === 0) {
	        max = element;
	        maxValue = value;
	        defined = true;
	      }
	    }
	  } else {
	    for (const value of values) {
	      if (defined
	          ? compare(value, max) > 0
	          : compare(value, value) === 0) {
	        max = value;
	        defined = true;
	      }
	    }
	  }
	  return max;
	}

	function greatestIndex(values, compare = ascending) {
	  if (compare.length === 1) return maxIndex(values, compare);
	  let maxValue;
	  let max = -1;
	  let index = -1;
	  for (const value of values) {
	    ++index;
	    if (max < 0
	        ? compare(value, value) === 0
	        : compare(value, maxValue) > 0) {
	      maxValue = value;
	      max = index;
	    }
	  }
	  return max;
	}

	function scan(values, compare) {
	  const index = leastIndex(values, compare);
	  return index < 0 ? undefined : index;
	}

	function shuffle(array, i0 = 0, i1 = array.length) {
	  var m = i1 - (i0 = +i0),
	      t,
	      i;

	  while (m) {
	    i = Math.random() * m-- | 0;
	    t = array[m + i0];
	    array[m + i0] = array[i + i0];
	    array[i + i0] = t;
	  }

	  return array;
	}

	function sum(values, valueof) {
	  let sum = 0;
	  if (valueof === undefined) {
	    for (let value of values) {
	      if (value = +value) {
	        sum += value;
	      }
	    }
	  } else {
	    let index = -1;
	    for (let value of values) {
	      if (value = +valueof(value, ++index, values)) {
	        sum += value;
	      }
	    }
	  }
	  return sum;
	}

	function transpose(matrix) {
	  if (!(n = matrix.length)) return [];
	  for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) {
	    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
	      row[j] = matrix[j][i];
	    }
	  }
	  return transpose;
	}

	function length(d) {
	  return d.length;
	}

	function zip() {
	  return transpose(arguments);
	}

	var src$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		bisect: bisectRight,
		bisectRight: bisectRight,
		bisectLeft: bisectLeft,
		ascending: ascending,
		bisector: bisector,
		count: count,
		cross: cross,
		cumsum: cumsum,
		descending: descending,
		deviation: deviation,
		extent: extent,
		group: group,
		groups: groups,
		rollup: rollup,
		rollups: rollups,
		bin: bin,
		histogram: bin,
		thresholdFreedmanDiaconis: freedmanDiaconis,
		thresholdScott: scott,
		thresholdSturges: sturges,
		max: max,
		maxIndex: maxIndex,
		mean: mean,
		median: median,
		merge: merge,
		min: min,
		minIndex: minIndex,
		pairs: pairs,
		permute: permute,
		quantile: quantile,
		quantileSorted: quantileSorted,
		quickselect: quickselect,
		range: range$2,
		least: least,
		leastIndex: leastIndex,
		greatest: greatest,
		greatestIndex: greatestIndex,
		scan: scan,
		shuffle: shuffle,
		sum: sum,
		ticks: ticks,
		tickIncrement: tickIncrement,
		tickStep: tickStep,
		transpose: transpose,
		variance: variance,
		zip: zip
	});

	var require$$0$1 = /*@__PURE__*/getAugmentedNamespace(src$1);

	function getAtPath$2(object, path) {
	  var current = object;
	  if (path.every(segmentExists, true)) {
	    return current;
	  }

	  function segmentExists(segment) {
	    current = current[segment];
	    return current;
	  }
	}

	var getAtPath_1 = getAtPath$2;

	var sampleFiles = sampleFiles$1;
	var { range: range$1 } = require$$0$1;
	var cloneDeep = lodash_clonedeep.exports;
	var getAtPath$1 = getAtPath_1;

	var noteNames = [
	  'A',
	  'Bb',
	  'B',
	  'C',
	  'Db',
	  'D',
	  'Eb',
	  'E',
	  'F',
	  'Gb',
	  'G',
	  'Ab',
	];

	const startOctave = 3;
	const startPitchIndex = 5; // Gb

	var pIndexes = {};

	(function fillIndexes() {
	  for (let octave = startOctave; ; octave += 1) {
	    pIndexes[octave] = {};

	    for (
	      let octaveIndex = octave === startOctave ? startPitchIndex : 0;
	      octaveIndex < 12;
	      octaveIndex += 1
	    ) {
	      const sampleIndex =
	        (octave - startOctave) * 12 + octaveIndex - startPitchIndex;
	      if (sampleIndex >= sampleFiles.length) {
	        return;
	      }
	      pIndexes[octave][noteNames[octaveIndex]] = sampleIndex;
	    }
	  }
	})();

	//console.log(pIndexes);

	function getBaseRiff(
	  riffParts,
	  probable,
	  numberOfNotesToAlter,
	  isOKToGoOutsideRiffPitches,
	  riffVolAdj = 1
	) {
	  var origParts = riffParts.map((part) =>
	    part.split(',').map(parsePitchString)
	  );
	  var parts = cloneDeep(origParts);
	  if (numberOfNotesToAlter > 0) {
	    let alterIndexes = probable
	      .shuffle(range$1(16))
	      .slice(0, numberOfNotesToAlter);
	    for (let i = 0; i < alterIndexes.length; ++i) {
	      const alterIndex = alterIndexes[i];
	      const partIndex = ~~(alterIndex / 4);
	      const noteIndex = alterIndex % 4;
	      if (isOKToGoOutsideRiffPitches) {
	        const octave = +parts[partIndex][noteIndex][0] + probable.roll(3) - 1;
	        const note = probable.pick(noteNames);
	        if (getAtPath$1(pIndexes, [octave, note])) {
	          parts[partIndex][noteIndex][0] = octave;
	          parts[partIndex][noteIndex][1] = note;
	        }
	      } else {
	        parts[partIndex][noteIndex] =
	          origParts[probable.roll(4)][probable.roll(4)];
	      }
	    }
	  }
	  var pitchPairs = parts.flat();
	  const noteCount = pitchPairs.length;

	  const emphasisMeter = probable.roll(Math.min(numberOfNotesToAlter, 7));
	  const emphasisBeat =
	    probable.roll(3) === 0 ? 0 : probable.roll(emphasisMeter);
	  const volRange =
	    (probable.roll(numberOfNotesToAlter) / noteCount / 2) * 0.03 + 0.03;
	  const softest = 0.03;
	  const loudest = volRange + softest;

	  // A non-zero start vol makes the vibraphone "ticky".
	  const makeItTicky =
	    probable.roll(numberOfNotesToAlter) / 8 > probable.roll(noteCount);

	  return pitchPairs.map(noteFromPitchPair);

	  function noteFromPitchPair(octavePitch, i) {
	    let midVol =
	      ((probable.roll(numberOfNotesToAlter) / noteCount) * 0.5 + 0.5) *
	        volRange +
	      softest;
	    if (emphasisMeter > 0 && i % emphasisMeter === emphasisBeat) {
	      midVol += ((probable.roll(50) + 50) / 100) * (loudest - midVol);
	    }
	    midVol *= riffVolAdj;

	    return {
	      pitchIndex: pIndexes[octavePitch[0]][octavePitch[1]],
	      startVol: makeItTicky ? midVol : 0,
	      midVol: makeItTicky ? 0 : midVol,
	    };
	  }
	}

	function parsePitchString(s) {
	  return [s.slice(-1), s.slice(0, -1)];
	}

	function cutRiff$1({
	  riffParts,
	  length,
	  probable,
	  numberOfNotesToAlter,
	  isOKToGoOutsideRiffPitches,
	  riffVolAdj,
	}) {
	  var baseRiff = getBaseRiff(
	    riffParts,
	    probable,
	    numberOfNotesToAlter,
	    isOKToGoOutsideRiffPitches,
	    riffVolAdj
	  );

	  if (baseRiff.length >= length) {
	    return baseRiff.slice(0, length);
	  }

	  var riff = [];
	  for (var i = 0; i < ~~(length / baseRiff.length); ++i) {
	    riff = riff.concat(baseRiff);
	  }
	  riff = riff.concat(baseRiff.slice(0, length % baseRiff.length));
	  return riff;
	}

	var cutRiff_1 = cutRiff$1;

	var cutRiff = cutRiff_1;

	function mixRiffPair$1(probable, riffPartSpec) {
	  var baseRiffLength = 4;
	  var cutBaseOpts = {
	    riffParts: riffPartSpec,
	    probable,
	    numberOfNotesToAlter: 0,
	    isOKToGoOutsideRiffPitches: false,
	  };

	  var riffABase = cutRiff(
	    Object.assign({ length: baseRiffLength }, cutBaseOpts)
	  );
	  var riffBBase = cutRiff(
	    Object.assign({ length: baseRiffLength + 1 }, cutBaseOpts)
	  );

	  var riffA = [];
	  var riffB = [];

	  for (let i = 0; i < 48; ++i) {
	    riffA = riffA.concat(riffABase);
	    riffB = riffB.concat(riffBBase);
	  }

	  for (let i = 0; i < 16; ++i) {
	    baseRiffLength += 1;
	    const riffVolAdj = getRiffVolAdj(i / 16);
	    //let variantA = probable.shuffle(riffABase);
	    //let variantB = probable.shuffle(riffBBase);

	    for (let j = 0; j < 24; ++j) {
	      if (j % 4 === 0) {
	        riffA = riffA.concat(riffABase);
	        riffB = riffB.concat(riffBBase);
	      } else {
	        let variantA = cutRiff({
	          riffParts: riffPartSpec,
	          length: baseRiffLength,
	          probable,
	          numberOfNotesToAlter: ~~(i / 2),
	          isOKToGoOutsideRiffPitches: probable.roll(i) > 12,
	          riffVolAdj,
	        });
	        let variantB = cutRiff({
	          riffParts: riffPartSpec,
	          length: baseRiffLength + 1,
	          probable,
	          numberOfNotesToAlter: ~~(i / 2),
	          isOKToGoOutsideRiffPitches: probable.roll(i) > 12,
	          riffVolAdj,
	        });
	        if (probable.roll(2) === 0) {
	          riffA = riffA.concat(variantA);
	          riffB = riffB.concat(variantB);
	        } else {
	          riffA = riffA.concat(variantB);
	          riffB = riffB.concat(variantA);
	        }
	      }
	    }
	  }
	  //console.log(riffA.map((n) => n.midVol));
	  //console.log(riffB.map((n) => n.midVol));
	  return [riffA, riffB];
	}

	// x should be between 0 and 1.
	function getRiffVolAdj(x) {
	  if (x <= 0.2) {
	    return 1;
	  }

	  return (1 / 3) * Math.cos(2.5 * 2 * Math.PI * (x - 0.2)) + 2 / 3;
	}

	var mixRiffPair_1 = mixRiffPair$1;

	function createOKNOKCallback({ ok, nok, log = console.log }) {
	  return function standardBailCallback(error) {
	    if (error) {
	      if (log) {
	        if (error.stack) {
	          log(error, error.stack);
	        } else {
	          log(error);
	        }
	      }
	      if (nok) {
	        nok(error);
	      }
	    } else if (ok) {
	      var okArgs = Array.prototype.slice.call(arguments, 1);
	      if (nok) {
	        okArgs.push(nok);
	      }
	      ok.apply(ok, okArgs);
	    }
	  };
	}

	var oknok$4 = createOKNOKCallback;

	/* global webkitAudioContext */

	function AudioContextSingleton() {
	  var audioContext;
	  var resolvedPromise = Promise.resolve();

	  return {
	    getCurrentContext,
	    getNewContext
	  };

	  function getCurrentContext(done) {
	    if (audioContext) {
	      resolvedPromise.then(() => done(null, audioContext));
	    } else {
	      getNewContext(done);
	    }
	  }

	  function getNewContext(firstParam, secondParam) {
	    var opts;
	    var done;

	    if (typeof firstParam === 'function') {
	      done = firstParam;
	    } else if (typeof secondParam === 'function') {
	      done = secondParam;
	      if (typeof firstParam === 'object') {
	        opts = firstParam;
	      }
	    }

	    if (audioContext) {
	      audioContext.close().then(passNewContext);
	    } else {
	      passNewContext();
	    }

	    function passNewContext() {
	      var acOpts;
	      if (opts && opts.sampleRate) {
	        acOpts = { sampleRate: opts.sampleRate };
	      }
	      if (typeof AudioContext === 'function') {
	        audioContext = new AudioContext(acOpts);
	      } else {
	        audioContext = new webkitAudioContext(acOpts);
	      }
	      done(null, audioContext);
	    }
	  }
	}

	var audioContextSingleton = AudioContextSingleton;

	function handleError$4(error) {
	  if (error) {
	    console.error(error, error.stack);
	    var text = '';

	    if (error.name) {
	      text += error.name + ': ';
	    }

	    text += error.message;

	    if (error.stack) {
	      text += ' | ' + error.stack.toString();
	    }
	    updateStatusMessage(text);
	  }
	}

	function updateStatusMessage(text) {
	  var statusMessage = document.getElementById('status-message');
	  statusMessage.textContent = text;
	  statusMessage.classList.remove('hidden');
	}

	var handleErrorWeb = handleError$4;

	var noop = {value: function() {}};

	function dispatch() {
	  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
	    if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
	    _[t] = [];
	  }
	  return new Dispatch(_);
	}

	function Dispatch(_) {
	  this._ = _;
	}

	function parseTypenames(typenames, types) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
	    return {type: t, name: name};
	  });
	}

	Dispatch.prototype = dispatch.prototype = {
	  constructor: Dispatch,
	  on: function(typename, callback) {
	    var _ = this._,
	        T = parseTypenames(typename + "", _),
	        t,
	        i = -1,
	        n = T.length;

	    // If no callback was specified, return the callback of the given type and name.
	    if (arguments.length < 2) {
	      while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
	      return;
	    }

	    // If a type was specified, set the callback for the given type and name.
	    // Otherwise, if a null callback was specified, remove callbacks of the given name.
	    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
	    while (++i < n) {
	      if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
	      else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
	    }

	    return this;
	  },
	  copy: function() {
	    var copy = {}, _ = this._;
	    for (var t in _) copy[t] = _[t].slice();
	    return new Dispatch(copy);
	  },
	  call: function(type, that) {
	    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  },
	  apply: function(type, that, args) {
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  }
	};

	function get$1(type, name) {
	  for (var i = 0, n = type.length, c; i < n; ++i) {
	    if ((c = type[i]).name === name) {
	      return c.value;
	    }
	  }
	}

	function set$1(type, name, callback) {
	  for (var i = 0, n = type.length; i < n; ++i) {
	    if (type[i].name === name) {
	      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
	      break;
	    }
	  }
	  if (callback != null) type.push({name: name, value: callback});
	  return type;
	}

	var frame = 0, // is an animation frame pending?
	    timeout$1 = 0, // is a timeout pending?
	    interval = 0, // are any timers active?
	    pokeDelay = 1000, // how frequently we check for clock skew
	    taskHead,
	    taskTail,
	    clockLast = 0,
	    clockNow = 0,
	    clockSkew = 0,
	    clock = typeof performance === "object" && performance.now ? performance : Date,
	    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

	function now$1() {
	  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
	}

	function clearNow() {
	  clockNow = 0;
	}

	function Timer() {
	  this._call =
	  this._time =
	  this._next = null;
	}

	Timer.prototype = timer.prototype = {
	  constructor: Timer,
	  restart: function(callback, delay, time) {
	    if (typeof callback !== "function") throw new TypeError("callback is not a function");
	    time = (time == null ? now$1() : +time) + (delay == null ? 0 : +delay);
	    if (!this._next && taskTail !== this) {
	      if (taskTail) taskTail._next = this;
	      else taskHead = this;
	      taskTail = this;
	    }
	    this._call = callback;
	    this._time = time;
	    sleep();
	  },
	  stop: function() {
	    if (this._call) {
	      this._call = null;
	      this._time = Infinity;
	      sleep();
	    }
	  }
	};

	function timer(callback, delay, time) {
	  var t = new Timer;
	  t.restart(callback, delay, time);
	  return t;
	}

	function timerFlush() {
	  now$1(); // Get the current time, if not already set.
	  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
	  var t = taskHead, e;
	  while (t) {
	    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
	    t = t._next;
	  }
	  --frame;
	}

	function wake() {
	  clockNow = (clockLast = clock.now()) + clockSkew;
	  frame = timeout$1 = 0;
	  try {
	    timerFlush();
	  } finally {
	    frame = 0;
	    nap();
	    clockNow = 0;
	  }
	}

	function poke$1() {
	  var now = clock.now(), delay = now - clockLast;
	  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
	}

	function nap() {
	  var t0, t1 = taskHead, t2, time = Infinity;
	  while (t1) {
	    if (t1._call) {
	      if (time > t1._time) time = t1._time;
	      t0 = t1, t1 = t1._next;
	    } else {
	      t2 = t1._next, t1._next = null;
	      t1 = t0 ? t0._next = t2 : taskHead = t2;
	    }
	  }
	  taskTail = t0;
	  sleep(time);
	}

	function sleep(time) {
	  if (frame) return; // Soonest alarm already set, or will be.
	  if (timeout$1) timeout$1 = clearTimeout(timeout$1);
	  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
	  if (delay > 24) {
	    if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
	    if (interval) interval = clearInterval(interval);
	  } else {
	    if (!interval) clockLast = clock.now(), interval = setInterval(poke$1, pokeDelay);
	    frame = 1, setFrame(wake);
	  }
	}

	function timeout(callback, delay, time) {
	  var t = new Timer;
	  delay = delay == null ? 0 : +delay;
	  t.restart(function(elapsed) {
	    t.stop();
	    callback(elapsed + delay);
	  }, delay, time);
	  return t;
	}

	var emptyOn = dispatch("start", "end", "cancel", "interrupt");
	var emptyTween = [];

	var CREATED = 0;
	var SCHEDULED = 1;
	var STARTING = 2;
	var STARTED = 3;
	var RUNNING = 4;
	var ENDING = 5;
	var ENDED = 6;

	function schedule(node, name, id, index, group, timing) {
	  var schedules = node.__transition;
	  if (!schedules) node.__transition = {};
	  else if (id in schedules) return;
	  create(node, id, {
	    name: name,
	    index: index, // For context during callback.
	    group: group, // For context during callback.
	    on: emptyOn,
	    tween: emptyTween,
	    time: timing.time,
	    delay: timing.delay,
	    duration: timing.duration,
	    ease: timing.ease,
	    timer: null,
	    state: CREATED
	  });
	}

	function init(node, id) {
	  var schedule = get(node, id);
	  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
	  return schedule;
	}

	function set(node, id) {
	  var schedule = get(node, id);
	  if (schedule.state > STARTED) throw new Error("too late; already running");
	  return schedule;
	}

	function get(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
	  return schedule;
	}

	function create(node, id, self) {
	  var schedules = node.__transition,
	      tween;

	  // Initialize the self timer when the transition is created.
	  // Note the actual delay is not known until the first callback!
	  schedules[id] = self;
	  self.timer = timer(schedule, 0, self.time);

	  function schedule(elapsed) {
	    self.state = SCHEDULED;
	    self.timer.restart(start, self.delay, self.time);

	    // If the elapsed delay is less than our first sleep, start immediately.
	    if (self.delay <= elapsed) start(elapsed - self.delay);
	  }

	  function start(elapsed) {
	    var i, j, n, o;

	    // If the state is not SCHEDULED, then we previously errored on start.
	    if (self.state !== SCHEDULED) return stop();

	    for (i in schedules) {
	      o = schedules[i];
	      if (o.name !== self.name) continue;

	      // While this element already has a starting transition during this frame,
	      // defer starting an interrupting transition until that transition has a
	      // chance to tick (and possibly end); see d3/d3-transition#54!
	      if (o.state === STARTED) return timeout(start);

	      // Interrupt the active transition, if any.
	      if (o.state === RUNNING) {
	        o.state = ENDED;
	        o.timer.stop();
	        o.on.call("interrupt", node, node.__data__, o.index, o.group);
	        delete schedules[i];
	      }

	      // Cancel any pre-empted transitions.
	      else if (+i < id) {
	        o.state = ENDED;
	        o.timer.stop();
	        o.on.call("cancel", node, node.__data__, o.index, o.group);
	        delete schedules[i];
	      }
	    }

	    // Defer the first tick to end of the current frame; see d3/d3#1576.
	    // Note the transition may be canceled after start and before the first tick!
	    // Note this must be scheduled before the start event; see d3/d3-transition#16!
	    // Assuming this is successful, subsequent callbacks go straight to tick.
	    timeout(function() {
	      if (self.state === STARTED) {
	        self.state = RUNNING;
	        self.timer.restart(tick, self.delay, self.time);
	        tick(elapsed);
	      }
	    });

	    // Dispatch the start event.
	    // Note this must be done before the tween are initialized.
	    self.state = STARTING;
	    self.on.call("start", node, node.__data__, self.index, self.group);
	    if (self.state !== STARTING) return; // interrupted
	    self.state = STARTED;

	    // Initialize the tween, deleting null tween.
	    tween = new Array(n = self.tween.length);
	    for (i = 0, j = -1; i < n; ++i) {
	      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
	        tween[++j] = o;
	      }
	    }
	    tween.length = j + 1;
	  }

	  function tick(elapsed) {
	    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
	        i = -1,
	        n = tween.length;

	    while (++i < n) {
	      tween[i].call(node, t);
	    }

	    // Dispatch the end event.
	    if (self.state === ENDING) {
	      self.on.call("end", node, node.__data__, self.index, self.group);
	      stop();
	    }
	  }

	  function stop() {
	    self.state = ENDED;
	    self.timer.stop();
	    delete schedules[id];
	    for (var i in schedules) return; // eslint-disable-line no-unused-vars
	    delete node.__transition;
	  }
	}

	function interrupt(node, name) {
	  var schedules = node.__transition,
	      schedule,
	      active,
	      empty = true,
	      i;

	  if (!schedules) return;

	  name = name == null ? null : name + "";

	  for (i in schedules) {
	    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
	    active = schedule.state > STARTING && schedule.state < ENDING;
	    schedule.state = ENDED;
	    schedule.timer.stop();
	    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
	    delete schedules[i];
	  }

	  if (empty) delete node.__transition;
	}

	function selection_interrupt(name) {
	  return this.each(function() {
	    interrupt(this, name);
	  });
	}

	function define(constructor, factory, prototype) {
	  constructor.prototype = factory.prototype = prototype;
	  prototype.constructor = constructor;
	}

	function extend(parent, definition) {
	  var prototype = Object.create(parent.prototype);
	  for (var key in definition) prototype[key] = definition[key];
	  return prototype;
	}

	function Color() {}

	var darker = 0.7;
	var brighter = 1 / darker;

	var reI = "\\s*([+-]?\\d+)\\s*",
	    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
	    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
	    reHex = /^#([0-9a-f]{3,8})$/,
	    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
	    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
	    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
	    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
	    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
	    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

	var named = {
	  aliceblue: 0xf0f8ff,
	  antiquewhite: 0xfaebd7,
	  aqua: 0x00ffff,
	  aquamarine: 0x7fffd4,
	  azure: 0xf0ffff,
	  beige: 0xf5f5dc,
	  bisque: 0xffe4c4,
	  black: 0x000000,
	  blanchedalmond: 0xffebcd,
	  blue: 0x0000ff,
	  blueviolet: 0x8a2be2,
	  brown: 0xa52a2a,
	  burlywood: 0xdeb887,
	  cadetblue: 0x5f9ea0,
	  chartreuse: 0x7fff00,
	  chocolate: 0xd2691e,
	  coral: 0xff7f50,
	  cornflowerblue: 0x6495ed,
	  cornsilk: 0xfff8dc,
	  crimson: 0xdc143c,
	  cyan: 0x00ffff,
	  darkblue: 0x00008b,
	  darkcyan: 0x008b8b,
	  darkgoldenrod: 0xb8860b,
	  darkgray: 0xa9a9a9,
	  darkgreen: 0x006400,
	  darkgrey: 0xa9a9a9,
	  darkkhaki: 0xbdb76b,
	  darkmagenta: 0x8b008b,
	  darkolivegreen: 0x556b2f,
	  darkorange: 0xff8c00,
	  darkorchid: 0x9932cc,
	  darkred: 0x8b0000,
	  darksalmon: 0xe9967a,
	  darkseagreen: 0x8fbc8f,
	  darkslateblue: 0x483d8b,
	  darkslategray: 0x2f4f4f,
	  darkslategrey: 0x2f4f4f,
	  darkturquoise: 0x00ced1,
	  darkviolet: 0x9400d3,
	  deeppink: 0xff1493,
	  deepskyblue: 0x00bfff,
	  dimgray: 0x696969,
	  dimgrey: 0x696969,
	  dodgerblue: 0x1e90ff,
	  firebrick: 0xb22222,
	  floralwhite: 0xfffaf0,
	  forestgreen: 0x228b22,
	  fuchsia: 0xff00ff,
	  gainsboro: 0xdcdcdc,
	  ghostwhite: 0xf8f8ff,
	  gold: 0xffd700,
	  goldenrod: 0xdaa520,
	  gray: 0x808080,
	  green: 0x008000,
	  greenyellow: 0xadff2f,
	  grey: 0x808080,
	  honeydew: 0xf0fff0,
	  hotpink: 0xff69b4,
	  indianred: 0xcd5c5c,
	  indigo: 0x4b0082,
	  ivory: 0xfffff0,
	  khaki: 0xf0e68c,
	  lavender: 0xe6e6fa,
	  lavenderblush: 0xfff0f5,
	  lawngreen: 0x7cfc00,
	  lemonchiffon: 0xfffacd,
	  lightblue: 0xadd8e6,
	  lightcoral: 0xf08080,
	  lightcyan: 0xe0ffff,
	  lightgoldenrodyellow: 0xfafad2,
	  lightgray: 0xd3d3d3,
	  lightgreen: 0x90ee90,
	  lightgrey: 0xd3d3d3,
	  lightpink: 0xffb6c1,
	  lightsalmon: 0xffa07a,
	  lightseagreen: 0x20b2aa,
	  lightskyblue: 0x87cefa,
	  lightslategray: 0x778899,
	  lightslategrey: 0x778899,
	  lightsteelblue: 0xb0c4de,
	  lightyellow: 0xffffe0,
	  lime: 0x00ff00,
	  limegreen: 0x32cd32,
	  linen: 0xfaf0e6,
	  magenta: 0xff00ff,
	  maroon: 0x800000,
	  mediumaquamarine: 0x66cdaa,
	  mediumblue: 0x0000cd,
	  mediumorchid: 0xba55d3,
	  mediumpurple: 0x9370db,
	  mediumseagreen: 0x3cb371,
	  mediumslateblue: 0x7b68ee,
	  mediumspringgreen: 0x00fa9a,
	  mediumturquoise: 0x48d1cc,
	  mediumvioletred: 0xc71585,
	  midnightblue: 0x191970,
	  mintcream: 0xf5fffa,
	  mistyrose: 0xffe4e1,
	  moccasin: 0xffe4b5,
	  navajowhite: 0xffdead,
	  navy: 0x000080,
	  oldlace: 0xfdf5e6,
	  olive: 0x808000,
	  olivedrab: 0x6b8e23,
	  orange: 0xffa500,
	  orangered: 0xff4500,
	  orchid: 0xda70d6,
	  palegoldenrod: 0xeee8aa,
	  palegreen: 0x98fb98,
	  paleturquoise: 0xafeeee,
	  palevioletred: 0xdb7093,
	  papayawhip: 0xffefd5,
	  peachpuff: 0xffdab9,
	  peru: 0xcd853f,
	  pink: 0xffc0cb,
	  plum: 0xdda0dd,
	  powderblue: 0xb0e0e6,
	  purple: 0x800080,
	  rebeccapurple: 0x663399,
	  red: 0xff0000,
	  rosybrown: 0xbc8f8f,
	  royalblue: 0x4169e1,
	  saddlebrown: 0x8b4513,
	  salmon: 0xfa8072,
	  sandybrown: 0xf4a460,
	  seagreen: 0x2e8b57,
	  seashell: 0xfff5ee,
	  sienna: 0xa0522d,
	  silver: 0xc0c0c0,
	  skyblue: 0x87ceeb,
	  slateblue: 0x6a5acd,
	  slategray: 0x708090,
	  slategrey: 0x708090,
	  snow: 0xfffafa,
	  springgreen: 0x00ff7f,
	  steelblue: 0x4682b4,
	  tan: 0xd2b48c,
	  teal: 0x008080,
	  thistle: 0xd8bfd8,
	  tomato: 0xff6347,
	  turquoise: 0x40e0d0,
	  violet: 0xee82ee,
	  wheat: 0xf5deb3,
	  white: 0xffffff,
	  whitesmoke: 0xf5f5f5,
	  yellow: 0xffff00,
	  yellowgreen: 0x9acd32
	};

	define(Color, color, {
	  copy: function(channels) {
	    return Object.assign(new this.constructor, this, channels);
	  },
	  displayable: function() {
	    return this.rgb().displayable();
	  },
	  hex: color_formatHex, // Deprecated! Use color.formatHex.
	  formatHex: color_formatHex,
	  formatHsl: color_formatHsl,
	  formatRgb: color_formatRgb,
	  toString: color_formatRgb
	});

	function color_formatHex() {
	  return this.rgb().formatHex();
	}

	function color_formatHsl() {
	  return hslConvert(this).formatHsl();
	}

	function color_formatRgb() {
	  return this.rgb().formatRgb();
	}

	function color(format) {
	  var m, l;
	  format = (format + "").trim().toLowerCase();
	  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
	      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
	      : l === 8 ? new Rgb(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
	      : l === 4 ? new Rgb((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
	      : null) // invalid hex
	      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
	      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
	      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
	      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
	      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
	      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
	      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
	      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
	      : null;
	}

	function rgbn(n) {
	  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
	}

	function rgba(r, g, b, a) {
	  if (a <= 0) r = g = b = NaN;
	  return new Rgb(r, g, b, a);
	}

	function rgbConvert(o) {
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Rgb;
	  o = o.rgb();
	  return new Rgb(o.r, o.g, o.b, o.opacity);
	}

	function rgb(r, g, b, opacity) {
	  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
	}

	function Rgb(r, g, b, opacity) {
	  this.r = +r;
	  this.g = +g;
	  this.b = +b;
	  this.opacity = +opacity;
	}

	define(Rgb, rgb, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  rgb: function() {
	    return this;
	  },
	  displayable: function() {
	    return (-0.5 <= this.r && this.r < 255.5)
	        && (-0.5 <= this.g && this.g < 255.5)
	        && (-0.5 <= this.b && this.b < 255.5)
	        && (0 <= this.opacity && this.opacity <= 1);
	  },
	  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
	  formatHex: rgb_formatHex,
	  formatRgb: rgb_formatRgb,
	  toString: rgb_formatRgb
	}));

	function rgb_formatHex() {
	  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
	}

	function rgb_formatRgb() {
	  var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
	  return (a === 1 ? "rgb(" : "rgba(")
	      + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
	      + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
	      + Math.max(0, Math.min(255, Math.round(this.b) || 0))
	      + (a === 1 ? ")" : ", " + a + ")");
	}

	function hex(value) {
	  value = Math.max(0, Math.min(255, Math.round(value) || 0));
	  return (value < 16 ? "0" : "") + value.toString(16);
	}

	function hsla(h, s, l, a) {
	  if (a <= 0) h = s = l = NaN;
	  else if (l <= 0 || l >= 1) h = s = NaN;
	  else if (s <= 0) h = NaN;
	  return new Hsl(h, s, l, a);
	}

	function hslConvert(o) {
	  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Hsl;
	  if (o instanceof Hsl) return o;
	  o = o.rgb();
	  var r = o.r / 255,
	      g = o.g / 255,
	      b = o.b / 255,
	      min = Math.min(r, g, b),
	      max = Math.max(r, g, b),
	      h = NaN,
	      s = max - min,
	      l = (max + min) / 2;
	  if (s) {
	    if (r === max) h = (g - b) / s + (g < b) * 6;
	    else if (g === max) h = (b - r) / s + 2;
	    else h = (r - g) / s + 4;
	    s /= l < 0.5 ? max + min : 2 - max - min;
	    h *= 60;
	  } else {
	    s = l > 0 && l < 1 ? 0 : h;
	  }
	  return new Hsl(h, s, l, o.opacity);
	}

	function hsl(h, s, l, opacity) {
	  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
	}

	function Hsl(h, s, l, opacity) {
	  this.h = +h;
	  this.s = +s;
	  this.l = +l;
	  this.opacity = +opacity;
	}

	define(Hsl, hsl, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb: function() {
	    var h = this.h % 360 + (this.h < 0) * 360,
	        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
	        l = this.l,
	        m2 = l + (l < 0.5 ? l : 1 - l) * s,
	        m1 = 2 * l - m2;
	    return new Rgb(
	      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
	      hsl2rgb(h, m1, m2),
	      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
	      this.opacity
	    );
	  },
	  displayable: function() {
	    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
	        && (0 <= this.l && this.l <= 1)
	        && (0 <= this.opacity && this.opacity <= 1);
	  },
	  formatHsl: function() {
	    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
	    return (a === 1 ? "hsl(" : "hsla(")
	        + (this.h || 0) + ", "
	        + (this.s || 0) * 100 + "%, "
	        + (this.l || 0) * 100 + "%"
	        + (a === 1 ? ")" : ", " + a + ")");
	  }
	}));

	/* From FvD 13.37, CSS Color Module Level 3 */
	function hsl2rgb(h, m1, m2) {
	  return (h < 60 ? m1 + (m2 - m1) * h / 60
	      : h < 180 ? m2
	      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
	      : m1) * 255;
	}

	function constant$2(x) {
	  return function() {
	    return x;
	  };
	}

	function linear(a, d) {
	  return function(t) {
	    return a + t * d;
	  };
	}

	function exponential(a, b, y) {
	  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
	    return Math.pow(a + t * b, y);
	  };
	}

	function gamma(y) {
	  return (y = +y) === 1 ? nogamma : function(a, b) {
	    return b - a ? exponential(a, b, y) : constant$2(isNaN(a) ? b : a);
	  };
	}

	function nogamma(a, b) {
	  var d = b - a;
	  return d ? linear(a, d) : constant$2(isNaN(a) ? b : a);
	}

	var interpolateRgb = (function rgbGamma(y) {
	  var color = gamma(y);

	  function rgb$1(start, end) {
	    var r = color((start = rgb(start)).r, (end = rgb(end)).r),
	        g = color(start.g, end.g),
	        b = color(start.b, end.b),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.r = r(t);
	      start.g = g(t);
	      start.b = b(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }

	  rgb$1.gamma = rgbGamma;

	  return rgb$1;
	})(1);

	function interpolateNumber(a, b) {
	  return a = +a, b = +b, function(t) {
	    return a * (1 - t) + b * t;
	  };
	}

	var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
	    reB = new RegExp(reA.source, "g");

	function zero(b) {
	  return function() {
	    return b;
	  };
	}

	function one(b) {
	  return function(t) {
	    return b(t) + "";
	  };
	}

	function interpolateString(a, b) {
	  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
	      am, // current match in a
	      bm, // current match in b
	      bs, // string preceding current number in b, if any
	      i = -1, // index in s
	      s = [], // string constants and placeholders
	      q = []; // number interpolators

	  // Coerce inputs to strings.
	  a = a + "", b = b + "";

	  // Interpolate pairs of numbers in a & b.
	  while ((am = reA.exec(a))
	      && (bm = reB.exec(b))) {
	    if ((bs = bm.index) > bi) { // a string precedes the next number in b
	      bs = b.slice(bi, bs);
	      if (s[i]) s[i] += bs; // coalesce with previous string
	      else s[++i] = bs;
	    }
	    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
	      if (s[i]) s[i] += bm; // coalesce with previous string
	      else s[++i] = bm;
	    } else { // interpolate non-matching numbers
	      s[++i] = null;
	      q.push({i: i, x: interpolateNumber(am, bm)});
	    }
	    bi = reB.lastIndex;
	  }

	  // Add remains of b.
	  if (bi < b.length) {
	    bs = b.slice(bi);
	    if (s[i]) s[i] += bs; // coalesce with previous string
	    else s[++i] = bs;
	  }

	  // Special optimization for only a single match.
	  // Otherwise, interpolate each of the numbers and rejoin the string.
	  return s.length < 2 ? (q[0]
	      ? one(q[0].x)
	      : zero(b))
	      : (b = q.length, function(t) {
	          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
	          return s.join("");
	        });
	}

	var degrees = 180 / Math.PI;

	var identity$2 = {
	  translateX: 0,
	  translateY: 0,
	  rotate: 0,
	  skewX: 0,
	  scaleX: 1,
	  scaleY: 1
	};

	function decompose(a, b, c, d, e, f) {
	  var scaleX, scaleY, skewX;
	  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
	  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
	  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
	  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
	  return {
	    translateX: e,
	    translateY: f,
	    rotate: Math.atan2(b, a) * degrees,
	    skewX: Math.atan(skewX) * degrees,
	    scaleX: scaleX,
	    scaleY: scaleY
	  };
	}

	var cssNode,
	    cssRoot,
	    cssView,
	    svgNode;

	function parseCss(value) {
	  if (value === "none") return identity$2;
	  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
	  cssNode.style.transform = value;
	  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
	  cssRoot.removeChild(cssNode);
	  value = value.slice(7, -1).split(",");
	  return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
	}

	function parseSvg(value) {
	  if (value == null) return identity$2;
	  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
	  svgNode.setAttribute("transform", value);
	  if (!(value = svgNode.transform.baseVal.consolidate())) return identity$2;
	  value = value.matrix;
	  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
	}

	function interpolateTransform(parse, pxComma, pxParen, degParen) {

	  function pop(s) {
	    return s.length ? s.pop() + " " : "";
	  }

	  function translate(xa, ya, xb, yb, s, q) {
	    if (xa !== xb || ya !== yb) {
	      var i = s.push("translate(", null, pxComma, null, pxParen);
	      q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
	    } else if (xb || yb) {
	      s.push("translate(" + xb + pxComma + yb + pxParen);
	    }
	  }

	  function rotate(a, b, s, q) {
	    if (a !== b) {
	      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
	      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
	    } else if (b) {
	      s.push(pop(s) + "rotate(" + b + degParen);
	    }
	  }

	  function skewX(a, b, s, q) {
	    if (a !== b) {
	      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
	    } else if (b) {
	      s.push(pop(s) + "skewX(" + b + degParen);
	    }
	  }

	  function scale(xa, ya, xb, yb, s, q) {
	    if (xa !== xb || ya !== yb) {
	      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
	      q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
	    } else if (xb !== 1 || yb !== 1) {
	      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
	    }
	  }

	  return function(a, b) {
	    var s = [], // string constants and placeholders
	        q = []; // number interpolators
	    a = parse(a), b = parse(b);
	    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
	    rotate(a.rotate, b.rotate, s, q);
	    skewX(a.skewX, b.skewX, s, q);
	    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
	    a = b = null; // gc
	    return function(t) {
	      var i = -1, n = q.length, o;
	      while (++i < n) s[(o = q[i]).i] = o.x(t);
	      return s.join("");
	    };
	  };
	}

	var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
	var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

	function tweenRemove(id, name) {
	  var tween0, tween1;
	  return function() {
	    var schedule = set(this, id),
	        tween = schedule.tween;

	    // If this node shared tween with the previous node,
	    // just assign the updated shared tween and we’re done!
	    // Otherwise, copy-on-write.
	    if (tween !== tween0) {
	      tween1 = tween0 = tween;
	      for (var i = 0, n = tween1.length; i < n; ++i) {
	        if (tween1[i].name === name) {
	          tween1 = tween1.slice();
	          tween1.splice(i, 1);
	          break;
	        }
	      }
	    }

	    schedule.tween = tween1;
	  };
	}

	function tweenFunction(id, name, value) {
	  var tween0, tween1;
	  if (typeof value !== "function") throw new Error;
	  return function() {
	    var schedule = set(this, id),
	        tween = schedule.tween;

	    // If this node shared tween with the previous node,
	    // just assign the updated shared tween and we’re done!
	    // Otherwise, copy-on-write.
	    if (tween !== tween0) {
	      tween1 = (tween0 = tween).slice();
	      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
	        if (tween1[i].name === name) {
	          tween1[i] = t;
	          break;
	        }
	      }
	      if (i === n) tween1.push(t);
	    }

	    schedule.tween = tween1;
	  };
	}

	function transition_tween(name, value) {
	  var id = this._id;

	  name += "";

	  if (arguments.length < 2) {
	    var tween = get(this.node(), id).tween;
	    for (var i = 0, n = tween.length, t; i < n; ++i) {
	      if ((t = tween[i]).name === name) {
	        return t.value;
	      }
	    }
	    return null;
	  }

	  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
	}

	function tweenValue(transition, name, value) {
	  var id = transition._id;

	  transition.each(function() {
	    var schedule = set(this, id);
	    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
	  });

	  return function(node) {
	    return get(node, id).value[name];
	  };
	}

	function interpolate(a, b) {
	  var c;
	  return (typeof b === "number" ? interpolateNumber
	      : b instanceof color ? interpolateRgb
	      : (c = color(b)) ? (b = c, interpolateRgb)
	      : interpolateString)(a, b);
	}

	function attrRemove(name) {
	  return function() {
	    this.removeAttribute(name);
	  };
	}

	function attrRemoveNS(fullname) {
	  return function() {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}

	function attrConstant(name, interpolate, value1) {
	  var string00,
	      string1 = value1 + "",
	      interpolate0;
	  return function() {
	    var string0 = this.getAttribute(name);
	    return string0 === string1 ? null
	        : string0 === string00 ? interpolate0
	        : interpolate0 = interpolate(string00 = string0, value1);
	  };
	}

	function attrConstantNS(fullname, interpolate, value1) {
	  var string00,
	      string1 = value1 + "",
	      interpolate0;
	  return function() {
	    var string0 = this.getAttributeNS(fullname.space, fullname.local);
	    return string0 === string1 ? null
	        : string0 === string00 ? interpolate0
	        : interpolate0 = interpolate(string00 = string0, value1);
	  };
	}

	function attrFunction(name, interpolate, value) {
	  var string00,
	      string10,
	      interpolate0;
	  return function() {
	    var string0, value1 = value(this), string1;
	    if (value1 == null) return void this.removeAttribute(name);
	    string0 = this.getAttribute(name);
	    string1 = value1 + "";
	    return string0 === string1 ? null
	        : string0 === string00 && string1 === string10 ? interpolate0
	        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
	  };
	}

	function attrFunctionNS(fullname, interpolate, value) {
	  var string00,
	      string10,
	      interpolate0;
	  return function() {
	    var string0, value1 = value(this), string1;
	    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
	    string0 = this.getAttributeNS(fullname.space, fullname.local);
	    string1 = value1 + "";
	    return string0 === string1 ? null
	        : string0 === string00 && string1 === string10 ? interpolate0
	        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
	  };
	}

	function transition_attr(name, value) {
	  var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
	  return this.attrTween(name, typeof value === "function"
	      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
	      : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
	      : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
	}

	function attrInterpolate(name, i) {
	  return function(t) {
	    this.setAttribute(name, i.call(this, t));
	  };
	}

	function attrInterpolateNS(fullname, i) {
	  return function(t) {
	    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
	  };
	}

	function attrTweenNS(fullname, value) {
	  var t0, i0;
	  function tween() {
	    var i = value.apply(this, arguments);
	    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
	    return t0;
	  }
	  tween._value = value;
	  return tween;
	}

	function attrTween(name, value) {
	  var t0, i0;
	  function tween() {
	    var i = value.apply(this, arguments);
	    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
	    return t0;
	  }
	  tween._value = value;
	  return tween;
	}

	function transition_attrTween(name, value) {
	  var key = "attr." + name;
	  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error;
	  var fullname = namespace(name);
	  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
	}

	function delayFunction(id, value) {
	  return function() {
	    init(this, id).delay = +value.apply(this, arguments);
	  };
	}

	function delayConstant(id, value) {
	  return value = +value, function() {
	    init(this, id).delay = value;
	  };
	}

	function transition_delay(value) {
	  var id = this._id;

	  return arguments.length
	      ? this.each((typeof value === "function"
	          ? delayFunction
	          : delayConstant)(id, value))
	      : get(this.node(), id).delay;
	}

	function durationFunction(id, value) {
	  return function() {
	    set(this, id).duration = +value.apply(this, arguments);
	  };
	}

	function durationConstant(id, value) {
	  return value = +value, function() {
	    set(this, id).duration = value;
	  };
	}

	function transition_duration(value) {
	  var id = this._id;

	  return arguments.length
	      ? this.each((typeof value === "function"
	          ? durationFunction
	          : durationConstant)(id, value))
	      : get(this.node(), id).duration;
	}

	function easeConstant(id, value) {
	  if (typeof value !== "function") throw new Error;
	  return function() {
	    set(this, id).ease = value;
	  };
	}

	function transition_ease(value) {
	  var id = this._id;

	  return arguments.length
	      ? this.each(easeConstant(id, value))
	      : get(this.node(), id).ease;
	}

	function transition_filter(match) {
	  if (typeof match !== "function") match = matcher(match);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup.push(node);
	      }
	    }
	  }

	  return new Transition(subgroups, this._parents, this._name, this._id);
	}

	function transition_merge(transition) {
	  if (transition._id !== this._id) throw new Error;

	  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group0[i] || group1[i]) {
	        merge[i] = node;
	      }
	    }
	  }

	  for (; j < m0; ++j) {
	    merges[j] = groups0[j];
	  }

	  return new Transition(merges, this._parents, this._name, this._id);
	}

	function start$1(name) {
	  return (name + "").trim().split(/^|\s+/).every(function(t) {
	    var i = t.indexOf(".");
	    if (i >= 0) t = t.slice(0, i);
	    return !t || t === "start";
	  });
	}

	function onFunction(id, name, listener) {
	  var on0, on1, sit = start$1(name) ? init : set;
	  return function() {
	    var schedule = sit(this, id),
	        on = schedule.on;

	    // If this node shared a dispatch with the previous node,
	    // just assign the updated shared dispatch and we’re done!
	    // Otherwise, copy-on-write.
	    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

	    schedule.on = on1;
	  };
	}

	function transition_on(name, listener) {
	  var id = this._id;

	  return arguments.length < 2
	      ? get(this.node(), id).on.on(name)
	      : this.each(onFunction(id, name, listener));
	}

	function removeFunction(id) {
	  return function() {
	    var parent = this.parentNode;
	    for (var i in this.__transition) if (+i !== id) return;
	    if (parent) parent.removeChild(this);
	  };
	}

	function transition_remove() {
	  return this.on("end.remove", removeFunction(this._id));
	}

	function transition_select(select) {
	  var name = this._name,
	      id = this._id;

	  if (typeof select !== "function") select = selector(select);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	        schedule(subgroup[i], name, id, i, subgroup, get(node, id));
	      }
	    }
	  }

	  return new Transition(subgroups, this._parents, name, id);
	}

	function transition_selectAll(select) {
	  var name = this._name,
	      id = this._id;

	  if (typeof select !== "function") select = selectorAll(select);

	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
	          if (child = children[k]) {
	            schedule(child, name, id, k, children, inherit);
	          }
	        }
	        subgroups.push(children);
	        parents.push(node);
	      }
	    }
	  }

	  return new Transition(subgroups, parents, name, id);
	}

	var Selection = selection.prototype.constructor;

	function transition_selection() {
	  return new Selection(this._groups, this._parents);
	}

	function styleNull(name, interpolate) {
	  var string00,
	      string10,
	      interpolate0;
	  return function() {
	    var string0 = styleValue(this, name),
	        string1 = (this.style.removeProperty(name), styleValue(this, name));
	    return string0 === string1 ? null
	        : string0 === string00 && string1 === string10 ? interpolate0
	        : interpolate0 = interpolate(string00 = string0, string10 = string1);
	  };
	}

	function styleRemove(name) {
	  return function() {
	    this.style.removeProperty(name);
	  };
	}

	function styleConstant(name, interpolate, value1) {
	  var string00,
	      string1 = value1 + "",
	      interpolate0;
	  return function() {
	    var string0 = styleValue(this, name);
	    return string0 === string1 ? null
	        : string0 === string00 ? interpolate0
	        : interpolate0 = interpolate(string00 = string0, value1);
	  };
	}

	function styleFunction(name, interpolate, value) {
	  var string00,
	      string10,
	      interpolate0;
	  return function() {
	    var string0 = styleValue(this, name),
	        value1 = value(this),
	        string1 = value1 + "";
	    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
	    return string0 === string1 ? null
	        : string0 === string00 && string1 === string10 ? interpolate0
	        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
	  };
	}

	function styleMaybeRemove(id, name) {
	  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
	  return function() {
	    var schedule = set(this, id),
	        on = schedule.on,
	        listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

	    // If this node shared a dispatch with the previous node,
	    // just assign the updated shared dispatch and we’re done!
	    // Otherwise, copy-on-write.
	    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

	    schedule.on = on1;
	  };
	}

	function transition_style(name, value, priority) {
	  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
	  return value == null ? this
	      .styleTween(name, styleNull(name, i))
	      .on("end.style." + name, styleRemove(name))
	    : typeof value === "function" ? this
	      .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
	      .each(styleMaybeRemove(this._id, name))
	    : this
	      .styleTween(name, styleConstant(name, i, value), priority)
	      .on("end.style." + name, null);
	}

	function styleInterpolate(name, i, priority) {
	  return function(t) {
	    this.style.setProperty(name, i.call(this, t), priority);
	  };
	}

	function styleTween(name, value, priority) {
	  var t, i0;
	  function tween() {
	    var i = value.apply(this, arguments);
	    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
	    return t;
	  }
	  tween._value = value;
	  return tween;
	}

	function transition_styleTween(name, value, priority) {
	  var key = "style." + (name += "");
	  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error;
	  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
	}

	function textConstant(value) {
	  return function() {
	    this.textContent = value;
	  };
	}

	function textFunction(value) {
	  return function() {
	    var value1 = value(this);
	    this.textContent = value1 == null ? "" : value1;
	  };
	}

	function transition_text(value) {
	  return this.tween("text", typeof value === "function"
	      ? textFunction(tweenValue(this, "text", value))
	      : textConstant(value == null ? "" : value + ""));
	}

	function textInterpolate(i) {
	  return function(t) {
	    this.textContent = i.call(this, t);
	  };
	}

	function textTween(value) {
	  var t0, i0;
	  function tween() {
	    var i = value.apply(this, arguments);
	    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
	    return t0;
	  }
	  tween._value = value;
	  return tween;
	}

	function transition_textTween(value) {
	  var key = "text";
	  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error;
	  return this.tween(key, textTween(value));
	}

	function transition_transition() {
	  var name = this._name,
	      id0 = this._id,
	      id1 = newId();

	  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        var inherit = get(node, id0);
	        schedule(node, name, id1, i, group, {
	          time: inherit.time + inherit.delay + inherit.duration,
	          delay: 0,
	          duration: inherit.duration,
	          ease: inherit.ease
	        });
	      }
	    }
	  }

	  return new Transition(groups, this._parents, name, id1);
	}

	function transition_end() {
	  var on0, on1, that = this, id = that._id, size = that.size();
	  return new Promise(function(resolve, reject) {
	    var cancel = {value: reject},
	        end = {value: function() { if (--size === 0) resolve(); }};

	    that.each(function() {
	      var schedule = set(this, id),
	          on = schedule.on;

	      // If this node shared a dispatch with the previous node,
	      // just assign the updated shared dispatch and we’re done!
	      // Otherwise, copy-on-write.
	      if (on !== on0) {
	        on1 = (on0 = on).copy();
	        on1._.cancel.push(cancel);
	        on1._.interrupt.push(cancel);
	        on1._.end.push(end);
	      }

	      schedule.on = on1;
	    });
	  });
	}

	var id = 0;

	function Transition(groups, parents, name, id) {
	  this._groups = groups;
	  this._parents = parents;
	  this._name = name;
	  this._id = id;
	}

	function newId() {
	  return ++id;
	}

	var selection_prototype = selection.prototype;

	Transition.prototype = {
	  constructor: Transition,
	  select: transition_select,
	  selectAll: transition_selectAll,
	  filter: transition_filter,
	  merge: transition_merge,
	  selection: transition_selection,
	  transition: transition_transition,
	  call: selection_prototype.call,
	  nodes: selection_prototype.nodes,
	  node: selection_prototype.node,
	  size: selection_prototype.size,
	  empty: selection_prototype.empty,
	  each: selection_prototype.each,
	  on: transition_on,
	  attr: transition_attr,
	  attrTween: transition_attrTween,
	  style: transition_style,
	  styleTween: transition_styleTween,
	  text: transition_text,
	  textTween: transition_textTween,
	  remove: transition_remove,
	  tween: transition_tween,
	  delay: transition_delay,
	  duration: transition_duration,
	  ease: transition_ease,
	  end: transition_end
	};

	function cubicInOut(t) {
	  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
	}

	var defaultTiming = {
	  time: null, // Set on use.
	  delay: 0,
	  duration: 250,
	  ease: cubicInOut
	};

	function inherit(node, id) {
	  var timing;
	  while (!(timing = node.__transition) || !(timing = timing[id])) {
	    if (!(node = node.parentNode)) {
	      return defaultTiming.time = now$1(), defaultTiming;
	    }
	  }
	  return timing;
	}

	function selection_transition(name) {
	  var id,
	      timing;

	  if (name instanceof Transition) {
	    id = name._id, name = name._name;
	  } else {
	    id = newId(), (timing = defaultTiming).time = now$1(), name = name == null ? null : name + "";
	  }

	  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        schedule(node, name, id, i, group, timing || inherit(node, id));
	      }
	    }
	  }

	  return new Transition(groups, this._parents, name, id);
	}

	selection.prototype.interrupt = selection_interrupt;
	selection.prototype.transition = selection_transition;

	var getAtPath = getAtPath_1;

	function accessor$2(prop, defaultValue) {
	  var property = 'id';

	  if (prop) {
	    if (prop === 'identity') {
	      return identity$1;
	    }

	    if (typeof prop === 'string') {
	      property = prop;
	    } else if (typeof prop === 'object' && typeof prop.path === 'string') {
	      property = prop.path.split('/');
	    } else {
	      property = '' + prop;
	    }
	  }

	  var accessProperty = createAccessor(property, defaultValue);
	  return accessProperty;
	}

	function createAccessor(property, defaultValue) {
	  return accessProperty;

	  function accessProperty(d) {
	    if (typeof d === 'object') {
	      var value = getPropFromObject(d, property);
	      if (value === undefined) {
	        return defaultValue;
	      } else {
	        return value;
	      }
	    } else {
	      return defaultValue;
	    }
	  }

	  function getPropFromObject(d, prop) {
	    if (typeof prop === 'string') {
	      return d[prop];
	    } else if (Array.isArray(prop)) {
	      return getAtPath(d, prop);
	    }
	  }
	}

	function identity$1(x) {
	  return x;
	}

	var accessor_1 = accessor$2;

	var d3$3 = require$$1$2;
	var accessor$1 = accessor_1;
	const { heightUnitsPerTick: heightUnitsPerTick$3, ticksPerCompactUnit: ticksPerCompactUnit$2 } = consts;

	const timeLabelHeight = 100;
	const labelAppearDuration = 400;
	var board$1 = d3$3.select('#board');

	// Intended to be called one time.
	function renderTimeline$1({ eventData, ticksTicked }) {
	  var containerRoot = board$1.select('.timeline-root-container');
	  var timelineRoot = containerRoot.select('.timeline-root');
	  renderLabels({ eventData, heightUnitsPerTick: heightUnitsPerTick$3 });

	  const lineLength = ticksTicked * heightUnitsPerTick$3;
	  board$1.select('.time-line').attr('y2', -lineLength);

	  function renderLabels({ eventData, heightUnitsPerTick }) {
	    var events = timelineRoot.selectAll('.event').data(eventData, accessor$1());
	    events.exit().remove();
	    var newEvents = events
	      .enter()
	      .append('g')
	      .attr('id', accessor$1())
	      .attr('opacity', 0)
	      .classed('event', true);
	    var newContainers = newEvents
	      .append('foreignObject')
	      .attr('width', 100)
	      .attr('x', -50)
	      // Never forget: Using the namespace when appending an html
	      // element to a foreignObject is incredibly important. Without it,
	      // a div will not size itself correctly for its contents.
	      .append('xhtml:div')
	      .classed('event-container', true);
	    newContainers
	      .append('xhtml:div')
	      .classed('time', true)
	      .classed('shadowed', true);
	    newContainers
	      .append('xhtml:div')
	      .classed('subtitle', true)
	      .text('years from now');

	    var survivingEvents = newEvents.merge(events);
	    survivingEvents.select('foreignObject').attr('height', timeLabelHeight);
	    survivingEvents.select('.time').html(accessor$1('yearsFromNow'));
	    survivingEvents
	      .attr('transform', getEventTransform)
	      .transition()
	      .duration(labelAppearDuration)
	      .attr('opacity', getEventLabelOpacity);

	    function getEventTransform({ easedStartTime }) {
	      // Ascend away from earth: Later events are higher.
	      return `translate(0, ${
        easedStartTime * ticksPerCompactUnit$2 * -heightUnitsPerTick
      })`;
	    }

	    function getEventLabelOpacity(event, index, eventEls) {
	      if (index >= eventEls.length - 1) {
	        return 1;
	      }
	      var nextEventEls = eventEls.slice(index + 1, index + 3);
	      if (nextEventEls.some(closeInCompactUnits)) {
	        return 0;
	      }

	      return 1.0;

	      function closeInCompactUnits(nextEventEl) {
	        return (
	          nextEventEl.__data__.easedStartTime - event.easedStartTime <= 0.5
	        );
	      }
	    }
	  }
	}

	var renderTimeline_1 = renderTimeline$1;

	var d3$2 = require$$1$2;


	var description$1 = d3$2.select('#description-container .description');
	var timeSel = description$1.select('.time');
	var textSel = description$1.select('.description-text');

	function renderDescription$1({ event }) {
	  if (!event) {
	    return;
	  }

	  timeSel.html(event.yearsFromNow);
	  textSel.html(event.skimmableContent);
	}

	var renderDescription_1 = renderDescription$1;

	var { range } = require$$0$1;
	var { select: select$1 } = require$$1$2;
	var accessor = accessor_1;
	const { heightUnitsPerTick: heightUnitsPerTick$2 } = consts;

	const baseTickWidth = 10;
	const pageHeight = document.body.getBoundingClientRect().height;

	// Intended to be called every time there is a new tick.
	function renderTicks$1({ ticksTicked }) {
	  var ticksRoot = select$1('.ticks-root');
	  const maxVisibleTicks = pageHeight / heightUnitsPerTick$2 + 1;
	  var tickData = range(
	    Math.round(Math.max(ticksTicked - maxVisibleTicks, 0)),
	    ticksTicked
	  );

	  var ticks = ticksRoot.selectAll('.tick').data(tickData, accessor('identity'));
	  ticks.exit().remove();
	  var newTicks = ticks.enter().append('line').classed('tick', true);

	  var survivingTicks = newTicks.merge(ticks);
	  survivingTicks
	    .attr('y1', getTickY)
	    .attr('y2', getTickY)
	    .attr('x1', -baseTickWidth / 2)
	    .attr('x2', baseTickWidth / 2);
	  //console.log('latest tick Y', getTickY(ticksTicked));

	  function getTickY(currentTickCount) {
	    // Go up, as the ticks go up.
	    return currentTickCount * -heightUnitsPerTick$2;
	  }
	}

	var renderTicks_1 = renderTicks$1;

	var probable = {exports: {}};

	(function (module) {
	function createProbable(opts) {
	  var random = Math.random;
	  var shouldRecurse = true;

	  if (opts) {
	    if (opts.random) {
	      random = opts.random;
	    }
	    if (opts.recurse !== undefined) {
	      shouldRecurse = opts.recurse;
	    }
	  }

	  // Rolls a die.
	  // ~~ is faster than Math.floor but doesn't work as a floor with very high
	  // numbers.
	  function roll(sides) {
	    return Math.floor(random() * sides);
	  }

	  // This is like `roll`, but it is 1-based, like traditional dice.
	  function rollDie(sides) {
	    if (sides === 0) {
	      return 0;
	    } else {
	      return roll(sides) + 1;
	    }
	  }

	  // Makes a table that maps probability ranges to outcomes.
	  //
	  // rangesAndOutcomePairs should look like this:
	  // [
	  //  [[0, 80], 'a'],
	  //  [[81, 95], 'b'],
	  //  [[96, 100], 'c']
	  // ]
	  //
	  function createRangeTable(rangesAndOutcomePairs) {
	    var rangesAndOutcomes = rangesAndOutcomePairs;
	    var length =
	      rangesAndOutcomes[rangesAndOutcomes.length - 1][0][1] -
	      rangesAndOutcomes[0][0][0] +
	      1;

	    function curriedOutcomeAtIndex(index) {
	      return outcomeAtIndex(rangesAndOutcomes, index);
	    }

	    function probable_rollOnTable() {
	      var outcome = curriedOutcomeAtIndex(roll(length));

	      if (
	        typeof outcome === 'function' &&
	        (outcome.name === 'probable_rollOnTable' ||
	          outcome.name === 'probable_pick')
	      ) {
	        return outcome();
	      } else {
	        return outcome;
	      }
	    }

	    function getRangesAndOutcomesArray() {
	      return rangesAndOutcomes;
	    }

	    return {
	      outcomeAtIndex: curriedOutcomeAtIndex,
	      roll: probable_rollOnTable,
	      length: length,
	      getRangesAndOutcomesArray: getRangesAndOutcomesArray
	    };
	  }

	  // Looks up what outcome corresponds to the given index. Returns undefined
	  // if the index is not inside any range.
	  function outcomeAtIndex(rangesAndOutcomes, index) {
	    index = +index;

	    for (var i = 0; i < rangesAndOutcomes.length; ++i) {
	      var rangeOutcomePair = rangesAndOutcomes[i];
	      var range = rangeOutcomePair[0];
	      if (index >= range[0] && index <= range[1]) {
	        return rangeOutcomePair[1];
	      }
	    }
	  }

	  // A shorthand way to create a range table object. Given a hash of outcomes
	  // and the *size* of the probability range that they occupy, this function
	  // generates the ranges for createRangeTable.
	  // It's handy, but if you're doing this a lot, keep in mind that it's much
	  // slower than createRangeTable.

	  function createRangeTableFromDict(outcomesAndLikelihoods) {
	    return createRangeTable(
	      convertDictToRangesAndOutcomePairs(outcomesAndLikelihoods)
	    );
	  }

	  // outcomesAndLikelihoods format:
	  // {
	  //   failure: 30,
	  //   success: 20,
	  //   doover: 5
	  // }
	  //
	  // Returns an array in this kind of format:
	  // [
	  //  [[0, 29], 'failure'],
	  //  [[30, 49], 'success'],
	  //  [[50, 54], 'doover']
	  // ]

	  function convertDictToRangesAndOutcomePairs(outcomesAndLikelihoods) {
	    var rangesAndOutcomes = [];
	    var endOfLastUsedRange = -1;

	    var loArray = convertOLPairDictToLOArray(outcomesAndLikelihoods);
	    loArray = loArray.sort(compareLikelihoodSizeInPairsDesc);

	    loArray.forEach(function addRangeOutcomePair(loPair) {
	      var likelihood = loPair[0];
	      var outcome = loPair[1];
	      var start = endOfLastUsedRange + 1;
	      var endOfNewRange = start + likelihood - 1;
	      rangesAndOutcomes.push([[start, endOfNewRange], outcome]);

	      endOfLastUsedRange = endOfNewRange;
	    });

	    return rangesAndOutcomes;
	  }

	  function convertOLPairDictToLOArray(outcomesAndLikelihoods) {
	    var loArray = [];

	    for (var key in outcomesAndLikelihoods) {
	      var probability = outcomesAndLikelihoods[key];
	      loArray.push([probability, key]);
	    }

	    return loArray;
	  }

	  function compareLikelihoodSizeInPairsDesc(pairA, pairB) {
	    return pairA[0] > pairB[0] ? -1 : 1;
	  }

	  //  [[0, 80], 'a'],
	  //  [[81, 95], 'b'],
	  //  [[96, 100], 'c']

	  // Table defs will be objects like this:
	  // {
	  //   '0-24': 'Bulbasaur',
	  //   '25-66': 'Squirtle',
	  //   '67-99': 'Charmander'
	  // }
	  // The values can be other other objects, in which case those outcomes are
	  // considered recursive rolls. e.g.
	  //
	  // {
	  //   '0-39': {
	  //     '0-24': 'Bulbasaur',
	  //     '25-66': 'Squirtle',
	  //     '67-99': 'Charmander'
	  //   },
	  //   '40-55': 'Human',
	  //   '56-99': 'Rock'
	  // }
	  //
	  // When 0-39 is rolled on the outer table, another roll is made on that inner
	  // table.
	  //
	  // It will not detect cycles.

	  function createTableFromDef(def) {
	    var rangeOutcomePairs = rangeOutcomePairsFromDef(def);
	    return createRangeTable(rangeOutcomePairs);
	  }

	  function rangeOutcomePairsFromDef(def) {
	    var rangeOutcomePairs = [];
	    for (var rangeString in def) {
	      var range = rangeStringToRange(rangeString);
	      var outcome = def[rangeString];
	      if (typeof outcome === 'object') {
	        if (Array.isArray(outcome)) {
	          outcome = createCustomPickFromArray(outcome);
	        } else {
	          if (shouldRecurse) {
	            // Recurse.
	            var subtable = createTableFromDef(outcome);
	            if (typeof subtable.roll == 'function') {
	              outcome = subtable.roll;
	            }
	          }
	        }
	      }
	      rangeOutcomePairs.push([range, outcome]);
	    }

	    return rangeOutcomePairs.sort(compareStartOfRangeAsc);
	  }

	  function compareStartOfRangeAsc(rangeOutcomePairA, rangeOutcomePairB) {
	    return rangeOutcomePairA[0][0] < rangeOutcomePairB[0][0] ? -1 : 1;
	  }

	  function rangeStringToRange(s) {
	    var bounds = s.split('-');
	    if (bounds.length > 2) {
	      return undefined;
	    }
	    if (bounds.length === 1) {
	      return [+s, +s];
	    } else {
	      return [+bounds[0], +bounds[1]];
	    }
	  }

	  function createTableFromSizes(def) {
	    var rangeOutcomePairs = rangeOutcomePairsFromSizesDef(def);
	    return createRangeTable(rangeOutcomePairs);
	  }

	  function rangeOutcomePairsFromSizesDef(def) {
	    var nextLowerBound = 0;

	    return def.map(sizeOutcomePairToRangeOutcomePair);

	    function sizeOutcomePairToRangeOutcomePair(sizeOutcomePair) {
	      var size = sizeOutcomePair[0];
	      var outcome = sizeOutcomePair[1];

	      var upperBound = nextLowerBound + size - 1;
	      var range = [nextLowerBound, upperBound];
	      nextLowerBound = upperBound + 1;

	      if (Array.isArray(outcome)) {
	        if (objectIsASizeDef(outcome)) {
	          // Recurse.
	          var subtable = createTableFromSizes(outcome);
	          if (typeof subtable.roll == 'function') {
	            outcome = subtable.roll;
	          }
	        } else {
	          outcome = createCustomPickFromArray(outcome);
	        }
	      }
	      return [range, outcome];
	    }
	  }

	  // Checks to see if def is a nested array, and if the first element is a pair with
	  // a number as the first element.
	  function objectIsASizeDef(def) {
	    return (
	      Array.isArray(def) &&
	      def.length > 0 &&
	      Array.isArray(def[0]) &&
	      def[0].length === 2 &&
	      typeof def[0][0] === 'number'
	    );
	  }

	  // Picks randomly from an array.
	  function pickFromArray(array, emptyArrayDefault) {
	    if (!array || typeof array.length !== 'number' || array.length < 1) {
	      return emptyArrayDefault;
	    } else {
	      return array[roll(array.length)];
	    }
	  }

	  function createCustomPickFromArray(array, emptyArrayDefault) {
	    return function probable_pick() {
	      return pickFromArray(array, emptyArrayDefault);
	    };
	  }

	  // Combines every element in A with every element in B.
	  function crossArrays(arrayA, arrayB) {
	    var combos = [];
	    arrayA.forEach(function combineElementWithArrayB(aElement) {
	      arrayB.forEach(function combineBElementWithAElement(bElement) {
	        if (Array.isArray(aElement) || Array.isArray(bElement)) {
	          combos.push(aElement.concat(bElement));
	        } else {
	          combos.push([aElement, bElement]);
	        }
	      });
	    });
	    return combos;
	  }

	  function getCartesianProduct(arrays) {
	    return arrays.slice(1).reduce(crossArrays, arrays[0]);
	  }

	  // From Underscore.js, except we are using the random function specified in
	  // our constructor instead of Math.random, necessarily.
	  function shuffle(array) {
	    var length = array.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = roll(index + 1);
	      if (rand !== index) {
	        shuffled[index] = shuffled[rand];
	      }
	      shuffled[rand] = array[index];
	    }
	    return shuffled;
	  }

	  function sample(array, sampleSize) {
	    return shuffle(array).slice(0, sampleSize);
	  }

	  return {
	    roll: roll,
	    rollDie: rollDie,
	    createRangeTable: createRangeTable,
	    createRangeTableFromDict: createRangeTableFromDict,
	    createTableFromDef: createTableFromDef,
	    createTableFromSizes: createTableFromSizes,
	    convertDictToRangesAndOutcomePairs: convertDictToRangesAndOutcomePairs,
	    pickFromArray: pickFromArray,
	    pick: pickFromArray,
	    crossArrays: crossArrays,
	    getCartesianProduct: getCartesianProduct,
	    shuffle: shuffle,
	    sample: sample,
	    randomFn: random
	  };
	}

	var probable = createProbable();

	{
	  module.exports = probable;
	  module.exports.createProbable = createProbable;
	}
	}(probable));

	function nopropagation() {
	  event.stopImmediatePropagation();
	}

	function noevent() {
	  event.preventDefault();
	  event.stopImmediatePropagation();
	}

	function nodrag(view) {
	  var root = view.document.documentElement,
	      selection = select$3(view).on("dragstart.drag", noevent, true);
	  if ("onselectstart" in root) {
	    selection.on("selectstart.drag", noevent, true);
	  } else {
	    root.__noselect = root.style.MozUserSelect;
	    root.style.MozUserSelect = "none";
	  }
	}

	function yesdrag(view, noclick) {
	  var root = view.document.documentElement,
	      selection = select$3(view).on("dragstart.drag", null);
	  if (noclick) {
	    selection.on("click.drag", noevent, true);
	    setTimeout(function() { selection.on("click.drag", null); }, 0);
	  }
	  if ("onselectstart" in root) {
	    selection.on("selectstart.drag", null);
	  } else {
	    root.style.MozUserSelect = root.__noselect;
	    delete root.__noselect;
	  }
	}

	function constant$1(x) {
	  return function() {
	    return x;
	  };
	}

	function DragEvent(target, type, subject, id, active, x, y, dx, dy, dispatch) {
	  this.target = target;
	  this.type = type;
	  this.subject = subject;
	  this.identifier = id;
	  this.active = active;
	  this.x = x;
	  this.y = y;
	  this.dx = dx;
	  this.dy = dy;
	  this._ = dispatch;
	}

	DragEvent.prototype.on = function() {
	  var value = this._.on.apply(this._, arguments);
	  return value === this._ ? this : value;
	};

	// Ignore right-click, since that should open the context menu.
	function defaultFilter() {
	  return !event.ctrlKey && !event.button;
	}

	function defaultContainer() {
	  return this.parentNode;
	}

	function defaultSubject(d) {
	  return d == null ? {x: event.x, y: event.y} : d;
	}

	function defaultTouchable() {
	  return navigator.maxTouchPoints || ("ontouchstart" in this);
	}

	function drag$1() {
	  var filter = defaultFilter,
	      container = defaultContainer,
	      subject = defaultSubject,
	      touchable = defaultTouchable,
	      gestures = {},
	      listeners = dispatch("start", "drag", "end"),
	      active = 0,
	      mousedownx,
	      mousedowny,
	      mousemoving,
	      touchending,
	      clickDistance2 = 0;

	  function drag(selection) {
	    selection
	        .on("mousedown.drag", mousedowned)
	      .filter(touchable)
	        .on("touchstart.drag", touchstarted)
	        .on("touchmove.drag", touchmoved)
	        .on("touchend.drag touchcancel.drag", touchended)
	        .style("touch-action", "none")
	        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	  }

	  function mousedowned() {
	    if (touchending || !filter.apply(this, arguments)) return;
	    var gesture = beforestart("mouse", container.apply(this, arguments), mouse, this, arguments);
	    if (!gesture) return;
	    select$3(event.view).on("mousemove.drag", mousemoved, true).on("mouseup.drag", mouseupped, true);
	    nodrag(event.view);
	    nopropagation();
	    mousemoving = false;
	    mousedownx = event.clientX;
	    mousedowny = event.clientY;
	    gesture("start");
	  }

	  function mousemoved() {
	    noevent();
	    if (!mousemoving) {
	      var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
	      mousemoving = dx * dx + dy * dy > clickDistance2;
	    }
	    gestures.mouse("drag");
	  }

	  function mouseupped() {
	    select$3(event.view).on("mousemove.drag mouseup.drag", null);
	    yesdrag(event.view, mousemoving);
	    noevent();
	    gestures.mouse("end");
	  }

	  function touchstarted() {
	    if (!filter.apply(this, arguments)) return;
	    var touches = event.changedTouches,
	        c = container.apply(this, arguments),
	        n = touches.length, i, gesture;

	    for (i = 0; i < n; ++i) {
	      if (gesture = beforestart(touches[i].identifier, c, touch, this, arguments)) {
	        nopropagation();
	        gesture("start");
	      }
	    }
	  }

	  function touchmoved() {
	    var touches = event.changedTouches,
	        n = touches.length, i, gesture;

	    for (i = 0; i < n; ++i) {
	      if (gesture = gestures[touches[i].identifier]) {
	        noevent();
	        gesture("drag");
	      }
	    }
	  }

	  function touchended() {
	    var touches = event.changedTouches,
	        n = touches.length, i, gesture;

	    if (touchending) clearTimeout(touchending);
	    touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
	    for (i = 0; i < n; ++i) {
	      if (gesture = gestures[touches[i].identifier]) {
	        nopropagation();
	        gesture("end");
	      }
	    }
	  }

	  function beforestart(id, container, point, that, args) {
	    var p = point(container, id), s, dx, dy,
	        sublisteners = listeners.copy();

	    if (!customEvent(new DragEvent(drag, "beforestart", s, id, active, p[0], p[1], 0, 0, sublisteners), function() {
	      if ((event.subject = s = subject.apply(that, args)) == null) return false;
	      dx = s.x - p[0] || 0;
	      dy = s.y - p[1] || 0;
	      return true;
	    })) return;

	    return function gesture(type) {
	      var p0 = p, n;
	      switch (type) {
	        case "start": gestures[id] = gesture, n = active++; break;
	        case "end": delete gestures[id], --active; // nobreak
	        case "drag": p = point(container, id), n = active; break;
	      }
	      customEvent(new DragEvent(drag, type, s, id, n, p[0] + dx, p[1] + dy, p[0] - p0[0], p[1] - p0[1], sublisteners), sublisteners.apply, sublisteners, [type, that, args]);
	    };
	  }

	  drag.filter = function(_) {
	    return arguments.length ? (filter = typeof _ === "function" ? _ : constant$1(!!_), drag) : filter;
	  };

	  drag.container = function(_) {
	    return arguments.length ? (container = typeof _ === "function" ? _ : constant$1(_), drag) : container;
	  };

	  drag.subject = function(_) {
	    return arguments.length ? (subject = typeof _ === "function" ? _ : constant$1(_), drag) : subject;
	  };

	  drag.touchable = function(_) {
	    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant$1(!!_), drag) : touchable;
	  };

	  drag.on = function() {
	    var value = listeners.on.apply(listeners, arguments);
	    return value === listeners ? drag : value;
	  };

	  drag.clickDistance = function(_) {
	    return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
	  };

	  return drag;
	}

	var src = /*#__PURE__*/Object.freeze({
		__proto__: null,
		drag: drag$1,
		dragDisable: nodrag,
		dragEnable: yesdrag
	});

	var require$$1$1 = /*@__PURE__*/getAugmentedNamespace(src);

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT$1 = 'Expected a function';

	/** Used as references for various `Number` constants. */
	var NAN$1 = 0 / 0;

	/** `Object#toString` result references. */
	var symbolTag$1 = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim$1 = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex$1 = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary$1 = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal$1 = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt$1 = parseInt;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	/** Detect free variable `self`. */
	var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString$1 = objectProto$1.toString;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax$1 = Math.max,
	    nativeMin$1 = Math.min;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root$1.Date.now();
	};

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT$1);
	  }
	  wait = toNumber$1(wait) || 0;
	  if (isObject$1(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax$1(toNumber$1(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin$1(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide `options` to indicate whether `func`
	 * should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle$1(func, wait, options) {
	  var leading = true,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT$1);
	  }
	  if (isObject$1(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject$1(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike$1(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol$1(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike$1(value) && objectToString$1.call(value) == symbolTag$1);
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber$1(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol$1(value)) {
	    return NAN$1;
	  }
	  if (isObject$1(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject$1(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim$1, '');
	  var isBinary = reIsBinary$1.test(value);
	  return (isBinary || reIsOctal$1.test(value))
	    ? freeParseInt$1(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex$1.test(value) ? NAN$1 : +value);
	}

	var lodash_throttle = throttle$1;

	var d3$1 = require$$1$2;

	var { drag } = require$$1$1;
	var throttle = lodash_throttle;

	function Autoscroller({
	  secondsPerCompactUnit,
	  ticksPerCompactUnit,
	  heightUnitsPerTick,
	  scrollToEventDuration,
	  containerSelector,
	  rootSelector,
	  ticker,
	}) {
	  const timeoutLength = (secondsPerCompactUnit / ticksPerCompactUnit) * 1000;
	  var throttledJumpTo = throttle(jumpTo, 100);
	  var root = d3$1.select(rootSelector);
	  var zoomRoot = root.select('.zoom-root');
	  var addDrag = drag();
	  addDrag.on('start', onDragStart);
	  addDrag.on('end', onDragEnd);
	  addDrag.on('drag', onDrag);
	  d3$1.select(containerSelector).call(addDrag);
	  var dragging = false;
	  var queuedScrollTicksValue = -1;
	  var active = true;

	  window.onfocus = setActive;
	  window.onblur = setInactive;

	  return { scroll };

	  function scroll(ticks) {
	    if (dragging) {
	      return;
	    }
	    if (active) {
	      zoomRoot
	        .transition()
	        .duration(scrollToEventDuration)
	        .attr(
	          'transform',
	          `translate(0, ${(ticks - 0.5) * heightUnitsPerTick})`
	        );
	      return;
	    }

	    queuedScrollTicksValue = ticks;
	    console.log(
	      'Inactive so queuing to scroll to this later',
	      queuedScrollTicksValue
	    );
	  }

	  function jumpTo(y) {
	    zoomRoot.attr('transform', `translate(0, ${y})`);
	    ticker.setTicks(y / heightUnitsPerTick);
	  }

	  function onDragStart() {
	    dragging = true;
	    ticker.pause();
	  }

	  function onDragEnd() {
	    dragging = false;
	    // Wait a while before restarting ticker.
	    setTimeout(() => ticker.resume(), timeoutLength * 4);
	  }

	  function onDrag() {
	    const y = translateYFromSel(zoomRoot) + d3$1.event.dy;
	    throttledJumpTo(y);
	  }

	  //function reportPosition() {
	  //const ticks = getTicksFromPosition();
	  //onScroll({
	  //ticks,
	  //positionInCompactUnits: ticks / ticksPerCompactUnit,
	  //});
	  //}

	  //function getTicksFromPosition() {
	  // TODO: Don't get it from the position.
	  // In fact, instead, set the position from the ticks,
	  // unless dragging is happening.
	  //const y = translateYFromSel(zoomRoot);
	  //return y / heightUnitsPerTick + 0.5;
	  //}

	  function setActive() {
	    active = true;
	    if (queuedScrollTicksValue > -1) {
	      console.log('Now active, scrolling to', queuedScrollTicksValue);
	      scroll(queuedScrollTicksValue);
	      queuedScrollTicksValue = -1;
	    }
	  }

	  function setInactive() {
	    active = false;
	  }
	}

	function translateYFromSel(sel) {
	  var transformString = sel.attr('transform');

	  if (!transformString) {
	    return 0;
	  }

	  return +transformString.split(',')[1].split(')')[0];
	}

	var scroller = Autoscroller;

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used as the internal argument placeholder. */
	var PLACEHOLDER = '__lodash_placeholder__';

	/** Used to compose bitmasks for function metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_BOUND_FLAG = 4,
	    CURRY_FLAG = 8,
	    CURRY_RIGHT_FLAG = 16,
	    PARTIAL_FLAG = 32,
	    PARTIAL_RIGHT_FLAG = 64,
	    ARY_FLAG = 128,
	    REARG_FLAG = 256,
	    FLIP_FLAG = 512;

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_SAFE_INTEGER = 9007199254740991,
	    MAX_INTEGER = 1.7976931348623157e+308,
	    NAN = 0 / 0;

	/** Used to associate wrap methods with their bit flags. */
	var wrapFlags = [
	  ['ary', ARY_FLAG],
	  ['bind', BIND_FLAG],
	  ['bindKey', BIND_KEY_FLAG],
	  ['curry', CURRY_FLAG],
	  ['curryRight', CURRY_RIGHT_FLAG],
	  ['flip', FLIP_FLAG],
	  ['partial', PARTIAL_FLAG],
	  ['partialRight', PARTIAL_RIGHT_FLAG],
	  ['rearg', REARG_FLAG]
	];

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    symbolTag = '[object Symbol]';

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to match wrap detail comments. */
	var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
	    reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
	    reSplitDetails = /,? & /;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array ? array.length : 0;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return baseFindIndex(array, baseIsNaN, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}

	/**
	 * Gets the number of `placeholder` occurrences in `array`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} placeholder The placeholder to search for.
	 * @returns {number} Returns the placeholder count.
	 */
	function countHolders(array, placeholder) {
	  var length = array.length,
	      result = 0;

	  while (length--) {
	    if (array[length] === placeholder) {
	      result++;
	    }
	  }
	  return result;
	}

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	/**
	 * Replaces all `placeholder` elements in `array` with an internal placeholder
	 * and returns an array of their indexes.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {*} placeholder The placeholder to replace.
	 * @returns {Array} Returns the new array of placeholder indexes.
	 */
	function replaceHolders(array, placeholder) {
	  var index = -1,
	      length = array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (value === placeholder || value === PLACEHOLDER) {
	      array[index] = PLACEHOLDER;
	      result[resIndex++] = index;
	    }
	  }
	  return result;
	}

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/** Built-in value references. */
	var objectCreate = Object.create;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/* Used to set `toString` methods. */
	var defineProperty = (function() {
	  var func = getNative(Object, 'defineProperty'),
	      name = getNative.name;

	  return (name && name.length > 2) ? func : undefined;
	}());

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	function baseCreate(proto) {
	  return isObject(proto) ? objectCreate(proto) : {};
	}

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	/**
	 * Creates an array that is the composition of partially applied arguments,
	 * placeholders, and provided arguments into a single array of arguments.
	 *
	 * @private
	 * @param {Array} args The provided arguments.
	 * @param {Array} partials The arguments to prepend to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @params {boolean} [isCurried] Specify composing for a curried function.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgs(args, partials, holders, isCurried) {
	  var argsIndex = -1,
	      argsLength = args.length,
	      holdersLength = holders.length,
	      leftIndex = -1,
	      leftLength = partials.length,
	      rangeLength = nativeMax(argsLength - holdersLength, 0),
	      result = Array(leftLength + rangeLength),
	      isUncurried = !isCurried;

	  while (++leftIndex < leftLength) {
	    result[leftIndex] = partials[leftIndex];
	  }
	  while (++argsIndex < holdersLength) {
	    if (isUncurried || argsIndex < argsLength) {
	      result[holders[argsIndex]] = args[argsIndex];
	    }
	  }
	  while (rangeLength--) {
	    result[leftIndex++] = args[argsIndex++];
	  }
	  return result;
	}

	/**
	 * This function is like `composeArgs` except that the arguments composition
	 * is tailored for `_.partialRight`.
	 *
	 * @private
	 * @param {Array} args The provided arguments.
	 * @param {Array} partials The arguments to append to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @params {boolean} [isCurried] Specify composing for a curried function.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgsRight(args, partials, holders, isCurried) {
	  var argsIndex = -1,
	      argsLength = args.length,
	      holdersIndex = -1,
	      holdersLength = holders.length,
	      rightIndex = -1,
	      rightLength = partials.length,
	      rangeLength = nativeMax(argsLength - holdersLength, 0),
	      result = Array(rangeLength + rightLength),
	      isUncurried = !isCurried;

	  while (++argsIndex < rangeLength) {
	    result[argsIndex] = args[argsIndex];
	  }
	  var offset = argsIndex;
	  while (++rightIndex < rightLength) {
	    result[offset + rightIndex] = partials[rightIndex];
	  }
	  while (++holdersIndex < holdersLength) {
	    if (isUncurried || argsIndex < argsLength) {
	      result[offset + holders[holdersIndex]] = args[argsIndex++];
	    }
	  }
	  return result;
	}

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	/**
	 * Creates a function that wraps `func` to invoke it with the optional `this`
	 * binding of `thisArg`.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createBind(func, bitmask, thisArg) {
	  var isBind = bitmask & BIND_FLAG,
	      Ctor = createCtor(func);

	  function wrapper() {
	    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	    return fn.apply(isBind ? thisArg : this, arguments);
	  }
	  return wrapper;
	}

	/**
	 * Creates a function that produces an instance of `Ctor` regardless of
	 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	 *
	 * @private
	 * @param {Function} Ctor The constructor to wrap.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCtor(Ctor) {
	  return function() {
	    // Use a `switch` statement to work with class constructors. See
	    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
	    // for more details.
	    var args = arguments;
	    switch (args.length) {
	      case 0: return new Ctor;
	      case 1: return new Ctor(args[0]);
	      case 2: return new Ctor(args[0], args[1]);
	      case 3: return new Ctor(args[0], args[1], args[2]);
	      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
	      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
	      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
	      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
	    }
	    var thisBinding = baseCreate(Ctor.prototype),
	        result = Ctor.apply(thisBinding, args);

	    // Mimic the constructor's `return` behavior.
	    // See https://es5.github.io/#x13.2.2 for more details.
	    return isObject(result) ? result : thisBinding;
	  };
	}

	/**
	 * Creates a function that wraps `func` to enable currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {number} arity The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCurry(func, bitmask, arity) {
	  var Ctor = createCtor(func);

	  function wrapper() {
	    var length = arguments.length,
	        args = Array(length),
	        index = length,
	        placeholder = getHolder(wrapper);

	    while (index--) {
	      args[index] = arguments[index];
	    }
	    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
	      ? []
	      : replaceHolders(args, placeholder);

	    length -= holders.length;
	    if (length < arity) {
	      return createRecurry(
	        func, bitmask, createHybrid, wrapper.placeholder, undefined,
	        args, holders, undefined, undefined, arity - length);
	    }
	    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	    return apply(fn, this, args);
	  }
	  return wrapper;
	}

	/**
	 * Creates a function that wraps `func` to invoke it with optional `this`
	 * binding of `thisArg`, partial application, and currying.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to
	 *  the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [partialsRight] The arguments to append to those provided
	 *  to the new function.
	 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
	  var isAry = bitmask & ARY_FLAG,
	      isBind = bitmask & BIND_FLAG,
	      isBindKey = bitmask & BIND_KEY_FLAG,
	      isCurried = bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG),
	      isFlip = bitmask & FLIP_FLAG,
	      Ctor = isBindKey ? undefined : createCtor(func);

	  function wrapper() {
	    var length = arguments.length,
	        args = Array(length),
	        index = length;

	    while (index--) {
	      args[index] = arguments[index];
	    }
	    if (isCurried) {
	      var placeholder = getHolder(wrapper),
	          holdersCount = countHolders(args, placeholder);
	    }
	    if (partials) {
	      args = composeArgs(args, partials, holders, isCurried);
	    }
	    if (partialsRight) {
	      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
	    }
	    length -= holdersCount;
	    if (isCurried && length < arity) {
	      var newHolders = replaceHolders(args, placeholder);
	      return createRecurry(
	        func, bitmask, createHybrid, wrapper.placeholder, thisArg,
	        args, newHolders, argPos, ary, arity - length
	      );
	    }
	    var thisBinding = isBind ? thisArg : this,
	        fn = isBindKey ? thisBinding[func] : func;

	    length = args.length;
	    if (argPos) {
	      args = reorder(args, argPos);
	    } else if (isFlip && length > 1) {
	      args.reverse();
	    }
	    if (isAry && ary < length) {
	      args.length = ary;
	    }
	    if (this && this !== root && this instanceof wrapper) {
	      fn = Ctor || createCtor(fn);
	    }
	    return fn.apply(thisBinding, args);
	  }
	  return wrapper;
	}

	/**
	 * Creates a function that wraps `func` to invoke it with the `this` binding
	 * of `thisArg` and `partials` prepended to the arguments it receives.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} partials The arguments to prepend to those provided to
	 *  the new function.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createPartial(func, bitmask, thisArg, partials) {
	  var isBind = bitmask & BIND_FLAG,
	      Ctor = createCtor(func);

	  function wrapper() {
	    var argsIndex = -1,
	        argsLength = arguments.length,
	        leftIndex = -1,
	        leftLength = partials.length,
	        args = Array(leftLength + argsLength),
	        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

	    while (++leftIndex < leftLength) {
	      args[leftIndex] = partials[leftIndex];
	    }
	    while (argsLength--) {
	      args[leftIndex++] = arguments[++argsIndex];
	    }
	    return apply(fn, isBind ? thisArg : this, args);
	  }
	  return wrapper;
	}

	/**
	 * Creates a function that wraps `func` to continue currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {Function} wrapFunc The function to create the `func` wrapper.
	 * @param {*} placeholder The placeholder value.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to
	 *  the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
	  var isCurry = bitmask & CURRY_FLAG,
	      newHolders = isCurry ? holders : undefined,
	      newHoldersRight = isCurry ? undefined : holders,
	      newPartials = isCurry ? partials : undefined,
	      newPartialsRight = isCurry ? undefined : partials;

	  bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
	  bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

	  if (!(bitmask & CURRY_BOUND_FLAG)) {
	    bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
	  }

	  var result = wrapFunc(func, bitmask, thisArg, newPartials, newHolders, newPartialsRight, newHoldersRight, argPos, ary, arity);
	  result.placeholder = placeholder;
	  return setWrapToString(result, func, bitmask);
	}

	/**
	 * Creates a function that either curries or invokes `func` with optional
	 * `this` binding and partially applied arguments.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to wrap.
	 * @param {number} bitmask The bitmask flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - `_.bind`
	 *     2 - `_.bindKey`
	 *     4 - `_.curry` or `_.curryRight` of a bound function
	 *     8 - `_.curry`
	 *    16 - `_.curryRight`
	 *    32 - `_.partial`
	 *    64 - `_.partialRight`
	 *   128 - `_.rearg`
	 *   256 - `_.ary`
	 *   512 - `_.flip`
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to be partially applied.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
	  var isBindKey = bitmask & BIND_KEY_FLAG;
	  if (!isBindKey && typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var length = partials ? partials.length : 0;
	  if (!length) {
	    bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
	    partials = holders = undefined;
	  }
	  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
	  arity = arity === undefined ? arity : toInteger(arity);
	  length -= holders ? holders.length : 0;

	  if (bitmask & PARTIAL_RIGHT_FLAG) {
	    var partialsRight = partials,
	        holdersRight = holders;

	    partials = holders = undefined;
	  }

	  var newData = [
	    func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
	    argPos, ary, arity
	  ];

	  func = newData[0];
	  bitmask = newData[1];
	  thisArg = newData[2];
	  partials = newData[3];
	  holders = newData[4];
	  arity = newData[9] = newData[9] == null
	    ? (isBindKey ? 0 : func.length)
	    : nativeMax(newData[9] - length, 0);

	  if (!arity && bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG)) {
	    bitmask &= ~(CURRY_FLAG | CURRY_RIGHT_FLAG);
	  }
	  if (!bitmask || bitmask == BIND_FLAG) {
	    var result = createBind(func, bitmask, thisArg);
	  } else if (bitmask == CURRY_FLAG || bitmask == CURRY_RIGHT_FLAG) {
	    result = createCurry(func, bitmask, arity);
	  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !holders.length) {
	    result = createPartial(func, bitmask, thisArg, partials);
	  } else {
	    result = createHybrid.apply(undefined, newData);
	  }
	  return setWrapToString(result, func, bitmask);
	}

	/**
	 * Gets the argument placeholder value for `func`.
	 *
	 * @private
	 * @param {Function} func The function to inspect.
	 * @returns {*} Returns the placeholder value.
	 */
	function getHolder(func) {
	  var object = func;
	  return object.placeholder;
	}

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	/**
	 * Extracts wrapper details from the `source` body comment.
	 *
	 * @private
	 * @param {string} source The source to inspect.
	 * @returns {Array} Returns the wrapper details.
	 */
	function getWrapDetails(source) {
	  var match = source.match(reWrapDetails);
	  return match ? match[1].split(reSplitDetails) : [];
	}

	/**
	 * Inserts wrapper `details` in a comment at the top of the `source` body.
	 *
	 * @private
	 * @param {string} source The source to modify.
	 * @returns {Array} details The details to insert.
	 * @returns {string} Returns the modified source.
	 */
	function insertWrapDetails(source, details) {
	  var length = details.length,
	      lastIndex = length - 1;

	  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
	  details = details.join(length > 2 ? ', ' : ' ');
	  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	/**
	 * Reorder `array` according to the specified indexes where the element at
	 * the first index is assigned as the first element, the element at
	 * the second index is assigned as the second element, and so on.
	 *
	 * @private
	 * @param {Array} array The array to reorder.
	 * @param {Array} indexes The arranged array indexes.
	 * @returns {Array} Returns `array`.
	 */
	function reorder(array, indexes) {
	  var arrLength = array.length,
	      length = nativeMin(indexes.length, arrLength),
	      oldArray = copyArray(array);

	  while (length--) {
	    var index = indexes[length];
	    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
	  }
	  return array;
	}

	/**
	 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
	 * with wrapper details in a comment at the top of the source body.
	 *
	 * @private
	 * @param {Function} wrapper The function to modify.
	 * @param {Function} reference The reference function.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @returns {Function} Returns `wrapper`.
	 */
	var setWrapToString = !defineProperty ? identity : function(wrapper, reference, bitmask) {
	  var source = (reference + '');
	  return defineProperty(wrapper, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)))
	  });
	};

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	/**
	 * Updates wrapper `details` based on `bitmask` flags.
	 *
	 * @private
	 * @returns {Array} details The details to modify.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @returns {Array} Returns `details`.
	 */
	function updateWrapDetails(details, bitmask) {
	  arrayEach(wrapFlags, function(pair) {
	    var value = '_.' + pair[0];
	    if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
	      details.push(value);
	    }
	  });
	  return details.sort();
	}

	/**
	 * Creates a function that accepts arguments of `func` and either invokes
	 * `func` returning its result, if at least `arity` number of arguments have
	 * been provided, or returns a function that accepts the remaining `func`
	 * arguments, and so on. The arity of `func` may be specified if `func.length`
	 * is not sufficient.
	 *
	 * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
	 * may be used as a placeholder for provided arguments.
	 *
	 * **Note:** This method doesn't set the "length" property of curried functions.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.0.0
	 * @category Function
	 * @param {Function} func The function to curry.
	 * @param {number} [arity=func.length] The arity of `func`.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Function} Returns the new curried function.
	 * @example
	 *
	 * var abc = function(a, b, c) {
	 *   return [a, b, c];
	 * };
	 *
	 * var curried = _.curry(abc);
	 *
	 * curried(1)(2)(3);
	 * // => [1, 2, 3]
	 *
	 * curried(1, 2)(3);
	 * // => [1, 2, 3]
	 *
	 * curried(1, 2, 3);
	 * // => [1, 2, 3]
	 *
	 * // Curried with placeholders.
	 * curried(1)(_, 3)(2);
	 * // => [1, 2, 3]
	 */
	function curry$1(func, arity, guard) {
	  arity = guard ? undefined : arity;
	  var result = createWrap(func, CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
	  result.placeholder = curry$1.placeholder;
	  return result;
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;

	  return result === result ? (remainder ? result - remainder : result) : 0;
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	// Assign default placeholders.
	curry$1.placeholder = {};

	var lodash_curry = curry$1;

	var require$$1 = {
		"4": 4.25,
		"5": 4.5,
		"6": 4.75,
		"7": 5,
		"8": 5.25,
		"9": 5.5,
		"10": 5.75,
		"11": 6,
		"12": 6.25,
		"13": 6.75,
		"14": 7,
		"15": 7.25,
		"16": 7.75,
		"17": 8,
		"18": 8.25,
		"19": 8.75,
		"20": 9,
		"21": 9.5,
		"22": 9.75,
		"23": 10.25,
		"24": 10.5,
		"25": 11,
		"26": 11.5,
		"27": 11.75,
		"28": 12.25,
		"29": 12.75,
		"30": 13.25,
		"31": 13.75,
		"32": 14.25,
		"33": 14.75,
		"34": 15.25,
		"35": 15.75,
		"36": 16.5,
		"37": 17,
		"38": 17.75,
		"39": 18.25,
		"40": 19,
		"41": 19.5,
		"42": 20.25,
		"43": 21,
		"44": 21.75,
		"45": 22.5,
		"46": 23.25,
		"47": 24.25,
		"48": 25,
		"49": 26,
		"50": 27,
		"51": 27.75,
		"52": 29,
		"53": 30,
		"54": 31,
		"55": 32.25,
		"56": 33.5,
		"57": 34.75,
		"58": 36,
		"59": 37.5,
		"60": 39,
		"61": 40.5,
		"62": 42.25,
		"63": 43.75,
		"64": 45.75,
		"65": 47.75,
		"66": 49.75,
		"67": 51.75,
		"68": 54.25,
		"69": 56.75,
		"70": 59.25,
		"71": 62.25,
		"72": 65.25,
		"73": 68.5,
		"74": 72,
		"75": 75.75,
		"76": 80,
		"77": 84.5,
		"78": 89.5,
		"79": 95,
		"80": 99.75
	};

	var d3 = require$$1$2;
	var modRange1ReverseDict = require$$1;

	const {
	  midCompactTimeToMod,
	  minCompactTimeToMod,
	  maxCompactTimeToMod,
	  modRange1,
	  modRange2,
	  desiredModRange2,
	  heightUnitsPerTick: heightUnitsPerTick$1,
	  ticksPerCompactUnit: ticksPerCompactUnit$1,
	} = consts;

	const circleMoveDuration = 300;
	const emphasizedTickWidth = 20;

	const minCompactOut = 4;
	const midCompactOut =
	  minCompactTimeToMod +
	  ((midCompactTimeToMod - 4) / (midCompactTimeToMod - 4 + 0.25)) * modRange1;
	const maxCompactOut =
	  midCompactTimeToMod +
	  ((maxCompactTimeToMod - midCompactTimeToMod) / modRange2) * desiredModRange2;

	//const locale = new Intl.NumberFormat().resolvedOptions().locale;
	var yearsFormatter = new Intl.NumberFormat({
	  localeMatch: 'best fit',
	  style: 'decimal',
	  useGrouping: true,
	  maximumFractionDigits: 2,
	});

	var board = d3.select('#board');
	var circleSel = board.select('.now-circle');
	var ticksRoot = board.select('.ticks-root');

	function emphasizeTick$1({ ticks }) {
	  const yearsText = getYearsText(ticks / ticksPerCompactUnit$1);
	  d3.select('#years-notice').html(
	    yearsText === '1'
	      ? `${yearsText} year has passed.`
	      : `${yearsText} years have passed.`
	  );

	  const currentTickY = ticks * -heightUnitsPerTick$1;
	  //console.log('circle y', currentTickY);
	  circleSel.transition().duration(circleMoveDuration).attr('cy', currentTickY);

	  var currentTick = ticksRoot.select('.current');
	  if (currentTick.empty()) {
	    currentTick = ticksRoot
	      .append('line')
	      .classed('current', true)
	      .classed('tick', true);
	    currentTick
	      .attr('x1', -emphasizedTickWidth / 2)
	      .attr('x2', emphasizedTickWidth / 2);
	  }

	  currentTick.attr('y1', currentTickY);
	  currentTick.attr('y2', currentTickY);
	}

	// Trying to reverse what's in tools/add-eased-time.
	function getYearsText(timeInCompactUnits) {
	  var years;
	  var uneased;

	  if (timeInCompactUnits < minCompactOut) {
	    uneased = timeInCompactUnits;
	  } else if (
	    timeInCompactUnits >= minCompactOut &&
	    timeInCompactUnits <= midCompactOut
	  ) {
	    let key = ~~timeInCompactUnits;
	    while (key > 0) {
	      if (key in modRange1ReverseDict) {
	        uneased = modRange1ReverseDict[key];
	        break;
	      }
	      key--;
	    }
	  } else if (
	    timeInCompactUnits > midCompactOut &&
	    timeInCompactUnits <= maxCompactOut
	  ) {
	    // Undo linear shortening.
	    uneased =
	      ((timeInCompactUnits - midCompactTimeToMod) / desiredModRange2) *
	        modRange2 +
	      midCompactTimeToMod;
	  } else {
	    uneased = timeInCompactUnits;
	  }

	  if (uneased < 9) {
	    const yearsNumber = ~~Math.pow(10, uneased);
	    if (isNaN(yearsNumber) || yearsNumber === Infinity) {
	      years = '???';
	    } else {
	      years = yearsFormatter.format(yearsNumber);
	    }
	  } else {
	    years = `10<sup>${yearsFormatter.format(uneased)}</sup>`;
	  }
	  return years;
	}

	var emphasizeTick_1 = emphasizeTick$1;

	const { totalTicks: totalTicks$1, bigTempoWaveAmp } = consts;

	function Ticker$1({
	  onTick,
	  secondsPerCompactUnit,
	  ticksPerCompactUnit,
	  startTicks,
	  onPause,
	  onResume,
	}) {
	  var ticks = 0;
	  if (!isNaN(startTicks) && startTicks > -1) {
	    ticks = startTicks;
	  }

	  var timeoutKey;
	  var currentTickLength = 1;

	  return {
	    getTicks,
	    setTicks,
	    pause,
	    resume,
	    isPaused,
	    getCurrentTickLength,
	  };

	  function getTicks() {
	    return ticks;
	  }

	  function setTicks(val) {
	    ticks = Math.round(val);
	    onTick(ticks);
	  }

	  function pause() {
	    clearTimeout(timeoutKey);
	    timeoutKey = null;
	    if (onPause) {
	      onPause();
	    }
	  }

	  function resume() {
	    if (!timeoutKey) {
	      tick();
	    }
	    if (onResume) {
	      onResume();
	    }
	  }

	  function tick() {
	    onTick(ticks);
	    ticks += 1;
	    const progress = ticks / totalTicks$1;
	    var factor = 1;
	    if (progress > 0.175) {
	      const bigWaveY =
	        bigTempoWaveAmp * Math.cos(2.5 * Math.PI * (progress - 0.2)) +
	        1 -
	        bigTempoWaveAmp;
	      const smallWaveY =
	        (1 / (20 * progress)) *
	        Math.cos(((2 * Math.PI * 40) / progress) * (progress - 0.2));
	      factor = bigWaveY + smallWaveY;
	      //console.log(ticks, 'factor', factor);
	    }
	    currentTickLength = (secondsPerCompactUnit / ticksPerCompactUnit) * factor;
	    timeoutKey = setTimeout(tick, currentTickLength * 1000);
	  }

	  function isPaused() {
	    return !timeoutKey;
	  }

	  function getCurrentTickLength() {
	    return currentTickLength;
	  }
	}

	var ticker = Ticker$1;

	var riffParts$1 = [
	  // Key: Ab minor.
	  // Range Gb3 - A6.
	  ['Db4,F4,C5,F5', 'Ab3,C4,G4,F4', 'G3,C4,F4,Bb5', 'F3,G3,C4,F4'],
	  ['F4,G4,Ab4,C5', 'C5,Db5,Eb5,F5', 'F5,Bb5,Gb6,A6', 'F4,F5,F5,C5'],
	  ['C4,G4,Eb5,F5', 'Eb5,G5,C6,F5', 'F5,C5,G4,D5', 'Bb4,Eb4,C5,Eb5'],
	  ['Eb5,D5,Db5,C5', 'G4,Eb4,A3,F3', 'C4,Db4,C4,Bb3', 'Ab3,G3,Gb3,F4'],
	];

	var keyCodesForNames = {
	  backspace: 8,
	  tab: 9,
	  enter: 13,
	  escape: 27,
	  space: 32,
	  pageUp: 33,
	  pageDown: 34,
	  end: 35,
	  home: 36,
	  leftArrow: 37,
	  upArrow: 38,
	  rightArrow: 39,
	  downArrow: 40,
	  insert: 45,
	  delete: 46,
	  '0': 48,
	  '1': 49,
	  '2': 50,
	  '3': 51,
	  '4': 52,
	  '5': 53,
	  '6': 54,
	  '7': 55,
	  '8': 56,
	  '9': 57,
	  a: 65,
	  b: 66,
	  c: 67,
	  d: 68,
	  e: 69,
	  f: 70,
	  g: 71,
	  h: 72,
	  i: 73,
	  j: 74,
	  k: 75,
	  l: 76,
	  m: 77,
	  n: 78,
	  o: 79,
	  p: 80,
	  q: 81,
	  r: 82,
	  s: 83,
	  t: 84,
	  u: 85,
	  v: 86,
	  w: 87,
	  x: 88,
	  y: 89,
	  z: 90,
	  f1: 112,
	  f2: 113,
	  f3: 114,
	  f4: 115,
	  f5: 116,
	  f6: 117,
	  f7: 118,
	  f8: 119,
	  f9: 120,
	  f10: 121,
	  f11: 122,
	  f12: 123,
	  semicolon: 186,
	  equal: 187,
	  comma: 188,
	  dash: 189,
	  period: 190,
	  forwardSlash: 191,
	  graveAccent: 192,
	  openBracket: 219,
	  backslash: 220,
	  closeBracket: 221,
	  singleQuote: 222
	};

	var keycodesForNames$1 = keyCodesForNames;

	var keycodesForNames = keycodesForNames$1;

	function StrokeRouter$1(sourceEl) {
	  var keyUpRespondersForKeyIds = {};
	  var keyDownRespondersForKeyIds = {};
	  var absorbAllKeyUpEvents = false;
	  var absorbAllKeyDownEvents = false;

	  function routeKeyUp(keyName, modifiers, responder) {
	    var keyId = getKeyId(keycodesForNames[keyName], modifiers);
	    keyUpRespondersForKeyIds[keyId] = responder;
	  }

	  function routeKeyDown(keyName, modifiers, responder) {
	    var keyId = getKeyId(keycodesForNames[keyName], modifiers);
	    keyDownRespondersForKeyIds[keyId] = responder;
	  }

	  function unrouteKeyUp(keyName, modifiers) {
	    var keyId = getKeyId(keycodesForNames[keyName], modifiers);
	    delete keyUpRespondersForKeyIds[keyId];
	  }
	  function unrouteKeyDown(keyName, modifiers) {
	    var keyId = getKeyId(keycodesForNames[keyName], modifiers);
	    delete keyDownRespondersForKeyIds[keyId];
	  }
	  function getKeyId(keyCode, modifiers) {
	    var keyId = keyCode;
	    if (modifiers) {
	      keyId = modifiers.reduce(addModifierMask, keyCode);
	    }
	    return keyId;
	  }

	  function listModifiersInEvent(event) {
	    var modifiers = [];
	    if (event.metaKey) {
	      modifiers.push('meta');
	    }
	    if (event.ctrlKey) {
	      modifiers.push('ctrl');
	    }
	    if (event.shiftKey) {
	      modifiers.push('shift');
	    }
	    if (event.altKey) {
	      modifiers.push('alt');
	    }
	    return modifiers;
	  }

	  function addModifierMask(currentValue, modifierString) {
	    var newValue = currentValue;
	    switch (modifierString) {
	      case 'meta':
	        newValue += 1000;
	        break;
	      case 'ctrl':
	        newValue += 10000;
	        break;
	      case 'shift':
	        newValue += 100000;
	        break;
	      case 'alt':
	        newValue += 1000000;
	        break;
	    }
	    return newValue;
	  }

	  function onKeyUp(e) {
	    {
	      if (absorbAllKeyUpEvents) {
	        e.stopPropagation();
	      }
	      var keyId = getKeyId(e.which, listModifiersInEvent(e));
	      if (keyId in keyUpRespondersForKeyIds) {
	        {
	          e.stopPropagation();
	        }
	        keyUpRespondersForKeyIds[keyId]();
	      }
	    }
	  }

	  function onKeyDown(e) {
	    {
	      if (absorbAllKeyDownEvents) {
	        e.stopPropagation();
	      }
	      var keyId = getKeyId(e.which, listModifiersInEvent(e));
	      if (keyId in keyDownRespondersForKeyIds) {
	        {
	          e.stopPropagation();
	        }
	        keyDownRespondersForKeyIds[keyId]();
	      }
	    }
	  }
	  function setKeyDownAbsorbMode(newMode) {
	    absorbAllKeyDownEvents = newMode;
	  }

	  function setKeyUpAbsorbMode(newMode) {
	    absorbAllKeyUpEvents = newMode;
	  }

	  ((function init() {
	    sourceEl.addEventListener('keyup', onKeyUp);
	    sourceEl.addEventListener('keydown', onKeyDown);
	  })());

	  return {
	    routeKeyUp: routeKeyUp,
	    routeKeyDown: routeKeyDown,
	    unrouteKeyUp: unrouteKeyUp,
	    unrouteKeyDown: unrouteKeyDown,
	    setKeyDownAbsorbMode: setKeyDownAbsorbMode,
	    setKeyUpAbsorbMode: setKeyUpAbsorbMode
	  };
	}

	var strokerouter = StrokeRouter$1;

	var StrokeRouter = strokerouter;
	var { select } = require$$1$2;

	var docStrokeRouter = StrokeRouter(document);
	var OLPE = oneListenerPerElement;
	var pausePlaySel = select('#pause-play-button');
	var pauseIcon = pausePlaySel.select('.pause-icon');
	var playIcon = pausePlaySel.select('.play-icon');
	var skipForwardSel = select('#skip-forward-button');

	var { on } = OLPE();

	function wireTransportControls$1({
	  onPausePlayToggle,
	  onSkipBackClick,
	  onSkipForwardClick,
	}) {
	  docStrokeRouter.unrouteKeyUp('space', null);
	  docStrokeRouter.routeKeyUp('space', null, onPausePlayToggle);
	  on('#pause-play-button', 'click', onPausePlayToggle);
	  on('#skip-back-button', 'click', onSkipBackClick);
	  on('#skip-forward-button', 'click', onSkipForwardClick);

	  return renderTransportControls;

	  function renderTransportControls({ currentlyPlaying, skipForwardEnabled }) {
	    pauseIcon.classed('hidden', !currentlyPlaying);
	    playIcon.classed('hidden', currentlyPlaying);
	    skipForwardSel.classed('invisible', !skipForwardEnabled);
	  }
	}

	var wireTransportControls_1 = wireTransportControls$1;

	// Return a promise that resolves with the error, even when it
	// catches the error.
	// Expecting params: callback calling function, arguments for that function.
	async function errorbackPromise(callbackCaller) {
	  var params = sliceArgumentsAfterFirstOneIntoParamArray(arguments);

	  return new Promise(executor);

	  function executor(resolve) {
	    params.push(callback);
	    callbackCaller.apply(callbackCaller, params);
	    function callback(error) {
	      resolve({
	        error,
	        values: sliceArgumentsAfterFirstOneIntoParamArray(arguments)
	      });
	    }
	  }
	}

	// This does not use Array.prototype.slice.call on `arguments` because V8 does not
	// know how to optimize one function's `arguments` being used outside that function.
	// TODO: Find out if this is still an issue.
	function sliceArgumentsAfterFirstOneIntoParamArray(args) {
	  var argsLength = args.length;
	  var params = [];

	  if (argsLength > 1) {
	    params = new Array(argsLength - 1);
	    for (var i = 1; i < argsLength; ++i) {
	      params[i - 1] = args[i];
	    }
	  }

	  return params;
	}

	var errorbackPromise_1 = errorbackPromise;

	var playTickSynth = tickSynth;
	var playEventSynth = eventSynth;
	var playSample = playSample_1;
	var mixRiffPair = mixRiffPair_1;
	var oknok$3 = oknok$4;
	var ContextKeeper$3 = audioContextSingleton;
	var handleError$3 = handleErrorWeb;
	var renderTimeline = renderTimeline_1;
	var renderDescription = renderDescription_1;
	var renderTicks = renderTicks_1;
	var Probable$1 = probable.exports.createProbable;
	var seedrandom = seedrandom$2;
	var Scroller = scroller;
	var curry = lodash_curry;
	var emphasizeTick = emphasizeTick_1;
	var Ticker = ticker;
	var riffParts = riffParts$1;
	var wireTransportControls = wireTransportControls_1;
	var ep$1 = errorbackPromise_1;

	var speechPlaying = false;
	var lastEventPlayTick = -10;

	const {
	  scrollToEventDuration,
	  heightUnitsPerTick,
	  secondsPerCompactUnit,
	  ticksPerCompactUnit,
	  totalTicks,
	  speechOverlapSeconds,
	  baseSpeechVol,
	  minVibratoTickLength,
	  ticksWherePanUnhinges,
	  concurrentRiffCountsForCategories,
	  maxConcurrentRiffs,
	  minTicksBetweenEventPlays,
	} = consts;

	var { getCurrentContext: getCurrentContext$3 } = ContextKeeper$3();

	// Warning: Not really reentrant-friendly.
	function futureFlow$1({
	  timeline,
	  seed,
	  startTicks,
	  stopTicks,
	  muteVocals,
	  muteTicks,
	  muteHorns,
	  pauseOnEndMovement,
	  tickSampleDownloader,
	  eventSampleDownloader,
	  narrationSampleCacher,
	}) {
	  var ticker = Ticker({
	    onTick,
	    secondsPerCompactUnit,
	    ticksPerCompactUnit,
	    startTicks,
	    onPause,
	    onResume,
	  });
	  var scroller = Scroller({
	    secondsPerCompactUnit,
	    ticksPerCompactUnit,
	    heightUnitsPerTick,
	    scrollToEventDuration,
	    containerSelector: '#board',
	    rootSelector: '#board .timeline-root-container',
	    ticker,
	  });
	  var probable = Probable$1({ random: seedrandom(seed) });
	  var riffPairs = [];
	  for (var i = 0; i < maxConcurrentRiffs; ++i) {
	    riffPairs.push(mixRiffPair(probable, riffParts[i]));
	  }
	  //console.log(riffPairs);

	  // TODO: Update years passed more often.
	  renderTimeline({
	    eventData: timeline,
	    // We need one less "line segment" than there are ticks.
	    // e.g. If there were 3 ticks, we'd need 2 line segments to connect them.
	    ticksTicked:
	      timeline[timeline.length - 1].easedStartTime * ticksPerCompactUnit - 1,
	  });

	  var renderTransportControls = wireTransportControls({
	    onPausePlayToggle,
	    onSkipBackClick,
	    onSkipForwardClick,
	  });

	  ticker.resume();

	  function onTick(ticks) {
	    const positionInCompactUnits = ticks / ticksPerCompactUnit;
	    //console.log(positionInCompactUnits);
	    playTick(~~ticks);
	    runCloseEvents(positionInCompactUnits, ticks);
	    if (ticks === +stopTicks) {
	      setTimeout(ticker.pause, 0);
	    }

	    requestAnimationFrame(() => {
	      scroller.scroll(ticks);
	      renderTicks({ ticksTicked: ticks });
	      emphasizeTick({
	        ticks,
	      });
	      renderTransportControls({
	        currentlyPlaying: true,
	        skipForwardEnabled: shouldEnableSkipForward(ticks),
	      });
	    });
	  }

	  function runCloseEvents(currentTimeInCompactUnits, ticks) {
	    if (Math.abs(ticks - lastEventPlayTick) < minTicksBetweenEventPlays) {
	      //console.log(
	      //'Skipping event because',
	      //ticks,
	      //'is too close to',
	      //lastEventPlayTick
	      //);
	      return;
	    }

	    var closeEvents = timeline.filter(
	      curry(timeIsCloseToEvent)(currentTimeInCompactUnits)
	    );
	    if (closeEvents.length > 0) {
	      //console.log(
	      //currentTimeInCompactUnits,
	      //closeEvents.map((e) => e.id)
	      //);
	      requestAnimationFrame(() => runEvent(closeEvents));
	    }

	    function runEvent(closeEvents) {
	      if (closeEvents.length < 1) {
	        return;
	      }

	      getCurrentContext$3(oknok$3({ ok: useContext, nok: handleError$3 }));

	      function useContext(ctx) {
	        // Skip the sound for the first one.
	        if (closeEvents[0].yearsFromNow !== 0) {
	          let synthOpts = {
	            ctx,
	            probable,
	            events: probable.sample(closeEvents, 1),
	            envelopeMaxGain: 0.85,
	            delaySeconds: 0,
	            sampleDownloader: eventSampleDownloader,
	            muteHorns,
	          };
	          playEventSynth(synthOpts);

	          recordEventTickPlay(closeEvents[0]);
	          lastEventPlayTick = ticks;

	          if (pauseOnEndMovement && closeEvents.some((e) => e.endMovement)) {
	            setTimeout(
	              () => ticker.pause(),
	              ticker.getCurrentTickLength() * 1000 * 16
	            );
	          }

	          // Extra ones for the end.
	          if (closeEvents.some((e) => e.isEnd)) {
	            playEventSynth(Object.assign(synthOpts, { delaySeconds: 15 }));
	            playEventSynth(Object.assign(synthOpts, { delaySeconds: 30 }));
	          }
	        }
	        speakAndShowEvents(closeEvents);
	      }
	    }
	  }

	  function playTick(ticksTicked) {
	    const timeWobbleRange = getWobbleRange(ticksTicked);

	    getCurrentContext$3(oknok$3({ ok: useContext, nok: handleError$3 }));

	    function useContext(ctx) {
	      var panA = -1 + getPanAdjustment(ticksTicked);
	      var panB = 1 - getPanAdjustment(ticksTicked);
	      //console.log(panA, panB);
	      var category = 'earth';
	      var mostRecentEvent = getMostRecentEvent(timeline, ticksTicked).event;
	      if (mostRecentEvent) {
	        category = mostRecentEvent.category;
	      }
	      const concurrentRiffCount = concurrentRiffCountsForCategories[category];

	      for (var i = 0; i < concurrentRiffCount; ++i) {
	        let timeWobbleSeconds = 0;
	        if (
	          ticksTicked % concurrentRiffCount !== 0 &&
	          probable.roll(100) / 100 < timeWobbleRange
	        ) {
	          timeWobbleSeconds =
	            (probable.roll(timeWobbleRange * 100) / 100) *
	            ticker.getCurrentTickLength();
	        }
	        let delaySeconds = timeWobbleSeconds;
	        if (category !== 'universe') {
	          delaySeconds +=
	            (i / concurrentRiffCount) * ticker.getCurrentTickLength();
	        }
	        var tickSynthOpts = {
	          ticksTicked,
	          probable,
	          ctx,
	          delaySeconds,
	          sampleDownloader: tickSampleDownloader,
	          // We need to avoid triggering garbage collection when
	          // things get fast, so turn off vibrato then.
	          vibratoOn: ticker.getCurrentTickLength() > minVibratoTickLength,
	        };

	        if (muteTicks && ticksTicked > 0) {
	          continue;
	        }

	        playTickSynth(
	          Object.assign({ riff: riffPairs[i][0], pan: panA }, tickSynthOpts)
	        );
	        playTickSynth(
	          Object.assign({ riff: riffPairs[i][1], pan: panB }, tickSynthOpts)
	        );
	      }
	    }
	  }

	  function getPanAdjustment(ticksTicked) {
	    const variance = Math.max((ticksTicked - 32) / ticksWherePanUnhinges, 0);
	    return Math.min(probable.roll(variance * 200) / 200, 2);
	  }

	  // Returns a number from 0 to 1.0.
	  function getWobbleRange(ticksTicked) {
	    return ticksTicked / totalTicks;
	  }

	  function speakAndShowEvents(events) {
	    if (events.some((e) => e.isEnd)) {
	      ticker.pause();
	      localStorage.finalEventReached = true;
	    }
	    // Wait a little bit for the sound to play first.
	    var shuffled = probable.shuffle(events);
	    for (var i = 0; i < shuffled.length; ++i) {
	      let event = shuffled[i];
	      setTimeout(
	        () => speakAndShowEvent({ event, volumeAdj: -0.05 * i }),
	        ticker.getCurrentTickLength() * 1000 * (2 + i)
	      );
	    }
	  }

	  function speakAndShowEvent({ event, volumeAdj = 0 }) {
	    if (!speechPlaying) {
	      if (!muteVocals) {
	        playNarration(event);
	      }
	      renderDescription({ event });
	    }

	    async function playNarration(event) {
	      speechPlaying = true;
	      var sampleRes = await ep$1(narrationSampleCacher.getSample, event.id);
	      if (sampleRes.error) {
	        handleError$3(sampleRes.error);
	        speechPlaying = false;
	        return;
	      }

	      var sampleBuffer = sampleRes.values[0];
	      if (!sampleBuffer) {
	        console.error(new Error(`No sampleBuffer downloaded for ${event.id}.`));
	        speechPlaying = false;
	        return;
	      }

	      var ctxRes = await ep$1(getCurrentContext$3);

	      if (ctxRes.error) {
	        handleError$3(ctxRes.error);
	        speechPlaying = false;
	        return;
	      }

	      const speechLengthSeconds = sampleBuffer.length / sampleBuffer.sampleRate;

	      // There could be other speech playing, but this will still cover
	      // enough cases.
	      setTimeout(() => {
	        speechPlaying = false;
	      }, (speechLengthSeconds - speechOverlapSeconds) * 1000);

	      narrationSampleCacher.loadNext(1, handleError$3);

	      const progProportion = ticker.getTicks() / totalTicks;
	      let feedbackDelayEffect = {
	        feedbackSeconds: progProportion * 0.4,
	        delaySeconds: progProportion * 0.6,
	      };

	      playSample({
	        ctx: ctxRes.values[0],
	        sampleBuffer,
	        event,
	        probable,
	        volume: baseSpeechVol + volumeAdj,
	        soundDurationSeconds: speechLengthSeconds,
	        feedbackDelayEffect: event.isEnd ? null : feedbackDelayEffect,
	      });
	    }
	  }

	  function onPausePlayToggle() {
	    if (ticker.isPaused()) {
	      ticker.resume();
	    } else {
	      ticker.pause();
	    }
	  }

	  function onPause() {
	    renderTransportControls({
	      currentlyPlaying: false,
	      skipForwardEnabled: shouldEnableSkipForward(ticker.getTicks()),
	    });
	  }

	  function onResume() {
	    renderTransportControls({
	      currentlyPlaying: true,
	      skipForwardEnabled: shouldEnableSkipForward(ticker.getTicks()),
	    });
	  }

	  function onSkipBackClick() {
	    ticker.setTicks(
	      getMostRecentPastEventTick(timeline, ticker.getTicks()) - 1
	    );
	    renderTransportControlsAfterATick();
	  }

	  function onSkipForwardClick() {
	    const nextEventTick = getClosestFutureEventTick(
	      timeline,
	      ticker.getTicks()
	    );
	    if (!isNaN(nextEventTick)) {
	      ticker.setTicks(nextEventTick - 1);
	      renderTransportControlsAfterATick();
	    }
	  }

	  function renderTransportControlsAfterATick() {
	    setTimeout(
	      () =>
	        renderTransportControls({
	          currentlyPlaying: !ticker.isPaused(),
	          skipForwardEnabled: shouldEnableSkipForward(ticker.getTicks()),
	        }),
	      ticker.getCurrentTickLength()
	    );
	  }
	}

	// Don't check for distance in both directions, or you'll play the event both coming toward it and going away from it.
	function timeIsCloseToEvent(timeInCompactUnits, event) {
	  const diff = event.easedStartTime - timeInCompactUnits;
	  return diff <= 1 / ticksPerCompactUnit && diff >= 0;
	}

	function getMostRecentPastEventTick(timeline, ticks) {
	  var { event } = getMostRecentEvent(timeline, ticks);

	  if (!event) {
	    return 0;
	  }

	  return event.easedStartTime * ticksPerCompactUnit;
	}

	function getMostRecentEvent(timeline, ticks) {
	  const compactUnits = ticks / ticksPerCompactUnit;
	  for (var i = timeline.length - 1; i > -1; --i) {
	    let event = timeline[i];
	    if (compactUnits >= event.easedStartTime) {
	      return { event, index: i };
	    }
	  }
	  return { event: null, index: -1 };
	}

	function getClosestFutureEventTick(timeline, ticks) {
	  // When we skip forward, we skip to one before the next event.
	  // Just in case we just did that, look ahead by two ticks
	  // so that the most recent event is the one we're almost at.
	  const { index } = getMostRecentEvent(timeline, ticks + 2);
	  const nextIndex = index + 1;
	  if (nextIndex >= timeline.length) {
	    return;
	  }

	  var nextEvent = timeline[nextIndex];
	  return nextEvent.easedStartTime * ticksPerCompactUnit;
	}

	function recordEventTickPlay(event) {
	  const eventTick = event.easedStartTime * ticksPerCompactUnit;
	  if (
	    !localStorage.futuremostEventTickPlayed ||
	    eventTick > localStorage.futuremostEventTickPlayed
	  ) {
	    localStorage.futuremostEventTickPlayed = eventTick;
	  }
	}

	function shouldEnableSkipForward(ticks) {
	  const futuremostEventTickPlayed = +localStorage.futuremostEventTickPlayed;
	  return futuremostEventTickPlayed && futuremostEventTickPlayed > ticks + 1;
	}

	var futureFlow_1 = futureFlow$1;

	var slice = [].slice;

	var noabort = {};

	function Queue(size) {
	  this._size = size;
	  this._call =
	  this._error = null;
	  this._tasks = [];
	  this._data = [];
	  this._waiting =
	  this._active =
	  this._ended =
	  this._start = 0; // inside a synchronous task callback?
	}

	Queue.prototype = queue$1.prototype = {
	  constructor: Queue,
	  defer: function(callback) {
	    if (typeof callback !== "function") throw new Error("invalid callback");
	    if (this._call) throw new Error("defer after await");
	    if (this._error != null) return this;
	    var t = slice.call(arguments, 1);
	    t.push(callback);
	    ++this._waiting, this._tasks.push(t);
	    poke(this);
	    return this;
	  },
	  abort: function() {
	    if (this._error == null) abort(this, new Error("abort"));
	    return this;
	  },
	  await: function(callback) {
	    if (typeof callback !== "function") throw new Error("invalid callback");
	    if (this._call) throw new Error("multiple await");
	    this._call = function(error, results) { callback.apply(null, [error].concat(results)); };
	    maybeNotify(this);
	    return this;
	  },
	  awaitAll: function(callback) {
	    if (typeof callback !== "function") throw new Error("invalid callback");
	    if (this._call) throw new Error("multiple await");
	    this._call = callback;
	    maybeNotify(this);
	    return this;
	  }
	};

	function poke(q) {
	  if (!q._start) {
	    try { start(q); } // let the current task complete
	    catch (e) {
	      if (q._tasks[q._ended + q._active - 1]) abort(q, e); // task errored synchronously
	      else if (!q._data) throw e; // await callback errored synchronously
	    }
	  }
	}

	function start(q) {
	  while (q._start = q._waiting && q._active < q._size) {
	    var i = q._ended + q._active,
	        t = q._tasks[i],
	        j = t.length - 1,
	        c = t[j];
	    t[j] = end(q, i);
	    --q._waiting, ++q._active;
	    t = c.apply(null, t);
	    if (!q._tasks[i]) continue; // task finished synchronously
	    q._tasks[i] = t || noabort;
	  }
	}

	function end(q, i) {
	  return function(e, r) {
	    if (!q._tasks[i]) return; // ignore multiple callbacks
	    --q._active, ++q._ended;
	    q._tasks[i] = null;
	    if (q._error != null) return; // ignore secondary errors
	    if (e != null) {
	      abort(q, e);
	    } else {
	      q._data[i] = r;
	      if (q._waiting) poke(q);
	      else maybeNotify(q);
	    }
	  };
	}

	function abort(q, e) {
	  var i = q._tasks.length, t;
	  q._error = e; // ignore active callbacks
	  q._data = undefined; // allow gc
	  q._waiting = NaN; // prevent starting

	  while (--i >= 0) {
	    if (t = q._tasks[i]) {
	      q._tasks[i] = null;
	      if (t.abort) {
	        try { t.abort(); }
	        catch (e) { /* ignore */ }
	      }
	    }
	  }

	  q._active = NaN; // allow notification
	  maybeNotify(q);
	}

	function maybeNotify(q) {
	  if (!q._active && q._call) {
	    var d = q._data;
	    q._data = undefined; // allow gc
	    q._call(q._error, d);
	  }
	}

	function queue$1(concurrency) {
	  if (concurrency == null) concurrency = Infinity;
	  else if (!((concurrency = +concurrency) >= 1)) throw new Error("invalid concurrency");
	  return new Queue(concurrency);
	}

	var d3Queue = /*#__PURE__*/Object.freeze({
		__proto__: null,
		queue: queue$1
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(d3Queue);

	var basicrequest = {exports: {}};

	(function (module) {
	function createRequestMaker() {
	  // WARNING: onData does NOT work with binary data right now!

	  function makeRequest(opts, done) {
	    var jsonMode = opts.json || opts.mimeType === 'application/json';

	    var xhr = new XMLHttpRequest();
	    xhr.open(opts.method, opts.url);
	    if (opts.mimeType) {
	      xhr.setRequestHeader('content-type', opts.mimeType);
	    }
	    if (jsonMode) {
	      xhr.setRequestHeader('accept', 'application/json');
	    }

	    if (typeof opts.headers === 'object') {
	      for (var headerName in opts.headers) {
	        xhr.setRequestHeader(headerName, opts.headers[headerName]);
	      }
	    }

	    if (opts.binary) {
	      xhr.responseType = 'arraybuffer';
	    }

	    if (jsonMode && typeof opts.body === 'object') {
	      opts.body = JSON.stringify(opts.body);
	    }

	    var timeoutKey = null;

	    xhr.onload = function requestDone() {
	      clearTimeout(timeoutKey);

	      if (opts.onData) {
	        // Send out that last bit.
	        emitNextChunk();
	      }

	      var responseObject = {
	        statusCode: this.status,
	        statusMessage: xhr.statusText,
	        responseURL: xhr.responseURL,
	        rawResponse: xhr.response,
	        xhr: xhr
	      };

	      if (opts.binary) {
	        done(null, responseObject, xhr.response);
	      } else {
	        var resultObject = this.responseText;
	        if (jsonMode) {
	          try {
	            resultObject = JSON.parse(resultObject);
	          } catch (e) {
	            responseObject.jsonParseError = e;
	          }
	        }
	        done(null, responseObject, resultObject);
	      }
	    };

	    var lastReadIndex = 0;
	    if (opts.onData) {
	      xhr.onreadystatechange = stateChanged;
	    }
	    xhr.onerror = handleError;

	    xhr.send(opts.formData || opts.body);

	    if (opts.timeLimit > 0) {
	      timeoutKey = setTimeout(cancelRequest, opts.timeLimit);
	    }

	    function cancelRequest() {
	      xhr.abort();
	      clearTimeout(timeoutKey);
	      done();
	    }

	    function stateChanged() {
	      if (xhr.readyState === 3) {
	        emitNextChunk();
	      }
	    }

	    function emitNextChunk() {
	      if (xhr.responseText) {
	        opts.onData(xhr.responseText.substr(lastReadIndex));
	        lastReadIndex = xhr.responseText.length;
	      }
	    }

	    // handleError is passed a progressEvent, but it has no useful information.
	    function handleError() {
	      var error = new Error('There is a problem with the network.');
	      error.name = 'XHR network error';
	      done(error);
	    }

	    return {
	      url: opts.url,
	      cancelRequest: cancelRequest
	    };
	  }

	  return {
	    makeRequest: makeRequest
	  };
	}

	{
	  var requestMaker = createRequestMaker();
	  module.exports = requestMaker.makeRequest;
	}
	}(basicrequest));

	function RequestBodyMover(param1, param2) {
	  var done;
	  if (typeof param1 === 'object') {
	    var { url, responseIsOK } = param1;
	    done = param2;
	  } else {
	    done = param1;
	  }

	  if (!responseIsOK) {
	    responseIsOK = defaultResponseIsOK;
	  }
	  return receiver;

	  function receiver(error, res, body) {
	    if (error) {
	      done(error);
	    } else if (!responseIsOK(res)) {
	      let message = '';
	      if (responseIsOK === defaultResponseIsOK) {
	        message = `Received status code ${res.statusCode}`;
	      } else {
	        message = 'Bad response';
	      }
	      if (url) {
	        message += ` from ${url} `;
	      } else if (res.url) {
	        message += ` from ${res.url} `;
	      }
	      message += '.';
	      done(new Error(message));
	    } else {
	      done(null, body);
	    }
	  }
	}

	function defaultResponseIsOK(res) {
	  return res.statusCode > 199 && res.statusCode < 300;
	}

	var requestBodyMover = RequestBodyMover;

	var { queue } = require$$0;
	var request = basicrequest.exports;
	var bodyMover = requestBodyMover;
	var oknok$2 = oknok$4;

	function downloadSamples$2({ ctx, sampleFiles, baseURL }, allDone) {
	  var q = queue();
	  sampleFiles.forEach(queueDownload);
	  q.awaitAll(downloadsDone);

	  function queueDownload(file) {
	    q.defer(downloadSample, file);
	  }

	  function downloadSample(file, done) {
	    request(
	      { method: 'GET', binary: true, url: `${baseURL}/${file}` },
	      bodyMover(oknok$2({ ok: decode, nok: done }))
	    );

	    function decode(buffer) {
	      ctx.decodeAudioData(buffer, passDecoded);
	    }

	    function passDecoded(decoded) {
	      done(null, decoded);
	    }
	  }

	  function downloadsDone(error, buffers) {
	    if (error) {
	      allDone(error);
	      return;
	    }
	    allDone(null, buffers);
	  }
	}

	var downloadSamples_1 = downloadSamples$2;

	var downloadSamples$1 = downloadSamples_1;
	var handleError$2 = handleErrorWeb;
	var oknok$1 = oknok$4;
	var ContextKeeper$2 = audioContextSingleton;

	const cdnSampleBaseURL =
	  'https://smidgeo.nyc3.cdn.digitaloceanspaces.com/sound-of-the-far-future/samples';
	const localSampleBaseURL = 'samples';

	var { getCurrentContext: getCurrentContext$2 } = ContextKeeper$2();

	function SampleDownloader$1({ sampleFiles, localMode }) {
	  var downloadStatus = {
	    samplesDownloaded: false,
	    sampleBuffers: null,
	  };

	  return { downloadStatus, startDownloads };

	  function startDownloads() {
	    getCurrentContext$2(oknok$1({ ok: useContext, nok: handleError$2 }));
	  }

	  function useContext(ctx) {
	    downloadSamples$1(
	      {
	        ctx,
	        sampleFiles,
	        baseURL: localMode ? localSampleBaseURL : cdnSampleBaseURL,
	      },
	      oknok$1({ ok: saveBuffers, nok: handleError$2 })
	    );
	  }

	  function saveBuffers(buffers) {
	    downloadStatus.sampleBuffers = buffers;
	    downloadStatus.samplesDownloaded = true;
	  }
	}

	var sampleDownloader = SampleDownloader$1;

	var downloadSamples = downloadSamples_1;
	var handleError$1 = handleErrorWeb;
	var oknok = oknok$4;
	var ContextKeeper$1 = audioContextSingleton;

	var { getCurrentContext: getCurrentContext$1 } = ContextKeeper$1();

	// Optimized for forward movement througth idList.
	function SampleCacher$1({ cacheSize = 5, baseURL, ext = '', idList }) {
	  var buffersForFiles = {};
	  var filesDownloaded = [];
	  var nextIndex = 0;

	  return { getSample, loadSamples, loadNext };

	  function getSample(id, done) {
	    const file = id + ext;
	    var buffer = buffersForFiles[file];
	    if (buffer) {
	      //console.log('Cache hit', id);
	      Promise.resolve().then(() => done(null, buffer));
	      return;
	    }

	    //console.log(
	    //'Cache miss',
	    //id,
	    //'cache contents',
	    //Object.keys(buffersForFiles)
	    //);
	    loadSamples(
	      [id],
	      oknok({ ok: () => done(null, buffersForFiles[file]), nok: done })
	    );
	  }

	  function loadSamples(ids, done) {
	    var files = ids.map((id) => id + ext);
	    for (var j = files.length - 1; j > -1; --j) {
	      if (buffersForFiles[files[j]]) {
	        files.splice(j, 1);
	      }
	    }

	    getCurrentContext$1(oknok({ ok: useContext, nok: handleError$1 }));

	    function useContext(ctx) {
	      downloadSamples(
	        { ctx, sampleFiles: files, baseURL },
	        oknok({ ok: saveBuffers, nok: done })
	      );
	    }

	    function saveBuffers(buffers) {
	      if (buffers.length < files.length) {
	        done(new Error(`Missing buffers from download of ${ids.join(', ')}.`));
	        return;
	      }

	      for (var i = 0; i < buffers.length; ++i) {
	        const file = files[i];
	        buffersForFiles[file] = buffers[i];
	        filesDownloaded.push(file);
	      }
	      while (filesDownloaded.length > cacheSize && filesDownloaded.length > 0) {
	        delete buffersForFiles[filesDownloaded[0]];
	        filesDownloaded.shift();
	      }

	      updateNextIndex();
	      //console.log(
	      //'Saved buffers; new cache contents',
	      //Object.keys(buffersForFiles)
	      //);

	      done(null, buffers);
	    }
	  }
	  function loadNext(n, done) {
	    loadSamples(
	      idList.slice(nextIndex, nextIndex + n),
	      oknok({ ok: incrementNextIndex, nok: done })
	    );

	    function incrementNextIndex() {
	      nextIndex += n;
	      if (nextIndex >= idList.length) {
	        nextIndex = nextIndex - idList.length;
	      }
	      done();
	    }
	  }

	  function updateNextIndex() {
	    var ids = filesDownloaded.map((file) => file.slice(0, -ext.length));

	    for (var j = 0; j < ids.length; ++j) {
	      const id = ids[j];
	      const index = idList.indexOf(id);
	      if (index > nextIndex) {
	        nextIndex = index + 1;
	        if (nextIndex >= idList.length) {
	          nextIndex = 0;
	        }
	      }
	    }
	  }
	}

	var sampleCacher = SampleCacher$1;

	var name = "sound-of-the-far-future";
	var version$1 = "2.2.7";
	var description = "A browser-performed piece of music.";
	var main = "index.js";
	var scripts = {
		build: "rollup -c",
		dev: "rollup -c -w"
	};
	var repository = {
		type: "git",
		url: "git@github.com:jimkang/sound-of-the-far-future.git"
	};
	var keywords = [
	];
	var author = "Jim Kang";
	var license = "Polyform Noncommercial License 1.0";
	var bugs = {
		url: "https://github.com/jimkang/sound-of-the-far-future/issues"
	};
	var homepage = "https://github.com/jimkang/sound-of-the-far-future";
	var devDependencies = {
		"@rollup/plugin-commonjs": "^19.0.0",
		"@rollup/plugin-json": "^4.1.0",
		"@rollup/plugin-node-resolve": "^13.0.0",
		"async-waterfall": "^0.1.5",
		eslint: "^7.24.0",
		"lodash.curry": "^4.1.1",
		minimist: "^1.2.0",
		request: "^2.88.0",
		rollup: "^2.50.6",
		"rollup-plugin-livereload": "^2.0.0",
		"rollup-plugin-terser": "^7.0.2",
		"sirv-cli": "^1.0.12"
	};
	var dependencies = {
		"@jimkang/randomid": "^1.0.2",
		accessor: "^3.0.0",
		"audio-context-singleton": "^1.0.3",
		"basic-browser-request": "^9.0.2",
		"call-next-tick": "^2.0.1",
		"collect-in-channel": "^3.0.1",
		"d3-array": "^2.4.0",
		"d3-drag": "^1.2.5",
		"d3-ease": "^1.0.6",
		"d3-queue": "^3.0.7",
		"d3-scale": "^3.2.1",
		"d3-selection": "^1.4.0",
		"d3-transition": "^1.3.2",
		"errorback-promise": "^1.0.0",
		"get-at-path": "^1.0.1",
		"handle-error-web": "^1.0.1",
		"lodash.clonedeep": "^4.5.0",
		"lodash.throttle": "^4.1.1",
		oknok: "^3.0.0",
		"one-listener-per-element": "^1.0.1",
		probable: "^2.1.4",
		"request-body-mover": "^1.0.1",
		"route-state": "^2.0.5",
		"sanitize-html": "^1.27.5",
		seedrandom: "^3.0.5",
		"soundbank-reverb": "^1.1.2",
		strokerouter: "^2.0.0"
	};
	var require$$10 = {
		name: name,
		version: version$1,
		description: description,
		main: main,
		"private": true,
		scripts: scripts,
		repository: repository,
		keywords: keywords,
		author: author,
		license: license,
		bugs: bugs,
		homepage: homepage,
		devDependencies: devDependencies,
		dependencies: dependencies
	};

	var Probable = probable.exports.createProbable;
	const defaultIdChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
	  ''
	);

	function RandomId(opts) {
	  var probable;
	  var idChars = defaultIdChars;
	  if (opts) {
	    let { random } = opts;
	    probable = Probable({ random });
	    if (opts.idChars) {
	      idChars = opts.idChars;
	    }
	  } else {
	    probable = Probable();
	  }

	  return randomId;

	  // Creates a string of random characters of the length specified.
	  function randomId(len) {
	    var id = '';
	    for (var i = 0; i < len; ++i) {
	      id += probable.pickFromArray(idChars);
	    }
	    return id;
	  }
	}

	var randomid$1 = RandomId;

	var RouteState = routeState$1;
	var wireControls = wireControls_1;
	var futureFlow = futureFlow_1;
	var handleError = handleErrorWeb;
	var timeline = require$$4;
	var SampleDownloader = sampleDownloader;
	var SampleCacher = sampleCacher;
	var tickSampleFiles = sampleFiles$1;
	var ContextKeeper = audioContextSingleton;
	var ep = errorbackPromise_1;
	var { version } = require$$10;

	const localNarrationBaseURL = 'narration';
	const cdnNarrationBaseURL =
	  'https://smidgeo.nyc3.cdn.digitaloceanspaces.com/sound-of-the-far-future/narration';

	var { getCurrentContext } = ContextKeeper();
	var randomid = randomid$1();
	var outerContainerEl = document.querySelector('.outer-container');
	var yesWebaudioEl = document.querySelector('.yes-webaudio-intro');
	var noWebaudioEl = document.querySelector('.no-webaudio-intro');

	var routeState;
	var controlsWired = false;

	(async function go() {
	  window.onerror = reportTopLevelError;
	  renderVersion();

	  routeState = RouteState({
	    followRoute,
	    windowObject: window,
	    propsToCoerceToBool: [
	      'muteVocals',
	      'muteTicks',
	      'muteHorns',
	      'pauseOnEndMovement',
	      'localMode',
	    ],
	  });

	  // Check web audio support level.
	  var { error, values } = await ep(getCurrentContext);
	  // Mobile Safari 14.4 doesn't have createStereoPanner.
	  if (error || !values[0] || !values[0].createStereoPanner) {
	    yesWebaudioEl.classList.add('hidden');
	    noWebaudioEl.classList.remove('hidden');
	  } else {
	    routeState.routeFromHash();
	  }
	})();

	function followRoute({
	  seed,
	  startTicks,
	  stopTicks,
	  muteVocals,
	  muteTicks,
	  muteHorns,
	  pauseOnEndMovement,
	  localMode,
	}) {
	  if (!seed) {
	    seed = randomid(8);
	    routeState.updateEphemeralState({ seed }, false);
	  }
	  console.log('Seed:', seed);

	  if (controlsWired) {
	    onStart();
	  } else {
	    wireControls({ onStart });
	    controlsWired = true;
	  }

	  var tickSampleDownloader = SampleDownloader({
	    localMode,
	    sampleFiles: tickSampleFiles,
	  });
	  var eventSampleDownloader = SampleDownloader({
	    localMode,
	    sampleFiles: ['horns-sus-ff-e2-PB-loop.mp3'],
	  });
	  const narrationBaseURL = localMode
	    ? localNarrationBaseURL
	    : cdnNarrationBaseURL;

	  var narrationSampleCacher = SampleCacher({
	    baseURL: narrationBaseURL,
	    ext: '.mp3',
	    idList: timeline.map((e) => e.id),
	  });

	  tickSampleDownloader.startDownloads();
	  eventSampleDownloader.startDownloads();
	  narrationSampleCacher.loadNext(5, handleError);

	  function onStart() {
	    outerContainerEl.classList.remove('hidden');

	    futureFlow({
	      timeline,
	      seed,
	      startTicks: +startTicks,
	      stopTicks: +stopTicks,
	      muteVocals,
	      muteTicks,
	      muteHorns,
	      pauseOnEndMovement,
	      localMode,
	      tickSampleDownloader,
	      eventSampleDownloader,
	      narrationSampleCacher,
	    });
	  }
	}

	function reportTopLevelError(msg, url, lineNo, columnNo, error) {
	  handleError(error);
	}

	function renderVersion() {
	  var versionInfo = document.getElementById('version-info');
	  versionInfo.textContent = version;
	}

	return linerVat;

}());
//# sourceMappingURL=liner-vat-bundle.js.map
