import {PhotoAdapter} from "../apps/carousel/adapter.js"
import {io} from "../index.js"

class SocketZones {
  constructor(zoneId, vocabulary, modifier) {
    this.zoneId = zoneId
    this.vocabulary = vocabulary
    this.modifier = modifier
    this.pics = []
    this.io = io
  }

  // Carousel functions
  inititalizeCarousel() {
    const PAdapter = new PhotoAdapter({
      vocabulary: this.vocabulary,
      modifier: this.modifier
    })

    PAdapter.functions("fetchPixabay").then(async res => {
      try {
        const reducedSizeRandomVocabulary = res.map(arr => {
          return arr.map(item => {
            return {
              word: item.word,
              webformatHeight: item.webformatHeight,
              webformatWidth: item.webformatWidth,
              webformatURL: item.webformatURL
            }
          })
        })
        this.pics = reducedSizeRandomVocabulary

        await this.io.on("connection", socket => {
          socket.emit("init", this.pics)
        })
      } catch (err) {
        return err
      }
      /* return [null] */
    })
  }

  // Chat functions
}

export default SocketZones
