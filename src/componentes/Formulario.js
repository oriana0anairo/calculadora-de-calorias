import React, { useEffect, useState } from "react";
import "./formulario.css"
import TextField from '@mui/material/TextField'
import claves from "./claves"

function Formulario(props) {
    const { data, setData } = props
    const [banErrorPeso, setBanErrorPeso] = useState()
    const [banErrorEdad, setBanErrorEdad] = useState()
    const [banErrorAltura, setBanErrorAltura] = useState()


    //_____________Capturar errores_______________
    const errorPeso = () => {
        const pesoMin = props.medidas === claves.decimal ? 40.50 : 89.2863
        const pesoMax = props.medidas === claves.decimal ? 300 : 661.38

        if (data.peso !== undefined) {
            if (!data.peso) setBanErrorPeso("La peso es requerida")
            if (data.peso < pesoMin || data.peso > pesoMax) setBanErrorPeso("Peso invalido")
            else setBanErrorPeso("")
        }
    }

    const errorAltura = () => {
        const alturaMin = props.medidas === claves.decimal ? 140 : 55.118
        const alturaMax = props.medidas === claves.decimal ? 225 : 88.5825

        if (data.altura !== undefined) {
            if (!data.altura) setBanErrorAltura("La altura es requerida")
            if (data.altura < alturaMin || data.altura > alturaMax) setBanErrorAltura("Altura invalida")
            else setBanErrorAltura("")
            console.log("Se ejecuto error altura: " + banErrorAltura);
        }
    }

    const errorEdad = () => {

        if (data.edad !== undefined) {
            if (!data.edad) setBanErrorEdad("La edad es requerida")
            if (data.edad < 16 || data.edad > 105) setBanErrorEdad("Edad invalida")
            else setBanErrorEdad("")
            console.log("Se ejecuto error edad: " + banErrorEdad);
        }
    }
    //__________________________________________________________________
    const handleChange = (e) => {//Guardo la data

        setData({
            ...data, [e.target.name]: e.target.value
        })
    }

    useEffect(() => {//Escucha la data para saber cuando cambia
        errorPeso()
        errorAltura()
        errorEdad()
        if (data.peso && data.edad && data.altura) {
            props.calcularCalorias(data.peso, data.altura, data.edad)
            console.log("entro")
        }

    }, [data])

    useEffect(() => {

        if (!banErrorAltura && data.altura) {
            props.convercion(data, setData)
        }
        if (!banErrorPeso && data.peso) {
            props.convercion(data, setData)
        }
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
                    error={Boolean(banErrorEdad)}
                    onChange={handleChange}
                    helperText={banErrorEdad}

                />

                <TextField
                    id="outlined-error-helper-text"
                    label="Peso"
                    name="peso"
                    value={data.peso || ''}
                    onChange={handleChange}
                    error={Boolean(banErrorPeso)}
                    onInput={(e) => {
                        e.target.value = e.target.value
                            .replace(/[^0-9.]/, "")
                            .replace(/(\..*)\./g, "$1");

                    }}
                    helperText={banErrorPeso}

                />

                <TextField
                    id="outlined-error-helper-text"
                    label="Altura"
                    name="altura"
                    value={data.altura || ""}
                    onChange={handleChange}
                    error={Boolean(banErrorAltura)}
                    onInput={(e) => {
                        e.target.value = e.target.value
                            .replace(/[^0-9.]/, "")
                            .replace(/(\..*)\./g, "$1");
                    }}
                    helperText={banErrorAltura}
                />

            </form>
        </div>
    );

}

export default Formulario