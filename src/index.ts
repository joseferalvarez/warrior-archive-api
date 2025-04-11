import { Hono } from 'hono'
import { MongoDB } from './services/MongoDB'
import { routes as RouterMartialArt } from './martialArt/routes'
import { routes as RouterGrades } from './grades/routes'
import { routes as RouterCategory } from './categories/routes'
import { routes as RouterTags } from './tags/routes'
import { routes as RouterVideos } from './videos/routes'
import { routes as RouterTechniques } from './techniques/routes'

const app = new Hono();

(async () => {
  const mongo = new MongoDB({uri: process.env.MONGO_URI || ""});
  const { error, message } = await mongo.connect()
  
  if(error){
    console.error(message)
    process.exit(1)
  };

  console.log(message)
})()

app.route("/martial-arts", RouterMartialArt)
app.route("/grades", RouterGrades)
app.route("/categories", RouterCategory)
app.route("/tags", RouterTags)
app.route("/videos", RouterVideos)
app.route("/techniques", RouterTechniques)

export default app
