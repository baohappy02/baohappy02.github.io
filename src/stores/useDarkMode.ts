import create from "zustand";

type DarkModeStore = {
	darkMode: boolean;
	toggleDarkMode: () => void;
};

const useDarkMode = create<DarkModeStore>(
	(set): DarkModeStore => ({
		darkMode: false,
		toggleDarkMode: () =>
			set(state => ({
				darkMode: !state.darkMode,
			})),
	})
);

export default useDarkMode;
