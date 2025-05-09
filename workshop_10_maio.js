/* global gsap */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(SplitText, Flip, GSDevTools)

  const h1InitialState = Flip.getState('h1')
  const h1 = document.querySelector('h1')
  const p = document.querySelector('p')

  const headingSplit = SplitText.create(h1, {
    type: 'words, chars',
    mask: 'words'
  });

  const paragraphSplit = SplitText.create(p, {
    type: 'words, lines',
    mask: 'lines'
  });

  const tl = gsap.timeline();

  tl.set('h1', { scale: 1.5, yPercent: 50, xPercent: 50 })
    .from(headingSplit.chars, {
      delay: 1,
      yPercent: 100,
      duration: .8,
      stagger: .02,
      ease: 'back.out(1.5)',
      onComplete: () => {
        headingSplit.revert()
        Flip.to(h1InitialState, {
          duration: 1,
          scale: 1,
          ease: 'power1.inOut',
          onComplete: () => {

          }
        })
      }
    })
    .to('.page_wrap-overlay', { autoAlpha: 0 })
    .from(paragraphSplit.words, {
      yPercent: 100,
      opacity: 0,
      duration: 0.5,
      stagger: 0.02,
      ease: 'back.out(1)'
    })
    .from('.button-group', {
      xPercent: -100,
      duration: 0.5,
      ease: 'bounce.out'
    })
    .from('.header1_image-wrapper', {
      xPercent: 100,
      duration: 0.5,
      ease: 'bounce.out'
    }, '<')

  GSDevTools.create({
    animation: tl,
    css: {
      zIndex: 999
    }
  })
});