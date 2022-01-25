import React, {useRef} from 'react'
import {Button, Container, Form} from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid'

export default function Login({onIdSubmit}) {

    const idRef = useRef()
    const idName = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        onIdSubmit({id:idRef.current.value, name: idName.current.value})
    }

    const createNewId = () => {
        onIdSubmit({id:uuidv4(),name: uuidv4()})
    }

    return (
        <Container className='align-items-center justify-content-center d-flex' style={{height: '90vh'}}>
            <Form className='w-100' onSubmit={handleSubmit}>
                <Form.Group>
                    <div className='text-center text-uppercase'>
                        <Form.Label className='font-weight-bold font'>
                            Enter Your Name
                        </Form.Label>
                    </div>
                    <Form.Control type='text' ref={idName} required />
                </Form.Group>
                <Form.Group>
                    <div className='text-center text-uppercase'>
                        <Form.Label className='font-weight-bold font'>
                            Enter Your ID
                        </Form.Label>
                    </div>
                    <Form.Control type='text' ref={idRef} required />
                </Form.Group>
                <Button type={'submit'} className={'mr-2'}>
                    Login
                </Button>
                <Button variant={'secondary'} onClick={createNewId}>
                    Create New ID
                </Button>
            </Form>
        </Container>
    )
}