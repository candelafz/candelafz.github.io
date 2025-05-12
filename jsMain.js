function agregarNota() {
    const contenedor = document.getElementById('contenedor-notas');
    const nuevaNota = document.createElement('div'); //crea la nota nueva
    nuevaNota.classList.add('note-box');

    const fechaHora = new Date();
    const fechaHoraTexto = fechaHora.toLocaleString();

    //aca le dice al atributo nuevaNota que va a tener dentro lo siguiente
    nuevaNota.innerHTML = ` 
        <h3 class="note-title">Título de nota</h3>
        <p class="note-content">Agregar texto :)</p>
        <div class="note-footer">
          <span class="note-date">${fechaHoraTexto}</span>
          <button class="delete-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#76448a" stroke-width="2">
        <path d="M3 6h18M5 6l1 16h12l1-16H5z" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
            </button>
          </div>
      `;

    //funcion para borrar nota
    nuevaNota.querySelector('.delete-btn').addEventListener('click', function (e) {
        e.stopPropagation(); // esto por ahora no anda, va a servir en un futuro para ampliar la nota y que no se rompa nada
        nuevaNota.remove();
    });

    const cajaAgregar = contenedor.querySelector('.add-box');
    contenedor.insertBefore(nuevaNota, cajaAgregar.nextSibling); //agrega la nueva nota despues del boton agregar nueva nota
}                                                              //funciona raro igual

// detecta el click y abre la nota
document.addEventListener('click', function (e) {
    const nota = e.target.closest('.note-box');
    if (nota && !e.target.classList.contains('delete-btn')) {
        ampliarNota(nota);
    }
});

function ampliarNota(notaOriginal) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    // mejor en lugar de clonar la nota hago una copia visual
    const notaClonada = document.createElement('div');
    notaClonada.className = 'ampliada';

    // agarro lo original
    const tituloOriginal = notaOriginal.querySelector('.note-title').innerText;
    const contenidoOriginal = notaOriginal.querySelector('.note-content').innerText;

    const titulo = document.createElement('h3');
    titulo.className = 'note-title';
    titulo.contentEditable = true;
    titulo.innerText = tituloOriginal;

    const contenido = document.createElement('p');
    contenido.className = 'note-content';
    contenido.contentEditable = true;
    contenido.innerText = contenidoOriginal;

    // el boton de cerrar pero tmb guarda cambios
    const cerrarBtn = document.createElement('button');
    cerrarBtn.className = 'cerrar-btn';
    cerrarBtn.innerHTML = '✖';
    cerrarBtn.onclick = () => {
        // guardar cambios en la original
        notaOriginal.querySelector('.note-title').innerText = titulo.innerText;
        notaOriginal.querySelector('.note-content').innerText = contenido.innerText;
        overlay.remove();
    };

    // agregar todo
    notaClonada.appendChild(cerrarBtn);
    notaClonada.appendChild(titulo);
    notaClonada.appendChild(contenido);
    overlay.appendChild(notaClonada);
    document.body.appendChild(overlay);

    
}

