// template for words
//
// word: {
//   english: {roman: 'pending', spelling: 'pending'},
//   korean: {roman: 'pending', spelling: 'pending'},
//   spanish: {roman: 'pending', spelling: 'pending'}
// },
export default {
  category: {
    nouns: {
      animals: {
        pending: {
          english: {roman: 'boy', spelling: 'boy'},
          korean: {
            roman: 'so-nyeon',
            spelling: '소년',
            audioUrl: '/audio/vocab/soNyeon.mp3'
          },
          spanish: {roman: 'pending', spelling: 'pending'},
          french: {roman: 'pending', spelling: 'pending'}
        },
        pending: {
          english: {roman: 'girl', spelling: 'girl'},
          korean: {
            roman: 'so-nyeo',
            spelling: '소녀',
            audioUrl: '/audio/vocab/soNyeo.mp3'
          },
          spanish: {roman: 'pending', spelling: 'pending'},
          french: {roman: 'pending', spelling: 'pending'}
        }
      }
    },
    verbs: {
      run: {
        english: {roman: 'run', spelling: 'run'},
        korean: {
          roman: '',
          spelling: '',
          audioUrl: '/audio/vocab/talLiDa.mp3'
        },
        spanish: {roman: 'pending', spelling: 'pending'},
        french: {roman: 'pending', spelling: 'pending'}
      }
    },
    cultureSpecific: {
      verbs: {}
    }
  }
}
