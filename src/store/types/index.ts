export interface Wallet {
    id: any;
    available_balance: number;
    ledger_balance: number;
    client_id: any
}

export interface Transaction {
    id: any;
    transaction_type: string,
    processor: string,
    amount: number,
    processor_reference: string,
    reference: string,
    status: String,
    recipient: any
}
