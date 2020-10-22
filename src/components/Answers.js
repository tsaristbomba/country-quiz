import React, { useEffect, useState } from "react"

// Bootstrap
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"

import _ from "lodash"

import regions from "../data/regions.json"

import "./Answers.css"

const Answers = ({ country, setCount, count, setup, times, setTimes }) => {
    const [data, setData] = useState([])
    const [isDisabled, setDisabled] = useState(false)

    /*eslint-disable */
    useEffect(() => {
        setupAnswers()
    }, [country])
    /*eslint-enable */

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

            let newArr = _.shuffle(arr)

            setData(newArr)
        }
    }

    function handleClick(e) {
        if(e.target.value === country) {
            setCount(count + 1)
            document.getElementById(country).className = "btn btn-success btn-block"
        } else {
            document.getElementById(e.target.value).className = "btn btn-danger btn-block"
            document.getElementById(country).className = "btn btn-success btn-block"
        }
        setDisabled(true)
    }

    console.log(count)

    return (
        <div>
                <ListGroup as="ul">
                    {data.length !== 0 && data.map((name, k) => 
                        <ListGroup.Item as="li" key={k}>
                            <Button 
                            block
                            variant="secondary"
                            id={name} 
                            onClick={(e) => handleClick(e)} 
                            value={name} 
                            disabled={isDisabled}>{name}</Button>
                        </ListGroup.Item>
                    )}
                </ListGroup>
                <button className="next" disabled={!isDisabled} onClick={() => {
                    setup()
                    setDisabled(false)
                    setTimes(times + 1)
                }}>Next</button>
        </div>
    )
}

export default Answers
