import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth"
import { NextResponse } from "next/server";

export const GET=async ()=>{
    const session=await getServerSession(authOptions);
    try{
        
    if(session.user){
        return NextResponse.json({ 
            user:session.user,
        })
    }
        
    }catch(e){
        console.log(e);
        return NextResponse.json({
            message:"You are not logged in"
        },{
            status:403
        })
    }
    
}