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
        boy: {
          english: {roman: 'boy', spelling: 'boy'},
          korean: {
            roman: 'so-nyeon',
            spelling: '소년',
            audioUrl: '/audio/vocab/soNyeon.mp3'
          },
          spanish: {roman: 'pending', spelling: 'pending'},
          french: {roman: 'pending', spelling: 'pending'}
        },
        girl: {
          english: {roman: 'girl', spelling: 'girl'},
          korean: {
            roman: 'so-nyeo',
            spelling: '소녀',
            audioUrl: '/audio/vocab/soNyeo.mp3'
          },
          spanish: {roman: 'pending', spelling: 'pending'},
          french: {roman: 'pending', spelling: 'pending'}
        },
        man: {
          english: {roman: 'man', spelling: 'man'},
          korean: {
            roman: 'nam-ja',
            spelling: '남자',
            audioUrl: '/audio/vocab/namJa.mp3'
          },
          spanish: {roman: 'pending', spelling: 'pending'},
          french: {roman: 'pending', spelling: 'pending'}
        },
        woman: {
          english: {roman: 'woman', spelling: 'woman'},
          korean: {
            roman: 'yeo-ja',
            spelling: '',
            audioUrl: '/audio/vocab/yeoJa.mp3'
          },
          spanish: {roman: 'pending', spelling: 'pending'},
          french: {roman: 'pending', spelling: 'pending'}
        }
      }
    },
    verbs: {
      be: {
        english: {roman: 'be', spelling: 'be'},
        korean: {
          roman: '',
          spelling: '',
          audioUrl: '/audio/vocab/itDa.mp3'
        },
        spanish: {roman: 'pending', spelling: 'pending'},
        french: {roman: 'pending', spelling: 'pending'}
      },
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
