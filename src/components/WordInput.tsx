import React, { FC } from "react";

import useGuessWord from "@/stores/useGuessWord";

const WORD_INPUT_LAYOUT = {
	MAX_WORD_LENGTH: 5,
	MAX_WORD_LINE: 6,
};

const WordInput: FC = props => {
	const {} = props;
	const { word, updateWord } = useGuessWord();

	return (
		<div className="grid grid-col-5 gap-4">
			{[...Array(WORD_INPUT_LAYOUT.MAX_WORD_LINE)].map((e, index) => (
				<div className="flex gap-4" key={index}>
					{[...Array(WORD_INPUT_LAYOUT.MAX_WORD_LENGTH)].map((e, i) => (
						<div
							className={`flex justify-center items-center w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] rounded border-2 border-solid border-[#C2C3C7] bg-[linear-gradient(180deg,#F0F0F0_0%,#C2C3C7_100%)]`}
						>
							{/* empty */}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default WordInput;
