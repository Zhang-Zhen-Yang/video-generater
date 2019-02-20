import defaultEffect from './default';
import badgeEffect from './badge';
import bottomBar from './bottomBar';
let effectWords = {
	defaultEffect: {
		fun: defaultEffect,
		name: '条形价格'
	},
	badgeEffect: {
		fun: badgeEffect,
		name: '图标'
	},
	bottomBar: {
		fun: bottomBar,
		name: '底部横条' 
	},
}
export default effectWords;