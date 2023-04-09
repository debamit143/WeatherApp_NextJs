import Loader from "@/components/Loader"
import { useState } from "react"
import myimg from '../assets/weatherimage.jpg'
import Image from "next/image";

const Home = () => {
  const [isloading, setIsloading] = useState(false)
  const [cityName, setCityName] = useState('')
  const [errorMsg, setErrorMsg] = useState()
  const [data, setData] = useState()
  const handleSubmit = () => {
    if (cityName?.trim()) {
      setErrorMsg()
      setIsloading(true)
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=391048bfc5a66a33b915281392e8e3e7`)
        .then((res) => res.json())
        .then((data) => {
          if (data.cod ==404) {
            setErrorMsg(data.message)
            setIsloading(false)
            setCityName('')
          } else {
            setData(data)
            setIsloading(false)
            setCityName('')
          }

        })
    } else {
      setCityName('')
      setErrorMsg('Please Enter City Name')
    }
  }
  // console.log(data)
  // console.log(errorMsg)
  return (
    <>
      <div className="container">
        <h1>Weather App</h1>
        <div className="form">
          <input type="text" className="input_form" placeholder="Enter a location" onChange={(e) => setCityName(e.target.value)} />
          <button type='submit' className='button_form' onClick={handleSubmit}>Search</button>
        </div>
        {errorMsg ? (
          <div className="weather-info">{errorMsg}</div>
        ):(
        <>
        {!isloading ? (
          <div className="weather-info">
            <h2>{data?.name ? data?.name : 'No Data'}</h2>
            <div className="weather">
              <Image
              src={myimg}
              height='90px'
              width='70px'
              />
              <div className="temperature">{data?.main?.temp ? (data?.main?.temp-273.15).toFixed(2) :'No Data'}&deg;C</div>
            </div>
            <div className="description">Description of the weather conditions</div>
            <div className="details">
              <div className="detail">
                <div className="label">Humidity</div>
                <div className="value">{data?.main?.humidity ? data?.main?.humidity :'No Data'}%</div>
              </div>
              <div className="detail">
                <div className="label">Wind</div>
                <div className="value">{data?.wind?.speed ? data?.wind?.speed : 'No Data'}km/h</div>
              </div>
              <div className="detail">
                <div className="label">Feels Like</div>
                <div className="value">{data?.main?.feels_like ? (data?.main?.feels_like-273.15).toFixed(2) :'No Data'}&deg;C</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="weather-info">
            <Loader />
          </div>
          
        )}
        </>
        )}
      </div>
    </>
  )
}

export default Home