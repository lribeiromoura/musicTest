//Scripts

document.addEventListener("play", mscs => {
    let musics = document.getElementsByTagName("audio");
    let arr = Array.from(musics)
    arr.forEach(cdmsc => {
        if(cdmsc != mscs.target){
            cdmsc.pause();
        }
    });
},true)
