const swig = require("swig");
const fs = require("fs");
const path = require("path");

class PageManager
{
	templates = {};
	constructor(config)
	{
		this._config = config;
		this.initalize();
	}

	async initalize()
	{
		await this.scan();
		await this.lockwait();
		this.render("home");
		await this.lockwait();
	}
	active = null;
	async render(name,data)
	{
		await this.lockwait();
		if (this.active != null)
			this.active.script.destroy();

		await this.lockwait();
		let page = this.templates[name];

		if (this.active != null && typeof this.active == "object" && this.active.script != null)
			await this.active.script.destroy();

		var instance = null;
		var cpl = this.swig.compileFile(page.name+".tpl");
		if (page.script != false && !page.script.endsWith("none.js"))
		{
			let cs = require( page.script );
			instance = new cs(cpl, data, page, this);
		}
		else
		{
			(require("jquery"))("templateContainer").html(cpl(data));
		}
		this.active =
		{
			script: instance,
			page: page,
			data: data,
			name: name
		}
	}
	async get(name)
	{
		await this.lockwait();
		return this.templates[name];
	}

	_locked = false;
	get lock () {
		return this._locked;
	}
	set lock (value) {
		this._locked = value;
		return value;
	}

	async lockwait()
	{
		while (this.locked)
		{
			if (!this.locked)
				break;
		}
		return true;
	}

	async scan()
	{
		await this.lockwait();
		this.templates = {};

		this.lock = true;

		this.templateDirectory = path.join(__dirname, "templates");
		this.scriptDirectory = path.join(__dirname, "scripts");

		var files = fs.readdirSync(this.templateDirectory);

		var metrics = {
			error:
			{
				index: 0,
				list: [],
			},
			done:
			{
				list: [],
				index: 0,
			},
			count: 0,
		}

		for (let i = 0; i < files.length; i++)
		{
			var _templateFilename = files[i];
			var _templateName = files[i].replace(/\.[^/.]+$/, "");

			try
			{
				let c = fs.readFileSync( path.join(this.templateDirectory, _templateFilename) ).toString();
	
				var _templateScript = false;
				if (fs.existsSync( path.join(this.scriptDirectory, _templateName + ".js") ))
				{
					let allowScript = true;
					try
					{
						_templateScript = require( path.join(this.scriptDirectory, _templateName + ".js") );
					}
					catch(e)
					{
						allowScript = false;
					}
					_templateScript = null;
					_templateScript = allowScript;
					if (!allowScript)
						_templateScript = path.join( this.scriptDirectory, _templateName + ".js" );
				}
	
				this.templates[_templateName] = {
					name: _templateName,
					script: _templateScript || path.join(this.scriptDirectory, "none.js"),
					content: c,
				}
			}
			catch(e)
			{ 
				console.error(`[PageManager] Failed to parse template ${_templateName} located at ${path.join(__dirname,"templates",_templateFilename)}`,e);
				new (GCloudFUSEGUI.Badge)({
					parent: `Page Manager`,
					text: `Failed to parse ${_templateName}.`,
					color: `red`
				})
				metrics.error.index++;
				metrics.error.list.push({
					stack: e,
					filename: files[i],
					name: _templateName
				});
			}
		}

		let formatted = { };
		Object.entries(this.templates).forEach( r => formatted[r[0]+".tpl"] = r[1].content );
		this.swig = new swig.Swig({loader: swig.loaders.memory(formatted)});

		metrics.count = files.length;
		metrics.done.index = Object.entries(this.templates).length;
		this.lock = false;
		new (GCloudFUSEGUI.Badge)({
			parent: `Page Manager`,
			text: `Completed ${metrics.index}, with ${metrics.error.index} failed.`,
			color: `gray`,
		})
	}
}
module.exports = PageManager;