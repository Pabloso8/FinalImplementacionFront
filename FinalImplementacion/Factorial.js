import React, { Fragment, useState } from 'react'
import { Button, Card, Row, Col, CardHeader, Input } from 'reactstrap'
import CardTitle from 'reactstrap/lib/CardTitle'
import CardBody from 'reactstrap/lib/CardBody'
import axios from 'axios'

const Factorial = () => {

    const [respuesta, setRespuesta] = useState("")
    const [exito, setExito] = useState(false)

    const [error, setError] = useState(false)
    const [mensajeError, setMensajeError] = useState("")

    const [valorserie, setValorserie] = useState("")

    const enviarDatos = async () => {

        await axios.get(`https://backfinalimplementacion.herokuapp.com/factorial/factorial/${parseInt(valorserie)}`)
            .then((res) => {

                setError(false)
                setExito(true)
                setRespuesta(res.data)
            }).catch((err) => {
                setMensajeError("Error de red")
                setError(true)
                setExito(false)
            })
    }
    const verificardatos = () => {
        if (isNaN(valorserie)) {
            setMensajeError("No es número")
            setError(true)
            setExito(false)

        } else if (parseFloat(valorserie) % 1 !== 0) {
            setMensajeError("No es entero")
            setError(true)
            setExito(false)

        } else if (parseInt(valorserie) > 1000) {
            setMensajeError("Es muy grande el número")
            setError(true)
            setExito(false)

        } else if (parseInt(valorserie) < 1) {
            setMensajeError("Valor muy pequeño")
            setError(true)
            setExito(false)

        } else {
            setMensajeError("")
            setError(false)
            enviarDatos()
            // console.log(valorserie)
        }
    }
    return (
        <Fragment>
            <Card>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <CardTitle tag='h4'>Factorial de un número</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                    </div>
                </CardHeader>
                <CardBody >
                    <p></p>
                    <h5>Digite el número para calcular su factorial:</h5>
                    <Row>
                        <Col>
                            <Input id="input" placeholder={"Factorial"} style={{ width: "100%" }} onChange={(e) => { setValorserie(e.target.value.replace(",", ".")) }}> </Input></Col>
                        <Col>
                            <Button id="button" color="primary" size="md" onClick={() => { verificardatos() }}> Calcular</Button>
                        </Col>
                    </Row>
                    <p></p>
                    {(error) ? <h5 className="text-danger">Error: {mensajeError}</h5> : ""}
                    {(exito) ? <div><h5 className="text-success">El factorial es: </h5 >
                        <h5 id="response">{respuesta}</h5></div> : ""}
                </CardBody>
            </Card>
        </Fragment>
    )
}
export default Factorial
