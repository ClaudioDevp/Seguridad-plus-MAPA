
export default function Dashboard() {
  return (
    <div>Dashboard</div>
  )
}



// import { getAuth, signOut } from 'firebase/auth';
// import { getFirestore, collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
// import 'leaflet/dist/leaflet.css';
// import L, { TileLayer } from 'leaflet';
// import 'leaflet.markercluster';
// import { useState, useEffect, useRef } from 'react';
// import '@livekit/components-styles';

// const livekitUrl  = 'wss://claudev-09yjawm8.livekit.cloud';
// const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDk0MTM3NTcsImlzcyI6IkFQSVBHOEVLZ1lvbWFiWSIsIm5iZiI6MTc0NjQxMzc1Nywic3ViIjoiNSIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiJTZWd1cmlkYWRQdWJsaWNhIiwicm9vbUpvaW4iOnRydWV9fQ.rB-2g5cIemqhKtfeVNKA0zWZ4zRG4Wqoa2spvEftNeU';

// const Dashboard = () => {
//   const mapRef = useRef(null);
//   const baseLayerRef = useRef<TileLayer>(null);
//   const realMapLayerRef = useRef<TileLayer>(null);
//   const [estadoUsuario, setEstadoUsuario] = useState("Desconocido");
//   const [estadoConectividad, setEstadoConectividad] = useState("Desconocido");
//   const [estadoUbicacion, setEstadoUbicacion] = useState("Desconocido");





//   useEffect(() => {
//     const db = getFirestore();
//     baseLayerRef.current = L.tileLayer();
//     realMapLayerRef.current = L.tileLayer();


//     // Inicializar el mapa solo una vez

//     if (!mapRef.current?._leaflet_id) {
//       let mapContainer = L.DomUtil.get('map');
//       if (mapContainer && mapContainer._leaflet_id) {
//         mapContainer._leaflet_id = null;
//       }

//       const map = L.map('map').setView([-41.6107, -73.6073], 13);
//       mapRef.current = map;

//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; OpenStreetMap contributors',
//       }).addTo(map);

//       const markerCluster = L.markerClusterGroup();
//       map.addLayer(markerCluster);
      
//       // Escuchar en tiempo real la colección "incidentes"
//       const usuarioIcon = L.divIcon({
//         className: 'usuario-icon',
//         html: `
//             <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
//               <path fill="#74b3dc" d="M12 2a9 9 0 0 0-9 9c0 4.17 2.84 7.67 6.69 8.69L12 22l2.31-2.31C18.16 18.67 21 15.17 21 11a9 9 0 0 0-9-9m0 2c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3m0 14.3a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08c1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22"/>
//             </svg>
//         `,
//         iconSize: [1, 1],
//         iconAnchor: [22, 24],
//       });
      
      
//           const marcadorUsuario = L.marker([-41.6107, -73.6073], { icon: usuarioIcon })
//             .addTo(map)
//             .bindPopup(`<b>👤 Usuario</b><br/>Comuna: Maullín<br/>Edad: 35<br/>`);
      
//           onSnapshot(doc(db, 'ubicaciones', 'usuario_1'), (docSnap) => {
//             if (docSnap.exists()) {
//               const data = docSnap.data();
//               marcadorUsuario.setLatLng([data.latitud, data.longitud]);
//               map.panTo([data.latitud, data.longitud]);
//             }
            
//           });
      
//           const incidentesRef = collection(db, 'incidentes');
//           onSnapshot(incidentesRef, (snapshot) => {
//             markerCluster.clearLayers();
//             snapshot.forEach((doc) => {
//               const data = doc.data();
//               if (data.lat && data.lng) {
//                 const iconoIncidente = L.divIcon({
//                   html: `
//                     <div style="width: 24px; height: 24px;">
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="49" height="49">
//                         <path fill="#74b3dc" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5"/>
//                       </svg>
//                     </div>
//                   `,
//                   iconSize: [0, 0],
//                   iconAnchor: [26,24],
//                 });
                
//                 const marker = L.marker([data.lat, data.lng], { icon: iconoIncidente }).bindPopup(`
//                   <b>Razón:</b> ${data.razon_cambio || 'Sin descripción'}<br>
//                   <b>ID:</b> ${doc.id}
//                 `);
                
//                 markerCluster.addLayer(marker);
//               }
//             });
//           });

//       map.on('click', (e) => {
//         document.getElementById('lat').value = e.latlng.lat;
//         document.getElementById('lng').value = e.latlng.lng;
//         document.getElementById('editarModal').style.display = 'block';
//         document.getElementById('modal-overlay').style.display = 'block';
//       });

