let actSlide = 1
let slides = document.querySelectorAll('.slides > div')
let slideNbr = slides.length
let autoSwipe

const sliderBefore = document.querySelector('.slider_before')
const sliderAfter = document.querySelector('.slider_after')

sliderAfter.href = '#slide-' + (actSlide + 1)
sliderBefore.href = '#slide-' + (slideNbr)

let restartAutoSwipe = function () {
   /*  if (autoSwipe)
        clearInterval(autoSwipe)
    autoSwipe = setInterval(function () {
        sliderAfter.click()
    }, 5000) */
}
restartAutoSwipe()

sliderAfter.addEventListener('click', function () {
    let after
    let before
    setTimeout(function () {
        if (actSlide < slideNbr) {
            actSlide++
            if (actSlide === slideNbr) {
                after = 1
            }
            else {
                after = actSlide + 1
            }
            if (actSlide === 1) {
                before = slideNbr
            }
            else {
                before = actSlide - 1
            }
        }
        else {
            actSlide = 1
            after = actSlide + 1
            before = slideNbr
        }
        sliderAfter.href = '#slide-' + after
        sliderBefore.href = '#slide-' + before
    }, 100)
    restartAutoSwipe()
})

sliderBefore.addEventListener('click', function () {
    let after
    let before
    setTimeout(function () {
        if (actSlide > 1) {
            actSlide--
            if (actSlide === slideNbr) {
                after = 1
            }
            else {
                after = actSlide + 1
            }
            if (actSlide === 1) {
                before = slideNbr
            }
            else {
                before = actSlide - 1
            }
        }
        else {
            actSlide = slideNbr
            after = 1
            before = actSlide - 1
        }
        sliderAfter.href = '#slide-' + after
        sliderBefore.href = '#slide-' + before
    }, 100)
    restartAutoSwipe()
})
