/*
 * @Author: zhangzhenyang 
 * @Date: 2019-01-17 11:52:12 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-01-dd 10:42:43
 */

import pageBottom from './pageBottom/index.vue';
import center from './center/center.vue';
import fileInput from './fileInput/fileInput.vue';
import maskReplace from './maskReplace/maskReplace.vue';
import contentNotice from './contentNotice/contentNotice.vue';
import materialSpinner from './materialSpinner/materialSpinner.vue';
import modalDialog from './modalDialog/modalDialog.vue';
import dialogTab from './dialogTab/dialogTab.vue';
import dropdown from './dropdown/dropdown.vue';
import pagination from './pagination/pagination.vue';
import paginationSimple from './paginationSimple/paginationSimple.vue';
import imgSpaceItem from './imgSpaceItem/imgSpaceItem.vue';
import slideBar from './slideBar/slideBar.vue';
import colorPicker from './colorPicker/colorPicker.vue';
import aspect from './aspect/aspect.vue';
import snackbar from './snackbar/snackbar.vue';
import progressBar from './progressBar/progressBar.vue';
import toggle from './toggle/toggle.vue';
import blockSlice from './blockSlice/blockSlice.vue';

const options = {
	pageBottom,
	'v-center': center,
	fileInput,
	maskReplace,
	contentNotice,
	materialSpinner,
	modalDialog,
	dialogTab,
	dropdown,
	pagination,
	paginationSimple,
	imgSpaceItem,
	slideBar,
	colorPicker,
	aspect,
	snackbar,
	progressBar,
	toggle,
	blockSlice,
};
options.install = (Vue) => {
    for (let component in options) {
        const componentInstaller = options[component];
        if (componentInstaller && component !== 'install') {
			// alert('ddd');
            Vue.component(component, componentInstaller);
        }
    }
};
/* if(window.Vue){
	for (let component in options) {
		const componentInstaller = options[component];
		if (componentInstaller && component !== 'install') {
			window.Vue.use(componentInstaller);
		}
	}
}*/
export default options;
