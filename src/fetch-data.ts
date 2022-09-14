import { store } from "./store";

export const fetchData = async () => {
	const randomString = Math.random().toString(36).substring(7);
	const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

	const data = {
		backgroundImageURL: `https://source.unsplash.com/random/1920x1080?sig=${randomString}`,
		mainColor: randomColor,
	};
	store.set(data);

	return data;
};
