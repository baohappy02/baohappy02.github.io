import { FC } from "react";

import { Header, WordInput, KeyBoard } from "@/components";

const Home: FC = props => {
	const {} = props;

	return (
		// Add transition later on
		<div className="flex flex-col justify-center items-center min-w-screen min-h-screen bg-white text-black dark:bg-[#242424] w=full h-full ">
			<div className="flex flex-col bg-slate-600 dark:bg-slate-400  w-full max-w-7xl min-h-[100vh]">
				<Header />

				<div className="flex flex-col justify-evenly items-center w-full h-full min-h-[calc(100vh-82px)]">
					<WordInput />
					<KeyBoard />
				</div>
			</div>
		</div>
	);
};

export default Home;
