import { AuthWebView } from '@livechat/customer-auth'
import { init } from '@livechat/customer-sdk'
import React, { Component } from 'react';

export default class Chat extends Component{
  customerSDK = null

  componentDidMount() {
    this.customerSDK = init({
      licenseId: 12439791,
      clientId: '50a5b8f3ac7d7b5fce54b407d4853948',
      redirectUri: 'https://www.google.com',
    })
    // you can start using customerSDK from now
  }

  render() {
    return (
      <View>
        <AuthWebView />
      </View>
    )
  }
 
}

