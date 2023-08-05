const db=require("./models/index")
const  express=require("express")
const {userRouter}=require("./Controller/authController")
const {todoRouter}=require("./Controller/todoController")

const app=express()
app.use(express.json())



 app.use("/users",userRouter)
 app.use("/todo",todoRouter)



db.sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log("server is runing at port 3001")
    })

})