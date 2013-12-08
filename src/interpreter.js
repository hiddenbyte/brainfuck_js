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