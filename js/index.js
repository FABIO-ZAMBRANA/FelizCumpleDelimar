
const birthdayMap = {
    2025: "2025-12-22",
  
}
const $btn = $("#birth-start-btn")
const $main = $(".main")
let intervalId = null
let snowflakes = null

// Página cargada
$(document).ready(function () {
    // Efecto de nieve
    snowflakes = new Snowflakes({
        color: "#ffd700",
        minSize: 20,
    })
    // Desvanecer contenido
    $main.fadeOut(1)
    // Contador regresivo del cumpleaños
    intervalId = setInterval(birthdayCountdown, 1000)
    // Click en el botón
    $btn.click(pageRender)
})

function birthdayCountdown() {
    // Obtener la fecha actual y la fecha de cumpleaños de este año
    const now = dayjs()
    const curYearStr = now.format("YYYY")
    let birthday = dayjs(birthdayMap[curYearStr])

    // Si es el día del cumpleaños, detener el contador y habilitar el botón
    if (now.format("YYYY-MM-DD") === birthday.format("YYYY-MM-DD")) {
        clearInterval(intervalId)
        $btn.text("¡Vamos, mostrar!")
        $btn.prop("disabled", false)
        return
    }

    // Si el cumpleaños de este año ya pasó, calcular el tiempo hasta el próximo cumpleaños
    if (now.isAfter(birthday)) {
        birthday = dayjs(birthdayMap[parseInt(curYearStr) + 1])
    }

    // Calcular la diferencia con la fecha objetivo (en segundos) y convertirla a días, horas, minutos y segundos
    const diffInSeconds = birthday.diff(now, "second")
    const days = Math.floor(diffInSeconds / (3600 * 24))
    const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((diffInSeconds % 3600) / 60)
    const seconds = diffInSeconds % 60

// Construir la cadena de tiempo
// Construir la cadena de tiempo
const timeStrArr = []
if (days > 0) {
    timeStrArr.push(`${days} días`)
}
if (hours > 0 || days > 0) {
    timeStrArr.push(`${hours} horas`)
}
if (minutes > 0 || hours > 0 || days > 0) {
    timeStrArr.push(`${minutes} minutos`)
}
timeStrArr.push(`${seconds} segundos`)  // Añadir los segundos


// Añadir el mensaje después de los segundos
timeStrArr.push(`<span class="highlight">🎂 </span>`)

$btn.html(diffInSeconds <= 0 ? "El cumpleaños ya pasó" : timeStrArr.join(" "))

}

function pageRender() {
    // Detener nieve, desvanecer portada
    snowflakes.destroy()
    $(".birth-cover-container").fadeOut(1500)

    // Desvanecer contenido, reproducir música, soltar globos, mostrar mensaje de cumpleaños
    $main.fadeIn("slow")
    $(".song")[0].play()
    $(".brith-balloon").animate({ top: -500 }, 8000)
    new Typed("#typed", {
        stringsElement: "#greeting-word",
        typeSpeed: 50,
        backSpeed: 25,
        loop: true,
    })
}
