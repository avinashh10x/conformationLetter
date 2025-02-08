import React from 'react'
import RecentLetter from '../component/RecentLetter'
import Loading from '../component/Loading'
import SearchBar from '../component/Searchbar'
import HomeScreenTools from '../component/HomeScreenTools'
import DeleteLetter from '../component/DeleteLetter'
import EditLetter from '../component/EditLetter'
import Snackbar from '../component/Snackbar'

function HomePage() {
  return (
    <div>
        <SearchBar/>
        {/* <Snackbar/> */}
        <HomeScreenTools/>
        <RecentLetter/>
    </div>
  )
}

export default HomePage
