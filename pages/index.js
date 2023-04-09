import Loader from "@/components/Loader"
import { useState } from "react"

const Home = () => {
  const [isloading, setIsloading] = useState(false)
  const [cityName, setCityName] = useState('')
  const [errorMsg, setErrorMsg] = useState()
  const [data, setData] = useState()
  const handleSubmit = () => {
    if (cityName?.trim()) {
      setErrorMsg()
      setIsloading(true)
      fetch(`http://api.weatherapi.com/v1/current.json?key=d24424080adc4a68af6201107230804&q=${cityName}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setErrorMsg(data.error.message)
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
            <h2>{data?.location?.name ? data?.location?.name : 'No Data'}</h2>
            <div className="weather">
              <img src={data?.current?.condition?.icon} alt="Weather Icon" />
              <div className="temperature">{data?.current?.temp_c ? data?.current?.temp_c :'No Data'}&deg;C</div>
            </div>
            <div className="description">Description of the weather conditions</div>
            <div className="details">
              <div className="detail">
                <div className="label">Humidity</div>
                <div className="value">{data?.current?.humidity ? data?.current?.humidity :'No Data'}%</div>
              </div>
              <div className="detail">
                <div className="label">Wind</div>
                <div className="value">{data?.current?.wind_kph ? data?.current?.wind_kph : 'No Data'}km/h</div>
              </div>
              <div className="detail">
                <div className="label">Feels Like</div>
                <div className="value">{data?.current?.feelslike_c ? data?.current?.feelslike_c :'No Data'}&deg;C</div>
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