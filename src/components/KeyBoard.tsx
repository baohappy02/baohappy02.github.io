import { FC, Fragment, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import useGuessWord from "@/stores/useGuessWord";

import { fetchGuessDaily, fetchGuessRandom, fetchGuessWord } from "@/api";

type Word = {
	guess: string;
	result: string;
};

const MAX_WORD_LENGTH = 5;

const KEY_BOARD_ROWS = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l"],
	["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

let KEY_BOARD_LIST: Array<string> = [];

for (let index = 0; index < KEY_BOARD_ROWS.length; index++) {
	KEY_BOARD_LIST = KEY_BOARD_LIST.concat(KEY_BOARD_ROWS[index]);
}

const KeyBoard: FC = props => {
	const {} = props;
	const { word, inputIndex, incrementCharactor, decrementCharactor, updateWordResult } = useGuessWord();

	const [activeKey, setActiveKey] = useState("");

	const {
		isLoading,
		isSuccess,
		isError,
		data,
		error,
		mutate: postGuessDaily,
	} = useMutation(
		async () => {
			let guess = word.map(({ guess }: Word) => guess).join("");

			if (guess) {
				return await fetchGuessDaily({ guess: guess.toString(), size: guess.length });
			}

			return;
		},
		{
			onSuccess: res => {
				if (res) return updateWordResult(res);
			},
			onError: err => {
				console.error(err);
			},
		}
	);

	const handleClickKeyboard = (item: string) => {
		if (item && KEY_BOARD_LIST.includes(item)) {
			setActiveKey(item);

			switch (item) {
				case "Backspace":
					decrementCharactor();

					break;
				case "Enter":
					try {
						postGuessDaily();
					} catch (err) {
						// console.error(err);
					}

					break;

				default:
					incrementCharactor(item);

					break;
			}
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", function (event) {
			event.preventDefault();

			event?.key ? handleClickKeyboard(event.key) : null;
		});

		document.addEventListener("keyup", function (event) {
			event.preventDefault();

			setActiveKey("");
		});
	}, []);

	return (
		<Fragment>
			<div className="flex flex-col gap-[10px]">
				{KEY_BOARD_ROWS.map((e, index) => (
					<div className="flex gap-[10px]" key={index}>
						{e.map((item, i) => (
							<div
								key={i}
								className={`flex justify-center items-center p-3 cursor-pointer  select-none rounded border-2 border-solid custom-btn-shadow active:translate-y-[2px] hover:translate-y-[1px] font-extrabold text-xl uppercase text-[#5F574F] drop-shadow-[0px_1px_0px_#F0F0F0] border-[#C2C3C7] bg-[linear-gradient(180deg,#F0F0F0_0%,#C2C3C7_100%)] w-full hover:bg-slate-200 active:bg-slate-300 ${
									activeKey === item ? "translate-y-[2px] bg-slate-300" : ""
								} ${
									item === "Enter" && inputIndex > 0 && inputIndex < MAX_WORD_LENGTH
										? "border-[#FBBF54] bg-[linear-gradient(180deg,_#FFF7D0_0%,#FBBF54_100%)]"
										: ""
								} ${
									item === "Enter" && inputIndex > 0 && inputIndex === MAX_WORD_LENGTH
										? "border-[#15C285] bg-[linear-gradient(180deg,#DAEFAA_0%,#15C285_100%)]"
										: ""
								} ${
									item === "Backspace" && activeKey === item
										? "border-[#15C285] bg-[linear-gradient(180deg,#DAEFAA_0%,#15C285_100%)]"
										: ""
								} `}
								onClick={() => handleClickKeyboard(item)}
							>
								{item}
							</div>
						))}
					</div>
				))}
			</div>
		</Fragment>
	);
};

export default KeyBoard;
