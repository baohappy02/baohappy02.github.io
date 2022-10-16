import create from "zustand";

type GuessWordStore = {
	inputIndex: number;
	lineIndex: number;
	word: string;
	updateWord: () => void;
	incrementIndex: () => void;
	decrementIndex: () => void;
	incrementLine: () => void;
	decrementLine: () => void;
};

const useGuessWord = create<GuessWordStore>(
	(set): GuessWordStore => ({
		inputIndex: 0,
		lineIndex: 0,
		word: "",
		updateWord: () =>
			set(state => ({
				word: state.word,
			})),
		incrementIndex: () =>
			set(state => ({
				inputIndex: state.inputIndex + 1,
			})),
		decrementIndex: () =>
			set(state => ({
				inputIndex: state.inputIndex - 1,
			})),
		incrementLine: () =>
			set(state => ({
				lineIndex: state.lineIndex + 1,
			})),
		decrementLine: () =>
			set(state => ({
				lineIndex: state.lineIndex - 1,
			})),
	})
);

export default useGuessWord;
