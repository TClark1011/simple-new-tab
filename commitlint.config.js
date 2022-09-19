module.exports = {
	extends: ["@commitlint/config-conventional"],
	ignores: [(commitMsg) => commitMsg.includes("[skip ci]")],
};
