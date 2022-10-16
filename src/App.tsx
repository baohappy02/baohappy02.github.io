import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Home } from "@/pages/Home";

import useDarkMode from "@/stores/useDarkMode";

import { fetchGuessDaily, fetchGuessRandom, fetchGuessWord } from "@/api";

const App = () => {
	const { darkMode } = useDarkMode();

	const { isError, isSuccess, isLoading, data, error } = useQuery(
		["guessDaily"],
		() => fetchGuessDaily({ guess: "where", size: 5 }),
		{ staleTime: 3000 }
	);

	if (isSuccess && data) {
		console.table(data);
	}

	// useEffect(() => {
	// 	fetchGuessRandom({ guess: "f", size: 1, seed: 5 }).then(res => console.table(res));

	// 	fetchGuessWord("a", { guess: "j", size: 1 }).then(res => console.table(res));
	// }, []);

	return (
		// Add transition later on
		<div className={`transition-all duration-500 ease-in-out ${darkMode ? "dark" : ""}`}>
			{isLoading && (
				<>
					<div>Loading...</div>
				</>
			)}

			{isError && (
				<>
					<div>Error...</div>
				</>
			)}

			<Home />
		</div>
	);
};

export default App;
