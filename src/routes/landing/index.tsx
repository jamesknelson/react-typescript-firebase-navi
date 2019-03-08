import React from 'react'
import { route } from 'navi'
import { RoutingContext } from '../../types/RoutingContext'

export default route((request, context: RoutingContext) => {
  if (context.currentUser === undefined) {
    return { view: <div /> }
  }

  return {
    view: (
      <div>
        <h1>Welcome, {context.currentUser ? context.currentUser.displayName : "Anonymous"}!</h1>
        <p>This app is UNDER CONSTRUCTION.</p>
      </div>
    )
  }
})