import gql from "graphql-tag"

export const GET_PIXABAY_DATA = gql`
  query getPixabayData {
    getPixabayData {
      rateLimit
      remaining
      reset
    }
  }
`

/* export const GET_CAROUSEL_PICS = gql` */
/*   query getCarouselPics { */
/*     getCarouselPics { */
/*       list */
/*     } */
/*   } */
/* ` */
