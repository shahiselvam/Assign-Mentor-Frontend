import React, { Component } from 'react';
import Home from './home';
import axios from 'axios';


const API_URL = 'https://assign-mentor-backend.herokuapp.com/mentors';


export default class Mentor extends Component {

    constructor() {
        super();

        this.state = {
            _id: '',
            Name: '',
            Designation: '',
            Department:'',
            Email: '',
            MobileNumber: '',
            Mentor: []

        };
    }

    componentDidMount() {

        this.getmentor();

    }

    getmentor = async () => {

        const { data } = await axios.get(API_URL);
        this.setState({ Mentor: data });
        

    }

    deleteMentor = async Men_id => {

        await axios.delete(`${API_URL}/${Men_id}`);
        let Mentor = [...this.state.Mentor];
        Mentor = Mentor.filter(({ _id }) => _id != Men_id);
        this.setState({ Mentor });
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

        const { data } = await axios.post(API_URL, {
            Name: this.state.Name,
            Designation:this.state.Designation,
            Department: this.state.Department,
            Email: this.state.Email,
            MobileNumber: this.state.MobileNumber

        });



        const Mentor = [...this.state.Mentor];
        Mentor.push(data);
   

        this.setState({ Mentor, Name: '',Designation: '' , Department: '', Email: '', MobileNumber: '' });


        this.getmentor();

    };

    updatePost = async () => {
        const { _id, Name,Designation, Department, Email, MobileNumber } = this.state;
        const { data } = await axios.put(`${API_URL}/${_id}`, {
            Name,
            Designation,
            Department,
            Email,
            MobileNumber
        });


        const Mentor = [...this.state.Mentor];
        const Mentor_index = Mentor.findIndex(Mentor => Mentor._id === _id);
        Mentor[Mentor_index] = data;

        this.setState({ Mentor , _id: '', Name: '',Designation:'' , Department: '', MobileNumber: '', Email: '' });
        this.getmentor();
    }

    handlechange = ({ target: { name, value } }) => {

        this.setState({ [name]: value });

    }

    editMentor = (Mentor) => {

        this.setState({ ...Mentor });
    };


    render() {

        return (
            <>
                <div class="wrapper">
                    <Home />
                    <div class="content-wrapper">
                        <section class="content-header">
                            <div class="container-fluid">
                                <div class="row mb-2">
                                    <div class="col-sm-12">
                                        <h1>Students</h1>
                                    </div>
                                    <div class="col-sm-12">
                                        <ol class="breadcrumb float-sm-right">
                                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                                            <li class="breadcrumb-item active">Mentor</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section class="content">
                            <div class="container-fluid">
                                <div class="row">

                                    <div class="col-md-12">
                                        <div class="card card-primary">
                                            <div class="card-header">
                                                <h3 class="card-title">Mentor</h3>
                                            </div>

                                            <form onSubmit={this.handleSubmit}>
                                                <div class="card-body">
                                                    <div class="form-group">
                                                        <label for="Name">Name</label>
                                                        <input type="text" name="Name" class="form-control" placeholder="Enter Name" value={this.state.Name} onChange={this.handlechange} />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="Designation">Designation</label>
                                                        <input type="text" name="Designation" class="form-control" placeholder="Designation" value={this.state.Designation} onChange={this.handlechange} />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="Department">Department</label>
                                                        <input type="text" name="Department" class="form-control" placeholder="Department" value={this.state.Department} onChange={this.handlechange} />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="Email">Email</label>
                                                        <input type="email" name="Email" class="form-control" placeholder="Enter Email" value={this.state.Email} onChange={this.handlechange} />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="PhoneNumber">Phone Number</label>
                                                        <input type="text" name="MobileNumber" class="form-control" placeholder="Enter PhoneNumber" value={this.state.MobileNumber} onChange={this.handlechange} />
                                                    </div>
                                                    <div class="footer">
                                                        <button type="submit" class="btn btn-primary">Submit</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
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

                                                        <th>Name</th>
                                                        <th>Designation</th>
                                                        <th>Department</th>
                                                        <th>Email</th>
                                                        <th>PhoneNumber</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.Mentor.map(mentors => {
                                                        return (
                                                            <tr key={mentors._id}>
                                                                <td>{mentors.Name}</td>
                                                                <td>{mentors.Designation}</td>
                                                                <td>{mentors.Department}</td>
                                                                <td>{mentors.Email}</td>
                                                                <td>{mentors.MobileNumber}</td>
                                                                <td>

                                                                    <i class="fa fa-pencil-square-o" aria-hidden="true" onClick={() => this.editMentor(mentors)}>Edit</i>

                                                                </td>
                                                                <td>

                                                                    <i class="" aria-hidden="true" onClick={() => this.deleteMentor(mentors._id)}>Delete</i>

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
        );
    }
}
