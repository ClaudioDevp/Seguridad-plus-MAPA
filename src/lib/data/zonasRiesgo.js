export const zonasGeoJson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          tipo: "tsunami",
          descripcion: "Zona de riesgo de tsunami",
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-73.616, -41.611],
              [-73.618, -41.613],
              [-73.620, -41.611],
              [-73.618, -41.609],
              [-73.616, -41.611],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: {
          tipo: "incendio",
          descripcion: "Zona de riesgo de incendio forestal",
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-73.605, -41.620],
              [-73.607, -41.622],
              [-73.609, -41.620],
              [-73.607, -41.618],
              [-73.605, -41.620],
            ],
          ],
        },
      },
    ],
  };
  