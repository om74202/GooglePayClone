import express,{json} from "express"
import dbd from "@repo/db/client"
import {PrismaClient} from "@prisma/client"
const db=dbd

const app=express();
app.use(express.json())

app.get('/',(req,res)=>{
    console.log("hii ")
    res.json({
        message:"hii"
    })
})


app.post('/webhook',async (req,res)=>{
    const paymentInfo:{
        token:string,
        amount:string,
        userId:string
    }={
        token:req.body.token,
        amount:req.body.amount,
        userId:req.body.userId
    }

    try{
        await (db).$transaction([
            db.balance.update({
                where:{
                    userId:Number(paymentInfo.userId)
                },
                data:{
                    amount:{
                        increment:Number(paymentInfo.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where:{
                    token:paymentInfo.token
                },
                data:{
                    status:"sucess"
                }
    })
        ])
        res.json({
            message:"captured"
        })
    }catch(e){
        console.log(e)
        res.status(411).json({
            message:"Opps something went wrong while processing the paymentt"
        })
    }
    
})

app.listen(3007);