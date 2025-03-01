
const formulario = document.getElementById('formulario')
const usuario = document.getElementById('texto-1')
const correo = document.getElementById('texto-2')
const mensaje = document.getElementById('texto-3')
const boton = document.getElementById('boton')

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const data = new FormData(formulario)

    if (!data.get('nombre').trim()) {
        console.log('sin texto nombre')
        campoError(nombre)
        return
    } else {
        campoValido(nombre)
    }

    if (!data.get('correo').trim()) {
        console.log('sin texto correo')
        campoError(correo)
        return
    } else {
        campoValido(correo)
    }

    if (!data.get('mensaje').trim()) {
        console.log('sin texto mensaje')
        campoError(mensaje)
        return
    } else {
        campoValido(mensaje)
    }

    console.log('campos completados')
    
    fetch('formulario.php', {
        method: 'POST',
        body: data
    })
        .then(res => res.json())
        .then(datos => {
            console.log(datos)
            if (datos.error && datos.campo === 'nombre') {
                campoError(nombre)
                return
            }
            campoValido(nombre)

            if (datos.error && datos.campo === 'correo') {
                campoError(correo)
                return
            }
            campoValido(correo)

            if (datos.error && datos.campo === 'mensaje') {
                campoError(mensaje)
                return
            }
            campoValido(mensaje)

            // validaciones adicionales por si falla mail o post
            if (datos.error && datos.campo === 'mail' || datos.error && datos.campo === 'post') {
                campoError(boton)
                return
            }

            // validación de éxito
            if (!datos.error) {
                limpiarFormulario()
                campoValido(boton)
            }

        })
        .catch(e => console.log(e))

})

const campoError = (campo) => {
    campo.classList.add('is-invalid')
    campo.classList.remove('is-valid')
}

const campoValido = campo => {
    campo.classList.remove('is-invalid')
    campo.classList.add('is-valid')
}

const limpiarFormulario = () => {
    console.log('mensaje enviado con éxito')
    formulario.reset()
    correo.classList.remove('is-valid')
    mensaje.classList.remove('is-valid')
   nombre.classList.remove('is-valid')
}