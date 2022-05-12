import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import ProfileImage from 'components/Main/ProfileImage'
import { IGatsbyImageData } from 'gatsby-plugin-image'

type IntroductionProps = {
  profileImage: IGatsbyImageData
}

const Background = styled.div`
  width: 100%;
  background: url('https://source.unsplash.com/1600x900/?nature,water')
    center/cover no-repeat;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 768px;
  height: 400px;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    padding: 0 20px;
  }
`
// const SubTitle = styled.div`
//   font-size: 20px;
//   font-weight: 400;
//   color: #ececec;
//   @media (max-width: 768px) {
//     font-size: 15px;
//   }
// `

const Title = styled.div`
  margin-top: 5px;
  font-size: 35px;
  font-weight: 700;
  color: #ececec;

  @media (max-width: 768px) {
    font-size: 25px;
  }
`
const Introduction: FunctionComponent<IntroductionProps> = function ({
  profileImage,
}) {
  return (
    <Background>
      <Wrapper>
        <ProfileImage profileImage={profileImage} />
      </Wrapper>
    </Background>
  )
}
export default Introduction
