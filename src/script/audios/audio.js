
let list = [
	
]
// 美图拍拍经典音乐 count 25
for(let i = 1;i <=25;i++){
	list.push({
		name: `美图拍拍经典音乐${i}`,
		url: `mp${i}.a`,
		type: 'audio/mp3',
		icon: 4,
		id: `mp${i}`,
		data: '',
		status: null
	})
}
// 轻柔-温馨钢琴曲
for(let i = 1;i <= 9;i++){
	list.push({
		name: `轻柔-温馨钢琴曲${i}`,
		url: `p${i}.a`,
		type: 'audio/mp3',
		icon: 1,
		id: `p${i}`,
		data: '',
		status: null
	})
}
// 经典名曲-真人唱
for(let i = 1;i <= 8;i++){
	list.push({
		name: `经典名曲-真人唱${i}`,
		url: `t${i}.a`,
		type: 'audio/mp3',
		icon: 3,
		id: `t${i}`,
		data: '',
		status: null,
	})
}
// 爵士动感-摇滚乐-朋克
for(let i = 1;i <= 32;i++){
	list.push({
		name: `爵士动感-摇滚乐-朋克${i}`,
		url: `rock${i}.a`,
		type: 'audio/mp3',
		icon: 5,
		id: `rock${i}`,
		data: '',
		status: null
	})
}


export default list;