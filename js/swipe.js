const swipeEl = document.querySelector('.swipe')
// 添加自定义属性 data-index
const dotEls = document.querySelectorAll('.dot')
// console.log(typeof dotEls, dotEls)
// for (let i = 0; i < dotEls.length; i++) {
//   dotEls[i].setAttribute('data-index',i)
// }
dotEls.forEach((item, index) => item.setAttribute('data-index', index))

const ulImgListEl = document.querySelector('.img-list')
const dotsEl = document.querySelector('.dots')
let activeEl = dotsEl.querySelector('.active')
// 监听中间小圆圈鼠标点击事件
for (let i = 0; i < dotEls.length; i++) {
  dotEls[i].onclick = function (e) {
    activeEl && activeEl.classList.remove('active')
    e.target.classList.add('active')
    activeEl = e.target

    let index = e.target.dataset.index
    swipeEl.style.backgroundImage = `url(./images/swiper-bgc-${index}.jpg)`
    ulImgListEl.style.transform = `translateX(${-730 * index}px)`
  }
}

// 监听中间小圆圈(两种方案)-鼠标进入
// for (let i = 0; i < dotEls.length; i++) {
//   dotEls[i].onmouseenter = function (e) {
//     let index = e.target.dataset.index
//     activeEl && activeEl.classList.remove('active')
//     e.target.classList.add('active')
//     activeEl = e.target
//   }
// }
dotsEl.onmouseover = function (e) {
  if (e.target.tagName !== 'DIV') {
    let index = e.target.dataset.index
    activeEl && activeEl.classList.remove('active')
    e.target.classList.add('active')
    activeEl = e.target
    swipeEl.style.backgroundImage = `url(./images/swiper-bgc-${index}.jpg)`
    ulImgListEl.style.transform = `translateX(${-730 * index}px)`
  }
}

// ----------监听左侧箭头----------
const controlLeftEl = document.querySelector('.control-left')
controlLeftEl.onclick = function (e) {
  let index = Array.from(dotEls).findIndex(item => item.classList.contains('active'))
  // console.log(index)
  index--
  // console.log(index)
  if (index !== -1) {
    activeEl && activeEl.classList.remove('active')
    dotEls[index].classList.add('active')
    activeEl = dotEls[index]
    swipeEl.style.backgroundImage = `url(./images/swiper-bgc-${index}.jpg)`
    ulImgListEl.style.transform = `translateX(${-730 * index}px)`
  } else {
    index = Array.from(dotEls).length - 1
    // console.log(index)
    activeEl && activeEl.classList.remove('active')
    dotEls[index].classList.add('active')
    activeEl = dotEls[index]
    swipeEl.style.backgroundImage = `url(./images/swiper-bgc-${index}.jpg)`
    ulImgListEl.style.transform = `translateX(${-730 * index}px)`
  }
}
// ----------监听右侧箭头----------
const controlRightEl = document.querySelector('.control-right')
controlRightEl.onclick = function (e) {
  let index = Array.from(dotEls).findIndex(item => item.classList.contains('active'))
  // console.log(index)
  index++
  // console.log(index)
  // console.log(Array.from(dotEls).length)
  if (index !== Array.from(dotEls).length) {
    activeEl && activeEl.classList.remove('active')
    dotEls[index].classList.add('active')
    activeEl = dotEls[index]
    swipeEl.style.backgroundImage = `url(./images/swiper-bgc-${index}.jpg)`
    ulImgListEl.style.transform = `translateX(${-730 * index}px)`
  } else {
    index = 0
    activeEl && activeEl.classList.remove('active')
    dotEls[index].classList.add('active')
    activeEl = dotEls[index]
    swipeEl.style.backgroundImage = `url(./images/swiper-bgc-${index}.jpg)`
    ulImgListEl.style.transform = `translateX(${-730 * index}px)`
  }
}
// 定时器部分
let timerId = null
let timerId2 = null
startTimer()
// const swipeEl = document.querySelector('.swipe')

swipeEl.onmouseover = function (e) {
  clearInterval(timerId)
}
swipeEl.onmouseout = function (e) {
  startTimer()
}
// 封装启动定时器函数
function startTimer() {
  clearInterval(timerId)
  timerId = setInterval(() => {
    let index = Array.from(dotEls).findIndex(item => item.classList.contains('active'))
    index++
    if (index !== Array.from(dotEls).length) {
      ulImgListEl.style.transition = 'none 0s ease 0s'
      ulImgListEl.style.opacity = '1'
      activeEl && activeEl.classList.remove('active')
      dotEls[index].classList.add('active')
      activeEl = dotEls[index]
      swipeEl.style.backgroundImage = `url(./images/swiper-bgc-${index}.jpg)`
      ulImgListEl.style.transform = `translateX(${-730 * index}px)`
      clearTimeout(timerId2)
      timerId2 = setTimeout(() => {
        ulImgListEl.style.transition = 'opacity 1s ease-out 0s'
        ulImgListEl.style.opacity = '0.2'
      }, 1000)
    } else {
      index = 0
      ulImgListEl.style.transition = 'none 0s ease 0s'
      ulImgListEl.style.opacity = '1'
      activeEl && activeEl.classList.remove('active')
      dotEls[index].classList.add('active')
      activeEl = dotEls[index]
      swipeEl.style.backgroundImage = `url(./images/swiper-bgc-${index}.jpg)`
      ulImgListEl.style.transform = `translateX(${-730 * index}px)`
      clearTimeout(timerId2)
      timerId2 = setTimeout(() => {
        ulImgListEl.style.transition = 'opacity 1s ease-out 0s'
        ulImgListEl.style.opacity = '0.2'
      }, 1000)
    }
  }, 3000)
}
ulImgListEl.addEventListener('transitionend', function () {
  ulImgListEl.style.transition = 'opacity 1s ease-in 0s'
  ulImgListEl.style.opacity = '1'
})
