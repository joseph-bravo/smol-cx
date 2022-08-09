import { Form, Button, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

const formSchema = object({
  destinationUrl: string().url().required()
});

const LinkGenerator = () => {
  const { mutate } = useSWRConfig();

  return (
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
                .post('/api/links', { destination_url: values.destinationUrl })
                .then(res => {
                  console.log(res.data[0]);
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
  );
};

export default LinkGenerator;
