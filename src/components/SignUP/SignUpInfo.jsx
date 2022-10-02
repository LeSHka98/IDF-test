import {useSelector, useDispatch} from 'react-redux'
import InputMask from 'react-input-mask'
import {useRef, useState, useEffect} from 'react'
import {changePhone, changeEMAIL, changePASSWORD, changeREPEATEDPASSWORD}  from './../../store/signUp'
import {ValidateSignUp} from '../../validation'
import {Form, Button, FloatingLabel} from 'react-bootstrap';
import styles from './SignUp.module.css'
import {SECOND_PAGE} from '../../constants'

function SignUpInfo({changePage}) {
  const [submiteted, setSubmited] = useState(false);
  const {email, phone, password, repeatedPassword} = useSelector(state => state.signUp)
  const dispatch = useDispatch()
  let [validate, setValidate] = useState({
    phone: false,
    email: false,
    password: false,
    repeatedPassword: false
  })

  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatRef = useRef();

  useEffect(() => {
    const save = () => {
      dispatch(changeEMAIL(emailRef.current.value))
      dispatch(changePASSWORD(passwordRef.current.value))
      dispatch(changeREPEATEDPASSWORD(repeatRef.current.value))
    }

    if (emailRef.current && passwordRef.current && repeatRef.current) {
      emailRef.current.addEventListener("change", save);
      passwordRef.current.addEventListener("change", save);
      repeatRef.current.addEventListener("change", save);
    }
    return () => {
      if (emailRef.current && passwordRef.current && repeatRef.current) {
        emailRef.current.removeEventListener("change", save);
        passwordRef.current.removeEventListener("change", save);
        repeatRef.current.removeEventListener("change", save);
      }
    };
  }, [emailRef, passwordRef, repeatRef]);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSubmited(true);
    const validationResult = ValidateSignUp({phone,email,password,repeatedPassword})
    setValidate(validate = validationResult)
    for(let i of Object.values(validationResult) ) { if(!i) return}
    changePage(SECOND_PAGE)
  };

  return (
    <>
      <h1 className={styles.signUpInfo}>SignUp Information</h1>
      <Form onSubmit={handleSubmit} noValidate className={styles.signUpInfo}>
        <FloatingLabel
          className={styles.floatingLabel}
          controlId="Phone"
          label="Phone"
        >
          <InputMask  mask="+375999999999" value={phone} onChange={(e) => dispatch(changePhone(e.target.value)) }>
              {() => <Form.Control type="text" isInvalid={!validate.phone && submiteted} />}
          </InputMask>
          <Form.Control.Feedback type="invalid"> Invalid phone </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel
          className={styles.floatingLabel}
          controlId="e-mail"
          label="E-mail"
        >
          <Form.Control type="email" isInvalid={!validate.email && submiteted}  ref={emailRef} defaultValue={email}/>
          <Form.Control.Feedback type="invalid"> Invalid e-mail </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel
          className={styles.floatingLabel}
          controlId="password"
          label="Password"
        >
          <Form.Control type="password" isInvalid={!validate.password && submiteted} ref={passwordRef}  defaultValue={password}/>
          <Form.Control.Feedback type="invalid"> Invalid password length</Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel
          className={styles.floatingLabel}
          controlId="repeatedPassword"
          label="Repeate Password"
        >
          <Form.Control 
            type="password" 
            isInvalid={!validate.repeatedPassword && submiteted} 
            ref={repeatRef}  
            defaultValue={repeatedPassword} 
          />
          <Form.Control.Feedback type="invalid"> Invalid repeated password </Form.Control.Feedback>
        </FloatingLabel>
        <Button type='submit' className={styles.button}>Next</Button>
      </Form>

    </>
  );
}

export default SignUpInfo;