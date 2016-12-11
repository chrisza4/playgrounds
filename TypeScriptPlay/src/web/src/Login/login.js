import React from 'react'
import { Row, Col, Card, Form, FormField, FormInput, Button } from 'elemental'
import { browserHistory } from 'react-router'
import rp from 'request-promise'

import '../styles.min.css'

const login = React.createClass({

  getInitialState () {
    return {
      username: '',
      password: '',
    }
  },

  onLogin () {
    const opts = {
      method: 'POST',
      uri: 'http://localhost:3001/login',
      json: {
        username: this.state.username,
        password: this.state.password
      }
    }
    console.log(this.state)
    rp(opts)
    .then(res => {
      if (res.success) {
        browserHistory.push('/mainpage')
      }
    })
  },

  onUsernameChange (e) {
    this.setState({
      username: e.target.value
    })
  },

  onPasswordChange (e) {
    this.setState({
      password: e.target.value
    })
  },

  render () {
    return (
      <div style={{ marginTop: 40 }}>
        <Row>
          <Col md='1/4' />
          <Col md='1/2'>
            <Card>
              <Form type='horizontal'>
                <FormField label='Username' htmlFor='basic-form-input-email'>
                  <FormInput
                    autoFocus
                    type='email'
                    placeholder='Enter email'
                    name='basic-form-input-email'
                    value={this.state.username}
                    onChange={this.onUsernameChange}
                  />
                </FormField>
                <FormField label='Password' htmlFor='basic-form-input-password'>
                  <FormInput
                    type='password'
                    placeholder='Password'
                    name='basic-form-input-password'
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                  />
                </FormField>
                <FormField offsetAbsentLabel>
                  <Button type='primary' onClick={this.onLogin}>Login</Button>
                </FormField>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
})

export default login