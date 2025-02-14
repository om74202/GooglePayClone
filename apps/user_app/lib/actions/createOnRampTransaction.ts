"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";
export async function createOnRampTransaction(provider:string, amount:number){
    const session=await getServerSession(authOptions);
    if(!session.user|| !session.user.id){
        return {
            message:"User not logged in"
        }
    } 
    const token=Math.random().toString()
    await db.onRampTransaction.create({
        data: {
            provider,
            status:"pending",
            startTime: new Date(),
            token: token,
            userId: Number(session?.user?.id),
            amount: amount * 100
        }
    })
    return {
        message:"Transaction created",
        
    }
}