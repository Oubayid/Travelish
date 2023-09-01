const expresss = require("express")
const app= expresss()
const db=require("./models")
const adminRoutes = require("./router/admin-router")
const bussinessRoutes = require("./router/bussiness")
const reviewRoutes = require("./router/review-router")
const cors = require("cors")

app.use(cors())
app.use(expresss.json())
app.use(expresss.urlencoded({extended:true}))
app.use("/admin",adminRoutes)
app.use("/bussiness",bussinessRoutes)
app.use("/review",reviewRoutes)


 app.listen(5000,()=>console.log("server  listend"))
