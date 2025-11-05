import React, { useState } from "react";
import { Stepper, Step, StepLabel, StepConnector, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import { Title } from "../../../Elements/Titulo/Titulo";
import { ListarEstudiantes } from "../ListarEstidantes/ListarEstudiantes";
import { ListarUsuario } from "../Usuarios/ListarUsuario";

export const StepperSimpleStudent = () => {
  const pasos = ["Estudiante", "Usuario"];
  const [activo, setActivo] = useState<number>(0); // índice del paso seleccionado

  const Conector = styled(StepConnector)({
    [`& .MuiStepConnector-line`]: {
      height: 3,
      border: 0,
      backgroundColor: "#ccc", // línea gris
    },
  });

  const IconoPaso = ({ index }: { index: number }) => {
    const iconos: any = {
      0: <SchoolIcon />,
      1: <PersonIcon />,
    };
    const seleccionado = activo === index;

    return (
      <div
        style={{
          background: seleccionado
            ? "linear-gradient(136deg, rgb(242,113,33), rgb(233,64,87), rgb(138,35,135))"
            : "#ccc",
          color: "white",
          borderRadius: "50%",
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={() => setActivo(index)}
      >
        {iconos[index]}
      </div>
    );
  };

  return (
    <>
      <Grid
        sx={{
          p: 4,
          backgroundColor: "#fafafa",
          borderRadius: 4,
          boxShadow: 4,
          m: 3,
        }}
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
      >
        {/* Título dinámico */}
        <Grid  size={12}>
          <Title title={`Lista de ${pasos[activo]}`} />
        </Grid>

        {/* Stepper */}
        <Grid  size={12}>
          <Stepper alternativeLabel activeStep={activo} connector={<Conector />}>
            {pasos.map((label, index) => (
              <Step key={label} active={activo === index}>
                <StepLabel StepIconComponent={() => <IconoPaso index={index} />}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>

      {/* Mostrar el componente según el paso activo */}
      {activo === 0 && <ListarEstudiantes />}
      {activo === 1 && <ListarUsuario />}
    </>
  );
};
