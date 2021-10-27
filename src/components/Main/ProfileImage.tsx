import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
type ProfileImageProps = {
  profileImage: IGatsbyImageData
}

// 자신이 원하는 프로필 이미지 링크로 설정해주세요.
// const PROFILE_IMAGE_LINK =
//   'https://online.codingapple.com/wp-content/uploads/2021/03/profile.png '

const ProfileImageWrapper = styled(GatsbyImage)`
  width: 150px;
  height: 150px;
  margin-bottom: 30px;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`

const ProfileImage: FunctionComponent<ProfileImageProps> = function ({
  profileImage,
}) {
  console.log(profileImage)
  return <ProfileImageWrapper image={profileImage} alt="Profile Image" />
}

export default ProfileImage
