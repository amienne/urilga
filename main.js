document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       ELEMENTS
       ========================================== */

    const openingScreen = document.getElementById("openingScreen");
    const mainInvitation = document.getElementById("mainInvitation");
    const openInvitation = document.getElementById("openInvitation");

    const backgroundMusic = document.getElementById("backgroundMusic");
    const musicButton = document.getElementById("musicButton");

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const decreaseChildren = document.getElementById("decreaseChildren");
    const increaseChildren = document.getElementById("increaseChildren");
    const childrenCount = document.getElementById("childrenCount");

    const rsvpForm = document.getElementById("rsvpForm");
    const guestName = document.getElementById("guestName");
    const rsvpSuccess = document.getElementById("rsvpSuccess");


    /* ==========================================
       OPEN INVITATION
       ========================================== */

    if (openInvitation) {

        openInvitation.addEventListener("click", function () {

            /*
             * Opening screen-ийг бүрэн устгана.
             * Ингэснээр арын хэсэг давхар харагдахгүй.
             */

            if (openingScreen) {
                openingScreen.remove();
            }


            /*
             * Үндсэн урилгыг харуулна.
             */

            if (mainInvitation) {

                mainInvitation.classList.remove("hidden");

                mainInvitation.style.display = "block";
                mainInvitation.style.visibility = "visible";
                mainInvitation.style.opacity = "1";

            }


            /*
             * Хуудасны дээд хэсгээс эхлүүлнэ.
             */

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });


            /*
             * Хөгжим эхлүүлэх
             */

            if (backgroundMusic) {

                backgroundMusic.volume = 0.55;

                backgroundMusic.play()
                    .then(function () {

                        if (musicButton) {
                            musicButton.classList.add("playing");
                        }

                    })
                    .catch(function (error) {

                        console.log(
                            "Хөгжим автоматаар эхлэх боломжгүй байна:",
                            error
                        );

                    });

            }

        });

    }


    /* ==========================================
       MUSIC PLAY / PAUSE
       ========================================== */

    if (musicButton && backgroundMusic) {

        musicButton.addEventListener("click", function () {

            if (backgroundMusic.paused) {

                backgroundMusic.play()
                    .then(function () {

                        musicButton.classList.add("playing");

                    })
                    .catch(function (error) {

                        console.log("Music play error:", error);

                    });

            } else {

                backgroundMusic.pause();

                musicButton.classList.remove("playing");

            }

        });

    }


    /* ==========================================
       COUNTDOWN
       ========================================== */

    /*
     * Монголын цаг:
     * 2026 оны 10 сарын 4
     * 11:00
     */

    const eventDate = new Date(
        "2026-10-04T11:00:00+08:00"
    );


    function updateCountdown() {

        const now = new Date();

        const difference = eventDate.getTime() - now.getTime();


        /*
         * Хугацаа дууссан бол
         */

        if (difference <= 0) {

            if (daysElement) daysElement.textContent = "00";
            if (hoursElement) hoursElement.textContent = "00";
            if (minutesElement) minutesElement.textContent = "00";
            if (secondsElement) secondsElement.textContent = "00";

            return;
        }


        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
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
       CHILDREN COUNT
       ========================================== */

    if (decreaseChildren && childrenCount) {

        decreaseChildren.addEventListener(
            "click",
            function () {

                let current =
                    Number(childrenCount.value) || 0;

                if (current > 0) {

                    current--;

                    childrenCount.value = current;

                }

            }
        );

    }


    if (increaseChildren && childrenCount) {

        increaseChildren.addEventListener(
            "click",
            function () {

                let current =
                    Number(childrenCount.value) || 0;

                if (current < 10) {

                    current++;

                    childrenCount.value = current;

                }

            }
        );

    }


    /* ==========================================
       RSVP FORM
       ========================================== */

    if (rsvpForm) {

        rsvpForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    guestName
                        ? guestName.value.trim()
                        : "";


                const attendanceElement =
                    document.querySelector(
                        'input[name="attendance"]:checked'
                    );


                const children =
                    childrenCount
                        ? Number(childrenCount.value) || 0
                        : 0;


                if (!name) {

                    alert(
                        "Нэрээ оруулна уу."
                    );

                    return;

                }


                if (!attendanceElement) {

                    alert(
                        "Та хүрэлцэн ирэх эсэхээ сонгоно уу."
                    );

                    return;

                }


                /*
                 * Одоогоор database холбохоос өмнө
                 * form ажиллаж байгаа эсэхийг шалгана.
                 */

                console.log(
                    "Нэр:",
                    name
                );

                console.log(
                    "Хариу:",
                    attendanceElement.value
                );

                console.log(
                    "Хүүхдийн тоо:",
                    children
                );


                if (rsvpSuccess) {

                    rsvpSuccess.classList.remove(
                        "hidden"
                    );

                }


                rsvpForm.reset();


                if (childrenCount) {

                    childrenCount.value = 0;

                }

            }
        );

    }

});
