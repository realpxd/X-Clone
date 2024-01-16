"use client"
import { useRouter, usePathname } from 'next/navigation';

import HomeNav from '@/app/components/home/HomeNav';
import ExploreNav from '@/app/components/explore/ExploreNav';
import NotifNav from '@/app/components/notifications/NotifNav';
import SideNav from '@/app/components/SideNav/SideNav';

const Page = () => {

  const pagesFactory = {
    hash: HomeNav,
    home: HomeNav,
    explore: ExploreNav,
    notifications: NotifNav,
    messages: HomeNav,
    grok: HomeNav,
    lists: HomeNav,
    communities: HomeNav,
    premium: HomeNav,
    profile: HomeNav,
    more: HomeNav,
    addPost: HomeNav
  }
  const page = usePathname()
  const curPage = page.split('/')[1].toString()
  let ContentComponent = HomeNav;

  for (const name in pagesFactory) {
    if (page.split('/')[1].toString() === name.toString()) {
      ContentComponent = pagesFactory[name];
      break; // Terminate the loop if a match is found
    }
  }

  return (
    <div className='flex flex-row flex-nowrap h-screen w-auto mx-40'>
      <SideNav page={curPage} />
      <div className={`h-screen bg-black text-white w-4/5 ${ContentComponent != HomeNav ? 'mt-3' : null}`}>
        {ContentComponent && <ContentComponent />}
      </div>
    </div>
  );
}

export default Page;
