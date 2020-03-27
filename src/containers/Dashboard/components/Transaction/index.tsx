import React from "react";

import dayjs from "dayjs";

import "./index.scss";

const Transaction = ({ transaction }) => {
  return (
    <>
      <div className="specific_transaction">
        {transaction && (
          <>
            <div>
              <p>
                status: <span>{transaction.status}</span>
              </p>
              <p>
                amount: <span>{transaction.amount}</span>
              </p>
              <p>narration:</p>
              <p className="span">{transaction.narration}</p>
              <p>
                recipient:{" "}
                <span>
                  {transaction.recipient.first_name}{" "}
                  {transaction.recipient.last_name}
                </span>
              </p>
              <p>
                recipient-email: <span>{transaction.recipient.email}</span>
              </p>
              <p>
                recipient-phone_number:{" "}
                <span>{transaction.recipient.phone_number}</span>
              </p>
            </div>
            <div>
              <p>
                Date:{" "}
                <span>{dayjs(transaction.createdAt).format("D MMM YYYY")}</span>
              </p>
              <p>
                Time:{" "}
                <span>{dayjs(transaction.createdAt).format("h:mm:ss a")}</span>
              </p>
              <div>
                <h3>Deposits</h3>
                <p>
                  Processor: <span>{transaction.processor}</span>
                </p>
                <p>
                  Processor_reference:{" "}
                  <span>{transaction.processor_reference}</span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Transaction;
