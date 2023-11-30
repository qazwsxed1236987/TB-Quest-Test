import '../css/App.css';
import Frame from '../img/Frame.png'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import city from '../data/data.json'
import Select from '../components/search-input'

import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


function Site() {
    //data
    const [data, setData] = useState([])
    //fliter one data
    const [fliterdata, setFliterData] = useState([])
    //fliter two data
    const [nowdata, setNowData] = useState([])
    // option list
    const [option, setOption] = useState([])
    // option text
    const [optiontext, setOptionText] = useState('')
    // option select
    const [optionselect, setOptionSelect] = useState('')
    // All sna list
    const [snaAllOption, setSnaAllOption] = useState([])
    // fliter sna list
    const [snaOption, setSnaOption] = useState([])
    // search text
    const [searchtext, setSearchText] = useState('')
    // search select
    const [searchselect, setSearchSelect] = useState('')
    //checkbox check obj
    const [check, setCheck] = useState([{}])
    //checkBoxList 篩選過後
    const [nowcheck, setNowCheck] = useState([{}])
    //allCheck
    const [all, setAll] = useState({ name: 'all', check: true })
    //checkSize
    const [areasize, setAreaSize] = useState(4); // 初始值為1，你可以根據需要設置初始值
    // console.log(nowcheck);
    //初始取得資料
    useEffect(() => {
        getData()
        /*resize use*/
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth > 1150) {
                setAreaSize(4);
            } else {
                if (screenWidth > 1000) {
                    setAreaSize(3);
                } else {
                    if (screenWidth > 500) {
                        setAreaSize(4);
                    } else {
                        setAreaSize(3);
                    }
                }
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    useEffect(() => {
        // option use ok
        let newdata = data.filter(obj => obj.city === optionselect)
        let newcheck = check.find(obj => obj.name === optionselect)
        let filterSna = snaAllOption
        if (optionselect) {
            filterSna = snaAllOption.filter(list => newdata.some(v => list.includes(v.sna) && v.city === optionselect));
        }
        setSnaOption(filterSna)
        setSearchText('')
        setSearchSelect('')
        setFliterData(newdata)
        setNowData(newdata)
        setNowCheck(checkobj(newcheck))
        setAll({ ...all, check: true })
    }, [optionselect, optiontext, data])

    useEffect(() => {
        let newdata = data
        // check change filter
        if (nowcheck.length > 0) {
            newdata = newdata.filter(obj =>
                nowcheck.some(v => v.name === obj.sarea && v.check)
            )
        }
        // check area use
        if (!optionselect) {
            if (searchselect) {
                newdata = newdata.filter(obj => searchselect.some(v => obj.sna.includes(v)));
            }
        } else {
            // 這裡要篩選city
            newdata = newdata.filter(obj => obj.city === optionselect)
            if (searchselect) {
                newdata = newdata.filter(obj => searchselect.some(v => obj.sna.includes(v)))
            }
        }
        setNowData(newdata)
    }, [searchselect, searchtext, nowcheck])

    // getdata ok
    const getData = () => {
        const url = 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
        axios.get(url)
            .then((res) => {
                res.data.forEach(obj => {
                    obj.sna = obj.sna.substring(11)
                    obj.city = "台北市"
                });
                const area = [{ "name": "台北市", "city": [...new Set(res.data.map(v => v.sarea))] },
                {
                    "name": "新北市", "city": ["板橋區", "新莊區", "中和區", "永和區"]
                }];
                const snalist = res.data.map(v => v.sna)
                setData(res.data)
                setOption(city.data)
                setSnaAllOption(snalist)
                setSnaOption(snalist)
                setCheck(area)
                setNowCheck(checkobj(area[0].city))

            })
            .catch((err) => { console.log(err) })
    }
    //option set fun
    const handleOption = (value, setFun) => {
        setFun(value)
    }
    //change checkbox
    const togglecheck = (checkbox) => {
        // console.log(nowcheck);
        if (checkbox.name === 'all') {
            setAll({ ...checkbox, check: !checkbox.check })
            if (!checkbox.check) {
                handlenowcheck(nowcheck, true)
            } else {
                handlenowcheck(nowcheck, false)
            }
        } else {
            const checked = nowcheck.map((area) =>
                area.name === checkbox.name ? { ...area, check: !area.check } : area
            )
            setNowCheck(checked)
            // if nowcheck 全部為true all 打勾 反之 不勾
            if (checked.every(area => area.check === true)) {
                setAll({ ...all, check: true })
            } else {
                setAll({ ...all, check: false })
            }
        }
    }
    //nowcheck replace fun
    const handlenowcheck = (nowcheck, bool) => {
        setNowCheck(nowcheck.map(area => ({ ...area, check: bool })))
    }
    //clear all
    const handleclear = () => {
        setOptionText('')
        setSearchText('')
        setOptionSelect('')
    }
    //check reset
    const checkobj = (area) => {
        const checkobj = []
        if (area) {
            for (let i = 0; i < area.city.length; i++) {
                const obj = {
                    name: area.city[i],
                    check: true
                };
                checkobj.push(obj)
            }
        }
        return checkobj
    }
    //checkbox list use-------------------------
    const areaList = [];
    for (let i = 0; i < nowcheck.length; i += areasize) {
        areaList.push(nowcheck.slice(i, i + areasize));
    }
    return (<>
        <div className='site'>
            <section className="section">
                <div className="liftside">
                    <h1 className='title'>站點資訊</h1>
                    <div className="search">
                        { /*縣市選擇 color用色碼*/}
                        <Select
                            option={option}
                            text={optiontext}
                            handleFun={handleOption}
                            placeholder={'選擇縣市'}
                            setFun={setOptionText}
                            selected={setOptionSelect}
                            state={{ name: 'area', color: '#323232', icon: faSortDown }}
                        />
                        {/* 站點選擇 */}
                        <Select
                            option={snaOption}
                            text={searchtext}
                            handleFun={handleOption}
                            placeholder={'選擇站點'}
                            setFun={setSearchText}
                            selected={setSearchSelect}
                            state={{ name: 'sna', color: '#B5CC22', icon: faMagnifyingGlass }}
                        />
                    </div>
                    <div className="allcheck">
                        <div className='allcheck-box'>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={all.check}
                                    onChange={() => {
                                        togglecheck(all);
                                    }}
                                />
                                <span>全部勾選</span>
                                <div className="show-box"></div>
                            </label>

                            <button onClick={() => {
                                handleclear()
                            }}>清除
                            </button>
                        </div>

                        <div className='checkboxs'>
                            {/* checkbox list*/}
                            {areaList.map((v, i) => {
                                return (
                                    <div className="checkboxstyle" key={i}>
                                        {
                                            v.map((area, i) => {
                                                return (
                                                    <label key={area.name + toString(i)}>
                                                        <input
                                                            type="checkbox"
                                                            checked={area.check}
                                                            onChange={() => { togglecheck(area) }}
                                                            className='checkstyle'
                                                        />
                                                        <span>{area.name}</span>
                                                        <div className="show-box"></div>
                                                    </label>
                                                )
                                            })
                                        }
                                    </div >
                                )
                            })}
                        </div >
                    </div>
                </div>
                <div className="rightside">
                    <div className='imgbox'>
                        <img src={Frame} alt="LOGO"></img>
                    </div>
                </div>
            </section >
            <section className="section">
                <div className="table-box">
                    <table className="table">
                        <thead className="thead">
                            <tr>
                                <th className='td-10'>縣市</th>
                                <th className='td-10'>區域</th>
                                <th className='td-25'>站點名稱</th>
                                <th>可用車輛</th>
                                <th>可還車位</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {nowdata.map((v, i) => {
                                return (
                                    <tr key={i}>
                                        <td className='td-10'>{v.city}</td>
                                        <td className='td-10'>{v.sarea}</td>
                                        <td className="font-lift td-25">{v.sna}</td>
                                        <td className="green">{v.sbi}</td>
                                        <td className="green">{v.bemp}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div >
            </section >
        </div>
    </>
    );
}

export default Site;
