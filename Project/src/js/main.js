/**
 * Scroll Top
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler ○ gmail • com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.3
 */
;(function(f){"use strict";"function"===typeof define&&define.amd?define(["jquery"],f):"undefined"!==typeof module&&module.exports?module.exports=f(require("jquery")):f(jQuery)})(function($){"use strict";function n(a){return!a.nodeName||-1!==$.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])}function h(a){return $.isFunction(a)||$.isPlainObject(a)?a:{top:a,left:a}}var p=$.scrollTo=function(a,d,b){return $(window).scrollTo(a,d,b)};p.defaults={axis:"xy",duration:0,limit:!0};$.fn.scrollTo=function(a,d,b){"object"=== typeof d&&(b=d,d=0);"function"===typeof b&&(b={onAfter:b});"max"===a&&(a=9E9);b=$.extend({},p.defaults,b);d=d||b.duration;var u=b.queue&&1<b.axis.length;u&&(d/=2);b.offset=h(b.offset);b.over=h(b.over);return this.each(function(){function k(a){var k=$.extend({},b,{queue:!0,duration:d,complete:a&&function(){a.call(q,e,b)}});r.animate(f,k)}if(null!==a){var l=n(this),q=l?this.contentWindow||window:this,r=$(q),e=a,f={},t;switch(typeof e){case "number":case "string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)){e= h(e);break}e=l?$(e):$(e,q);case "object":if(e.length===0)return;if(e.is||e.style)t=(e=$(e)).offset()}var v=$.isFunction(b.offset)&&b.offset(q,e)||b.offset;$.each(b.axis.split(""),function(a,c){var d="x"===c?"Left":"Top",m=d.toLowerCase(),g="scroll"+d,h=r[g](),n=p.max(q,c);t?(f[g]=t[m]+(l?0:h-r.offset()[m]),b.margin&&(f[g]-=parseInt(e.css("margin"+d),10)||0,f[g]-=parseInt(e.css("border"+d+"Width"),10)||0),f[g]+=v[m]||0,b.over[m]&&(f[g]+=e["x"===c?"width":"height"]()*b.over[m])):(d=e[m],f[g]=d.slice&& "%"===d.slice(-1)?parseFloat(d)/100*n:d);b.limit&&/^\d+$/.test(f[g])&&(f[g]=0>=f[g]?0:Math.min(f[g],n));!a&&1<b.axis.length&&(h===f[g]?f={}:u&&(k(b.onAfterFirst),f={}))});k(b.onAfter)}})};p.max=function(a,d){var b="x"===d?"Width":"Height",h="scroll"+b;if(!n(a))return a[h]-$(a)[b.toLowerCase()]();var b="client"+b,k=a.ownerDocument||a.document,l=k.documentElement,k=k.body;return Math.max(l[h],k[h])-Math.min(l[b],k[b])};$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(a){return $(a.elem)[a.prop]()}, set:function(a){var d=this.get(a);if(a.options.interrupt&&a._last&&a._last!==d)return $(a.elem).stop();var b=Math.round(a.now);d!==b&&($(a.elem)[a.prop](b),a._last=this.get(a))}};return p});


/*************************************************************************/
/*************************************************************************/
/************************** AS VK IFRAME APP *****************************/
/*************************************************************************/
/*************************************************************************/

/*
function VKApp() {

 	this.updateHeight = function() {
		if (parent.frames.length >= 1) {
			var real_height = document.getElementById('body').clientHeight; 
			VK.callMethod('resizeWindow', 800, real_height);
		}
	}	

}
window.vkapp = new VKApp();
*/

/*************************************************************************/
/*************************************************************************/
/****************************** VARIABLES ********************************/
/*************************************************************************/
/*************************************************************************/

var config = {
	selectors: {
		openButton: ".openButton",
		betaErrorList: ".beta-errorsList",
		betaFirstScreen: ".beta-firstScreen",
		startButton: ".startButton",
		quiz: ".quiz",
		questionBlock: ".question",
		question__text: ".question__text",
		question__properties: ".question__properties",
		question__answers: ".question__answers",
		question__answer: ".question__answer",
		question__img: ".question__img"
	},
	gameTimeOut: 90000
};

var userObj;
var friends;
var stringOfUserIDs;
var questionNumbersToSelect = [];

window.game = {};
window.game.score = 0;
window.gui = new GUI();
window.db = new Database();
window.logger = new Logger();
window.logger.turnLoggerOff();

var startButton = $(config.selectors.startButton);
var questionBlock = $(config.selectors.questionBlock);
var openButton = $(config.selectors.openButton);


/*************************************************************************/
/*************************************************************************/
/****************************** FIRST USE ********************************/
/*************************************************************************/
/*************************************************************************/

window.gui.prepareDrawUsersRate();

/*************************************************************************/
/*************************************************************************/
/************************** SOCIAL BUTTONS *******************************/
/*************************************************************************/
/*************************************************************************/



/*************************************************************************/
/*************************************************************************/
/*************************** Logger **************************************/
/*************************************************************************/
/*************************************************************************/

function Logger(){
	var loggerFlag = 0;

	this.turnLoggerOn = function(){
		loggerFlag = 1;
	}

	this.turnLoggerOff = function(){
		loggerFlag = 0;
	}

	this.log = function(data){
		if (loggerFlag){
			console.log(data);
			return true;
		} else {
			return false;
		}
	}
}

/*************************************************************************/
/*************************************************************************/
/************************* EVENT LISTENERS *******************************/
/*************************************************************************/
/*************************************************************************/

openButton.click(function(e) {

	var betaFirstScreen = $(config.selectors.betaFirstScreen);
	betaFirstScreen.addClass("hidden");

	e.preventDefault();
	return false;
});

startButton.click(function(e) {

	if (!startButton.hasClass('disabled')) {
		// first time start game

		startButton.addClass("disabled");

		friends = [];

		startButton.text("Заново");

		VK.Auth.login(function(response){
			if (response.session){
				userObj = response.session;

				ga('send', {
	                hitType: 'event',
	                eventCategory: 'Game Buttons',
	                eventAction: 'Start Button',
	                eventLabel: response.session.user.first_name 
						+ " " 
						+ response.session.user.last_name 
						+ " (" + response.session.mid 
						+ ")" 
	            });
	            localStorage.setItem('name', userObj.user.first_name);
	            localStorage.setItem('vk_id', userObj.mid);

				//console.log(response.session);
				getFriendsIDs();			
				if (response.settings){
					//console.log(response.settings);
				}
			} else {
				console.log("login err");
			}
		});	

	} else {
		// restart game

		
		window.game.timer.clrInterval();
		window.game = {};
		window.game.score = 0;

		makeNewQuestion();

		$(window).scrollTo(".quiz", {duration: 500});

		$(config.selectors.questionBlock).removeClass('hidden');
		$('.questionWrap__results.gameResult').addClass('hidden');
		window.gui.updatePoints();
		window.gui.startGame();
		window.game.timer = new Timer();
		window.game.timer.start();
	}

	e.stopPropagation();
	e.preventDefault();
	return false;
});

function addListenersToOptions(){
	var options = $(config.selectors.question__answer);

	options.each(function(index) {
		$(this).click(function(){
			if ($(this).text().indexOf(window.rightAnswer) != -1){
				$(this).addClass("right");
				window.game.score += 10;
				window.gui.updatePoints();

				if ($(".question__answer.wrong").length == 0) {
					window.game.timer.addTime();
				}

				makeNewQuestion();

			} else {
				$(this).addClass("wrong");
				window.game.score -= 5;
				window.game.timer.substractTime();
				window.gui.updatePoints();
			}
		})
	});
}

/*************************************************************************/
/*************************************************************************/
/***************************** VK GET DATA *******************************/
/*************************************************************************/
/*************************************************************************/

function getFriendsIDs(){
	VK.Api.call('friends.get', {
			user_id: userObj.mid,
			version: "5.53"
	}, function(r){
		if (r.response){
			friends = r.response;
			stringOfUserIDs = friends.join();
			getFriendsInfo();
		}
		if (r.error){
			console.log(r.error);
		}
	});
}

function getFriendsInfo(){
	VK.Api.call('users.get', {
		user_ids: stringOfUserIDs,
		fields: "bdate,city,photo_200,relation,education,universities,schools,status,followers_count,sex,followers_count,personal,first_name_gen,last_name_gen,relation",
		version: "5.53"
	}, function(r){
		if (r.response){
			friends = r.response;
			friends = friends.filter(function(tempUser){
				if (tempUser.deactivated == "deleted") {
					return false;
				} else {
					return true;
				}
			});

			stringOfUsersCitiesIDs = friends.map(function(obj) {
				return obj.city;
			}).join();
			getFriendsCities();	
		}
		if (r.error){
			console.log(r.error);
		}
	});
}

function getFriendsCities() {
	VK.Api.call('database.getCitiesById', {
		city_ids: stringOfUsersCitiesIDs,
		version: "5.53"
	}, function(r){
		if (r.response){
			var cities = r.response;

			for (var i = 0; i < friends.length; i++) {

				var cityId = friends[i].city;

				for (var j = 0; j < cities.length; j++) {
					if (cityId == cities[j].cid) {
						friends[i].cityName = cities[j].name;
					}
				}

			}

			makeNewQuestion();

			window.gui.startGame();

			window.game.timer = new Timer();
			window.game.timer.start();
		}
		if (r.error){
			console.log(r.error);
		}
	});
}

/*************************************************************************/
/*************************************************************************/
/***************************** GAME LOGIC ********************************/
/*************************************************************************/
/*************************************************************************/

// Выборка вопросов

var right_answer_sex;  

var quiz = [
	{
		// [0]
		question: "Кто из ваших друзей изображен на этом фото?",
		withPhoto: true,
		users_available: [],
		chooseOptions: function(num){
			if (num > this.users_available.length) return [];

			// M -> 2, Ж -> 1
			var randomSex = Math.ceil(Math.random() * 2);

			// Что делать если мало друзей такого пола ?
			this.users_available = this.users_available.filter(function(tempUser){
				if (tempUser.sex != randomSex){
					return false;
				} else {
					return true;
				}
			});

			this.users_available.sort(function(a, b) {
				return Math.random() - 0.5;
			});	

			window.rightAnswer = this.users_available[0].first_name + " " + this.users_available[0].last_name;

			var result = [
				this.users_available[0],
				window.rightAnswer,
				this.users_available[1].first_name + " " + this.users_available[1].last_name,
				this.users_available[2].first_name + " " + this.users_available[2].last_name,
				this.users_available[3].first_name + " " + this.users_available[3].last_name
			];

			return result; 
		},
		getAvailableUsers: function(){
			this.users_available = friends.filter(function(tempUser){
				if ((!tempUser.photo_200) || (tempUser.photo_200.indexOf("camera_200") != -1)) {
					return false;
				} else {
					return true;
				}
			}); 	
		}	
	},
	{
		// [1]
		question: "Из какого города человек, изображенный на фото?",
		withPhoto: true,
		users_available: [],
		chooseOptions: function(num){
			var randomUser = this.users_available[Math.floor(Math.random() * this.users_available.length)];

			var cities = this.users_available.map(function(obj) {
				return obj.cityName;
			});

			var citiesWithoutDuplicates = [];
			for (var i = 0; i < cities.length; i++) {
				var fl = 0;

				for (var j = 0; j < citiesWithoutDuplicates.length; j++) {
					if (cities[i] == citiesWithoutDuplicates[j]) {
						fl = 1;
						break;	
					} 
				}

				if (fl == 0) {
					citiesWithoutDuplicates.push(cities[i]);
				}
			}

			citiesWithoutDuplicates = citiesWithoutDuplicates.filter(function(tempCity){
				if (tempCity == randomUser.cityName){
					return false;
				} else {
					return true;
				}
			})

			citiesWithoutDuplicates.sort(function(a, b) {
				return Math.random() - 0.5;
			});	

			var result = [
				randomUser,
				randomUser.cityName,
				citiesWithoutDuplicates[0],
				citiesWithoutDuplicates[1],
				citiesWithoutDuplicates[2]
			];

			window.rightAnswer = randomUser.cityName;

			return result; 
		},
		getAvailableUsers: function(){
			this.users_available = friends.filter(function(tempUser){
				// undefined ?
				if ((!tempUser.photo_200) || (tempUser.city == 0) ||  (tempUser.photo_200.indexOf("camera_200") != -1 )) {
					return false;
				} else {
					return true;
				}
			});
		}
	},
	{
		// [2]
		// Вопрос о статусе
		question: "",
		users_available: [],
		withPhoto: false,
		chooseOptions: function(num){
			var tempFriends = friends;
			
			var randomUser = this.users_available[Math.floor(Math.random() * this.users_available.length)];

			tempFriends.sort(function(a, b) {
				return Math.random() - 0.5;
			});

			// Дополняем вопрос
			this.question = 'Кому принадлежит этот статус: "' + randomUser.status + '" ?';

			var result = [
				randomUser,
				randomUser.first_name + " " + randomUser.last_name,
				tempFriends[0].first_name + " " + tempFriends[0].last_name,
				tempFriends[1].first_name + " " + tempFriends[1].last_name,
				tempFriends[2].first_name + " " + tempFriends[2].last_name
			];

			window.rightAnswer = randomUser.first_name + " " + randomUser.last_name;

			return result;
		},
		getAvailableUsers: function(){
			this.users_available = friends.filter(function(obj){
				if (obj.status == ""){
					return false;
				} else {
					return true;
				}
			});
		},
	},
	{
		// [3]
		question: "",
		users_available: [],
		withPhoto: false,
		chooseOptions: function(num){
			var randomUser = this.users_available[Math.floor(Math.random() * this.users_available.length)];
			var endOfWord = ' ';
			// Генерируем вопрос
			if (randomUser.sex == 2){
				endOfWord = "(-лся) ";
			} else {
				endOfWord = "(-лась) ";
			}

			this.question = "В каком из университетов учится" + endOfWord + randomUser.first_name + " " + randomUser.last_name + " ?";

			var universities = this.users_available.map(function(obj) {
				return obj.universities[0].name;
			});

			var universitiesWithoutDuplicates = [];
			for (var i = 0; i < universities.length; i++) {
				var fl = 0;

				for (var j = 0; j < universitiesWithoutDuplicates.length; j++) {
					if (universities[i] == universitiesWithoutDuplicates[j]) {
						fl = 1;
						break;	
					} 
				}

				if (fl == 0) {
					universitiesWithoutDuplicates.push(universities[i]);
				}
			}

			universitiesWithoutDuplicates = universitiesWithoutDuplicates.filter(function(tempUniversity){
				if (tempUniversity == randomUser.universities[0].name){
					return false;
				} else {
					return true;
				}
			})

			universitiesWithoutDuplicates.sort(function(a, b) {
				return Math.random() - 0.5;
			});

			var result = [
				randomUser,
				randomUser.universities[0].name,
				universitiesWithoutDuplicates[0],
				universitiesWithoutDuplicates[1],
				universitiesWithoutDuplicates[2]
			];

			window.rightAnswer = randomUser.universities[0].name;

			return result;
		},
		getAvailableUsers: function(){
			// Выкидываем тех, у кого поле universities пустое или отсутствует вовсе
			this.users_available = friends.filter(function(obj){
				if ((!obj.universities) || (obj.universities.lenght < 1) || (obj.university == 0)){
					return false;
				} else {
					return true;
				}
			});
		}
	},
	{
		// [4]
		quetion: "",
		users_available: [],
		withPhoto: false,
		chooseOptions: function(num){
			var randomUser = this.users_available[Math.floor(Math.random() * this.users_available.length)];
			var endOfWord = ' '
			// Генерируем вопрос
			this.question = "Кто из нижеперечисленных людей учится(-лся, -лась) в " + randomUser.universities[0].name + " ?";

			// Удаляем юзеров, которые учились в том же универе, что и выбранный
			this.users_available = this.users_available.filter(function(obj){
				for (var i = 0; i<obj.universities.length; i++){
					if (obj.universities[i].name == randomUser.universities[0].name){
						flag = 1;
						return false;
					}
				}
				return true;
			});

			// Перемешиваем массив
			this.users_available.sort(function(a, b) {
				return Math.random() - 0.5;
			});

			var result = [
				randomUser,
				randomUser.first_name + " " + randomUser.last_name,
				this.users_available[0].first_name + " " + this.users_available[0].last_name,
				this.users_available[1].first_name + " " + this.users_available[1].last_name,
				this.users_available[2].first_name + " " + this.users_available[2].last_name,
			];

			window.rightAnswer = randomUser.first_name + " " + randomUser.last_name;

			return result;
		},
		getAvailableUsers: function(){
			this.users_available = friends.filter(function(obj){
				if ((!obj.universities) || (obj.universities.lenght < 1) || (obj.university == 0)){
					return false;
				} else {
					return true;
				}
			});
		}
	},
	{
		// [5]
		question: "",
		users_available: [],
		withPhoto: true,
		chooseOptions: function(num){
			var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
			var randomUser = this.users_available[Math.floor(Math.random() * this.users_available.length)];
			var monthNumber;
			// Генерируем вопрос
			this.question = "В каком месяце родился " + randomUser.first_name + " " + randomUser.last_name + " ?";

			// Отделяем номер месяца из даты
			if (randomUser.bdate.indexOf(".") == randomUser.bdate.lastIndexOf(".")) { // если дата в формате XX.YY с одной точкой
				monthNumber = randomUser.bdate.slice(randomUser.bdate.indexOf(".") + 1);
			} else { // если формат с двумя точками XX.YY.ZZZZ
				monthNumber = randomUser.bdate.slice(randomUser.bdate.indexOf(".") + 1, randomUser.bdate.lastIndexOf("."));
			};

			window.rightAnswer = months[monthNumber - 1];

			months.splice(monthNumber - 1, 1);

			// Перемешиваем массив
			months.sort(function(a, b) {
				return Math.random() - 0.5;
			});

			var result = [
				randomUser,
				window.rightAnswer,
				months[0],
				months[1],
				months[2]
			];

			return result;
		},
		getAvailableUsers: function(){
			this.users_available = friends.filter(function(tempUser){
				if ((!tempUser.bdate) || (tempUser.photo_200==undefined) || (tempUser.photo_200.indexOf("camera_200") != -1 ) || (tempUser.bdate==undefined)){
					return false;
				} else {
					return true;
				}
			});
		}
	},
	{
		// [6]
		question: "",
		users_available: [],
		withPhoto: true,
		chooseOptions: function(num){
			var randomUser = this.users_available[Math.floor(Math.random() * this.users_available.length)];
			var opinions = ["Резко негативно", "Негативно", "Компромиссно", "Нейтрально", "Положительно"];

			// Генерируем вопрос
			this.question = "Как " + randomUser.first_name + " " + randomUser.last_name + " относится к курению ?";

			window.rightAnswer = opinions[randomUser.personal.smoking - 1];

			opinions.splice(randomUser.personal.smoking - 1, 1);

			// Перемешиваем массив
			opinions.sort(function(a, b) {
				return Math.random() - 0.5;
			});

			var result = [
				randomUser,
				window.rightAnswer,
				opinions[0],
				opinions[1],
				opinions[2]
			];

			return result;
		},
		getAvailableUsers: function(){
			this.users_available = friends.filter(function(tempUser){
				if ((!tempUser.personal) || (tempUser.personal.smoking == "undefined") || (!tempUser.personal.smoking)){
					return false;
				} else {
					return true;
				}
			});
		}
	},
	{
		// [7]
		question: "",
		users_available: [],
		withPhoto: true,
		chooseOptions: function(num){
			var randomUser = this.users_available[Math.floor(Math.random() * this.users_available.length)];
			var opinions = ["Резко негативно", "Негативно", "Компромиссно", "Нейтрально", "Положительно"];

			// Генерируем вопрос
			this.question = "Как " + randomUser.first_name + " " + randomUser.last_name + " относится к алкоголю ?";

			window.rightAnswer = opinions[randomUser.personal.alcohol - 1];

			//console.log(randomUser);
			//console.log(window.rightAnswer);

			opinions.splice(randomUser.personal.alcohol - 1, 1);

			//console.log(opinions);

			// Перемешиваем массив
			opinions.sort(function(a, b) {
				return Math.random() - 0.5;
			});

			var result = [
				randomUser,
				window.rightAnswer,
				opinions[0],
				opinions[1],
				opinions[2]
			];

			return result;
		},
		getAvailableUsers: function(){
			this.users_available = friends.filter(function(tempUser){
				if ((!tempUser.personal) || (tempUser.personal.alcohol == "undefined") || (!tempUser.personal.alcohol)){
					return false;
				} else {
					return true;
				}
			});
		}
	},
	{
		// [8]
		question: "",
		users_available: [],
		withPhoto: true,
		chooseOptions: function(num){
			var randomUser = this.users_available[Math.floor(Math.random() * this.users_available.length)];
			var opinions = ["Семья и дети", "Карьера и деньги", "Развлечения и отдых", "Наука и исследования", "Совершенствование мира", "Саморазвитие", "Красота и искусство", "Слава и влияние"];

			// Генерируем вопрос
			this.question = "Что для " + randomUser.first_name_gen + " " + randomUser.last_name_gen + " главное в жизни ?";

			window.rightAnswer = opinions[randomUser.personal.life_main - 1];

			opinions.splice(randomUser.personal.life_main - 1, 1);

			// Перемешиваем массив
			opinions.sort(function(a, b) {
				return Math.random() - 0.5;
			});

			var result = [
				randomUser,
				window.rightAnswer,
				opinions[0],
				opinions[1],
				opinions[2]
			];

			return result;
		},
		getAvailableUsers: function(){
			this.users_available = friends.filter(function(tempUser){
				if ((!tempUser.personal) || (tempUser.personal.life_main == "undefined") || (!tempUser.personal.life_main)){
					return false;
				} else {
					return true;
				}
			});
		}
	},
	{
		// [9]
		question: "",
		users_available: [],
		withPhoto: true,
		chooseOptions: function(){
			var randomUser = this.users_available[Math.floor(Math.random() * this.users_available.length)];
			var opinions = [];
			if (randomUser.sex == 1){
				opinions = ["Не замужем", "Есть друг", "Помолвлена", "Замужем", "Всё сложно", "В активном поиске", "Влюблена"];
			} else {
				opinions = ["Не женат", "Есть подруга", "Помолвлен", "Женат", "Всё сложно", "В активном поиске", "Влюблён"];
			}

			this.question = "Семейное положение " + randomUser.first_name_gen + " " + randomUser.last_name_gen + " ?";

			window.rightAnswer = opinions[randomUser.relation - 1];

			opinions.splice(randomUser.relation - 1, 1);

			// Перемешиваем массив
			opinions.sort(function(a, b) {
				return Math.random() - 0.5;
			});

			var result = [
				randomUser,
				window.rightAnswer,
				opinions[0],
				opinions[1],
				opinions[2]
			];

			return result;
		},
		getAvailableUsers: function(){
			this.users_available = friends.filter(function(tempUser){	
				if ((tempUser.relation == 0) || (tempUser.relation == undefined)){
					return false
				} else {
					return true;
				}
			});
		}
	}
]

function getNumberOfQuestion(){
	if (questionNumbersToSelect.length == 0){
		for (var i = 0; i<quiz.length; i++){
			questionNumbersToSelect[i] = i;
		}
	}

	var randomSelect = Math.round(Math.random() * (questionNumbersToSelect.length - 1));
	var returnValue = questionNumbersToSelect[randomSelect];
	questionNumbersToSelect.splice(randomSelect, 1);

	return returnValue;
}

function makeNewQuestion(){
	var questionObj = quiz[getNumberOfQuestion()];
	questionObj.getAvailableUsers();
	var options = questionObj.chooseOptions(config.quiz_options);
	//console.log(options);
	var rightAnswerUser = options[1];
	var rightUser = options[0];

	options = options.slice(1);
	function compareRandom(a, b){
		return Math.random() - 0.5;
	}
	options.sort(compareRandom);

	// Добавляем вопрос
	$(config.selectors.question__text).html(questionObj.question);
	
	$(config.selectors.question__properties).html("");
	// Добавляем изображение, если нужно
	if (questionObj.withPhoto) {
		$(config.selectors.question__properties).html($(config.selectors.question__properties).html() + '<div class="question__image"><img src=\'' + rightUser.photo_200 + '\' class="question__img" width="200px" height="200px" alt="Quiz Question Image"></div>');
	}
	// Варианты ответа
	$(config.selectors.question__properties).html($(config.selectors.question__properties).html() + "<div class='question__answers clearfix'>");
	for (var i = 0; i < options.length; i++){
		$(config.selectors.question__answers).html($(config.selectors.question__answers).html() + "<div class=" + config.selectors.question__answer.substr(1) + ">" + options[i] + "</div>");
	}
	$(config.selectors.question__properties).html($(config.selectors.question__properties).html() + "</div>");
	addListenersToOptions();
	delete questionObj.users_available;
}

/*************************************************************************/
/*************************************************************************/
/***************************** TIMER CLASS *******************************/
/*************************************************************************/
/*************************************************************************/

function Timer() {

	var timer, gameTime = 0, gameTimeMax = config.gameTimeOut, self = this;

	this.start = function() {
		timer = setInterval(function() {
			gameTime += 1000;
			window.gui.updateTimer();

			//console.log(gameTime + " " + gameTimeMax);
			if (gameTime >= gameTimeMax) {
				self.end();
			}
		}, 1000, self);
	}

	this.end = function() {
		window.gui.endGame();
		clearInterval(timer);
	}

	this.clrInterval = function(){
		clearInterval(timer);
	}

	this.getSecondsLeft = function() {
		return (gameTimeMax - gameTime) / 1000;
	}

	this.addTime = function() {
		gameTime -= 2000;
		window.gui.updateTimer();
		//console.log(gameTime);
	}

	this.substractTime = function() {
		gameTime += 1000;
		window.gui.updateTimer();
		//console.log(gameTime);
	}

}

/*************************************************************************/
/*************************************************************************/
/***************************** GUI CLASS *********************************/
/*************************************************************************/
/*************************************************************************/

function GUI() {

	this.updateTimer = function() {
		onlineSeconds.innerHTML = window.game.timer.getSecondsLeft();
	};

	this.updatePoints = function() {
		onlinePoints.innerHTML = window.game.score;
	}

	this.startGame = function() {
		$(config.selectors.quiz).removeClass('hidden');
		$(window).scrollTo(".quiz", {duration: 500});
		//window.vkapp.updateHeight();
	}

	this.endGame = function() {
		$(config.selectors.questionBlock).addClass('hidden');
		gameResult.innerHTML = window.game.score;
		$(".gameResult").removeClass('hidden');
		//window.vkapp.updateHeight();

		window.db.addRecord({
			name: userObj.user.first_name,
			surname: userObj.user.last_name,
			id: userObj.mid,
			score: window.game.score
		}, window.db.getFirstRecordsJSON);
	}

	this.updateTopList = function(data){
		var winners = $(".winners");
		var str = '<tr class="tableHead"><th>№</th><th>Имя</th><th>Оценка</th></tr>';

		for (var i = 0; i<data.length; i++){
			str += "<tr><td class ='number'>"+(i+1)
				+"</td><td class='name'><a href='https://vk.com/id"+data[i]["vk_id"]
				+"' target = '_blank'>"+data[i]["first_name"]+" "+data[i]["last_name"]
				+"</a></td><td class='points'>"+data[i]["points"]+"</td></tr>";
		}

		winners.html(str);

		window.gui.prepareDrawUsersRate();
	}

	this.prepareDrawUsersRate = function(){
		var userResultHeader = $(".userResult__header");
		var userResultMain = $(".userResult__main");

		if (localStorage.getItem('vk_id')){
			var str = "Привет, " + localStorage.getItem('name') 
			+ "!<br>Это твой лучший результат в рейтинге!";
			userResultHeader.html(str);

			// Search neibours for user in the table
			window.db.getNearbyRecords(localStorage.getItem('vk_id'), window.gui.drawUsersRate);
		} else {
			var str = "Здесь может быть твое имя!" 
			+ "<br>Соревнуйся за звание лучшего друга планеты!";
			userResultHeader.html(str);
			str = "<div class='row'><div class='userResult__fakeImage'><img src='img/vkQuizTable.png'></div></div>";
			userResultMain.html(str);
		}
	}

	this.drawUsersRate = function(loginnedUser){
		var usersRate = $(".userResult__main");
		var str = '<div class="row"><div class="userMark col-sm-4"><div class="mark">'
		+loginnedUser.neighbors[loginnedUser.currentIndex].points+'</div>баллов</div>'
		+'<div class="userRate col-sm-8"><table class="rate__table userRateTable">';
		var setClass;

		for (var i = 0; i < loginnedUser.neighbors.length; i++){
			if (!loginnedUser.neighbors[i]){
				continue;
			}
			if (i == loginnedUser.currentIndex){
				setClass = "class='currentUser'";
			} else {
				setClass = '';
			}

			str += '<tr '+setClass+'><td class="number">'+loginnedUser.neighborsNums[i]
			+'</td><td class="name">'
			+'<a href="https://vk.com/id'+loginnedUser.neighbors[i].vk_id+'" target = "_blank">'
			+loginnedUser.neighbors[i].first_name+' '+loginnedUser.neighbors[i].last_name
			+'</a></td><td class="points">'+loginnedUser.neighbors[i].points+'</td></tr>';
		}

		str += '</table></div></div>';
		logger.log(str);
		logger.log("BATYA");
		usersRate.html(str);
	}

}

/*************************************************************************/
/*************************************************************************/
/************************** DATABASE CLASS *******************************/
/*************************************************************************/
/*************************************************************************/

function Database() {

	// All records
	this.getRecords = function() {
		$.post("php/addRecordAction.php", {
			typeOfActivity: "getRecordsJSONAct"
		} , function( data ) {
	  		//console.log(data);
		}, "json");

		sendPostRequest("php/addRecordAction.php", {
			typeOfActivity: "getRecordsJSONAct"
		});
	}

	this.addRecord = function(obj, getFirstRecordsJSON) {
		logger.log("addRecordBeforePost");
		$.post("php/addRecordAction.php", {
			typeOfActivity: "addRecordAct",
			first_name: obj.name,
			last_name: obj.surname,
			vk_id: obj.id,
			points: obj.score
		}, function(){
			logger.log("addRecord");
			if (typeof(getFirstRecordsJSON) == 'function'){
				logger.log("addRecordINIF");
				getFirstRecordsJSON(10, window.gui.updateTopList);
			}
		});
	}

	// TOP {X} records
	this.getFirstRecordsJSON = function(counter, updateUI) {
		$.post("php/addRecordAction.php", {
			typeOfActivity: "getFirstRecordsJSONAct",
			count: counter
		}, function(data){
			logger.log("getFirstRecordsJSON");
			if (typeof(updateUI) == 'function'){
				updateUI(data);
				logger.log("getFirstRecordsJSONINIF");
			}
		}, "json");
	}

	// Neighbors in DB
	this.getNearbyRecords = function(vk_id, drawUsersRate){
		$.post("php/addRecordAction.php", {
			typeOfActivity: "getRecordsJSONAct"
		}, function(data){
			if (typeof(drawUsersRate) == 'function'){
				var loginnedUser = {
					neighbors: [],
					currentIndex: 0,
					neighborsNums: []
				};
				for (var i = 0; i<data.length; i++){
					// Finding loginned user in database
					if (data[i].vk_id == vk_id){
						if (i == 0){
							// if this user FIRST
							loginnedUser.neighbors.push(data[i], data[i+1], data[i+2]);
							loginnedUser.neighborsNums.push(i+1, i+2, i+3);
							loginnedUser.currentIndex = 0;
						} else if (i == data.length - 1){
							// if this user LAST
							loginnedUser.neighbors.push(data[i-2], data[i-1], data[i]);
							loginnedUser.neighborsNums.push(i-1, i, i+1);
							loginnedUser.currentIndex = 2;
						} else { 
							// Middle of the database
							loginnedUser.neighbors.push(data[i-1], data[i], data[i+1]);
							loginnedUser.neighborsNums.push(i, i+1, i+2);
							loginnedUser.currentIndex = 1;
						}
						break;
					}
				}
				drawUsersRate(loginnedUser);
			}
		}, "json");
	}

	// Send user info to php
	this.sendUserInfo = function() {
		$.post("php/addRecordAction.php", {
			typeOfActivity: "sendUserInfoAct",
			vk_id: userObj.mid
		});
	}

}