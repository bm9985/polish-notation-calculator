import { useEffect } from 'react';
import styles from './App.module.css';
import { useCalculator, AppProvider } from './AppContext';

const App = () => {
	const {
		stack,
		activeNumber,
		handleNumberClick,
		handleOperatorClick,
		handleClear,
		handleEnter,
	} = useCalculator();

	// Handle User keyboard input
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
						{stack.map((item: number, index: number) => (
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
			{/* Take focus off buttons on user keyboard input */}
			<input
				type='text'
				id='hiddenInput'
				className={styles.hiddenInput}
				ref={(input) => input?.focus()}
			/>
		</>
	);
};

const AppWrapper = () => {
	return (
		<AppProvider>
			<App />
		</AppProvider>
	);
};

export default AppWrapper;
