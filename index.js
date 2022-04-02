const m = require("markdown").markdown.toHTML;
const e = require("express");
const f = require("fs");
const a = e();

a.use(e.static(__dirname + "/public"));
a.set("views", __dirname + "/views");
a.set("view engine", "ejs");

a.get("/", (q, s) => 
	s.redirect("/w/" + (process.env.DEFAULT_WIKI_PAGE || "README"))
);

a.get("/w/:p", (q, s) => {
	if (!f.existsSync(__dirname + "/wikis/" + q.params.p + ".md")) 
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
				f.readFileSync(__dirname + "/wikis/" + q.params.p + ".md", "utf8")
			)
		}
	);
});

a.use((q, s) => {
	return s.status(404)
		.render("err",
			{
				t: "404 Path not found",
				d: "The page, or a file that you try to visit is unavailable. Please try again later or contact to the owner."
			}
		);
});

let l = a.listen(process.env.PORT || 2000, _ => console.log("Listening on", l.address()));
