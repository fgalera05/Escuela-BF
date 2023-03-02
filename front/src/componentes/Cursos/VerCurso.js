import { Badge, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import axios from "axios";

function VerCurso({course, lugares}) {
  const [curso, setCurso] = useState(course);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleClick = () => {
    navigate("/curso/alumnos/" + curso._id);
  };


  return (
    <>
        <Badge badgeContent={lugares} color="primary">
        <IconButton
          color="secondary"
          aria-label="agregar alumno"
          onClick={handleClick}
        >
          <GroupIcon />
        </IconButton>
        </Badge>
    </>
  );
}

export default VerCurso;
