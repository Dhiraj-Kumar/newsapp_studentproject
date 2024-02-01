import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router";
import { Divider } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Slider from "react-slick";
import Appbar from "./Appbar";
import img from "../images/img-place.png";
import "../assets/recomend.css";
import "../assets/Dashboard.css";
import "../assets/content.css";
import config from "./config"
//import news from "../images/news.jpg";
import news1 from "../images/news1.jpg"
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import axios from "axios";
import sports from "../images/sports.jpg";
import health from "../images/health.jpg";
import general from "../images/general.png";
import enter from "../images/enter.jpg";
import tech from "../images/tech.png";
import science from "../images/science.png";
import business from "../images/business.png";

import Swal from "sweetalert2";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Dashboard() {
  
  const username = localStorage.getItem("username");
  console.log(username);

  const slideref = useRef(null);
  const topref = useRef(null);
  var settings = {
    
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [value,setValue]=useState("")
  
   const submitHandle=async()=>{
    console.log(value)
    if(document.cookie){
     await axios.post(`${config.newsletter}/${value}`).then((res) => {
        
        let timerInterval
        Swal.fire({
          title: 'You have subscribed to our news letter',                  
          timer: 1500,
          timerProgressBar: true,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        })
      })
      .catch((err) => {
        console.log(err);
      }); 
    }
    else{
      Swal.fire({
        title: "Wait for it…",
        text: "Log in to our website to Subscribe to our Newsletter. It'll just take a moment.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#009E8D",
        cancelButtonColor: "#A4404D",
        confirmButtonText: "Login",
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/loginpage");
        }
      });
    }
   }


  const [refget, setRefget] = useState([]);
  const [favget, setFavget] = useState([]);
 

  const favoriteget = async () => {
    console.log(username);
    let { data } = await axios.get(
      `${config.favorite}/getfavorite/${username}`
    );
    setFavget(data);
  };
  useEffect(() => {
    favoriteget();
  }, []);

  const referget = async () => {
    let { data } = await axios.get(
      `${config.refer}/getReferedArticle`
    );
    setRefget(data);
  };
  useEffect(() => {
    referget();
  }, []);

  const addfav = async (
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    event
  ) => {
    if (document.cookie) {
      await axios
        .get(
          `${config.favorite}/getparticularfav/${username}/${publishedAt}`
        )
        .then(async ({ data }) => {
          console.log(data);
          if (!data) {
            await axios
              .post(`${config.favorite}/addfavorite`, {
                title: title,
                description: description,
                url: url,
                urlToImage: urlToImage,
                publishedAt: publishedAt,
                username: username,
              })
              .then((res) => {
                event.target.classList.add("text-danger");
                
                Swal.fire({
                  title: 'Added to Favorites',                  
                  timer: 1500,
                  timerProgressBar: true,
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  },
                  didOpen: () => {
                    Swal.showLoading()
                   
                  },
                  willClose: () => {
                    
                  }
                })
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            await axios
              .delete(`${config.favorite}/deletefavorite/${publishedAt}`)
              .then((data) => {
                event.target.classList.remove("text-danger");
                
                
                Swal.fire({
                  title: 'Removed From Favorites',                  
                  timer: 1500,
                  timerProgressBar: true,
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  },
                  didOpen: () => {
                    Swal.showLoading()
                   
                  },
                  willClose: () => {
                    
                  }
                })
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "Wait for it…",
        text: "Log in to our website to add any article to your Favourites ❤️. It'll just take a moment.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#009E8D",
        cancelButtonColor: "#A4404D",
        confirmButtonText: "Login",
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
      }).then((result) => {
        if (result.isConfirmed) {
          
          navigate("/loginpage");
        }
      });
    }
  };

  const referarticle = async (item, event) => {
    console.log(event.target);
    if (document.cookie) {
      await axios
        .get(
          `${config.refer}/getparticularArticle/${item.publishedAt}`
        )
        .then(async ({ data }) => {
          console.log(data);
          if (data) {
            event.target.classList.remove("text-primary");
            let timerInterval
            Swal.fire({
              title: 'Article Recommended..',                  
              timer: 1500,
              timerProgressBar: true,
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft()
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            })
          } else {
            await axios
              .post(`${config.refer}/addReferedArticle`, {
                title: item.title,
                url: item.url,
                urlToImage: item.urlToImage,
                publishedAt: item.publishedAt,
              })
              .then((res) => {
                event.target.classList.add("text-primary");
                let timerInterval
                Swal.fire({
                  title: 'Article Recommended..',                  
                  timer: 1500,
                  timerProgressBar: true,
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  },
                  didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                      b.textContent = Swal.getTimerLeft()
                    }, 100)
                  },
                  willClose: () => {
                    clearInterval(timerInterval)
                  }
                })

                // alert("article refered");
                referget();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    } else {
      Swal.fire({
        title: "Wait for it…",
        text: "Log in to our website to recommend any article. It'll just take a moment.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#009E8D",
        cancelButtonColor: "#A4404D",
        confirmButtonText: "Login",
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/loginpage");
        }
      });
    }
  };

  const isrefer = (id) => {
    if (
      refget.some((article) => {
        return article.publishedAt === id;
      })
    ) {
      return "text-primary";
    } else {
      return "";
    }
  };

  const isfav = (id) => {
    if (
      favget.some((article) => {
        return article.publishedAt === id;
      })
    ) {
      return "text-danger";
    } else {
      return "";
    }
  };

  const [latest1, setLatest1] = useState([]);
  const [latest2, setLatest2] = useState([]);

  const latestnews1 = async () => {
    let { data } = await axios.get(`${config.newsapi}/bbc`);
    setLatest1(data);
  };
  const latestnews2 = async () => {
    let { data } = await axios.get(`${config.newsapi}/top-headlines-page2`);
    setLatest2(data);
  };
  useEffect(() => {
    latestnews1();
    latestnews2();
  }, []);
  const navigate = useNavigate();
  const [topheadlines, setTopheadlines] = useState([]);
  const TopHeadlines = async () => {
    let { data } = await axios.get(`${config.newsapi}/top-headlines-page1`);
    setTopheadlines(data);
  };

  useEffect(() => {
    TopHeadlines();
  }, []);

  const [toppicks, setToppicks] = useState([]);
  const TopPicks = async () => {
    let { data } = await axios.get(`${config.newsapi}/top-headlines-page3`);
    setToppicks(data);
  };

  useEffect(() => {
    TopPicks();
  }, []);

  const [weat,setWeat]=useState([])
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [max, setMax] = useState("");
  const [min, setMin] = useState("");
  const [icon, setIcon] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [pressure, setPressure] = useState("");
  const [humidity, setHumidity] = useState("");
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
 

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const fetchWeather = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(
        savePositionToState
      );
      let res = await axios.get(`${config.newsapi}/weather/${latitude}/${longitude}`)
      setWeat(res.data)
      setTemperature(res.data.main.temp);
      setMax(res.data.main.temp_max)
      setMin(res.data.main.temp_min)
      setCountry(res.data.sys.country)
      setCityName(res.data.name)
      setWeather(res.data.weather[0].main);
      setIcon(res.data.weather[0].icon)
      setSunrise(res.data.sys.sunrise)
      setSunset(res.data.sys.sunset)
      setPressure(res.data.main.pressure)
      setHumidity(res.data.main.humidity)
      console.log(weat)
      console.log(res.data);
      console.log(temperature);
     
      console.log(weather);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);


  const convertTimestamp=(timestamp)=> {
  var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
		dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
		ampm = 'AM',
		time;
			
	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh === 0) {
		h = 12;
	}
	
	// ie: 2013-02-18, 8:35 AM	
	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
		
	return time;
}


  return (
    <div>
      <Appbar />
      <div className="container">
        <img src={news1} alt="news" className="dash-img" />
        <h1 className="img-text">Welcome to Newsly</h1>
        <h3 className="img-text-2">
          Get latest updates and Top headlines here...
        </h3>
      </div>
      <div className="container dash-main">
        <Box sx={{ width: 1 }}>
          <Box display="grid" gridTemplateColumns="repeat(10, 1fr)" gap={2}>
            <Box gridColumn="span 7" className="top-1">
              <Item>
                <h3 className="fw-bold d-flex justify-content-between ">
                  Latest Updates
                </h3>
                <div className="grid-card">
                  {latest1.map((item) => (
                    <>
                      <div
                        className="card news-card"
                        style={{ width: "16rem" }}
                        key={item.publishedAt}
                      >
                        <img
                          src={item.urlToImage}
                          className="card-img-top"
                          alt="news"
                        />
                        <div className="card-body">
                          <a
                            href={item.url}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            {" "}
                            <p className="card-text">{item.title}</p>
                          </a>
                          <div className="d-flex flex-row mt-2 justify-content-end ">

                          <abbr title="add to favorites">  <i
                              className={`fa-solid fa-heart me-2 arrow ${isfav(
                                item.publishedAt
                              )}`}
                              onClick={addfav.bind(
                                this,
                                item.title,
                                item.description,
                                item.url,
                                item.urlToImage,
                                item.publishedAt
                              )}
                            ></i></abbr>

                            {/* {addDelete ? */}
                            <abbr title="refer article">
                            <i
                              className={`fa-solid fa-people-arrows-left-right arrow ${isrefer(
                                item.publishedAt
                              )}`}
                              onClick={referarticle.bind(this, item)}
                            ></i></abbr>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                  {latest2.map((item) => (
                    <>
                      <div
                        className="card news-card"
                        style={{ width: "16rem" }}
                        key={item.publishedAt}
                      >
                        <img
                          src={item.urlToImage ? item.urlToImage : img}
                          className="card-img-top"
                          alt="news"
                        />
                        <div className="card-body">
                          <a
                            href={item.url}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            {" "}
                            <p className="card-text">{item.title}</p>
                          </a>
                          <div className="d-flex flex-row mt-2 justify-content-end ">
                          <abbr title="add to favorites">
                            <i
                              className={`fa-solid fa-heart arrow me-2 ${isfav(
                                item.publishedAt
                              )}`}
                              onClick={addfav.bind(
                                this,
                                item.title,
                                item.description,
                                item.url,
                                item.urlToImage,
                                item.publishedAt
                              )}
                            ></i></abbr>

                            <abbr title="refer article"><i
                              className={`fa-solid fa-people-arrows-left-right arrow ${isrefer(
                                item.publishedAt
                              )}`}
                              onClick={referarticle.bind(this, item)}
                            ></i></abbr>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <Divider />
                  
              <div className="container">
               <h3 className="fw-bold me-4 ">Weather Report</h3>
                <div className="container weat-cont shadow rounded">
                <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-row">
                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weat" />  <h2 className=" font mt-5 fw-bold ">{weather}</h2>
                    </div>
                    <div>
                    <h5 className=" font mt-5 fw-bold">{cityName}, {country}</h5>
                    </div>
                    
                    </div>
                    <br/>
                    <h1 className="fw-bold text-left">{Math.round(temperature-273.15)}°C</h1>
                    <br/>
                    <div className="min-max">
                    <h6 className="me-5 ms-4 "><span className=" fonts fw-bold font">Min:</span> {Math.round(min-273.15)}°C</h6>
                    <h6><span className=" fonts font fw-bold">Max:</span> {Math.round(max-273.15)}°C</h6>

                    
                    </div>
                    <br/>
                    <h6><span className=" fonts fw-bold font">Pressure:</span> {pressure} mPa</h6>
                    <h6><span className=" fonts fw-bold font">Humidity:</span> {humidity}%</h6>
                    
                    <br/>
                    <div className="min-max">
                   <h6 className="ms-5 me-5 "><span className=" fonts fw-bold font">Sunrise:</span> {convertTimestamp(sunrise)}</h6>
                   <h6><span className=" fonts fw-bold  font">Sunset:</span> {convertTimestamp(sunset)}</h6>
                    
                    </div>

                
                </div>
               </div>
 
                <div className="container mt-5 slick">
                  <div className="d-flex justify-content-between">
                    <h3 className="fw-bold me-4 ">Recommended Articles</h3>
                    <br />
                    <div>
                      <ArrowBackIosIcon
                        className="arrow p-1 text-black"
                        onClick={() => {
                          slideref.current.slickPrev();
                        }}
                      />
                      <ArrowForwardIosIcon
                        className="arrow text-black p-1"
                        onClick={() => {
                          slideref.current.slickNext();
                        }}
                      />
                    </div>
                  </div>

                  <Slider ref={slideref} {...settings}>
                    {refget
                      .slice(0)
                      .reverse()
                      .map((item) => (
                        <>
                          <div
                            className="card news-cards"
                            style={{ width: "16rem", height: "18rem" }}
                            key={item.publishedAt}
                          >
                            <img
                              src={item.urlToImage ? item.urlToImage : img}
                              className="card-img-top"
                              alt="news"
                            />
                            <div className="card-body">
                              <a
                                href={item.url}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                {" "}
                                <p className="card-text">{item.title}</p>
                              </a>

                              <abbr title="add to favorites"><i
                                className={`d-flex flex-row  justify-content-end fa-solid fa-heart arrow me-2 ${isfav(
                                  item.publishedAt
                                )}`}
                                onClick={addfav.bind(
                                  this,
                                  item.title,
                                  item.description,
                                  item.url,
                                  item.urlToImage,
                                  item.publishedAt
                                )}
                              ></i></abbr>
                            </div>
                          </div>
                        </>
                      ))}
                  </Slider>
                </div>
                <Divider />
                <br />
              

                <div className=" mt-5">
                  <div className="container mt-5 slick">
                    <div className="d-flex justify-content-between">
                      <h3 className="fw-bold me-4 ">Top Picks</h3>
                      <br />
                      <div>
                        <ArrowBackIosIcon
                          className="arrow p-1 text-black"
                          onClick={() => {
                            topref.current.slickPrev();
                          }}
                        />
                        <ArrowForwardIosIcon
                          className="arrow text-black p-1"
                          onClick={() => {
                            topref.current.slickNext();
                          }}
                        />
                      </div>
                    </div>

                    <Slider ref={topref} {...settings}>
                      {toppicks
                        .slice(0)
                        .reverse()
                        .map((item) => (
                          <>
                            <div
                              className="card news-cards "
                              style={{ width: "16rem", height: "17rem" }}
                              key={item.publishedAt}
                            >
                              <img
                                src={item.urlToImage ? item.urlToImage : img}
                                className="card-img-top"
                                alt="news"
                              />
                              <div className="card-body">
                                <a
                                  href={item.url}
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
                                >
                                  {" "}
                                  <p className="card-text">{item.title}</p>
                                </a>

                                <abbr title="add to favorites"><i
                                  className={`d-flex mt-2 justify-content-end align-items-end fa-solid fa-heart me-2 arrow ${isfav(
                                    item.publishedAt
                                  )}`}
                                  onClick={addfav.bind(
                                    this,
                                    item.title,
                                    item.description,
                                    item.url,
                                    item.urlToImage,
                                    item.publishedAt
                                  )}
                                ></i></abbr>
                              </div>
                            </div>
                          </>
                        ))}
                    </Slider>
                  </div>
                </div>

                <Divider />
                <br />
                <br />
                <br />
                <br />

<h3 className="fw-bold me-4 ">Categories</h3>
                <div className="container botom-cato">

                  <div className="d-flex flex-row arrow me-5 p-3  rounded shadow" onClick={()=>navigate('/businessnews')}>
                  
                    <img src={business} alt="news"  width={50} height={50} />
                    <h5 className="fw-bold ms-3" >Business</h5>
                  </div>

                  <div className="d-flex flex-row arrow me-5 p-3  rounded shadow " onClick={()=>navigate('/sportsnews')}>
                    <img src={sports} alt="news" width={50} height={50} />
                    <h5 className="fw-bold ms-3"  >Sports</h5>
                  </div>

                  <div className="d-flex flex-row arrow me-5 p-3  rounded shadow " onClick={()=>navigate('/healthnews')}>
                    <img src={health} alt="news" width={50} height={50} />
                    <h5 className="fw-bold ms-3" >Health</h5>
                  </div>

                  <div className="d-flex flex-row arrow me-5 p-3  rounded shadow " onClick={()=>navigate('/generalnews')}>
                    <img src={general} alt="news" width={50} height={50} />
                    <h5 className="fw-bold ms-3" >General</h5>
                  </div>

                  <div className="d-flex flex-row arrow me-5 p-3  rounded shadow " onClick={()=>navigate('/sciencenews')}>
                    <img src={science} alt="news" width={50} height={50} />
                    <h5 className="fw-bold ms-3" >Science</h5>
                  </div>

                  <div className="d-flex flex-row arrow  p-3 me-5  rounded shadow " onClick={()=>navigate('/technologynews')}>
                    <img src={tech} alt="news" width={50} height={50} />
                    <h5 className="fw-bold ms-3" >Technology</h5>
                  </div>

                  <div className="d-flex flex-row arrow  p-3 me-5 rounded shadow " onClick={()=>navigate('/entertainmentnews')}>
                    <img src={enter} alt="news" width={50} height={50} />
                    <h5 className="fw-bold ms-3" >Entertainment</h5>
                  </div>
                </div>
              </Item>
            </Box>

            <Box gridColumn="span 3" className="top">
              <Item>
                <div className="container">
                  <div className="head d-flex justify-content-between">
                    <h5 className="fw-bold me-4 mt-1">Top-Headlines</h5>
                    <button
                      className="btn btn-secondary "
                      onClick={() => {
                        navigate("/topheadlines");
                      }}
                    >
                      More..
                    </button>
                  </div>

                  <div className="top-title mt-3 ">
                    <ul style={{ listStyle: "none", textAlign: "justify" }}>
                      {topheadlines.map((item) => (
                        <a href={item.url} style={{textDecoration:'none'}}>
                          <li className="mb-3 me-3 text-dark font">
                          <i className="fa-solid fa-hand-point-right "></i> {item.title}
                          </li>
                        </a>
                      ))}
                    </ul>
                  </div>
  
                  <Divider/>
                  <div className="email-back">
                  <h3 className="mt-3 fw-bold text-dark">Email Newsletter</h3>
                  <p>Not subscribed? Subscribe here to get the latest updates.</p>
                  
                      <input type="email" placeholder="Enter Email.." id="email" onChange={(e)=>{setValue(e.target.value)}}/>
                      <input type="submit" value="Subscribe" className="btn " onClick={submitHandle}/>
                 
              </div>
                </div>
              </Item>
            </Box>
          </Box>
        </Box>
      </div>

      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Dashboard;
