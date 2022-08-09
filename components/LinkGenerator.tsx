import { Stack, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { object, string } from 'yup';

const formSchema = object({
  destinationUrl: string().url().required()
});

const LinkGenerator = () => {
  return (
    <>
      <Stack>
        <Formik
          initialValues={{ destinationUrl: '' }}
          validationSchema={formSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
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
              <Form.Group controlId="destination_url">
                <Form.Control
                  required
                  onChange={handleChange}
                  name="destinationUrl"
                  value={values.destinationUrl}
                  type="text"
                  isInvalid={
                    touched.destinationUrl && errors.destinationUrl
                      ? true
                      : false
                  }
                  onFocus={() => setFieldTouched('destinationUrl', true)}
                  isValid={touched.destinationUrl && !errors.destinationUrl}
                  placeholder="Enter destination URL"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.destinationUrl
                    ? errors.destinationUrl.replace(
                        'destinationUrl',
                        'Destination URL'
                      )
                    : null}
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Button
                className="mt-2"
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Create Link
              </Button>
            </Form>
          )}
        </Formik>
      </Stack>
    </>
  );
};

export default LinkGenerator;
