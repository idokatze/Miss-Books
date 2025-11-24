// import { colorByPrice } from '../services/book.service.js'
const { useState, useEffect } = React

export function ReadMore({ txt, length = 100 }) {
    const [toggleExpand, setToggleExpand] = useState(false)
    const [txtToRender, setTxtToRender] = useState(txt.slice(0, length) + '...')

    function onToggleExpand() {
        setToggleExpand((prev) => !prev)
    }

    useEffect(() => {
        if (toggleExpand) {
            setTxtToRender(txt)
        } else {
            setTxtToRender(txt.slice(0, length) + '...')
        }
    }, [toggleExpand, txt, length])

    return (
        <div>
            <p>{txtToRender}</p>
            <button onClick={onToggleExpand}>
                {toggleExpand ? 'Read Less' : 'Read More'}
            </button>
        </div>
    )
}
