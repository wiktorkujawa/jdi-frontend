var Module = {
  preRun: [],
  postRun: [],
  print: (function() {
      return function(text) {
          text = Array.prototype.slice.call(arguments).join(' ');
          console.log(text);
      };
  })(),
  printErr: function(text) {
      text = Array.prototype.slice.call(arguments).join(' ');
      console.error(text);
  },
  canvas: (function() {
      var canvas = document.getElementById('canvas');
      //canvas.addEventListener("webglcontextlost", function(e) { alert('FIXME: WebGL context lost, please reload the page'); e.preventDefault(); }, false);
      return canvas;
  })(),
  setStatus: function(text) {
      console.log("status: " + text);
  },
  monitorRunDependencies: function(left) {
      // no run dependencies to log
  }
};

window.onerror = function() {
  window.location.reload();
  console.log(event);
};