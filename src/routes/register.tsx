import React from 'react'
import { map, redirect, route } from 'navi'
import Form from '../styled/Form'
import { RoutingContext } from '../types/RoutingContext'
import AuthFormLayout from '../styled/AuthFormLayout'
import { colors } from '../utils/theme';

export default map(async (request, context: RoutingContext) => {
  if (context.currentUser) {
    return redirect('/')
  }

  if (request.method === 'post') {
    let { email, name, password } = request.body
    try {
      let auth = await context.firebase.auth.createUserWithEmailAndPassword(email, password);
      await auth.user!.updateProfile({
        displayName: name,
      })

      // Updating the profile does not cause Firebase to emit any events, so
      // we'll need to manually reload the user.
      await context.reloadUser()

      return redirect('/?welcome')
    }
    catch (error) {
      console.log(error, 'error')
      return route({
        error,
        view: <Register />
      })
    }
  }

  return route({
    view: <Register />
  })
})

function Register() {
  return (
    <AuthFormLayout heading='Sign Up'>
      <Form method='post'>
        <Form.Errors />
        <Form.Field
          label='Name'
          name='name'
          validate={value =>
            value === '' ? 'Please enter your name.' : undefined
          }
        />
        <Form.Field
          label='Email'
          name='email'
          validate={value =>
            value === '' ? 'Please enter your email.' : undefined
          }
        />
        <Form.Field
          label='Password'
          name='password'
          type='password'
          validate={value =>
            value === '' ? 'Please enter your password.' : undefined
          }
        />
        <Form.SubmitButton bgcolor={colors.red}>
          Sign Up
        </Form.SubmitButton>
      </Form>
    </AuthFormLayout>
  )
}