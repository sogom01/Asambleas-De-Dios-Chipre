document.addEventListener("DOMContentLoaded", function () {
    const meetingTimes = [
        { day: "Saturday", time: "14:55" }, // Saturday at 6 PM
        { day: "Sunday", time: "10:00" }, // Sunday at 10 AM
        { day: "Wednesday", time: "19:00" }, // Wednesday at 7 PM
    ];

    const dayMap = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
    };

    /**
     * Obtiene la próxima fecha de reunión.
     * @returns {Date} La próxima fecha de reunión.
     */
    function getNextMeetingDate() {
        const now = new Date();
        let nextMeeting = null;

        for (const meeting of meetingTimes) {
            const [hours, minutes] = meeting.time.split(":").map(Number); // Convertir a números
            const meetingDate = new Date(now);

            meetingDate.setDate(
                now.getDate() + ((dayMap[meeting.day] - now.getDay() + 7) % 7)
            );
            meetingDate.setHours(hours, minutes, 0, 0);

            if (meetingDate > now) {
                nextMeeting = meetingDate;
                break;
            }
        }

        if (!nextMeeting) {
            // Si no se encontró una reunión futura, asumir que es la primera de la próxima semana.
            const [hours, minutes] = meetingTimes[0].time.split(":").map(Number);
            nextMeeting = new Date();
            nextMeeting.setDate(
                now.getDate() + ((dayMap[meetingTimes[0].day] - now.getDay() + 7) % 7)
            );
            nextMeeting.setHours(hours, minutes, 0, 0);
        }

        return nextMeeting;
    }

    /**
     * Actualiza el contador de la próxima reunión.
     */
    function updateCountdown() {
        const nextMeetingDate = getNextMeetingDate().getTime();
        const elements = {
            days: document.getElementById("days").querySelector(".countdown-time"),
            hours: document
                .getElementById("hours")
                .querySelector(".countdown-time"),
            minutes: document
                .getElementById("minutes")
                .querySelector(".countdown-time"),
            seconds: document
                .getElementById("seconds")
                .querySelector(".countdown-time"),
        };

        let prevValues = {
            days: elements.days.textContent,
            hours: elements.hours.textContent,
            minutes: elements.minutes.textContent,
            seconds: elements.seconds.textContent,
        };

        const countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = nextMeetingDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const newValues = { days, hours, minutes, seconds };

            Object.keys(newValues).forEach((key) => {
                if (newValues[key].toString() !== prevValues[key]) {
                    const element = elements[key];
                    element.classList.add("changing");
                    setTimeout(() => {
                        element.textContent = newValues[key];
                        element.classList.remove("changing");
                    }, 250);
                    prevValues[key] = newValues[key].toString();
                }
            });

            if (distance < 0) {
                clearInterval(countdownInterval);
                document.getElementById("countdown-title").style.display = "none";
                document.getElementById("countdown-timer").style.display = "none";
                const liveNotification = document.getElementById("live-notification");
                liveNotification.classList.remove("hidden");
                setTimeout(() => {
                    liveNotification.classList.add("hidden");
                    document.getElementById("countdown-title").style.display = "block";
                    document.getElementById("countdown-timer").style.display = "flex";
                    updateCountdown();
                }, 3600000);
            }
        }, 1000);
    }

    updateCountdown();
});
