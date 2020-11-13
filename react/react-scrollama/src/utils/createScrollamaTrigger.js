import scrollama from 'scrollama'

const createScrollamaTrigger = params => {
  const {offset, progress, enter, exit, id} = params
  const trigger = scrollama()
  trigger
    .setup({
      step: `.${id}-step`,
      offset: offset,
      progress: !!progress,
      threshold: 4,
      debug: false
    })
    if (!!enter) {
      trigger.onStepEnter(enter)
    }
    if (!!progress) {
      trigger.onStepProgress(progress)
    }
    if (!!exit) {
      trigger.onStepExit(exit)
    }
  window.addEventListener('resize', trigger.resize)
}

export default createScrollamaTrigger
