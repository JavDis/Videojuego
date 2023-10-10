let iconos = [];
let selecciones = [];
let intentos = 0;
let aciertos = 0;
const intentosMaximos = 20; 
const iconosPorAcierto = 2; 

function cargarIconos() {
            iconos = [
                '<img src="https://i.pinimg.com/originals/1a/fe/07/1afe07a18dd147d2c7e3a24d3998f64b.png" width="80%" height="90%">',
                '<img src="https://1.bp.blogspot.com/-Mxy-rlTODB8/YCUlVzPyghI/AAAAAAAKsHc/zu6tq61Pj8AuRTHKrGApf1BEIBJbsHLUwCLcBGAsYHQ/s1389/cat5_1534270.png" width="50%">',
                '<img src="https://th.bing.com/th/id/R.c8374f70d6005150862e1d5744d913d3?rik=QIJjgHQhd3DtpA&riu=http%3a%2f%2fgetdrawings.com%2fcliparts%2fant-clipart-for-kids-40.png&ehk=xx6Fsg2WZNH%2fY39sppICRhbLwg6gthLn%2fz3e90E9TTc%3d&risl=&pid=ImgRaw&r=0" width="50%">',
                '<img src="https://images.vexels.com/media/users/3/151730/isolated/preview/eba8fb7318a97a03ca5ad6979eac1e80-dibujos-animados-de-p-jaro-del-bosque-by-vexels.png" width="70%" height="70%">',
                '<img src="https://th.bing.com/th/id/R.162f632263763fb6a2cdfffdede795b2?rik=XbZJofwQFvKI7g&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fgorilla-transparent%2fgorilla-transparent-18.png&ehk=iPeMHg%2fWgllnIEox3ZZT%2f4hlGVRmgAu6gQ%2bUc1PH5P4%3d&risl=&pid=ImgRaw&r=0" width="50%">',
                '<img src="https://i.pinimg.com/originals/4c/70/40/4c70403caa8c6a1cdb825825c9e73edb.png" width="70%">',
                '<img src="https://i.pinimg.com/originals/b7/cf/3f/b7cf3f1328ed71e71c74bee741bdc185.png" width="70%">',
                '<img src="https://cdn.pixabay.com/photo/2021/02/10/16/55/lion-6002783_960_720.png" width="80%">',
                '<img src="https://images.vexels.com/media/users/3/127779/isolated/preview/87942b26fedeb9d2ba5189bb5c96eeeb-dibujos-animados-de-elefante-divertido-by-vexels.png" width="80%">',
                '<img src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/46886.png" width="80%">',
                '<img src="https://i.pinimg.com/originals/f2/57/21/f25721cb9f8ba8e860297d14b82bb379.png" width="80%">',
                '<img src="https://images.vexels.com/media/users/3/151669/isolated/preview/cffc3cd93f88d0f459a0f069810dd2b5-deer-animal-cartoon-by-vexels.png" width="80%">',
            ]
        }

function generarTablero() {
    cargarIconos();
    let len = iconos.length;
    selecciones = [];
    intentos = 0;
    aciertos = 0;
    let tablero = document.getElementById("tablero");
    let tarjetas = [];

    for (let i = 0; i < len * iconosPorAcierto; i++) {
        tarjetas.push(`
            <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
                <div class="tarjeta" id="tarjeta${i}">
                    <div class="cara trasera" id="trasera${i}">
                        ${iconos[i % len]}
                    </div>
                    <div class="cara superior">
                        <i class="far fa-question-circle"></i>
                    </div>
                </div>
            </div>
        `);
    }
    tarjetas.sort(() => Math.random() - 0.5);
    tablero.innerHTML = tarjetas.join(" ");
    document.getElementById("intentos").textContent = `Intentos: 0`;
    document.getElementById("aciertos").textContent = `Puntaje: 0`;
}

function seleccionarTarjeta(i) {
    let tarjeta = document.getElementById("tarjeta" + i);  
    if (tarjeta.style.transform != "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)";
        selecciones.push(i);
    }
    if (selecciones.length == iconosPorAcierto) {
        intentos++;
        document.getElementById("intentos").textContent = `Intentos: ${intentos}`;
        deseleccionar(selecciones);
        selecciones = [];
        if (intentos == intentosMaximos) {
            alert("Has Perdido. Se han acabado tus intentos");
            generarTablero();
        }
    }
}

function deseleccionar(selecciones) {
    setTimeout(() => {
        let trasera1 = document.getElementById("trasera" + selecciones[0]);
        let trasera2 = document.getElementById("trasera" + selecciones[1]);
        if (trasera1.innerHTML != trasera2.innerHTML) {
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);
            tarjeta1.style.transform = "rotateY(0deg)";
            tarjeta2.style.transform = "rotateY(0deg)";
        } else {
            trasera1.style.background = "plum";
            trasera2.style.background = "plum";
            aciertos++;
            document.getElementById("aciertos").textContent = `Aciertos: ${aciertos}`;
            if (aciertos == iconos.length / iconosPorAcierto) {
                alert("¡Felicidades! Has ganado el juego.");
                generarTablero();
            }
        }
    }, 1000);
}
generarTablero();