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