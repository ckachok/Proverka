const keys = document.querySelectorAll('#piano-key');
const piano = document.getElementById('piano');
const modeSwitch = document.querySelector('.btn-container');
const modes = document.querySelectorAll('.btn-notes, .btn-letters');
const buttonFullscreen = document.querySelector('.fullscreen');
let keyPressed = false;

const soundsNote = {
    a: new Audio('assets/audio/a.mp3'),
    'a♯': new Audio('assets/audio/a♯.mp3'),
    b: new Audio('assets/audio/b.mp3'),
    c: new Audio('assets/audio/c.mp3'),
    'c♯': new Audio('assets/audio/c♯.mp3'),
    d: new Audio('assets/audio/d.mp3'),
    'd♯': new Audio('assets/audio/d♯.mp3'),
    e: new Audio('assets/audio/e.mp3'),
    f: new Audio('assets/audio/f.mp3'),
    'f♯': new Audio('assets/audio/f♯.mp3'),
    g: new Audio('assets/audio/g.mp3'),
    'g♯': new Audio('assets/audio/g♯.mp3')
};

function addAnimationKey(event) {   //добавляет анимацию для клавиши пианино
    event.classList.add('piano-key-active');
}

function removeAnimationKey(event) {   //отключает анимацию клавиш 
    if (isMouseMovement(event)) {
        event.target.classList.remove('piano-key-active');
    } else {
        event.classList.remove('piano-key-active');
    }
}

function isKeyboardKeyPressed() {   //проверяет зажата ли клавиша клавиатуры
    return keyPressed;
}

function isMouseMovement(event) {   //проверяет есть ли движение мыши
    return (event.type === 'mouseover' || event.type === 'mouseout');
}

function playSound(event) {   //проигрывает ноту и запускает анимацию для соответствующей клавиши пианино
    if (isMouseMovement(event)) {
        addAnimationKey(event.target);
        soundsNote[event.target.dataset.note].currentTime = 0;
        soundsNote[event.target.dataset.note].play();
    } else {
        addAnimationKey(event);
        soundsNote[event.dataset.note].currentTime = 0;
        soundsNote[event.dataset.note].play();
    }
}

// ВЗАИМОДЕЙСТВИЕ ПО КЛИКУ МЫШИ

function startIteratingOverKeys(event) {   //запускает действия при нажатии на кнопку мышки или переборе клавиш писанино при зажатой кнопке
    if (event.target.classList.contains('piano-key')) {
        playSound(event.target);
    }

    keys.forEach((key) => {
        key.addEventListener('mouseover', playSound);
        key.addEventListener('mouseout', removeAnimationKey);      
    });
}

function stopIteratingOverKeys(event) {   //запускает действия при отпускании кнопки мыши или прекращении перебора клавиш
    keys.forEach((key) => {
        if (isKeyboardKeyPressed) {
            removeAnimationKey(event.target);
            key.removeEventListener('mouseover', playSound);
            key.removeEventListener('mouseout', removeAnimationKey);
        } else {
            removeAnimationKey(key);
            key.removeEventListener('mouseover', playSound);
            key.removeEventListener('mouseout', removeAnimationKey);
        }
    })
}

piano.addEventListener('mousedown', startIteratingOverKeys, false);
document.addEventListener('mouseup', stopIteratingOverKeys);

// ВЗАИМОДЕЙСТВИЕ ПО КЛАВИАТУРЕ

function interactWithKeyboardKey(event) {   //запускает действия при нажатии или отпускании клавиш клавиатуры
    const letter = document.querySelector(`[data-letter='${event.code.slice(3)}']`);   //находит клавишу пианино, связанную с нажатой клавишей клавиатуры
    if (event.repeat || !letter) {
        keyPressed = true;
        return;
    }
    if (event.type === 'keydown') {
        playSound(letter);
    } else {
        removeAnimationKey(letter);
        keyPressed = false;
    }
}

document.addEventListener('keydown', interactWithKeyboardKey);
document.addEventListener('keyup', interactWithKeyboardKey);

// ПЕРЕКЛЮЧЕНИЕ ПОДПИСЕЙ КЛАВИШ ПИАНИНО С НОТ НА БУКВЫ

function changeNotesToLetters(event) {   //изменяет подписи клавиш с нот на буквы или обратно
    if (event.target.classList.contains('btn-active')) return;
    
    modes.forEach((elem) => {
        elem.classList.remove('btn-active');
        event.target.classList.add('btn-active');
    })
    keys.forEach((elem) => {
        elem.classList.toggle('piano-key-letter');
    })
}

modeSwitch.addEventListener('click', changeNotesToLetters);

// ПЕРЕКЛЮЧЕНИЕ ПРИЛОЖЕНИЯ В ПОЛНОЭКРАННЫЙ РЕЖИМ

function changeModeScreen() {   //переводит в полноэкранный режим или обратно в оконный
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}

buttonFullscreen.addEventListener("click", changeModeScreen);