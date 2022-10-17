import { FC, StrictMode, Fragment, useEffect, useState } from "react";
import moment from "moment";

import useGuessWord from "@/stores/useGuessWord";

const WORD_INPUT_LAYOUT = {
	MAX_WORD_LENGTH: 5,
	MAX_WORD_LINE: 6,
};

const CHAR_STATUS = {
	ABSENT: "absent",
	PRESENT: "present",
	CORRECT: "correct",
};

const WordInput: FC = props => {
	const {} = props;
	const { word, wordList, lineIndex } = useGuessWord();

	const [isWin, setWin] = useState(false);
	const [isLose, setLose] = useState(false);

	useEffect(() => {
		let winningState = false;

		for (let index = 0; index < wordList.length; index++) {
			for (let idx = 0; idx < wordList[index].result.length; idx++) {
				winningState = wordList[index].result[idx].result === CHAR_STATUS.CORRECT;
			}
		}

		setWin(winningState);

		if (wordList.length === WORD_INPUT_LAYOUT.MAX_WORD_LINE && !winningState) setLose(!winningState);
	}, [wordList]);

	return (
		<StrictMode>
			<Fragment>
				<div className="grid grid-col-5 gap-4">
					{[...Array(WORD_INPUT_LAYOUT.MAX_WORD_LINE)].map((e, index) => (
						<div className="flex gap-4" key={index}>
							{[...Array(WORD_INPUT_LAYOUT.MAX_WORD_LENGTH)].map((e, i) => (
								<div
									key={i}
									className={`flex justify-center items-center w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] select-none rounded border-2 border-solid font-extrabold text-xl uppercase text-[#5F574F] drop-shadow-[0px_1px_0px_#F0F0F0] border-[#C2C3C7] bg-[linear-gradient(180deg,#F0F0F0_0%,#C2C3C7_100%)] ${
										wordList?.[index]?.result?.[i]?.result === CHAR_STATUS.PRESENT
											? "text-[#AB5236] drop-shadow-[0px_1px_0px_#FFF7D0]  border-[#FBBF54] bg-[linear-gradient(180deg,_#FFF7D0_0%,#FBBF54_100%)]"
											: ""
									} ${
										wordList?.[index]?.result?.[i]?.result === CHAR_STATUS.CORRECT
											? "text-[#055459] drop-shadow-[0px_1px_0px_#DAEFAA] border-[#15C285] bg-[linear-gradient(180deg,#DAEFAA_0%,#15C285_100%)]"
											: ""
									}`}
								>
									{wordList?.[index]
										? wordList?.[index]?.result?.[i]?.guess
										: lineIndex === index
										? word?.[i]?.guess
										: null}
								</div>
							))}
						</div>
					))}

					<div className="flex justify-between w-full text-white dark:text-black mt-[4%]">
						<div>From Kyle with love: </div>
						<div>
							{moment().date()} / {moment().month() + 1} / {moment().year()}
						</div>
					</div>

					{isWin && <div className="text-green-500 font-semibold text-3xl mx-auto">You win!!!</div>}

					{isLose && <div className="text-red-500 font-semibold text-3xl mx-auto">You lose!!!</div>}
				</div>
			</Fragment>
		</StrictMode>
	);
};

export default WordInput;
