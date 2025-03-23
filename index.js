function evaluateFormula(formula, variables) {
    try {
        for (const [key, value] of Object.entries(variables)) {
            formula = formula.replace(new RegExp(`\\b${key}\\b`, 'g'), value);
        }
        return new Function(`return ${formula};`)();
    } catch (error) {
        console.error("Error evaluating formula:", error);
        return "Invalid Formula";
    }
}


function updateFormula(formula, variables, resultInput) {
    const values = {};
    var isValid = true;
    var isEmpty = false;
    variables.forEach(variable => {
        const inputElement = document.getElementById(variable);
        values[variable] = parseFloat(inputElement.value);
        if(isNaN(values[variable]))
            isValid = false;
        if(inputElement.value.trim() === "")
            isEmpty = true;
    });

    if(isValid && !isEmpty) {
        const result = evaluateFormula(formula, values);
        resultInput.value = result;
    } else if(isEmpty) {
        resultInput.value = "";
    } else {
        resultInput.value = "Invalid Formula";
    }
}


function initializeFormula(formulaElement) {
    const formula = formulaElement.getAttribute('evaluator');
    const placeholder = formulaElement.getAttribute('placeholder');
    if (!formula || !placeholder) 
        return;

    // add a read-only input tag
    const resultInput = document.createElement('input');
    resultInput.type = 'text';
    resultInput.readOnly = true;
    resultInput.placeholder = placeholder;
    formulaElement.parentElement.appendChild(resultInput);

    // extract variables
    const variables = [...new Set(formula.match(/[a-zA-Z_]\w*/g))];

    // add event listener to corresponding variables
    variables.forEach(variable => {
        const inputElement = document.getElementById(variable);
        if (inputElement) {
            inputElement.addEventListener('input', () => updateFormula(formula, variables, resultInput));
        } else {
            console.warn(`Input element with id "${variable}" not found.`);
        }
    });

    updateFormula(formula, variables, resultInput);
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('formula').forEach(initializeFormula);
});