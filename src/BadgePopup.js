class BadgeObject
{
	constructor(BadgeData)
	{
		this.pm = global.GCloudFUSEGUI.PageManager;
		this.data = BadgeData;
	}
	async _()
	{
		let $ = require("jquery");

		await this.pm.lockwait();

		let content = this.pm.get("badge");

		let compiled = await content.compiled(this.data);

		let jq = $("div.badge.container ul").append(compiled);

		setTimeout(() =>
		{
			jq.remove();
		}, (this.data.timeout || 3000) + 100);
	}
}
module.exports = BadgeObject;