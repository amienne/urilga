/* ==========================================
   SUPABASE ХОЛБОЛТ
   ========================================== */

const SUPABASE_URL = "https://kxjzdfhovwsucjkaufyp.supabase.co";
const SUPABASE_KEY = "sb_publishable_CwZQlwt4uvzlm1Ay-aBDng_7LAWKxd0";

const supabaseClient = window.supabase
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
    : null;


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
    const rsvpToast = document.getElementById("rsvpToast");


    /* ==========================================
       TOAST МЭДЭГДЭЛ
       ========================================== */

    let toastTimer = null;

    function showToast(message) {

        if (!rsvpToast) {
            return;
        }

        if (message) {
            rsvpToast.textContent = message;
        }

        rsvpToast.classList.add("show");

        if (toastTimer) {
            clearTimeout(toastTimer);
        }

        toastTimer = setTimeout(function () {

            rsvpToast.classList.remove("show");

        }, 2800);

    }


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
            async function (event) {

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
                 * Supabase-руу мэдээллийг илгээнэ.
                 */

                if (!supabaseClient) {

                    alert(
                        "Холболт бэлэн бус байна. Хуудсаа дахин ачаалаад дахин оролдоно уу."
                    );

                    return;

                }


                const submitButton =
                    rsvpForm.querySelector(
                        ".submit-button"
                    );

                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.textContent =
                        "ИЛГЭЭЖ БАЙНА...";

                }


                const { error } =
                    await supabaseClient
                        .from("rsvp")
                        .insert([
                            {
                                guest_name: name,
                                attendance: attendanceElement.value,
                                children_count: children
                            }
                        ]);


                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        "ХАРИУ ИЛГЭЭХ";

                }


                if (error) {

                    console.error(
                        "Supabase алдаа:",
                        error
                    );

                    alert(
                        "Уучлаарай, илгээхэд алдаа гарлаа. Дахин оролдоно уу."
                    );

                    return;

                }


                showToast(
                    "Таны хариу амжилттай илгээгдлээ ✓"
                );


                rsvpForm.reset();


                if (childrenCount) {

                    childrenCount.value = 0;

                }

            }
        );

    }

});


/* ==========================================
   ДЭЛГЭЦИЙГ ТОЙРЧ НИСЭХ БЯЦХАН ЛУУ
   ========================================== */

(function () {

    const dragonEl = document.getElementById("flyingDragon");

    if (!dragonEl) {
        return;
    }


    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (prefersReducedMotion) {
        return;
    }


    let scrollFraction = 0;

    function updateScrollFraction() {

        const scrollable =
            document.documentElement.scrollHeight -
            window.innerHeight;

        scrollFraction =
            scrollable > 0
                ? window.scrollY / scrollable
                : 0;

    }

    window.addEventListener(
        "scroll",
        updateScrollFraction,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateScrollFraction
    );

    updateScrollFraction();


    /*
     * Луу scroll хийх бvрд арай илvv эрчимтэй,
     * зогсонги vед зөөлөн тэнvvлэн нисдэг.
     */

    let lastScrollY = window.scrollY;
    let scrollEnergy = 0;

    window.addEventListener(
        "scroll",
        function () {

            const delta =
                Math.abs(window.scrollY - lastScrollY);

            scrollEnergy =
                Math.min(
                    scrollEnergy + delta * 0.05,
                    40
                );

            lastScrollY = window.scrollY;

        },
        { passive: true }
    );


    function flyLoop(timestamp) {

        const t = timestamp / 1000;

        /*
         * Scroll хийхээ больсны дараа эрчим
         * аажмаар багасна.
         */

        scrollEnergy *= 0.98;


        const centerX =
            window.innerWidth * 0.5;

        const centerY =
            window.innerHeight *
            (0.22 + scrollFraction * 0.55);

        const radiusX =
            Math.min(window.innerWidth * 0.38, 260) +
            scrollEnergy;

        const radiusY =
            70 + scrollEnergy * 0.6;

        const speed =
            0.28 + scrollEnergy * 0.01;

        const x =
            centerX + radiusX * Math.cos(t * speed);

        const y =
            centerY + radiusY * Math.sin(t * speed * 2);

        const tilt =
            Math.sin(t * speed) * 18;

        const half =
            dragonEl.offsetWidth / 2 || 32;

        dragonEl.style.transform =
            "translate(" +
            (x - half) + "px, " +
            (y - half) + "px) " +
            "rotate(" + tilt + "deg)";

        requestAnimationFrame(flyLoop);

    }

    requestAnimationFrame(flyLoop);

})();