//         // Escuchar el estado del usuario
//         const estadoUnsub = onSnapshot(doc(db, "estado_usuarios", "usuario_1"), (docSnap) => {
//           if (docSnap.exists()) {
//             const data = docSnap.data();
//             setEstadoUsuario(data.estado || "Sin datos");
//           }
//         });
//         // Escuchar el estado de conectividad y ubicación

//         const conectividadUnsub = onSnapshot(doc(db, "estado_usuarios", "usuario1"), (docSnap) => {
//           if (docSnap.exists()) {
//             const data = docSnap.data();
//             setEstadoConectividad(data.estado || "Sin datos");
//           }
//         });
//         const ubicacionUnsub = onSnapshot(doc(db, "estado_usuarios", "usuario1"), (docSnap) => {
//           if (docSnap.exists()) {
//             const data = docSnap.data();
//             setEstadoUbicacion(data.estado || "Sin datos");
//           }
//         });
       
//     }
//   },
  
  

//   []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const db = getFirestore();
//     const lat = parseFloat(document.getElementById('lat').value);
//     const lng = parseFloat(document.getElementById('lng').value);
//     const razon = document.getElementById('razon_cambio').value;

//     const newDoc = doc(collection(db, 'incidentes'));
//     await setDoc(newDoc, { lat, lng, razon_cambio: razon });

//     document.getElementById('formEditar').reset();
//     closeModal();
//   };

//   const closeModal = () => {
//     document.getElementById('editarModal').style.display = 'none';
//     document.getElementById('modal-overlay').style.display = 'none';
//   };


//   const [connectToCamera, setConnectToCamera] = useState(false);

//   const toggleWidget = () => {
//     const widget = document.getElementById('camera-widget');
//     if (widget?.classList.contains('collapsed')) {
//       widget.classList.remove('collapsed');
//     } else {
//       widget?.classList.add('collapsed');
//     }
//   };

//   const handleManualConnect = () => {
//     setConnectToCamera(true);
//   };

//   const [isConnected, setIsConnected] = useState(false);


//   return (
    
//     <>
//     <div style={{ position: "absolute", top: "80px", left: "10px", background: "white", padding: "8px", borderRadius: "8px", zIndex: 1000 }}>
//       <strong>Estado del Usuario:</strong> {estadoUsuario}
//     </div>
//     <div style={{ position: "absolute", top: "120px", left: "10px", background: "white", padding: "8px", borderRadius: "8px", zIndex: 1000 }}>
//       <strong>Estado del Conexion:</strong> {estadoConectividad}
//     </div>
//     <div style={{ position: "absolute", top: "160px", left: "10px", background: "white", padding: "8px", borderRadius: "8px", zIndex: 1000 }}>
//       <strong>Estado del Ubicacion:</strong> {estadoUbicacion}
//     </div>
    
//       <button
//         onClick={() => signOut(getAuth())}
//         style={{
//           position: 'absolute',
//           top: '10px',
//           right: '10px',
//           zIndex: 1001,
//           backgroundColor: 'grey',
//           color: 'white',
//           padding: '10px 15px',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer',
//         }}
//       >Cerrar sesión
        
//       </button>


      

//       <div style={{ position: 'absolute', top: '60px', right: '10px', zIndex: 1001 }}>


//       </div>

//       <div id="map" style={{ height: '100vh', width: '100%', zIndex: 0 }}></div>

      


//       <div id="editarModal" style={{
//         display: 'none',
//         position: 'fixed',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         backgroundColor: 'white',
//         padding: '20px',
//         borderRadius: '10px',
//         zIndex: 1100,
//         boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
//       }}>
//         <h3>Nuevo Incidente</h3>
//         <form id="formEditar" onSubmit={handleSubmit}>
//           <label>Latitud:</label>
//           <input type="text" id="lat" name="lat" readOnly /><br />
//           <label>Longitud:</label>
//           <input type="text" id="lng" name="lng" readOnly /><br />
//           <label>Razón del incidente:</label>
//           <textarea id="razon_cambio" name="razon_cambio" required></textarea><br />
//           <button type="submit" className="btn">Guardar</button>

//         </form>
//       </div>

//       <div id="modal-overlay" onClick={closeModal} style={{
//         display: 'none',
//         position: 'fixed',
//         top: 0, left: 0, right: 0, bottom: 0,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         zIndex: 1000
//       }}></div>
//     </>
//   );
// };

// export default Dashboard;      