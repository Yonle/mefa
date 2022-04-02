const m = require("markdown").markdown.toHTML;
const e = require("express");
const f = require("fs");
const a = e();

a.use(e.static(__dirname + "/public"));
a.set("views", __dirname + "/views");
a.set("view engine", "ejs");

a.get("/", (q, s) => 
	s.redirect("/" + (process.env.DEFAULT_WIKI_PAGE || "README"))
);

a.get("/:p", (q, s) => {
	if (!f.existsSync(__dirname + "/pages/" + q.params.p + ".md")) 
		return s.status(404)
			.render("err", 
				{
					t: "404 Not found",
					d: "A page that you tried to visit is unavailable, or has been deleted."
				}
			);

	s.render("index",
		{
			t: q.params.p,
			c: m(
				f.readFileSync(__dirname + "/pages/" + q.params.p + ".md", "utf8")
			)
		}
	);
});

let l = a.listen(process.env.PORT || 2000, _ => console.log("Listening on", l.address()));
