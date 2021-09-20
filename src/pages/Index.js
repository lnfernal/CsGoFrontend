import React, {useState, useEffect, useCallback} from 'react'
import {useHttp} from "../hooks/http.hook"
import {Loader} from "../components/Loader"
import {GunCards} from "../components/GunCards"

export const Index = () => {
    const elasticsearch = require('elasticsearch');
    let first_loaded = true;
    const esClient = new elasticsearch.Client({host: 'http://localhost:3000/', log: 'error'});

    const [form, setForm] = useState({
        page: 1,
        id_shop: Number(0),
        quality: 0,
        cost_start: 50,
        cost_end: 500,
        sorted_type: 1,
        raritet: 0,
        guns: 0,
        page_count: 16,
        float_start: 0,
        float: 1,
        type: 0,
        category: 0
    })
    const {request, loading} = useHttp()
    const [skins, setSkins] = useState(null)
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
        getSkins()
    }
    const changePage = () => {
        setForm({...form, page: form.page})
        getSkins()
    }


    const getSkins = async () => {
        try {
            const data = await request('/api/skins/get', 'POST', {...form})
            setSkins(data)
            first_loaded = false
            console.log(first_loaded)
            console.log(data)
            window.addEventListener('scroll', function () {
                let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
                // если пользователь прокрутил достаточно далеко (< 100px до конца)
                if (windowRelativeBottom < document.documentElement.clientHeight + 200) {
                    form.page += 1
                    changePage()
                }
            });
        } catch (e) {
        }
    }

    const maxPrice = useCallback(async () => {
        try {
            const data = await request('/api/skins/get_max_price', 'GET', null)
            let cost = document.getElementById('cost')
            let cost_end = document.getElementById('cost_end')
            cost.oninput = function () {
                form.cost_end = Number(cost.value)
            }
            cost_end.onchange = function () {
                form.cost_end = Number(cost_end.value)
            }
            cost.setAttribute('max', data['max_price'][0]['price'].toFixed(2))
            form.cost_end = data['max_price'][0]['price'].toFixed(2)
        } catch (e) {
        }
    }, [request])

    const minPrice = useCallback(async () => {
        try {
            const data = await request('/api/skins/get_min_price', 'GET', null)
            let cost = document.getElementById('cost')
            let cost_start = document.getElementById('cost_start')
            cost_start.onchange = function () {
                form.cost_start = Number(cost_start.value)
                cost.setAttribute('min', Number(cost_start.value))
            }
            cost.setAttribute('min', data['min_price'][0]['price'])
            form.cost_start = data['min_price'][0]['price']
            console.log(data)
        } catch (e) {
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
        getSkins()
    }, [])

    useEffect(() => {
        maxPrice()
    }, [maxPrice])

    useEffect(() => {
        minPrice()
    }, [minPrice])

    useEffect(() => {
        minFloat()
    }, [minFloat])

    useEffect(() => {
        maxFloat()
    }, [maxFloat])


    if (loading && first_loaded) {
        return <Loader/>
    }

    return (
        <div className="container">
            <div className="about_me_place">
                <h2>Интересное</h2>
            </div>
            <div className="flex_content">
                <sidebar className="filters_place">
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
                        value={Number(form.id_shop)}
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
                    </select>
                    <h3 className="zag_for_filters">Раритетность</h3>
                    <select
                        className="filter_input"
                        name='raritet'
                        value={form.raritet}
                        onChange={changeHandler}
                    >
                        <option value="1">Любая</option>
                        <option value="2">Базового класса</option>
                        <option value="3">Ширпотрёб</option>
                        <option value="4">Промышленное</option>
                        <option value="5">Армейское</option>
                        <option value="6">Запрещённое</option>
                        <option value="7">Засекреченное</option>
                        <option value="8">Тайное</option>
                        <option value="9">Высшего класса</option>
                        <option value="10">Экзотичного вида</option>
                        <option value="11">Контрабандное</option>
                    </select>
                    <h3 className="zag_for_filters">Качество</h3>
                    <select
                        className="filter_input"
                        name='quality'
                        value={form.quality}
                        onChange={changeHandler}
                    >
                        <option value="0">Любое</option>
                        <option value="Закаленное в боях">Закаленное в боях</option>
                        <option value="Поношенное">Поношенное</option>
                        <option value="После полевых испытаний">После полевых испытаний</option>
                        <option value="Немного поношенное">Немного поношенное</option>
                        <option value="Прямо с завода">Прямо с завода</option>
                    </select>

                    <h3 className="zag_for_filters">Категории</h3>
                    <select
                        className="filter_input"
                        name='categories'
                        value={form.category}
                        onChange={changeHandler}
                    >
                        <option value="1">Все</option>
                        <option value="2">StatTrak</option>
                        <option value="3">Сувенир</option>
                    </select>
                    <h3 className="zag_for_filters">Наклейки</h3>
                    <input type="checkbox" id="choose_flow_one"
                           className="scal_chek checkbox_for_choose_flower custom-checkbox"
                    />
                    <label htmlFor="choose_flow_one" className="lab_desc"/>
                    <h3 className="zag_for_filters">Оружие</h3>
                    <select
                        className="filter_input"
                        name='guns'
                        value={form.guns}
                        onChange={changeHandler}
                    >
                        <option value="1">Любой</option>
                        <option value="2">Винтовка</option>
                        <option value="3">Снайперская винтовка</option>
                        <option value="4">Наклейка</option>
                        <option value="5">Контейнер</option>
                        <option value="6">Пистолет</option>
                        <option value="7">Агент</option>
                        <option value="8">Пистолет-пулемёт</option>
                        <option value="9">Пулемёт</option>
                        <option value="10">Дробовик</option>
                        <option value="11">Граффити</option>
                        <option value="12">Набор музыки</option>
                        <option value="13">Нашивка</option>
                        <option value="14">Подарок</option>
                    </select>
                </sidebar>
                <div className="card_guns_place">
                    <h2>Товары</h2>
                    <div className="main_search_place">
                        <div className="flex_search_place ">
                            <input type="text" id="inp_search" placeholder="Поиск по названию"
                                   className="search_input filter_input"/>
                        </div>
                    </div>
                    <div className="sorting_place">
                        <div className="sorting_item">
                            По цене
                        </div>
                        <div className="sorting_item">
                            По количеству
                        </div>
                        <div className="sorting_item">
                            По float
                        </div>
                        <div className="sorting_item">
                            По стикерам
                        </div>
                    </div>
                    {!loading && skins && <GunCards skins={skins}/>}
                </div>
            </div>
        </div>
    );

}

