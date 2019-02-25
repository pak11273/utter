  handleImageUpload(files) {
    // remove previous files from cdn
    if (!isEmpty(this.state.uploadedFile)) {
      console.log("file: ", this.state.uploadedFile)
      this.handleImageDelete(this.state)
    }
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData()
      formData.append("file", file)
      formData.append("tags", `course-name`)
      formData.append("upload_preset", "z28ks5gg") // Replace the preset name with your own
      formData.append("folder", "course-thumbnails") // Folder to place image in
      formData.append("api_key", "225688292439754") // Replace API key with your own Cloudinary key
      formData.append("timestamp", Date.now() / 1000 || 0)

      // set loading and disable submit
      const newState = update(this.state, {
        loading: {$set: true},
        disable: {$set: true}
      })

      this.setState(newState)

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios({
        method: "POST",
        url: "https://api.cloudinary.com/v1_1/dgvw5b6pf/image/upload/",
        data: formData
      })
        .then(res => {
          const {data} = res

          const newState = update(this.state, {
            public_id: {$set: data.public_id},
            secure_url: {$set: data.secure_url},
            signature: {$set: data.signature},
            url: {$set: data.url}
          })

          this.setState(newState)

          this.props.setFieldValue("courseImage", data.secure_url)

          return data
        })
        .catch(err => {
          console.log("upload error: ", err)
        })
    })

    // Once all the files are uploaded
    axios.all(uploaders).then(values => {
      /* const {id} = this.props.course */
      /* const newCdn = {cdn: values[0]} */
      const courseImage = values[0].secure_url

      const newState = update(this.state, {
        courseImage: {$set: courseImage},
        loading: {$set: false},
        disable: {$set: false}
      })

      this.setState(newState)

      /* this.setState({}) */

      // TODO: update Course on server
      /* this.props.updateSettings(this.props.course) */
    })
  }
