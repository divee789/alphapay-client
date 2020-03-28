import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";

import { filter_client_transactions } from "../../../../store/actions";
import theme from "../../../../components/Theme";
import Button from "../../../../components/Button";

const DatePickerField = ({ name, value, onChange }) => {
  return (
    <DatePicker
      selected={value || null}
      onChange={val => {
        onChange(name, val);
      }}
    />
  );
};

const SearchForm = () => {
  const dispatch = useDispatch();

  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (
    values: any,
    { setSubmitting, setErrors }: any
  ) => {
    setFeedback("");

    let data = {
      ...values,
      date: {
        from: values.from,
        to: values.to
      }
    };

    if (values.from !== "" && values.from !== null) {
      if (new Date(values.to) < new Date(values.from)) {
        setFeedback("Please put valid date ranges");
        return;
      }
      delete data["from"];
      delete data["to"];
    }

    for (var property in values) {
      if (
        typeof values[property] === "string" &&
        values[property].length === 0
      ) {
        console.log("empty", data, property);
        delete data[property];
        if (property === "from" || property === "to") {
          delete data["date"];
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
    reference: Yup.string().min(11, "Invalid transaction reference"),
    type: Yup.string()
  });
  return (
    <>
      <section style={theme()}>
        <div>{feedback}</div>
        <Formik
          validationSchema={searchValidationSchema}
          onSubmit={handleSubmit}
          initialValues={{
            status: "",
            amount: "",
            reference: "",
            transaction_type: "",
            from: "",
            to: ""
          }}
        >
          {formProps => {
            return (
              <>
                <Form className="search_form">
                  <div className="status">
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="success"
                        checked={formProps.values.status === "success"}
                        onChange={() =>
                          formProps.setFieldValue("status", "success")
                        }
                      />
                      Successful
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="test"
                        value="failed"
                        checked={formProps.values.status === "failed"}
                        onChange={() =>
                          formProps.setFieldValue("status", "failed")
                        }
                      />
                      Failed
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="test"
                        value="failed"
                        checked={formProps.values.status === ""}
                        onChange={() => formProps.setFieldValue("status", "")}
                      />
                      Both
                    </label>
                  </div>
                  <div className="dual">
                    <Field type="number" name="amount" placeholder="0.00" />
                    <ErrorMessage
                      name="amount"
                      render={msg => <div className="error">{msg}</div>}
                    />
                  </div>
                  <div>
                    <select
                      name="transaction_type"
                      onChange={formProps.handleChange}
                      value={
                        formProps.values
                          ? formProps.values.type
                          : "Transaction type"
                      }
                    >
                      <option value="" label="Select transaction type" />
                      <option value="Internal" label="Internal" />
                      <option value="deposit" label="Deposit" />
                    </select>
                    <ErrorMessage
                      name="type"
                      render={msg => <div className="error">{msg}</div>}
                    />
                  </div>
                  <div className="dual">
                    <Field
                      type="text"
                      name="reference"
                      placeholder="Transaction reference"
                    />
                    <ErrorMessage
                      name="reference"
                      render={msg => <div className="error">{msg}</div>}
                    />
                  </div>
                  <div>
                    from:
                    <DatePickerField
                      name="from"
                      value={formProps.values.from}
                      onChange={formProps.setFieldValue}
                    />
                  </div>
                  <div>
                    to:
                    <DatePickerField
                      name="to"
                      value={formProps.values.to}
                      onChange={formProps.setFieldValue}
                    />
                  </div>
                  <div className="btn_c">
                    <Button dashboard type="submit">
                      Search
                    </Button>
                  </div>
                </Form>
              </>
            );
          }}
        </Formik>
      </section>
    </>
  );
};

export default SearchForm;
