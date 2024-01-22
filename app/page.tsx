'use client'

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Home = async ()  => {
  const session = await getServerSession();

  if(!session){
    redirect('/api/auth/signin?callbackUrl=/dashboard')
  }else{
    redirect('/dashboard')
  }
}

export default Home