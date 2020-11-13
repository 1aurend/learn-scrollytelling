import scrollama from 'scrollama'

const createScrollamaTrigger = params => {
  const {offset, progress, enter, exit, id} = params
  const trigger = scrollama()
  trigger
    .setup({
      step: `.${id}-step`,
      offset: offset,
      progress: true,
      threshold: 4,
      debug: false
    })
    .onStepEnter(enter)
    .onStepExit(exit)
    .onStepProgress(progress)
  window.addEventListener('resize', trigger.resize)
}

export default createScrollamaTrigger
