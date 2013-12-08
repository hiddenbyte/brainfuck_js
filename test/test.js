var assert = require("assert");
var expect = require("expect.js");
var BrainfuckJS = require("../brainfuck.js").BrainfuckJS;

describe('BrainfuckJS.ExecutionContext', function() {
  
  describe('Constructor', function() {
	
	it('should not succeed with no arguments', function() {
		expect(function() { new BrainfuckJS.ExecutionContext(); }).to.throwError();
    });

    
    it('should not succeed with arguments with types that are different from Function.', function() {
		expect(function() { new BrainfuckJS.ExecutionContext(666, { wat: '?'}); }).to.throwError();
    });

    
    it('should succeed passing two arguments of type Function.', function() {
		expect(function() { new BrainfuckJS.ExecutionContext(function(){ }, function(){ }); }).to.not.throwError();
    });

  });


});