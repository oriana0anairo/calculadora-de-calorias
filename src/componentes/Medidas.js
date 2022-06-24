import React from "react"
import "./medidas.css"
import claves from "./claves"

function Medidas(props) {


    return (
        <div >
            <div className="medidas">


                <input type="radio" name="medidas" id="decimal" value={"dacimal"} onChange={() => props.guardarMedidas(claves.decimal)} checked={props.medidas === claves.decimal} />
                <label htmlFor="decimal">Decimal</label>

                <input type="radio" name="medidas" id="imperial" value={"imperial"} onChange={() => props.guardarMedidas(claves.imperial)} checked={props.medidas === claves.imperial} />
                <label htmlFor="imperial">Imperial</label>
            </div>
        </div>
    );

}

export default Medidas