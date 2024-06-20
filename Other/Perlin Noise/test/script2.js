const initProgram = () => {
	console.log("initProgram");
	console.log("globalVar", globalVar);

	setGlobalVarToOne();
	console.log("setGlobalVarToOne();");
	console.log("globalVar", globalVar);

	setGlobalVarToZero();
	console.log("setGlobalVarToZero();");
	console.log("globalVar", globalVar);
};

initProgram();
