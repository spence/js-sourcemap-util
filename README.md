Compare compiled jQuery against source (http://jquery.com/download/). Grab all the source files. In jQuery's case, they have compiled it as a single file.
+   jquery.js (development)
+   jquery.min.js (production)
+   jquery.min.map (source map)

```text
> node compare.js . jquery.min.js jquery.min.map | head -n 18
================= jquery.js ================

14:   (function( window, undefined ) {               |  function(e,undefined){
21:   var                                            |  var
23:       rootjQuery,                                |  t,
26:       readyList,                                 |  n,
30:       core_strundefined = typeof undefined,      |  r=typeof undefined,
33:       location = window.location,                |  i=e.location,
34:       document = window.document,                |  o=e.document,
35:       docElem = document.documentElement,        |  s=o.documentElement,
38:       _jQuery = window.jQuery,                   |  a=e.jQuery,
41:       _$ = window.$,                             |  u=e.$,
44:       class2type = {},                           |  l={},
47:       core_deletedIds = [],                      |  c=[],
49:       core_version = "2.0.3",                    |  p="2.0.3",
52:       core_concat = core_deletedIds.concat,      |  f=c.concat,
53:       core_push = core_deletedIds.push,          |  h=c.push,
```

Or from http://underscorejs.org/:

```text
> node compare.js . underscore.min.js underscore.min.map | head -n 18
================= underscore.js ================

6:    (function() {                                                    |  function(){
12:     var root = this;                                               |  var n=this,
15:     var previousUnderscore = root._;                               |  t=n._,
18:     var breaker = {};                                              |  r={},
21:     var ArrayProto = Array.prototype, ObjProto = Object.prototype  |  e=Array.prototype,u=Object.prototype, 
      , FuncProto = Function.prototype;                                |  i=Function.prototype, 
25:       push             = ArrayProto.push,                          |  a=e.push,
26:       slice            = ArrayProto.slice,                         |  o=e.slice,
27:       concat           = ArrayProto.concat,                        |  c=e.concat,
28:       toString         = ObjProto.toString,                        |  l=u.toString,
29:       hasOwnProperty   = ObjProto.hasOwnProperty;                  |  f=u.hasOwnProperty,
34:       nativeForEach      = ArrayProto.forEach,                     |  s=e.forEach,
35:       nativeMap          = ArrayProto.map,                         |  p=e.map,
36:       nativeReduce       = ArrayProto.reduce,                      |  v=e.reduce,
37:       nativeReduceRight  = ArrayProto.reduceRight,                 |  h=e.reduceRight,
```

Or from the example code, compiled with Google Closure (https://developers.google.com/closure/):
```
> node compare.js example-code/ example-code/build/test-sourcemap.js example-code/build/test.js.map

================= example-code/test.js ================

9:    test.entryPoint = function() {                               |  function a(){}
10:       test.testMethod('http://www.google.com');                |  "http://www.google.com"
13:   goog.exportSymbol('test', test.entryPoint);                  |  "test"

================= example-code/common.js ================

4:        window.location.href = url;                              |  window.location.href=

================= ../closure-library/closure/goog/base.js ================

45:   goog.global = this;                                          |  this
159:    var parts = name.split('.');                               |  var b=[],
160:    var cur = opt_objectToExportTo || goog.global;             |  c=
165:    if (!(parts[0] in cur) && cur.execScript) {                |  ;!(b[0]in c)&&c.execScript&&
166:      cur.execScript('var ' + parts[0]);                       |  c.execScript("var "+b[0])
175:    for (var part; parts.length && (part = parts.shift());) {  |  ;for(var d;b.length&&(d=b.shift());)
176:      if (!parts.length && goog.isDef(opt_object)) {           |  !b.length&&!==a?=:=
178:        cur[part] = opt_object;                                |  c[d]a
179:      } else if (cur[part]) {                                  |  c[d]?:=
180:        cur = cur[part];                                       |  c[d]
182:        cur = cur[part] = {};                                  |  c[d]{}
730:    return val !== undefined;                                  |  void 0
```

Note: The compiled code shown on the right is not verbatim. It's a concatenated string of all the compiled code bits that reference the source line in question.