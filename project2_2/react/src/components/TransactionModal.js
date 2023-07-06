import React from 'react'

const TransactionModal = ({tx,txs,txind}) => {
    return (
        <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Your Transaction</h1>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <span className="fw-medium">
                                Transactionhash :
                            </span>

                            <div style={{ wordWrap: "break-word", fontSize: "14px" }}>
                                {tx.hash}
                            </div>
                        </div>
                        <div className="mb-3">
                            <span className="fw-medium">
                                from :
                            </span>
                            <div style={{ wordWrap: "break-word", fontSize: "14px" }}>
                                {tx.from}
                            </div>
                        </div>
                        <div className="mb-3">
                            <span className="fw-medium">
                                To :
                            </span>
                            <div style={{ wordWrap: "break-word", fontSize: "14px" }}>
                                {tx.to}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <div className="mb-3">
                                <span className="fw-medium">
                                    Gas Used:
                                </span>
                                <div>
                                    {tx.gas}
                                </div>
                            </div>
                            <div className="mb-3">
                                <span className="fw-medium" >
                                    Ethers Consumed :
                                </span>
                                <div className="text-end">
                                    {tx.gas * tx.gasPrice / Math.pow(10, 18)}ETH
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <div className="mb-3">
                                <span className="fw-medium">
                                    Transaction No. :
                                </span>
                                <div>
                                    {tx.nonce}
                                </div>
                            </div>
                            <div className="mb-3">
                                <span className="fw-medium">
                                    Block No. :
                                </span>
                                <div className="text-end">
                                    {tx.blockNumber}
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="fw-medium">Transaction done on  :</span> {new Date(txs[txind].date).toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionModal
