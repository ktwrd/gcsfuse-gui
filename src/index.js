global.GCloudFUSEGUI = {
	Badge: require("./BadgePopup"),
	Mounts: {
		Conected: [],
		Saved: [],
	},
	Credentials: []
}
const managers = {
	Page: require("./PageManager.js"),
	Config: require("./ConfigManager.js"),
}
global.GCloudFUSEGUI.ConfigManager = new managers.Config();
global.GCloudFUSEGUI.PageManager = new managers.Page(
	global.GCloudFUSEGUI.ConfigManager);
global.GCloudFUSEGUI.Package = require("./../package.json");