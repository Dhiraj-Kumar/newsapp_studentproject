import React, { useState, useEffect } from "react";
import Appbar from "./Appbar";
import img from "../images/img-place.png";
import "../assets/Dashboard.css";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import config from "./config"
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Footer from "./Footer";
import Swal from 'sweetalert2'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Dashboard() {
  const navigate = useNavigate();
  const [topheadlines, setTopheadlines] = useState([]);
 

  const TopHeadlines = async () => {
    let { data } = await axios.get(`${config.newsapi}/top-headlines-page1`);
    setTopheadlines(data);
    
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

  const [favget,setFavget] = useState([])
  const username=localStorage.getItem('username')
  const favoriteget =async()=>{
  if(document.cookie){
    let { data } = await axios.get(
      `${config.favorite}/getfavorite/${username}`
    );
    setFavget(data)
  }
  else{
    navigate('/loginpage')
  }
  }
  useEffect(() => {
   favoriteget();
    
  }, [])

  useEffect(() => {
    TopHeadlines();
  
  }, []);

  const deletefav =(id)=>{
    Swal.fire({
      title: 'Are You Sure?',
      text: "Do you want this article to remove from your Favourites?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009E8D',
      cancelButtonColor: '#A4404D',
      confirmButtonText: 'Yes',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
    }).then(async(result) => {
      if (result.isConfirmed) {
        await axios.delete(`${config.favorite}/deletefavorite/${id}`).then((data)=>{
          let res = favget.filter(x => x.publishedAt !== id )
          setFavget(res);

    }).then((res)=>{
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
    }).catch((err) => {
      console.log(err)
    })
      }
    })

    
  }

  return (
    <div>
      <Appbar />
      <div className="container">
        <h2 className="head-text text-center fw-bold shadow bg-danger text-light">Get Your Favorites❤️ here... </h2>
       
      </div>
      <div className="container dash-main">
        <Box sx={{ width: 1 }}>
          <Box display="grid" gridTemplateColumns="repeat(10, 1fr)" gap={2}>
            <Box gridColumn="span 7" className="top-1 w-100">
              <Item className="gridi">
                {favget.slice(0).reverse().map((item) => (
                  <>
                   
                      <Card
                      sx={{
                        maxWidth: 340,
                        marginBottom: "1.7rem",
                        backgroundColor: "#FFE4E5",
                        textAlign:"left"
                        
                      }}
                      className="card-grid"
                      key={item.publishedAt}
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
                       <div className="d-flex justify-content-between">
                        <a
                          className="btn btn-danger"
                          
                          href={item.url}
                        >
                          Read more
                        </a>

                        <button className="btn btn-warning ms-5 fw-bold" style={{fontSize:'0.7rem'}} onClick={deletefav.bind(this,item.publishedAt)}>Remove from favorites</button>
                      
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
                  
                      <input type="email" placeholder="Enter Email" id="email" onChange={(e)=>{setValue(e.target.value)}}/>
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

export default Dashboard;
