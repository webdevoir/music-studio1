import React from 'react'
import Pdf from './Pdf'
import Vid from './Vid'

const ResourceViewer = (props) => {


  let renderResource = <p>This resource has not been created yet. </p>

  if (props.resource.format === 'pdf') {
    renderResource = <Pdf url={props.resource.url} />
  }

  if (props.resource.format === 'vid') {
    renderResource = <Vid url={props.resource.url} />
  }

  // if (props.resource.format === 'aud') {
  //   return myResource
  // }

  // if (props.resource.format === 'doc') {
  //   return myResource
  // }

  return (
    <div>
      {renderResource}
    </div>
  )
}

export default ResourceViewer