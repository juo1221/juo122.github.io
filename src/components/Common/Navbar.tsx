import React, { FunctionComponent } from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Navbar: FunctionComponent = function () {
  return (
    <Nabvar>
      <Name to="/">JooBle</Name>
      <GitHub as="a" href="https://github.com/juo1221">
        <FontAwesomeIcon icon={faGithub} />
      </GitHub>
    </Nabvar>
  )
}

const Nabvar = styled.footer`
  display: flex;
  font-size: 15px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`
const Name = styled(Link)`
  font-size: 1.5rem;
  padding: 0 0.8rem;
`
const GitHub = styled.a`
  font-size: 1.5rem;
  padding: 0 0.8rem;
`

export default Navbar
