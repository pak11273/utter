import {ORM} from 'redux-orm'

import Pilot from '../layouts/Courses/features/Pilots/Pilot'
import MechDesign from '../layouts/Courses/features/mechs/MechDesign'
import Mech from '../layouts/Courses/features/mechs/Mech'
import Unit from '../layouts/Courses/features/UnitInfo/Unit'
import Lance from '../layouts/Courses/features/UnitInfo/Lance'
import Faction from '../layouts/Courses/features/UnitInfo/Faction'

const orm = new ORM()
orm.register(Faction, Lance, Mech, MechDesign, Pilot, Unit)

export default orm
