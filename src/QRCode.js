import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
 
class QRCode extends Component {
  state = {
    result: 'No result'
  }
 
  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
      const wallet = this.state.result
      //send to next screen
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <div>
        <div style={{height: '100%', width: '100%'}}>
          <div style={{color: 'white', fontSize: 20, textAlign: 'center', padding: 15}}>Scan QR Code</div>
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    )
  }
}

export default QRCode