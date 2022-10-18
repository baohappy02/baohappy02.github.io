import create from "zustand";

const MAX_WORD_LENGTH = 5;
const MAX_WORD_LINE = 6;

type Word = {
	guess: string;
	result: string;
};

type WordResponse = {
	slot: number;
	guess: string;
	result: string;
};

type WordList = {
	slot: number;
	result: Word[];
};

type GuessWordStore = {
	inputIndex: number;
	lineIndex: number;
	word: Word[];
	wordList: WordList[];
	incrementCharactor: (newWord: string) => void;
	decrementCharactor: () => void;
	updateWordResult: (newWord: WordResponse[]) => void;
	incrementIndex: () => void;
	decrementIndex: () => void;
	incrementLine: () => void;
	decrementLine: () => void;
};

const addChar = (word: Word[], newChar: string): Word[] => {
	return [...word, { guess: newChar, result: "" }];
};

const handleUpdateWord = (word: Word[], newWord: Word[]): Word[] => {
	return word.map((item, index) => Object.assign({}, item, newWord[index]));
};

const addWordList = (wordList: WordList[], word: Word[], slot: number, newWord: Word[]): WordList[] => {
	return [
		...wordList,
		{
			slot: slot,
			result: handleUpdateWord(word, newWord),
		},
	];
};

const useGuessWord = create<GuessWordStore>(
	(set, get): GuessWordStore => ({
		inputIndex: 0,
		lineIndex: 0,
		word: [],
		wordList: [],
		incrementCharactor: newWord => {
			if (get().inputIndex + 1 <= MAX_WORD_LENGTH) {
				set(state => ({
					inputIndex: state.inputIndex + 1,
					word: addChar(state.word, newWord),
				}));
			}
		},
		decrementCharactor: () => {
			if (get().inputIndex >= 0 && get().inputIndex <= MAX_WORD_LENGTH) {
				set(state => ({
					inputIndex: state.inputIndex - 1,
					word: state.word.slice(0, -1),
				}));
			}
		},
		updateWordResult: newWord => {
			if (get().inputIndex > 0 && get().inputIndex === MAX_WORD_LENGTH && get().inputIndex === MAX_WORD_LENGTH) {
				set(state => ({
					inputIndex: 0,
					lineIndex: state.lineIndex + 1,
					word: [],
					wordList: addWordList(state.wordList, state.word, state.lineIndex, newWord),
				}));
			}
		},
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
