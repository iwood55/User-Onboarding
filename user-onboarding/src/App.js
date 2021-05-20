import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Form from './Form';
import * as yup from 'yup';
import schema from './Validation/formSchema'

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  termsOfService: '',
}
const initialFormErrors = {
  name: '',
  email: '',
  role: '',
  termsOfService: '',
}
const initialUsers = []
const initialDisabled = true

function App() {
  const [users, setUsers] = useState(initialUsers)          
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)      

  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([res.data, ...users])
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  }
  let newUsers = JSON.stringify(users)
  console.log(newUsers)

  const validate = (name, value) => {
    yup.reach(schema, name)
         .validate(value)
         .then(() => setFormErrors({...formErrors, [name]: ''}))
         .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
  }
  const inputChange = (name, value) => {
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value
    })
  }
  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      termsOfService: formValues.termsOfService,
    }
    postNewUser(newUser)
  }
  useEffect(() => {
    getUsers()
  }, [])
  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Users App</h1>
      </header>
      <Form
      values={formValues}
      change={inputChange}
      submit={formSubmit}
      disabled={disabled}
      errors={formErrors}
      />
      <pre>{newUsers}</pre>
    </div>
  );
}

export default App;
