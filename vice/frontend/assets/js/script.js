(function () {
  "use strict";

  var LightBox = function () {
    var self = this;

    self.initCss = function () {
      var style = document.createElement("style");
      style.appendChild(document.createTextNode(""));
      document.head.appendChild(style);

      style.sheet.insertRule("html, body {		overflow: hidden;		height: 100%;		}", 0);
      style.sheet.insertRule("#lbox {		position: absolute;		top: 0;		left: 0;		width: 100%;		height: 100%;		background-color: rgba(0, 0, 0, 0.5);		color: #000;		opacity: 0;		-webkit-transition: opacity .25s ease-in-out;		-moz-transition: opacity .25s ease-in-out;		-ms-transition: opacity .25s ease-in-out;		-o-transition: opacity .25s ease-in-out;		transition: opacity .25s ease-in-out;		}", 1);
      style.sheet.insertRule(".active {		opacity: 1.0 !important;		}", 2);
      style.sheet.insertRule(".lbox-popup {		width: 48%;		background-color: #fff;		margin-left: auto;		margin-right: auto;		padding: 16px;		top: 50%;		position: relative;		transform: translateY(-50%);		border-radius: 20px;		}", 3);
      style.sheet.insertRule(".lbox-popup img.close {		position: fixed;		top: -10px;		right: -10px;		}", 4);
      style.sheet.insertRule(".lbox-popup h2 {		margin-bottom: 0;		font-weight: 300;		}", 5);
    }

    self.initHtml = function () {
      var el = document.createElement('div');
      el.setAttribute('id', 'lbox');

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
      img.setAttribute('src', 'assets/images/image1.jpg');
      img.setAttribute('alt', 'Image One');
      content.appendChild(img);

      var h2 = document.createElement('h2');
      var title = document.createTextNode('Image One');

      h2.appendChild(title);
      content.appendChild(h2);

      document.body.appendChild(el);
    }

    self.init = function () {
      self.initCss();
      self.initHtml();
    }

    self.init();

    var el = document.getElementById('lbox');

    setTimeout(function () {
      el.classList.add('active');
    }, 5000);
  }

  window.lbox = new LightBox();
}());
