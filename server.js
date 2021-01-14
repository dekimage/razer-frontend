const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    //COLLECTION

    server.get("/completed", (req, res) => {
      const actualPage = "/completed";
      app.render(req, res, actualPage);
    });

    server.get("/favorites", (req, res) => {
      const actualPage = "/favorites";
      app.render(req, res, actualPage);
    });

    server.get("/saved", (req, res) => {
      const actualPage = "/saved";
      app.render(req, res, actualPage);
    });

    server.get("/spells", (req, res) => {
      const actualPage = "/spells";
      app.render(req, res, actualPage);
    });

    server.get("/inventory", (req, res) => {
      const actualPage = "/inventory";
      app.render(req, res, actualPage);
    });

    server.get("/quests", (req, res) => {
      const actualPage = "/quests";
      app.render(req, res, actualPage);
    });

    // <------ Authentication Pages ------->

    server.get("/signin", (req, res) => {
      const actualPage = "/signin";
      app.render(req, res, actualPage);
    });

    server.get("/signup", (req, res) => {
      const actualPage = "/signup";
      app.render(req, res, actualPage);
    });

    server.get("/login", (req, res) => {
      const actualPage = "/login";
      app.render(req, res, actualPage);
    });

    server.get("/register", (req, res) => {
      const actualPage = "/register";
      app.render(req, res, actualPage);
    });

    // <------ Static Pages ------->

    server.get("/", (req, res) => {
      const actualPage = "/index";
      app.render(req, res, actualPage);
    });

    server.get("/about", (req, res) => {
      const actualPage = "/static/about";
      app.render(req, res, actualPage);
    });

    server.get("/faq", (req, res) => {
      const actualPage = "/static/faq";
      app.render(req, res, actualPage);
    });

    server.get("/support", (req, res) => {
      const actualPage = "/static/support";
      app.render(req, res, actualPage);
    });

    // <------ Legal Pages ------->

    server.get("/terms", (req, res) => {
      const actualPage = "/static/terms";
      app.render(req, res, actualPage);
    });

    server.get("/privacy", (req, res) => {
      const actualPage = "/static/privacy";
      app.render(req, res, actualPage);
    });

    // <------ App Routes ------->

    server.get("/upgrades", (req, res) => {
      const actualPage = "/upgrades";
      app.render(req, res, actualPage);
    });

    server.get("/dashboard", (req, res) => {
      const actualPage = "/dashboard";
      app.render(req, res, actualPage);
    });

    server.get("/rewards", (req, res) => {
      const actualPage = "/rewards";
      app.render(req, res, actualPage);
    });

    server.get("/profile", (req, res) => {
      const actualPage = "/profile";
      app.render(req, res, actualPage);
    });

    server.get("/account-settings", (req, res) => {
      const actualPage = "/account-settings";
      app.render(req, res, actualPage);
    });

    server.get("/payments", (req, res) => {
      const actualPage = "/payments";
      app.render(req, res, actualPage);
    });

    server.get("/cart", (req, res) => {
      const actualPage = "/cart";
      app.render(req, res, actualPage);
    });

    server.get("/checkout", (req, res) => {
      const actualPage = "/checkout";
      app.render(req, res, actualPage);
    });

    server.get("/expansions", (req, res) => {
      const actualPage = "/expansions";
      app.render(req, res, actualPage);
    });

    server.get("/expansion/:id", (req, res) => {
      const actualPage = "/expansion";
      const queryParams = { id: req.params.id };
      console.dir("req.params.id = " + JSON.stringify(req.params.id));
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/realms", (req, res) => {
      const actualPage = "/realms";
      app.render(req, res, actualPage);
    });

    // <------ Dynamic Routes ------->

    server.get("/realm/:id", (req, res) => {
      const actualPage = "/realm";
      const queryParams = { id: req.params.id };
      console.dir("req.params.id = " + JSON.stringify(req.params.id));
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/card/:id", (req, res) => {
      const actualPage = "/card";
      const queryParams = { id: req.params.id };
      console.dir("req.params.id = " + JSON.stringify(req.params.id));
      app.render(req, res, actualPage, queryParams);
    });

    // <------ Defaults ------->

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
