const sampleData = {
  unit: {
    id: 1,
    name: 'Black Widow Company',
    affiliation: 'wd',
    color: 'black',
    lances: [
      {
        id: 1,
        name: 'Command Lance',
        terms: [1, 2, 3, 4]
      },
      {
        id: 2,
        name: 'Fire Lance',
        terms: [5, 6, 7, 8]
      },
      {
        id: 3,
        name: 'Recon Lance',
        terms: [9, 10, 11, 12]
      }
    ],
    terms: [
      {
        id: 1,
        name: 'Natasha Kerensky',
        rank: 'Captain',
        gunnery: 2,
        terming: 2,
        age: 52,
        mech: 1
      },
      {
        id: 2,
        name: 'Colin Maclaren',
        rank: 'Sergeant',
        gunnery: 3,
        terming: 4,
        age: 43,
        mech: 2
      },
      {
        id: 3,
        name: 'Lynn Sheridan',
        rank: 'Corporal',
        gunnery: 4,
        terming: 5,
        age: 27,
        mech: 3
      },
      {
        id: 4,
        name: 'John Hayes',
        rank: 'Sergeant',
        gunnery: 3,
        terming: 4,
        age: 34,
        mech: 4
      },
      {
        id: 5,
        name: 'Takiro Ikeda',
        rank: 'Lieutenant',
        gunnery: 3,
        terming: 4,
        age: 41,
        mech: 5
      },
      {
        id: 6,
        name: 'Miklos Delius',
        rank: 'Corporal',
        gunnery: 4,
        terming: 4,
        age: 31,
        mech: 6
      },
      {
        id: 7,
        name: 'Nikolai Koniev',
        rank: 'Private',
        gunnery: 3,
        terming: 4,
        age: 39,
        mech: 7
      },
      {
        id: 8,
        name: 'Alex Ward',
        rank: 'Corporal',
        gunnery: 4,
        terming: 5,
        age: 36,
        mech: 8
      },
      {
        id: 9,
        name: "John 'Gentlemen Johnny' Clavell",
        rank: 'Lieutenant',
        gunnery: 3,
        terming: 4,
        age: 40,
        mech: 9
      },
      {
        id: 10,
        name: 'Piet Nichols',
        rank: 'Corporal',
        gunnery: 4,
        terming: 5,
        age: 37,
        mech: 10
      },
      {
        id: 11,
        name: 'Simon Fraser',
        rank: 'Sergeant',
        gunnery: 3,
        terming: 4,
        age: 32,
        mech: 11
      },
      {
        id: 12,
        name: 'Mohammar Jahan',
        rank: 'Corporal',
        gunnery: 3,
        terming: 5,
        age: 29,
        mech: 12
      }
    ],
    mechs: [
      {
        id: 1,
        type: 'WHM-6R',
        term: 1
      },
      {
        id: 2,
        type: 'MAD-3R',
        term: 2
      },
      {
        id: 3,
        type: 'CRD-3R',
        term: 3
      },
      {
        id: 4,
        type: 'GRF-1N',
        term: 4
      },
      {
        id: 5,
        type: 'ARC-2R',
        term: 5
      },
      {
        id: 6,
        type: 'ARC-2R',
        term: 6
      },
      {
        id: 7,
        type: 'WSP-1A',
        term: 7
      },
      {
        id: 8,
        type: 'STG-3R',
        term: 8
      },
      {
        id: 9,
        type: 'RFL-3N',
        term: 9
      },
      {
        id: 10,
        type: 'PXH-1K',
        term: 10
      },
      {
        id: 11,
        type: 'STG-3R',
        term: 11
      },
      {
        id: 12,
        type: 'STG-3R',
        term: 12
      }
    ]
  },

  designs: [
    {
      id: 'STG-3R',
      name: 'Stinger',
      weight: 20
    },
    {
      id: 'WSP-1A',
      name: 'Wasp',
      weight: 20
    },
    {
      id: 'PXH-1K',
      name: 'Phoenix Hawk',
      weight: 45
    },
    {
      id: 'GRF-1N',
      name: 'Griffin',
      weight: 55
    },
    {
      id: 'RFL-3N',
      name: 'Rifleman',
      weight: 60
    },
    {
      id: 'CRD-3R',
      name: 'Crusader',
      weight: 65
    },
    {
      id: 'ARC-2R',
      name: 'Archer',
      weight: 70
    },
    {
      id: 'WHM-6R',
      name: 'Warhammer',
      weight: 70
    },
    {
      id: 'MAD-3R',
      name: 'Marauder',
      weight: 75
    }
  ],

  factions: [
    {id: 'cc', name: 'Capellan Confederation'},
    {id: 'dc', name: 'Draconis Combine'},
    {id: 'elh', name: 'Eridani Light Horse'},
    {id: 'fs', name: 'Federated Suns'},
    {id: 'fwl', name: 'Free Worlds League'},
    {id: 'hr', name: "Hansen's Roughriders"},
    {id: 'lc', name: 'Lyran Commonwealth'},
    {id: 'wd', name: "Wolf's Dragoons"}
  ]
}

export default sampleData
