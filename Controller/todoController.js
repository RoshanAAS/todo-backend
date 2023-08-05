

const { Todo ,users} = require("../models/index")
const {auth} = require("../middleware/Auth")
const express = require("express")

const todoRouter = express.Router();

todoRouter.post("/create",auth,async(req,res)=>{
    try {
        const data= await Todo.create({
            ...req.body,
        })

         res.status(200).json({
            data
         })
     } catch (error) {
        res.status(404).json({
            error
        })
     }

})


todoRouter.get("/",auth,async(req,res)=>{
    try {

        const userdata = req.body.userId; 
        users.hasMany(Todo, { foreignKey: "userId" });
        Todo.belongsTo(users, { foreignKey: "userId" });
        const data = await users.findAll({   include: [Todo],where:{id:userdata}});
    
        res.status(200).json({
           data
        })
    } catch (error) {
       res.status(404).json({
           error
       })
    }
})

todoRouter.put("/update/:id",auth,async(req,res)=>{
    try {
        const data= await Todo.upsert({
            id:req.params.id,
            ...req.body,
        })

         res.status(200).json({
            data
         })
     } catch (error) {
        res.status(404).json({
            error
        })
     }

})


todoRouter.delete("/delete/:id",auth,async(req,res)=>{
    try {
        const data= await Todo.destroy({
            where:{
                id:req.params.id
            }
        })

         res.status(200).json({
            data,
            mag:"Todo has been Deleted"
         })
     } catch (error) {
        res.status(404).json({
            error
        })
     }

})
     
module.exports={todoRouter}

