const previousText = document.getElementById('previous');
        const currentText = document.getElementById('current');

        let currentOperand = '0';
        let previousOperand = '';
        let operation = undefined;

        function updateDisplay() {
            currentText.innerText = currentOperand;
            if (operation != null) {
                previousText.innerText = `${previousOperand} ${operation}`;
            } else {
                previousText.innerText = previousOperand;
            }
        }

        function appendNumber(number) {
            // Prevent multiple decimals
            if (number === '.' && currentOperand.includes('.')) return;
            
            // If the current display is '0' and we press a number, replace it
            if (currentOperand === '0' && number !== '.') {
                currentOperand = number;
            } else {
                currentOperand += number;
            }
            updateDisplay();
        }

        function appendOperator(op) {
            if (currentOperand === '') return;
            
            // If there's already an active operation, compute it first
            if (previousOperand !== '') {
                compute();
            }
            
            operation = op;
            previousOperand = currentOperand;
            currentOperand = '0';
            updateDisplay();
        }

        function compute() {
            let result;
            const prev = parseFloat(previousOperand);
            const current = parseFloat(currentOperand);
            
            if (isNaN(prev) || isNaN(current)) return;

            switch (operation) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '×':
                    result = prev * current;
                    break;
                case '÷':
                    if (current === 0) {
                        alert("Can't divide by zero!");
                        clearAll();
                        return;
                    }
                    result = prev / current;
                    break;
                case '%':
                    result = (prev * current) / 100;
                    break;
                default:
                    return;
            }

            // Fix potential floating point precision issues (e.g., 0.1 + 0.2)
            currentOperand = Math.round(result * 1e9) / 1e9;
            currentOperand = currentOperand.toString();
            operation = undefined;
            previousOperand = '';
            updateDisplay();
        }

        function clearAll() {
            currentOperand = '0';
            previousOperand = '';
            operation = undefined;
            updateDisplay();
        }

        function deleteNumber() {
            if (currentOperand.length <= 1) {
                currentOperand = '0';
            } else {
                currentOperand = currentOperand.slice(0, -1);
            }
            updateDisplay();
        }
