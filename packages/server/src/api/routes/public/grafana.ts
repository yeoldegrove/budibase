import controller from "../../controllers/public/grafana"
import Endpoint from "./utils/Endpoint"
import { nameValidator } from "../utils/validators"

const read = []

/**
 * @openapi
 * /grafana/query:
 *   post:
 *     summary: Return data and annotations
 *     description:
 *     tags:
 *       - grafana
 */
read.push(new Endpoint("post", "/grafana/query", controller.query))

/**
 * @openapi
 * /grafana/search:
 *   post:
 *     summary: Return available Grafana metrics
 *     description:
 *     tags:
 *       - grafana
 */
read.push(new Endpoint("post", "/grafana/search", controller.search))

/**
 * @openapi
 * /grafana/query:
 *   post:
 *     summary: Return data and annotations
 *     description:
 *     tags:
 *       - grafana
 */
read.push(new Endpoint("get", "/grafana", controller.check))

export default { read }
