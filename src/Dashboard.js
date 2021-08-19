import React  , { Component } from 'react';
import Home from './home';
import axios from 'axios';


const API_URL = 'https://assign-mentor-backend.herokuapp.com/studentcount';
const API_URL1 = 'https://assign-mentor-backend.herokuapp.com/mentorcount';

export default class dashboard extends Component {

    constructor() {
        super();

        this.state = {
        mentor:'',
        students:''

        }

    }

    componentDidMount(){

     this.getMentorCount();
     this.getStudentCount();

    }

    getMentorCount =  async () =>{

       const {data} = await axios.get(API_URL1);
       this.setState({mentor :data });
    }
    getStudentCount = async () => {

        const { data } = await axios.get(API_URL);
        this.setState({students : data})
    }

    render(){

        return(

          
            <>
              <Home />
            <div class="content-wrapper">
    
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Dashboard</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Dashboard v1</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    
    
    
    <section class="content">
      <div class="container-fluid">
    
        <div class="row">
          <div class="col-lg-3 col-6">
    
            <div class="small-box bg-info">
              <div class="inner">
                <h3>{this.state.students}</h3>
    
                <p>Students</p>
              </div>
              <div class="icon">
                <i class="ion ion-bag"></i>
              </div>
              <a href="#" class="small-box-footer"> <i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
    
          <div class="col-lg-3 col-6">
     
            <div class="small-box bg-success">
              <div class="inner">
                <h3>{this.state.mentor}</h3>
    
                <p>Mentor</p>
              </div>
              <div class="icon">
                <i class="ion ion-stats-bars"></i>
              </div>
              <a href="#" class="small-box-footer"><i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          
        </div>
       
       
      </div>
    </section>
    
    </div>
            </>
        )
    }

}

