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
                Status: <span>{transaction.status}</span>
              </p>
            </div>
            <div>
              <p>
                Amount: <span>{transaction.amount}</span>
              </p>
            </div>
            <div>
              <p>
                Reference: <span>{transaction.reference}</span>
              </p>
            </div>
            <div>
              <p>
                Recipient:{" "}
                <span>
                  {transaction.recipient.first_name}{" "}
                  {transaction.recipient.last_name}
                </span>
              </p>
            </div>
            <div>
              <p>
                Recipient-email: <span>{transaction.recipient.email}</span>
              </p>
            </div>
            <div>
              <p>
                Recipient-phone_number:{" "}
                <span>{transaction.recipient.phone_number}</span>
              </p>
            </div>

            <div>
              <p>
                Transaction-type: <span>{transaction.transaction_type}</span>
              </p>
            </div>

            <div>
              <p>
                Date:{" "}
                <span>{dayjs(transaction.createdAt).format("D MMM YYYY")}</span>{" "}
                <span>{dayjs(transaction.createdAt).format("h:mm:ss a")}</span>
              </p>
            </div>
            {transaction.processor && (
              <>
                <div>
                  <p>
                    Processor: <span>{transaction.processor || "korapay"}</span>
                  </p>
                </div>
                <div>
                  <p>
                    Processor_reference:{" "}
                    <span>
                      {transaction.processor_reference || "kp-uyeueieiei"}
                    </span>
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Transaction;
