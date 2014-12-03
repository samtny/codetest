(function() {
  "use strict";

  var LightBox = function(imgs) {
    var self = this;

    self.imgs = imgs;
    self.transitionDuration = 250;

    self.show = function(e) {
      document.getElementsByTagName('html')[0].classList.add('noscroll');
      document.getElementsByTagName('body')[0].classList.add('noscroll');
      self.addHtml(this);

      setTimeout(function() {
        document.getElementById('lbox').classList.add('active');
      }, 100);

      document.addEventListener('keydown', self.keyDown);
      document.getElementById('lbox').addEventListener('click', self.click);
    };

    self.hide = function() {
      document.getElementsByTagName('html')[0].classList.remove('noscroll');
      document.getElementsByTagName('body')[0].classList.remove('noscroll');
      document.getElementById('lbox').classList.remove('active');

      document.getElementById('lbox').addEventListener('click', self.click);
      document.removeEventListener('keydown', self.keyDown);

      setTimeout(self.removeHtml, self.transitionDuration);
    };

    self.addHtml = function(target) {
      var src = target.getAttribute('src'),
        alt = target.getAttribute('alt'),
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      var el = document.createElement('div');
      el.setAttribute('id', 'lbox');
      el.setAttribute('style', 'top: ' + scrollTop + ';');

      var popup = document.createElement('div');
      popup.classList.add('lbox-popup');
      el.appendChild(popup);

      var content = document.createElement('div');
      content.classList.add('lbox-content');
      popup.appendChild(content);

      var close = document.createElement('img');
      close.setAttribute('src', 'assets/images/close.png');
      close.classList.add('close');
      content.appendChild(close);

      var img = document.createElement('img');
      img.setAttribute('src', src);
      img.setAttribute('alt', alt);
      img.classList.add('lbox-img');
      content.appendChild(img);

      var h2 = document.createElement('h2');
      h2.classList.add('lbox-title');
      content.appendChild(h2);

      var title = document.createTextNode(alt);
      h2.appendChild(title);

      document.body.appendChild(el);
    };

    self.removeHtml = function() {
      var lbox = document.getElementById('lbox');

      lbox.parentElement.removeChild(lbox);
    };

    self.initCss = function() {
      var style = document.createElement("style"),
        innerWidth = window.innerWidth,
        margin = 20,
        padding = 16,
        width = 100 * (innerWidth - (2 * margin)) / innerWidth,
        maxWidth = 760;

      style.appendChild(document.createTextNode(""));
      document.head.appendChild(style);

      style.sheet.insertRule(".noscroll {		overflow: hidden;		height: 100%;		}", 0);
      style.sheet.insertRule("#lbox {		position: absolute;		top: 0;		left: 0;		width: 100%;		height: 100%;		background-color: rgba(0, 0, 0, 0.5);		color: #000;		opacity: 0;		-webkit-transition: opacity " + self.transitionDuration + "ms ease-in-out;		-moz-transition: opacity " + self.transitionDuration + "ms ease-in-out;		-ms-transition: opacity " + self.transitionDuration + "ms ease-in-out;		-o-transition: opacity " + self.transitionDuration + "ms ease-in-out;		transition: opacity " + self.transitionDuration + "ms ease-in-out;		}", 1);
      style.sheet.insertRule(".active {		opacity: 1.0 !important;		}", 2);
      style.sheet.insertRule(".lbox-popup {		width: " + width + "%;		max-width: " + maxWidth + "px;		background-color: #fff;		margin-left: auto;		margin-right: auto;		padding: " + padding + "px;		top: 50%;		position: relative;		transform: translateY(-50%);		border-radius: 20px;		}", 3);
      style.sheet.insertRule(".lbox-popup img.close {		position: fixed;		top: -10px;		right: -10px;		cursor: pointer;		}", 4);
      style.sheet.insertRule(".lbox-popup h2 {		margin-bottom: 0;		font-weight: 300;		}", 5);
    };

    self.click = function (e) {
      var target = e.target;

      if (target.id == 'lbox' || target.className == 'close') {
        self.hide();
      }
    };

    self.keyDown = function (e) {
      e = e || window.event;

      if (e.keyCode == 27) {
        self.hide();
      }
    };

    self.init = function() {
      for (var i = 0; i < self.imgs.length; i += 1) {
        self.imgs[i].onclick = self.show;
      }

      self.initCss();
    };

    self.init();
  };

  window.LightBox = LightBox;
}());

window.lbox = new LightBox(document.getElementsByClassName('main')[0].getElementsByTagName('img'));
