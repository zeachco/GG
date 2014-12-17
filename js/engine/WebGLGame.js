/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(['threejs'], function(THREE){
  'use strict';
  return function WebGLGame(container) {
    var self = this;
    self._container = container;
    self._childs = [];
    self._isActive = false;
    self._useTimeDelta = true;
    self.init = function() {
      self._container = self._container || window.document.body;

        self.scene = new THREE.Scene();
        self.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        self.camera.position.y = 150;
        self.camera.position.z = 500;
        self.scene.add(self.camera);

        self.renderer = new THREE.WebGLRenderer();
        self.renderer.setClearColor(0x464646);
        self.renderer.setSize(window.innerWidth, window.innerHeight);

        self._container.appendChild(self.renderer.domElement);

        window.addEventListener('resize', self.windowResize, false);
        window.addEventListener('blur', self.blur, false);
        window.addEventListener('click', self.focus, false);
        self.focus();
      };
      self.windowResize = function() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        console.log('viewport : ' + w + ' x ' + h);
        self.camera.aspect = w / h;
        self.camera.updateProjectionMatrix();
        self.renderer.setSize(w, h);
      };
      self.addObject = function(obj) {
        this._childs.push(obj);
      };
      self.blur = function() {
        console.log('focus losed, application is paused');
        self._isActive = false;
      };
      self.focus = function() {
        if (!self._isActive) {
          console.log('application is running');
          self._lastTick = Date.now();
          self._isActive = true;
          self.run();
        }
      };
      self.run = function() {
        var msDelta = self.getTimeDelta();
        //console.log('loopDelta : '+msDelta);
        for (var i = 0; i < self._childs.length; i++) {
          try {
            self._childs[i].update(msDelta);
          } catch (e) {
            console.warn(e);
          }
        }
        self.renderer.render(self.scene, self.camera);
        if (self._isActive){
          window.requestAnimationFrame(self.run);
        }
      };
        self.getTimeDelta = function() {
          if (!self._useTimeDelta){
            return 17;
          }
          var now = Date.now();
          var dt = now - self._lastTick;
          self._lastTick = now;
          //        console.log(dt);
          return dt;
        };
        self.init();
      };
});
