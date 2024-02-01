import React, { useState, useEffect } from "react";
import Appbar from "../Appbar";
import img from "../../images/img-place.png";
import "../../assets/Dashboard.css";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import config from '../config'
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Swal from 'sweetalert2'
import Footer from "../Footer";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Science() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [topheadlines, setTopheadlines] = useState([]);
 const [science,setScience]=useState([]);

  const TopHeadlines = async () => {
    let { data } = await axios.get(`${config.newsapi}/top-headlines-page1`);
    setTopheadlines(data);
    
  };

  const DataScience =async()=>{
    let { data } = await axios.get(`${config.newsapi}/category/Science`);
    setScience(data);

  }

  useEffect(() => {
    TopHeadlines();
    DataScience()
  }, []);

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
                let timerInterval
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
          } else {
            await axios
              .delete(`${config.favorite}/deletefavorite/${publishedAt}`)
              .then((data) => {
                event.target.classList.remove("text-danger");
                
                let timerInterval
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
              title: 'Article removed from Recommend..',                  
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
  const isrefer =(id)=>{
    if( refget.some(article =>{
          return article.publishedAt === id
        })){
       return "text-primary"
        }
        else{
          return ""
        }
  }

  const isfav =(id)=>{
    if( favget.some(article =>{
          return article.publishedAt === id
        })){
       return "text-danger"
        }
        else{
          return ""
        }
  }

  return (
    <div>
      <Appbar />
      <div className="container">
        <h1 className="head-text text-center fw-bold shadow bg-info text-light">Science News</h1>
       
      </div>
      <div className="container dash-main">
        <Box sx={{ width: 1 }}>
          <Box display="grid" gridTemplateColumns="repeat(10, 1fr)" gap={2}>
            <Box gridColumn="span 7" className="top-1 w-100">
              <Item className="gridi">
                {science.map((item) => (
                  <>
                   
                      <Card
                      sx={{
                        maxWidth: 340,
                        marginBottom: "1.7rem",
                        backgroundColor: "#D3E6E5",
                        textAlign:"left"
                        
                      }}
                      className="card-grid"
                      key={item.title}
                    >
                      <CardMedia
                        component="img"
                        alt="news"
                        height="170"
                        className="p-1"
                        image={(item.urlToImage)? item.urlToImage : img}
                      />
                      <CardContent>
                       <h6 className="fw-bold text-dark text-center">{item.title}</h6>    
                         <p className=" text-secondary  mt-2"> {item.description}</p>
                          
                           
                            
                            <p className="mt-2 fw-bold text-secondary text-left fst-italic"><span className="text-dark">Published at: </span>{item.publishedAt}</p>
                            
                          
                        
                      </CardContent>
                      <CardActions>
                       
                        <a
                          className="btn btn-info"
                          
                          href={item.url}
                        >
                          Read more
                        </a>
                        <div className="d-flex flex-row  ms-4 ">

                            <i className={`fa-solid fa-heart me-2 arrow ${isfav(item.publishedAt)}`} onClick={addfav.bind(this, item.title, item.description, item.url, item.urlToImage, item.publishedAt)}></i>

                            {/* {addDelete ? */}
                            <i className={`fa-solid fa-people-arrows-left-right arrow ${isrefer(item.publishedAt)}` } onClick={
                              referarticle.bind(this, item)}></i>

                          
                        
                        </div>
                      </CardActions>
                    </Card> 
                  </>
                ))}
              </Item>
            </Box>
            <Box gridColumn="span 3" className="top">
              <Item>
                <div className="container">
                  <div className="head d-flex flex-row">
                    <h5 className="fw-bold me-4">Latest News</h5>
                    <button
                      className="btn btn-secondary ms-5 px-2 py-0"
                      onClick={() => {
                        navigate("/dashboardpage");
                      }}
                    >
                      More..
                    </button>
                  </div>
                  <div className="top-title mt-3">
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
      <br/>
      <br/>
      <Footer/>
    </div>
  );
}

export default Science;