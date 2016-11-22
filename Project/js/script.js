function Logger(){var e=0;this.turnLoggerOn=function(){e=1},this.turnLoggerOff=function(){e=0},this.log=function(t){return!!e&&(console.log(t),!0)}}function addListenersToOptions(){var e=$(config.selectors.question__answer);e.each(function(e){$(this).click(function(){$(this).text().indexOf(window.rightAnswer)!=-1?($(this).addClass("right"),window.game.score+=10,window.gui.updatePoints(),0==$(".question__answer.wrong").length&&window.game.timer.addTime(),makeNewQuestion()):($(this).addClass("wrong"),window.game.score-=5,window.game.timer.substractTime(),window.gui.updatePoints())})})}function getFriendsIDs(){VK.Api.call("friends.get",{user_id:userObj.mid,version:"5.53"},function(e){e.response&&(friends=e.response,stringOfUserIDs=friends.join(),getFriendsInfo()),e.error&&console.log(e.error)})}function getFriendsInfo(){VK.Api.call("users.get",{user_ids:stringOfUserIDs,fields:"bdate,city,photo_200,relation,education,universities,schools,status,followers_count,sex,followers_count,personal,first_name_gen,last_name_gen,relation",version:"5.53"},function(e){e.response&&(friends=e.response,friends=friends.filter(function(e){return"deleted"!=e.deactivated}),stringOfUsersCitiesIDs=friends.map(function(e){return e.city}).join(),getFriendsCities()),e.error&&console.log(e.error)})}function getFriendsCities(){VK.Api.call("database.getCitiesById",{city_ids:stringOfUsersCitiesIDs,version:"5.53"},function(e){if(e.response){for(var t=e.response,s=0;s<friends.length;s++)for(var i=friends[s].city,n=0;n<t.length;n++)i==t[n].cid&&(friends[s].cityName=t[n].name);makeNewQuestion(),window.gui.startGame(),window.game.timer=new Timer,window.game.timer.start()}e.error&&console.log(e.error)})}function getNumberOfQuestion(){if(0==questionNumbersToSelect.length)for(var e=0;e<quiz.length;e++)questionNumbersToSelect[e]=e;var t=Math.round(Math.random()*(questionNumbersToSelect.length-1)),s=questionNumbersToSelect[t];return questionNumbersToSelect.splice(t,1),s}function makeNewQuestion(){function e(e,t){return Math.random()-.5}var t=quiz[getNumberOfQuestion()];t.getAvailableUsers();var s=t.chooseOptions(config.quiz_options),i=(s[1],s[0]);s=s.slice(1),s.sort(e),$(config.selectors.question__text).html(t.question),$(config.selectors.question__properties).html(""),t.withPhoto&&$(config.selectors.question__properties).html($(config.selectors.question__properties).html()+'<div class="question__image"><img src=\''+i.photo_200+'\' class="question__img" width="200px" height="200px" alt="Quiz Question Image"></div>'),$(config.selectors.question__properties).html($(config.selectors.question__properties).html()+"<div class='question__answers clearfix'>");for(var n=0;n<s.length;n++)$(config.selectors.question__answers).html($(config.selectors.question__answers).html()+"<div class="+config.selectors.question__answer.substr(1)+">"+s[n]+"</div>");$(config.selectors.question__properties).html($(config.selectors.question__properties).html()+"</div>"),addListenersToOptions(),delete t.users_available}function Timer(){var e,t=0,s=config.gameTimeOut,i=this;this.start=function(){e=setInterval(function(){t+=1e3,window.gui.updateTimer(),t>=s&&i.end()},1e3,i)},this.end=function(){window.gui.endGame(),clearInterval(e)},this.clrInterval=function(){clearInterval(e)},this.getSecondsLeft=function(){return(s-t)/1e3},this.addTime=function(){t-=2e3,window.gui.updateTimer()},this.substractTime=function(){t+=1e3,window.gui.updateTimer()}}function GUI(){this.updateTimer=function(){onlineSeconds.innerHTML=window.game.timer.getSecondsLeft()},this.updatePoints=function(){onlinePoints.innerHTML=window.game.score},this.startGame=function(){$(config.selectors.quiz).removeClass("hidden"),$(window).scrollTo(".quiz",{duration:500})},this.endGame=function(){$(config.selectors.questionBlock).addClass("hidden"),gameResult.innerHTML=window.game.score,$(".gameResult").removeClass("hidden"),window.db.addRecord({name:userObj.user.first_name,surname:userObj.user.last_name,id:userObj.mid,score:window.game.score},window.db.getFirstRecordsJSON)},this.updateTopList=function(e){for(var t=$(".winners"),s='<tr class="tableHead"><th>№</th><th>Имя</th><th>Оценка</th></tr>',i=0;i<e.length;i++)s+="<tr><td class ='number'>"+(i+1)+"</td><td class='name'><a href='https://vk.com/id"+e[i].vk_id+"' target = '_blank'>"+e[i].first_name+" "+e[i].last_name+"</a></td><td class='points'>"+e[i].points+"</td></tr>";t.html(s),window.gui.prepareDrawUsersRate()},this.prepareDrawUsersRate=function(){var e=$(".userResult__header"),t=$(".userResult__main");if(localStorage.getItem("vk_id")){var s="Привет, "+localStorage.getItem("name")+"!<br>Это твой лучший результат в рейтинге!";e.html(s),window.db.getNearbyRecords(localStorage.getItem("vk_id"),window.gui.drawUsersRate)}else{var s="Здесь может быть твое имя!<br>Соревнуйся за звание лучшего друга планеты!";e.html(s),s="<div class='row'><div class='userResult__fakeImage'><img src='img/vkQuizTable.png'></div></div>",t.html(s)}},this.drawUsersRate=function(e){for(var t,s=$(".userResult__main"),i='<div class="row"><div class="userMark col-sm-4"><div class="mark">'+e.neighbors[e.currentIndex].points+'</div>баллов</div><div class="userRate col-sm-8"><table class="rate__table userRateTable">',n=0;n<e.neighbors.length;n++)e.neighbors[n]&&(t=n==e.currentIndex?"class='currentUser'":"",i+="<tr "+t+'><td class="number">'+e.neighborsNums[n]+'</td><td class="name"><a href="https://vk.com/id'+e.neighbors[n].vk_id+'" target = "_blank">'+e.neighbors[n].first_name+" "+e.neighbors[n].last_name+'</a></td><td class="points">'+e.neighbors[n].points+"</td></tr>");i+="</table></div></div>",logger.log(i),logger.log("BATYA"),s.html(i)}}function Database(){this.getRecords=function(){$.post("php/addRecordAction.php",{typeOfActivity:"getRecordsJSONAct"},function(e){},"json"),sendPostRequest("php/addRecordAction.php",{typeOfActivity:"getRecordsJSONAct"})},this.addRecord=function(e,t){logger.log("addRecordBeforePost"),$.post("php/addRecordAction.php",{typeOfActivity:"addRecordAct",first_name:e.name,last_name:e.surname,vk_id:e.id,points:e.score},function(){logger.log("addRecord"),"function"==typeof t&&(logger.log("addRecordINIF"),t(10,window.gui.updateTopList))})},this.getFirstRecordsJSON=function(e,t){$.post("php/addRecordAction.php",{typeOfActivity:"getFirstRecordsJSONAct",count:e},function(e){logger.log("getFirstRecordsJSON"),"function"==typeof t&&(t(e),logger.log("getFirstRecordsJSONINIF"))},"json")},this.getNearbyRecords=function(e,t){$.post("php/addRecordAction.php",{typeOfActivity:"getRecordsJSONAct"},function(s){if("function"==typeof t){for(var i={neighbors:[],currentIndex:0,neighborsNums:[]},n=0;n<s.length;n++)if(s[n].vk_id==e){0==n?(i.neighbors.push(s[n],s[n+1],s[n+2]),i.neighborsNums.push(n+1,n+2,n+3),i.currentIndex=0):n==s.length-1?(i.neighbors.push(s[n-2],s[n-1],s[n]),i.neighborsNums.push(n-1,n,n+1),i.currentIndex=2):(i.neighbors.push(s[n-1],s[n],s[n+1]),i.neighborsNums.push(n,n+1,n+2),i.currentIndex=1);break}t(i)}},"json")},this.sendUserInfo=function(){$.post("php/addRecordAction.php",{typeOfActivity:"sendUserInfoAct",vk_id:userObj.mid})}}!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):"undefined"!=typeof module&&module.exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){"use strict";function t(t){return!t.nodeName||-1!==e.inArray(t.nodeName.toLowerCase(),["iframe","#document","html","body"])}function s(t){return e.isFunction(t)||e.isPlainObject(t)?t:{top:t,left:t}}var i=e.scrollTo=function(t,s,i){return e(window).scrollTo(t,s,i)};return i.defaults={axis:"xy",duration:0,limit:!0},e.fn.scrollTo=function(n,r,o){"object"==typeof r&&(o=r,r=0),"function"==typeof o&&(o={onAfter:o}),"max"===n&&(n=9e9),o=e.extend({},i.defaults,o),r=r||o.duration;var a=o.queue&&1<o.axis.length;return a&&(r/=2),o.offset=s(o.offset),o.over=s(o.over),this.each(function(){function l(t){var s=e.extend({},o,{queue:!0,duration:r,complete:t&&function(){t.call(d,h,o)}});f.animate(g,s)}if(null!==n){var u,c=t(this),d=c?this.contentWindow||window:this,f=e(d),h=n,g={};switch(typeof h){case"number":case"string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(h)){h=s(h);break}h=c?e(h):e(h,d);case"object":if(0===h.length)return;(h.is||h.style)&&(u=(h=e(h)).offset())}var m=e.isFunction(o.offset)&&o.offset(d,h)||o.offset;e.each(o.axis.split(""),function(e,t){var s="x"===t?"Left":"Top",n=s.toLowerCase(),r="scroll"+s,_=f[r](),v=i.max(d,t);u?(g[r]=u[n]+(c?0:_-f.offset()[n]),o.margin&&(g[r]-=parseInt(h.css("margin"+s),10)||0,g[r]-=parseInt(h.css("border"+s+"Width"),10)||0),g[r]+=m[n]||0,o.over[n]&&(g[r]+=h["x"===t?"width":"height"]()*o.over[n])):(s=h[n],g[r]=s.slice&&"%"===s.slice(-1)?parseFloat(s)/100*v:s),o.limit&&/^\d+$/.test(g[r])&&(g[r]=0>=g[r]?0:Math.min(g[r],v)),!e&&1<o.axis.length&&(_===g[r]?g={}:a&&(l(o.onAfterFirst),g={}))}),l(o.onAfter)}})},i.max=function(s,i){var n="x"===i?"Width":"Height",r="scroll"+n;if(!t(s))return s[r]-e(s)[n.toLowerCase()]();var n="client"+n,o=s.ownerDocument||s.document,a=o.documentElement,o=o.body;return Math.max(a[r],o[r])-Math.min(a[n],o[n])},e.Tween.propHooks.scrollLeft=e.Tween.propHooks.scrollTop={get:function(t){return e(t.elem)[t.prop]()},set:function(t){var s=this.get(t);if(t.options.interrupt&&t._last&&t._last!==s)return e(t.elem).stop();var i=Math.round(t.now);s!==i&&(e(t.elem)[t.prop](i),t._last=this.get(t))}},i});var config={selectors:{openButton:".openButton",betaErrorList:".beta-errorsList",betaFirstScreen:".beta-firstScreen",startButton:".startButton",quiz:".quiz",questionBlock:".question",question__text:".question__text",question__properties:".question__properties",question__answers:".question__answers",question__answer:".question__answer",question__img:".question__img"},gameTimeOut:9e4},userObj,friends,stringOfUserIDs,questionNumbersToSelect=[];window.game={},window.game.score=0,window.gui=new GUI,window.db=new Database,window.logger=new Logger,window.logger.turnLoggerOff();var startButton=$(config.selectors.startButton),questionBlock=$(config.selectors.questionBlock),openButton=$(config.selectors.openButton);window.gui.prepareDrawUsersRate(),openButton.click(function(e){var t=$(config.selectors.betaFirstScreen);return t.addClass("hidden"),e.preventDefault(),!1}),startButton.click(function(e){return startButton.hasClass("disabled")?(window.game.timer.clrInterval(),window.game={},window.game.score=0,makeNewQuestion(),$(window).scrollTo(".quiz",{duration:500}),$(config.selectors.questionBlock).removeClass("hidden"),$(".questionWrap__results.gameResult").addClass("hidden"),window.gui.updatePoints(),window.gui.startGame(),window.game.timer=new Timer,window.game.timer.start()):(startButton.addClass("disabled"),friends=[],startButton.text("Заново"),VK.Auth.login(function(e){e.session?(userObj=e.session,ga("send",{hitType:"event",eventCategory:"Game Buttons",eventAction:"Start Button",eventLabel:e.session.user.first_name+" "+e.session.user.last_name+" ("+e.session.mid+")"}),localStorage.setItem("name",userObj.user.first_name),localStorage.setItem("vk_id",userObj.mid),getFriendsIDs(),e.settings):console.log("login err")})),e.stopPropagation(),e.preventDefault(),!1});var right_answer_sex,quiz=[{question:"Кто из ваших друзей изображен на этом фото?",withPhoto:!0,users_available:[],chooseOptions:function(e){if(e>this.users_available.length)return[];var t=Math.ceil(2*Math.random());this.users_available=this.users_available.filter(function(e){return e.sex==t}),this.users_available.sort(function(e,t){return Math.random()-.5}),window.rightAnswer=this.users_available[0].first_name+" "+this.users_available[0].last_name;var s=[this.users_available[0],window.rightAnswer,this.users_available[1].first_name+" "+this.users_available[1].last_name,this.users_available[2].first_name+" "+this.users_available[2].last_name,this.users_available[3].first_name+" "+this.users_available[3].last_name];return s},getAvailableUsers:function(){this.users_available=friends.filter(function(e){return!(!e.photo_200||e.photo_200.indexOf("camera_200")!=-1)})}},{question:"Из какого города человек, изображенный на фото?",withPhoto:!0,users_available:[],chooseOptions:function(e){for(var t=this.users_available[Math.floor(Math.random()*this.users_available.length)],s=this.users_available.map(function(e){return e.cityName}),i=[],n=0;n<s.length;n++){for(var r=0,o=0;o<i.length;o++)if(s[n]==i[o]){r=1;break}0==r&&i.push(s[n])}i=i.filter(function(e){return e!=t.cityName}),i.sort(function(e,t){return Math.random()-.5});var a=[t,t.cityName,i[0],i[1],i[2]];return window.rightAnswer=t.cityName,a},getAvailableUsers:function(){this.users_available=friends.filter(function(e){return!(!e.photo_200||0==e.city||e.photo_200.indexOf("camera_200")!=-1)})}},{question:"",users_available:[],withPhoto:!1,chooseOptions:function(e){var t=friends,s=this.users_available[Math.floor(Math.random()*this.users_available.length)];t.sort(function(e,t){return Math.random()-.5}),this.question='Кому принадлежит этот статус: "'+s.status+'" ?';var i=[s,s.first_name+" "+s.last_name,t[0].first_name+" "+t[0].last_name,t[1].first_name+" "+t[1].last_name,t[2].first_name+" "+t[2].last_name];return window.rightAnswer=s.first_name+" "+s.last_name,i},getAvailableUsers:function(){this.users_available=friends.filter(function(e){return""!=e.status})}},{question:"",users_available:[],withPhoto:!1,chooseOptions:function(e){var t=this.users_available[Math.floor(Math.random()*this.users_available.length)],s=" ";s=2==t.sex?"(-лся) ":"(-лась) ",this.question="В каком из университетов учится"+s+t.first_name+" "+t.last_name+" ?";for(var i=this.users_available.map(function(e){return e.universities[0].name}),n=[],r=0;r<i.length;r++){for(var o=0,a=0;a<n.length;a++)if(i[r]==n[a]){o=1;break}0==o&&n.push(i[r])}n=n.filter(function(e){return e!=t.universities[0].name}),n.sort(function(e,t){return Math.random()-.5});var l=[t,t.universities[0].name,n[0],n[1],n[2]];return window.rightAnswer=t.universities[0].name,l},getAvailableUsers:function(){this.users_available=friends.filter(function(e){return!(!e.universities||e.universities.lenght<1||0==e.university)})}},{quetion:"",users_available:[],withPhoto:!1,chooseOptions:function(e){var t=this.users_available[Math.floor(Math.random()*this.users_available.length)];this.question="Кто из нижеперечисленных людей учится(-лся, -лась) в "+t.universities[0].name+" ?",this.users_available=this.users_available.filter(function(e){for(var s=0;s<e.universities.length;s++)if(e.universities[s].name==t.universities[0].name)return flag=1,!1;return!0}),this.users_available.sort(function(e,t){return Math.random()-.5});var s=[t,t.first_name+" "+t.last_name,this.users_available[0].first_name+" "+this.users_available[0].last_name,this.users_available[1].first_name+" "+this.users_available[1].last_name,this.users_available[2].first_name+" "+this.users_available[2].last_name];return window.rightAnswer=t.first_name+" "+t.last_name,s},getAvailableUsers:function(){this.users_available=friends.filter(function(e){return!(!e.universities||e.universities.lenght<1||0==e.university)})}},{question:"",users_available:[],withPhoto:!0,chooseOptions:function(e){var t,s=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],i=this.users_available[Math.floor(Math.random()*this.users_available.length)];this.question="В каком месяце родился "+i.first_name+" "+i.last_name+" ?",t=i.bdate.indexOf(".")==i.bdate.lastIndexOf(".")?i.bdate.slice(i.bdate.indexOf(".")+1):i.bdate.slice(i.bdate.indexOf(".")+1,i.bdate.lastIndexOf(".")),window.rightAnswer=s[t-1],s.splice(t-1,1),s.sort(function(e,t){return Math.random()-.5});var n=[i,window.rightAnswer,s[0],s[1],s[2]];return n},getAvailableUsers:function(){this.users_available=friends.filter(function(e){return!(!e.bdate||void 0==e.photo_200||e.photo_200.indexOf("camera_200")!=-1||void 0==e.bdate)})}},{question:"",users_available:[],withPhoto:!0,chooseOptions:function(e){var t=this.users_available[Math.floor(Math.random()*this.users_available.length)],s=["Резко негативно","Негативно","Компромиссно","Нейтрально","Положительно"];this.question="Как "+t.first_name+" "+t.last_name+" относится к курению ?",window.rightAnswer=s[t.personal.smoking-1],s.splice(t.personal.smoking-1,1),s.sort(function(e,t){return Math.random()-.5});var i=[t,window.rightAnswer,s[0],s[1],s[2]];return i},getAvailableUsers:function(){this.users_available=friends.filter(function(e){return!(!e.personal||"undefined"==e.personal.smoking||!e.personal.smoking)})}},{question:"",users_available:[],withPhoto:!0,chooseOptions:function(e){var t=this.users_available[Math.floor(Math.random()*this.users_available.length)],s=["Резко негативно","Негативно","Компромиссно","Нейтрально","Положительно"];this.question="Как "+t.first_name+" "+t.last_name+" относится к алкоголю ?",window.rightAnswer=s[t.personal.alcohol-1],s.splice(t.personal.alcohol-1,1),s.sort(function(e,t){return Math.random()-.5});var i=[t,window.rightAnswer,s[0],s[1],s[2]];return i},getAvailableUsers:function(){this.users_available=friends.filter(function(e){return!(!e.personal||"undefined"==e.personal.alcohol||!e.personal.alcohol)})}},{question:"",users_available:[],withPhoto:!0,chooseOptions:function(e){var t=this.users_available[Math.floor(Math.random()*this.users_available.length)],s=["Семья и дети","Карьера и деньги","Развлечения и отдых","Наука и исследования","Совершенствование мира","Саморазвитие","Красота и искусство","Слава и влияние"];this.question="Что для "+t.first_name_gen+" "+t.last_name_gen+" главное в жизни ?",window.rightAnswer=s[t.personal.life_main-1],s.splice(t.personal.life_main-1,1),s.sort(function(e,t){return Math.random()-.5});var i=[t,window.rightAnswer,s[0],s[1],s[2]];return i},getAvailableUsers:function(){this.users_available=friends.filter(function(e){return!(!e.personal||"undefined"==e.personal.life_main||!e.personal.life_main)})}},{question:"",users_available:[],withPhoto:!0,chooseOptions:function(){var e=this.users_available[Math.floor(Math.random()*this.users_available.length)],t=[];t=1==e.sex?["Не замужем","Есть друг","Помолвлена","Замужем","Всё сложно","В активном поиске","Влюблена"]:["Не женат","Есть подруга","Помолвлен","Женат","Всё сложно","В активном поиске","Влюблён"],this.question="Семейное положение "+e.first_name_gen+" "+e.last_name_gen+" ?",window.rightAnswer=t[e.relation-1],t.splice(e.relation-1,1),t.sort(function(e,t){return Math.random()-.5});var s=[e,window.rightAnswer,t[0],t[1],t[2]];return s},getAvailableUsers:function(){this.users_available=friends.filter(function(e){return 0!=e.relation&&void 0!=e.relation})}}];