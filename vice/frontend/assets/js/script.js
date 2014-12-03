// first a small helper from here; http://davidwalsh.name/css-animation-callback;
function whichTransitionEvent(){
  var t;
  var el = document.createElement('fakeelement');
  var transitions = {
    'transition':'transitionend',
    'OTransition':'oTransitionEnd',
    'MozTransition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd'
  }

  for(t in transitions){
    if( el.style[t] !== undefined ){
      return transitions[t];
    }
  }
}

// begin lightbox code
(function() {
  "use strict";

  var LightBox = function() {
    var self = this;

    self.fadeIn = '.25s';

    self.show = function(e) {
      self.initHtml(this);

      document.getElementsByTagName('html')[0].classList.add('noscroll');
      document.getElementsByTagName('body')[0].classList.add('noscroll');

      setTimeout(function() {
        document.getElementById('lbox').classList.add('active');
      }, 0);
    };

    self.hide = function() {
      document.getElementsByTagName('html')[0].classList.remove('noscroll');
      document.getElementsByTagName('body')[0].classList.remove('noscroll');
      document.getElementById('lbox').classList.remove('active');
    };

    self.initHtml = function(target) {
      var src = target.getAttribute('src'),
        alt = target.getAttribute('alt');

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
      close.onclick = self.hide;
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

      self.initListener();
    };

    self.transitionEvent = function(e) {
      var target = e.target,
        opacity = getComputedStyle(target, null).getPropertyValue('opacity');

      opacity === '0' && document.getElementById('lbox').parentElement.removeChild(target);
    };

    self.initListener = function() {
      var transitionEvent = whichTransitionEvent();

      transitionEvent && document.getElementById('lbox').addEventListener(transitionEvent, self.transitionEvent);
    };

    self.initCss = function() {
      var style = document.createElement("style");
      style.appendChild(document.createTextNode(""));
      document.head.appendChild(style);

      style.sheet.insertRule(".noscroll {		overflow: hidden;		height: 100%;		}", 0);
      style.sheet.insertRule("#lbox {		position: absolute;		top: 0;		left: 0;		width: 100%;		height: 100%;		background-color: rgba(0, 0, 0, 0.5);		color: #000;		opacity: 0;		-webkit-transition: opacity " + self.fadeIn + " ease-in-out;		-moz-transition: opacity " + self.fadeIn + " ease-in-out;		-ms-transition: opacity " + self.fadeIn + " ease-in-out;		-o-transition: opacity " + self.fadeIn + " ease-in-out;		transition: opacity " + self.fadeIn + " ease-in-out;		}", 1);
      style.sheet.insertRule(".active {		opacity: 1.0 !important;		}", 2);
      style.sheet.insertRule(".lbox-popup {		width: 48%;		background-color: #fff;		margin-left: auto;		margin-right: auto;		padding: 16px;		top: 50%;		position: relative;		transform: translateY(-50%);		border-radius: 20px;		}", 3);
      style.sheet.insertRule(".lbox-popup img.close {		position: fixed;		top: -10px;		right: -10px;		cursor: pointer;		}", 4);
      style.sheet.insertRule(".lbox-popup h2 {		margin-bottom: 0;		font-weight: 300;		}", 5);
    };

    self.init = function() {
      var imgs = document.body.getElementsByTagName('img');

      for (var i = 0; i < imgs.length; i += 1) {
        imgs[i].onclick = self.show;
      }

      self.initCss();
    };

    self.init();
  };

  window.lbox = new LightBox();
}());
