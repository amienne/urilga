document.addEventListener("DOMContentLoaded", function() {

    /* ==========================================
       ELEMENTS
       ========================================== */

    const openingScreen = document.getElementById("openingScreen");
    const mainInvitation = document.getElementById("mainInvitation");
    const openInvitation = document.getElementById("openInvitation");

    const backgroundMusic = document.getElementById("backgroundMusic");
    const musicButton = document.getElementById("musicButton");


    /* ==========================================
       OPEN INVITATION
       ========================================== */

    /* ==========================================
     OPEN INVITATION
     ========================================== */

    if (openInvitation) {

        openInvitation.addEventListener("click", function() {

            /* ======================================
               OPENING SCREEN-ИЙГ БҮРЭН УСТГАХ
               ====================================== */

            if (openingScreen) {

                openingScreen.remove();

            }


            /* ======================================
               ҮНДСЭН УРИЛГЫГ ХАРУУЛАХ
               ====================================== */

            if (mainInvitation) {

                mainInvitation.classList.remove("hidden");

                mainInvitation.style.display = "block";

                mainInvitation.style.visibility = "visible";

                mainInvitation.style.opacity = "1";

            }


            /* ======================================
               ХУУДСЫГ ҮНДСЭН УРИЛГЫН ЭХЭНД АВААЧИХ
               ====================================== */

            document.documentElement.scrollTop = 0;

            document.body.scrollTop = 0;


            window.scrollTo(0, 0);


            /* ======================================
               ДУУГ ТОГЛУУЛАХ
               ====================================== */

            if (backgroundMusic) {

                backgroundMusic.volume = 0.55;

                backgroundMusic.play()
                    .then(function() {

                        if (musicButton) {

                            musicButton.classList.add("playing");

                        }

                    })
                    .catch(function(error) {

                        console.log(
                            "Дуу тоглуулахад алдаа:",
                            error
                        );

                    });

            }

        });

    }


    /* ==========================================
       MUSIC BUTTON
       ========================================== */

    if (musicButton && backgroundMusic) {

        musicButton.addEventListener("click", function() {

            if (backgroundMusic.paused) {

                backgroundMusic.play()
                    .then(function() {

                        musicButton.classList.add("playing");

                    })
                    .catch(function(error) {

                        console.log(
                            "Дуу тоглуулахад алдаа:",
                            error
                        );

                    });

            } else {

                backgroundMusic.pause();

                musicButton.classList.remove("playing");

            }

        });


        backgroundMusic.addEventListener(
            "play",
            function() {

                musicButton.classList.add("playing");

            }
        );


        backgroundMusic.addEventListener(
            "pause",
            function() {

                musicButton.classList.remove("playing");

            }
        );

    }


    /* ==========================================
       COUNTDOWN
       ========================================== */

    /*
       ҮЙЛ ЯВДАЛ:

       2026 оны 10 сарын 04
       11:00
       Монголын цагийн бүс UTC+08:00
    */

    const eventDate =
        new Date("2026-10-04T11:00:00+08:00");


    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    function updateCountdown() {

        const now = new Date();

        const difference =
            eventDate.getTime() - now.getTime();


        /* Хугацаа дууссан */

        if (difference <= 0) {

            if (daysElement)
                daysElement.textContent = "00";

            if (hoursElement)
                hoursElement.textContent = "00";

            if (minutesElement)
                minutesElement.textContent = "00";

            if (secondsElement)
                secondsElement.textContent = "00";

            return;
        }


        /* Өдөр */

        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        /* Цаг */

        const hours =
            Math.floor(
                (difference /
                    (1000 * 60 * 60)) % 24
            );


        /* Минут */

        const minutes =
            Math.floor(
                (difference /
                    (1000 * 60)) % 60
            );


        /* Секунд */

        const seconds =
            Math.floor(
                (difference / 1000) % 60
            );


        if (daysElement) {

            daysElement.textContent =
                String(days).padStart(2, "0");

        }


        if (hoursElement) {

            hoursElement.textContent =
                String(hours).padStart(2, "0");

        }


        if (minutesElement) {

            minutesElement.textContent =
                String(minutes).padStart(2, "0");

        }


        if (secondsElement) {

            secondsElement.textContent =
                String(seconds).padStart(2, "0");

        }

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    /* ==========================================
       CHILDREN COUNTER
       ========================================== */

    const decreaseChildren =
        document.getElementById(
            "decreaseChildren"
        );

    const increaseChildren =
        document.getElementById(
            "increaseChildren"
        );

    const childrenCount =
        document.getElementById(
            "childrenCount"
        );


    let childNumber = 0;


    function updateChildrenCount() {

        if (childrenCount) {

            childrenCount.value =
                childNumber;

        }

    }


    if (decreaseChildren) {

        decreaseChildren.addEventListener(
            "click",
            function() {

                if (childNumber > 0) {

                    childNumber--;

                    updateChildrenCount();

                }

            }
        );

    }


    if (increaseChildren) {

        increaseChildren.addEventListener(
            "click",
            function() {

                if (childNumber < 10) {

                    childNumber++;

                    updateChildrenCount();

                }

            }
        );

    }


    /* ==========================================
       RSVP
       ========================================== */

    const rsvpForm =
        document.getElementById(
            "rsvpForm"
        );

    const rsvpSuccess =
        document.getElementById(
            "rsvpSuccess"
        );


    if (rsvpForm) {

        rsvpForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();


                const guestName =
                    document
                    .getElementById("guestName")
                    .value
                    .trim();


                const attendance =
                    document.querySelector(
                        'input[name="attendance"]:checked'
                    );


                if (!guestName) {

                    alert(
                        "Нэрээ оруулна уу."
                    );

                    return;

                }


                if (!attendance) {

                    alert(
                        "Хариу сонгоно уу."
                    );

                    return;

                }


                console.log({
                    name: guestName,
                    attendance: attendance.value,
                    children: childNumber
                });


                rsvpForm.classList.add(
                    "hidden"
                );


                if (rsvpSuccess) {

                    rsvpSuccess.classList.remove(
                        "hidden"
                    );

                }

            }
        );

    }

});