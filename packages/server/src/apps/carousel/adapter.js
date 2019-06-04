import {Pixabay} from "./pixabay.js"

// TODO: get photos from an array of search terms
// generate a mapping to that array to another array of image urls

// if service has reached quota, move to the next available service
// have safe image customization
// have admin section to view quotas, details
/* import {Pixabay} from "./pixabay.js" */

export class PhotoAdapter {
  constructor(data) {
    const pixabayService = new Pixabay(data)
    /* const googleService = new Google(data) */

    this.functions = function(method) {
      if (method === "fetchPixabay") {
        return pixabayService.fetchPics(data)
      }
    }
  }

  /* const Pixa = new Pixabay() */
}
