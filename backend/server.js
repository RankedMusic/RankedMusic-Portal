import express from "express"
import cors from "cors"
import campaigns from "./api/campaigns.route.js"
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/v1/campaigns", campaigns)
// Message if go to route that DNE
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

// Export app as module
export default app 


