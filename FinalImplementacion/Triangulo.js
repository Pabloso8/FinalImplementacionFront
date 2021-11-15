import React, { Fragment, useState } from 'react'
import { Button, Card, Row, Col, CardHeader, Input } from 'reactstrap'
import CardTitle from 'reactstrap/lib/CardTitle'
import CardBody from 'reactstrap/lib/CardBody'
import axios from 'axios'

const Triangulo = () => {

    const [respuesta, setRespuesta] = useState("")
    const [exito, setExito] = useState(false)

    const [error, setError] = useState(false)
    const [mensajeError, setMensajeError] = useState("")

    const [valorLado1, setValorLado1] = useState("")
    const [valorLado2, setValorLado2] = useState("")
    const [valorLado3, setValorLado3] = useState("")


    const enviarDatos = async () => {


        await axios.get(`https://backfinalimplementacion.herokuapp.com/triangulo/triangulo/${parseInt(valorLado1)}/${parseInt(valorLado2)}/${parseInt(valorLado3)}`)
            .then((res) => {

                setError(false)
                setExito(true)
                if (res.data === "Triángulo no válido") {
                    setMensajeError("Triángulo no válido")
                    setError(true)
                    setExito(false)
                } else {
                    console.log(res)
                    setRespuesta(res.data)
                }

            }).catch((err) => {
                setMensajeError("Error de red")
                setError(true)
                setExito(false)
            })
    }
    const verificardatos = (lado1, lado2, lado3) => {
        if (isNaN(lado1) || isNaN(lado2) || isNaN(lado3) || isNaN(parseFloat(lado1)) || isNaN(parseFloat(lado2)) || isNaN(parseFloat(lado3))) {
            setMensajeError("Algún dato no es número")
            setError(true)
            setExito(false)

        } else if (lado1 === "" || lado2 === "" || lado3 === "") {
            setMensajeError("Algún dato falta")
            setError(true)
            setExito(false)

        } else if (parseFloat(lado1) <= 0 || parseFloat(lado2) <= 0 || parseFloat(lado3) <= 0) {
            setMensajeError("Algún dato es muy pequeño")
            setError(true)
            setExito(false)

        } else if (parseFloat(lado1) > 10000000 || parseFloat(lado2) > 10000000 || parseFloat(lado3) > 10000000) {
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
                    <CardTitle tag='h4'>Área y perímetro de un triángulo</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                    </div>
                </CardHeader>
                <CardBody >
                    <p></p>
                    <h5>Digite el valor de cada lado del triángulo:</h5>
                    <Row>
                        <Col>
                            <Input id="input1" placeholder={"Lado 1"} style={{ width: "100%" }} onChange={(e) => { setValorLado1(e.target.value.replace(",", ".")) }}> </Input></Col>
                        <Col>
                            <Input id="input2" placeholder={"Lado 2"} style={{ width: "100%" }} onChange={(e) => { setValorLado2(e.target.value.replace(",", ".")) }}> </Input></Col>
                        <Col>
                            <Input id="input3" placeholder={"Lado 3"} style={{ width: "100%" }} onChange={(e) => { setValorLado3(e.target.value.replace(",", ".")) }}> </Input></Col>
                        <Col>
                            <Button id="button"  color="primary" size="md" onClick={() => { verificardatos(valorLado1, valorLado2, valorLado3) }}> Calcular</Button>
                        </Col>
                    </Row>
                    <p></p>
                    {(error) ? <h5 id="response3" className="text-danger">Error: {mensajeError}</h5> : ""}
                    {(exito) ? <div><h5 className="text-success">La resultado es: </h5 >
                        <p></p>  <h5 id="response1" > Perímetro: {respuesta.perimetroTri}</h5> <p></p> <h5 id="response2" > Área: {respuesta.areaTri}</h5> </div> : ""}
                </CardBody>
            </Card>
        </Fragment>
    )
}
export default Triangulo
