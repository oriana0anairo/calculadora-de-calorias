import React, { useEffect, useState } from "react";
import "./formulario.css"
import TextField from '@mui/material/TextField'

function Formulario(props) {

    const [bamErrorPeso, setBanErrorPeso] = useState()
    const [bamErrorEdad, setBanErrorEdad] = useState()
    const [bamErrorAltura, setBanErrorAltura] = useState()



    const [data, setData] = useState({})

    const errorPeso = () => {
        const pesoMin = props.medidas === "decimal" ? 40.50 : 89.2863
        const pesoMax = props.medidas === "decimal" ? 300 : 661.38

        if (data.peso != undefined) {
            if (!data.peso) setBanErrorPeso("La peso es requerida")
            if (data.peso < pesoMin || data.peso > pesoMax) setBanErrorPeso("Peso fuera de rango")
            else setBanErrorPeso()
        }
    }

    const errorAltura = () => {
        const alturaMin = props.medidas === "decimal" ? 1.40 : 55.118
        const alturaMax = props.medidas === "decimal" ? 2.25 : 88.5825

        if (data.altura != undefined) {
            if (!data.altura) setBanErrorAltura("La altura es requerida")
            if (data.altura < alturaMin || data.altura > alturaMax) setBanErrorAltura("Altura fuera de rango")
            else setBanErrorAltura()
        }
    }

    const errorEdad = () => {

        if (data.edad != undefined) {
            if (!data.edad) setBanErrorEdad("La edad es requerida")
            if (data.edad < 16 || data.edad > 105) setBanErrorEdad("Edad fuera de rango")
            else setBanErrorEdad()
        }
    }



    const handleChange = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        errorPeso()
        errorAltura()
        errorEdad()
        if (!bamErrorAltura && !bamErrorEdad && !bamErrorPeso && data.peso && data.edad && data.altura)
            props.calcularCalorias(data.peso, data.altura, data.edad)
    }, [data])

    useEffect(() => {
        setData({
        })
    }, [props.medidas])//Recetea la data cuando se cambia de medida



    return (
        <div>
            <form>
                <TextField
                    id="outlined-error-helper-text"
                    label="Edad"
                    name="edad"
                    value={data.edad || ''}
                    onInput={(e) => {
                        e.target.value = e.target.value
                            .replace(/[^0-9]/, "")
                            .replace(/(\..*)\./g, "$1");

                    }}
                    error={Boolean(bamErrorEdad)}
                    onChange={handleChange}
                    helperText={bamErrorEdad}
                />

                <TextField
                    id="outlined-error-helper-text"
                    label="Peso"
                    name="peso"
                    value={data.peso || ''}
                    onChange={handleChange}
                    error={Boolean(bamErrorPeso)}
                    onInput={(e) => {
                        e.target.value = e.target.value
                            .replace(/[^0-9.]/, "")
                            .replace(/(\..*)\./g, "$1");

                    }}
                    helperText={bamErrorPeso}

                />

                <TextField
                    id="outlined-error-helper-text"
                    label="Altura"
                    name="altura"
                    value={data.altura || ""}
                    onChange={handleChange}
                    error={Boolean(bamErrorAltura)}
                    onInput={(e) => {
                        e.target.value = e.target.value
                            .replace(/[^0-9.]/, "")
                            .replace(/(\..*)\./g, "$1");

                    }}
                    helperText={bamErrorAltura}
                />

            </form>
        </div>
    );

}

export default Formulario