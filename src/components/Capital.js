import React from "react"

import questions from "../data/questions.json"

const Capital = ({ capital, loading, loadIcon }) => {

    return (
        <div>
            <h3>
                {
                    !loading && capital 
                } 
                {
                    !loading ? questions[0] : <img src={loadIcon} alt="loading" />
                }
            </h3>
        </div>
    )
}

export default Capital
