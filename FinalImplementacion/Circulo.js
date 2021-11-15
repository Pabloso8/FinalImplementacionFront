import React, { Fragment, useState } from 'react'
import { Button, Card, Row, Col, CardHeader, Input } from 'reactstrap'
import CardTitle from 'reactstrap/lib/CardTitle'
import CardBody from 'reactstrap/lib/CardBody'
import axios from 'axios'

const Circulo = () => {

    const [respuesta, setRespuesta] = useState("")
    const [exito, setExito] = useState(false)

    const [error, setError] = useState(false)
    const [mensajeError, setMensajeError] = useState("")

    const [valorRadio, setValorRadio] = useState("")


    const enviarDatos = async () => {

        await axios.get(`https://backfinalimplementacion.herokuapp.com/circulo/circulo/${parseInt(valorRadio)}`)
            .then((res) => {

                setError(false)
                setExito(true)
                console.log(res)
                setRespuesta(res.data)
            }).catch((err) => {
                setMensajeError("Error de red")
                setError(true)
                setExito(false)
            })
    }
    const verificardatos = (lado1) => {
        if (isNaN(lado1) || isNaN(parseFloat(lado1))) {
            setMensajeError("Algún dato no es número")
            setError(true)
            setExito(false)

        } else if (lado1 === "") {
            setMensajeError("Algún dato falta")
            setError(true)
            setExito(false)

        } else if (parseFloat(lado1) <= 0) {
            setMensajeError("Algún dato es muy pequeño")
            setError(true)
            setExito(false)

        } else if (parseFloat(lado1) > 10000000) {
            setMensajeError("Algún dato es muy grande")
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
                    <CardTitle tag='h4'>Área y perímetro de un círculo</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                    </div>
                </CardHeader>
                <CardBody >
                    <p></p>
                    <h5>Digite el valor del radio del círculo:</h5>
                    <Row>
                        <Col>
                            <Input  id="input" placeholder={"Radio círculo"} style={{ width: "100%" }} onChange={(e) => { setValorRadio(e.target.value.replace(",", ".")) }}> </Input></Col>

                        <Col>
                            <Button id="button" color="primary" size="md" onClick={() => { verificardatos(valorRadio) }}> Calcular</Button>
                        </Col>
                    </Row>
                    <p></p>
                    {(error) ? <h5 className="text-danger">Error: {mensajeError}</h5> : ""}
                    {(exito) ? <div><h5 className="text-success">La resultado es: </h5 >
                        <p></p>  <h5 id="response1" > Perímetro: {respuesta.perimetroCir}</h5> <p></p> <h5 id="response2" > Área: {respuesta.areaCir}</h5> </div> : ""}
                </CardBody>
            </Card>
        </Fragment>
    )
}
export default Circulo
