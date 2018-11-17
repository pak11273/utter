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
        dog: {
          english: {roman: 'dog', spelling: 'dog'},
          korean: {
            roman: 'gae',
            spelling: '개',
            audioUrl: '/audio/vocab/gae.mp3'
          },
          spanish: {roman: 'pending', spelling: 'pending'},
          french: {roman: 'pending', spelling: 'pending'}
        },
        cat: {
          english: {roman: 'cat', spelling: 'cat'},
          korean: {
            roman: 'go-yang-i',
            spelling: '고양이',
            audioUrl: '/audio/vocab/goYangI.mp3'
          },
          spanish: {roman: 'pending', spelling: 'pending'},
          french: {roman: 'pending', spelling: 'pending'}
        }
      },
      kitchen: {
        cup: {
          english: {roman: 'cup', spelling: 'cup'},
          korean: {
            roman: 'kub',
            spelling: '컵',
            audioUrl: '/audio/vocab/kub.mp3'
          },
          spanish: {roman: 'pending', spelling: 'pending'},
          french: {roman: 'pending', spelling: 'pending'}
        }
      },
      bedroom: {
        telephone: {
          english: {roman: 'telephone', spelling: 'telephone'},
          korean: {
            roman: 'jeon-hoa',
            spelling: '전화',
            audioUrl: '/audio/vocab/jeonHoa.mp3'
          },
          spanish: {roman: 'pending', spelling: 'pending'},
          french: {roman: 'pending', spelling: 'pending'}
        }
      },
      clothes: {
        dress: {
          english: {roman: 'dress', spelling: 'dress'},
          korean: {
            roman: 'deu-re-seu',
            spelling: '드레스',
            audioUrl: '/audio/vocab/deuReSeu.mp3'
          },
          spanish: {roman: 'pending', spelling: 'pending'},
          french: {roman: 'pending', spelling: 'pending'}
        }
      },
      toys: {
        ball: {
          english: {roman: 'ball', spelling: 'ball'},
          korean: {
            roman: 'gong',
            spelling: '공',
            audioUrl: '/audio/vocab/gong.mp3'
          },
          spanish: {roman: 'pending', spelling: 'pending'},
          french: {roman: 'pending', spelling: 'pending'}
        }
      },
      speech: {
        pronouns: {
          I: {
            english: {roman: 'I', spelling: 'I'},
            korean: {
              roman: 'jeo',
              spelling: '저',
              audioUrl: '/audio/vocab/jeo.mp3'
            },
            해체: {
              roman: 'na',
              spelling: '나',
              audioUrl: '/audio/vocab/na.mp3'
            },
            spanish: {roman: 'pending', spelling: 'pending'},
            french: {roman: 'pending', spelling: 'pending'}
          },
          my: {
            english: {roman: 'my', spelling: 'my'},
            korean: {
              roman: 'je',
              spelling: '제',
              audioUrl: '/audio/vocab/je.mp3'
            },
            해체: {
              roman: 'ne or naE',
              spelling: 'ne or naE',
              audioUrl: '/audio/vocab/neORnaE.mp3'
            },
            spanish: {roman: 'pending', spelling: 'pending'},
            french: {roman: 'pending', spelling: 'pending'}
          }
        },
        participles: {
          이: {
            english: {roman: 'i', spelling: 'i'},
            korean: {
              roman: 'i',
              spelling: '이',
              audioUrl: '/audio/vocab/i.mp3'
            },
            spanish: {roman: 'pending', spelling: 'pending'},
            french: {roman: 'pending', spelling: 'pending'}
          },
          가: {
            english: {roman: 'ga', spelling: 'ga'},
            korean: {
              roman: 'ga',
              spelling: '가',
              audioUrl: '/audio/vocab/ga.mp3'
            },
            spanish: {roman: 'pending', spelling: 'pending'},
            french: {roman: 'pending', spelling: 'pending'}
          },
          은: {
            english: {roman: 'I', spelling: 'I'},
            korean: {
              roman: 'eun',
              spelling: '은',
              audioUrl: '/audio/vocab/eun.mp3'
            },
            spanish: {roman: 'pending', spelling: 'pending'},
            french: {roman: 'pending', spelling: 'pending'}
          },
          는: {
            english: {roman: 'I', spelling: 'I'},
            korean: {
              roman: 'neun',
              spelling: '는',
              audioUrl: '/audio/vocab/neun.mp3'
            },
            spanish: {roman: 'pending', spelling: 'pending'},
            french: {roman: 'pending', spelling: 'pending'}
          }
        }
      },
      misc: {
        box: {
          english: {roman: 'box', spelling: 'box'},
          korean: {
            roman: 'sang-ja',
            spelling: '상자',
            audioUrl: '/audio/vocab/sangJa.mp3'
          },
          spanish: {roman: 'pending', spelling: 'pending'},
          french: {roman: 'pending', spelling: 'pending'}
        },
        name: {
          english: {roman: 'name', spelling: 'name'},
          korean: {
            roman: 'i-reum',
            spelling: '이름',
            audioUrl: '/audio/vocab/iReum.mp3'
          },
          spanish: {roman: 'pending', spelling: 'pending'},
          french: {roman: 'pending', spelling: 'pending'}
        },
        no: {
          english: {roman: 'no', spelling: 'no'},
          korean: {
            roman: 'an-i-yo',
            spelling: '아니요',
            audioUrl: '/audio/vocab/anIYo.mp3'
          },
          해체: {
            roman: 'an-i',
            spelling: '아니',
            audioUrl: '/audio/vocab/anI.mp3'
          },
          spanish: {roman: 'pending', spelling: 'pending'},
          french: {roman: 'pending', spelling: 'pending'}
        },
        yes: {
          english: {roman: 'yes', spelling: 'yes'},
          korean: {
            roman: 'ye',
            spelling: '예',
            audioUrl: '/audio/vocab/ye.mp3'
          },
          해체: {
            roman: 'ne',
            spelling: '네',
            audioUrl: '/audio/vocab/ne.mp3'
          },
          spanish: {roman: 'pending', spelling: 'pending'},
          french: {roman: 'pending', spelling: 'pending'}
        }
      }
    },
    examples: {
      level7_1: {
        english: {roman: 'My name is Mary', spelling: 'My name is Mary'},
        korean: {
          roman: 'Je IReumEun MaryYeYo',
          spelling: '제 이름은 Mary예요.',
          audioUrl: '/audio/examples/level7_1.mp3'
        },
        spanish: {roman: 'pending', spelling: 'pending'},
        french: {roman: 'pending', spelling: 'pending'}
      },
      level7_2: {
        english: {roman: 'My name is John', spelling: 'My name is John'},
        korean: {
          roman: 'Ne IReumEun JohnOiEYo',
          spelling: '내 이름은 John이에요',
          audioUrl: '/audio/examples/level7_2.mp3'
        },
        spanish: {roman: 'pending', spelling: 'pending'},
        french: {roman: 'pending', spelling: 'pending'}
      },
      level7_3: {
        english: {roman: 'My name is Anna', spelling: 'My name is Anna'},
        korean: {
          roman: 'NaEui IReumEun AnnaOiEYo',
          spelling: '내의 이름은 Anna이에요',
          audioUrl: '/audio/examples/level7_3.mp3'
        },
        spanish: {roman: 'pending', spelling: 'pending'},
        french: {roman: 'pending', spelling: 'pending'}
      },
      level7_4: {
        english: {roman: 'i/ga or eun/nun', spelling: 'i/ga or eun/nun'},
        korean: {
          roman: 'i/ga or eun/nun',
          spelling: '이/가 or 은/는',
          audioUrl: '/audio/examples/level7_4.mp3'
        },
        spanish: {roman: 'pending', spelling: 'pending'},
        french: {roman: 'pending', spelling: 'pending'}
      },
      level7_5: {
        english: {roman: 'iEYo or yeYo', spelling: 'iEYo or yeYo'},
        korean: {
          roman: 'iEYo or yeYo',
          spelling: '',
          audioUrl: '/audio/examples/level7_5.mp3'
        },
        spanish: {roman: 'pending', spelling: 'pending'},
        french: {roman: 'pending', spelling: 'pending'}
      },
      level7_6: {
        english: {roman: 'nae or naE', spelling: 'nae or naE'},
        korean: {
          roman: 'nae or naE',
          spelling: '',
          audioUrl: '/audio/examples/level7_6.mp3'
        },
        spanish: {roman: 'pending', spelling: 'pending'},
        french: {roman: 'pending', spelling: 'pending'}
      },
      level7_7: {
        english: {roman: 'jeo or jeoHi', spelling: 'jeo or jeoHi'},
        korean: {
          roman: 'jeo or jeoHi',
          spelling: '',
          audioUrl: '/audio/examples/level7_7.mp3'
        },
        spanish: {roman: 'pending', spelling: 'pending'},
        french: {roman: 'pending', spelling: 'pending'}
      }
    },
    verbs: {
      be: {
        english: {roman: 'be', spelling: 'be'},
        korean: {
          roman: 'iss-da',
          spelling: '있다',
          audioUrl: '/audio/vocab/issDa.mp3'
        },
        spanish: {roman: 'pending', spelling: 'pending'},
        french: {roman: 'pending', spelling: 'pending'}
      },
      eat: {
        english: {roman: 'eat', spelling: 'eat'},
        korean: {
          roman: 'meog',
          spelling: '먹',
          audioUrl: '/audio/vocab/meog.mp3'
        },
        spanish: {roman: 'pending', spelling: 'pending'},
        french: {roman: 'pending', spelling: 'pending'}
      },
      go: {
        english: {roman: 'go', spelling: 'go'},
        korean: {
          roman: 'ga',
          spelling: '가',
          audioUrl: '/audio/vocab/ga.mp3'
        },
        spanish: {roman: 'pending', spelling: 'pending'},
        french: {roman: 'pending', spelling: 'pending'}
      },
      laugh: {
        english: {roman: 'laugh', spelling: 'laugh'},
        korean: {
          roman: 'us',
          spelling: '웃',
          audioUrl: '/audio/vocab/us.mp3'
        },
        spanish: {roman: 'pending', spelling: 'pending'},
        french: {roman: 'pending', spelling: 'pending'}
      },
      hit: {
        english: {roman: 'hit', spelling: 'hit'},
        korean: {
          roman: 'ddae-ri',
          spelling: '때리',
          audioUrl: '/audio/vocab/ddaeRi.mp3'
        },
        spanish: {roman: 'pending', spelling: 'pending'},
        french: {roman: 'pending', spelling: 'pending'}
      },
      sleep: {
        english: {roman: 'sleep', spelling: 'sleep'},
        korean: {
          roman: 'ja',
          spelling: '자',
          audioUrl: '/audio/vocab/ja.mp3'
        },
        spanish: {roman: 'pending', spelling: 'pending'},
        french: {roman: 'pending', spelling: 'pending'}
      }
    },
    misc: {
      person: {
        english: {roman: 'person', spelling: 'person'},
        korean: {
          roman: 'sa-ram',
          spelling: '사람',
          audioUrl: '/audio/vocab/saRam.mp3'
        },
        spanish: {roman: 'pending', spelling: 'pending'},
        french: {roman: 'pending', spelling: 'pending'}
      }
    },
    cultureSpecific: {
      category: {
        nouns: {
          misc: {
            해요체: {
              english: {roman: '해요체', spelling: '해요체'},
              korean: {
                roman: 'haeYoChe',
                spelling: '해요체',
                audioUrl: '/audio/vocab/haeYoChe.mp3'
              },
              해체: {
                roman: 'ne',
                spelling: '네',
                audioUrl: '/audio/vocab/ne.mp3'
              },
              spanish: {roman: 'pending', spelling: 'pending'},
              french: {roman: 'pending', spelling: 'pending'}
            }
          }
        },
        verbs: {}
      }
    }
  }
}
