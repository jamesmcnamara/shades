import { not, matching } from '../index'

export default pred => matching(not(pred)) 
