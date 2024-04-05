import axios from 'axios';

const PUBLIC_SERVER_ONE = process.env.NEXT_PUBLIC_SERVER_ONE

const errResponse = (error) => {
    const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()
    return message
}

const getData = async (type, category) => {
    try {
        const response = await axios.get(`${PUBLIC_SERVER_ONE}/${type}/${category}`)
        const data = response.data
        return { data: data[type] }
    } catch (error) {
        return { error: errResponse(error) }
    }
}

export {
    errResponse, getData
}