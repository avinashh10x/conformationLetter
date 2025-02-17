import RecentLetter from "../component/RecentLetter"
import HomeScreenTools from "../component/HomeScreenTools"
import SearchBar from "../component/Searchbar"
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"

function HomePage() {
  return (
    <div>
      <SearchBar />
      <HomeScreenTools />
      <RecentLetter />
    </div>
  )
}

export default HomePage
