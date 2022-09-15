export const important = (value: unknown) => `${String(value)} !important`;

export const globalVar = (name: string, fallback: unknown = ""): string =>
	`var(--${name}, ${String(fallback)})`;
