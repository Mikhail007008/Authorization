'use strict';

const userName = document.getElementById('username'),
	registerButton = document.getElementById('registerUser'),
	loginButton = document.getElementById('login'),
	ulList = document.getElementById('list'),
	hello = document.getElementById('username');

let mass = [];

const getStor = () =>{
	let info = JSON.parse(localStorage.getItem('user'));
	if(info){mass = info;}
};
getStor();

const json = () =>{
	let json = JSON.stringify(mass);
	localStorage.user = json;
};

const foo = () =>{
	ulList.textContent = '';
	mass.forEach((user, index)=>{
		let inp = document.createElement('li');

		inp.innerHTML = `Имя: ${user.firstname}, Фамилия: ${user.lastname}, зарегестрирован: ${user.regDate} 
		<button>х</button> <br></br>`;

		ulList.appendChild(inp);

		const btnDel = inp.querySelector('button');

		btnDel.addEventListener('click', ()=>{
			mass.splice(index, 1);
			json();
			foo();
		});
	});
};

registerButton.addEventListener('click', () =>{
	let user = {},
		name = prompt('Введите через пробел Имя и Фамилию');

	if(name.match(/ {2,}/)){
		alert('Некорректное Имя и Фамилия');
	} 

	let login = prompt('Введите логин');
	let pass = prompt('Введите пароль');

	const nameSplit = name.split(' '),
		options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		};

	user.firstname = nameSplit[0];
	user.lastname = nameSplit[1];
	user.login = login;
	user.password = pass;
	user.regDate = new Date().toLocaleString("ru", options);

	mass.push(user);

	json();
	foo();
});

loginButton.addEventListener('click', () =>{
	getStor();

	let login = prompt('Введите логин'),
		trueLogin = mass.find(item=>item.login === login);

	if(trueLogin){	
		let password = prompt('Введите пароль');

		if(trueLogin.password === password){hello.textContent = trueLogin.firstname;
		}else{alert('Пароль не верный');}

	}else{alert('Пользователь не найден');}
});

foo();

