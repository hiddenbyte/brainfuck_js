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