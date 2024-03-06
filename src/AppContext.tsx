import React, { ReactNode, createContext, useContext, useState } from 'react';

// Define the context
const AppContext = createContext<any>(null);

// Create a provider for the context
export const AppProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [stack, setStack] = useState<number[]>([]);
	const [activeNumber, setActiveNumber] = useState<string>('0');

	// Handle click for numbers
	const handleNumberClick = (number: number | string) => {
		setActiveNumber((prevActiveNumber) => {
			if (prevActiveNumber === '0') {
				return number.toString();
			} else {
				return prevActiveNumber + number.toString();
			}
		});
	};

	// Handle click for operators
	const handleOperatorClick = (operator: string) => {
		if (!isNaN(parseFloat(activeNumber))) {
			const num1 = stack[0];
			const num2 = parseFloat(activeNumber);
			let result = 0;
			const stackCopy = [...stack];

			switch (operator) {
				case '+':
					result = num1 + num2;
					removeFromStack();
					break;
				case '-':
					if (num2 > 0) {
						result = 0 - num2;
					} else {
						result = num1 - num2;
						removeFromStack();
					}
					break;
				case '*':
				case 'x':
				case 'X':
					result = num1 * num2;
					removeFromStack();
					break;
				case '/':
				case '%':
					result = num1 / num2;
					removeFromStack();
					break;
				case '^':
					result = num1 ** num2;
					removeFromStack();
					break;
				case '>':
					if (num2 > 0) {
						stackCopy.push(num2);
						pushToStack(num2);
					}
					result = Math.max(...stackCopy);
					break;
				case '<':
					if (num2 > 0) {
						stackCopy.push(num2);
						pushToStack(num2);
					}
					result = Math.min(...stackCopy);
					break;
				case 'log':
					if (num2 > 0) {
						result = Math.log10(num2);
					}
					break;
				case 'pop':
					if (stack.length > 0) {
						result = stack.pop()!;
					}
					break;
				default:
					break;
			}
			setActiveNumber(result.toString());
		}
	};

	// Push a number to the stack
	const pushToStack = (value: number) => {
		setStack((prevStack) => [value, ...prevStack]);
	};

	// Remove an item from the stack
	const removeFromStack = () => {
		setStack((prevStack) => prevStack.slice(1));
	};

	// Clear the stack and active number
	const handleClear = () => {
		setStack([]);
		setActiveNumber('0');
	};

	// Handle enter key press
	const handleEnter = () => {
		if (!isNaN(parseFloat(activeNumber))) {
			pushToStack(parseFloat(activeNumber));
			setActiveNumber('0');
		}
	};

	// Provide the context value to children components
	return (
		<AppContext.Provider
			value={{
				stack,
				activeNumber,
				handleNumberClick,
				handleOperatorClick,
				handleClear,
				handleEnter,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

// Custom hook to consume the context
export const useCalculator = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useCalculator must be used within a CalculatorProvider');
	}
	return context;
};
