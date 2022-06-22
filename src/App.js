import { useState, useEffect } from 'react';
import './App.css';
import Medidas from "./componentes/Medidas";
import Formulario from "./componentes/Formulario";
import Resultado from "./componentes/Resultado"
import { Button, TextField } from '@mui/material';


function App() {
  const [medidas, setMedidas] = useState("decimal");
  const [calorias, setCalorias] = useState(0)
  const [indicaciones, setIndicaciones] = useState("")
  let intervalos = true;

  const guardarMedidas = (medidas) => setMedidas(medidas);


  useEffect(() => {
    if (medidas === "decimal") {
      setIndicaciones("Peso entre: 40.50kg-300kg  Altura:1.40mts - 2.25mts")
    }
    if (medidas === "imperial") {
      setIndicaciones("Peso entre: 89.28lb - 661.38lb  Altura: 55.11in - 88.58in")
    }
    setCalorias(0)
  }, [medidas])

  const validar = (peso, altura, edad) => {

    if (medidas === "decimal") {
      if (peso >= 40.50 && peso <= 300 && altura >= 1.40 && altura <= 2.25 && edad >= 16 && edad <= 105) {
        intervalos = true;
      }
    }
    if (medidas === "imperial") {
      if (peso >= 89.2863 && peso <= 661.38 && altura >= 55.118 && altura <= 88.5825 && edad >= 16 && edad <= 105) {
        intervalos = true;
      }
    }
  }

  const calcularCalorias = (peso, altura, edad) => {
    let factor = 0;
    let kal
    //console.log("Peso: " + peso);
    //console.log("Altura: " + altura);
    console.log("Edad: " + edad);

    //validar(peso, altura, edad)
    if (intervalos === true) {


      if (medidas === "decimal") {

        let pesoRes = peso * 2.2046
        peso = pesoRes;

        let alturaRes = (altura * 100) * 0.3937;
        altura = alturaRes

      }
      if (peso < 165) { factor = 1.6; }
      if (peso >= 165 && peso <= 200) { factor = 1.4; }
      if (peso >= 201 && peso <= 220) { factor = 2.1; }
      if (peso > 220) { factor = 1 }

      kal = ((10 * peso) + (6.25 * altura) - (10 * edad) + 5) * factor
      setCalorias(kal.toFixed(4))
      // console.log(kal);
      // console.log("Peso: " + peso);
      // console.log("Altura: " + altura);
      // console.log("Edad: " + edad);
    } else {
      alert("Valores invalidos");
    }
  }




  return (
    <div className="App">

      <div className='cuerpo'>

        <h1>Calculadora de calorias</h1>
        <Medidas guardarMedidas={guardarMedidas} />
        <Formulario medidas={medidas} calcularCalorias={calcularCalorias} />
        <p>Por defecto esta escogida la medida decimal</p>
        <Resultado calorias={calorias} />

        <p>
          Edad: 16 años - 105 años<br />
          {indicaciones}
        </p>

      </div>
    </div>
  );
}

export default App;
