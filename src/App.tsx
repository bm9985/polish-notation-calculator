import styles from './App.module.css';

function App() {
	const handleEnter = () => {};
	const handleNumberClick = (num: number | string) => {};

	const handleOperatorClick = (operator: string) => {};
	return (
		<>
			<div className={styles.calculator}>
				<div className={styles.display}>
					<div className={styles.active}>0</div>
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
						<button onClick={handleEnter}>Enter</button>
					</div>
				</div>
			</div>
			<div></div>
		</>
	);
}

export default App;
