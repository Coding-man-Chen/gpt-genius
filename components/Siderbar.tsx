import MemberProfile from './MemberProfile'
import NavLinks from './NavLinks'
import SiderbarHeader from './SiderbarHeader'

const Siderbar = () => {
  return (
    <div className='base-300 px-4 py-12 w-80 min-h-full grid grid-rows-[auto,1fr,auto]'>
      <SiderbarHeader/>
      <NavLinks/>
      {/* @ts-ignore */}
      <MemberProfile/>
    </div>
  )
}

export default Siderbar
