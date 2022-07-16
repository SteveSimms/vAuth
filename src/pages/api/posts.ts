import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client"; // when we move to sql server this will 



import {getSession} from "next-auth/react";
import {getToken} from "next-auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
        const session = await getSession({req});
        const token = await getToken({req});
    console.log({session, token});
    if(req.method === 'POST'){
        //Process post request
        res.status(200).json({name: 'Asim Abdullah'})
    } else{
        //handle any other HTTP method
    }
}

export default handler;