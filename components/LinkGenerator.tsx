import {
  Form,
  Button,
  Card,
  Stack,
  Row,
  Col,
  CloseButton
} from 'react-bootstrap';
import { Formik } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { useState } from 'react';
import { AliasButton } from './AliasButton';

const formSchema = object({
  destinationUrl: string().url().required()
});

const LinkGenerator = () => {
  const { mutate } = useSWRConfig();
  const [previousGenerated, setPreviousGenerated] = useState(null);

  return (
    <Stack gap={4}>
      <Card>
        <Card.Body>
          <Card.Title>
            <i>smol</i> Link Generator
          </Card.Title>
          <Formik
            initialValues={{ destinationUrl: '' }}
            validationSchema={formSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              toast.promise(
                axios
                  .post('/api/links', {
                    destination_url: values.destinationUrl
                  })
                  .then(res => {
                    setPreviousGenerated(res.data[0]);
                    mutate('/api/links');
                    resetForm();
                    setSubmitting(false);
                  })
                  .catch(err => {
                    console.error(err);
                    setSubmitting(false);
                  }),
                {
                  pending: 'Generating short-link...',
                  error: 'Something went wrong...',
                  success: 'Short-link has been generated!'
                }
              );
            }}
            validateOnChange={true}
            validateOnMount={true}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              setFieldTouched,
              isSubmitting,
              isValid,
              errors
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="destination_url">
                  <Form.Label>
                    Destination URL (including <code>https://</code> or{' '}
                    <code>http://</code>)
                  </Form.Label>
                  <Form.Control
                    required
                    onChange={handleChange}
                    name="destinationUrl"
                    value={values.destinationUrl}
                    type="text"
                    isInvalid={
                      values.destinationUrl.length > 0 &&
                      touched.destinationUrl &&
                      errors.destinationUrl
                        ? true
                        : false
                    }
                    onFocus={() => setFieldTouched('destinationUrl', true)}
                    isValid={touched.destinationUrl && !errors.destinationUrl}
                    placeholder="Enter URL"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.destinationUrl
                      ? errors.destinationUrl.replace(
                          'destinationUrl',
                          'Destination URL'
                        )
                      : null}
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>URL is valid!</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  Create Link
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
      {previousGenerated ? (
        <Card>
          <Card.Body>
            <Stack direction="horizontal" gap={3} className="mb-3">
              <h5 className="m-0 me-auto">
                Here&apos;s your generated <i>smol</i> link!
              </h5>
              <CloseButton
                onClick={() => {
                  setPreviousGenerated(null);
                }}
              />
            </Stack>
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>Alias</th>
                  <th>Destination URL</th>
                </tr>
              </thead>
              <tbody>
                <tr key={previousGenerated.alias}>
                  <td className="col-2">
                    <AliasButton link={previousGenerated} />
                  </td>
                  <td className="col-10 text-break">
                    {previousGenerated.destination_url}
                  </td>
                </tr>
              </tbody>
            </table>
          </Card.Body>
        </Card>
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default LinkGenerator;
