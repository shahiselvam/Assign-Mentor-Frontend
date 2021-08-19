import React, { Component } from 'react';
import Home from './home';
import axios from 'axios';


const API_URL = 'https://assign-mentor-backend.herokuapp.com/students';


export default class student extends Component {

    constructor() {
        super();

        this.state = {
            _id: '',
            Name: '',
            Department: '',
            Email: '',
            MobileNumber: '',
            Student: []

        };
    }

    componentDidMount() {

        this.getpost();

    }

    getpost = async () => {

        const { data } = await axios.get(API_URL);
        this.setState({ Student: data });
        console.log(data);

    }

    deleteStudents = async Std_id => {
        console.log(Std_id);
        await axios.delete(`${API_URL}/${Std_id}`);
        let Student = [...this.state.Student];
        Student = Student.filter(({ _id }) => _id != Std_id);
        this.setState({ Student });
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
            Department: this.state.Department,
            Email: this.state.Email,
            MobileNumber: this.state.MobileNumber

        });



        const Student = [...this.state.Student];
        Student.push(data);
        console.log(data);

        this.setState({ Student, Name: '', Department: '', Email: '', MobileNumber: '' });


        this.getpost();

    };

    updatePost = async () => {
        const { _id, Name, Department, Email, MobileNumber } = this.state;
        const { data } = await axios.put(`${API_URL}/${_id}`, {
            Name,
            Department,
            Email,
            MobileNumber
        });


        const student = [...this.state.Student];
        const student_index = student.findIndex(student => student._id === _id);
        student[student_index] = data;

        this.setState({ student , _id: '', Name: '', Department: '', MobileNumber: '', Email: '' });
        this.getpost();
    }

    handlechange = ({ target: { name, value } }) => {

        this.setState({ [name]: value });

    }

    editStudents = (students) => {

        this.setState({ ...students });
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
                                            <li class="breadcrumb-item active">Students</li>
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
                                                <h3 class="card-title">Students</h3>
                                            </div>

                                            <form onSubmit={this.handleSubmit}>
                                                <div class="card-body">
                                                    <div class="form-group">
                                                        <label for="Name">Name</label>
                                                        <input type="text" name="Name" class="form-control" placeholder="Enter Name" value={this.state.Name} onChange={this.handlechange} />
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
                                                        <th>Department</th>
                                                        <th>Email</th>
                                                        <th>PhoneNumber</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.Student.map(students => {
                                                        return (
                                                            <tr key={students._id}>
                                                                <td>{students.Name}</td>
                                                                <td>{students.Department}</td>
                                                                <td>{students.Email}</td>
                                                                <td>{students.MobileNumber}</td>
                                                                <td>

                                                                    <i class="fa fa-pencil-square-o" aria-hidden="true" onClick={() => this.editStudents(students)}>Edit</i>

                                                                </td>
                                                                <td>

                                                                    <i class="fa fa-trash" aria-hidden="true" onClick={() => this.deleteStudents(students._id)}>Delete</i>

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
