import React, { useEffect, useState } from "react";
import "./formulario.css"

function Formulario(props) {

    const [peso, setPeso] = useState(0)
    const [altura, setAltura] = useState(0)
    const [edad, setEdad] = useState(0)


    const tenerEdad = (e) => { setEdad(e.target.value) }
    const tenerPeso = (e) => { setPeso(e.target.value) }
    const tenerAltura = (e) => { setAltura(e.target.value) }

    useEffect(() => {

        setAltura("")
        setPeso("")
        setEdad("")

    }, [props.medidas])


    return (
        <div>
            <form>
                <label htmlFor="edad">Edad : </label>
                <input value={edad} type="number" id="edad" name="edad" onChange={tenerEdad}></input>

                <label htmlFor="peso">Peso : </label>
                <input value={peso} type="number" id="peso" name="peso" step={0.0001} onChange={tenerPeso}></input>

                <label htmlFor="altura">Altura : </label>
                <input value={altura} type="number" id="altura" name="altura" step={0.0001} onChange={tenerAltura}></input>

                <input className="Boton" type="button" value="Calcular" id="guardar" onClick={() => props.calcularCalorias(peso, altura, edad)} />
            </form>
        </div>
    );
}

export default Formulario