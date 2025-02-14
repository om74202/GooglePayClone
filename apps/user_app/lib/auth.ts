import db from "@repo/db/client"
import { Provider } from "../provider"
import CredentialsProvider  from "next-auth/providers/credentials"
import { Session} from "next-auth";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcrypt"
import { DefaultSession } from "next-auth";
type CredentialsType = {
    phone: string;
    password: string | Buffer;
    
};
declare module "next-auth" {
    interface Session {
      user: {
        id: string | undefined;
      } & DefaultSession["user"];
    }
  }


export const authOptions={
    providers:[
        CredentialsProvider({
            name:'Credentials',
            credentials:{
                phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
            password: { label: "Password", type: "password" }
            },
            async authorize(credentials:CredentialsType | undefined){
                if (!credentials) {
                    throw new Error("Credentials are required");
                  }
                const hashedPassword=await bcrypt.hash(credentials.password,10)
                const existingUser=await db.user.findFirst({
                    where:{
                        number:credentials.phone
                    }
                })
                if(existingUser){
                    const passwordValidation=await bcrypt.compare(credentials.password,existingUser.password)
                    if(passwordValidation){
                        return {
                            id:existingUser.id.toString(),
                            name:existingUser.name,
                            email:existingUser.email
                        }
                    }
                    return null;
                }
                try{
                    const user=await db.user.create({
                        data:{
                            number:credentials.phone,
                            password:hashedPassword
                        }
                    });
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    }
                }catch(e){
                    console.log(e)
                }
                return null

            }
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }:any) {
            if(!session.user){
                return null
            }
            session.user.id = token.sub

            return session
        }
    }
}


 