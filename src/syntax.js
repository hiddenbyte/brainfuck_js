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