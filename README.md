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

Note: The compiled code shown on the right is not verbatim. It's a concatenated string of all the compiled code bits that reference the source line in question.