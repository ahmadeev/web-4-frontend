import styles from '../component-styles/Snow.module.css'

function Snow() {

    return (
        <>
            {/*{https://yraaa.ru/scripts/snow-css3}*/}
            <div className={styles.snowContainer}>
                <div className={styles.snow}></div>
            </div>
        </>
    )
}

export default Snow
