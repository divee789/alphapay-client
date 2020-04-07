import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';

import { filter_client_transactions } from '../../../../store/actions';
import Button from '../../../../components/Button';

import './index.scss';

const DatePickerField = ({ name, value, onChange }) => {
  return (
    <DatePicker
      selected={value || null}
      onChange={(val) => {
        onChange(name, val);
      }}
    />
  );
};

const SearchForm = () => {
  const dispatch = useDispatch();

  const [feedback, setFeedback] = useState('');

  const { mode } = useSelector((state: any) => state.ui);

  const styles = {
    backgroundColor: mode === 'dark' ? 'black' : '#eff3fb',
  };

  const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
    setFeedback('');
    console.log(values);

    let data = {
      ...values,
      date: {
        from: values.from,
        to: values.to.setDate(values.to.getDate() + 1),
      },
    };

    if (values.from !== '' && values.from !== null) {
      if (new Date(values.to) < new Date(values.from)) {
        setFeedback('Please put valid date ranges');
        return;
      }
      delete data['from'];
      delete data['to'];
    }

    for (var property in values) {
      if (typeof values[property] === 'string' && values[property].length === 0) {
        console.log('empty', data, property);
        delete data[property];
        if (property === 'from' || property === 'to') {
          delete data['date'];
        }
      }
    }

    await dispatch(filter_client_transactions(data));
    setSubmitting(false);
  };

  const searchValidationSchema = Yup.object().shape({
    status: Yup.string(),
    from: Yup.date(),
    to: Yup.date(),
    amount: Yup.number(),
    reference: Yup.string().min(11, 'Invalid transaction reference'),
    type: Yup.string(),
  });
  return (
    <section className="search-section" style={styles}>
      <div>{feedback}</div>
      <Formik
        validationSchema={searchValidationSchema}
        onSubmit={handleSubmit}
        initialValues={{
          status: '',
          amount: '',
          reference: '',
          transaction_type: '',
          from: new Date('1/1/2019'),
          to: new Date(),
        }}
      >
        {(formProps) => {
          return (
            <>
              <Form className="search_form">
                <div className="option">
                  <div className="status">
                    <div
                      className="status_option success"
                      onClick={() => {
                        formProps.setFieldValue('status', 'success');
                      }}
                    >
                      <label>
                        <input
                          type="radio"
                          name="status"
                          value="success"
                          checked={formProps.values.status === 'success'}
                          onChange={() => formProps.setFieldValue('status', 'success')}
                        />
                        Successful
                      </label>
                    </div>
                    <div
                      className="status_option failure"
                      onClick={() => {
                        formProps.setFieldValue('status', 'failed');
                      }}
                    >
                      <label>
                        <input
                          type="radio"
                          name="test"
                          value="failed"
                          checked={formProps.values.status === 'failed'}
                          onChange={() => formProps.setFieldValue('status', 'failed')}
                        />
                        Failed
                      </label>
                    </div>
                    <div
                      className="status_option both"
                      onClick={() => {
                        formProps.setFieldValue('status', '');
                      }}
                    >
                      <label>
                        <input
                          type="radio"
                          name="test"
                          value="failed"
                          checked={formProps.values.status === ''}
                          onChange={() => formProps.setFieldValue('status', '')}
                        />
                        Both
                      </label>
                    </div>
                  </div>
                </div>
                <div className="option">
                  <div className="dual">
                    <span>Amount</span>
                    <Field type="number" name="amount" placeholder="0.00" />
                    <ErrorMessage name="amount" render={(msg) => <div className="error">{msg}</div>} />
                  </div>
                  <div>
                    <span>Type</span>
                    <select
                      name="transaction_type"
                      onChange={formProps.handleChange}
                      value={formProps.values ? formProps.values.type : 'Transaction type'}
                    >
                      <option value="" label="All" />
                      <option value="Internal" label="Internal" />
                      <option value="deposit" label="Deposit" />
                    </select>
                    <ErrorMessage name="transaction_type" render={(msg) => <div className="error">{msg}</div>} />
                  </div>
                </div>
                <div className="option">
                  <div>Transaction period</div>
                  <div>
                    from:
                    <DatePickerField name="from" value={formProps.values.from} onChange={formProps.setFieldValue} />
                  </div>
                  <div>
                    to:
                    <DatePickerField name="to" value={formProps.values.to} onChange={formProps.setFieldValue} />
                  </div>
                </div>
                <div className="option">
                  <div className="dual">
                    <span>Reference</span>
                    <Field type="text" name="reference" placeholder="Transaction reference" />
                    <ErrorMessage name="reference" render={(msg) => <div className="error">{msg}</div>} />
                  </div>
                  <div className="btn_c">
                    <Button
                      dashboard
                      type="submit"
                      style={{
                        color: mode === 'dark' ? 'rgb(0, 201, 182)' : 'inherit',
                      }}
                    >
                      Search
                    </Button>
                    <Button
                      dashboard
                      type="button"
                      style={{
                        color: mode === 'dark' ? 'rgb(0, 201, 182)' : 'inherit',
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        formProps.resetForm();
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </section>
  );
};

export default SearchForm;
