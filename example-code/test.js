goog.provide('test');

goog.require('common');

test.testMethod = function(url) {
	common.go(url);
};

test.entryPoint = function() {
	test.testMethod('http://www.google.com');
};

goog.exportSymbol('test', test.entryPoint);
