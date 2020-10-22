import React, { useEffect, useState } from "react"

import _ from "lodash"

import regions from "../data/regions.json"

const Answers = ({ country, setCount, count, setup, times, setTimes }) => {
    const [data, setData] = useState([])
    const [isDisabled, setDisabled] = useState(false)

    useEffect(() => {
        setupAnswers()
    }, [country])

    function region() {
        return regions[_.random(0, regions.length - 1)]
    }

    function randomCountry(data) {
        return data[_.random(0, data.length - 1)].name
    }

    async function fetchCountry() {
        let res = []
        try {
            const response = await fetch(`https://restcountries.eu/rest/v2/region/${region()}`)
            const json = await response.json()
            
            res = await json
        } catch (err) {
            console.log(err)
        }

        return res
    }

    async function setupAnswers() {
        let fetchData = await fetchCountry()

        let arr = []

        do {
            arr.push(randomCountry(fetchData))
        } while (arr.length < 3);

        if(country !== null) {
            arr.push(country)

            _.shuffle(arr)

            setData(arr)
        }
    }

    function handleClick(e) {
        if(e.target.value === country) {
            setCount(count + 1)
        }
        setDisabled(true)
    }

    console.log(count)

    return (
        <div>
            <div>
                <ul>
                    {data.length !== 0 && data.map((name, k) => 
                        <li key={k}><button onClick={(e) => handleClick(e)} value={name} disabled={isDisabled}>{name}</button></li>
                    )}
                </ul>
                <button disabled={!isDisabled} onClick={() => {
                    setup()
                    setDisabled(false)
                    setTimes(times + 1)
                }}>Next</button>
            </div>
        </div>
    )
}

export default Answers
