import { useState, useEffect } from 'react';
import './App.css';
import Medidas from "./componentes/Medidas";
import Formulario from "./componentes/Formulario";
import Resultado from "./componentes/Resultado"
import { Button, TextField } from '@mui/material';
import claves from "./componentes/claves"


function App() {
  const [medidas, setMedidas] = useState(claves.decimal);
  const [calorias, setCalorias] = useState(0)
  const [indicaciones, setIndicaciones] = useState("")

  //------------------------------------------------
  const [data, setData] = useState({})
  //const [dataImperial, setDataImperial] = useState({})
  //const [dataDataDecimal, setDataDecimal]

  //Guarda el tipo de medidas en el useState del padre
  const guardarMedidas = (medidas) => setMedidas(medidas);


  useEffect(() => {//Mensaje que se muestra en la parte de abajo
    if (medidas === claves.decimal) {
      setIndicaciones("Peso entre: 40.50kg-300kg  Altura:140cm - 225cm")
    }
    if (medidas === claves.imperial) {
      setIndicaciones("Peso entre: 89.28lb - 661.38lb  Altura: 55.11in - 88.58in")
    }
  }, [medidas])


  //Funcion para hacer la transformacion
  const convercion = (data, setData) => {

    if (medidas === claves.imperial)
      setData({ ...data, altura: data.altura / 2.54, peso: data.peso / 0.45359237 })

    if (medidas === claves.decimal)
      setData({ ...data, altura: data.altura * 2.54, peso: data.peso * 0.45359237 })

  }

  //calcula las calorias
  const calcularCalorias = (peso, altura, edad) => {
    let factor = 0;
    let kal

    const alturaMin = medidas === claves.decimal ? 140 : 55.118
    const alturaMax = medidas === claves.decimal ? 225 : 88.5825

    const pesoMin = medidas === claves.decimal ? 40.50 : 89.2863
    const pesoMax = medidas === claves.decimal ? 300 : 661.38

    if (altura < alturaMin || altura > alturaMax || peso < pesoMin || peso > pesoMax || edad < 16 || edad > 105) {
      return
    }

    if (medidas === claves.decimal) {//valida si en decimales 

      let pesoRes = peso * 2.20462
      peso = pesoRes;

      let alturaRes = altura * 0.393701;
      altura = alturaRes

    }//si esta en decimales se cambia imperial


    //__________________FACTOR________________________
    if (peso < 165) { factor = 1.6; }
    if (peso >= 165 && peso <= 200) { factor = 1.4; }
    if (peso >= 201 && peso <= 220) { factor = 2.1; }
    if (peso > 220) { factor = 1 }
    //___________________________________________________

    kal = ((10 * peso) + (6.25 * altura) - (10 * edad) + 5) * factor
    setCalorias(kal.toFixed(0))

  }

  return (
    <div className="App">

      <div className='cuerpo'>

        <h1>Calculadora de calorias</h1>
        <Medidas medidas={medidas} guardarMedidas={guardarMedidas} />
        <Formulario
          medidas={medidas}
          calcularCalorias={calcularCalorias}
          convercion={convercion}
          data={data}
          setData={setData}

        />
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
