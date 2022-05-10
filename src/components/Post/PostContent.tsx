import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

interface PostContentProps {
  html: string
}

const MarkdownRenderer = styled.div`
  // Renderer Style
  display: flex;
  flex-direction: column;
  width: 700px;
  margin: 0 auto;
  padding: 100px 0;
  word-break: break-all;

  // Markdown Style
  font-size: 1rem;
  // Apply Padding Attribute to All Elements
  p {
    padding: 3px 0;
    color: #434343;
    font-family: Georgia;
  }

  // Adjust Heading Element Style
  h1,
  h2,
  h3 {
    font-weight: 800;
    margin-bottom: 30px;
  }

  * + h1,
  * + h2,
  * + h3 {
    margin-top: 60px;
  }

  hr + h1,
  hr + h2,
  hr + h3 {
    margin-top: 10px;
  }

  h1 + hr,
  h2 + hr,
  h3 + hr {
    margin-top: -30px;
  }

  h1 {
    font-family: sans-serif;
    color: #434343;
    font-size: 30px;
  }

  h2 {
    font-family: sans-serif;
    color: #434343;
    font-size: 25px;
  }

  h3 {
    font-family: sans-serif;
    color: #434343;
    font-size: 20px;
  }

  // Adjust Quotation Element Style
  blockquote {
    margin: 30px 0;
    padding: 5px 15px;
    border-left: 2px solid #9c2222;
    font-weight: 800;
  }

  // Adjust List Element Style
  ol,
  ul {
    margin-left: 40px;
    padding: 10px;
  }

  // Adjust Horizontal Rule style
  hr {
    border-color: #ffffff44;
  }
  hr + * {
    margin-top: 30px;
  }

  // Adjust Link Element Style
  a {
    font-size: 1.2rem;
    font-weight: 700;
    color: #12b886;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    &:before {
      content: '🔗 ';
    }
    &:hover {
      color: black;
    }
  }

  // Adjust strong Element Style

  strong {
    color: #e08728;
  }

  // Adjust img Element Style

  em {
    display: block;
    text-align: center;
    font-size: 1rem;
    color: light-grey;
  }

  // Adjust Code Style
  pre[class*='language-'] {
    margin: 30px 0;
    padding: 15px;
    font-size: 13px;
    border-radius: 3px;
    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.5);
      border-radius: 3px;
    }
  }

  code[class*='language-'],
  pre[class*='language-'] {
    tab-size: 2;
  } // Markdown Responsive Design
  @media (max-width: 768px) {
    width: 100%;
    padding: 80px 20px;
    line-height: 1.6;
    font-size: 14px;

    h1 {
      font-size: 23px;
    }

    h2 {
      font-size: 20px;
    }

    h3 {
      font-size: 17px;
    }

    img {
      width: 100%;
    }
  }
`

const PostContent: FunctionComponent<PostContentProps> = function ({ html }) {
  return <MarkdownRenderer dangerouslySetInnerHTML={{ __html: html }} />
}

export default PostContent
