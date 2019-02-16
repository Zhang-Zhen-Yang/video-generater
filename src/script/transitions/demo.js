import util from '../util.js';
const fun = function({stage, timeline, item, index, wait, project }) {
    let { durationScale, durationDefault, durationFirst } = project;
	let duration = index == 0 ? (durationFirst * durationScale) : (durationDefault * durationScale);
}
export default fun;