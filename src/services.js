import axios from 'axios';

const PUBLIC_SERVER_ONE = process.env.NEXT_PUBLIC_SERVER_ONE

const errResponse = (error) => {
    const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()
    return message
}

const textCapitalize = (text) => {
    // .split(/[ .]/)
    var sentence = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    sentence = sentence.split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('.')
    return sentence
}

const addIdToDataGridRows = (data) => {
    return data.map((item, index) => ({ ...item, id: index + 1 }))
}

// Regular Employees ====================================================================
const getAllRegularEmployees = async () => {
    try {
        const response = await axios.get(`${PUBLIC_SERVER_ONE}/employee/regular`)
        const employees = response.data.employees
        return { employees }
    } catch (error) {
        return { error: errResponse(error) }
    }
}

const createRegularEmployee = async (regularEmployeeData) => {
    try {
        const response = await axios.post(`${PUBLIC_SERVER_ONE}/employee/regular`, regularEmployeeData)
        const message = response.data.message
        return { success: message }
    } catch (error) {
        return { error: errResponse(error) }
    }
}


const updateRegularEmployee = async (id, regularEmployeeData) => {
    try {
        const response = await axios.put(`${PUBLIC_SERVER_ONE}/employee/regular/${id}`, regularEmployeeData)
        const message = response.data.message
        return { success: message }
    } catch (error) {
        return { error: errResponse(error) }
    }
}


const deleteRegularEmployee = async (id) => {
    try {
        const response = await axios.delete(`${PUBLIC_SERVER_ONE}/employee/regular/${id}`)
        const message = response.data.message
        return { success: message }
    } catch (error) {
        return { error: errResponse(error) }
    }
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

const deletePendingLeaveData = async (id) => {
    try {
        const response = await axios.delete(`${PUBLIC_SERVER_ONE}/leaves/${id}`)
        const leaveId = response.data.leaveId
        return { success: "Deleted Successfully", leaveId }
    } catch (error) {
        return { error: errResponse(error) }
    }
}

export {
    errResponse, textCapitalize, addIdToDataGridRows,
    getAllRegularEmployees, createRegularEmployee, updateRegularEmployee, deleteRegularEmployee,
    getData, deletePendingLeaveData
}