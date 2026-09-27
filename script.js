const jsConfetti = new JSConfetti();
const bgGradients = [
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(to top, #ff0844 0%, #ffb199 100%)',
    'linear-gradient(to top, #d299c2 0%, #fef9d7 100%)',
    'linear-gradient(to top, #cd9cf2 0%, #f6f3ff 100%)',
    'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
    'linear-gradient(to top, #ffb199 0%, #ff0844 100%)',
    'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
    '#ffffff'
];

const realCats = ['cat1.png', 'cat2.png', 'cat3.png', 'cat4.png', 'cat5.png', 'cat6.png', 'cat7.png', 'cat8.png'];

function playSound(filename, vol = 1.0) {
    try {
        let audio = new Audio(filename);
        audio.volume = vol;
        let playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.warn("الصوت يحتاج ضغطة في المتصفح.", error);
            });
        }
    } catch (e) {
        console.error(e);
    }
}

function nextPage(currentIndex) {
    document.getElementById('page' + currentIndex).classList.remove('active-page');
    let nextIndex = currentIndex + 1;
    document.getElementById('page' + nextIndex).classList.add('active-page');
    document.body.style.background = bgGradients[nextIndex - 1];
    window.scrollTo(0, 0); 
}

function startRain() {
    for(let i = 0; i < 7; i++) {
        setTimeout(() => { playSound('meow.mp3', 0.6); }, Math.random() * 1500);
    }
    for(let i = 0; i < 40; i++) {
        setTimeout(() => {
            let img = document.createElement('img');
            img.src = realCats[Math.floor(Math.random() * realCats.length)];
            img.className = 'falling-cat';
            img.style.left = Math.random() * 90 + 'vw';
            img.style.top = '-100px';
            img.style.width = (Math.random() * 40 + 35) + 'px'; 
            img.style.animationDuration = (Math.random() * 3 + 2) + 's'; 
            document.body.appendChild(img);
            setTimeout(() => img.remove(), 5000);
        }, Math.random() * 2000);
    }
    setTimeout(() => { document.getElementById('next1').style.display = 'inline-block'; }, 3000);
}

function playMeow(vol) { playSound('meow.mp3', vol); }

function foundCat() {
    let cat = document.getElementById('hidden-cat'); 
    cat.style.opacity = '1';
    playSound('meow.mp3', 1.0); 
    document.getElementById('next2').style.display = 'inline-block';
}

document.getElementById('complaint').addEventListener('input', function(e) {
    if(e.target.value.trim().length > 0) {
        document.getElementById('btn-shrink').style.display = 'inline-block';
    }
});

function shrinkAndNext() {
    let box = document.getElementById('complaint');
    let btn = document.getElementById('btn-shrink');
    
    btn.style.display = 'none'; 
    box.classList.add('vanish-anim'); 
    playSound('pop.mp3', 0.9); 
    
    setTimeout(() => { nextPage(3); }, 1000);
}

let coffeeClicks = 0;
function spillCoffee() {
    let cup = document.getElementById('coffee-cup'); 
    coffeeClicks++;
    
    if (coffeeClicks < 5) {
        let rotation = coffeeClicks * 15; 
        cup.style.transform = `rotate(${rotation}deg) translateX(${coffeeClicks * 5}px)`;
        playSound('scratch.mp3', 0.3); 
    } 
    else if (coffeeClicks === 5) {
        cup.style.transform = 'none'; 
        cup.src = 'spill.png'; 
        cup.style.width = '75%'; 
        cup.style.maxWidth = '290px';
        playSound('pop.mp3', 1.0); 
        document.getElementById('next4').style.display = 'inline-block';
        cup.onclick = null; 
    }
}

function stealCoffee() {
    let paw = document.getElementById('cat-paw'); 
    let coffee = document.getElementById('top-coffee'); 
    let btn = document.getElementById('start-steal-btn');
    
    btn.style.display = 'none'; 
    paw.style.right = '50%'; 
    playSound('meow.mp3', 0.8); 
    
    setTimeout(() => {
        coffee.style.display = 'none'; 
        paw.style.right = '-250px'; 
        
        setTimeout(() => {
            document.getElementById('next5').style.display = 'inline-block';
        }, 1500);
        
    }, 1500); 
}

