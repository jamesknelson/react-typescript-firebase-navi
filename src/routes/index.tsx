import { lazy, mount } from 'navi'

const routes = mount({
  '/': lazy(() => import('./landing')),
  '/login': lazy(() => import('./login')),
  '/register': lazy(() => import('./register')),
  '/logout': lazy(() => import('./logout')),

  '/account': lazy(() => import('./account/details')),
})

export default routes