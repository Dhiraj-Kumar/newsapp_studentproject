import {React,useState} from 'react'
import "../assets/footer.css"
import axios from 'axios'
import Swal from 'sweetalert2'
import config from './config'


function Footer() {
    
    const [value,setValue]=useState("")
 
   const submitHandle=async()=>{
    console.log(value)
     await axios.post(`${config.newsletter}/${value}`).then((res) => {
        
        Swal.fire({
          title: 'You have Subscribed our Newsletter',  
          timer: 1000,
         
        }).then((result) => {
          Swal.showLoading()
         
           if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
      })
      .catch((err) => {
        console.log(err);
      }); 
   }

  return (
    <div>
    <div className="container-fluid bg-dark">
    <footer  className=" main-footer">
    <div className="container footer-container">
        <div>
            <h4 className='fw-bold'>Newsly</h4>
            <p>Here you can get latest and interesting articles and news.Have a look at our website. </p>

        </div>
        <div>
                    <h3 className='site'>Site Links</h3>
                    <ul className="lists " style={{listStyle:"none"}}>
                        <li>
                            <a href="/dashboardpage" style={{textDecoration:'none'}}>Help & Support</a>  
                        </li>
                        <li>
                            <a href="/dashboardpage" style={{textDecoration:'none'}}>Privacy Policy</a>  
                        </li>
                        <li>
                            <a href="/dashboardpage" style={{textDecoration:'none'}}>About Us</a>  
                        </li>
                        <li>
                            <a href="/dashboardpage" style={{textDecoration:'none'}}>Contact</a>  
                        </li>
                        
                    </ul>
                </div>
                <div className='letter-div'>
                  <h3 className=" fw-bold  letter-h3">Email Newsletter</h3>
                  <p>Not subscribed? Subscribe here to get the latest updates.</p>
                  
                      <input type="email" placeholder="Enter Email.." id="email" className='letter-email' onChange={(e)=>{setValue(e.target.value)}}/>
                      <input type="submit" value="Subscribe" className="btn  letter-btn" onClick={submitHandle}/>
                 
              </div>
        <div>
            <p className='pt-1'> Copyright &copy; 2019, All Rights Reserved</p>
        </div>
        </div>
        </footer>
    </div>
    
    </div>
  )
}

export default Footer