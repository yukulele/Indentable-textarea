function indentable(textarea, len = 2){
  tab = Array(len + 1).join(' ')
  textarea.addEventListener('keydown', (e) => {
    if(e.keyCode === 9 /*tab*/){
      const pos = textarea.selectionStart
      const val = textarea.value
      e.preventDefault()
      if(e.shiftKey){
        const firstNL = (val.lastIndexOf('\n', pos - 1) + 1)
        const start = val.slice(0, firstNL)
        let rmvLen
        const end = val.slice(firstNL).replace(new RegExp(`^ {0,${len}}`), a => (rmvLen = a.length, ''))
        textarea.value = start + end
        textarea.selectionEnd = textarea.selectionStart = pos - rmvLen
      }else{
        textarea.value = val.slice(0, pos) + tab + val.slice(pos)
        textarea.selectionEnd = textarea.selectionStart = pos + len
      }
    }
  })
  textarea.addEventListener('keypress', (e) => {
    if(e.keyCode === 13 /*enter*/){
      const pos = textarea.selectionStart
      const val = textarea.value
      const firstNL = (val.lastIndexOf('\n', pos) + 1)
      const tab = /^ */.exec(val.slice(firstNL))[0]
      setTimeout(() => {
        const pos = textarea.selectionStart
        const val = textarea.value
        textarea.value = val.slice(0, pos) + tab + val.slice(pos)
        textarea.selectionEnd = textarea.selectionStart = pos + tab.length
      })
    }
  })
}
