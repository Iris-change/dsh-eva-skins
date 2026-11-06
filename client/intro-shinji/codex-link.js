import {loopTime,breathe} from './motion-v12.js';

export function drawCodexLink(c,logo,{x,y,size=64,alpha=1,progress=1,time=0,connected=true}){
 c.save();c.globalAlpha*=alpha;c.translate(x,y);
 const radius=size*.77,angle=loopTime(time,6)*Math.PI*2,pulse=1+.022*breathe(time,3.8);
 c.strokeStyle=connected?'#aa795da0':'#6c595780';c.lineWidth=Math.max(1,size/90);
 c.beginPath();c.arc(0,0,radius*pulse,0,Math.PI*2);c.stroke();
 c.strokeStyle=connected?'#bccb9a':'#907775';c.beginPath();c.arc(0,0,radius+size*.10,angle,angle+Math.PI*2*Math.max(.035,progress)*.7);c.stroke();
 c.strokeStyle='#68beda70';c.beginPath();c.arc(0,0,radius+size*.17,-angle+.3,-angle+.8);c.stroke();
 // The DeepSeek Harness mark is drawn intact, without rotation or recoloring; aspect preserved.
 const ar=(logo.width&&logo.height)?logo.width/logo.height:1,w=size*1.14,h=w/ar;
 c.drawImage(logo,-w/2,-h/2,w,h);c.restore();
}
