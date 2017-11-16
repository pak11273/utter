export default {
  greetings: {
    ['hello']: {
      english: {roman: 'hello', spelling: 'hello'},
      french: {roman: 'pending', spelling: 'pending'},
      korean: {
        informal: {
          roman: 'anYeong',
          spelling: 'ㄱ',
          audioUrl: '/audio/korean/phrases/anYeong.mp3'
        },
        formal: {
          roman: 'anYeongHaSeYo',
          spelling: 'ㄱ',
          audioUrl: '/audio/korean/phrases/anYeongHaSeYo.mp3'
        }
      },
      spanish: {
        informal: {
          roman: 'pending',
          spelling: 'pending',
          audioUrl: '/audio/spanish/phrases/hola.mp3'
        },
        formal: {
          roman: 'pending',
          spelling: 'pending',
          audioUrl: '/audio/spanish/phrases/hola.mp3'
        }
      }
    },
    ['bye']: {
      english: {roman: 'bye', spelling: 'bye'},
      french: {roman: 'pending', spelling: 'pending'},
      korean: {
        ['staying']: {
          informal: {
            roman: 'anYeong',
            spelling: '',
            audioUrl: '/audio/korean/phrases/anYeong.mp3'
          },
          formal: {
            roman: 'anYeongHiGyeSeYo',
            spelling: 'ㄱ',
            audioUrl: '/audio/korean/phrases/anYeongHiGyeSeYo.mp3'
          }
        },
        ['leaving']: {
          informal: {
            roman: 'anYeong',
            spelling: 'ㄱ',
            audioUrl: '/audio/korean/phrases/anYeong.mp3'
          },
          formal: {
            roman: 'anYeongHiGaSeYo',
            spelling: 'ㄱ',
            audioUrl: '/audio/korean/phrases/anYeongHiGaSeYo.mp3'
          }
        }
      },
      spanish: {
        informal: {
          roman: 'pending',
          spelling: 'pending',
          audioUrl: '/audio/spanish/phrases/adios.mp3'
        }
      }
    }
  }
}
