import React, { useEffect, useState } from 'react'
import CityService from '../services/cityService'
import JobService from '../services/jobService'
import WorktimeService from '../services/worktime'
import WorkplaceService from '../services/workplace'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import { Button, Card, Form, FormField, Label } from "semantic-ui-react";

export default function AddResumes() {
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

    const initialValues = {
        cityId: "",
        jobId: "",
        workplaceId: "",
        worktimeId: "",
        minSalary: "",
        maxSalary: "",
        openPosition: "",
        applicationDeadline: "",
        jobDescription: "",
    }
    const schema =
        Yup.object({
            cityId: Yup.string().required("L??tfen ??ehir Se??iniz"),
            jobId: Yup.string().required("L??tfen Meslek Se??iniz"),
            workplaceId: Yup.string().required("L??tfen ??al????ma Yerinizi Se??iniz"),
            worktimeId: Yup.string().required("L??tfen ??al????ma Zaman??n??z?? Se??ininiz"),
            openPosition: Yup.number().required("L??tfen A????k Pozisyon Say??s??n?? Giriniz"),
            applicationDeadline: Yup.date().required("L??tfen Son Tarihi Giriniz"),
        })

    return (
        <div>
            <Card fluid>
                <Card.Content header='???? ??lan?? Ekle' />
                <Card.Content>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={schema}

                        onSubmit={(values) => {
                            console.log(values)
                        }}>

                        {
                            ({ handleSubmit }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group widths='equal'>
                                        <Form.Select
                                            id="jobId"
                                            name='jobId'
                                            options={jobOptions}
                                            label="Meslek"
                                            placeholder="Meslek Se??iniz"
                                            search
                                            selection
                                        ></Form.Select>
                                        
                                        <Form.Select
                                            id="cityId"
                                            name='cityId'
                                            options={cityOptions}
                                            label="??ehir"
                                            placeholder="??ehir Se??iniz"
                                            search
                                            selection
                                        ></Form.Select>
                                    </Form.Group>
                                    <Form.Group widths="equal">
                                        <Form.Select
                                            id="worktimeId"
                                            name='worktimeId'
                                            options={worktimeOptions}
                                            label="??al????ma Zaman??"
                                            placeholder="??al????ma Yerini Se??iniz"
                                            search
                                            selection
                                        ></Form.Select>
                                        <Form.Select
                                            id="workplaceId"
                                            name='workplaceId'
                                            options={workplaceOptions}
                                            label="??al????ma Yeri"
                                            placeholder="??al????ma Yerini Se??iniz"
                                            search
                                            selection
                                        ></Form.Select>
                                    </Form.Group>
                                    <Form.Group widths='equal'>

                                        <FormField>
                                            <label>A????k Pozisyon Say??s??</label>
                                            <Field
                                                id="openPosition"
                                                name="openPosition"
                                                placeholder="A????k Pozisyon Say??s??n?? Giriniz"
                                                type='number'
                                            />
                                            <ErrorMessage name='openPosition' render={error =>
                                                <Label pointing basic color='red' content={error}></Label>}></ErrorMessage>
                                        </FormField>
                                        <FormField>
                                            <label>Son Ba??vuru Tarihi</label>
                                            <Field
                                                id="applicationDeadline"
                                                name="applicationDeadline"
                                                placeholder="Son Ba??vuru Tarihini Giriniz"
                                                type='date'
                                            />
                                        </FormField>
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <FormField>

                                            <label >Minumum Maa??</label>
                                            <Field
                                                id="minSalary"
                                                name="minSalary"
                                                positive='true'
                                                placeholder="Minumum Maa???? Giriniz"
                                                type='number'
                                            />
                                        </FormField>
                                        <FormField>
                                            <label >Maximum Maa??</label>
                                            <Field
                                                id="maxSalary"
                                                name="maxSalary"
                                                placeholder="Maximum Maa???? Giriniz"
                                                type='number'
                                            />
                                        </FormField></Form.Group>
                                    <FormField>
                                        <label >A????klama</label>
                                        <Field
                                            id="jobDescription"
                                            name="jobDescription"
                                            placeholder="A????klama Giriniz"
                                            type='text'
                                        />
                                    </FormField>

                                    <Button content="Ekle"
                                        labelPosition="right"
                                        icon='add'
                                        positive
                                        type="submit"
                                        style={{ marginLeft: "20px" }} />
                                </Form>
                        )}
                    </Formik></Card.Content>
            </Card>
        </div>
    )
}
