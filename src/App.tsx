import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { Home } from "@/pages/Home";

import useDarkMode from "@/stores/useDarkMode";

const App = () => {
	const { darkMode } = useDarkMode();

	return (
		// Add transition later on
		<div className={`max-h-screen transition-all duration-500 ease-in-out ${darkMode ? "dark" : ""}`}>
			<Home />
		</div>
	);
};

export default App;
