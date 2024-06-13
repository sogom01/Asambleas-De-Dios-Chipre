document.addEventListener("DOMContentLoaded", function () {
    const meetingTimes = [
        { day: "Wednesday", time: "19:00" },
        { day: "Saturday", time: "18:00" },
        { day: "Sunday", time: "10:00" },
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

    function getNextMeetingDate() {
        const now = new Date();
        let nextMeeting = null;

        // Revisar cada reunión y determinar la más cercana
        meetingTimes.forEach(meeting => {
            const [hours, minutes] = meeting.time.split(":").map(Number);
            const meetingDate = new Date(now);

            // Calcular el próximo día de la reunión
            const dayDiff = (dayMap[meeting.day] - now.getDay() + 7) % 7;
            meetingDate.setDate(now.getDate() + dayDiff);
            meetingDate.setHours(hours, minutes, 0, 0);

            // Si la reunión calculada es en el pasado, agregar 7 días
            if (meetingDate <= now) {
                meetingDate.setDate(meetingDate.getDate() + 7);
            }

            // Establecer la próxima reunión si es la más cercana
            if (!nextMeeting || meetingDate < nextMeeting) {
                nextMeeting = meetingDate;
            }
        });

        return nextMeeting;
    }

    function updateCountdown() {
        const nextMeetingDate = getNextMeetingDate().getTime();
        const elements = {
            days: document.getElementById("days").querySelector(".countdown-time"),
            hours: document.getElementById("hours").querySelector(".countdown-time"),
            minutes: document.getElementById("minutes").querySelector(".countdown-time"),
            seconds: document.getElementById("seconds").querySelector(".countdown-time"),
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

            if (distance <= 0) {
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
                }, 3600000); // 1 hour
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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
        }, 1000);
    }

    updateCountdown();
});
