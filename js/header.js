const musicInputEl = document.querySelector('.music-search')
musicInputEl.onfocus = function (even) {
  this.removeAttribute('placeholder')
}
musicInputEl.onblur = function (event) {
  this.placeholder = '音乐/视频/电台/用户'
}