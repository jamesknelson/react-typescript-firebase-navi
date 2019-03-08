import React from 'react'
import styled from 'styled-components/macro'
import AppHeader from './AppHeader'
import LoadingIndicator from './LoadingIndicator'
import { NotFoundBoundary } from 'react-navi';
import { User } from '../types/User';

const Main = styled.main`
  margin: 3rem 1.5rem;
`

interface LayoutProps {
  children: React.ReactNode
  isLoading?: boolean
  user?: User | null
}

function Layout({ children, isLoading, user }: LayoutProps) {
  return (
    <>
      <LoadingIndicator active={isLoading} />
      <AppHeader user={user} />
      <Main>
        <NotFoundBoundary render={() => <NotFound />}>
          {children}
        </NotFoundBoundary>
      </Main>
    </>
  )
}

function NotFound() {
  return (
    <h1>This page is not available right now, but your call is important to us, so please leave a message.</h1>
  )
}

export default Layout