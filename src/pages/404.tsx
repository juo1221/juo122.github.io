import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import GlobalStyle from 'components/Common/GlobalStyle'

const NotFoundPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
  }
`

const NotFoundText = styled.div`
  font-size: 90px;
  font-weight: 800;
  color: #e9ca59;

  @media (max-width: 768px) {
    font-size: 80px;
    writing-mode: vertical-lr;
    margin-right: 32px;
  }
`

const NotFoundDescription = styled.div`
  font-size: 25px;
  text-align: center;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 20px;
    text-align: start;
    margin-right: 32px;
    writing-mode: vertical-lr;
  }
`

const GoToMainButton = styled(Link)`
  margin-top: 30px;
  font-size: 20px;
  text-decoration: underline;

  &:hover {
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    font-size: 20px;
    &::after {
      content: ' 가기!';
    }
  }
`

const NotFoundPage: FunctionComponent = function () {
  return (
    <NotFoundPageWrapper>
      <GlobalStyle />
      <NotFoundText>잘못 왔어요!</NotFoundText>
      <NotFoundDescription>
        찾을 수 없는 페이지입니다. <br />
        다른 콘텐츠를 보러 가보시겠어요?
      </NotFoundDescription>
      <GoToMainButton to="/">메인으로</GoToMainButton>
    </NotFoundPageWrapper>
  )
}

export default NotFoundPage
