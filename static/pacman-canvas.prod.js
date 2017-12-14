"use strict";function geronimo(){function t(){setTimeout(i,30)}function i(){$.ajax({url:"/highscores",async:!0,beforeSend:function(t){$("#highscore-list").text(""),t.overrideMimeType&&t.overrideMimeType("application/json")},dataType:"json",success:function(t){t.forEach(function(t){$("#highscore-list").append("<li>"+t.username+"<span id='score'>"+t.highscore+"</span></li>")})}})}function e(t,i,e){var s=$("input[name=_csrf]").val();$.ajax({url:"/savescore",data:{n:t,s:i,l:e,_csrf:s},async:!0,beforeSend:function(t){t.overrideMimeType&&t.overrideMimeType("application/json")},dataType:"json",type:"POST",success:function(t){$("#highscore-form").html('<span class="button" id="show-highscore">View Highscore List</span>')}})}function s(t,i,e,s,o){console.log("BuildWall"),s=2*s-1,o=2*o-1,t.fillRect(d.radius/2+2*i*d.radius,d.radius/2+2*e*d.radius,s*d.radius,o*d.radius)}function o(t,i,e){return t>=i&&t<=e}function n(t,i,e,s,o){this.name=t,this.angle1=i,this.angle2=e,this.dirX=s,this.dirY=o,this.equals=function(t){return JSON.stringify(this)==JSON.stringify(t)}}function h(){this.dir=null,this.set=function(t){this.dir=t},this.get=function(){return this.dir}}function r(t,i,e,s,n,h){this.name=t,this.posX=30*i,this.posY=30*e,this.startPosX=30*i,this.startPosY=30*e,this.gridBaseX=n,this.gridBaseY=h,this.speed=f.ghostSpeedNormal,this.images=JSON.parse('{"normal" : {"inky" : "0","pinky" : "1","blinky" : "2","clyde" : "3"},"frightened1" : {"left" : "", "up": "", "right" : "", "down": ""},"frightened2" : {"left" : "", "up": "", "right" : "", "down": ""},"dead" : {"left" : "", "up": "", "right" : "", "down": ""}}'),this.image=new Image,this.image.src=s,this.ghostHouse=!0,this.dazzled=!1,this.dead=!1,this.dazzle=function(){this.changeSpeed(f.ghostSpeedDazzled),this.posX>0&&(this.posX=this.posX-this.posX%this.speed),this.posY>0&&(this.posY=this.posY-this.posY%this.speed),this.dazzled=!0},this.undazzle=function(){this.dead||this.changeSpeed(f.ghostSpeedNormal),this.posX>0&&(this.posX=this.posX-this.posX%this.speed),this.posY>0&&(this.posY=this.posY-this.posY%this.speed),this.dazzled=!1},this.dazzleImg=new Image,this.dazzleImg.src="img/dazzled.svg",this.dazzleImg2=new Image,this.dazzleImg2.src="img/dazzled2.svg",this.deadImg=new Image,this.deadImg.src="img/dead.svg",this.direction=D,this.radius=d.radius,this.draw=function(t){this.dead?t.drawImage(this.deadImg,this.posX,this.posY,2*this.radius,2*this.radius):this.dazzled?d.beastModeTimer<50&&d.beastModeTimer%8>1?t.drawImage(this.dazzleImg2,this.posX,this.posY,2*this.radius,2*this.radius):t.drawImage(this.dazzleImg,this.posX,this.posY,2*this.radius,2*this.radius):t.drawImage(this.image,this.posX,this.posY,2*this.radius,2*this.radius)},this.getCenterX=function(){return this.posX+this.radius},this.getCenterY=function(){return this.posY+this.radius},this.reset=function(){this.dead=!1,this.posX=this.startPosX,this.posY=this.startPosY,this.ghostHouse=!0,this.undazzle()},this.die=function(){this.dead||(f.score.add(100),this.dead=!0,this.changeSpeed(f.ghostSpeedNormal))},this.changeSpeed=function(t){this.posX=Math.round(this.posX/t)*t,this.posY=Math.round(this.posY/t)*t,this.speed=t},this.move=function(){this.checkDirectionChange(),this.checkCollision(),1==this.ghostHouse&&("clyde"==this.name&&(f.level<4||f.pillCount>104/3?this.stop=!0:this.stop=!1),"inky"==this.name&&(f.level<3||f.pillCount>74?this.stop=!0:this.stop=!1),5==this.getGridPosY()&&this.inGrid()&&(7==this.getGridPosX()&&this.setDirection(D),8!=this.getGridPosX()&&9!=this.getGridPosX()||this.setDirection(b),10==this.getGridPosX()&&this.setDirection(k)),4!=this.getGridPosY()||8!=this.getGridPosX()&&9!=this.getGridPosX()||!this.inGrid()||(console.log("ghosthouse -> false"),this.ghostHouse=!1)),this.stop||(this.posX+=this.speed*this.dirX,this.posY+=this.speed*this.dirY,this.posX>=f.width-this.radius&&(this.posX=this.speed-this.radius),this.posX<=0-this.radius&&(this.posX=f.width-this.speed-this.radius),this.posY>=f.height-this.radius&&(this.posY=this.speed-this.radius),this.posY<=0-this.radius&&(this.posY=f.height-this.speed-this.radius))},this.checkCollision=function(){this.dead&&this.getGridPosX()==this.startPosX/30&&this.getGridPosY()==this.startPosY/30?this.reset():o(d.getCenterX(),this.getCenterX()-10,this.getCenterX()+10)&&o(d.getCenterY(),this.getCenterY()-10,this.getCenterY()+10)&&(this.dazzled||this.dead?this.die():d.die())},this.getNextDirection=function(){var t=this.getGridPosX(),i=this.getGridPosY();f.getMapContent(t,i);if(this.dead)var e=this.startPosX/30,s=this.startPosY/30;else if(0==f.ghostMode)e=this.gridBaseX,s=this.gridBaseY;else if(1==f.ghostMode)switch(this.name){case"pinky":var o=d.direction,n=0==o.dirX?-o.dirY:o.dirX,h=0==o.dirY?-o.dirX:o.dirY;e=(d.getGridPosX()+4*n)%(f.width/d.radius+1),s=(d.getGridPosY()+4*h)%(f.height/d.radius+1);break;case"blinky":e=d.getGridPosX(),s=d.getGridPosY();break;case"inky":e=d.getGridPosX()+2*d.direction.dirX,s=d.getGridPosY()+2*d.direction.dirY;var r=e-X.getGridPosX(),a=s-X.getGridPosY();e=Math.abs(X.getGridPosX()+2*r),s=Math.abs(X.getGridPosY()+2*a);break;case"clyde":e=d.getGridPosX(),s=d.getGridPosY();Math.sqrt(Math.pow(t-e,2)+Math.pow(i-s,2))<5&&(e=this.gridBaseX,s=this.gridBaseY)}this.getOppositeDirection();var c=[{},{},{},{}];c[0].field=f.getMapContent(t,i-1),c[0].dir=b,c[0].distance=Math.sqrt(Math.pow(t-e,2)+Math.pow(i-1-s,2)),c[1].field=f.getMapContent(t,i+1),c[1].dir=C,c[1].distance=Math.sqrt(Math.pow(t-e,2)+Math.pow(i+1-s,2)),c[2].field=f.getMapContent(t+1,i),c[2].dir=D,c[2].distance=Math.sqrt(Math.pow(t+1-e,2)+Math.pow(i-s,2)),c[3].field=f.getMapContent(t-1,i),c[3].dir=k,c[3].distance=Math.sqrt(Math.pow(t-1-e,2)+Math.pow(i-s,2));var l=c.sort(function(t,i){return t.distance<i.distance?-1:t.distance>i.distance?1:0}),u=this.dir;if(this.dead)for(var p=l.length-1;p>=0;p--)"wall"==l[p].field||l[p].dir.equals(this.getOppositeDirection())||(u=l[p].dir);else for(p=l.length-1;p>=0;p--)"wall"==l[p].field||"door"==l[p].field||l[p].dir.equals(this.getOppositeDirection())||(u=l[p].dir);return this.directionWatcher.set(u),u},this.setRandomDirection=function(){switch(Math.floor(10*Math.random()+1)%5){case 1:this.getOppositeDirection().equals(b)?this.setDirection(C):this.setDirection(b);break;case 2:this.getOppositeDirection().equals(C)?this.setDirection(b):this.setDirection(C);break;case 3:this.getOppositeDirection().equals(D)?this.setDirection(k):this.setDirection(D);break;case 4:this.getOppositeDirection().equals(k)?this.setDirection(D):this.setDirection(k)}},this.reverseDirection=function(){console.log("reverseDirection: "+this.direction.name+" to "+this.getOppositeDirection().name),this.directionWatcher.set(this.getOppositeDirection())}}function a(){this.posX,this.posY,this.speed,this.dirX=D.dirX,this.dirY=D.dirY,this.direction,this.stop=!0,this.directionWatcher=new h,this.getNextDirection=function(){console.log("Figure getNextDirection")},this.checkDirectionChange=function(){this.inGrid()&&null==this.directionWatcher.get()&&this.getNextDirection(),null!=this.directionWatcher.get()&&this.inGrid()&&(this.setDirection(this.directionWatcher.get()),this.directionWatcher.set(null))},this.inGrid=function(){return this.posX%(2*this.radius)==0&&this.posY%(2*this.radius)==0},this.getOppositeDirection=function(){return this.direction.equals(b)?C:this.direction.equals(C)?b:this.direction.equals(D)?k:this.direction.equals(k)?D:void 0},this.move=function(){this.stop||(this.posX+=this.speed*this.dirX,this.posY+=this.speed*this.dirY,this.posX>=f.width-this.radius&&(this.posX=this.speed-this.radius),this.posX<=0-this.radius&&(this.posX=f.width-this.speed-this.radius),this.posY>=f.height-this.radius&&(this.posY=this.speed-this.radius),this.posY<=0-this.radius&&(this.posY=f.height-this.speed-this.radius))},this.stop=function(){this.stop=!0},this.start=function(){this.stop=!1},this.getGridPosX=function(){return(this.posX-this.posX%30)/30},this.getGridPosY=function(){return(this.posY-this.posY%30)/30},this.setDirection=function(t){this.dirX=t.dirX,this.dirY=t.dirY,this.angle1=t.angle1,this.angle2=t.angle2,this.direction=t},this.setPosition=function(t,i){this.posX=t,this.posY=i}}function d(){this.radius=15,this.posX=0,this.posY=12*this.radius,this.speed=5,this.angle1=.25,this.angle2=1.75,this.mouth=1,this.dirX=D.dirX,this.dirY=D.dirY,this.lives=3,this.stuckX=0,this.stuckY=0,this.frozen=!1,this.freeze=function(){this.frozen=!0},this.unfreeze=function(){this.frozen=!1},this.getCenterX=function(){return this.posX+this.radius},this.getCenterY=function(){return this.posY+this.radius},this.directionWatcher=new h,this.direction=D,this.beastMode=!1,this.beastModeTimer=0,this.checkCollisions=function(){if(0==this.stuckX&&0==this.stuckY&&0==this.frozen){var t=this.getGridPosX(),i=this.getGridPosY(),e=t,s=i,n=f.getMapContent(t,i);1==this.dirX&&e<17&&(e+=1),1==this.dirY&&s<12&&(s+=1);var h=f.getMapContent(e,s);if(("pill"===n||"powerpill"===n)&&(1==this.dirX&&o(this.posX,f.toPixelPos(t)+this.radius-5,f.toPixelPos(t+1))||-1==this.dirX&&o(this.posX,f.toPixelPos(t),f.toPixelPos(t)+5)||1==this.dirY&&o(this.posY,f.toPixelPos(i)+this.radius-5,f.toPixelPos(i+1))||-1==this.dirY&&o(this.posY,f.toPixelPos(i),f.toPixelPos(i)+5)||"wall"===h)){var r;"powerpill"===n?(M.play("powerpill"),r=50,this.enableBeastMode(),f.startGhostFrightened()):(M.play("waka"),r=10,f.pillCount--),f.map.posY[i].posX[t].type="null",f.score.add(r)}"wall"!==h&&"door"!==h||(this.stuckX=this.dirX,this.stuckY=this.dirY,d.stop(),1==this.stuckX&&this.posX%2*this.radius!=0&&(this.posX-=5),1==this.stuckY&&this.posY%2*this.radius!=0&&(this.posY-=5),-1==this.stuckX&&(this.posX+=5),-1==this.stuckY&&(this.posY+=5))}},this.checkDirectionChange=function(){if(null!=this.directionWatcher.get())if(1==this.stuckX&&this.directionWatcher.get()==D)this.directionWatcher.set(null);else if(this.stuckX=0,this.stuckY=0,this.inGrid()){console.log("x: "+this.getGridPosX()+" + "+this.directionWatcher.get().dirX),console.log("y: "+this.getGridPosY()+" + "+this.directionWatcher.get().dirY);var t=this.getGridPosX()+this.directionWatcher.get().dirX,i=this.getGridPosY()+this.directionWatcher.get().dirY;t<=-1&&(t=f.width/(2*this.radius)-1),t>=f.width/(2*this.radius)&&(t=0),i<=-1&&(t=f.height/(2*this.radius)-1),i>=f.heigth/(2*this.radius)&&(i=0),console.log("x: "+t),console.log("y: "+i);var e=f.map.posY[i].posX[t].type;console.log("checkNextTile: "+e),"wall"!=e&&(this.setDirection(this.directionWatcher.get()),this.directionWatcher.set(null))}},this.setDirection=function(t){this.frozen||(this.dirX=t.dirX,this.dirY=t.dirY,this.angle1=t.angle1,this.angle2=t.angle2,this.direction=t)},this.enableBeastMode=function(){this.beastMode=!0,this.beastModeTimer=240,w.dazzle(),P.dazzle(),X.dazzle(),Y.dazzle()},this.disableBeastMode=function(){this.beastMode=!1,w.undazzle(),P.undazzle(),X.undazzle(),Y.undazzle()},this.move=function(){this.frozen?this.dieAnimation():(this.beastModeTimer>0&&this.beastModeTimer--,0==this.beastModeTimer&&1==this.beastMode&&this.disableBeastMode(),this.posX+=this.speed*this.dirX,this.posY+=this.speed*this.dirY,this.posX>=f.width-this.radius&&(this.posX=5-this.radius),this.posX<=0-this.radius&&(this.posX=f.width-5-this.radius),this.posY>=f.height-this.radius&&(this.posY=5-this.radius),this.posY<=0-this.radius&&(this.posY=f.height-5-this.radius))},this.eat=function(){if(!this.frozen&&this.dirX==this.dirY==0){this.angle1-=.07*this.mouth,this.angle2+=.07*this.mouth;var t=this.direction.angle1,i=this.direction.angle2,e=this.direction.angle1-.21,s=this.direction.angle2+.21;(this.angle1<e||this.angle2>s)&&(this.mouth=-1),(this.angle1>=t||this.angle2<=i)&&(this.mouth=1)}},this.stop=function(){this.dirX=0,this.dirY=0},this.reset=function(){this.unfreeze(),this.posX=0,this.posY=12*this.radius,this.setDirection(D),this.stop(),this.stuckX=0,this.stuckY=0},this.dieAnimation=function(){this.angle1+=.05,this.angle2-=.05,(this.angle1>=this.direction.angle1+.7||this.angle2<=this.direction.angle2-.7)&&this.dieFinal()},this.die=function(){M.play("die"),this.freeze(),this.dieAnimation()},this.dieFinal=function(){if(this.reset(),P.reset(),w.reset(),X.reset(),Y.reset(),this.lives--,console.log("pacman died, "+this.lives+" lives left"),this.lives<=0){f.showMessage("Game over","Total Score: "+f.score.score+"<div id='highscore-form'><span id='form-validater'></span><input type='text' id='playerName'/><span class='button' id='score-submit'>save</span></div>"),f.gameOver=!0,$("#playerName").focus()}f.drawHearts(this.lives)},this.getGridPosX=function(){return(this.posX-this.posX%30)/30},this.getGridPosY=function(){return(this.posY-this.posY%30)/30}}function c(){f.score.refresh(".score"),g.beginPath(),g.fillStyle="White",g.strokeStyle="White";var t;$.each(f.map.posY,function(i,e){t=this.row,$.each(this.posX,function(){"pill"==this.type?(g.arc(f.toPixelPos(this.col-1)+d.radius,f.toPixelPos(t-1)+d.radius,f.pillSize,0*Math.PI,2*Math.PI),g.moveTo(f.toPixelPos(this.col-1),f.toPixelPos(t-1))):"powerpill"==this.type&&(g.arc(f.toPixelPos(this.col-1)+d.radius,f.toPixelPos(t-1)+d.radius,f.powerpillSizeCurrent,0*Math.PI,2*Math.PI),g.moveTo(f.toPixelPos(this.col-1),f.toPixelPos(t-1)))})}),console.log("pps: "+f.nextPowerPillSize()),g.fill(),g.drawImage(m,0,0),1==f.running&&(P.draw(g),X.draw(g),w.draw(g),Y.draw(g),g.beginPath(),g.fillStyle="Yellow",g.strokeStyle="Yellow",g.arc(d.posX+d.radius,d.posY+d.radius,d.radius,d.angle1*Math.PI,d.angle2*Math.PI),g.lineTo(d.posX+d.radius,d.posY+d.radius),g.stroke(),g.fill())}function l(){p.width=p.width,c(),1==f.dieAnimation&&d.dieAnimation(),1!=f.pause&&(d.move(),d.eat(),d.checkDirectionChange(),d.checkCollisions(),X.move(),w.move(),P.move(),Y.move(),f.checkGhostMode()),f.check(),setTimeout(l,f.refreshRate)}function u(t){switch(t.keyCode){case 38:t.preventDefault();case 87:d.directionWatcher.set(b);break;case 40:t.preventDefault();case 83:d.directionWatcher.set(C);break;case 37:t.preventDefault();case 65:d.directionWatcher.set(k);break;case 39:t.preventDefault();case 68:d.directionWatcher.set(D);break;case 78:$("#playerName").is(":focus")||(f.pause=1,f.newGame());break;case 77:f.toggleSound();break;case 8:case 27:$("#playerName").is(":focus")||(t.preventDefault(),f.showContent("game-content"));break;case 32:t.preventDefault(),1!=f.gameOver&&$("#game-content").is(":visible")&&f.pauseResume()}}var p,g,f,m,v,w,X,Y,P,y="data/map.json",z=function(){var t=null,i={};return i.enableLogger=function(){null!==t&&(window.console.log=t)},i.disableLogger=function(){t=console.log,window.console.log=function(){}},i}();f=new function(){this.timer=new function(){this.time_diff=0,this.time_start=0,this.time_stop=0,this.start=function(){this.time_start=(new Date).getTime()},this.stop=function(){this.time_stop=(new Date).getTime(),this.time_diff+=this.time_stop-this.time_start,this.time_stop=0,this.time_start=0},this.reset=function(){this.time_diff=0,this.time_start=0,this.time_stop=0},this.get_time_diff=function(){return this.time_diff}},this.refreshRate=33,this.running=!1,this.pause=!0,this.score=new function(){this.score=0,this.set=function(t){this.score=t},this.add=function(t){this.score+=t},this.refresh=function(t){$(t).html("Score: "+this.score)}},this.soundfx=0,this.map,this.pillCount,this.monsters,this.level=1,this.refreshLevel=function(t){$(t).html("Lvl: "+this.level)},this.gameOver=!1,this.canvas=$("#myCanvas").get(0),this.wallColor="Blue",this.width=this.canvas.width,this.height=this.canvas.height,this.pillSize=3,this.powerpillSizeMin=2,this.powerpillSizeMax=6,this.powerpillSizeCurrent=this.powerpillSizeMax,this.powerPillAnimationCounter=0,this.nextPowerPillSize=function(){return this.powerpillSizeCurrent},this.ghostFrightened=!1,this.ghostFrightenedTimer=240,this.ghostMode=0,this.ghostModeTimer=200,this.ghostSpeedNormal=this.level>4?3:2,this.ghostSpeedDazzled=2,this.startGhostFrightened=function(){console.log("ghost frigthened"),this.ghostFrightened=!0,this.ghostFrightenedTimer=240,w.dazzle(),P.dazzle(),X.dazzle(),Y.dazzle()},this.endGhostFrightened=function(){console.log("ghost frigthened end"),this.ghostFrightened=!1,w.undazzle(),P.undazzle(),X.undazzle(),Y.undazzle()},this.checkGhostMode=function(){this.ghostFrightened&&(this.ghostFrightenedTimer--,0===this.ghostFrightenedTimer&&(this.endGhostFrightened(),this.ghostFrigthenedTimer=240)),this.ghostModeTimer--,0===this.ghostModeTimer&&f.level>1&&(this.ghostMode^=1,this.ghostModeTimer=200+450*this.ghostMode,console.log("ghostMode="+this.ghostMode),f.buildWalls(),w.reverseDirection(),P.reverseDirection(),Y.reverseDirection(),X.reverseDirection())},this.getMapContent=function(t,i){var e=f.width/30-1,s=f.height/30-1;return t<0&&(t=e+t),t>e&&(t-=e),i<0&&(i=s+i),i>s&&(i-=s),this.map.posY[i].posX[t].type},this.setMapContent=function(t,i,e){this.map.posY[i].posX[t].type=e},this.toggleSound=function(){0===this.soundfx?this.soundfx=1:this.soundfx=0,$("#mute").toggle()},this.reset=function(){},this.newGame=function(){confirm("Are you sure you want to restart?")&&(console.log("new Game"),this.init(0),this.pauseResume())},this.nextLevel=function(){this.level++,console.log("Level "+f.level),f.showMessage("Level "+f.level,this.getLevelTitle()+"<br/>(Click to continue!)"),f.refreshLevel(".level"),this.init(1)},this.drawHearts=function(t){for(var i="",e=0;e<t;e++)i+=" <img src='img/heart.png'>";$(".lives").html("Lives: "+i)},this.showContent=function(t){$(".content").hide(),$("#"+t).show()},this.getLevelTitle=function(){switch(this.level){case 2:return'"The chase begins"';case 3:return'"Inkys awakening"';case 4:return'"Clydes awakening"';case 5:return'"need for speed"';case 6:return'"hunting season 1"';case 7:return'"the big calm"';case 8:return'"hunting season 2"';case 9:return'"ghosts on speed"';default:return'"nothing new"'}},this.showMessage=function(t,i){this.timer.stop(),this.pause=!0,$("#canvas-overlay-container").fadeIn(200),"none"!=$(".controls").css("display")&&$(".controls").slideToggle(200),$("#canvas-overlay-content #title").text(t),$("#canvas-overlay-content #text").html(i)},this.closeMessage=function(){$("#canvas-overlay-container").fadeOut(200),$(".controls").slideToggle(200)},this.pauseResume=function(){this.running?this.pause?(this.timer.stop(),this.pause=!1,this.closeMessage()):this.showMessage("Pause","Click to Resume"):(this.timer.start(),this.pause=!1,this.running=!0,this.closeMessage(),l())},this.init=function(t){console.log("init game "+t),0===t&&this.timer.reset(),$.ajax({url:y,async:!1,beforeSend:function(t){t.overrideMimeType&&t.overrideMimeType("application/json")},dataType:"json",success:function(t){f.map=t}});var i=0;$.each(this.map.posY,function(t,e){$.each(this.posX,function(){"pill"==this.type&&i++})}),this.pillCount=i,0===t&&(this.score.set(0),this.score.refresh(".score"),d.lives=3,f.level=1,this.refreshLevel(".level"),f.gameOver=!1),d.reset(),f.drawHearts(d.lives),this.ghostFrightened=!1,this.ghostFrightenedTimer=240,this.ghostMode=0,this.ghostModeTimer=200,null===P||void 0===P?(P=new r("pinky",7,5,"img/pinky.svg",2,2),w=new r("inky",8,5,"img/inky.svg",13,11),X=new r("blinky",9,5,"img/blinky.svg",13,0),Y=new r("clyde",10,5,"img/clyde.svg",2,11)):(P.reset(),w.reset(),X.reset(),Y.reset()),X.start(),w.start(),P.start(),Y.start()},this.check=function(){0===this.pillCount&&f.running&&this.nextLevel()},this.win=function(){},this.gameover=function(){},this.toPixelPos=function(t){return 30*t},this.toGridPos=function(t){return t%30/30},this.buildWalls=function(){0===this.ghostMode?f.wallColor="Blue":f.wallColor="Red",(m=document.createElement("canvas")).width=f.canvas.width,m.height=f.canvas.height,(v=m.getContext("2d")).fillStyle=f.wallColor,v.strokeStyle=f.wallColor,s(v,0,0,18,1),s(v,0,12,18,1),s(v,0,0,1,6),s(v,0,7,1,6),s(v,17,0,1,6),s(v,17,7,1,6),s(v,7,4,1,1),s(v,6,5,1,2),s(v,10,4,1,1),s(v,11,5,1,2),s(v,6,6,6,1),v.fillRect(16*d.radius,d.radius/2+8*d.radius+5,4*d.radius,1),s(v,4,0,1,2),s(v,13,0,1,2),s(v,2,2,1,2),s(v,6,2,2,1),s(v,15,2,1,2),s(v,10,2,2,1),s(v,2,3,2,1),s(v,14,3,2,1),s(v,5,3,1,1),s(v,12,3,1,1),s(v,3,3,1,3),s(v,14,3,1,3),s(v,3,4,1,1),s(v,14,4,1,1),s(v,0,5,2,1),s(v,3,5,2,1),s(v,16,5,2,1),s(v,13,5,2,1),s(v,0,7,2,2),s(v,16,7,2,2),s(v,3,7,2,2),s(v,13,7,2,2),s(v,4,8,2,2),s(v,12,8,2,2),s(v,5,8,3,1),s(v,10,8,3,1),s(v,2,10,1,1),s(v,15,10,1,1),s(v,7,10,4,1),s(v,4,11,2,2),s(v,12,11,2,2)}};var M={};M.play=function(t){if(1==f.soundfx){var i=document.getElementById(t);null!==i?i.play():console.log(t+" not found")}};var b=new n("up",1.75,1.25,0,-1),k=new n("left",1.25,.75,-1,0),C=new n("down",.75,.25,0,1),D=new n("right",.25,1.75,1,0);r.prototype=new a,d.prototype=new a;var d=new d;f.buildWalls(),$(document).ready(function(){$.ajaxSetup({mimeType:"application/json"}),$.ajaxSetup({beforeSend:function(t){t.overrideMimeType&&t.overrideMimeType("application/json")}}),console.log("hide adressbar"),$("html").scrollTop(1),$("body").scrollTop(1),null!=window.applicationCache&&(console.log("check AppCache"),window.applicationCache.addEventListener("updateready",function(t){console.log("AppCache: updateready"),window.applicationCache.status==window.applicationCache.UPDATEREADY&&(window.applicationCache.swapCache(),confirm("A new version of this site is available. Load it?")&&window.location.reload())},!1),window.applicationCache.addEventListener("cached",function(t){console.log("AppCache: cached")},!1)),window.addEventListener("keydown",u,!0),$("#canvas-container").click(function(){1!=f.gameOver&&f.pauseResume()}),$("body").on("click","#score-submit",function(t){var i=$("#playerName").val();$("#score-submit").prop("disabled",!0),""===i||void 0===i?$("#form-validater").html("Please enter a valid Steem username<br/>"):function(t){var i=$("input[name=_csrf]").val();$.ajax({url:"/checkname",data:{_csrf:i,playerName:t},async:!0,beforeSend:function(t){$("#score-submit").prop("disabled",!0),$("#form-validater").html(""),t.overrideMimeType&&t.overrideMimeType("application/json")},dataType:"json",type:"POST",success:function(i){i.valid?($("#score-submit").prop("disabled",!1),$("#form-validater").html(""),$("#highscore-form").html('<span class="button" id="show-highscore">View Highscore List</span>'),e(t.toLowerCase(),f.score.score,f.level)):($("#score-submit").prop("disabled",!1),$("#form-validater").html("Please enter a valid Steem username<br/>"))}})}(i)}),$("body").on("click","#show-highscore",function(){f.showContent("highscore-content"),t()}),Hammer(".container").on("swiperight",function(t){$("#game-content").is(":visible")&&(t.gesture.preventDefault(),d.directionWatcher.set(D))}),Hammer(".container").on("swipeleft",function(t){$("#game-content").is(":visible")&&(t.gesture.preventDefault(),d.directionWatcher.set(k))}),Hammer(".container").on("swipeup",function(t){$("#game-content").is(":visible")&&(t.gesture.preventDefault(),d.directionWatcher.set(b))}),Hammer(".container").on("swipedown",function(t){$("#game-content").is(":visible")&&(t.gesture.preventDefault(),d.directionWatcher.set(C))}),$(document).on("touchend mousedown","#up",function(t){t.preventDefault(),window.navigator.vibrate(200),d.directionWatcher.set(b)}),$(document).on("touchend mousedown","#down",function(t){t.preventDefault(),window.navigator.vibrate(200),d.directionWatcher.set(C)}),$(document).on("touchend mousedown","#left",function(t){t.preventDefault(),window.navigator.vibrate(200),d.directionWatcher.set(k)}),$(document).on("touchend mousedown","#right",function(t){t.preventDefault(),window.navigator.vibrate(200),d.directionWatcher.set(D)}),$(document).on("click",".button#newGame",function(t){f.newGame()}),$(document).on("click",".button#highscore",function(i){f.showContent("highscore-content"),t()}),$(document).on("click",".button#instructions",function(t){f.showContent("instructions-content")}),$(document).on("click",".button#info",function(t){f.showContent("info-content")}),$(document).on("click",".button#back",function(t){f.showContent("game-content")}),$(document).on("click",".controlSound",function(t){f.toggleSound()}),$(document).on("click","#updateCode",function(t){console.log("check for new version"),t.preventDefault(),window.applicationCache.update()}),p=$("#myCanvas").get(0),g=p.getContext("2d"),f.init(0),z.disableLogger(),c()})}geronimo();