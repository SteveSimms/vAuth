import type {NextApiRequest, NextApiResponse} from "next";


import {PrismaClient} from "@prisma/client"
// https://stepzen.com/blog/rest-to-graphql
// import {prisma} from "@prisma/client";
const prisma = new PrismaClient()

import {getSession} from "next-auth/react";
import {getToken} from "next-auth/jwt";
const createPost  = async (req: NextApiRequest, res: NextApiResponse)=>{
    const session = await getSession({req});
    console.log({session});
    if (!session) {
        res.status(401).json({error: "You must be signed in to view the protected content on this page."});
    }

   
        //Process post request
        const user = await prisma.user.findUnique({
            where: {email:  session?.user?.email!}
        })

        if(!req.body.title || !req.body.content) {
            res.status(500).json({error:'Validation error'});
        }
        const post = await prisma.post.create({
            data: {
                userId: user?.id!,
                title: req.body.title,
                content: req.body.content
            },
        })

        if(post.id){
            res.status(200).json({post});
        } else {
            res.status(500).json({error:'Error creating post'});
        }


 
}



const handler =  (req: NextApiRequest, res: NextApiResponse) => {
if(req.method === 'POST'){
    createPost(req, res);
}
    

        // res.status(200).json({name: 'Asim Abdullah'})
  
}

export default handler;