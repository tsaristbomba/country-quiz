import React from "react"

import questions from "../data/questions.json"

const Flag = ({ countryFlag, loading, loadIcon }) => {

    return (
        <div>
            <h4>
            {
                countryFlag !== null && !loading && <img className="flag" src={countryFlag} alt="" />
            } 
            {
                !loading ? questions[1] : <img src={loadIcon} alt="loading" />
            }
            </h4>
        </div>
    )
}

export default Flag
