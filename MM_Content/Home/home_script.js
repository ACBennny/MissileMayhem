/*************************************************************
 * This is the script for the Home page of Missle Mayhem
 * 
 * @name (Anyanwu_Benedict_Chukwuemeka)
 * @version (v0.01)
 *************************************************************/





const welcomeVidBox = document.querySelector(".welcome_vid_box");
const welcomeVideoPlayer = document.querySelector(".welcome_vid");
const playPauseBtn = document.querySelectorAll(".welcome_vid_pauseplay i");
// const navbarBdr = document.querySelector(".navbar_bdr");




// WELCOME BOX

    // Video

        // Attaches src when window is done loading
        window.addEventListener("load" , () => {
            welcomeVideoPlayer.setAttribute("src" , "../../MM_Img/MissileMayhem_BcgVid.mp4");
            welcomeVideoPlayer.setAttribute("loop", "loop");
            welcomeVideoPlayer.setAttribute("autoplay", "true");
        });

        welcomeVideoPlayer.addEventListener("mouseover" , () => {
            document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
        });

        welcomeVideoPlayer.addEventListener("mouseleave" , () => {
            document.oncontextmenu = document.body.oncontextmenu = function() {return true;}
        });

        welcomeVideoPlayer.addEventListener("play", () => {
            playPauseBtn.forEach(btn => {btn.classList.replace("fa-circle-play", "fa-circle-pause")})
        });
        welcomeVideoPlayer.addEventListener("pause", () => 
            playPauseBtn.forEach(btn => {btn.classList.replace("fa-circle-pause", "fa-circle-play")})
        );

        // Pauses the video and changes the title based on the video's active state
        playPauseBtn.forEach(btn => {
            btn.addEventListener("click", () => welcomeVideoPlayer.paused ? (welcomeVideoPlayer.play(), btn.title="pause") : (welcomeVideoPlayer.pause(), btn.title="play"));
        });




// SCROLL REVEAL

    ScrollReveal({ 
        reset: true,
        distance: '100px',
        duration: 2500,
        delay: 400
    });

    ScrollReveal().reveal('.welcome_message .major', { delay: 300 , origin: 'left' });
    ScrollReveal().reveal('.welcome_message .minor', { delay: 500, origin: 'right' });
    ScrollReveal().reveal('.welcome_message .signUp_prompt_btn_box .genBtn', { delay: 200, origin: 'bottom' });
    ScrollReveal().reveal('.welcome_message .signUp_prompt_btn_box .go_to_abt', { delay: 400, origin: 'bottom' });
    ScrollReveal().reveal('.slides.quick_ftr', { delay: 200, origin: 'bottom', interval: 200 });










