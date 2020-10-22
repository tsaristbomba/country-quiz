import React from "react"

import questions from "../data/questions.json"

const Capital = ({ capital, loading, loadIcon }) => {

    return (
        <div>
            <h4>
                {
                    !loading && capital 
                } 
                {
                    !loading ? questions[0] : <img style={{width: '30px'}} src={loadIcon} alt="loading" />
                }
            </h4>
        </div>
    )
}

export default Capital
