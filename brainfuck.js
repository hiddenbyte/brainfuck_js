(function() {
var root = this;
var BrainfuckJS = {};

if (typeof exports !== 'undefined') {
	exports.BrainfuckJS = BrainfuckJS;
} else {
    this.BrainfuckJS = BrainfuckJS;
}
//enum Token
var Token = BrainfuckJS.Token = {
	IncDataPointer : 0, 
	DecDataPointer : 1, 
	IncData : 2, 
	DecData : 3, 
	Output : 4, 
	Input : 5, 
	WhileOpen : 6, 
	WhileClose : 7
};
//end
//class SingleCharCommand
var SingleCharCommand = BrainfuckJS.SingleCharCommand = function(token)
{
	//public BrainfuckJS.Parser.Token CommandToken;
	this.CommandToken = token;
	var _self = this;
	
	//public void Visit(Visitor visitor)
	this.Visit = function(visitor)
	{
		visitor.Visit(_self);
	};
};
//end

//class WhileCommand
var WhileCommand = BrainfuckJS.WhileCommand = function(commands)
{
	//public Command[] Commands;
	this.Commands = commands;
	var _self = this;
	
	//public void Visit(Visitor visitor)
	this.Visit = function(visitor)
	{
		visitor.Visit(_self);
	};
};
//end

//class Program
var Program = BrainfuckJS.Program = function(commands)
{
	//public Command[] Commands;
	this.Commands = commands;
	var _self = this;
	
	//public void Visit(Visitor visitor)
	this.Visit = function(visitor)
	{
		visitor.Visit(_self);
	};
};
//end

///class SyntaxParser
var SyntaxParser = BrainfuckJS.SyntaxParser = function()
{
	var i;
	
	var P = function(tokens)
	{
		var commands = new Array();
		var token;
		for(i=0; i < tokens.length; ++i)
		{
			token = tokens[i];
			switch(token)
			{
				case Token.WhileClose:	
					alert("syntax error");
					break;
				case Token.WhileOpen:	
					commands.push(W(tokens));
					break;
				default:
					commands.push(new SingleCharCommand(tokens[i]));
			}
		}
		return new Program(commands);
	};

	var W = function(tokens)
	{
		var commands = new Array();
		var token;
		for(i=i+1;i < tokens.length;++i)
		{
			token = tokens[i];
			switch(token)
			{
				case Token.WhileClose:	
					return new WhileCommand(commands);
					break;
				case Token.WhileOpen:	
					commands.push(W(tokens));
					break;
				default:
					commands.push(new SingleCharCommand(tokens[i]));
			}
		}
		alert("syntax error");
	};

	this.Parse = function(tokens)
	{
		return P(tokens);
	};
};
//end
//class LexicalParser
var LexicalParser = BrainfuckJS.LexicalParser = function()
{
	var _tokenMap = {};
	_tokenMap[">"] = Token.IncDataPointer;
	_tokenMap["<"] = Token.DecDataPointer;
	_tokenMap["-"] = Token.DecData;
	_tokenMap["+"] = Token.IncData;
	_tokenMap["."] = Token.Output;
	_tokenMap[","] = Token.Input;
	_tokenMap["["] = Token.WhileOpen;
	_tokenMap["]"] = Token.WhileClose;

	this.Parse = function(charStream)
	{
		var tokens = new Array();
		var token;
		for(var i=0; i < charStream.length; ++i)
		{
			token = _tokenMap[charStream.charAt(i)];
			if(token != undefined){
				tokens.push(token);
			}
		}
		return tokens;
	};
};
//end
//class ExecuteVisitor 
var ExecuteVisitor = BrainfuckJS.ExecuteVisitor = function(executionContext)
{
	var executionCtx = executionContext;
	var _self = this;
	
	//public void Visit(Program t);
	//public void Visit(SingleCharCommand t);
	//public void Visit(WhileCommand t);
	this.Visit = function(t)
	{
		if(t.constructor == Program){
			VisitProgram(t);
			return;
		}
		
		if(t.constructor == SingleCharCommand){
			VisitSingleCharCommand(t);
			return;
		}
		
		if(t.constructor == WhileCommand)
			VisitWhileCommand(t);
	};
	
	var VisitProgram = function(t)
	{
		var commands = t.Commands;
		for(var i=0; i < commands.length; ++i)
			commands[i].Visit(_self);
	};
	
	var VisitWhileCommand = function(t)
	{
		var commands = t.Commands;
		while(executionCtx.CurrentData() != 0)
		{
			for(var i=0; i < commands.length; ++i)
				commands[i].Visit(_self);
		}
	};
	
	var VisitSingleCharCommand = function(t)
	{
		var cmd = t.CommandToken;
		switch(cmd) 
		{
			case Token.IncDataPointer:
				executionCtx.IncrementDataPointer();
				break;
			case Token.DecDataPointer:
				executionCtx.DecrementDataPointer();
				break;
			case Token.IncData:
				executionCtx.IncrementData();
				break;
			case Token.DecData: 
				executionCtx.DecrementData();
				break;
			case Token.Output: 
				executionCtx.Print();
				break;
			case Token.Input:
				executionCtx.Read();
		};
	};
};
//end
//class ExecutionContext
var ExecutionContext = BrainfuckJS.ExecutionContext = function(std_out,std_in)
{
	if(std_out == undefined || std_out == null || std_out  &&  std_out.constructor !== Function)
		throw new Error("Invalid Argument: std_out.");

	if(std_in == undefined || std_in == null || std_in  &&  std_in.constructor !== Function)
		throw new Error("Invalid Argument: std_int.");

	var _memory = new Array();
	var _dataPointer = 0;

	this.IncrementDataPointer = function()
	{
		_dataPointer++;
	};
	
	this.DecrementDataPointer = function()
	{
		_dataPointer--;
	};
	
	this.IncrementData = function()
	{
		checkIfIsInitialized();
		_memory[_dataPointer]++;
	};
	
	this.DecrementData = function()
	{
		checkIfIsInitialized();
		_memory[_dataPointer]--;
	};
	
	this.Print = function()
	{
		checkIfIsInitialized();
		std_out(String.fromCharCode(_memory[_dataPointer]));
	};
	
	this.Read = function()
	{
		_memory[_dataPointer] = std_in().charCodeAt(0);
	};
	
	this.CurrentData = function()
	{		
		checkIfIsInitialized();
		return _memory[_dataPointer];
	};
	
	var checkIfIsInitialized  = function()
	{
		if(_memory[_dataPointer] == undefined)
			_memory[_dataPointer] = 0;
	}
};
//end
var Interpreter = BrainfuckJS.Interpreter = function() {

	var lexicalParser = new LexicalParser();
	var syntaxParser = new SyntaxParser();

	//void Execute(String bfString,Action<int> std_out,Func<int> std_in)
	this.Execute = function(bfString,std_out,std_in)
	{
		//Parse bf source code
		var syntaxTree = syntaxParser.Parse(lexicalParser.Parse(bfString));
		
		//Create an ExecutionContext
		var execContext = new ExecutionContext(std_out,std_in); 
		
		//Execute
		syntaxTree.Visit(new ExecuteVisitor(execContext));
	};
	//end
};
})();