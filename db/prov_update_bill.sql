UPDATE billing 
SET paid = $2,
    amount = $3,
    description = $4
WHERE billing.billid = $1;