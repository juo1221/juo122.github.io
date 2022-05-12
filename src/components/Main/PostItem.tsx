import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { PostFrontmatterType } from 'types/PostItem.types'
import { GatsbyImage } from 'gatsby-plugin-image'

type PostItemProps = PostFrontmatterType & { link: string }

const PostItemWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  transition: 0.3s box-shadow;
  min-width: 300px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 5px #324a51;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    border-radius: 5px 5px 0 0;
  }
`

const ThumbnailImage = styled(GatsbyImage)`
  width: 300px;
  border-left: 1px solid lightgrey;
  @media screen and (max-width: 768px) {
    width: 100%;
    border-radius: 5px 5px 0 0;
    border-left: 0;
    border-bottom: 1px solid lightgrey;
  }
`
const PostItemContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 15px;
  @media screen and (max-width: 768px) {
    padding: 10px;
  }
`
const Title = styled.div`
  display: -webkit-box; //상자 가로로 정렬
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; // 상자 세로 정렬
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  margin-bottom: 3px;
  font-size: 20px;
  font-weight: 700;
  @media screen and (max-width: 768px) {
    margin-bottom: 0;
    font-size: 1rem;
  }
`
const Date = styled.div`
  font-size: 14px;
  font-weight: 400;
  opacity: 0.7;
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`
const Category = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px -5px;
  @media screen and (max-width: 768px) {
    margin-bottom: 0;
    font-size: 1rem;
  }
`
const CategoryItem = styled.div`
  margin: 2.5px 5px;
  padding: 0 0.5rem;
  border-radius: 10px;
  background: #ff7f50;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`
const Summary = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  margin-top: auto;
  font-size: 16px;
  opacity: 0.8;
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`
const PostItem: FunctionComponent<PostItemProps> = function ({
  title,
  date,
  categories,
  summary,
  thumbnail: {
    childImageSharp: { gatsbyImageData },
  },
  link,
}) {
  return (
    <PostItemWrapper to={link}>
      <PostItemContent>
        <Title>{title}</Title>
        <Date>{date}</Date>
        <Summary>{summary}</Summary>
        <Category>
          {categories.map(item => (
            <CategoryItem key={item}>{item}</CategoryItem>
          ))}
        </Category>
      </PostItemContent>
      <ThumbnailImage image={gatsbyImageData} alt="Post Item Image" />
    </PostItemWrapper>
  )
}

export default PostItem
