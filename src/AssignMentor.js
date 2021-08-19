import React, { Component } from 'react';
import Home from './home';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';


const API_URL = 'https://assign-mentor-backend.herokuapp.com/students';
const API_URL1 = 'https://assign-mentor-backend.herokuapp.com/mentors';
const API_URL2 = 'https://assign-mentor-backend.herokuapp.com/assignMentor';


export default class assignMentor extends Component {

    constructor() {


        super();
        this.state = {
            _id :'',
            student: '',
            mentor: '',
            AssignStudent:[],
            AssignedMentor:[],
            mentors:[]
        }

    }


    componentDidMount() {

        this.getStudent();
        this.getMetor();
        this.getAssignedMentor();

    }

    getStudent = async () => {
        const { data } = await axios.get(API_URL);
        this.setState({ AssignStudent: data });
   


    }

    getMetor = async () => {
        const { data } = await axios.get(API_URL1);
        this.setState({ AssignedMentor: data });

    }

    getAssignedMentor = async () => {
        const arr= [];
        const { data } = await axios.get(API_URL2); 
        console.log(data);
        for( var i in data)
        {
          
           const studentvalue  = await axios.get(`${API_URL}/${data[i].student}`);
           const MentorValue  = await axios.get(`${API_URL1}/${data[i].mentor}`);
          
           var obj = {
               _id : data[i]._id,
               student: studentvalue.data,
               mentor: MentorValue.data,
               studentid:data[i].student,
               mentorid:data[i].mentor       
           }
         
          arr.push(obj);
          console.log(arr);
            
        }
        
        this.setState({mentors : arr}); 
       
    }
    deleteStudents = async Std_id => {
        console.log(Std_id);
        await axios.delete(`${API_URL2}/${Std_id}`);
        let mentors= [...this.state.mentors];

        mentors = mentors.filter(({ _id }) => _id != Std_id);
        this.setState({ mentors });
    }
    handelchange = ({ target: { name, value } }) => {

        this.setState({ [name]: value });

    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state._id) {

            this.updatePost();
        }

        else {
            this.createPosts();
        }
         
        }

        createPosts = async () => {
         
             const  {data }   = await axios.post(API_URL2 , { 
              
                student: this.state.student,
                mentor :this.state.mentor
           
            });
           
         
           if(typeof data == "object"){
             
            alert("Details Added Successfully")
           }

           else{

            alert("Mentor Already assigned for this student")
           }
           
             const mentors = [...this.state.mentors];
             mentors.push(data);
         
            this.setState({ mentors, student: '', mentor: '' });
           
          
            this.getAssignedMentor();
        
          };

          updatePost = async () => {
            const { _id, student, mentor} = this.state;
            const { data } = await axios.put(`${API_URL2}/${_id}`, {
                student,
                mentor,
               
            });
    
    
            const mentors = [...this.state.mentors];
            const mentors_index = mentors.findIndex(mentor => mentor._id === _id);
            mentors[mentors_index] = data;
    
            this.setState({ mentors, student: '', mentor: '' });
            this.getAssignedMentor();
        }

          editStudents = (mentors) => {
          console.log(mentors);
          this.setState({_id : mentors._id})
           this.setState( {student :mentors.studentid }  )
           this.setState({mentor : mentors.mentorid})
        };
    render() {

        return (
            <>

                <div class="wrapper">
                    <Home />
                    <div class="content-wrapper">
                    
                        <section class="content">
                            <div class="container-fluid">

                                <div class="card card-default">
                                    <div class="card-header">
                                        <h3 class="card-title">Assign Mentor</h3>

                                        <div class="card-tools">
                                            
                                        </div>
                                    </div>
                                    <form class="row g-3" onSubmit={this.handleSubmit}>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Mentor</label>
                                                    <select class="form-selectform-control select2" name="mentor" value={this.state.mentor} onChange={this.handelchange} placeholder="Select a Mentor" style={{width: "100%" , padding:"10px"}}  >
                                                    <option value="" disabled selected hidden>Select a Mentor</option>
                                                      {this.state.AssignedMentor.map(AssignedMentor => {
                                                            return (

                                                                <option value={AssignedMentor._id}>{AssignedMentor.Name}</option>
                                                            );
                                                        })}
                                                    </select>
                                                    </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                    <div class="form-group">
                                                    <label>Student</label> 
                                                    <select class="form-selectform-control select2" name="student" value={this.state.student} data-placeholder="Select a Student" onChange={this.handelchange} style={{width: "100%" , padding:"10px"}} >
                                                        
                                                    <option value="" disabled selected hidden>Select a Student</option>
                                                        {this.state.AssignStudent.map(student => {
                                                            return (

                                                                <option value={student._id}>{student.Name}</option>

                                                            );

                                                        })}
                                                    </select>
                                                    </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                   <div class="footer">
                                                        <button type="submit" class="btn btn-primary">Submit</button>
                                                    </div>
                                                    </div>

                                                    
                                                </div>
                                            </div>
                                     
                                    </form>
                                </div>

                            </div>
                        </section>
                        <section class="content-header">
                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-header">
                                            <h3 class="card-title"></h3>


                                        </div>

                                        <div class="card-body table-responsive p-0">
                                            <table class="table table-hover text-nowrap">
                                                <thead>
                                                    <tr>

                                                        <th>Mentor</th>
                                                        <th>Student</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.mentors.map(mentor => {
                                                        return (
                                                            <tr key={mentor._id}>
                                                                <td value={mentor.mentorid}>{mentor.mentor}</td>
                                                                <td value={mentor.studentid}>{mentor.student}</td>
                                                                
                                                                <td>

                                                                    <i class="fa fa-pencil-square-o" aria-hidden="true" onClick={() => this.editStudents(mentor)}></i>

                                                                </td>
                                                                <td>

                                                                    <i class="fa fa-trash" aria-hidden="true" onClick={() => this.deleteStudents(mentor._id)}></i>

                                                                </td>
                                                            </tr>


                                                        );
                                                    })}



                                                </tbody>
                                            </table>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </>
        )
    }

}
