import React from 'react'
import { Row, Col, Card } from 'elemental'


const MainPage = React.createClass({
  render () {
    return (
      <div style={{ marginTop: 40 }}>
        <Row>
          <Col md='1/4' />
          <Col md='1/2'>
            <Card>
              Welcome to my secret
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
})

export default MainPage