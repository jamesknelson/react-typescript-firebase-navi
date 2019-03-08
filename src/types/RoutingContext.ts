import Firebase from '../Firebase'
import { User } from './User'

export interface RoutingContext {
  currentUser:
    | User
    | null // anonymous
    | undefined // app has just loaded, and we don't know the auth state,
  firebase: Firebase
  reloadUser: () => void,
}