import React from "react"
import "./medidas.css"

function Medidas(props) {


    return (
        <div >
            <div className="medidas">


                <input type="radio" name="medidas" id="decimal" value={"dacimal"} onChange={() => props.guardarMedidas("decimal")} />
                <label htmlFor="decimal">Decimal</label>

                <input type="radio" name="medidas" id="imperial" value={"imperial"} onChange={() => props.guardarMedidas("imperial")} />
                <label htmlFor="imperial">Imperial</label>
            </div>
        </div>
    );

}

export default Medidas