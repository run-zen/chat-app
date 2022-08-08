import React, {Fragment, useRef, useState} from 'react'
import {Button, Container, Form} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {UserActions} from '../redux/reducers/user'
import {TokenAction} from '../redux/reducers/tokenReducer'
import FullLoader from "./shared/FullLoader";
import {chatApi} from "../services/axiosConfig";
import {API} from "../services/api";
import {useAlert} from "../context/snackbarContext";
import {asyncCall} from "../services/utils";

export default function Login() {

    const auth = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false)
    const [loadingMessage, setloadingMessage] = useState('')
    const alert = useAlert()
    const dispatch = useDispatch()

    const passwordRef = useRef()
    const phoneRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        loginUser()
    }

    const loginUser = async () => {
        alert.close()
        setLoading(true)
        setloadingMessage('logging in')
        const payload = {phone_number: phoneRef.current.value, password: passwordRef.current.value}

        const [res, err] = await asyncCall(chatApi.post, API.login, payload)

        if (res && res.status === 200) {
            dispatch({
                type: UserActions.setState,
                payload: res.data.user
            })
            dispatch({
                type: TokenAction.setState,
                payload: {token: res.data.access_token}
            })
            alert.success('Successfully logged in user', 'Login', 2000)
        }

        if (err) {
            alert.error('Invalid Credentials', 'Login')
        }

        setLoading(false)
        setloadingMessage('')
    }

    const createUser = async () => {
        alert.close()
        setLoading(true)
        setloadingMessage('creating user')
        const payload = {phone_number: phoneRef.current.value, password: passwordRef.current.value}

        const [res, err] = await asyncCall(chatApi.post, API.create, payload)

        if (res && res.data && res.data.statuscode === 200) {
            dispatch({
                type: UserActions.setState,
                payload: res.data.data
            })
            dispatch({
                type: TokenAction.setState,
                payload: {token: res.data.access_token}
            })
            alert.success('User Created', 'Login', 2000)
        }

        if (err) {
            alert.error('Invalid Credentials', 'Login')
        }

        setLoading(false)
        setloadingMessage('')
    }

    return (
        <Fragment>
            <Container className='align-items-center justify-content-center d-flex' style={{height: '90vh'}}>
                <Form className='w-25' onSubmit={handleSubmit}>
                    <Form.Group>
                        <div className='text-center text-uppercase'>
                            <Form.Label className='font-weight-bold font'>
                                Phone Number
                            </Form.Label>
                        </div>
                        <Form.Control type='text' ref={phoneRef} required/>
                    </Form.Group>
                    <Form.Group>
                        <div className='text-center text-uppercase'>
                            <Form.Label className='font-weight-bold font'>
                                Password
                            </Form.Label>
                        </div>
                        <Form.Control type='password' ref={passwordRef} required/>
                    </Form.Group>
                    <Button type={'submit'} className={'mr-2'}>
                        Login
                    </Button>
                    <a type={'button'} className={'mr-2'} onClick={createUser}>
                        signup
                    </a>
                </Form>
            </Container>
            {
                loading ?
                    <FullLoader message={loadingMessage}/> : null
            }
        </Fragment>
    )
}