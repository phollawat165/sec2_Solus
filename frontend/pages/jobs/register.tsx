import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Row, Form } from 'react-bootstrap';
import DefaultLayout from '../../layouts/Default';
import Image from 'react-bootstrap/Image';
import styles from './job_detail.module.scss';
import axios from 'axios';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import Select from 'react-select';

export const RegisterJobAnnouncement = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [jobTag, setJobTag] = useState( Array<String>() );
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [publish, setPublish] = useState(false);
  const [wage, setWage] = useState(null);
  const [amount, setAmount] = useState(null);
  const [errors, setError] = useState({title:null,description:null,jobTag:null,company:null,address:null,publish:null,wage:null,amount:null});
  const [tagMessage , setTagMessage] = useState(null)
  const [successMessage, setMessage] = useState(null)

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'cookie', label: 'Cookies' },
    { value: 'trash', label: 'Trash' },
  ];
  const choices = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  const createJobDetailsToServer = () => {
      const temp_errors = {}

      if(!title.length){
        temp_errors.title = "The title is required";
        console.log(temp_errors.title);
      }
      if(!description.length){
        temp_errors.description = "The description is required"
      }
      if(!jobTag.length){
        temp_errors.jobTag = "The tags are required to be at least 1"
      }
      if(!company.length){
        temp_errors.company = "The company is required"
      }
      if(!address.length){
        temp_errors.address = "The address is required"
      }
      if(wage<=0){
        temp_errors.wage = "The salary is required"
      }
      if(amount<=0){
        temp_errors.amount = "The amount is required"
      }
      setError(temp_errors);
      if(Object.keys(temp_errors).length){
        return
      }
      const payload = {
          title: title,
          description: description,
          jobTag: jobTag,
          company: company,
          location: location,
          publish: publish,
          wage: wage,
          amount: amount
      }
      axios.post('http://localhost:8000/api/users',payload)
        .then(function (response){
            if(response.status == 201) {
                setMessage('Registration successful. Redirecting to job page..');
                const router = useRouter();
                router.push("/jobs");
            } else{
                console.log("There is an Error")
            }
        })
      
  }
  
  return (
    <DefaultLayout>
      <Head>
        <title>Creating Job Announcements</title>
      </Head>

      <Container className="my-4">
        <Row>
          <Col md={{ span: 5, offset: 1 }} >
            <Row>
              <Image
                src="/images/user/User.svg"
                className="d-block w-30 mx-auto"
                rounded
              />
            </Row>
            <Row className="d-flex justify-content-center">
            <button type="button" className="my-2 btn btn-primary">
                Add Picture
              </button>
            </Row>
            <Row>
                <Form>
                    <Form.Group>
                    <Form.Label className={styles.label}>Title</Form.Label>
                    <Form.Control
                        id="title"
                        className="form-control"
                        type="text"
                        placeholder="title"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label className={styles.label}>Description</Form.Label>
                    <Form.Control
                        id="description"
                        className="form-control"
                        type="text"
                        placeholder="description"
                        onChange={(e) => setDescription(e.target.value)}
                        isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.title}
                        </Form.Control.Feedback>
                      </Form.Group>
                </Form>
            </Row>

          </Col>
          <Col md={{ span: 5, offset: 1 }} >
            <Row>
              <Form>
                <label className={styles.label}>Tag</label>
                <Select
                    isMulti
                    value={jobTag}
                    name="colors"
                    options={
                        jobTag.length >=3 ? jobTag : options
                    }
                    isSearchable="true"
                    maxMenuHeight={200}
                    noOptionsMessage={()=>"You could only assign 3 tags to Job Announcement"}
                    className="basic-multi-select mb-3"
                    classNamePrefix="select"
                    onChange={ (e) => setJobTag(e)}
                    />
                <small className="text-danger">{errors.jobTag}</small>
                <Form.Group>
                  <Form.Label className={styles.label}>Company</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="text"
                    placeholder="company"
                    onChange={(e) => setCompany(e.target.value)}
                    isInvalid={!!errors.company}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.company}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label className={styles.label}>Address</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="text"
                    placeholder="address"
                    onChange={(e) => setAddress(e.target.value)}
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Check type="checkbox" label="Publish" onClick={()=>setPublish(!publish)}/>
                </Form.Group>
                <Form.Group>
                  <Form.Label className={styles.label}>Salary per month</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="salary"
                    onChange={(e) => {
                      setWage(e.target.value);
                    }}
                    step={10}
                    isInvalid={!!errors.wage}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.wage}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label className={styles.label}>
                    Amount of people required
                  </Form.Label>
                  <Form.Control
                    placeholder="amount"
                    type="number"
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    isInvalid={!!errors.wage}
                  />
                  <Form.Control.Feedback type="invalid">
                      {errors.wage}
                    </Form.Control.Feedback>
                </Form.Group>
              </Form>
            </Row>
          </Col>
          <Col>
            <Row className="text-center">
                <Col className="my-2">
                <button type="button" className="mr-5 btn btn-primary" onClick={createJobDetailsToServer}>
                  Create
                </button>
                <button type="button" className="ml-5 btn btn-primary">
                  Cancel
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default RegisterJobAnnouncement;
