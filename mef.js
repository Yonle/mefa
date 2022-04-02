const m = require("markdown").markdown.toHTML;
const e = require("ejs");
const f = require("fs");

if (!f.existsSync(__dirname + "/dist"))
	f.cpSync(__dirname + "/public", __dirname + "/dist/", {
		recursive: true,
		preserveTimestamps: true
	});

f.readdirSync(__dirname + "/pages")
	.filter(n => n.endsWith(".md"))
	.map(n => n.slice(0, n.length-3))
	.forEach(async t => {
		if (!f.existsSync(__dirname + "/dist/" + t)) f.mkdirSync(__dirname + "/dist/" + t, {
			recursive: true
		});
		
		f.writeFileSync(__dirname + "/dist/" + t + "/index.html",
			await e.renderFile(__dirname + "/views/index.ejs", {
				t,
				c: m(
					f.readFileSync(__dirname + "/pages/" + t + ".md", "utf8")
				) 	
			}), {
				recursive: true
			}
		)
	});

if (f.existsSync(__dirname + "/dist/README/index.html"))
	f.cpSync(__dirname + "/dist/README/index.html", __dirname + "/dist/index.html");
