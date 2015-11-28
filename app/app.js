import Viewport from 'class/viewport';
import Renderer from 'class/renderer';
import Path from 'class/path';
import Sheep from 'class/sheep';
import Wolf from 'class/wolf';
import BaseObject from 'class/base-object';
import LoginPrompt from 'class/login-prompt';
import Player from 'class/player';
// import PlayerManager from 'class/player-manager';
import Grid from 'class/grid';

var gw = 600;
var gh = 600;
window.app = {};

var database = require('database');

database.onAuth(function (auth) {
  if (!auth) {
    app.auth = app.auth || new LoginPrompt();
    app.auth.render();
    return;
  }
  app.localPlayer = new Player(auth);
  window.console.log(auth.uid);
  for (var i = 0; i < 200; i++) {
    setTimeout(function () {
      app.sheep = new Sheep();
      app.sheep.spawn(200, 5);

      app.wolf = new Wolf();
      app.wolf.spawn(100, 5);
    }, i * 200);
  }
}, function () {
  window.console.log('NAAAAA');
});

app.viewport = new Viewport(gw, gh);
app.viewport.attach(document.body);

// use this viewport for all BaseObject updates
BaseObject.viewport = app.viewport;

app.renderer = new Renderer(app.viewport);
app.renderer.start();

app.grid = new Grid(gw / 20, gh / 20);

app.path = new Path();
app.path.add(200, 30);
app.path.add(200, 150);
app.path.add(100, 150);
app.path.add(100, 450);
app.path.add(400, 450);
app.path.add(400, 600);
