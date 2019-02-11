# video-generater
# 主图视频生成器

## 原理
	1.使用canvas绘制动画，并将获取的逐帧图片通过ffmpeg合成音频生成mp4视频。
	2.音频是先将数据转成base64并通过jsonp获取（为了将音频放到其他服务器上），但现有的旧音频都是只有9s,可能长度不太够。
	3.canvas动画是使用了create.js库做的;adobe animate cc 中的canvas 动画也是使用了该库，所以有能力者可以通过该软件生成并适当拿取其中的一些代码。
	4.视频生成的速度与电脑的性能，生成的视频尺寸大小，视频长度，视频清晰度（比特率）相关。
	5.视频的生成数据处理是用html5 的web worker新特性;现代浏览器基本都支持。
	6.由于视频的生成库大小较大，第一次使用要较长时间;由于不使flash等插件，所以在手机网页端也能运行。
	7.之前做过一个pc客户端的版本;但后来在发现在web端可以实现该功能;最终权衡下,web端还是比较好的优势;
	
		一.pc客户端要用户下载安装且体积也不小;
		二.pc客户端维护不易，用户使用上出现问题不好排查;
		三.pc客户端只考虑windows系统，虽然可以生成mac,linux下可用的程序，但开发时没mac 和 linux的系统且这两者的用户使用量少所以没考虑在内。
		四.pc客户端权限过高，部分用用户可能不信任。
		五.pc客户端一旦初次用户使用体验不佳，用户卸载后，复装率极低。
		六.pc客户端技术栈过多，新人看了一脸mb;
		七.pc客户端是使js 和 node 的技术开发,而web端只用js,所以有需求可以将web做一些小修改直接移植到pc端;
	
	8.web端开始开发时，使用的是web RTC特性，支持获取canvas内容成为视频流并合成webm视频文件;最终是通过ffmpeg合并音频生成mp4;但这样却有一些缺点:
		一.由于是实时获取数据;所以电脑性能不足以支持动画的流畅播放或程序的正常运行，生成的视频也是卡的一b(当然不是视频本身卡)，同样的内容，生成的视频文件大小也是大小不一，卡的程度和卡的位置也不一样，而且无法做到完全不卡的;
		二.生成的视频无法控制质量，虽在将webm合成mp4时是可调质量的，但原始生成的webm视频的质量是固定的,所以可以做到更渣画质但无法做到更优画质。
		三.web RTC特性对浏览器要求更高了
	9.现在方案是舍弃了第一步，精简了步骤。直接控制动画的进度，获取图片数据，与音频一起合成mp4。这其实与开发pc客户端的方案类似了，只是pc客户端在获取图片数据后要通过node把文件保存到磁盘，生成后又要删掉了，但这种大量保存文件并用后删的行为不太可取。
	10.音频是使用html5 中<audio>元素播放的。由于动画长度可知，音频长度可知，也有相关属性和方法供使用只要监听动画的进度播放音频即可。

## 模板
	1.现在模板全部通过写代码的方式制作而成，因而可以提供多种尺寸供用户选择，而不是原有的400×400,1:1。
	2.由于是js写的，所以在后期可以根据需要编写;目前是给图片加上缓动进行切换，并加上价格标签。
	
	


