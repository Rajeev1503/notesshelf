import { gql } from "graphql-request";
// import { gql }

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
      excerpt,
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
      subjectName,
      slug
    }
    }
  }
`;

// write to userSchema 
export const CREATE_USER = gql`
mutation ( $fullName : String!, $email : String!, $password : String! ) {
  createUserSchema(data:{fullName:$fullName, email:$email,password:$password, isAdmin:false}) {
    id
  }
  }
  `
export const SAVE_POST_TO_USERSCHEMA = gql`
mutation ( $email: String!, $postSlug : String! ) {
    updateUserSchema(
      where: {email: $email },
      data: {savedposts: {connect: {where: {slug: $postSlug}}}}
    ) {
      id,
      fullName
    }
  }
`
export const GET_ALL_SAVED_POST = gql`
query ( $email: String! ) {
    userSchema(
      where: {email: $email },
    ) {
      id,
      fullName,
      savedposts {
        id,
        title,
        slug,
        category,
        excerpt,
        coverImage{
          url
        }
        subject {
          subjectName,
          slug
        }
      }
    }
  }
`