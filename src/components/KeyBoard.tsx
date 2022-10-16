import React, { FC } from "react";

import useGuessWord from "@/stores/useGuessWord";

const KEY_BOARD_ROWS = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l"],
	["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
];

const KeyBoard: FC = props => {
	const {} = props;
	const { word, updateWord } = useGuessWord();

	const handleClickKeyboard = (item: string) => {
		if (item) {
			updateWord(word + item);
		}
	};

	return (
		<div className="flex flex-col gap-2">
			{KEY_BOARD_ROWS.map((e, index) => (
				<div className="flex gap-2" key={index}>
					{e.map((item, i) => (
						<div
							className={`flex justify-center items-center p-3 cursor-pointer rounded border-2 border-solid border-[#C2C3C7] bg-[linear-gradient(180deg,#F0F0F0_0%,#C2C3C7_100%)] w-full hover:bg-slate-200 active:bg-slate-300`}
							onClick={() => handleClickKeyboard(item)}
						>
							{item}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default KeyBoard;
