import React, { useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';

const EstadoUsuario = () => {
  const [estado, setEstado] = useState(null);

  useEffect(() => {
    const usuarioRef = doc(db, 'estado_usuarios', 'usuario1');
    const unsub = onSnapshot(usuarioRef, (docSnap) => {
      if (docSnap.exists()) {
        setEstado(docSnap.data());
      }
    });

    return () => unsub();
  }, []);

  if (!estado) return <p>Cargando estado del usuario...</p>;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-2">📡 Estado del Usuario</h2>
      <ul className="text-sm space-y-1">
        <li>
          <span className="font-medium">Conectado a Internet:</span>{" "}
          <span className={estado.conectado_internet ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
            {estado.conectado_internet ? 'Sí' : 'No'}
          </span>
        </li>
        <li>
          <span className="font-medium">Ubicación Activada:</span>{" "}
          <span className={estado.ubicacion_activada ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
            {estado.ubicacion_activada ? 'Sí' : 'No'}
          </span>
        </li>
        <li>
          <span className="font-medium">Última actualización:</span><br />
          <span className="text-gray-600 text-xs">
            {new Date(estado.ultima_actualizacion.seconds * 1000).toLocaleString()}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default EstadoUsuario;
