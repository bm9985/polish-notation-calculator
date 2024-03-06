import { useEffect, useState } from 'react';
import styles from './App.module.css';

const App = () => {
	const [stack, setStack] = useState<number[]>([]);
	const [activeNumber, setActiveNumber] = useState<string>('0');

	const handleNumberClick = (number: number | string) => {
		setActiveNumber((prevActiveNumber) => {
			if (prevActiveNumber === '0') {
				return number.toString();
			} else {
				return prevActiveNumber + number.toString();
			}
		});
	};

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
					result = num1 ^ num2;
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

	const pushToStack = (value: number) => {
		setStack((prevStack) => [value, ...prevStack]);
	};

	const removeFromStack = () => {
		setStack((prevStack) => prevStack.slice(1));
	};

	const handleClear = () => {
		setStack([]);
		setActiveNumber('0');
	};

	const handleEnter = () => {
		if (!isNaN(parseFloat(activeNumber))) {
			pushToStack(parseFloat(activeNumber));
			setActiveNumber('0');
		}
	};

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			const key = event.key;
			if (!isNaN(parseInt(key))) {
				handleNumberClick(parseInt(key));
			} else if (
				key === '.' ||
				key === '+' ||
				key === '-' ||
				key === '*' ||
				key === '/' ||
				key === '%' ||
				key === '^' ||
				key === '>' ||
				key === '<' ||
				key === '*' ||
				key === 'X' ||
				key === 'x'
			) {
				handleOperatorClick(key);
			} else if (key === 'Enter') {
				handleEnter();
			}
		};

		window.addEventListener('keypress', handleKeyPress);

		return () => {
			window.removeEventListener('keypress', handleKeyPress);
		};
	}, [handleNumberClick, handleOperatorClick]);

	return (
		<>
			<div className={styles.calculator}>
				<div className={styles.display}>
					<div className={styles.stack}>
						{stack.map((item, index) => (
							<div key={index}>{item}</div>
						))}
					</div>
					<div className={styles.active}>{activeNumber}</div>
				</div>
				<div className={styles.buttons}>
					<div className={styles.row}>
						<button onClick={() => handleNumberClick(7)}>7</button>
						<button onClick={() => handleNumberClick(8)}>8</button>
						<button onClick={() => handleNumberClick(9)}>9</button>
						<button onClick={() => handleOperatorClick('/')}>/</button>
					</div>
					<div className={styles.row}>
						<button onClick={() => handleNumberClick(4)}>4</button>
						<button onClick={() => handleNumberClick(5)}>5</button>
						<button onClick={() => handleNumberClick(6)}>6</button>
						<button onClick={() => handleOperatorClick('*')}>*</button>
					</div>
					<div className={styles.row}>
						<button onClick={() => handleNumberClick(1)}>1</button>
						<button onClick={() => handleNumberClick(2)}>2</button>
						<button onClick={() => handleNumberClick(3)}>3</button>
						<button onClick={() => handleOperatorClick('-')}>-</button>
					</div>
					<div className={styles.row}>
						<button onClick={() => handleNumberClick(0)}>0</button>
						<button onClick={() => handleNumberClick('.')}>.</button>
						<button onClick={() => handleOperatorClick('+')}>+</button>
						<button onClick={() => handleOperatorClick('^')}>^</button>
					</div>
					<div className={styles.row}>
						<button onClick={() => handleOperatorClick('>')}>&gt;</button>
						<button onClick={() => handleOperatorClick('<')}>&lt;</button>
						<button onClick={() => handleOperatorClick('log')}>Log</button>
						<button onClick={() => handleOperatorClick('pop')}>Pop</button>
					</div>
					<div className={styles.row}>
						<button onClick={handleClear}>C</button>
						<button onClick={handleEnter}>Enter</button>
					</div>
				</div>
			</div>
			<div></div>
			<input
				type='text'
				id='hiddenInput'
				className={styles.hiddenInput}
				ref={(input) => input?.focus()}
			/>
		</>
	);
};

export default App;
