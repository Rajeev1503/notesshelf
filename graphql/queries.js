import { gql } from "graphql-request";

export const GET_ALL_POST = gql`
  query {
    posts {
      id,
      title,
      slug,
      subject {
        slug
      }
    }
  }
`;

export const GET_ALL_SEMESTER = gql`
  query {
    semesters {
      id,
      semesterName,
      subjects {
        id,
        subjectName,
        slug,
        isSubjectsExam,
      }
    }
  }
`;

export const GET_ALL_SUBJECT = gql`
  query {
    subjects {
      id,
      subjectName,
      slug,
      posts {
        slug
      }
    }
  }
`;
export const GET_SUBJECT_BY_SLUG = gql`
  query ($slug: String!){
    subject (where : {slug:$slug}){
      id,
      subjectName,
      slug,
      posts {
        id,
        title,
        slug, 
        subject {
          slug
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query ($slug: String!){
    post (where : {slug:$slug}) {
      id,
      title,
      slug,
      coverImage{
        url
      },
      postContent,
      subject {
        slug
      }
    }
  }
`;
export const GET_POST_BY_SUBJECT_SLUG = gql`
query ($slug: String!){
  posts (where : {subject : {slug:$slug}}){
    id,
    title,
    slug,
    category,
    excerpt,
    coverImage{
      url
    }
    subject {
      slug
    }
  }
}
`;
export const GET_ALL_LATEST_POST = gql`
  query ($isLatest: Boolean!){
    posts (where : {isLatest:$isLatest}) {
      id,
    title,
    slug,
    category,
    excerpt,
    coverImage{
      url
    }
    subject {
      slug
    }
    }
  }
`;
