/*
 * @Author: zhangzhenyang 
 * @Date: 2018-10-31 15:32:36 
 * @Last Modified by:   zhangzhenyang 
 * @Last Modified time: 2018-10-31 15:32:36 
 */
export default {
	bind (el, binding, vnode) {
	  el['@clickoutside'] = e => {
			if (
				!el.contains(e.target) &&
				!(vnode.context.popupElm && vnode.context.popupElm.contains(e.target)) &&
				binding.expression &&
				vnode.context[binding.expression]
			) {
				binding.value()
			}
	  }
	  document.addEventListener('click', el['@clickoutside'], true)
	},
	unbind (el) {
		document.removeEventListener('click', el['@clickoutside'], true)
	}
}