let rosesCount = 0;
function shootRose(event, targetElement) {
    if(targetElement.dataset.hit) return; 
    
    let gameArea = document.getElementById('game-area');
    let cannon = document.getElementById('cannon'); 
    
    let rose = document.createElement('img');
    rose.src = 'rose.png'; 
    rose.style.position = 'absolute';
    rose.style.width = '14%'; 
    rose.style.maxWidth = '45px';
    rose.style.zIndex = '10';
    rose.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    rose.style.filter = 'drop-shadow(0 5px 5px rgba(0,0,0,0.3))';
    
    let startX = cannon.offsetLeft + (cannon.offsetWidth / 2) - 20;
    rose.style.left = startX + 'px';
    rose.style.bottom = cannon.offsetHeight + 'px'; 
    gameArea.appendChild(rose);
    
    let targetLeft = targetElement.offsetLeft + (targetElement.offsetWidth / 2) - 20;
    let targetTop = targetElement.offsetTop + (targetElement.offsetHeight / 2) - 20;
    
    setTimeout(() => {
        rose.style.left = targetLeft + 'px';
        rose.style.bottom = (gameArea.offsetHeight - targetTop - 40) + 'px'; 
    }, 20);
    
    setTimeout(() => {
        rose.remove(); 
        targetElement.src = 'cat1.png'; 
        targetElement.dataset.hit = "true";
        playSound('pop.mp3', 0.8); 
        
        rosesCount++;
        if(rosesCount === 4) { 
            setTimeout(() => { document.getElementById('next6').style.display = 'inline-block'; }, 500);
        }
    }, 300); 
}

let scale = 1.0;
function shrinkBouquet() {
    scale -= 0.15;
    let bq = document.getElementById('bouquet'); 
    playSound('scratch.mp3', 0.5); 
    if(scale <= 0.2) {
        bq.style.display = 'none';
        document.getElementById('bouquet-msg').style.display = 'block';
        document.getElementById('next7').style.display = 'inline-block';
    } else {
        bq.style.transform = `scale(${scale})`;
    }
}

function startScanner() {
    document.getElementById('start-scan-btn').style.display = 'none';
    let status = document.getElementById('status-text');
    let lottieCat = document.getElementById('scan-cat');
    let smileBtn = document.getElementById('smile-btn');
    
    status.innerHTML = "⏳ جاري عمل مسح ضوئي...";
    setTimeout(() => { status.innerHTML = "⚠️ جاري قياس نسبة ال.UG..."; }, 2000);
    setTimeout(() => { status.innerHTML = "🚨 جاري حساب التجاعيد المحتملة!"; }, 4000);
    
    setTimeout(() => {
        status.innerHTML = "إنذار! 🚨<br><span style='color:#d32f2f; font-size:clamp(18px, 4.5vw, 22px); font-weight:900;'>الزعل بطلع تجاعيد ،ابتسمي!</span>";
        lottieCat.style.display = 'block'; 
        playSound('buzzer.mp3', 1.0); 
        
        setTimeout(() => {
            smileBtn.style.display = 'inline-block';
            smileBtn.style.animation = 'fadeInBtn 0.5s ease-out forwards';
        }, 1500);
        
    }, 6000);
}

function sheSmiled() {
    document.getElementById('status-text').innerHTML = "أيوا هيك! رجعتي قمر 🌸✨";
    let lottieCat = document.getElementById('scan-cat');
    lottieCat.load("https://lottie.host/5bfb36cb-bedc-4db1-bfda-a183221bcc4b/y9SutC0RDw.json");
    
    document.getElementById('smile-btn').style.display = 'none';
    jsConfetti.addConfetti({ emojis: ['🌸', '✨', '💖'], emojiSize: 40 });
    setTimeout(() => { document.getElementById('next8').style.display = 'inline-block'; }, 2000);
}