import { getServerSession } from "next-auth";
import Tabs from "../components/tabs";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Button } from "../components/button";

const AdminDashboard = async () => {
  // i turned comp into server comp
  const tabs = ["Orders", "Pizza managment", "clients", "toppings Management"];

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect( '/api/auth/signin');
  }

  return (
    <div className='p-8 bg-neutral-focus '>
      <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
      <h1 className='text-2xl font-bold mb-4'>welcome {session.user.name}</h1>
      <Button />
      <Tabs tabs={tabs} defaultTab='Orders' />
    </div>
  );
};

export default AdminDashboard;
