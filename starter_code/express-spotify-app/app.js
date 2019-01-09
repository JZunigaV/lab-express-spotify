const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const path = require('path');
const app = express();

// Remember to paste your credentials here
// let clientId = process.env.CLIENTID;
// let clientSecret = process.env.CLIENTSECRET;

let clientId = '04f3b20f3d064bfea97e62570d43938b';
let clientSecret = 'c24c2e09731543ed886bcfb385dcffa6';

 let spotifyApi = new SpotifyWebApi({
   clientId : clientId,
   clientSecret : clientSecret
 });

 // Retrieve an access token.
 spotifyApi.clientCredentialsGrant()
   .then(function(data) {
     spotifyApi.setAccessToken(data.body['access_token']);
   }, function(err) {
     console.log('Something went wrong when retrieving an access token', err);
 });

// Specify everything
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

// View for home route
app.get('/', (req, res) => {
  res.render('index');
});

// Artists route
app.post('/artists', (req, res) => {
  //Find the artist on the webpage
  let artist = req.body.artist;
  //Call Spotify API
  spotifyApi.searchArtists(artist)
    .then(data => {
      res.render('artists', data.body);
      //console.log(data);
    })
    .catch(err => {
      console.log("Error ", err);
    })
});

// Albums route

// Tracks

app.listen(3000, () => console.log("Listo"));