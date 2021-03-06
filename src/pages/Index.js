import React, {useState, useEffect, useCallback, useContext} from 'react'
import {useHttp} from "../hooks/http.hook"
import {Loader} from "../components/Loader"
import {GunCard} from "../components/GunCard"
import {ArrowForTopScroll} from "../components/ArrowForTopScroll"
import {AuthContext} from "../context/AuthContext";
import filter from '../static/img/filter.svg'


export const Index = () => {
    // const elasticsearch = require('elasticsearch');
    //
    // const esClient = new elasticsearch.Client({host: 'http://localhost:3000/', log: 'error'});
    const [dataskins, setDataskins] = useState([])
    const [fetching, setFetching] = useState(false)
    const [loadSkins, setLoadSkins] = useState(false)
    const [searchSkins, setSearchSkins] = useState(false)
    const [allLoading, setAllLoading] = useState(true)
    const [arrowActive, setArrowActive] = useState(false)
    const [shops, setShops] = useState([])
    const {text, setText} = useState("")
    const [form, setForm] = useState({
        page: 1,
        id_shop: 0,
        quality: 0,
        cost_start: 50,
        cost_end: 500,
        sorted_type: 1,
        raritet: 0,
        page_count: 20,
        float_start: 0,
        float: 1,
        item_type: 0,
        category: 0,
    })
    const {token, userSubscribe} = useContext(AuthContext)
    const isAuthenticated = !!token
    const {request, loading} = useHttp()


    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        };
    }, [])
    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 150) {
            setFetching(true)
        }
        if (e.target.documentElement.scrollTop > window.innerHeight) {
            setArrowActive(true)
        }
        if (e.target.documentElement.scrollTop < window.innerHeight) {
            setArrowActive(false)
        }
    }

    const searchHandler = (e) => {
        form.page = 1
        setDataskins([])
        setSearchSkins(true)
        return setLoadSkins(true);
    }

    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name]: !isNaN(event.target.value) ? Number(event.target.value) : event.target.value,
            page: 1
        })
        setTimeout(() => {
            setAllLoading(true)
            setDataskins([])
            setLoadSkins(true);
        }, 1000)
    }

    const openFilter = () => {
        const filters_place = document.getElementsByClassName("filters_place")[0];
        filters_place.classList.toggle("_active");
        document.body.classList.toggle("hidden");
    }

    // ????????????????????
    let sorted_inputs = document.getElementsByClassName("sorting_item")
    for (let i = 0; i < sorted_inputs.length; i++) {
        sorted_inputs[i].onclick = function () {

            document.getElementsByClassName("_active_sorted")[0].classList.remove("_active_sorted")
            // document.getElementsByClassName("_active_chevron")[0].classList.remove("_active_chevron")
            sorted_inputs[i].classList.add("_active_sorted")
            let chevrons = document.getElementsByClassName('chevron');

            if (i === 0 && !chevrons[i].classList.contains("_active_chevron")) {
                form.page = 1
                setDataskins([])
                setAllLoading(true)
                setForm({...form, sorted_type: 2})
                setLoadSkins(true);
            }
            if (i === 0 && chevrons[i].classList.contains("_active_chevron")) {
                form.page = 1
                setAllLoading(true)
                setDataskins([])
                setForm({...form, sorted_type: 1})
                setLoadSkins(true);
            }
            if (i === 1 && !chevrons[i].classList.contains("_active_chevron")) {
                form.page = 1
                setAllLoading(true)
                setDataskins([])
                setForm({...form, sorted_type: 4})
                setLoadSkins(true);
            }
            if (i === 1 && chevrons[i].classList.contains("_active_chevron")) {
                form.page = 1
                setAllLoading(true)
                setDataskins([])
                setForm({...form, sorted_type: 3})
                setLoadSkins(true);
            }
            if (i === 2 && !chevrons[i].classList.contains("_active_chevron")) {
                form.page = 1
                setAllLoading(true)
                setDataskins([])
                setForm({...form, sorted_type: 6})
                setLoadSkins(true);
            }
            if (i === 2 && chevrons[i].classList.contains("_active_chevron")) {
                form.page = 1
                setAllLoading(true)
                setDataskins([])
                setForm({...form, sorted_type: 5})
                setLoadSkins(true);
            }
            if (i === 3 && !chevrons[i].classList.contains("_active_chevron")) {
                form.page = 1
                setAllLoading(true)
                setDataskins([])
                setForm({...form, sorted_type: 7})
                setLoadSkins(true);
            }
            if (i === 3 && chevrons[i].classList.contains("_active_chevron")) {
                form.page = 1
                setAllLoading(true)
                setDataskins([])
                setForm({...form, sorted_type: 8})
                setLoadSkins(true);
            }
            if (chevrons[i].classList.contains("_active_chevron")) {
                chevrons[i].classList.remove("_active_chevron");
            } else {
                chevrons[i].classList.add("_active_chevron");
            }
        }
    }
    const maxPrice = useCallback(async () => {
        try {
            const data = await request('/api/skins/get_max_price', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            let cost = document.getElementById('cost')
            let cost_end = document.getElementById('cost_end')
            cost.oninput = function () {
                form.cost_end = Number(cost_end.value)
            }
            cost_end.onchange = function () {
                form.cost_end = Number(cost_end.value)
            }
            cost.setAttribute('max', data['max_price'][0]['price'].toFixed(2))
            return setForm({...form, cost_end: data['max_price'][0]['price']})
        } catch (e) {
        } finally {
            setFetching(true)
        }
    }, [request])

    const minPrice = useCallback(async () => {
        try {
            const data = await request('/api/skins/get_min_price', 'GET', null)
            console.log('minPrice', data)
            let cost = document.getElementById('cost')
            let cost_start = document.getElementById('cost_start')
            cost_start.onchange = function () {
                form.cost_start = Number(cost_start.value)
            }
            cost.setAttribute('min', data['min_price'][0]['price'].toFixed(2))
            return form.cost_start = data['min_price'][0]['price'].toFixed(2)

        } catch (e) {
        }
    }, [request])

    const getSkins = async () => {
        try {
            const data = await request('/api/skins/get', 'POST', {...form}, {
                Authorization: `Bearer ${token}`
            })
            console.log("Data getSkins", data)
            if (form.page === data['pages']) setAllLoading(false)
            setDataskins([...dataskins, ...data['skins']])
        } catch (e) {
        } finally {
            setFetching(false);
            setLoadSkins(false);
        }
    }

    const search = useCallback(async () => {
        try {
            const data = await request('/api/skins/search', 'GET', text)
            setDataskins([...dataskins, ...data['skins']])
        } catch (e) {
            console.log(e)
        } finally {
            setText("")
            setSearchSkins(false)
            setLoadSkins(false)
        }
    }, [request])


    const minFloat = useCallback(async () => {
        try {
            const data = await request('/api/skins/get_min_float', 'GET', null)
            console.log(data)
        } catch (e) {
        }
    }, [request])


    const maxFloat = useCallback(async () => {
        try {
            const data = await request('/api/skins/get_max_float', 'GET', null)
            console.log(data)
        } catch (e) {
        }
    }, [request])

    const getShops = useCallback(async () => {
        try {
            const data = await request(`/api/get/shops`, 'GET', null)

            setShops(data['stores'])
            console.log('shops', shops)
        } catch (e) {}
    }, [request])


    useEffect(async () => {
        if(!loading) await getShops()
    }, [getShops])



    useEffect(async () => {
        await maxPrice()
    }, [maxPrice])

    useEffect(async () => {
        await minPrice()
    }, [minPrice])


    useEffect(async () => {
        if (fetching && allLoading) {
            await getSkins()
            setForm({...form, page: form.page + 1})
        }
    }, [fetching])


    useEffect(async () => {
        if (loadSkins && allLoading) {
            await getSkins();
            setForm({...form, page: form.page + 1})
        }
    }, [loadSkins])


    useEffect(async () => {
        await minFloat()
    }, [minFloat])

    useEffect(async () => {
        await maxFloat()
    }, [maxFloat])


    useEffect(async () => {
        if (fetching && searchSkins) {
            await search()
        }
    }, [search])


    if (loading && !fetching && !loadSkins) {
        return <Loader/>
    }

    return (
        <div className="container">
            {/*<div className="about_me_place">*/}
            {/*    <h2>????????????????????</h2>*/}
            {/*</div>*/}
            <div className="flex_content">
                <div className="filters_place">
                    <h2>??????????????</h2>
                    <h3 className="zag_for_filters">??????????????????</h3>
                    <input
                        type="range"
                        name='cost_end'
                        id="cost"
                        value={Number(form.cost_end)}
                        onChange={changeHandler}
                    />
                    <div className="place_for_price_inp">
                        <input className="filter_input"
                               placeholder="????"
                               id='cost_start'
                               type="number"
                               name="cost_start"
                               value={Number(form.cost_start)}
                               onChange={changeHandler}
                        />
                        <input
                            className="filter_input"
                            placeholder="????"
                            type="number"
                            id='cost_end'
                            value={Number(form.cost_end)}
                            name="cost_end"
                            onChange={changeHandler}
                        />
                    </div>
                    <h3 className="zag_for_filters">Float</h3>
                    <input
                        type="range"
                        name="float"
                        min={0}
                        max={1}
                        step={0.01}
                        value={form.float}
                        onChange={changeHandler}
                    />
                    <div className="place_for_price_inp">
                        <input className="filter_input"
                               placeholder="????"
                               id='float_start'
                               type="number"
                               name="float_start"
                               value={form.float_start}
                               onChange={changeHandler}
                        />
                        <input
                            className="filter_input"
                            placeholder="????"
                            type="number"
                            id='float_end'
                            value={form.float}
                            name="float"
                            onChange={changeHandler}
                        />
                    </div>
                    <h3 className="zag_for_filters">???????????????? ????????????????</h3>
                    <select
                        className="filter_input"
                        name='id_shop'
                        value={form.id_shop}
                        onChange={changeHandler}
                    >
                        <option value="0">
                            ???? ??????????????
                        </option>
                        {shops && shops.length && shops.map(shop => {
                            return(
                                <option value={shop.id}>
                                    {shop.name}
                                </option>
                            )})
                        }
                    </select>
                    <h3 className="zag_for_filters">????????????????????????</h3>
                    <select
                        className="filter_input"
                        name='raritet'
                        value={form.raritet}
                        onChange={changeHandler}
                    >
                        <option value="0">??????????</option>
                        <option value="2">??????????????????</option>
                        <option value="3">????????????????????????</option>
                        <option value="4">??????????????????</option>
                        <option value="5">??????????????????????</option>
                        <option value="6">??????????????????????????</option>
                        <option value="7">????????????</option>
                        <option value="8">?????????????? ????????????</option>
                        <option value="9">?????????????????????? ????????</option>
                        <option value="10">??????????????????????????</option>
                    </select>
                    <h3 className="zag_for_filters">????????????????</h3>
                    <select
                        className="filter_input"
                        name='quality'
                        value={form.quality}
                        onChange={changeHandler}
                    >
                        <option value="0">??????????</option>
                        <option value="1">???????????????????? ?? ????????</option>
                        <option value="2">????????????????????</option>
                        <option value="3">?????????? ?????????????? ??????????????????</option>
                        <option value="4">?????????????? ????????????????????</option>
                        <option value="5">?????????? ?? ????????????</option>
                    </select>

                    <h3 className="zag_for_filters">??????????????????</h3>
                    <select
                        className="filter_input"
                        name='category'
                        value={form.category}
                        onChange={changeHandler}
                    >
                        <option value="0">??????</option>
                        <option value="1">StatTrak</option>
                        <option value="2">??????????????</option>
                    </select>
                    {/*<h3 className="zag_for_filters">????????????????</h3>*/}
                    {/*<input type="checkbox" id="choose_flow_one"*/}
                    {/*       className="scal_chek checkbox_for_choose_flower custom-checkbox"*/}
                    {/*/>*/}
                    {/*<label htmlFor="choose_flow_one" className="lab_desc"/>*/}
                    <h3 className="zag_for_filters">????????????</h3>
                    <select
                        className="filter_input"
                        name='item_type'
                        value={form.item_type}
                        onChange={changeHandler}
                    >
                        <option value="0">??????????</option>
                        <option value="1">????????????????</option>
                        <option value="2">?????????????????????? ????????????????</option>
                        <option value="3">????????????????</option>
                        <option value="4">??????????????????</option>
                        <option value="5">????????????????</option>
                        <option value="6">??????????</option>
                        <option value="7">????????????????-??????????????</option>
                        <option value="8">??????????????</option>
                        <option value="9">????????????????</option>
                        <option value="10">????????????????</option>
                        <option value="11">?????????? ????????????</option>
                        <option value="12">??????????????</option>
                        <option value="13">??????????????</option>
                        <option value="14">??????</option>
                        <option value="15">????????????????</option>
                    </select>
                    <div className="send_btn" onClick={openFilter}>
                        ??????????
                    </div>
                </div>
                <div className="card_guns_place">
                    <div className="main_search_place">
                        <div className="flex_search_place ">
                            <input type="text" placeholder="?????????? ???? ????????????????"
                                   className="search_input filter_input" autoComplete="off" onMouseUp={searchHandler}/>
                        </div>
                    </div>
                    <div className="filter_place">
                        <div className="filter_data" onClick={openFilter}>
                            <img src={filter} className="filter_img" alt="??????????????"/>
                            <div>??????????????</div>
                        </div>
                    </div>

                    <div className="sorting_place">
                        <div className="sorting_item _active_sorted">
                            ???? ???????? <span className="fa fa-chevron-down chevron">
                        </span>
                        </div>
                        <div className="sorting_item">
                            ???? ???????????? <span className="fa fa-chevron-down chevron">
                        </span>
                        </div>
                        <div className="sorting_item">
                            ???? ????????????????
                            <span className="fa fa-chevron-down chevron">
                            </span>
                        </div>
                        <div className="sorting_item">
                            ???? ????????????????????????
                            <span className="fa fa-chevron-down chevron">
                            </span>
                        </div>
                    </div>
                    <div className="cards_place">
                        {!loadSkins && !dataskins.length && !fetching && "???????????? ???? ??????????????!"}
                        {!loadSkins && dataskins && dataskins.map((skin, i) =>
                            <GunCard skin={skin} key={i}/>
                        )}
                    </div>
                    {loading && fetching && allLoading &&
                        <div className="preloader_text">

                        </div>
                    }
                    {loading && loadSkins && allLoading &&
                        <div className="preloader_text">

                        </div>
                    }
                </div>
            </div>
            {arrowActive &&
                <ArrowForTopScroll/>
            }
        </div>
    );
}
