import { $ } from "@core/dom";
import { RESIZE_TYPES } from "./Table";

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const resizeType = $resizer.data.resize;
  const sideProp = resizeType === RESIZE_TYPES.column
      ? 'bottom'
      : 'right';
  let value = null;

  $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px'
  });
  
  document.onmousemove = e => {
    if (resizeType === RESIZE_TYPES.column) {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({ right: -delta + 'px' });
    } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({ bottom: -delta + 'px' });
    }
  }  

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (resizeType === RESIZE_TYPES.column) {
        $root
          .findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => {
            return $(el).css({ width: value + 'px' })
          });
    } else {
        $parent.css({ height: value + 'px' });
    }

    $resizer.css({
        opacity: 0,
        right: 0,
        bottom: 0
    });
  }
}