import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const navigate=useNavigate()

  let handleRoute=(route)=>{
    if(user==null){
      navigate("/login")
    }else{
      navigate(route)
    }

  }
    
    return (
      <div>
     
     <section class="home" id="home">

       <div class="content">
           <h1 class="title">Very Fast <span>Find</span><span> Mechanic Shops</span> </h1>
           <p class="description">We are Provide Our Mechanics & Mechanic Shops For Your Breakdowns At the Location.</p>
           <button onClick={()=>handleRoute("/mechanic")} class="btn">Find A Mechanic</button>
           <button onClick={()=>handleRoute("/mechanicform")} class="btn btn1" style={{marginLeft: '50px'}} >Shop Register</button>

       </div>

       {/* <div class="image">
           <img src={require("../Assests/Images/267-2673822_car-vector-motors-corporation-automobile-repair-shop-automobile-repair-shop-removebg-preview.png")} alt="" data-speed="-3" class="move img-fluid"/>
       </div> */}
</section>



<section class="about section-padding" id="section_2">

 <div class="container">

     <div class="row">


         <div class="col-lg-6 col-12 mb-5 mb-lg-0">
             <div class="about-image-wrap h-100" style={{marginTop: '5vh'}}>
                 <img src={require("../Assests/Images/Screenshot_from_2023-12-20_00-26-14-removebg-preview.png")} class="img-fluid about-image" alt=""/>

             </div>
         </div>

         <div class="col-lg-6 col-12 d-flex flex-column">
             <div class="about-thumb bg-white shadow-lg">
                 
                 <div class="about-info">
                     <h3>About Us</h3>



                     <p>repairnow is not just a service; we are your roadside partner, dedicated to making your journeys smoother. With us, you can trust that a breakdown won't be a roadblock. Experience convenience, choose confidence – because every journey deserves a reliable companion.
</p>

                     <p>We understand the urgency of your commitments. Our service lets you focus on what matters while we handle the vehicle issues efficiently.

                     </p>
                 </div>
             </div>

             <div class="row h-100 one">
                 <div class="col-lg-6 col-6">
                   <div class="card" style={{width: '16rem'}}>
                     <img src={require("../Assests/Images/Screenshot from 2023-12-16 12-29-55.png")} class="card-img-top" alt="" />
                     <div class="card-body text-center">
                       <h5 class="card-title">Find A Mechanic</h5>
                       <a href="http://localhost:3000/mechanic" class="btn btn-primary" >Click Here</a>
                     </div>
                   </div>
                 </div>

                 <div class="col-lg-6 col-6">
                   <div class="card" style={{width: '16rem'}}>
                     <img src={require("../Assests/Images/Screenshot from 2023-12-16 12-30-16.png")} class="card-img-top" alt=""/>
                     <div class="card-body text-center">
                       <h5 class="card-title">Shops Register</h5>
                       <a href="http://localhost:3000/mechanicform" class="btn btn-primary">Click Here</a>
                     </div>
               </div>
                 </div>
             </div>
         </div>

     </div>
 </div>
</section>



      </div>
    );
  }
  
  export default Home;