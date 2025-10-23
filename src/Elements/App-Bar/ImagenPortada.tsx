
export  const ImagenPortada = () => {
  return (
    <div>
      <img src='/image/naruto.jpg'  alt="Instagram" style={{ width:250}}/>
    </div>
  )
}



export  const ImagenFondo = () => {

  return (
    <div style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}>
      <img src="../image/Background.png" alt="Instagram" style={{ width: "100%", height: "100%", objectFit: "cover", zIndex: -1}} />
    </div>
  )
}



export  const ImagenLibro = () => {
  return (
    <div style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}>
      <img src="../image/menu/estudiante.jpg" alt="Instagram" style={{ width: "100%", height: "100%", objectFit: "cover", zIndex: -1,opacity: 0.5 }} />
    </div>
  )
}




export  const ImagenProfesor = () => {
  return (
    <div style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}>
      <img src="../image/menu/libro.jpg" alt="Instagram" style={{ width: "100%", height: "100%", objectFit: "cover", zIndex: -1,opacity: 0.5 }} />
    </div>
  )
}




export  const ImagenAutor = () => {
  return (
    <div style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}>
      <img src="../image/menu/profe.jpg" alt="Instagram" style={{ width: "100%", height: "100%", objectFit: "cover", zIndex: -1,opacity: 0.5 }} />
    </div>
  )
}



export  const ImagenfONDO = () => {
  return (
    <div style={{ width: "100%", marginLeft: -45,marginTop:-15, left: 0 }}>
      <img src="../image/FONDO-COMPENSAR.jpg" alt="FONDO-COMPENSAR" style={{ width: "105%",height:480, objectFit: "cover", zIndex: -1,opacity: 0.5 }} />
    </div>
  )
}


