import CryptoJS from "crypto-js"

/* @params
** type: Valid values are image, raw, video(use video for audio) and auto
** tags: array, use the username inside an array, so we can look them up in the cdn if we have to.
*/

export const handleCloudinaryUpload = (file, type, folder, tags) => {
  return new Promise(resolve => {
    var formdata = new FormData()

    formdata.append("file", file)
    formdata.append("folder", folder) // not used, possibly remove
    formdata.append("tags", tags)
    formdata.append("cloud_name", process.env.CLOUDINARY_CLOUD_NAME)
    formdata.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET)

    // NOTE: You need to add the event listeners before calling open() on the request. Otherwise the progress events will not fire.

    var xhr = new XMLHttpRequest()

    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${
        process.env.CLOUDINARY_CLOUD_NAME
      }/${type}/upload`,
      true
    )

    xhr.onload = () => {
      resolve(JSON.parse(xhr.response))
    }

    xhr.onerror = () => {
      resolve(undefined)
    }

    xhr.send(formdata)
  })
}

export const getPublicId = url => {
  var split = url.split("/")
  var lastIndex = split[split.length - 1]
  lastIndex = lastIndex.substring(0, lastIndex.lastIndexOf("."))
  console.log(typeof lastIndex)
  console.log(lastIndex)
  return lastIndex
}

// TODO:
// review this and replace the existing one in course-create
// moved to server for Admin API

export const handleCloudinaryDelete = (url, type) => {
  return new Promise(resolve => {
    console.log("type: ", type)
    const public_id = getPublicId(url)

    const timestamp = (Date.now() / 1000 || 0).toString()
    const apiSecret = process.env.CLOUDINARY_API_SECRET
    const hashString = `public_id=${public_id}&timestamp=${timestamp}${apiSecret}`
    const signature = CryptoJS.SHA1(hashString).toString()

    var formdata = new FormData()

    formdata.append("api_key", process.env.CLOUDINARY_API_KEY)
    /* formdata.append("public_id", public_id) */
    formdata.append("signature", signature)
    formdata.append("timestamp", timestamp)

    var xhr = new XMLHttpRequest()

    /* xhr.open( */
    /*   "DELETE", */
    /*   `https://api.cloudinary.com/v1_1/${ */
    /*     process.env.CLOUDINARY_CLOUD_NAME */
    /*   }/resources/${type}`, */
    /*   true */
    /* ) */

    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${
        process.env.CLOUDINARY_CLOUD_NAME
      }/derived_resources?derived_resource_ids[]=${public_id}/destroy`,
      true

      /* "POST", */
      /* `https://api.cloudinary.com/v1_1/${ */
      /*   process.env.CLOUDINARY_CLOUD_NAME */
      /* }/image/destroy`, */
      /* true */
    )

    xhr.send(formdata)

    xhr.onload = () => {
      resolve(JSON.parse(xhr.response))
    }

    xhr.onerror = () => {
      resolve(undefined)
    }
  })
}
