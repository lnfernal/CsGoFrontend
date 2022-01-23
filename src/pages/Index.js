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
        if (e.target.documentElement.scrollTop > window.innerHeight){
            setArrowActive(true)
        }
        if (e.target.documentElement.scrollTop < window.innerHeight){
            setArrowActive(false)
        }
    }

    const searchHandler = (e) => {
        this.text = e.target.value
        form.page = 1
        setDataskins([])
        setSearchSkins(true)
        return setLoadSkins(true);
    }

    const changeHandler = event => {
        setAllLoading(true)
        setForm({
            ...form,
            [event.target.name]: !isNaN(event.target.value) ? Number(event.target.value) : event.target.value,
            page: 1
        })
        setDataskins([])
        setLoadSkins(true);
    }

    const openFilter = () => {
        const filters_place = document.getElementsByClassName("filters_place")[0];
        filters_place.classList.toggle("_active");
        document.body.classList.toggle("hidden");
    }

    // Сортировка
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
            if(form.page === data['pages']) setAllLoading(false)
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

    useEffect(() => {
        maxPrice()
    }, [maxPrice])

    useEffect(() => {
        minPrice()
    }, [minPrice])


    useEffect(() => {
        if (fetching && allLoading) {
            getSkins()
            setForm({...form, page: form.page + 1})
        }
    }, [fetching])


    useEffect(() => {
        if (loadSkins && allLoading) {
            getSkins();
            setForm({...form, page: form.page + 1})
        }
    }, [loadSkins])


    useEffect(() => {
        minFloat()
    }, [minFloat])

    useEffect(() => {
        maxFloat()
    }, [maxFloat])


    useEffect(() => {
        if (fetching && searchSkins) {
            search()
        }
    }, [search])


    if (loading && !fetching && !loadSkins) {
        return <Loader/>
    }

    return (
        <div className="container">
            {/*<div className="about_me_place">*/}
            {/*    <h2>Интересное</h2>*/}
            {/*</div>*/}
            <div className="flex_content">
                <div className="filters_place">
                    <h2>Фильтры</h2>
                    <h3 className="zag_for_filters">Стоимость</h3>
                    <input
                        type="range"
                        name='cost_end'
                        id="cost"
                        value={Number(form.cost_end)}
                        onChange={changeHandler}
                    />

                    <div className="place_for_price_inp">
                        <input className="filter_input"
                               placeholder="От"
                               id='cost_start'
                               type="number"
                               name="cost_start"
                               value={Number(form.cost_start)}
                               onChange={changeHandler}
                        />
                        <input
                            className="filter_input"
                            placeholder="До"
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
                               placeholder="От"
                               id='float_start'
                               type="number"
                               name="float_start"
                               value={Number(form.float_start)}
                               onChange={changeHandler}
                        />
                        <input
                            className="filter_input"
                            placeholder="До"
                            type="number"
                            id='float_end'
                            value={Number(form.float)}
                            name="float_end"
                            onChange={changeHandler}
                        />
                    </div>
                    <h3 className="zag_for_filters">Торговая площадка</h3>
                    <select
                        className="filter_input"
                        name='id_shop'
                        value={form.id_shop}
                        onChange={changeHandler}
                    >
                        <option value="0">
                            Не выбрано
                        </option>
                        <option value="1">
                            Steam
                        </option>
                        <option value="2">
                            CsGoTM
                        </option>
                        <option value="3">
                            CsGo500
                        </option>
                        <option value="4">
                            DMarket
                        </option>
                        <option value="5">
                            CSMONEY
                        </option>
                        <option value="6">
                            SKINBARON
                        </option>
                        <option value="7">
                            CS.deals
                        </option>
                    </select>
                    <h3 className="zag_for_filters">Раритетность</h3>
                    <select
                        className="filter_input"
                        name='raritet'
                        value={form.raritet}
                        onChange={changeHandler}
                    >
                        <option value="0">Любая</option>
                        <option value="2">Ширпотрёб</option>
                        <option value="3">Промышленное</option>
                        <option value="4">Армейское</option>
                        <option value="5">Запрещённое</option>
                        <option value="6">Засекреченное</option>
                        <option value="7">Тайное</option>
                        <option value="8">Высшего класса</option>
                        <option value="9">Экзотичного вида</option>
                        <option value="10">Контрабандное</option>
                    </select>
                    <h3 className="zag_for_filters">Качество</h3>
                    <select
                        className="filter_input"
                        name='quality'
                        value={form.quality}
                        onChange={changeHandler}
                    >
                        <option value="0">Любое</option>
                        <option value="1">Закаленное в боях</option>
                        <option value="2">Поношенное</option>
                        <option value="3">После полевых испытаний</option>
                        <option value="4">Немного поношенное</option>
                        <option value="5">Прямо с завода</option>
                    </select>

                    <h3 className="zag_for_filters">Категории</h3>
                    <select
                        className="filter_input"
                        name='category'
                        value={form.category}
                        onChange={changeHandler}
                    >
                        <option value="0">Все</option>
                        <option value="1">StatTrak</option>
                        <option value="2">Сувенир</option>
                    </select>
                    {/*<h3 className="zag_for_filters">Наклейки</h3>*/}
                    {/*<input type="checkbox" id="choose_flow_one"*/}
                    {/*       className="scal_chek checkbox_for_choose_flower custom-checkbox"*/}
                    {/*/>*/}
                    {/*<label htmlFor="choose_flow_one" className="lab_desc"/>*/}
                    <h3 className="zag_for_filters">Оружие</h3>
                    <select
                        className="filter_input"
                        name='item_type'
                        value={form.item_type}
                        onChange={changeHandler}
                    >
                        <option value="0">Любой</option>
                        <option value="1">Винтовка</option>
                        <option value="2">Снайперская винтовка</option>
                        <option value="3">Наклейка</option>
                        <option value="4">Контейнер</option>
                        <option value="5">Пистолет</option>
                        <option value="6">Агент</option>
                        <option value="7">Пистолет-пулемёт</option>
                        <option value="8">Пулемёт</option>
                        <option value="9">Дробовик</option>
                        <option value="10">Граффити</option>
                        <option value="11">Набор музыки</option>
                        <option value="12">Нашивка</option>
                        <option value="13">Подарок</option>
                        <option value="14">Нож</option>
                        <option value="15">Перчатки</option>
                    </select>
                    <div className="send_btn" onClick={openFilter}>
                        Поиск
                    </div>
                </div>
                <div className="card_guns_place">
                    <div className="main_search_place">
                        <div className="flex_search_place ">
                            <input type="text" placeholder="Поиск по названию"
                                   className="search_input filter_input" autoComplete="off" onMouseUp={searchHandler}/>
                        </div>
                    </div>
                    <div className="filter_place">
                        <div className="filter_data" onClick={openFilter}>
                            <img src={filter} className="filter_img" alt="Фильтры"/>
                            <div>Фильтры</div>
                        </div>
                    </div>

                    <div className="sorting_place">
                        <div className="sorting_item _active_sorted">
                            По цене <span className="fa fa-chevron-down chevron">
                        </span>
                        </div>
                        <div className="sorting_item">
                            По выгоде <span className="fa fa-chevron-down chevron">
                        </span>
                        </div>
                        <div className="sorting_item">
                            По качеству
                            <span className="fa fa-chevron-down chevron">
                            </span>
                        </div>
                        <div className="sorting_item">
                            По раритетности
                            <span className="fa fa-chevron-down chevron">
                            </span>
                        </div>
                    </div>
                    <div className="cards_place">
                        {!loadSkins && !dataskins.length && !fetching && "Ничего не найдено!"}
                        {!loadSkins && dataskins && dataskins.map((skin) =>
                            <GunCard skin={skin} />
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
