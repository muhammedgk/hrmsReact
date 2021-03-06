import React, { useEffect, useState } from 'react'
import CityService from '../services/cityService'
import JobService from '../services/jobService'
import WorktimeService from '../services/worktime'
import WorkplaceService from '../services/workplace'
import { Formik } from 'formik'
import * as Yup from "yup";
import { Button,Card, Form } from "semantic-ui-react";


export default function AddResumes1() {


  const [cities, setCities] = useState([])
  const [jobs, setJobs] = useState([])
  const [workplaces, setWorkplaces] = useState([])
  const [worktimes, setWorktimes] = useState([])

  useEffect(() => {
    let cityService = new CityService()
    cityService.getCity().then(results => setCities(results.data.data))
  }, [])

  useEffect(() => {
    let workplaceService = new WorkplaceService()
    workplaceService.getWorkplace().then(results => setWorkplaces(results.data.data))
  }, [])

  useEffect(() => {
    let worktimeService = new WorktimeService()
    worktimeService.getWorktime().then(results => setWorktimes(results.data.data))
  }, [])

  useEffect(() => {
    let jobService = new JobService()
    jobService.getJob().then(results => setJobs(results.data.data))
  }, [])

  const cityOptions = cities.map((city) => ({
    key: city.id,
    text: city.cityName,
    value: city.id,
  }));

  const jobOptions = jobs.map((job) => ({
    key: job.id,
    text: job.name,
    value: job.id,
  }));

  const worktimeOptions = worktimes.map((worktime) => ({
    key: worktime.id,
    text: worktime.name,
    value: worktime.id,
  }));

  const workplaceOptions = workplaces.map((workplace) => ({
    key: workplace.id,
    text: workplace.name,
    value: workplace.id,
  }));



  return (
    


    <div >
      <Formik
      onSubmit = {(values) => {
        console.log(values)
    }}
        initialValues={{
          cityId: "",
          jobId: "",
          workplaceId: "",
          worktimeId: "",
          minSalary: "",
          maxSalary: "",

          agree: false,
          favouriteColor: ""
        }}
        validationSchema={Yup.object({

          application_deadline: Yup.date().nullable().required("Bu alan??n doldurulmas?? zorunludur"),
          jobId: Yup.string().required("Bu alan??n doldurulmas?? zorunludur"),
          worktimeId: Yup.string().required("Bu alan??n doldurulmas?? zorunludur"),
          workplaceId: Yup.string().required("Bu alan??n doldurulmas?? zorunludur"),
          openPositions: Yup.string().required("Posizyon say??s?? zorunludur").min(1, "Posizyon say??s?? 1 den k??????k olamaz"),
          cityId: Yup.string().required("Bu alan??n doldurulmas?? zorunludur"),
          minSalary: Yup.number().min(0, "0 Dan az olamaz").required("Bu alan zorunludur"),
          maxSalary: Yup.number().min(0, "0 Dan az olamaz").required("Bu alan zorunludur")
        })}

      >
        {
          ({ values, errors, onBlur, fieldName, setFieldValue, handleChange, handleSubmit, handleReset, dirty, isSubmitting }) => (




            <Form>
              <Card.Content header='???? ilan?? Ekle' />
              <Form.Group widths='equal'>
                <Form.Select
                  id="cityId"
                  onChange={(fieldName, data) =>
                    setFieldValue("cityId", data.value)
                  }
                  onBlur={onBlur}
                  value={values.cityId}
                  options={cityOptions}
                  label="??ehir"
                  placeholder="??ehir Se??iniz"
                  search
                  selection
                  touched={values.cityId}
                ></Form.Select>


                <Form.Select
                  id="jobId"
                  onChange={(fieldName, data) =>
                    setFieldValue("jobId", data.value)
                  }
                  onBlur={onBlur}
                  value={values.jobId}
                  options={jobOptions}
                  label="Meslek"
                  placeholder="Meslek Se??iniz"
                  search
                  selection
                  touched={values.jobId}
                ></Form.Select>
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Select
                  id="worktimeId"
                  onChange={(fieldName, data) =>
                    setFieldValue("worktimeId", data.value)
                  }
                  onBlur={onBlur}
                  value={values.worktimeId}
                  options={worktimeOptions}
                  label="??al????ma Zaman??"
                  placeholder=""
                  search
                  selection
                  touched={values.worktimeId}
                ></Form.Select>

                <Form.Select
                  id="workplaceId"
                  onChange={(fieldName, data) =>
                    setFieldValue("workplaceId", data.value)
                  }
                  onBlur={onBlur}
                  value={values.workplaceId}
                  options={workplaceOptions}
                  label="??al????ma Yeri"
                  placeholder=""
                  search
                  selection
                  touched={values.workplaceId}
                ></Form.Select>
              </Form.Group>



                
              <Form.Group widths='equal'>
                
                <label htmlFor="number"></label>
                <input
                  id="date"
                  type="number"
                  placeholder=""
                  label="A????k Pozisyon Say??s??"
                  value={values.open}
                  onChange={handleChange}
                />

                
                <label htmlFor="date">Son Ba??vuru Tarihi</label>
                <input
                  id="lastdate"
                  type="date"
                  placeholder=""
                  value={values.lastdate}
                  onChange={handleChange}

                /></Form.Group>

              <Form.Group widths='equal'>
                <label htmlFor="number" className="topMargin">Min Maa??</label>
                <input
                  id="minSalary"
                  type="number"
                  placeholder=""
                  value={values.minSalary}
                  onChange={handleChange}
                />
                <label htmlFor="number" >Max Maa??</label>
                <input

                  id="maxSalary"
                  type="number"
                  placeholder=""
                  value={values.maxSalary}
                  onChange={handleChange}
                /></Form.Group>
              <Button
                content="Ekle"
                labelPosition="right"
                
                positive
                type="onSubmit"
                style={{ marginLeft: "20px" }}
              />

            </Form>




          )
        }


      </Formik>
    </div>
    




















  )
}
