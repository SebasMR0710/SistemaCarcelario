document.getElementById('form-personal').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenir el envío del formulario

    const nombre = document.getElementById('nombre').value;
    const rol = document.getElementById('rol').value;
    const permisos = document.getElementById('permisos').value;

    if (nombre && rol && permisos) {
        const personalList = document.getElementById('personal-list');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${nombre}</td>
            <td>${rol}</td>
            <td>${permisos}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="eliminarPersonal(this)">Eliminar</button>
            </td>
        `;
        personalList.appendChild(newRow);

        // Reiniciar el formulario
        document.getElementById('form-personal').reset();
    }
});

function eliminarPersonal(button) {
    const row = button.closest('tr');
    row.parentNode.removeChild(row);
}