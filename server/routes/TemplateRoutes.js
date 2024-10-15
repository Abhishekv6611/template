import { getTemplate } from '../controllers/templateController';

const router = express.Router();

router.post('/',getTemplate)

export default  router