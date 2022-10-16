import React, { FC } from "react";

import { Header, WordInput, KeyBoard } from "@/components";

import useDarkMode from "@/stores/useDarkMode";

const Home: FC = props => {
	const {} = props;
	const { darkMode, toggleDarkMode } = useDarkMode();

	return (
		// Add transition later on
		<div className="flex flex-col justify-center items-center min-w-screen min-h-screen bg-white text-black dark:bg-[#242424] dark:text-white w=full h-full ">
			<div className="flex flex-col bg-slate-600 dark:bg-slate-400  w-full max-w-7xl min-h-[100vh]">
				<Header />

				<div className="flex flex-col items-center w-full mt-[2%] gap-[5vh]">
					<WordInput />
					<KeyBoard />
				</div>
			</div>
		</div>
	);
};

export default Home;
