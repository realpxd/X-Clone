"use client"
import { useRouter , usePathname   } from 'next/navigation';

import HomeNav from '@/app/components/home/HomeNav';
import ExploreNav from '@/app/components/explore/ExploreNav';
import NotifNav from '@/app/components/notifications/NotifNav';
import SideNav from '@/app/components/SideNav/SideNav';

const Page = () => {
  const router = useRouter();
const page = usePathname()

  let ContentComponent;
  switch (page.split('/')[1]) {
    case 'feed':
      ContentComponent = HomeNav;
      break;
    case 'explore':
      ContentComponent = ExploreNav;
      break;
    case 'notifications':
      ContentComponent = NotifNav;
      break;
    default:
      ContentComponent = HomeNav;
  }

  return (
    <div className='flex flex-row flex-nowrap h-screen w-screen'>
      <SideNav page={page} />
      <div className='h-screen bg-black text-white w-full py-3'>
        {/* Render the appropriate component based on the page */}
        {ContentComponent && <ContentComponent />}
        {/* <NotifNav /> */}
      </div>
    </div>
  );
}

export default Page;
