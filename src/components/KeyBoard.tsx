import { FC, Fragment, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import useGuessWord from "@/stores/useGuessWord";

import { fetchGuessDaily, fetchGuessRandom, fetchGuessWord } from "@/api";

type Word = {
	guess: string;
	result: string;
};

const KEY_BOARD_ROWS = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l"],
	["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

const KeyBoard: FC = props => {
	const {} = props;
	const { word, incrementCharactor, decrementCharactor } = useGuessWord();

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
			return await fetchGuessDaily({ guess: guess.toString(), size: guess.length });
		},
		{
			onSuccess: res => {
				console.log(res);
			},
			onError: err => {
				console.log(err);
			},
		}
	);

	const handleClickKeyboard = (item: string) => {
		if (item) {
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
								className={`flex justify-center items-center p-3 cursor-pointer  select-none rounded border-2 border-solid custom-btn-shadow active:translate-y-[2px] hover:translate-y-[1px] border-[#C2C3C7] bg-[linear-gradient(180deg,#F0F0F0_0%,#C2C3C7_100%)] w-full hover:bg-slate-200 active:bg-slate-300 ${
									activeKey === item ? "translate-y-[2px] bg-slate-300" : ""
								}`}
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
