import { useState, useEffect, Fragment, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createResource as fetchData } from './helper'
import SearchBar from './Components/SearchBar';
import Gallery from './Components/Gallery';
import AlbumView from './Components/AlbumView';
import ArtistView from './Components/ArtistView';
import Spinner from './Components/Spinner';

function App() {
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('Search for Music!')
  const [data, setData] = useState([null])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  const renderGallery = () => {
    if(data){
        return (
            <Suspense fallback={<Spinner />}>
                <Gallery data={data} />
            </Suspense>
        )
    }
  }


  useEffect(() => {
    if (search) {
      setData(fetchData(search))
    //   const fetchData = async () => {
    //     document.title = `${search} Music`
    //     const response = await fetch(`https://itunes.apple.com/search?term=${search}`)
    //     const data = await response.json()
    //     console.log(data)
    //     if (data.results.length > 0) {
    //       setData(data.results)
    //     } else {
    //       setMessage('Not Found')
    //     }
    //   }
  
    //   fetchData()
    }
  }, [search])


  return (
    <div>
    {message}
        <Router>
            <Routes>
                <Route path="/" element={
                    <Fragment>
                        <SearchBar handleSearch = {handleSearch}/>
                        {renderGallery()}
                    </Fragment>
                } />
                <Route path="/album/:id" element={<AlbumView />} />
                <Route path="/artist/:id" element={<ArtistView />} />
            </Routes>
        </Router>
    </div>
  )

}

export default App;
