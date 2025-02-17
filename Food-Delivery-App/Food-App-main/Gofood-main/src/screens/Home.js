import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [carouselPhotos, setCarouselPhotos] = useState([])
  const [photosLoading, setPhotosLoading] = useState(true)

  const fetchUnsplashPhotos = async () => {
    try {
      // Check localStorage for cached photos
      const cachedPhotos = localStorage.getItem('unsplashPhotos')
      if (cachedPhotos) {
        setCarouselPhotos(JSON.parse(cachedPhotos))
        return
      }

      // Debug environment variables
      console.log('Environment variables:', process.env);
      const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
      if (!accessKey) {
        console.error('Missing Unsplash access key. Please ensure:');
        console.error('1. .env file exists in project root');
        console.error('2. .env contains REACT_APP_UNSPLASH_ACCESS_KEY');
        console.error('3. Server has been restarted after adding .env');
        throw new Error('Unsplash access key is missing. Check console for details');
      }

      const response = await fetch(
        `https://api.unsplash.com/photos/random?count=3&query=food&client_id=${accessKey}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch photos from Unsplash')
      }

      const data = await response.json()
      const photos = data.map(photo => ({
        url: photo.urls.regular,
        alt: photo.alt_description || 'Food image'
      }))

      // Cache photos in localStorage
      localStorage.setItem('unsplashPhotos', JSON.stringify(photos))
      setCarouselPhotos(photos)
    } catch (error) {
      console.error('Error fetching photos:', error)
      setError('Failed to load carousel photos: ' + error.message + 
              ' (Using fallback images)')
      // Fallback to default images if API fails
      setCarouselPhotos([
        { url: 'https://source.unsplash.com/900x700/?burger', alt: 'Burger' },
        { url: 'https://source.unsplash.com/900x700/?pizza', alt: 'Pizza' },
        { url: 'https://source.unsplash.com/900x700/?pasta', alt: 'Pasta' }
      ])
    } finally {
      setPhotosLoading(false)
    }
  }

  const loadFoodItems = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('Fetching food data from API...')
      let response = await fetch("http://localhost:5001/api/auth/foodData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to fetch food data: ${response.status} - ${errorText}`)
      }
      
      response = await response.json()
      console.log('API Response:', response)
      if (!response || !Array.isArray(response) || response.length < 2) {
        throw new Error('Invalid data format received from API')
      }
      setFoodItems(response[0] || [])
      setFoodCat(response[1] || [])
      console.log('Food items:', response[0])
      console.log('Food categories:', response[1])
    } catch (error) {
      console.error('Error in loadFoodItems:', error)
      setError(`Failed to load food items: ${error.message}`)
      toast.error(`Error loading food items: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Add a small delay to ensure environment variables are loaded
    const timer = setTimeout(() => {
      fetchUnsplashPhotos()
      loadFoodItems()
    }, 100);
    return () => clearTimeout(timer);
  }, [])

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "9", bottom: "30%" }}>
              <div className="d-flex justify-content-center align-items-center">
                <div className="input-group" style={{ width: "600px", maxWidth: "90vw" }}>
                  <input className="form-control border-2 border-end-0" 
                         type="search" 
                         placeholder="Search for restaurants or dishes..." 
                         aria-label="Search" 
                         value={search} 
                         style={{
                           height: "50px",
                           borderRadius: "8px 0 0 8px",
                           borderColor: "#FC8019",
                           boxShadow: "none"
                         }}
                         onChange={(e) => setSearch(e.target.value)} />
                  <button className="btn" 
                          onClick={() => setSearch('')}
                          style={{
                            backgroundColor: "#FC8019",
                            color: "#FFFFFF",
                            border: "2px solid #FC8019",
                            borderRadius: "0 8px 8px 0",
                            height: "50px",
                            width: "80px"
                          }}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {photosLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading photos...</span>
                </div>
              </div>
            ) : carouselPhotos.map((photo, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={photo.url}>
                <img src={photo.url} 
                     className="d-block w-100" 
                     style={{ 
                       filter: "brightness(70%)",
                       height: "500px",
                       objectFit: "cover"
                     }} 
                     alt={photo.alt} />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container' style={{ marginTop: "40px", marginBottom: "80px" }}>
        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger mt-3">{error}</div>
        ) : foodCat.length > 0 ? foodCat.map((data) => {
              return (
                <div className='row mb-3' key={data._id}>
                  <div className='fs-3 m-3 fw-bold' style={{ color: "#2E3333" }}>
                    {data.CategoryName}
                  </div>
                  <hr style={{ 
                    height: "2px", 
                    backgroundColor: "#E8E8E8",
                    margin: "0 1rem"
                  }} />
                  {foodItems.length > 0 ? foodItems.filter(
                    (items) => (items.CategoryName === data.CategoryName) && 
                              (items.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                          <Card 
                            foodName={filterItems.name} 
                            item={filterItems} 
                            options={filterItems.options[0]} 
                            ImgSrc={filterItems.img} />
                        </div>
                      )
                    }) : <div className="text-muted">No items found in this category</div>}
</div>
              )
            })
            : <div className="text-muted">No food categories available</div>}
      </div>
      <Footer />
    </div>
  )
}
