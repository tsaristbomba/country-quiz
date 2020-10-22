import React, { useEffect, useState } from "react"
import _ from "lodash"

import "./Home.css"

import Flag from "./Flag"
import Capital from "./Capital"
import Answers from "./Answers"

import loadIcon from "../img/circles-menu-1.gif"

const Home = () => {
    const [capital, setCapital] = useState(null)
    const [country, setCountry] = useState(null)
    const [countryFlag, setFlag] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isFlag, setIsFlag] = useState(true)
    const [count, setCount] = useState(0)
    const [times, setTimes] = useState(0)
    const [finish, setFinish] = useState(false)

    useEffect(() => {
        setup()
        
        if (randomize() > 250) {
            setIsFlag(true)
        } else {
            setIsFlag(false)
        }
    }, [])

    useEffect(() => {
        if (capital !== null) { 
            if(capital.status === 404) {
                setup()
            }
        }
    }, [capital])

    useEffect(() => {
        times === 5 ? setFinish(true) : setFinish(false)
    }, [times])

    function randomize() {
        return _.random(1, 500)
    }

    async function fetchCountry() {
        let res = []
        try {
            const response = await fetch(`https://restcountries.eu/rest/v2/callingcode/${randomize()}`)
            const json = await response.json()
            
            res = await json
        } catch (err) {
            //console.log(err)
        }

        return res
    }

    async function setup() {
        setLoading(true)

        let fetchData = await fetchCountry()

        do {
            fetchData = await fetchCountry()
        } while (fetchData.status);

        if (!fetchData.status) {
            setFlag(fetchData[0].flag)

            setCapital(fetchData[0].capital)
            
            setCountry(fetchData[0].name)

            setLoading(false)
        }
    }

    //console.log(country)

    return (
        <div>
            {!finish && 
                <div>
                    {isFlag ? 
                        <Flag 
                        countryFlag={countryFlag} 
                        loading={loading} 
                        loadIcon={loadIcon} /> :
                        <Capital 
                        capital={capital} 
                        loading={loading} 
                        loadIcon={loadIcon} />
                    }
                </div>
            }

            {!loading && !finish && <Answers 
            country={country} 
            setCount={setCount} 
            count={count}
            setup={setup}
            setTimes={setTimes}
            times={times} />}
            {finish && <div>
                You got {count} Points!
                </div>}
        </div>
    )
}

export default Home
