import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const StatusPage = () => {

    const { status, id, payment_id } = useParams()
    const navigate = useNavigate()

    return (
        <>
            <div className="h-screen flex items-center justify-center flex-col">
                <div className="w-1/2 shadow rounded-md py-5 flex items-center justify-center flex-col gap-y-4">
                    <h1 className='text-4xl text-center'>Status :{status}  </h1>
                    <h1 className='text-4xl text-center'>Id : {id} </h1>
                    <h1 className='text-4xl text-center'>Payment Id : {payment_id} </h1>
                    <button onClick={() => navigate(-1)} className="px-12 py-2 bg-black text-white">Back</button>
                    <button onClick={() => navigate('/')} className="px-12 py-2 bg-black text-white">Home</button>
                </div>
            </div>
        </>
    )
}

export default StatusPage
