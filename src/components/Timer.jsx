import {useEffect, useState} from 'react'
import styles from '../component-styles/Timer.module.css'

function Timer({ event, date_of_event_string }) {
    const date_of_event= new Date(date_of_event_string).getTime();

    const [time, setTime] = useState(date_of_event);

    const day_words = ["день", "дня", "дней"]
    const hours_words = ["час", "часа", "часов"]
    const minutes_words = ["минута", "минуты", "минут"]
    const seconds_words = ["секунда", "секунды", "секунд"]

    useEffect(() => {
        const offset = new Date().getTimezoneOffset() * 60;
        const interval_id = setInterval(() => {
            setTime((new Date(date_of_event - Date.now())).getTime() / 1000 + offset);
        }, 1000)
        return () => clearInterval(interval_id)
    }, [date_of_event]);

    function formatDate(number) {
        if (number <= 9) {
            return '0' + number;
        }
        return number;
    }

    function formatDateWord(number, words) {
        const digit = number % 10
        if(digit === 1) {
            return `${number} ${words[0]}`
        } else if (2 <= digit && digit <= 4) {
            return `${number} ${words[1]}`
        } else if (5 <= digit && digit <= 9 || digit === 0) {
            return `${number} ${words[2]}`
        }
        return "format date error"
    }

    if (date_of_event === time) {
        return (
            <>
                <div className={styles.timer}>
                    <h1>Загрузка...</h1>
                </div>
            </>
        )
    }

    return (
        <>
            <div className={styles.timer}>
                <div className={styles.gradient}>
                    <h1>{event.toUpperCase()}</h1>
                </div>
                {/*<h2>{time.getMonth()} месяцев {time.getDate()} дней {time.getHours()} часов {time.getMinutes()} минут {time.getSeconds()} секунд</h2>*/}
                {/*<h2>{time.getMonth()} m : {time.getDate()} d : {time.getHours()} h : {time.getMinutes()} min : {time.getSeconds()} s</h2>*/}
                <h1>
                    {/*{formatDate(Math.floor(time / (24 * 60 * 60)))} : {formatDate(Math.floor(time % (24 * 60 * 60) / (60 * 60)))} : {formatDate(Math.floor(time % (24 * 60 * 60) % (60 * 60) / 60))} : {formatDate(Math.floor(time % (24 * 60 * 60) % (60 * 60) % 60))}*/}
                    {formatDateWord(Math.floor(time / (24 * 60 * 60)), day_words)} : {formatDateWord(Math.floor(time % (24 * 60 * 60) / (60 * 60)), hours_words)} : {formatDateWord(Math.floor(time % (24 * 60 * 60) % (60 * 60) / 60), minutes_words)} : {formatDateWord(Math.floor(time % (24 * 60 * 60) % (60 * 60) % 60), seconds_words)}
                </h1>
                {/*<h1>{formatDateWord(Math.floor(time / (24 * 60 * 60)), day_words)}</h1>*/}
                {/*<h1>{formatDateWord(Math.floor(time % (24 * 60 * 60) / (60 * 60)), hours_words)}</h1>*/}
                {/*<h1>{formatDateWord(Math.floor(time % (24 * 60 * 60) % (60 * 60) / 60), minutes_words)}</h1>*/}
                {/*<h1>{formatDateWord(Math.floor(time % (24 * 60 * 60) % (60 * 60) % 60), seconds_words)}</h1>*/}
            </div>
        </>
    )
}

export default Timer
