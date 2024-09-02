import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const superAdminEmails = ['gracexvillanueva@gmail.com'];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  //this is for email verification if admin or not
  callbacks:{
    session:({session,token,user}) => {
      if (superAdminEmails.includes(session?.user?.email)){
        return session;
      } else {
        return false;
      }
      
    },
  },
};

export default NextAuth(authOptions); 

export async function isSuperAdminRequest(req,res){
  const session = await getServerSession(req,res,authOptions);
  if(!superAdminEmails.includes(session?.user?.email)){
      res.status(401);
      res.end();
      throw 'Not a Super Admin';
  }
}