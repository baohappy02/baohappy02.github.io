import create from "zustand";

const MAX_WORD_LENGTH = 5;
const MAX_WORD_LINE = 6;

type Word = {
	guess: string;
	result: string;
};

type GuessWordStore = {
	inputIndex: number;
	lineIndex: number;
	word: Word[];
	wordList: string[];
	incrementCharactor: (newWord: string) => void;
	decrementCharactor: () => void;
	incrementIndex: () => void;
	decrementIndex: () => void;
	incrementLine: () => void;
	decrementLine: () => void;
};

const addChar = (word: Word[], newChar: string): Word[] => {
	return [...word, { guess: newChar, result: "" }];
};

const useGuessWord = create<GuessWordStore>(
	(set, get): GuessWordStore => ({
		inputIndex: 0,
		lineIndex: 0,
		word: [],
		wordList: [],
		incrementCharactor: newWord => {
			// if (
			// 	get().inputIndex >= 0 &&
			// 	get().inputIndex < MAX_WORD_LENGTH &&
			// 	get().lineIndex > 0 &&
			// 	get().wordList.length < MAX_WORD_LINE
			// ) {
			// 	console.log("a");
			// 	return set(state => ({
			// 		inputIndex: state.inputIndex + 1,
			// 		word: state.word + newWord,
			// 	}));
			// }

			// console.log(get().inputIndex === MAX_WORD_LENGTH, get().lineIndex > 0);
			// if (get().inputIndex === MAX_WORD_LENGTH && get().lineIndex > 0) {
			// 	console.log("b");

			// 	return set(state => ({
			// 		inputIndex: 0,
			// 		word: newWord,
			// 		lineIndex: state.lineIndex + 1,
			// 		wordList: [...state.wordList, state.word],
			// 	}));
			// }

			if (get().inputIndex + 1 <= MAX_WORD_LENGTH) {
				set(state => ({
					inputIndex: state.inputIndex + 1,
					word: addChar(state.word, newWord),
				}));
			}
		},
		decrementCharactor: () =>
			set(state => ({
				word: state.word.splice(-1),
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
