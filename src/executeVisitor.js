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