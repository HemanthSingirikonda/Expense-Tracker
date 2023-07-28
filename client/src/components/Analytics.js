import { Progress } from 'antd';
import React from 'react'

const Analytics = ({allTransactions}) => {
    const categories=['salary','tip','project','food','movie','bills','medical','tax','fee'];


    const totalNofTransactions=allTransactions.length;
    const allIncomeTransactions=allTransactions.filter(transaction => transaction.type==='income')
    const allExpenseTransactions=allTransactions.filter(transaction => transaction.type==='expense')
    const totalNofIncomeTransactions=allIncomeTransactions.length;
    const totalNofExpenseTransactions=allExpenseTransactions.length;
    const incomeTransactionsPercent=(totalNofIncomeTransactions/totalNofTransactions)*100
    const expenseTransactionsPerent=(totalNofExpenseTransactions/totalNofTransactions)*100;

    const totalTurnover=allTransactions.reduce((acc,transaction)=> acc+transaction.amount,0);
    const totalIncomeTurnover=allTransactions.filter(transaction=>transaction.type==='income').reduce((acc,transaction)=>acc+transaction.amount,0);
    const totalExpenseTurnover=allTransactions.filter(transaction=>transaction.type==='expense').reduce((acc,transaction)=>acc+transaction.amount,0);
    const totalIncomeTurnoverPercent=(totalIncomeTurnover/totalTurnover)*100;
    const totalExpenseTurnoverPercent=(totalExpenseTurnover/totalTurnover)*100; 
 
 
    return (
    <>
        <div className='row m-3'>
           <div className='col-md-4'>
                <div className='card'>
                    <div className='card-header'>
                        Total No.of transactions: {totalNofTransactions}
                    </div>
                    <div className='card-body'>
                        <h6 className='text-success'>Income: {totalNofIncomeTransactions}</h6>
                        <h6 className='text-danger'>Expense: {totalNofExpenseTransactions}</h6>
                        <div className='mt-4 mb-3'>
                            <Progress
                                type='circle'
                                strokeColor={'green'}
                                className='mx-4'
                                percent={incomeTransactionsPercent.toFixed(0)}
                            />
                            <Progress
                                type='circle'
                                strokeColor={'red'}
                                className='mx-4'
                                percent={expenseTransactionsPerent.toFixed(0)}
                            />
                        </div>
                    </div>
                </div>
           </div>
           <div className='col-md-4'>
                <div className='card'>
                    <div className='card-header'>
                        Total Turnover: {totalTurnover}
                    </div>
                    <div className='card-body'>
                        <h6 className='text-success'>Total Income: {totalIncomeTurnover}</h6>
                        <h6 className='text-danger'>Total Expense: {totalExpenseTurnover}</h6>
                        <div className='mt-4 mb-3'>
                            <Progress
                                type='circle'
                                strokeColor={'green'}
                                className='mx-4'
                                percent={totalIncomeTurnoverPercent.toFixed(0)}
                            />
                            <Progress
                                type='circle'
                                strokeColor={'red'}
                                className='mx-4'
                                percent={totalExpenseTurnoverPercent.toFixed(0)}
                            />
                        </div>
                    </div>
                </div>
           </div>
        </div>
        <div className='row mt-3'>
            <div className='col-md-4'>
                <h5>Categorywise Income</h5>
                {
                    categories.map((category)=>{
                        const amount=allTransactions
                        .filter(transaction=>transaction.type==='income' && transaction.category===category)
                        .reduce((acc,transaction)=>acc+transaction.amount,0);
                        return (
                            amount>0 && (
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6>{category}</h6>
                                        <Progress
                                            percent={((amount/totalIncomeTurnover)*100).toFixed(0)}
                                        />
                                    </div>
                                </div>
                            )
                        )
                        
                    })
                }
            </div>
            <div className='col-md-4'>
                <h5>Categorywise Expense</h5>
                {
                    categories.map((category)=>{
                        const amount=allTransactions
                        .filter(transaction=>transaction.type==='expense' && transaction.category===category)
                        .reduce((acc,transaction)=>acc+transaction.amount,0);
                        return (
                            amount>0 && (
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6>{category}</h6>
                                        <Progress
                                            percent={((amount/totalExpenseTurnover)*100).toFixed(0)}
                                        />
                                    </div>
                                </div>
                            )
                        )
                        
                    })
                }
            </div>
        </div>
    </>
  )
}

export default Analytics