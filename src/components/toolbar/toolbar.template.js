function toButton(button) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `
  return `
    <div 
      class="button ${button.active ? 'active' : ''}"
      ${meta}
    >
      <i 
        class="material-icons"
        ${meta}
      >${button.icon}</i>
    </div>
  `
}

export function createToolbar(state) {  
  function isActive(key, comparator) {
    return state[key] === comparator;
  }

  const buttons = [
    {
      icon: 'format_align_left',
      active: isActive('textAlign', 'left'),
      value: {textAlign: 'left'}
    },
    {
      icon: 'format_align_center',
      active: isActive('textAlign', 'center'),
      value: {textAlign: 'center'}
    },
    {
      icon: 'format_align_right',
      active: isActive('textAlign', 'right'),
      value: {textAlign: 'right'}
    },
    {
      icon: 'format_bold',
      active: isActive('fontWeight', 'bold'),
      value: {fontWeight: isActive('fontWeight', 'bold') ? 'normal' : 'bold'}
    },
    {
      icon: 'format_italic',
      active: isActive('fontStyle', 'italic'),
      value: {fontStyle: isActive('fontStyle', 'italic') ? 'normal' : 'italic'}
    },
    {
      icon: 'format_underlined',
      active: isActive('textDecoration', 'underline'),
      value: {textDecoration: isActive('textDecoration', 'underline') ? 'none' : 'underline'}
    }
  ];

  return buttons.map(toButton).join('')
}

