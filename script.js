(function () {
    window.addEventListener("load", function () {

        var canvas = document.getElementById("confetti-canvas");
        var ctx = canvas.getContext("2d");

        var confettiCount = 120;
        var confettiArray = [];

        var colorPalette = [
            "#89dcff",
            "#F39DC2",
        ];

        var defaultSize = {
            width: 6,
            height: 14
        };

        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener("resize", setCanvasSize);
        setCanvasSize();

        function Confetti() {
            this.reset();
        }

        Confetti.prototype.reset = function () {

            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height;

            this.w = defaultSize.width + Math.random() * 2;
            this.h = defaultSize.height + Math.random() * 4;

            this.color =
                colorPalette[
                    Math.floor(Math.random() * colorPalette.length)
                ];

            this.speed = 0.7 + Math.random() * 2;
            this.angle = Math.random() * 360;
            this.spin = -4 + Math.random() * 8;
            this.horizontalMovement = Math.random() * 2 - 1;

            this.flipAngle = Math.random() * Math.PI;
            this.flipSpeed = 0.02 + Math.random() * 0.05;
        };

        Confetti.prototype.update = function () {

            this.y += this.speed;
            this.x += this.horizontalMovement;
            this.angle += this.spin;

            this.flipAngle += this.flipSpeed;

            if (this.y > canvas.height + 20) {
                this.reset();
            }

            ctx.save();

            ctx.translate(this.x, this.y);

            var simulatedWidth =
                this.w * Math.sin(this.flipAngle);

            ctx.rotate(
                (this.angle * Math.PI) / 180
            );

            ctx.fillStyle = this.color;

            ctx.fillRect(
                -simulatedWidth / 2,
                -this.h / 2,
                simulatedWidth,
                this.h
            );

            ctx.restore();
        };

        function init() {

            for (var i = 0; i < confettiCount; i++) {

                var c = new Confetti();

                c.y = Math.random() * canvas.height;

                confettiArray.push(c);
            }

            animate();
        }

        function animate() {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            for (
                var i = 0;
                i < confettiArray.length;
                i++
            ) {
                confettiArray[i].update();
            }

            requestAnimationFrame(animate);
        }

        init();
    });
})();

/* =========================================
   CUENTA REGRESIVA
   ========================================= */

// Fecha y hora del evento
// 18 de diciembre de 2026 a las 5:00 PM

const targetDate = new Date(
    "December 19, 2026 17:00:00"
).getTime();


function updateCountdown() {

    // Hora actual
    const now = new Date().getTime();

    // Diferencia entre el evento y ahora
    const difference = targetDate - now;


    // Si ya llegó el evento
    if (difference <= 0) {

        document.getElementById("days").textContent = "00";

        document.getElementById("hours").textContent = "00";

        document.getElementById("minutes").textContent = "00";

        document.getElementById("seconds").textContent = "00";

        return;
    }


    // Calcular días
    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );


    // Calcular horas
    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );


    // Calcular minutos
    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );


    // Calcular segundos
    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    // Mostrar días
    document.getElementById("days").textContent =
        String(days).padStart(2, "0");


    // Mostrar horas
    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");


    // Mostrar minutos
    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");


    // Mostrar segundos
    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


// Ejecutar inmediatamente
updateCountdown();


// Actualizar cada segundo
setInterval(updateCountdown, 1000);





/* =========================
   RSVP - WHATSAPP
========================= */

const guestCount = document.getElementById("guestCount");
const minusGuest = document.getElementById("minusGuest");
const plusGuest = document.getElementById("plusGuest");
const whatsappRSVP = document.getElementById("whatsappRSVP");

let guests = 2;

// Número de WhatsApp del anfitrión
// Escribir con código de país, sin +, espacios ni guiones.
const hostPhone = "19282474172";


function updateRSVP() {

    // Actualizar número visual
    guestCount.textContent = guests;

    // Crear mensaje
    const personText = guests === 1 ? "persona" : "personas";

    const message =
        `Hola! Confirmo mi asistencia al Gender Reveal de Baby Rivera. ` +
        `Seremos ${guests} ${personText}.`;

    // Crear enlace de WhatsApp
    whatsappRSVP.href =
        `https://wa.me/${hostPhone}?text=${encodeURIComponent(message)}`;
}


// Botón -
minusGuest.addEventListener("click", function () {

    if (guests > 1) {
        guests--;
        updateRSVP();
    }

});


// Botón +
plusGuest.addEventListener("click", function () {

    if (guests < 20) {
        guests++;
        updateRSVP();
    }

});


// Crear el enlace inicial
updateRSVP();


const addToCalendar = document.getElementById("addToCalendar");

addToCalendar.addEventListener("click", function () {

    const event = {
        title: "Baby Rivera — Revelación de Género",
        description: "¡Ven a celebrar con nosotros la revelación de género de Baby Rivera!",
        location: "Lindsay Grove, 1742 N Lindsay Rd, Mesa, AZ 85213",
        start: "20261218T170000",
        end: "20261218T200000"
    };

    const icsContent =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Baby Rivera//Gender Reveal//ES
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:${Date.now()}@baby-rivera
DTSTAMP:${getICSDate(new Date())}
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], {
        type: "text/calendar;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Baby-Rivera-Gender-Reveal.ics";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
});


function getICSDate(date) {

    return date.getUTCFullYear().toString() +
        String(date.getUTCMonth() + 1).padStart(2, "0") +
        String(date.getUTCDate()).padStart(2, "0") +
        "T" +
        String(date.getUTCHours()).padStart(2, "0") +
        String(date.getUTCMinutes()).padStart(2, "0") +
        String(date.getUTCSeconds()).padStart(2, "0") +
        "Z";

}