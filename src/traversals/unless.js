import matching from './matching'
import { not } from '../utils'

export default pred => matching(not(pred)) 
