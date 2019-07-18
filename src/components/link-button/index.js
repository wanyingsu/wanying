import React from 'react'

import './index.less'

export default function LinkButton (props) {
  return <button className="link-button" {...props}/>
}
// onClick={() => { this.setState({ showStatus: 1 }) }}