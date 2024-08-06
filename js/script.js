const ingresoTexto = document.getElementById("ingresoTexto");
const btnEncriptar = document.getElementById("btnEncriptar");
const btnDesencriptar = document.getElementById("btnDesencriptar");
const btnCopiar = document.getElementById("btnCopiar");
const mensajeFinal = document.getElementById("mensajeFinal");
const hombre = document.getElementById("hombre");
const mensajeDer = document.getElementById("mensajeDer");
const ladoDerecho = document.getElementById("ladoDerecho");

// Expresión regular para validar que solo se ingresen letras minúsculas sin acentos
const regex = /^[a-z\s.,;!?()-]+$/;

//La letra "e" es convertida para "enter"
//La letra "i" es convertida para "imes"
//La letra "a" es convertida para "ai"
//La letra "o" es convertida para "ober"
//La letra "u" es convertida para "ufat"

let reemplazar =[
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],

]

//Reemplazar lado derecho por texto encriptado
const remplace = (nuevoValor) =>{
    mensajeFinal.innerHTML = nuevoValor;
    hombre.classList.add("oculto");
    ingresoTexto.value = "";
    mensajeDer.style.display ="none";
    btnCopiar.style.display = "block";
    ladoDerecho.classList.add("ajustar");
    mensajeFinal.classList.add("ajustar");

};

//Resetear la página al inicio
const reset = () =>{
    mensajeFinal.innerHTML = "";
    hombre.classList.remove("oculto");
    mensajeDer.style.display ="block";
    btnCopiar.style.display = "none";
    ladoDerecho.classList.remove("ajustar");
    mensajeFinal.classList.remove("ajustar");
    ingresoTexto.focus();

};

const validarTexto = (texto) => {
    // Verificar si el texto contiene mayúsculas o acentos
    if (!regex.test(texto)) {
        // Mostrar alerta de no ingresar acentos
        swal("Ingresar solo letras minusculas y sin acentos", "", "warning").then(() => {
            reset();
        });    
        return false;
    }
    return true;
};

//Encriptar texto ingresado
btnEncriptar.addEventListener("click", () => {
    const texto = ingresoTexto.value.toLowerCase().trim();
    if (texto === "") {
        swal("Ingrese texto a encriptar", "", "error").then(() => {
            reset();
        });
    } else if (validarTexto(texto)) {
        function encriptar(newText) {
            for (let i = 0; i < reemplazar.length; i++) {
                if (newText.includes(reemplazar[i][0])) {
                    newText = newText.replaceAll(reemplazar[i][0], reemplazar[i][1]);
                }
            }
            return newText;
        }
        remplace(encriptar(texto));
    }
});

//Desencriptar texto copiado
btnDesencriptar.addEventListener("click", () => {
    const texto = ingresoTexto.value.toLowerCase().trim();
    if (texto === "") {
        swal("Ingrese texto a desencriptar", "", "error").then(() => {
            reset();
        });
    } else if (validarTexto(texto)) {
        function desencriptar(newText) {
            for (let i = 0; i < reemplazar.length; i++) {
                if (newText.includes(reemplazar[i][1])) {
                    newText = newText.replaceAll(reemplazar[i][1], reemplazar[i][0]);
                }
            }
            return newText;
        }
        remplace(desencriptar(texto));
    }
});

//Copiar texto encriptado
btnCopiar.addEventListener("click", () => {
    let texto = mensajeFinal.textContent;
    let textarea = document.createElement('textarea');
    textarea.textContent = texto;
    document.body.append(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    swal("Texto Copiado", "", "success").then(() => {
        reset();
    });
});