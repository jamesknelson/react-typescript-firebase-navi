import React, { Suspense, useState, useEffect, useMemo } from 'react'
import { withView, compose } from 'navi'
import { Router, View } from 'react-navi'
import firebase from 'firebase/app'
import Firebase from './Firebase'
import GlobalStyle from './GlobalStyle'
import routes from './routes'
import Layout from './styled/AppLayout'
import { RoutingContext } from './types/RoutingContext'

const routesWithLayout = compose(
  // Instead of rendering the latest `currentUser`, we render its value at the
  // time that the route was generated. Given that changing the user rebuilds
  // the route, it will always be up-to-date -- and doing it this way helps
  // avoid flashes of content when navigating between auth actions.
  withView((request, context: RoutingContext) =>
    <Layout user={context.currentUser}>
      <Suspense fallback={null}>
        <View />
      </Suspense>
    </Layout>
  ),
  routes
)

function App() {
  let [firebase] = useState(() => new Firebase())
  let [currentUser, setCurrentUser] = useState<firebase.User | null | undefined>(undefined)
  useEffect(() => firebase.auth.onAuthStateChanged(user => {
    // Skip the initial change after registration where displayName is null.
    if (!user || user.displayName) {
      setCurrentUser(user)
    }
  }), [])
  let { displayName, email } = currentUser || { displayName: currentUser, email: currentUser }

  // We need to pass in a new object when the values update, or Navi won't
  // notice the change and re-render.
  let user = useMemo(() => (
    (displayName && email) ? { displayName, email } : (currentUser as any)
  ), [displayName, email])

  console.log(user)

  let context: RoutingContext = {
    currentUser: user,
    firebase,

    // Firebase doesn't emit events when the user's profile changes, so this
    // can be used to manually refresh the user.
    reloadUser: () => firebase.auth.currentUser!.reload().then(() => {
      setCurrentUser(firebase.auth.currentUser)
    })
  }

  return (
    <Router routes={routesWithLayout as any} context={context}>
      <GlobalStyle />
      <View />
    </Router>
  )
}

export default App