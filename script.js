audio = document.createElement('audio') ;

play = document.querySelector('#play') ;
pause = document.querySelector('#pause') ;
prog = document.querySelector('#prog') ;

audio.ontimeupdate = ()=>{
    prog.value = audio.currentTime/audio.duration*100 ;
}

prog.onchange = ()=>{
    audio.currentTime = prog.value/100*audio.duration ;
}
async function getMusic(id){
    res = await fetch('https://pocketmusic.onrender.com/music/'+id).then(res=>(res.blob()));
    url = URL.createObjectURL(res) ;
    audio.src = url ;
    document.body.appendChild(audio) ;
    audio.play() ;
}

function MusicDetail(music_)
{
    music = document.createElement('div') ;
    music.setAttribute('id',music_.id) ;
    music.classList.add('music') ;
    img = document.createElement('img') ;
    img.classList.add('image') ;
    img.src = music_.image ;
    label = document.createElement('label') ;
    label.classList.add('text') ;
    label.innerHTML = music_.title ;
    music.append(img)
    music.append(label)

    music.onclick = ()=>{
        getMusic(music_.id) ;
    }

    return music ;
}

async function search()
{
    q = document.querySelector('#q').value ;
    res = await fetch('https://pocketmusic.onrender.com/get/'+q).then(res=>(res.json())) ;
    document.querySelector('.res').innerHTML = '' ;
    res.forEach(ele=>{
        document.querySelector('.res').append(MusicDetail(ele)) ;
    })
}

document.querySelector('#s').onclick = search ;