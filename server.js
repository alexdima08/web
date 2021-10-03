// Load Node modules
const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const { Client } = require("pg");
// Initialise Express
var app = express();
// Render static files
app.use(express.static('public'));
app.use("/public",express.static('public'));
// Set the view engine to ejs
app.set('view engine', 'ejs');
// Port website will run on
const client = new Client({
    host: "localhost",
    user: "alex",
    password: "alex",
    database: "ProduseTW",
    port: 5432
});
client.connect();
app.get("/produse", function(req, res) {

    client.query("select id, nume, pret, tip_produs, imagine from Medicamente", function (err, rez) {

        res.render("pages/produse", {produse:rez.rows});
        });


    });
function verificaImagini()
{
	var textFisier=fs.readFileSync("public/json/galerie.json")
	var jsi=JSON.parse(textFisier);

	var caleGalerie=jsi.cale_galerie;
  let vectImagini=[]
	for (let im of jsi.imagini)
  {
		var imVeche = path.join(caleGalerie,im.cale_imagine);
		var ext = path.extname(im.cale_imagine);
		var numeFisier = path.basename(im.cale_imagine,ext);
		var today = new Date();
		var timp = today.getHours();
		var timp_i = parseInt(im.timp_inceput);
		var timp_f = parseInt(im.timp_sfarsit);
    vectImagini.push({mare: imVeche, titlu:im.titlu,timp_inceput:timp_i,timp_sfarsit:timp_f,timp_curent:timp});
	}
		console.log(vectImagini);
		return vectImagini;
}
// *** GET Routes - display pages ***
// Root Route
app.get(['/','/index'], function (req, res)
{
	var vector = verificaImagini();
	var iterator = 0;
	res.render('pages/index',{imagini:vector,ip:req.ip,iterator:iterator});
});
app.get('/descriere', function (req, res)
{
	var vector2 = verificaImagini();
	res.render('pages/descriere',{imagini:vector2});
});
app.get('*/galerie.json',function(req,res)
{
		res.status(403).render(__dirname+"/views/pages/403");
}
);
app.get('/*',function(req,res)
{
  res.render("pages"+req.url,function(err,rezultatRender)
  {
    if(err)
    {
      if(err.message.includes("Failed to lookup view"))
      {
        res.status(404).render(__dirname+"/views/pages/404");
      }
      else
        throw err;
    }
    else
      res.render(rezultatRender);
  });
});


verificaImagini();

app.listen(8080);
// app.get("/*", (req, res) => {
//     res.status(404).render(__dirname+"/views/pages/404.ejs")
// });
