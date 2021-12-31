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
  min-width: 500px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 5px #324a51;
  }
  @media (max-width: 768px) {
    margin: 8px 12px;
  }
`

const ThumbnailImage = styled(GatsbyImage)`
  width: 300px;
  border-left: 1px solid lightgrey;
`
const PostItemContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 15px;
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
`
const Date = styled.div`
  font-size: 14px;
  font-weight: 400;
  opacity: 0.7;
`
const Category = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px -5px;
`
const CategoryItem = styled.div`
  margin: 2.5px 5px;
  padding: 3px 5px;
  border-radius: 3px;
  background: black;
  font-size: 14px;
  font-weight: 700;
  color: white;
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
        <Category>
          {categories.map(item => (
            <CategoryItem key={item}>{item}</CategoryItem>
          ))}
        </Category>
        <Summary>{summary}</Summary>
      </PostItemContent>
      <ThumbnailImage image={gatsbyImageData} alt="Post Item Image" />
    </PostItemWrapper>
  )
}

export default PostItem
