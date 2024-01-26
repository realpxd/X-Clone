"use client"
import { useRouter, usePathname } from 'next/navigation';

import HomeNav from '@/app/components/home/HomeNav';
import ExploreNav from '@/app/components/explore/ExploreNav';
import NotifNav from '@/app/components/notifications/NotifNav';
import SideNav from '@/app/components/SideNav/SideNav';
import Login from '../components/login/Login';
import GetStarted from '../components/get-started/GetStarted';
import ForgotPass from '../components/forgot-pass/ForgotPass';
import Profile from '../components/profile/Profile';

const Page = () => {

  const pagesFactory = {
    login: Login,
    getStarted: GetStarted,
    forgotPass: ForgotPass,
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
    addPost: HomeNav,
    profile: Profile
  }
  const page = usePathname()
  const curPage = page.split('/')[1].toString()
  var ContentComponent = HomeNav;
  const pagesToAvoid = ['login', 'getStarted', 'forgotPass'];
  const pagesToAvoid2 = ['hash', 'home', 'profile', 'addPost']

  for (const name in pagesFactory) {
    if (page.split('/')[1].toString() === name.toString()) {
      ContentComponent = pagesFactory[name];
      break; // Terminate the loop if a match is found
    }
  }

  return (
    <>
      { pagesToAvoid.includes(curPage) ? <ContentComponent /> : 
        < div className='flex flex-row flex-nowrap h-screen w-auto mx-40'>
          <SideNav page={curPage} />
          <div className={`h-screen bg-black text-white w-4/5 ${pagesToAvoid2.includes(curPage) ? null : 'mt-3'}`}>
            {ContentComponent && <ContentComponent />}
          </div>
        </div >
      }
    </>
  );
}

export default Page;
