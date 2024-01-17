import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useRouter } from 'next/router'

const WHome = styled.div`
  width: 100%;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(233, 233, 233);
  height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Home: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/admin/campaigns')
  }, [router])
  return <WHome>Home Page</WHome>
}

export default Home
