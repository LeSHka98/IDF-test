import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import {Form, Button, FloatingLabel} from 'react-bootstrap'
import {changeFirstName,changeLastName,changeSex,changeBirthday,changeOcean,changeHobby}  from './../../store/personalinfo'
import Schema from './../../Schema'
import {ValidatePersonalInfo} from './../../validation'
import ModalComponent from './../ModalComponent'
import styles from './PersonalInfo.module.css'
import {FIRST_PAGE} from '../../constants'

function PersonalInfo({changePage}) {
  let {firstName, lastName, sex, birthday, ocean, hobby} = useSelector(state => state.personalinfo)
  const dispatch = useDispatch()
  let [submiteted, setSubmited] = useState(false);
  let [showModal, setShowModal] = useState(false);
  let [validate, setValidate] = useState({
    firstName:false,
    lastName: false,
    sex: false,
    birthday: false,
    ocean: false,
    hobby: false
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSubmited(true);
    const validationResult = ValidatePersonalInfo({firstName,lastName,sex,birthday,ocean,hobby})
    setValidate(validate = validationResult)
    for(let i of Object.values(validationResult)) { if(!i) return}
    setShowModal(true)
  };

  return (
    <>
      <h1 className={styles.personalInfo}>Personal Information</h1>
      <Form onSubmit={handleSubmit} noValidate className={styles.personalInfo}>
        <FloatingLabel
          className={styles.floatingLabel}
          controlId="firstName"
          label="First Name"
        >
          <Form.Control 
            isInvalid={!validate.firstName && submiteted} 
            value={firstName} 
            onChange={(e) => dispatch(changeFirstName(e.target.value)) } 
          />
          <Form.Control.Feedback type="invalid"> Invalid First Name </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel
          className={styles.floatingLabel}
          controlId="lastName"
          label="Last Name"
        >
          <Form.Control 
            isInvalid={!validate.lastName && submiteted} 
            value={lastName} 
            onChange={(e) => dispatch(changeLastName(e.target.value)) }
          />
          <Form.Control.Feedback type="invalid"> Invalid Last Name </Form.Control.Feedback>
        </FloatingLabel>

        <Form.Group onChange={(e) => dispatch(changeSex(e.target.value)) }>
          <Form.Check 
            isInvalid={!validate.sex && submiteted} 
            id="Male" 
            inline label="Male" 
            type="radio" 
            name="sex"  
            value="Male" 
            defaultChecked={sex==="Male"}>
          </Form.Check>
          <Form.Check 
            isInvalid={!validate.sex && submiteted} 
            id="Female" 
            inline 
            label="Female" 
            type="radio" 
            name="sex"  
            value="Female" 
            defaultChecked={sex==="Female"}>
          </Form.Check>
        </Form.Group>
        <FloatingLabel
          controlId="birthday"
          label="Birthday"
          className={styles.floatingLabel}
        >
          <Form.Control 
            type="date" 
            isInvalid={!validate.birthday && submiteted} 
            value={birthday} 
            onChange={(e) => dispatch(changeBirthday(e.target.value)) } 
          />
          <Form.Control.Feedback type="invalid"> Invalid Age  </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel
          className={styles.floatingLabel}
          controlId="ocean"
          label="Ocean"
        >
          <Form.Select  value={ocean} onChange={(e) => dispatch(changeOcean(e.target.value))} isInvalid={!validate.ocean && submiteted}>
            <option disabled></option>
            { Schema.ocean.oneOf.map(i => <option key={i} value={i}>{ i }</option>)}
          </Form.Select>
          <Form.Control.Feedback type="invalid"> Invalid Ocean </Form.Control.Feedback>
        </FloatingLabel>
        <Form.Group className={styles.floatingLabel}>
          { Schema.hobby.anyOf.map(i => 
            <Form.Check
              key={i}
              label={i}
              id={i}  
              type="checkbox" 
              inline
              name="hobby" 
              value={i} 
              checked={hobby.includes(i)} 
              onChange={(e) => dispatch(changeHobby([e.target.value, e.target.checked]))} 
              isInvalid={!validate.hobby && submiteted}
            />
          )}
        </Form.Group>
        <Button className={styles.button} onClick={() => changePage(FIRST_PAGE)}>Back</Button>
        <Button className={styles.button} type='submit'>Show modal</Button>
      </Form>
      <ModalComponent showModal={showModal} setShowModal={setShowModal}/>
    </>  
  );
}

export default PersonalInfo;